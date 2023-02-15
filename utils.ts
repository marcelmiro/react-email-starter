import { render } from '@react-email/render'
import { minify } from '@minify-html/node'
import { z } from 'zod'

type ArgPrimitiveType = z.ZodString | z.ZodBoolean
type ArgType = ArgPrimitiveType | z.ZodOptional<ArgPrimitiveType>
type ArgSchema = z.ZodObject<{ [key: string]: ArgType }>

type RemoveIndexSignature<T> = {
	[Key in keyof T as Key extends `${infer R}` ? Key : never]: T[Key]
}

type ShortArgs<T extends Record<string, unknown>> = {
	[key: string]: keyof RemoveIndexSignature<T>
}

export function parseArgs<T extends ArgSchema | z.ZodEffects<ArgSchema>>(
	schema: T,
	shortArgs?: ShortArgs<z.infer<T>>,
): T['_output'] {
	const argv = process.argv.slice(2)
	const args: Record<string, z.infer<ArgType>> = {}

	const schemaDef =
		schema._def.typeName === 'ZodEffects'
			? schema._def.schema._def
			: schema._def

	const schemaKeys = Object.keys(schemaDef.shape())

	for (let i = 0; i < argv.length; i++) {
		if (!argv[i].startsWith('-')) continue

		const arg = argv[i].replace(/^\-{1,2}/g, '')
		const nextArg = argv[i + 1] || undefined

		// Get `key` and `value` (if using `key=value` format)
		let [key, value] = arg.split(/=(.*)/g).map((val) => val || undefined)
		if (!key) continue

		// Get full arg name if `key` is a short arg
		if (key && shortArgs && !schemaKeys.includes(key)) {
			const longKey = shortArgs[key] ? String(shortArgs[key]) : undefined
			if (longKey) key = longKey
		}

		// Get `value` from next arg if not an arg name and `value` not set
		if (!value && !nextArg?.startsWith('-')) value = nextArg || undefined

		const zodType = schemaDef.shape()[key] || schemaDef.catchall

		const typeName =
			zodType._def.typeName === 'ZodOptional'
				? zodType._def.innerType._def.typeName
				: zodType._def.typeName

		if (typeName === 'ZodString') args[key] = value
		if (typeName === 'ZodBoolean') {
			args[key] = value?.toLowerCase() !== 'false'
		}
	}

	try {
		return schema.parse(args)
	} catch (e) {
		if (!(e instanceof z.ZodError)) throw e

		const errors = e.errors
			.map((error) => {
				const path = error.path.join('')
				return `${path ? `${path}: ` : ''}${error.message}\n`
			})
			.join('')

		console.error('❌ Invalid arguments:\n' + errors)
		process.exit(1)
	}
}

export async function renderEmail(name: string) {
	const fileDir = `./emails/${name}${name.endsWith('.tsx') ? '' : '.tsx'}`
	const component = await import(fileDir)

	const html = render(component.default(), { pretty: false })
	const text = render(component.default(), { pretty: false, plainText: true })

	const minifiedHtml = minify(Buffer.from(html), {
		minify_css: true,
		minify_js: true,
		keep_closing_tags: true,
		keep_spaces_between_attributes: true,
		keep_html_and_head_opening_tags: true,
	}).toString()

	return { html: minifiedHtml, text }
}

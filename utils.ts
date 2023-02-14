import { render } from '@react-email/render'
import { minify } from '@minify-html/node'
import { z } from 'zod'

type ArgPrimitiveType = z.ZodString | z.ZodBoolean
type ArgType = ArgPrimitiveType | z.ZodOptional<ArgPrimitiveType>

type RemoveIndexSignature<T> = {
	[Key in keyof T as Key extends `${infer R}` ? Key : never]: T[Key]
}

type ShortArgs<T extends Record<string, unknown>> = {
	[key: string]: keyof RemoveIndexSignature<T>
}

export function parseArgs<T extends z.ZodObject<{ [key: string]: ArgType }>>(
	schema: T,
	shortArgs?: ShortArgs<z.infer<T>>,
): T['_output'] {
	const argv = process.argv.slice(2)
	const args: Record<string, z.infer<ArgType>> = {}
	const schemaKeys = Object.keys(schema._def.shape())

	for (let i = 0; i < argv.length; i++) {
		if (!argv[i].startsWith('-')) continue

		let arg = argv[i].replace(/^\-{1,2}/g, '')
		let key: string | undefined = undefined
		let value: string | undefined = undefined
		const nextArg = argv[i + 1] as string | undefined

		// Get `key` and `value` (if using `key=value` format)
		;[key, value] = arg.split(/=(.*)/g).map((val) => val || undefined)
		if (!key) continue

		// Get full arg name if `key` is a short arg
		if (key && shortArgs && !schemaKeys.includes(key)) {
			const longKey = shortArgs[key] ? String(shortArgs[key]) : undefined
			if (longKey) key = longKey
		}

		// Get `value` from next arg if not an arg name and `value` not set
		if (!value && !nextArg?.startsWith('-')) value = nextArg || undefined

		const zodType = schema._def.shape()[key] || schema._def.catchall
		let { typeName } = zodType._def

		if (zodType._def.typeName === 'ZodOptional') {
			typeName = zodType._def.innerType._def.typeName
		}

		if (typeName === 'ZodString') args[key] = value
		if (typeName === 'ZodBoolean') {
			args[key] = value?.toLowerCase() !== 'false'
		}
	}

	try {
		return schema.parse(args)
	} catch (e) {
		if (!(e instanceof z.ZodError)) throw e
		console.error(
			'❌ Invalid arguments:\n' +
				e.errors
					.map(
						(error) => `${error.path.join('')}: ${error.message}\n`,
					)
					.join(''),
		)
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

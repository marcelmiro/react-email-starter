import { parseArgs } from 'node:util'

import { deleteTemplate } from './_ses'

const {
	values: { template: templateName },
} = parseArgs({
	strict: true,
	options: { template: { type: 'string', short: 't' } },
})

async function main() {
	if (!templateName) {
		throw new Error('Template argument missing')
	}

	await deleteTemplate({ name: templateName })
}

main().catch((e) => {
	console.error(e)
	process.exit(1)
})

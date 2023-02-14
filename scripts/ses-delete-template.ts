import { z } from 'zod'

import { parseArgs } from '../utils'
import { deleteTemplate } from './_ses'

const { template: templateName } = parseArgs(
	z.object({ template: z.string().min(1) }),
	{ t: 'template' },
)

async function main() {
	await deleteTemplate({ name: templateName })
}

main().catch((e) => {
	console.error(e)
	process.exit(1)
})

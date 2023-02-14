import { z } from 'zod'

import { parseArgs } from '../utils'
import { sendTemplate } from './_ses'

const args = parseArgs(
	z
		.object({
			template: z.string().min(1),
			recipient: z.string().email(),
			from: z.string().optional(),
			reply: z.string().optional(),
		})
		.catchall(z.string().min(1)),
	{ t: 'template', r: 'recipient', f: 'from' },
)

const { template: templateName, recipient, from, reply, ...templateData } = args

async function main() {
	await sendTemplate({
		to: recipient,
		from,
		reply,
		template: templateName,
		templateData,
	})
}

main().catch((e) => {
	console.error(e)
	process.exit(1)
})

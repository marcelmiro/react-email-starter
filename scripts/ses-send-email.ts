import { z } from 'zod'

import { parseArgs } from '../utils'
import { sendEmail } from './_ses'
import { renderEmail } from '../utils'

const args = parseArgs(
	z.object({
		email: z.string().min(1),
		recipient: z.string().email(),
		subject: z.string().min(1),
		from: z.string().optional(),
		reply: z.string().optional(),
	}),
	{ e: 'email', r: 'recipient', s: 'subject', f: 'from' },
)

const { email, recipient, subject, from, reply } = args

async function main() {
	const { html, text } = await renderEmail(email)
	await sendEmail({ to: recipient, subject, from, reply, html, text })
}

main().catch((e) => {
	console.error(e)
	process.exit(1)
})

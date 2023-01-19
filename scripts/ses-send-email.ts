import { parseArgs } from 'node:util'

import { sendEmail } from './_ses'
import { renderEmail } from '../utils'

const {
	values: { email, recipient, subject, from, reply },
} = parseArgs({
	strict: true,
	options: {
		email: { type: 'string', short: 'e' },
		recipient: { type: 'string', short: 'r' },
		subject: { type: 'string', short: 's' },
		from: { type: 'string', short: 'f' },
		reply: { type: 'string' },
	},
})

async function main() {
	if (!email || !recipient || !subject) {
		throw new Error('Email, recipient or subject argument missing')
	}

	const { html, text } = await renderEmail(email)
	await sendEmail({ to: recipient, subject, from, reply, html, text })
}

main().catch((e) => {
	console.error(e)
	process.exit(1)
})

import { parseArgs } from 'node:util'

import { createTemplate } from './_ses'
import { renderEmail } from '../utils'

const {
	values: { template: templateName, subject, email },
} = parseArgs({
	strict: true,
	options: {
		template: { type: 'string', short: 't' },
		subject: { type: 'string', short: 's' },
		email: { type: 'string', short: 'e' },
	},
})

async function main() {
	if (!templateName || !subject || !email) {
		throw new Error('Template, subject or email argument missing')
	}

	const { html, text } = await renderEmail(email)
	await createTemplate({ name: templateName, subject, html, text })
}

main().catch((e) => {
	console.error(e)
	process.exit(1)
})

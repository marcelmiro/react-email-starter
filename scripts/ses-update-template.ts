import { parseArgs } from 'node:util'

import { updateTemplate, type UpdateTemplateOptions } from './_ses'
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
	if (!templateName || (!subject && !email)) {
		throw new Error('Template, subject or email argument missing')
	}

	const data: UpdateTemplateOptions = { name: templateName, subject }

	if (email) {
		const { html, text } = await renderEmail(email)
		data.html = html
		data.text = text
	}

	await updateTemplate(data)
}

main().catch((e) => {
	console.error(e)
	process.exit(1)
})

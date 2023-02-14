import { z } from 'zod'

import { parseArgs } from '../utils'
import { createTemplate } from './_ses'
import { renderEmail } from '../utils'

const args = parseArgs(
	z.object({
		template: z.string().min(1),
		subject: z.string().min(1),
		email: z.string().min(1),
	}),
	{ t: 'template', s: 'subject', e: 'email' },
)

const { template: templateName, subject, email } = args

async function main() {
	const { html, text } = await renderEmail(email)
	await createTemplate({ name: templateName, subject, html, text })
}

main().catch((e) => {
	console.error(e)
	process.exit(1)
})

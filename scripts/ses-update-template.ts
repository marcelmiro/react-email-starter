import { z } from 'zod'

import { parseArgs } from '../utils'

import { getTemplate, updateTemplate } from './_ses'
import { renderEmail } from '../utils'

const args = parseArgs(
	z
		.object({
			template: z.string().min(1),
			subject: z.string().optional(),
			email: z.string().optional(),
		})
		.refine(
			({ subject, email }) => subject || email,
			'Subject or email is required',
		),
	{ t: 'template', s: 'subject', e: 'email' },
)

const { template: templateName, email } = args

async function main() {
	let subject = args.subject

	let { html, text } = email
		? await renderEmail(email)
		: ({} as Record<string, string | undefined>)

	if (!subject || !email) {
		const template = await getTemplate({ name: templateName })

		if (!subject) subject = template.SubjectPart

		if (!email) {
			html = template.HtmlPart
			text = template.TextPart
		}
	}

	// Validate params
	if (!subject) throw new Error('Subject is required')
	if (!html || !text) throw new Error('Email is required')

	await updateTemplate({ name: templateName, subject, html, text })
}

main().catch((e) => {
	console.error(e)
	process.exit(1)
})

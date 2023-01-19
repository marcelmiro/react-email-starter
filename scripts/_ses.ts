import 'dotenv/config'
import {
	SESClient,
	ListTemplatesCommand,
	GetTemplateCommand,
	CreateTemplateCommand,
	UpdateTemplateCommand,
	DeleteTemplateCommand,
	SendTemplatedEmailCommand,
	SendEmailCommand,
} from '@aws-sdk/client-ses'

const accessKeyId = process.env.SES_ACCESS_KEY
const secretAccessKey = process.env.SES_SECRET_KEY
const source = process.env.SES_SOURCE

if (!accessKeyId || !secretAccessKey || !source) {
	throw new Error('AWS SES access or secret key missing')
}

const ses = new SESClient({
	credentials: { accessKeyId, secretAccessKey },
	region: 'us-east-1',
})

export async function listTemplates() {
	const { TemplatesMetadata } = await ses.send(new ListTemplatesCommand({}))
	return TemplatesMetadata
}

export async function getTemplate({ name }: { name: string }) {
	const { Template } = await ses.send(
		new GetTemplateCommand({ TemplateName: name }),
	)

	if (!Template) throw new Error('Template not found')

	return Template
}

interface CreateTemplateOptions {
	name: string
	subject: string
	html: string
	text: string
}

export async function createTemplate({
	name,
	subject,
	html,
	text,
}: CreateTemplateOptions) {
	return await ses.send(
		new CreateTemplateCommand({
			Template: {
				TemplateName: name,
				SubjectPart: subject,
				HtmlPart: html,
				TextPart: text,
			},
		}),
	)
}

export interface UpdateTemplateOptions {
	name: string
	subject?: string
	html?: string
	text?: string
}

export async function updateTemplate({
	name,
	subject,
	html,
	text,
}: UpdateTemplateOptions) {
	return await ses.send(
		new UpdateTemplateCommand({
			Template: {
				TemplateName: name,
				SubjectPart: subject,
				HtmlPart: html,
				TextPart: text,
			},
		}),
	)
}

export async function deleteTemplate({ name }: { name: string }) {
	return await ses.send(new DeleteTemplateCommand({ TemplateName: name }))
}

interface SendTemplateOptions {
	to: string
	from?: string
	reply?: string
	template: string
	templateData?: Record<string, string>
}

export async function sendTemplate({
	to,
	from,
	reply,
	template,
	templateData = {},
}: SendTemplateOptions) {
	return await ses.send(
		new SendTemplatedEmailCommand({
			Destination: { ToAddresses: [to] },
			Source: from || source,
			ReplyToAddresses: reply ? [reply] : undefined,
			Template: template,
			TemplateData: JSON.stringify(templateData),
		}),
	)
}

interface SendEmailOptions {
	to: string
	from?: string
	reply?: string
	subject?: string
	html: string
	text?: string
}

export async function sendEmail({
	to,
	from,
	reply,
	subject,
	html,
	text,
}: SendEmailOptions) {
	return await ses.send(
		new SendEmailCommand({
			Destination: { ToAddresses: [to] },
			Source: from || source,
			ReplyToAddresses: reply ? [reply] : undefined,
			Message: {
				Subject: { Data: subject, Charset: 'utf-8' },
				Body: {
					Html: { Data: html, Charset: 'utf-8' },
					Text: { Data: text, Charset: 'utf-8' },
				},
			},
		}),
	)
}

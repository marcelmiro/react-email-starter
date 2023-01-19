import { parseArgs } from 'node:util'

import { sendTemplate } from './_ses'

const {
	values: { template: templateName, data, recipient, from, reply },
} = parseArgs({
	strict: true,
	options: {
		template: { type: 'string', short: 't' },
		data: { type: 'string', short: 'd' },
		recipient: { type: 'string', short: 'r' },
		from: { type: 'string', short: 'f' },
		reply: { type: 'string' },
	},
})

async function main() {
	if (!templateName || !recipient) {
		throw new Error('Template or recipient argument missing')
	}

	await sendTemplate({
		to: recipient,
		from,
		reply,
		template: templateName,
		templateData: data ? JSON.parse(data) : undefined,
	})
}

main().catch((e) => {
	console.error(e)
	process.exit(1)
})

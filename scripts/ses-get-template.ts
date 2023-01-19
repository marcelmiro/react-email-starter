import { parseArgs } from 'node:util'
import { createServer } from 'http'
import open from 'open'

import { getTemplate } from './_ses'

const {
	values: { template: templateName },
} = parseArgs({
	strict: true,
	options: { template: { type: 'string', short: 't' } },
})

async function main() {
	if (!templateName) {
		throw new Error('Template argument missing')
	}

	const template = await getTemplate({ name: templateName })

	if (template.HtmlPart) {
		const server = createServer((_req, res) => {
			res.writeHead(200, { 'Content-Type': 'text/html' })
			res.write(template.HtmlPart)
			res.end()
		}).listen(8080)

		server.on('request', server.close)
		open('http://localhost:8080')
	} else {
		console.log(template)
	}
}

main().catch((e) => {
	console.error(e)
	process.exit(1)
})

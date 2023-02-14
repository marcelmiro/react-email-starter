import { createServer } from 'http'
import open from 'open'
import { z } from 'zod'

import { parseArgs } from '../utils'
import { getTemplate } from './_ses'

const { template: templateName } = parseArgs(
	z.object({ template: z.string().min(1) }),
	{ t: 'template' },
)

async function main() {
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

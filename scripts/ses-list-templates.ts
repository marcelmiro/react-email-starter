import { listTemplates } from './_ses'

async function main() {
	const templates = await listTemplates()
	console.log(templates)
}

main().catch((e) => {
	console.error(e)
	process.exit(1)
})

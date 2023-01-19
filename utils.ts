import { render } from '@react-email/render'
import { minify } from '@minify-html/node'

export async function renderEmail(name: string) {
	const fileDir = `./emails/${name}${name.endsWith('.tsx') ? '' : '.tsx'}`
	const component = await import(fileDir)

	const html = render(component.default(), { pretty: false })
	const text = render(component.default(), { pretty: false, plainText: true })

	const minifiedHtml = minify(Buffer.from(html), {
		minify_css: true,
		minify_js: true,
		keep_closing_tags: true,
		keep_spaces_between_attributes: true,
		keep_html_and_head_opening_tags: true,
	}).toString()

	return { html: minifiedHtml, text }
}

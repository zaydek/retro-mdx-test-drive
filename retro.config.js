const markdown_it = {
	name: "markdown-it",
	setup(build) {
		const fs = require("fs")
		const markdown_it = require("markdown-it")
		const prism = require("prismjs")

		const markdown = markdown_it({
			html: true,
			highlight(code, lang) {
				if (lang === "") return code
				return prism.highlight(code, Prism.languages[lang], lang)
			},
			headerIDs: true,
		})

		build.onLoad({ filter: /\.md$/ }, async args => {
			const text = await fs.promises.readFile(args.path, "utf8")
			return {
				contents: `
					export default function Markdown({ replacements }) {
						let __html = ${JSON.stringify(markdown.render(text))}
						if (replacements !== undefined) {
							for (const [v1, v2] of replacements) {
								__html = __html.replaceAll(v1, v2)
							}
						}
						return <div dangerouslySetInnerHTML={{ __html }}></div>
					}
				`,
				loader: "jsx",
			}
		})
	},
}

const sass = {
	name: "scss",
	setup(build) {
		const sass = require("sass")

		build.onLoad({ filter: /\.scss$/ }, async args => {
			const result = sass.renderSync({ file: args.path })
			return {
				contents: result.css.toString(),
				loader: "css",
			}
		})
	},
}

module.exports = {
	plugins: [
		markdown_it,
		sass,
	],
}

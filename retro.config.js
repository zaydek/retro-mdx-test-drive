const markdown = {
	name: "markdown-it",
	setup(build) {
		const fs = require("fs")
		const markdown = require("markdown-it")
		const prism = require("prismjs")

		const gfm = markdown({
			html: true,
			highlight(code, lang) {
				if (lang === "") return code
				return prism.highlight(code, Prism.languages[lang], lang)
			},
			headerIDs: true,
		})

		build.onLoad({ filter: /\.md$/ }, async args => {
			const text = await fs.promises.readFile(args.path, "utf8")
			const contents = gfm.render(text).replace(/({|})/g, `{"$1"}`).replaceAll("\n", `{"\\n"}`)
			return {
				contents: `
					export default function Markdown() {
						return <>${contents}</>
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
		markdown,
		sass,
	],
}

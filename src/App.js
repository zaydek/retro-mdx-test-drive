import HelloWorld from "./HelloWorld.mdx"
import { MDXProvider } from "@mdx-js/react"

import "./App.scss"

export default function App() {
	return (
		<div className="App">
			<div className="prose">
				<MDXProvider components={{ KebabCase() { return "HelloWorld!" } }}>
					<HelloWorld />
				</MDXProvider>
			</div>
		</div>
	)
}

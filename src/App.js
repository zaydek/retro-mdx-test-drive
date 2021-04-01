import HelloWorld from "./HelloWorld.mdx"
import { MDXProvider } from "@mdx-js/react"

import "./App.scss"

export default function App() {
	return (
		<div className="App">
			<div className="prose">
				<MDXProvider components={{
					ProvidedComponent() {
						return <h6><code>{"<ProvidedComponent />"}</code></h6>
					}
				}}>
					<HelloWorld />
				</MDXProvider>
			</div>
		</div>
	)
}

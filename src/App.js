import HelloWorld from "./HelloWorld.md"

import "./App.scss"

export default function App() {
	return (
		<div className="App">
			<div className="prose">
				<HelloWorld replacements={[["%%THING%%", "Hello, world!"]]} />
			</div>
		</div>
	)
}

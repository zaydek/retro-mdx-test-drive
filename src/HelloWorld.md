# Hello, world!

<div>Hello, world</div>

```js
function App() {
	return (
		<div>
			Hello, world!
		</div>
	)
}
```

By adding `export default`, we can …

```js
export default function App() {
	return (
		<div>
			Hello, world!
		</div>
	)
}
```

Finally, we can take this one step further by:

```js
function Component() {
	return <App />
}
```

Notice how we use `console.log("Hello")` to get our point across.
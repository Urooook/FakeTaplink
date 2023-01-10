export default function inView(options = {}) {
	let currentTarget = null
	const promise = {}

	const handler = ([ entry ]) => {
		const eventName = entry.isIntersecting > 0 ? 'enter' : 'leave'
		const cb = options[ eventName ]

		cb(entry.target)
		promise.resolve?.([ eventName, currentTarget ])
	}

	const streamGenerator = function* () {
		while (true) {
			yield new Promise(resolve => promise.resolve = resolve)
		}
	}

	options.stream?.(streamGenerator())

	const observer = new IntersectionObserver(handler)

	return {
		visit: ({ emitter, ref }) => {
			observer.observe(ref.current)

			return () => observer.disconnect()
		}
	}
}

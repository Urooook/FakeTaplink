export function on(eventName, cb) {
	return {
		visit: (...args) => {
			if (eventName === args[ 0 ]) {
				cb(...args.slice(1))
			}
		}
	}
}

export function once(eventName, cb) {
	let isVisited = false

	return {
		visit: (...args) => {
			if (eventName === args[ 0 ] && !isVisited) {
				cb(...args.slice(1))
				isVisited = true
			}
		}
	}
}

export function inView(options = {}) {
	let currentTarget = null

	const handler = entries => {
		for (const entry of entries) {
			if (entry.target === currentTarget) {
				if (entry.intersectionRatio > 0) {
					options?.enter?.()
				} else {
					options?.leave?.()
				}
			}
		}
	}

	const observer = new IntersectionObserver(handler)

	return {
		visit: (eventName, target) => {
			currentTarget = target

			if (eventName === 'mount') {
				observer.observe(target)
			}

			if (eventName === 'unmount') {
				observer.unobserve(target)
			}
		}
	}
}

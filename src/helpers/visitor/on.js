export default function on(eventName, handler) {
	return {
		visit: ({ emitter }) => {
			const listener = emitter.on(
				eventName,
				handler,
				{ objectify: true }
			)

			return () => listener.off()
		}
	}
}

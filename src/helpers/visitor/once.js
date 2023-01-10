export default function once(eventName, handler) {
	return {
		visit: ({ emitter }) => {
			const listener = emitter.once(
				eventName,
				handler,
				{ objectify: true }
			)

			return () => listener.off()
		}
	}
}

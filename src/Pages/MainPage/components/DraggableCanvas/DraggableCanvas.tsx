import React, { useEffect, useMemo } from 'react'
import { repeat, seq } from '../../../../helpers/AsyncFunctions/helpers'
import on from '../../../../helpers/AsyncFunctions/on'
import { on as viewOn } from '../../../../helpers/visitor'
import { DraggableElement } from './DraggableElement/DraggableElement'
import styles from './DraggableCanvas.module.css'
import deStyles from './DraggableElement/DraggableElement.module.css'

const DraggableCanvas = () => {
	const getNextElement = (cursorPosition: any, currentElement: any) => {
		const currentElementCoord = currentElement.getBoundingClientRect()
		const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2

		const nextElement =
			cursorPosition < currentElementCenter ? currentElement : currentElement.nextElementSibling

		return nextElement
	}

	useEffect(() => {
		const container = document.getElementById(styles.container)

		;(async function () {
			const dnd = repeat(() => seq(on(container!, 'dragover'), on(container!, 'touchmove')))

			// eslint-disable-next-line no-restricted-syntax
			for await (const ev of dnd) {
				const activeElement = container!.querySelector(deStyles.box)
				const items = document.querySelectorAll('.items')
				const currentElement = (ev.target as Element).classList.contains(deStyles.item)
					? ev.target
					: activeElement
				const nextElement = getNextElement((ev as DragEvent).clientY, currentElement)
				// console.log(items[items.length - 1])
				if (nextElement === items[items.length - 1]) {
					activeElement &&
						activeElement.parentNode!.insertBefore(activeElement, nextElement.nextElementSibling)
				} else {
					activeElement && activeElement.parentNode!.insertBefore(activeElement, nextElement)
				}
				// nextElement.style.background = 'transparent';
			}
		})()
	}, [])

	const model = [
		<div>
			11 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, amet blanditiis ea fugiat
			laborum maxime quisquam soluta sunt ut voluptatibus.
		</div>,
		<div>
			22Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, amet blanditiis ea fugiat
			laborum maxime quisquam soluta sunt ut voluptatibus.
		</div>,
		<div>
			33Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, amet blanditiis ea fugiat
			laborum maxime quisquam soluta sunt ut voluptatibus.
		</div>,
		<div>
			44Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, amet blanditiis ea fugiat
			laborum maxime quisquam soluta sunt ut voluptatibus.
		</div>,
		<div>
			11 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, amet blanditiis ea fugiat
			laborum maxime quisquam soluta sunt ut voluptatibus.
		</div>,
		<div>
			22Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, amet blanditiis ea fugiat
			laborum maxime quisquam soluta sunt ut voluptatibus.
		</div>,
		<div>
			33Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, amet blanditiis ea fugiat
			laborum maxime quisquam soluta sunt ut voluptatibus.
		</div>,
		<div>
			44Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, amet blanditiis ea fugiat
			laborum maxime quisquam soluta sunt ut voluptatibus.
		</div>,
	]

	const addOutline1 = (e: any) => {
		if (
			e.target.parentNode.classList.contains(deStyles.item) ||
			e.target.classList.contains(deStyles.item)
		) {
			e.target.style.background = e.target.style.background === 'red' ? 'transparent' : 'red'
		}
	}

	const accept = useMemo(
		() => [
			viewOn('click', addOutline1),
			viewOn('dragstart', (evt: any) => (evt.target as Element).classList.add(deStyles.box)),
			viewOn('dragend', (evt: any) => (evt.target as Element).classList.remove(deStyles.box)),
			// inView({
			//   enter: changeBgColor(),
			//   leave: changeBgColor('#ebebeb'),
			//   stream: async (asyncIterable: any) => {
			//     for await (const [eventName] of asyncIterable) {
			//       console.log('inView stream event:', eventName);
			//     }
			//   },
			// }),
		],
		[],
	)

	return (
		<div className={styles.mobileContainer}>
			<div id={styles.container} className={styles.containerMobileRadius}>
				{model.map((el) => (
					<DraggableElement key={Math.random()} accept={accept} elem={el} />
				))}
			</div>
		</div>
	)
}

export { DraggableCanvas }
import React, { useContext, useEffect, useMemo } from 'react'
import { repeat, seq } from '../../../../helpers/AsyncFunctions/helpers'
import on from '../../../../helpers/AsyncFunctions/on'
import { on as viewOn } from '../../../../helpers/visitor'
import { DraggableElement } from './DraggableElement/DraggableElement'
import './DraggableCanvas.css'
import { BlocksContext } from '../../blocksContext'
import { ThemeContext } from '../../themeContext'

const DraggableCanvas = () => {
	const getNextElement = (cursorPosition: any, currentElement: any) => {
		const currentElementCoord = currentElement.getBoundingClientRect()
		const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2

		const nextElement =
			cursorPosition < currentElementCenter ? currentElement : currentElement.nextElementSibling

		return nextElement
	}

	const { blocks: model, onChangeActiveBlock } = useContext(BlocksContext)
	const {
		theme: { color, backgroundColor },
	} = useContext(ThemeContext)

	useEffect(() => {
		const container = document.getElementById('container')

		;(async function () {
			const dnd = repeat(() => seq(on(container!, 'dragover'), on(container!, 'touchmove')))

			// eslint-disable-next-line no-restricted-syntax
			for await (const ev of dnd) {
				const activeElement = container!.querySelector('.box')
				const items = document.querySelectorAll('.items')
				const currentElement = (ev.target as Element).classList.contains('items')
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

	// const model = [
	// 	<div>
	// 		11 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, amet blanditiis ea fugiat
	// 		laborum maxime quisquam soluta sunt ut voluptatibus.
	// 	</div>,
	// 	<div>
	// 		22Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, amet blanditiis ea fugiat
	// 		laborum maxime quisquam soluta sunt ut voluptatibus.
	// 	</div>,
	// 	<div>
	// 		33Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, amet blanditiis ea fugiat
	// 		laborum maxime quisquam soluta sunt ut voluptatibus.
	// 	</div>,
	// 	<div>
	// 		44Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, amet blanditiis ea fugiat
	// 		laborum maxime quisquam soluta sunt ut voluptatibus.
	// 	</div>,
	// 	<div>
	// 		11 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, amet blanditiis ea fugiat
	// 		laborum maxime quisquam soluta sunt ut voluptatibus.
	// 	</div>,
	// 	<div>
	// 		22Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, amet blanditiis ea fugiat
	// 		laborum maxime quisquam soluta sunt ut voluptatibus.
	// 	</div>,
	// 	<div>
	// 		33Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, amet blanditiis ea fugiat
	// 		laborum maxime quisquam soluta sunt ut voluptatibus.
	// 	</div>,
	// 	<div>
	// 		44Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, amet blanditiis ea fugiat
	// 		laborum maxime quisquam soluta sunt ut voluptatibus.
	// 	</div>,
	// ]

	const addOutline1 = (e: any) => {
		// if (e.target.parentNode.classList.contains('items') || e.target.classList.contains('items')) {
		// 	e.target.style.background = e.target.style.background === 'red' ? 'transparent' : 'red'
		// }

		const blockId = e.target.closest('.items').id
		console.log(blockId)
		if (onChangeActiveBlock && blockId) {
			console.log(model)
			const newActiveBlock = model.get(blockId)
			if (newActiveBlock) {
				console.log('newActiveBlock', newActiveBlock)
				onChangeActiveBlock(newActiveBlock)
			}
		}
	}

	const accept = useMemo(
		() => [
			viewOn('click', addOutline1),
			viewOn('dragstart', (evt: any) => (evt.target as Element).classList.add('box')),
			viewOn('dragend', (evt: any) => {
				;(evt.target as Element).classList.remove('box')
				console.log('12312312312')
				console.log(model)
			}),
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
		[model, addOutline1],
	)

	return (
		<div className="mobile-container">
			<div id="container" className="container-mobile-radius" style={{ color, backgroundColor }}>
				{[...model.values()].map((block) => (
					<DraggableElement
						key={block.id}
						accept={accept}
						elem={block.component}
						elemId={block.id}
					/>
				))}
			</div>
		</div>
	)
}

export { DraggableCanvas }

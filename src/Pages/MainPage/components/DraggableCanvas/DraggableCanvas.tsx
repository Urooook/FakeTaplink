import React, { useCallback, useContext, useEffect, useMemo } from 'react'
import { repeat, seq } from '../../../../helpers/AsyncFunctions/helpers'
import on from '../../../../helpers/AsyncFunctions/on'
import { on as viewOn } from '../../../../helpers/visitor'
import { DraggableElement } from './DraggableElement/DraggableElement'
import './DraggableCanvas.css'
import { BlocksContext } from '../../blocksContext'
import { ThemeContext } from '../../themeContext'

const DraggableCanvas = () => {
	const { blocks: model, onChangeActiveBlock } = useContext(BlocksContext)
	const {
		theme: { color, backgroundColor },
	} = useContext(ThemeContext)

	const getNextElement = (cursorPosition: any, currentElement: any) => {
		const currentElementCoord = currentElement.getBoundingClientRect()
		const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2

		const nextElement =
			cursorPosition < currentElementCenter ? currentElement : currentElement.nextElementSibling

		return nextElement
	}

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
			}
		})()
	}, [])

	const handleClick = useCallback(
		(e: any) => {
			const blockId = e.target.closest('.items').id
			if (onChangeActiveBlock && blockId) {
				const newActiveBlock = model.get(blockId)
				if (newActiveBlock) {
					onChangeActiveBlock(newActiveBlock)
				}
			}
		},
		[model, onChangeActiveBlock],
	)

	const accept = useMemo(
		() => [
			viewOn('click', handleClick),
			viewOn('dragstart', (evt: any) => (evt.target as Element).classList.add('box')),
			viewOn('dragend', (evt: any) => (evt.target as Element).classList.remove('box')),
		],
		[handleClick],
	)

	return (
		<div className="mobile-container">
			<div id="container" style={{ color, backgroundColor }}>
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

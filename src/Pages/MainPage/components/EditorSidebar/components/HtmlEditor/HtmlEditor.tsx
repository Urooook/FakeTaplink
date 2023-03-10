import React, { useContext, useEffect, useState } from 'react'
import { Textarea } from '../../../../../../components/UI/Textarea/Textarea'
import styles from './HtmlEditor.module.css'
import { Button } from '../../../../../../components/UI/Button/Button'
import { opt, or, repeat, seq, tag, take, ws } from '../../../../../../helpers/Parser/Factories'
import { binsearchKey } from '../../../../../../helpers/Parser/htmlTags'
import { Parser } from '../../../../../../helpers/Parser/types'
import {
	BlocksContext,
	CompoentNames,
	ComponentBlock,
	HtmlBlockProps,
} from '../../../../blocksContext'
import { HtmlBlock } from '../../../blocks/HtmlBlock/HtmlBlock'

type ParserResult = {
	res: string
	errors: string[]
}

const initialTextEditorState: HtmlBlockProps = {
	html: '<div>Some text</div>',
}

export const HtmlEditor = () => {
	const [errors, setErrors] = useState<string[]>([])
	const [, setHtml] = useState<string>('')
	const [compile, setCompile] = useState('')
	const { blocks, activeBlock, onAddBlock, onDeleteBlock } = useContext(BlocksContext)

	useEffect(() => {
		if (!activeBlock && onAddBlock) {
			onAddBlock({
				value: { ...initialTextEditorState },
				component: <HtmlBlock {...initialTextEditorState} />,
				componentName: CompoentNames.HtmlBlock,
			})
		}
	}, [activeBlock])

	const xmlNameRgxp = /[^ <>"'=/]/

	const xmlAttrValue = seq(
		tag('='),
		ws,
		tag('"'),
		take(/[^"]/, { token: 'CREATE_ATTR_VALUE' }),
		tag('"'),
	)

	const xmlAttr = seq(ws, take(xmlNameRgxp, { token: 'CREATE_ATTE_KEY' }), ws, opt(xmlAttrValue))

	const xmlTag = seq(
		ws,
		tag('<'),
		ws,
		take(xmlNameRgxp, { token: 'CREATE_TAG' }),
		ws,
		repeat(xmlAttr, { min: 0 }),
		ws,
		tag('>', { token: 'END_CREATE_TAG' }),
	)

	const xmlEndTag = seq(ws, tag('</'), ws, take(xmlNameRgxp, { token: 'END_TAG' }), ws, tag('>'))

	const xmlText = seq(take(/[^<>]/, { token: 'TEXT' }))

	const xml: Parser = repeat(
		or(
			seq(
				xmlTag,
				opt((...args) => or(seq(xmlText, xml, opt(xmlText)), xml)(...args)),
				xmlEndTag,
			),
			xmlText,
		),
		{ min: 0 },
	)

	const parseHtml = (htmlArr: any) => {
		const tokens = htmlArr
		const stackStartTags = []
		const stackEndTags = []
		const errorMessages = []
		let depth = 0
		let res = ''

		// @ts-ignore
		for (const token of tokens) {
			const val = token.value

			switch (token.type) {
				case 'CREATE_TAG': {
					const isHtmlTag = binsearchKey(val)
					if (isHtmlTag === -1) {
						errorMessages.push(`${val} ???? ???????????????? html ??????????`)
					}
					stackStartTags.push(val)
					res += ' '.repeat(depth)
					res += `<span style="color: red;">&lt${val}</span>`
					depth += 3
					break
				}
				case 'CREATE_ATTE_KEY': {
					res += ` <span style="color: #101b98;">${val}</span>`
					break
				}
				case 'CREATE_ATTR_VALUE': {
					res += `=<span style="color: green;">"${val}"</span>`
					break
				}
				case 'END_CREATE_TAG': {
					res += `<span style="color: red;">&gt</span> \n`
					break
				}
				case 'END_TAG': {
					stackEndTags.push(val)
					depth -= 3
					res += ' '.repeat(depth)
					res += `<span style="color: red;">&lt/${val}&gt</span>\n`
					break
				}
				case 'TEXT': {
					const a = depth + 1
					res += ' '.repeat(a)
					if (val === '\n') {
						res += val
					} else {
						res += `<span style="color: black; font-family: Arial">${val}</span> \n`
					}
					break
				}
			}
		}

		return { res, errors: errorMessages }
	}

	const minify = (str: string): string => str.replace(/(\s)\1+/gm, '').replace(/\n/gm, '')

	if (!onAddBlock || !onDeleteBlock) {
		return null
	}

	const write = (str: string) => {
		const p = xml('a s')
		p.next()
		p.next(minify(`${str}`))

		// @ts-ignore
		const arr = [...p]
		const result = parseHtml(arr)
		setCompile(result.res)
		setErrors(result.errors)

		if (activeBlock?.id) {
			const currentBlock = blocks.get(activeBlock?.id) as ComponentBlock<HtmlBlockProps>

			if (currentBlock) {
				currentBlock.value['html'] = str
				onAddBlock({
					...currentBlock,
					component: <HtmlBlock html={currentBlock.value.html} />,
				})
			}
		}
	}

	const handleDeleteBlock = () => {
		onDeleteBlock(activeBlock?.id)
	}

	return (
		<>
			{errors.length > 0 && errors.map((err) => <div style={{ color: 'red' }}>{err}</div>)}

			<Textarea
				value={(activeBlock as ComponentBlock<HtmlBlockProps>)?.value.html}
				onChange={(e) => {
					setHtml(e.target.value)
					write(e.target.value)
				}}
				className={styles.htmlCode}
			/>

			<pre>
				<code>
					<div dangerouslySetInnerHTML={{ __html: compile }} />
				</code>
			</pre>

			<Button onClick={handleDeleteBlock}>??????????????</Button>
		</>
	)
}

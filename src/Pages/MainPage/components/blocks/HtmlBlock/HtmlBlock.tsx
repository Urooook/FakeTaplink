import React, { useContext } from 'react'
import { ThemeContext } from '../../../themeContext'
import styles from '../TextBlock/TextBlock.module.css'
import { HtmlBlockProps } from '../../../blocksContext'

export const HtmlBlock = ({ html }: HtmlBlockProps) => {
	const {
		theme: { color },
	} = useContext(ThemeContext)

	return (
		<div className={styles.container} style={{ color }}>
			<div dangerouslySetInnerHTML={{ __html: html }} />
		</div>
	)
}

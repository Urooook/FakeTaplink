import styles from './EditorSidebar.module.css'
import { TextEditor } from './components/TextEditor/TextEditor'
import { ThemeEditor } from './components/ThemeEditor/ThemeEditor'
import { useMemo } from 'react'
import { LinkEditor } from './components/LinkEditor/LinkEditor'
import { ControlIds } from '../ControlsSidebar/enum'

type EditorSidebarProps = {
	currentEditor: string
}

export const EditorSidebar = ({ currentEditor }: EditorSidebarProps) => {
	const renderCurrentEditor = useMemo(() => {
		switch (currentEditor) {
			case ControlIds.themes:
				return <ThemeEditor />
			case ControlIds.text:
				return <TextEditor />
			case ControlIds.link:
				return <LinkEditor />
			default:
				return <></>
		}
	}, [currentEditor])

	return (
		<div className={styles.container}>
			<div className={styles.title}>Edit {currentEditor}</div>
			{renderCurrentEditor}
		</div>
	)
}

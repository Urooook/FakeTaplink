import styles from './EditorSidebar.module.css'
import { TextEditor } from './components/TextEditor/TextEditor'
import { ThemeEditor } from './components/ThemeEditor/ThemeEditor'
import { useMemo } from 'react'

type EditorSidebarProps = {
	currentEditor: string
}

export const EditorSidebar = ({ currentEditor }: EditorSidebarProps) => {
	const renderCurrentEditor = useMemo(() => {
		switch (currentEditor) {
			case 'themes':
				return <ThemeEditor />
			case 'text':
				return <TextEditor />
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

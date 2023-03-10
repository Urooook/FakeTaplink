import styles from './EditorSidebar.module.css'
import { TextEditor } from './components/TextEditor/TextEditor'
import { ThemeEditor } from './components/ThemeEditor/ThemeEditor'
import { useContext, useMemo } from 'react'
import { LinkEditor } from './components/LinkEditor/LinkEditor'
import { ControlIds } from '../ControlsSidebar/enum'
import { HtmlEditor } from './components/HtmlEditor/HtmlEditor'
import { ImageEditor } from './components/ImageEditor/ImageEditor'
import {CarouselEditor} from "./components/CarouselEditor/CarouselEditor";
import { Mode, ModeContext } from '../../modeContext'
import cn from 'classnames'

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
			case ControlIds.html:
				return <HtmlEditor />
			case ControlIds.image:
				return <ImageEditor />
			case ControlIds.carousel:
				return <CarouselEditor />
			default:
				return <></>
		}
	}, [currentEditor])

	const { mode } = useContext(ModeContext)

	return (
		<div className={cn(styles.container, { [styles.hidden]: mode === Mode.view })}>
			<div className={styles.title}>{currentEditor}</div>
			{renderCurrentEditor}
		</div>
	)
}

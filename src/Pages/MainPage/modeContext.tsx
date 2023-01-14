import { createContext } from 'react'

export enum Mode {
	edit = 'edit',
	view = 'view',
}

export type ModeConextValue = {
	mode: Mode
	onModeChange?: (mode: Mode) => void
}

export const ModeContext = createContext<ModeConextValue>({ mode: Mode.edit })

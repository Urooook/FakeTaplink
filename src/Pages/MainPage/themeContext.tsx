import { createContext } from 'react'

export type Theme = {
	id?: string
	color: string
	backgroundColor: string
}

export type ThemeContextValue = {
	theme: Theme
	onThemeChange?: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextValue>({
	theme: {
		color: '',
		backgroundColor: '',
	},
})

import { BiFont } from 'react-icons/bi'
import styles from './ThemeEditor.module.css'
import { getCssVariable } from '../../../../../../helpers/getCssVariable'
import { useContext } from 'react'
import { useTheme } from './useTheme'
import { ThemeContext } from '../../../../themeContext'
import cn from 'classnames'

export const ThemeEditor = () => {
	const { theme, onThemeChange } = useContext(ThemeContext)
	const themes = useTheme()

	if (!onThemeChange) {
		return null
	}

	return (
		<div className={styles.container}>
			{themes.map(({ backgroundColor, textColor, id }) => (
				<div
					key={id}
					className={cn(styles.themeItem, { [styles.activeThemeItem]: theme.id === id })}
					style={{
						backgroundColor,
						color: textColor,
						borderColor: backgroundColor || getCssVariable('--ft-color-grey'),
					}}
					onClick={() =>
						onThemeChange({
							id,
							color: textColor,
							backgroundColor: backgroundColor || getCssVariable('--ft-color-white'),
						})
					}
				>
					<BiFont className={styles.icon} />
				</div>
			))}
		</div>
	)
}

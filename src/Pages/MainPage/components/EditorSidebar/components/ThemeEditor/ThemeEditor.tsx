import { BiFont } from 'react-icons/bi'
import styles from './ThemeEditor.module.css'
import { getCssVariable } from '../../../../../../helpers/getCssVariable'
import { useMemo, useState } from 'react'
import { useTheme } from './useTheme'

export const ThemeEditor = () => {
	const themes = useTheme()

	return (
		<div className={styles.container}>
			{themes.map(({ backgroundColor, textColor, id }) => (
				<div
					key={id}
					className={styles.themeItem}
					style={{
						backgroundColor,
						color: textColor,
						borderColor: backgroundColor || getCssVariable('--ft-color-grey'),
					}}
				>
					<BiFont className={styles.icon} />
				</div>
			))}
		</div>
	)
}

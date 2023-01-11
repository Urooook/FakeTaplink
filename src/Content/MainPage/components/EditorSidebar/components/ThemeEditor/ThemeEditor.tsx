import { BiFont } from 'react-icons/bi'
import styles from './ThemeEditor.module.css'
import { getCssVariable } from '../../../../../../helpers/getCssVariable'

const themes = [
	{
		backgroundColor: getCssVariable('--ft-color-blue'),
		textColor: getCssVariable('--ft-color-white'),
	},
	{
		textColor: getCssVariable('--ft-color-blue'),
	},
	{
		backgroundColor: getCssVariable('--ft-color-yellow'),
		textColor: getCssVariable('--ft-color-white'),
	},
	{
		backgroundColor: getCssVariable('--ft-color-orange'),
		textColor: getCssVariable('--ft-color-white'),
	},
	{
		backgroundColor: getCssVariable('--ft-color-green'),
		textColor: getCssVariable('--ft-color-white'),
	},
	{
		backgroundColor: getCssVariable('--ft-color-pink'),
		textColor: getCssVariable('--ft-color-white'),
	},
]

export const ThemeEditor = () => {
	return (
		<div className={styles.container}>
			{themes.map(({ backgroundColor, textColor }) => (
				<div
					key={`${backgroundColor}-${textColor}`}
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

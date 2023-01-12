import { BiFont } from 'react-icons/bi'
import styles from './ThemeEditor.module.css'
import { getCssVariable } from '../../../../../../helpers/getCssVariable'

const themes = [
	{
		backgroundColor: getCssVariable('--ft-color-blue'),
		textColor: getCssVariable('--ft-color-white'),
		id: '1',
	},
	{
		textColor: getCssVariable('--ft-color-blue'),
		id: '2',
	},
	{
		backgroundColor: getCssVariable('--ft-color-yellow'),
		textColor: getCssVariable('--ft-color-white'),
		id: '3',
	},
	{
		backgroundColor: getCssVariable('--ft-color-orange'),
		textColor: getCssVariable('--ft-color-white'),
		id: '4',
	},
	{
		backgroundColor: getCssVariable('--ft-color-green'),
		textColor: getCssVariable('--ft-color-white'),
		id: '5',
	},
	{
		backgroundColor: getCssVariable('--ft-color-pink'),
		textColor: getCssVariable('--ft-color-white'),
		id: '6',
	},
]

export const ThemeEditor = () => {
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

import { useMemo } from 'react'
import { getCssVariable } from '../../../../../../helpers/getCssVariable'

export const useTheme = () => {
	return useMemo(() => {
		return [
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
	}, [])
}

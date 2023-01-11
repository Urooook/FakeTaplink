export const getCssVariable = (cssVariable: string) => {
	return getComputedStyle(document.documentElement).getPropertyValue(cssVariable)
}

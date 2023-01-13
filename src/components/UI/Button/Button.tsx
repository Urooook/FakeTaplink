import { PropsWithChildren } from 'react'
import styles from './Button.module.css'
import cn from 'classnames'

type ButtonProps = PropsWithChildren<{
	className?: string
	disabled?: boolean

	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}>

export const Button = ({ className, onClick, children, disabled, ...restProps }: ButtonProps) => {
	return (
		<button className={cn(styles.button, className)} disabled={disabled} onClick={onClick}>
			{children}
		</button>
	)
}

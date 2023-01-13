import { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import styles from './Button.module.css'
import cn from 'classnames'
import { forwardRef } from 'react'

type ButtonProps = PropsWithChildren<{
	className?: string
	disabled?: boolean

	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}>

type HTMLButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonProps>

export const Button = forwardRef<HTMLButtonElement, ButtonProps & HTMLButtonProps>(
	({ className, onClick, children, disabled, ...restProps }, ref) => {
		return (
			<button
				className={cn(styles.button, className)}
				disabled={disabled}
				onClick={onClick}
				{...restProps}
			>
				{children}
			</button>
		)
	},
)

import { PropsWithChildren } from 'react'
import styles from './Button.module.css'

type ButtonProps = PropsWithChildren<{
	className?: string

	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}>

export const Button = ({ className, onClick, children, ...restProps }: ButtonProps) => {
	return (
		<button className={styles.button} onClick={onClick}>
			{children}
		</button>
	)
}

import cn from 'classnames'
import styles from './Input.module.css'

type InputProps = {
	className?: string
	controlName?: string
	disabled?: boolean
	error?: string | null
	id?: string
	invalid?: boolean
	placeholder?: string
	type?: 'text' | 'password'
	value?: string

	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = (props: InputProps) => {
	const {
		className,
		controlName,
		disabled,
		error,
		id,
		onChange,
		placeholder,
		type = 'text',
		invalid,
		value,
		...restProps
	} = props

	return (
		<>
			<input
				className={cn(styles.input, className, { [styles.invalid]: invalid })}
				disabled={disabled}
				id={id}
				name={controlName}
				placeholder={placeholder}
				type={type || 'text'}
				value={value}
				onChange={onChange}
				{...restProps}
			/>
			{error !== undefined && <div className={styles.error}>{error}</div>}
		</>
	)
}

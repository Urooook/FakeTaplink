import styles from './Textarea.module.css'
import cn from 'classnames'

type TextAreaProps = {
	value?: any
	placeholder?: string
	className?: string

	onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}
export const Textarea = ({ value, placeholder, className, onChange }: TextAreaProps) => {
	console.log(value)
	return (
		<textarea
			value={value.res}
			placeholder={placeholder}
			className={cn(styles.textarea, className)}
			onChange={onChange}
		/>
	)
}

import styles from './Textarea.module.css'
import cn from 'classnames'

type TextAreaProps = {
	value?: string
	placeholder?: string
	className?: string

	onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}
export const Textarea = ({ value, placeholder, className, onChange }: TextAreaProps) => {
	return (
		<textarea
			value={value}
			placeholder={placeholder}
			className={cn(styles.textarea, className)}
			onChange={onChange}
		/>
	)
}

import styles from './Textarea.module.css'
import cn from 'classnames'

type TextAreaProps = {
	value?: string
	placeholder?: string
	className?: string
	child?: any

	onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}
export const Textarea = ({ value, placeholder, className, onChange, child }: TextAreaProps) => {
	return (
		<textarea
			value={value}
			placeholder={placeholder}
			className={cn(styles.textarea, className)}
			onChange={onChange}
		>
			{child}
		</textarea>
	)
}

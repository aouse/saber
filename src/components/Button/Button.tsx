import styles from './button.module.css'
import { ButtonProps} from '@/types/ui'

const Button = ({handler, title, disabled = false, textOnly = false}: ButtonProps) => {
    const classnames = !textOnly ? `${styles.buttonForm}` : `${styles.buttonTextOnly} `
    return (
        <button onClick={handler} className={`${styles.button} ${classnames}`} disabled={disabled}>
            {title}
        </button>
    )
}

export default Button
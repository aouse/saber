import styles from './toggle.module.css'
import { ToggleProps } from '@/types/ui'

const Toggle = ({checked, handler}: ToggleProps) => {
    return (
        <div>
            <label className={styles.switch}>
                <input type="checkbox" checked={checked} onChange={handler}/>
                <span className={`${styles.slider} ${styles.round}`}></span>
            </label>
        </div>
    )
}

export default Toggle
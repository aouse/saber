import { DropdownProps } from "@/types/ui"
import styles from './dropdown.module.css'

const Dropdown = ({valueId, handler, placeHolderString, data}: DropdownProps<{ id: string | number; name: string }>) => {
    return (
        <select
            value={valueId}
            onChange={handler}
            className={styles.dropdown}
        >
            <option value="">{placeHolderString}</option>
            {data.map((item: { id: string | number; name: string }) => (
            <option key={item.id} value={item.id}>
                {item.name}
            </option>
            ))}
        </select>
    )
}

export default Dropdown
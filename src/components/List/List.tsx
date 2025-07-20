import styles from './list.module.css'
import { ListProps } from '@/types/ui'


const List = ({ data, title }: ListProps) => {
    return (
        <div className={styles.listContainer}>
        {title && <h2>{title}</h2>}
            <ul className={styles.list}>
                {data?.map((item: string, idx: number) => (
                    <li key={`${item}${idx}`}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default List
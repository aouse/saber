import styles from './contentarea.module.css'
import { ContentAreaProps } from '@/types/ui'
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"

const ContentArea = ({text}: ContentAreaProps) => {

const savedText = useSelector((state: RootState) => state.dashboard.text)

    return (
    <div
        className={styles.contentarea}
      >{savedText || text}</div>
    )
}

export default ContentArea
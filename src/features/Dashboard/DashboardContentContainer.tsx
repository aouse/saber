import Panel from "@/features/Panel/Panel"
import Content from "@/features/Document/Document"
import styles from './dashboard.module.css'
import {useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { setText, addPattern, setHydrated } from "@/store/slices/dashboardSlice"
import { useLocalStorageSync } from "@/hooks/useLocalStorage"
import { RootState } from "@/store/store"
import { LoremIpsum } from "lorem-ipsum"
import { Pattern } from "@/types/data"
const lorem = new LoremIpsum()
import { ModeProps } from "@/types/dashboard"


const DashboardContentContainer = ({ mode }: ModeProps) => {
    const dispatch = useDispatch()

    const hydrated = useSelector((state: RootState) => state.dashboard.hydrated)

   useEffect(() => {
  if (
    typeof window !== "undefined" &&
    !hydrated
  ) {
    const patterns = JSON.parse(localStorage.getItem("patterns") || "[]")
    const text = localStorage.getItem("text") || lorem.generateParagraphs(2)
    dispatch(setText(text));
    patterns.forEach((p: Pattern) => {
      dispatch(addPattern({ pattern: p.regex, terms: p.extractedTerms as string[], name: p.name }))
    });
    dispatch(setHydrated(true))
  }
}, [dispatch, hydrated])

  useLocalStorageSync(hydrated)
    return (
            <div className={styles.dashboard}>
                <div className={styles.panel}>
                    <Panel mode={mode}/>
                </div>

                <div className={styles.content}>
                    <Content />
                </div>
            </div>

    )
}

export default DashboardContentContainer
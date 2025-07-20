import { useEffect } from "react";
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"

export const useLocalStorageSync = (hydrated: boolean) => {
  const patterns = useSelector((state: RootState) => state.dashboard.patterns)
  const text = useSelector((state: RootState) => state.dashboard.text)

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("patterns", JSON.stringify(patterns))
      localStorage.setItem("text", text)
    }
  }, [patterns, text, hydrated])
};
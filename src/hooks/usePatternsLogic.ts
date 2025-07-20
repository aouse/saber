import { useState, useCallback, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "@/store/store"
import { addPattern, editPattern, deletePattern, approvePattern, updateAllExtractedTerms } from "@/store/slices/dashboardSlice"
import { extractRegexExtraction } from "@/utils/regex"
import { Pattern } from "@/types/data"

export function usePatternsLogic() {
  const initialPattern: Pattern = { id: "", regex: "", name: "", extractedTerms: [], approved: false }
  const [showEdit, setShowEdit] = useState(false)
  const [selectedPattern, setSelectedPattern] = useState<Pattern>(initialPattern)
  const [confirmationText, setConnfirmationText] = useState<string>("")
  const dispatch = useDispatch<AppDispatch>()
  const patterns = useSelector((state: RootState) => state.dashboard.patterns)
  const currentPatternId = useSelector((state: RootState) => state.dashboard.currentPatternId)
  const savedText = useSelector((state: RootState) => state.dashboard.text)
  const hydrated = useSelector((state: RootState) => state.dashboard.hydrated)

  const extractedTerms = useMemo(
    () => (pattern: string) => extractRegexExtraction(savedText, pattern),
    [savedText]
  );
  const selectedPatternObj = patterns.find(p => p.id === selectedPattern.id) || selectedPattern

  const handleAddPattern = useCallback((pattern: string, name: string) => {
    setConnfirmationText("Pattern added")
    setSelectedPattern({ id: currentPatternId, regex: pattern, name })
    dispatch(addPattern({ pattern, terms: extractedTerms(pattern), name }))
  }, [currentPatternId, dispatch, extractedTerms]);

  const handleRemovePattern = useCallback((id: string) => {
    setSelectedPattern(initialPattern)
    setConnfirmationText("Pattern removed")
    dispatch(deletePattern(id));
  }, [dispatch])

  const handleEditPattern = useCallback((pattern: string, name: string, id: string) => {
    setSelectedPattern({ id, regex: pattern, name });
    setShowEdit(false)
    setConnfirmationText("Pattern edited")
    dispatch(editPattern({ id, pattern, terms: extractedTerms(pattern), name }))
    dispatch(updateAllExtractedTerms({ text: savedText }));
  }, [dispatch, selectedPattern, extractedTerms])

  const approveSelectedPattern = useCallback(() => {
    setConnfirmationText("Pattern approved")
    dispatch(approvePattern(selectedPattern.id))
  }, [dispatch, selectedPattern.id])

  return {
    showEdit,
    setShowEdit,
    selectedPattern,
    setSelectedPattern,
    patterns,
    hydrated,
    extractedTerms,
    selectedPatternObj,
    handleAddPattern,
    handleRemovePattern,
    handleEditPattern,
    approveSelectedPattern,
    confirmationText
  }
}

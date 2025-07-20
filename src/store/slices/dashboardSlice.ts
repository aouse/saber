import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DashboardState } from "@/types/store";
import { extractRegexExtraction } from "@/utils/regex";

const initialState: DashboardState = {
  patterns: [],
  text: "",
  currentPatternId: "",
  hydrated: false
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setText(state, action: PayloadAction<string>) {
      state.text = action.payload
    },

    addPattern(state, action: PayloadAction<{pattern: string, terms: string[], name: string}>) {
      const id = Date.now().toString()
      state.patterns.push({ id: id, regex: action.payload.pattern, extractedTerms:action.payload.terms, name: action.payload.name });
      state.currentPatternId = id
    },


    editPattern(state, action: PayloadAction<{ id: string; pattern: string, terms:string[], name: string }>) {
      const pattern = state.patterns.find(p => p.id === action.payload.id)
      if (pattern) { 
        pattern.regex = action.payload.pattern;
        pattern.name = action.payload.name;
        pattern.extractedTerms = action.payload.terms
        pattern.approved = false
      }
    },

    deletePattern(state, action: PayloadAction<string>) {
      state.patterns = state.patterns.filter(p => p.id !== action.payload)
      state.currentPatternId = ""
    },

    approvePattern(state, action: PayloadAction<string>) {
      const pattern = state.patterns.find(p => p.id === action.payload)
      if (pattern) pattern.approved = true;
    },

    clearAllApprovals(state) {
      state.patterns.forEach(p => { p.approved = false; })
    },

    setHydrated(state, action: PayloadAction<boolean>) {
      state.hydrated = action.payload
    },

    updateAllExtractedTerms(state, action: PayloadAction<{ text: string }>) {
  state.patterns = state.patterns.map(pattern => ({
    ...pattern,
    extractedTerms: pattern.regex
      ? extractRegexExtraction(action.payload.text, pattern.regex)
      : [],
  }));
}
  },
});

export const { setText, addPattern, editPattern, deletePattern, approvePattern, clearAllApprovals, setHydrated, updateAllExtractedTerms } = dashboardSlice.actions;
export default dashboardSlice.reducer;
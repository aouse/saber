import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

export const selectApprovedPatterns = createSelector(
  (state: RootState) => state.dashboard.patterns,
  patterns => patterns.filter(p => p.approved)
);
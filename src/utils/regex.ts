export const extractRegexExtraction = (text: string, pattern: string): string[] => {
  try {
    const regex = new RegExp(pattern, "g");
    const matches = text.match(regex);
    return matches ? matches : [];
  } catch {
    // Handle invalid regex pattern gracefully
    return [];
  }
}
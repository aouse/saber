export type Pattern = {
    id: string, 
    regex: string, 
    approved?: boolean,
    name: string
    extractedTerms?: string[]
}
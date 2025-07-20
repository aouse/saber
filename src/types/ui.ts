export interface ContentAreaProps  {
    text?: string
}

export interface ButtonProps {
    handler?: () => void
    title: string
    disabled?: boolean
    textOnly?: boolean
}

export interface ToggleProps {
    checked: boolean
    handler: () => void
}

export interface ListProps {
    data: string[];
    title?: string
}

export interface DropdownProps<T> {
    valueId: string
    handler?: (e: React.ChangeEvent<HTMLSelectElement>) => void
    placeHolderString: string
    data: T[]
}
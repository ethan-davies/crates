export interface CrateResponse {
    id: string
    result: 'success' | 'failed'
    properties: CrateProperties
    items?: Record<string, any>
    error?: {
        code: string
        message: string
    }
}

export interface CrateProperties {
    locked?: boolean
    stored?: boolean
    empty?: boolean
}

export interface CrateContent {
    id: string
    items: Record<string, any>
    properties: CrateProperties
}

import { CrateResponse } from "../Types"

export const Errors = {
    CRATE_LOCKED: 'Crate is immutable, cannot be modified',
    CRATE_STORED: 'Crate is already stored'
} as const

export function printErrorMessage(error: keyof typeof Errors) {
    console.log(`${error}: ${Errors[error]}`)
}

export default class CrateError extends Error {
    response: CrateResponse

    constructor(id: string, issue: keyof typeof Errors) {
        const message = Errors[issue]

        super(message)
        this.response = {
            id,
            result: 'failed',
            properties: {},
            error: {
                code: issue,
                message,
            },
        }
    }
}
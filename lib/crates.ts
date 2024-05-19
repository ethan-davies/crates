import { v4 as uuidv4 } from 'uuid'
import { CrateProperties, CrateContent } from './Types'
import { Store } from './Store'
import CrateError from './utils/ErrorHandler'
import CrateBuilder from './CrateBuilder'

export * from './Types'
export * from './Store'

export class Crate {
    public items: Record<string, any> = {}
    public id: string
    private properties: CrateProperties

    private constructor(properties: CrateProperties = {}) {
        this.properties = properties
        this.id = uuidv4()
    }

    public static init(properties?: CrateProperties): CrateBuilder { 
        return new CrateBuilder(new Crate(properties))
    }

    fill(items: Record<string, any>): void {
        if (this.properties.locked) {
            throw new CrateError(this.id, 'CRATE_LOCKED')
        }

        this.items = items
    }

    push(items: Record<string, any>): void {
        if (this.properties.locked) {
            throw new CrateError(this.id, 'CRATE_LOCKED')
        }

        this.items = { ...this.items, ...items }
    }

    lock(): void {
        this.properties.locked = true
    }

    unlock(): void {
        this.properties.locked = false
    }

    get(): CrateContent {
        return {
            id: this.id,
            items: this.items,
            properties: this.properties,
        }
    }

    store(): void {
        if (this.properties.stored) {
            throw new CrateError(this.id, 'CRATE_STORED')
        }

        Store.getInstance().add(this.id, this)
        this.properties.stored = true
    }
}
import { Crate } from "./Crates"

export default class CrateBuilder {
    private crate: Crate

    constructor(crate: Crate) {
        this.crate = crate
    }

    fill(items: Record<string, any>): CrateBuilder {
        this.crate.fill(items)
        return this
    }

    push(items: Record<string, any>): CrateBuilder {
        this.crate.push(items)
        return this
    }

    lock(): CrateBuilder {
        this.crate.lock()
        return this
    }

    unlock(): CrateBuilder {
        this.crate.unlock()
        return this
    }

    get(): CrateBuilder {
        this.crate.get()
        return this;
    }
}


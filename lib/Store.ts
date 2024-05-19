import { Crate } from "./Crates"
import CrateError from "./utils/ErrorHandler"

export class Store {
    private crates: Record<string, Crate> = {}
    private static instance: Store | null = null;

    private constructor() {}

    static getInstance(): Store {
        if (!Store.instance) {
            Store.instance = new Store();
        }
        return Store.instance;
    }

    add(id: string, crate: Crate) {
        this.crates[id] = crate;
    }

    get(id: string) {
        return this.crates[id];
    }

    update(id: string, crate: Crate) {
        const oldCrate = this.crates[id];

        if (oldCrate.get().properties.locked) {
            throw new CrateError(id, 'CRATE_LOCKED');
        }

        this.crates[id] = crate;
    }

    remove(id: string) {
        delete this.crates[id];
    }

    flush() {
        this.crates = {};
    }
}
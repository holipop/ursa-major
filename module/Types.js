/** A namespace for UrsaMajor types.
 * @module Types
 */


/** A enumeration of event types. If you're into that kinda thing.
 * @enum {String}
 */
export const Event = Object.freeze({
    Macro: 'macro',
    Roll: 'roll',
})

/** A class for strictly containing event data.
 * @class
 */
class EventData {
    constructor(id, hook, fn) {
        this.id = id
        this.hook = hook
        this.fn = fn
    }
}

/** An class containing character-specific mechanics.
 * @class
 */
export class Record {
    #player
    #character
    #events = new Map()
    #flags = {
        interrupts: new Set()
    }

    constructor (player, character) {
        this.#player = player
        this.#character = character
    }

    get character () { return this.#character }
    get player () { return this.#player }
    get events () { return this.#events }
    get flags () { return this.#flags }

    get actor () {
        return game.actors.getName(this.#character)
    }

    /** 
     * @param {EventData[]} events 
     */
    setEvent (id, hook, fn) {
        if (Object.values(Event).includes(hook)) {
            this.#events.set(id, new EventData(id, hook, fn))
        } else {
            throw new Error(`${hook} is not a valid event.`)
        }
    }

    /**
     * @param {String} key 
     * @param {*} value 
     */
    setFlag (key, value) {
        Object.assign(this.#flags, { [key]: value })
    }

    /**
     * @param {String} feature 
     */
    interrupt (feature) {
        const arr = this.#flags.interrupts ?? []
        this.setFlag('interrupts', new Set([ ...arr, feature ]))
    }

}

export function getRecord (character) {
    return game.UrsaMajor.records.get(character)
}

/** A mixin for creating an UrsaMajor Item.
 * @param {ACItem} Base 
 * @returns 
 */
export function UMaItemMixin (Base) {
    return class UMaItem extends Base {

        /** Roll the feature to the chat with additional hooks.
         * @override
         * @param {*?} options
         */
        async roll (options = {}) {
            const record = game.UrsaMajor.records.get(this.actor.name)
            if (record) {
                Hooks.call('UMa.roll', this, record)

                if (record.flags.interrupts.has(this.name)) {
                    return
                }
            }
            
            return super.roll(options)
        }

        /** Roll without firing Hook events.
         * @param {*?} options 
         * @param {Boolean?} options.post
         */
        async quietRoll (options = {}) {
            return super.roll(options)
        }
        
    }
}
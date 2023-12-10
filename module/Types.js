/** A namespace for UrsaMajor types.
 * @module Types
 */


/** A enumeration of event types. If you're into that kinda thing.
 * @enum {String}
 */
export const Event = {
    Macro: 'macro',
    Roll: 'roll',
}

/** A class for strictly containing events.
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

    constructor (player, character) {
        this.#player = player
        this.#character = character
    }

    get character () { return this.#character }
    get player () { return this.#player }
    get events () { return this.#events }

    /** 
     * @param {EventData[]} events 
     */
    addEvents (events = []) {
        if (!events.length) {
            throw new TypeError("Cannot pass empty array into Record#addEvents")
        }
        for (const {id, hook, fn} of events) {
            if (Object.values(Event).includes(hook)) {
                this.#events.set(id, new EventData(id, hook, fn))
            } else {
                throw new Error(`${hook} is not a valid event.`)
            }
        }
    }

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
            Hooks.call('UMa.roll', this)
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
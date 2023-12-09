/** A namespace for UrsaMajor types.
 * @module Types
 */


import * as Utils from './Utils.js'

/** A enumeration of event types. If you're into that kinda thing.
 * @enum {String}
 */
export const Event = {
    Macro: 'macro',
    Roll: 'roll',
}

/** An object containing character-specific mechanics.
 * @class
 */
export class Record {
    #id;
    #actor;
    #events = new Map();

    constructor (id) {
        this.#id = id
        this.#actor = game.actors.get(id)
    }

    get id () { return this.#id }
    get actor () { return this.#actor }
    get name () { return this.#actor.name }
    get flags () { return this.#actor.flags.UMa }
    get events () { return this.#events }

    /** Adds an event entry to this record.
     * @param {String} event 
     * @param {String} id 
     * @param {Function} fn 
     */
    addEvent (event, id, fn) {
        if (Object.values(Event).includes(hook)) {
            this.#events.set(id, { id, hook, fn })
        } else {
            throw new Error(game.i18n.format("UMa.ERROR.InvalidEvent", { hook }))
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
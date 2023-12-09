// Ursa Major, a companion module for ACFVTT
// by Holipop

/**
 * game.UrsaMajor - 
 * a readonly object containing the collection of methods and data for automating characters.
 * 
 * UrsaMajor = { records }
 * 
 * UrsaMajor.records - 
 * a Map containing keys
 * 
 * ! a hook event first needs to be defined with `.on`, then it can be fired by `.call`
 */

/**
 * Hooks can be fired:
 * - Before a roll
 * - After a roll
 * - From a macro
 */

/**
 * 1. register a character via name, which adds to the UrsaMajor.records map with the id
 *    as the key and the Record as a value.
 * 2. extend the Item class such that it sends a hook call for that specific kit feature.
 */

/**
 * When Soleil rolls BRRRRRING RING RING RING, UMaItem#roll calls a Hook before it posts: "ursa-major.Melograno.BRRRRRING RING RING RING"
 * Inside Melograno's Record, a Hook was defined for that event to post a dialog for advantage.
 */

import * as config from './module/config.js'
import * as Utils from './module/Utils.js'
import * as Types from './module/Types.js'

Hooks.on('init', () => {

    Utils.log(config.UMa.ascii)
    Utils.log('Initializing Ursa Major Module!')

    CONFIG.Item.documentClass = Types.UMaItemMixin(game.AC.documents.ACItem)

    Hooks.on('UMa.macro', () => {
        Utils.log(`macro!!`)
    })

})
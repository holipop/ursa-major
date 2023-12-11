// Ursa Major, a companion module for ACFVTT
// by Holipop

/**
 * ? REQUESTS:
 * 
 * - Melograno
 *  . Store 'Punchin' in the Numbers' somewhere.
 *  ! 'Bring Bring Bring' ability should bring up an Adv./Disadv. Dialog
 *  . 'Linked With Multiple Devices' lets Melo and another character see each other's
 *    abilities, somehow proc this?
 *  . 'Punchin' in the Numbers' 39 upgrade lets him roll another die under certain 
 *    conditions, so having an additional button there to click would be cool.
 * 
 * - Vis
 *  . Have a roll include a rollable table result
 */

import * as config from './module/config.js'
import * as Utils from './module/Utils.js'
import * as Types from './module/Types.js'

// Players
import * as SolielRecords from './module/records/soleil/_module.js'
import * as ScarletRecords from './module/records/scarlet/_module.js'

Hooks.on('init', () => {
    Utils.log(config.UMa.ascii)
    Utils.log('Initializing Ursa Major Module!')

    CONFIG.Item.documentClass = Types.UMaItemMixin(game.AC.documents.ACItem)

    const zip = (a, b) => a.map((entry, index) => [entry, b[index]]);
    const records = Object.values({
        ...SolielRecords,
        ...ScarletRecords,
    })
    const chars = records.map(rec => rec.character)

    game.UrsaMajor = Object.freeze({
        records: new Map(zip(chars, records))
    })
})

Hooks.on('ready', () => {
    for (const [char, record] of game.UrsaMajor.records) {
        if (!game.actors.getName(char)) {
            Utils.log(`'${char}' cannot be found in Actor directory, skipping hooks.`)
            continue
        }

        Utils.group(`Hooking events for ${char}.`)

        for (const [id, event] of record.events) {
            Hooks.on(`UMa.${event.hook}`, (...args) => {
                if (record.character != game.user.character.name) {
                    return
                }
                Utils.log(`Firing '${event.id}' for ${record.character}.`)
                event.fn(...args);
            })
            Utils.log(`Hooked '${id}' event to '${event.hook}'.`)
        }
        console.groupEnd()
    }
})
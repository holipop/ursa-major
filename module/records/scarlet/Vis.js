import * as Types from '../../Types.js'

export const Vis = new Types.Record('Scarlet', 'Vis Faedelcrane');

Vis.addEvents([
    {
        id: 'passive',
        hook: 'roll',
        fn: () => {
            console.log('hey!')
        }
    }
])
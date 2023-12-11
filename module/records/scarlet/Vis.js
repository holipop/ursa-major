import * as Types from '../../Types.js'

export const Vis = new Types.Record('Scarlet', 'Vis Faedelcrane');

Vis.interrupt('Mythril')
Vis.setEvent('passive', Types.Event.Roll, () => {
    console.log('hey!')
})

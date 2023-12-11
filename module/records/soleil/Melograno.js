import * as Types from '../../Types.js'

export const Melo = new Types.Record('Soleil', 'Melograno Valentine');

Melo.interrupt('BRRRRRING RING RING RING');
Melo.setEvent('SavingMinutes', 'roll', (item, record) => {
    if (item.name !== 'BRRRRRING RING RING RING') return;

    // 1. create a dialog prompt with a single checkbox
    // 2. change the formula of the item in-memory
    // 3. roll it
    
    Dialog.create({

    })
})
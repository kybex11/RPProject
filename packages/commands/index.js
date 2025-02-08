mp.events.add('command:hp', (player) => {
    player.health = 100;
});

mp.events.add('command:armor', (player) => {
    player.armour = 100;
});

mp.events.add('command:kill', (player) => {
    player.health = 0;
});

mp.events.add('command:try', (player, text) => {
    let output;

    const luck = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
    
    if (text) {
        if (luck == 1) {
            output = `${player.name}: ${text}. Удачно`;
        } else if (luck == 2) {
            output = `${player.name}: ${text}. Не удачно`;
        }
    } else {
        if (luck == 1) {
            output = `${player.name}: Удачно`;
        } else if (luck == 2) {
            output = `${player.name}: Не удачно`;
        }
    }
})

mp.events.add("command:give:weapon", (player, fullText, weapon, ammo) => {
  player.giveWeapon(mp.joaat(weapon), parseInt(ammo) || 10000);
});

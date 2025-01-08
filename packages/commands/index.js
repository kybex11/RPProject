mp.events.add('command:hp', (player) => {
    player.health = 100;
});

mp.events.add('command:armor', (player) => {
    player.armour = 100;
});

mp.events.add('command:kill', (player) => {
    player.health = 0;
});

mp.events.add("command:give:weapon", (player, fullText, weapon, ammo) => {
  player.giveWeapon(mp.joaat(weapon), parseInt(ammo) || 10000);
});

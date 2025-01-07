mp.console.logInfo("client events loaded");

mp.events.add('playerSpawn', (player) => {
  mp.console.logInfo(`Player ${player.name} has been spawned`);
  mp.gui.chat.push(`${player.name} has spawned on the server!`);
})

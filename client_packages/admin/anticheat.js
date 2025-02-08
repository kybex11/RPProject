let oldPos;

mp.events.add("playerSpawn", (player) => {
    oldPos = player.position;
})


mp.events.add("render", () => {
    const player = mp.players.local;
    const newPos = player.position;

    if (newPos.distanceTo(oldPos) > 0.1) {
        if (newPos.distanceTo(oldPos) > 10) {

        }
        oldPos = newPos;
    }
})
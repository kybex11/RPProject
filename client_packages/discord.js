mp.discord.update("Проводит время", "");

mp.events.add('playerEnterVehicle', () => {
    mp.discord.update("За рулем", "");
});
mp.events.add('playerLeaveVehicle', () => {
    mp.discord.update("Проводит время", "");
})
mp.events.add('playerStartTalking', () => {
    mp.discord.update("Говорит в войс", "");
})
mp.events.add('playerStopTalking', () => {
    mp.discord.update("Проводит время", "");
})

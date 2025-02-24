let oldPos;
let lastTime = Date.now();
let playerInCar = false;

//mp.events.add('playerEnterVehicle', true, () => {
//    playerInCar = true;
//})
//
//mp.events.add('playerLeaveVehicle', true, () => {
//    playerInCar = false;
//})

mp.events.add("playerSpawn", (player) => {
    oldPos = player.position;
})


mp.events.add("render", () => {
    const currentTime = Date.now();
    if (currentTime - lastTime < 1000) return;

    const player = mp.players.local;
    const newPos = player.position;

    if (!newPos || !oldPos) {
        mp.console.logInfo("Ошибка: позиция игрока не определена.");
        return;
    }

    const distance = calculateDistance(newPos, oldPos);
    const timeDiff = currentTime - lastTime;

    if (playerInCar) {
        if (distance > 10 && timeDiff < 1000) {
            mp.console.logInfo(`Подозрение на телепортацию! Расстояние: ${distance}, Время: ${timeDiff}ms`);
        }

        if (newPos.z - oldPos.z > 3 && !isGroundBelow(newPos)) {
            mp.console.logInfo("Подозрение на использование flyhack!");
        }

        if (Math.abs(newPos.z - oldPos.z) > 3 && !isNaturalHeightChange(player, newPos, oldPos)) {
            mp.console.logInfo(`Подозрение на изменение высоты! Изменение: ${newPos.z - oldPos.z} метров`);
        }

        const speed = distance / (timeDiff / 1000);
        if (speed > 10) {
            mp.console.logInfo("Подозрение на использование speedhack!");
        }
    }

    if (distance > 0.1) {
        oldPos = newPos;
        lastTime = currentTime;
    }
})

function calculateDistance(pos1, pos2) {
    return Math.sqrt(
        (pos2.x - pos1.x) ** 2 +
        (pos2.y - pos1.y) ** 2 +
        (pos2.z - pos1.z) ** 2
    );
}

// Функция для проверки наличия земли под игроком
function isGroundBelow(position) {
    const groundZ = mp.game.gameplay.getGroundZFor3dCoord(position.x, position.y, position.z, 0, false);
    return position.z - groundZ < 3; // Проверяем, что разница между текущей высотой и высотой земли меньше 3 метров
}

// Функция для проверки естественности изменения высоты
function isNaturalHeightChange(player, newPos, oldPos) {
    // Псевдокод для демонстрации логики
    const heightChanges = player.heightHistory || [];
    heightChanges.push(newPos.z - oldPos.z);
    if (heightChanges.length > 5) heightChanges.shift(); // Ограничиваем историю

    const averageChange = heightChanges.reduce((a, b) => a + b, 0) / heightChanges.length;
    return Math.abs(averageChange) < 3; // Проверяем, что среднее изменение высоты меньше 3 метров
}

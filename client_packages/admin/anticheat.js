let oldPos;
let lastTime = Date.now();

mp.events.add("playerSpawn", (player) => {
    oldPos = player.position;
})


mp.events.add("render", () => {
    const player = mp.players.local;
    const newPos = player.position;
    const currentTime = Date.now();

    // Улучшенная проверка на телепортацию с логированием деталей
    if (newPos.distanceTo(oldPos) > 10) {
        const timeDiff = currentTime - lastTime;
        if (timeDiff < 1000) { 
            console.log(`Подозрение на телепортацию! Расстояние: ${newPos.distanceTo(oldPos)}, Время: ${timeDiff}ms`);
        }
    }

    // Добавление проверки на слишком быстрое перемещение
    const speed = newPos.distanceTo(oldPos) / ((currentTime - lastTime) / 1000);
    if (speed > 5) { // предположим, что 5 м/с - это слишком быстро для обычного перемещения
        console.log("Подозрение на использование speedhack!");
    }

    // Добавление проверки на полет
    if (newPos.z - oldPos.z > 3) {
        console.log("Подозрение на использование flyhack!");
    }

    // Дополнительная проверка на изменение высоты
    if (Math.abs(newPos.z - oldPos.z) > 3) { // чувствительность к изменению высоты на 3 метр
        console.log(`Подозрение на изменение высоты! Изменение: ${newPos.z - oldPos.z} метров`);
    }

    // Обновление позиции и времени
    if (newPos.distanceTo(oldPos) > 0.1) {
        oldPos = newPos;
        lastTime = currentTime;
    }
})
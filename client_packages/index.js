mp.gui.chat.show(false);

try {
    require('rage-builder');
    require('./discord');
    require('./imports');

    require("MapEditor/MapEditor.js");
    require("MapEditor/object_data.js");
    require("MapEditor/Natives.js");

    mp.consoe.logInfo('Клиентские скрипты загружены успешно');
} catch (e) {
    mp.console.logError('Ошибка загрузки клиентских скриптов:', e);
}

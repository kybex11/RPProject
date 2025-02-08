mp.gui.chat.show(false);

try {
    require('rage-builder');
    require('./discord');
    require('./imports');

    mp.consoe.logInfo('Клиентские скрипты загружены успешно');
} catch (e) {
    mp.console.logError('Ошибка загрузки клиентских скриптов:', e);
}

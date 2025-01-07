try {
    require('./events');
    require('rage-builder');
    mp.console.logInfo('Клиентские скрипты загружены успешно');
} catch (e) {
    mp.console.logError('Ошибка загрузки клиентских скриптов:', e);
}

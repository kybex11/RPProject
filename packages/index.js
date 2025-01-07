
try {
    require('./commands');
    require('./events');
    mp.console.logInfo('Серверные скрипты загружены успешно');
} catch (e) {
    mp.console.logError('Ошибка загрузки серыерных скриптов:', e);
}
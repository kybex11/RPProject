let isAuth = false;
let _GUIVisiblity = true;

try {
    mp.events.add("consoleCommand", (command) => {
      mp.console.clear();
    });
    
    let chat = mp.browsers.new('package://chat/html/index.html');
    require('rage-builder');
    require('./events');

    mp.console.logInfo('Клиентские скрипты загружены успешно');
} catch (e) {
    mp.console.logError('Ошибка загрузки клиентских скриптов:', e);
}

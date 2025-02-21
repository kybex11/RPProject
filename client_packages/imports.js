try {

    require('./gui/phone/index');
    require('./gui/inventory/index');
    require('./gui/chat/index');
    //require('./admin/index.js');
    require('anticheat');
    require('./addons/vspawner/index');
    mp.console.logInfo("Loaded");
} catch (e) {
    mp.console.logError(e);
}

//require('./items/index');

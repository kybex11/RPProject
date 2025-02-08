try {
    
    require('./gui/phone/index');
    require('./gui/inventory/index');
    require('./gui/chat/index');
    
    require('./addons/vspawner/index');
    mp.console.logInfo("Loaded");
} catch (e) {
    mp.console.logError(e);
}

//require('./items/index');

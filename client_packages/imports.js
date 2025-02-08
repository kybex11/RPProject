try {
    
    require('./gui/phone/index');
    require('./gui/inventory/index');
    require('./gui/chat/index');
    mp.console.logInfo("GUI Loaded");
} catch (e) {
    mp.console.logError(e);
}

//require('./items/index');

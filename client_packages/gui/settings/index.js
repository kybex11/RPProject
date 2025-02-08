let isSettingsShow = false;
let settings = null;

mp.keys.bind(0x79, true, function() {
    if (!isSettingsShow) {
        if (!settings) {
            settings = mp.browsers.new('package://gui/settings/html/index.html');
        }
        settings.active = true;
        isSettingsShow = true;
    } else {
        if (settings) {
            settings.active = false;
        }
        isSettingsShow = false;
    }   
}) ;
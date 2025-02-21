let chat = mp.browsers.new('package://gui/chat/html/index.html');
let active = false;

mp.keys.bind(0x54, true, () => {
    active = true;
    mp.gui.cursor.show(true, true);
    mp.gui.cursor.visible = true;
    mp.events.call('toggleChatVisibility');
});

mp.keys.bind(0x1B, true, () => {
    if (active) {
        active = false;
        mp.gui.cursor.show(true, false);
        mp.gui.cursor.visible = false;
        mp.events.call('toggleChatVisibility');
    } else {
        // Здесь код для открытия игрового меню, если чат не активен
    }
})

mp.events.add('getChatActiveStatus', () => {
    return active;
})
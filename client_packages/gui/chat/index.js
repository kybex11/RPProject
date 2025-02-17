let chat = mp.browsers.new('package://gui/chat/html/index.html');
let active = false;

mp.keys.bind(0x54, true, () => {
    active = true;
    mp.gui.cursor.show(true, true);
    mp.gui.cursor.visible = true;
});

mp.keys.bind(0x08, true, () => {
    active = false;
    mp.gui.cursor.show(true, false);
    mp.gui.cursor.visible = false;
})

mp.events.add('getChatActiveStatus', () => {
    return active;
})
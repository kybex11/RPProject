let isPhoneShow = false;
let phone = null;

//  (стрелка вверх)
mp.keys.bind(0x26, true, function() {
    if (!isPhoneShow) {
        if (!phone) {
            phone = mp.browsers.new('package://gui/phone/html/index.html');
        }
        phone.active = true;
        isPhoneShow = true;
    } else {
        if (phone) {
            phone.active = false;
        }
        isPhoneShow = false;
    }
});

mp.keys.bind(0x08, true, function() {
    if (isPhoneShow && phone) {
        phone.active = false;
        isPhoneShow = false;
    }
});
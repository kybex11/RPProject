let isPhoneShow = false;
let phone = null;

//  (стрелка вверх)
mp.keys.bind(0x26, true, function() {
    setTimeout(() => {
        if (!isPhoneShow) {
            if (!phone) {
                phone = mp.browsers.new('package://gui/phone/html/index.html');
            }
            phone.active = true;
            isPhoneShow = true;
        }
    }, 1000);
});

// (escape)
mp.keys.bind(0x08, true, function() {
    setTimeout(() => {
        if (isPhoneShow && phone) {
            phone.active = false;
            isPhoneShow = false;
        }
    }, 1000);
});
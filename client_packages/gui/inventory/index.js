let isInventoryShow = false;
let inventory = null;

//arrow up
mp.keys.bind(0x49, true, function () {
    if (!isInventoryShow) {
        if (!inventory) {
            inventory = mp.browsers.new('package://gui/inventory/html/index.html');
        }
        if (!inventory == null) {
            inventory.active = true;
            isInventoryShow = true;
        }
    } else {
        if (inventory) {
            inventory.active = false;
            isInventoryShow = false;
        }
    }
});

//espace
mp.keys.bind(0x1B, isInventoryShow, function () {
    if (inventory) {
        inventory.active = false;
        isInventoryShow = false;
    }
});

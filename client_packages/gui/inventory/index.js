let isInventoryShow = false;
let inventory = null;

mp.keys.bind(0x49, true, function() {
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

mp.keys.bind(0x08, isInventoryShow, function() {
        inventory.active = false;
        isInventoryShow = false;
});

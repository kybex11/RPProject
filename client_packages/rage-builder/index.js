// Импортируем необходимые функции
const CHANGE_EDITOR_MODE_BUTTON = 0x71; // F2
const MODE_FLY = 0;
const MODE_SELECT = 1;

const previewCamera = mp.cameras.new('default', new mp.Vector3(-485, 1095.75, 323.85), new mp.Vector3(0,0,0), 40);

let isEditorStarted = false;
let currentMode = 0;
let browser = false;
let previewObject = false;

let objectsCounter = 0;
let mapObjects = new Array();
let mapName = false;
let selectedObject = false;

const KEY_DELETE = 46; // Delete

let mapsList = [];

let idleCameraTimer = false;
let previewTimer = false;

// Добавляем функцию highlightEntity из functions.js
function highlightEntity(selectedObject) {
    const { min, max } = mp.game.gameplay.getModelDimensions(selectedObject.getModel());
    const { position } = selectedObject;

    const TOP_1 = {x: position.x + min.x, y: position.y + min.y, z: position.z + max.z};
    const TOP_2 = {x: position.x + max.x, y: position.y + min.y, z: position.z + max.z};
    const TOP_3 = {x: position.x + max.x, y: position.y + max.y, z: position.z + max.z};
    const TOP_4 = {x: position.x + min.x, y: position.y + max.y, z: position.z + max.z};

    const BOTTOM_1 = {x: position.x + min.x, y: position.y + min.y, z: position.z + min.z};
    const BOTTOM_2 = {x: position.x + max.x, y: position.y + min.y, z: position.z + min.z};
    const BOTTOM_3 = {x: position.x + max.x, y: position.y + max.y, z: position.z + min.z};
    const BOTTOM_4 = {x: position.x + min.x, y: position.y + max.y, z: position.z + min.z};

    // Draw top square
    mp.game.graphics.drawLine(
        TOP_1.x, TOP_1.y, TOP_1.z,
        TOP_2.x, TOP_2.y, TOP_2.z,
        255, 0, 0, 255
    );

    mp.game.graphics.drawLine(
        TOP_2.x, TOP_2.y, TOP_2.z,
        TOP_3.x, TOP_3.y, TOP_3.z,
        255, 255, 0, 255
    );

    mp.game.graphics.drawLine(
        TOP_3.x, TOP_3.y, TOP_3.z,
        TOP_4.x, TOP_4.y, TOP_4.z,
        0, 255, 0, 255
    );

    mp.game.graphics.drawLine(
        TOP_4.x, TOP_4.y, TOP_4.z,
        TOP_1.x, TOP_1.y, TOP_1.z,
        0, 0, 255, 255
    );

    // Draw bottom square
    mp.game.graphics.drawLine(
        BOTTOM_1.x, BOTTOM_1.y, BOTTOM_1.z,
        BOTTOM_2.x, BOTTOM_2.y, BOTTOM_2.z,
        255, 0, 0, 255
    );

    mp.game.graphics.drawLine(
        BOTTOM_2.x, BOTTOM_2.y, BOTTOM_2.z,
        BOTTOM_3.x, BOTTOM_3.y, BOTTOM_3.z,
        255, 255, 0, 255
    );

    mp.game.graphics.drawLine(
        BOTTOM_3.x, BOTTOM_3.y, BOTTOM_3.z,
        BOTTOM_4.x, BOTTOM_4.y, BOTTOM_4.z,
        0, 255, 0, 255
    );

    mp.game.graphics.drawLine(
        BOTTOM_4.x, BOTTOM_4.y, BOTTOM_4.z,
        BOTTOM_1.x, BOTTOM_1.y, BOTTOM_1.z,
        0, 0, 255, 255
    );

    // Draw vertical lines
    mp.game.graphics.drawLine(
        BOTTOM_1.x, BOTTOM_1.y, BOTTOM_1.z,
        TOP_1.x, TOP_1.y, TOP_1.z,
        255, 0, 0, 255
    );

    mp.game.graphics.drawLine(
        BOTTOM_2.x, BOTTOM_2.y, BOTTOM_2.z,
        TOP_2.x, TOP_2.y, TOP_2.z,
        255, 255, 0, 255
    );

    mp.game.graphics.drawLine(
        BOTTOM_3.x, BOTTOM_3.y, BOTTOM_3.z,
        TOP_3.x, TOP_3.y, TOP_3.z,
        0, 255, 0, 255
    );

    mp.game.graphics.drawLine(
        BOTTOM_4.x, BOTTOM_4.y, BOTTOM_4.z,
        TOP_4.x, TOP_4.y, TOP_4.z,
        0, 0, 255, 255
    );
}

// Добавляем функции из movement.js
let isEnabled = false;
let isPaused = false;
const localPlayer = mp.players.local;
const camera = mp.cameras.new("gameplay");

const KEY_FORWARD = 87; // W
const KEY_BACK = 83; // A
const KEY_LEFT = 65; // S
const KEY_RIGHT = 68; // D
const KEY_UP = 33; // Page Up
const KEY_DOWN = 34; // Page Down
const KEY_FAST = 16; // LShift
const KEY_SLOW = 18; // Alt
const KEY_ROTATE = 17; // Ctrl

const SPEED_NORMAL = 1;
const SPEED_SLOW = 0.15;
const SPEED_FAST = 4;

function freecamToggle() {
    isEnabled = !isEnabled;
    localPlayer.setInvincible(isEnabled);
    localPlayer.freezePosition(isEnabled);
    localPlayer.setAlpha(isEnabled ? 0 : 255);
    localPlayer.setCollision(!isEnabled, !isEnabled);
}

function freecamPause() {
    if (!isEnabled) return;
    isPaused = true;
}

function freecamUnpause() {
    if (!isEnabled) return;
    isPaused = false;
}

function freecamFrameProcess() {
    if (!isEnabled || isPaused) return;

    let { position } = localPlayer;
    const direction = camera.getDirection();

    let speed = movementGetSpeed();

    if (mp.keys.isDown(KEY_FORWARD) === true) {
        position.x += direction.x * speed;
        position.y += direction.y * speed;
        position.z += direction.z * speed;
    } else if (mp.keys.isDown(KEY_BACK) === true) {
        position.x -= direction.x * speed;
        position.y -= direction.y * speed;
        position.z -= direction.z * speed;
    }

    if (mp.keys.isDown(KEY_LEFT) === true) {
        position.x += (-direction.y) * speed;
        position.y += direction.x * speed;
    } else if (mp.keys.isDown(KEY_RIGHT) === true) {
        position.x -= (-direction.y) * speed;
        position.y -= direction.x * speed;
    }

    if (mp.keys.isDown(KEY_UP) === true) {
        position.z += speed;
    } else if (mp.keys.isDown(KEY_DOWN) === true) {
        position.z -= speed;
    }

    localPlayer.position = position;
}

function movementGetSpeed() {
    if (mp.keys.isDown(KEY_FAST) === true) {
        return SPEED_FAST;
    } else if (mp.keys.isDown(KEY_SLOW) === true) {
        return SPEED_SLOW;
    }
    return SPEED_NORMAL;
}

function elementMoveFrameProcess(selectedObject) {
    const is_rotating = mp.keys.isDown(KEY_ROTATE);
    return is_rotating ? rotateObject(selectedObject) : moveObject(selectedObject);
}

function moveObject(selectedObject) {
    let { position } = selectedObject;
    let speed = movementGetSpeed() * 0.05;
    const direction = camera.getDirection();

    if (mp.keys.isDown(KEY_FORWARD) === true) {
        position.x += direction.x * speed;
        position.y += direction.y * speed;
    } else if (mp.keys.isDown(KEY_BACK) === true) {
        position.x -= direction.x * speed;
        position.y -= direction.y * speed;
    }

    if (mp.keys.isDown(KEY_LEFT) === true) {
        position.x += (-direction.y) * speed;
        position.y += direction.x * speed;
    } else if (mp.keys.isDown(KEY_RIGHT) === true) {
        position.x -= (-direction.y) * speed;
        position.y -= direction.x * speed;
    }

    if (mp.keys.isDown(KEY_UP) === true) {
        position.z += speed;
    } else if (mp.keys.isDown(KEY_DOWN) === true) {
        position.z -= speed;
    }

    selectedObject.position = position;
}

function rotateObject(selectedObject) {
    let { rotation } = selectedObject;
    let speed = movementGetSpeed() * 0.4;

    if (mp.keys.isDown(KEY_FORWARD) === true) {
        rotation.x += speed;
    } else if (mp.keys.isDown(KEY_BACK) === true) {
        rotation.x -= speed;
    }

    if (mp.keys.isDown(KEY_LEFT) === true) {
        rotation.y -= speed;
    } else if (mp.keys.isDown(KEY_RIGHT) === true) {
        rotation.y += speed;
    }

    if (mp.keys.isDown(KEY_UP) === true) {
        rotation.z += speed;
    } else if (mp.keys.isDown(KEY_DOWN) === true) {
        rotation.z -= speed;
    }

    selectedObject.rotation = rotation;
}

// Основные обработчики событий
mp.events.add('render', () => {
    if(!isEditorStarted) return;

    if(currentMode == MODE_FLY) {
        freecamFrameProcess();
    } else if(currentMode == MODE_SELECT) {
        processDeleteKey();
        renderModeSelect();
    }
});

function renderModeSelect() {
    if(!selectedObject) return;

    highlightEntity(selectedObject);

    if (currentMode == MODE_SELECT) {
        elementMoveFrameProcess(selectedObject);
    }
}

mp.events.add("playerStartMapEditor", (_mapsList) => {
    if( isEditorStarted ) return mp.game.graphics.notify("~r~ERROR: Rage Builder already started");

    if(!browser) {
        browser = mp.browsers.new('package://rage-builder/html/index.html');
    } else {
        browser.active = true;
    }

    mapsList = _mapsList;

    freecamToggle();
    suppressIdleCamera();
    mp.keys.bind(CHANGE_EDITOR_MODE_BUTTON, true, changeMode);
    isEditorStarted = true;
    selectedObject = false;
    currentMode = MODE_FLY;
    mp.game.graphics.notify('~g~Map Editor ~w~started');
});

mp.events.add('browserDomReady', (_browser) => {
    if(browser == _browser){
        updateMapsList();
    }
});


function updateMapsList(){
    browser.call('cef:clearMapsList');
    mapsList.forEach( _mapName => {
        browser.call('cef:addMapsListItem', _mapName );
    });
}

function changeMode(){
    if (currentMode == MODE_FLY){
        browser.call('cef:setCursorVisible', true);
        currentMode = MODE_SELECT;
        freecamPause();
    } else if (currentMode == MODE_SELECT){
        browser.call('cef:setCursorVisible', false);
        currentMode = MODE_FLY;
        freecamUnpause();
    }
}

mp.events.add("client:objectSelected", (modelName) => {
    addMapObject(modelName, localPlayer.position);
});

mp.events.add("client:elementFocus", (elementId) => {
    selectedObject = mapObjects[elementId];
});

mp.events.add("client:objectPreview", (modelName) => {
    const { position } = localPlayer;
    const mapOffset = 2000;
    const minOffset = 3;
    const { min, max } = mp.game.gameplay.getModelDimensions( mp.game.joaat( modelName ) );
    const xOffset = max.x - min.x + minOffset;
    const yOffset = max.y - min.y + minOffset;
    const zOffset = max.z - min.z + minOffset;

    if(previewObject){
        previewObject.destroy();
    }

    previewObject = mp.objects.new( mp.game.joaat( modelName ), new mp.Vector3(position.x + xOffset, position.y + yOffset, position.z + mapOffset - zOffset) );
    previewCamera.setCoord(position.x, position.y, position.z + mapOffset);
    previewCamera.setActive(true);
    previewCamera.pointAtCoord(position.x + xOffset, position.y + yOffset, position.z + mapOffset - zOffset);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);

    startPreviewRotation();
});

mp.events.add("client:exitPreview", () => {
    previewCamera.setActive(false);
    stopPreviewRotation();
    if(previewObject){
        previewObject.destroy();
        previewObject = false;
    }
    mp.game.cam.renderScriptCams(false, false, 0, true, false);
});

function startPreviewRotation(){
    if(previewTimer){
        stopPreviewRotation();
    }
    previewTimer = setInterval(rotatePreviewObject, 20);
}

function stopPreviewRotation(){
    clearInterval(previewTimer);
    previewTimer = false;
}

function rotatePreviewObject(){
    if (!previewObject) return;
    const { rotation } = previewObject;
    previewObject.rotation = new mp.Vector3(rotation.x, rotation.y, rotation.z + 0.7);
}


mp.events.add("updatePlacedObjectsList", () => {
    if(mapObjects.length > 0){
        browser.execute('clearPlacedObjectsList()');
    }

    mapObjects.forEach( (object, id) => {
        const modelName = object.getModel();
        browser.execute(`addPlacedObjectsListEntry('${id}', '${modelName}')`);
    });

    browser.execute('showPlacedObjectsList()');
});

mp.events.add("client:requestMapSave", (_mapName = false) => {

    if(_mapName){
        mapName = _mapName;
    }

    if(mapObjects.length == 0){
        return mp.game.graphics.notify("~r~ERROR: Map has no elements");
    }

    if( !mapName ){
        return browser.call('cef:showNewMapNameDialog');
    }

    mp.events.callRemote('server:mapSave', mapName, convertMapToJsonString() );
});

mp.events.add("client:mapSaved", (_mapsList) => {
    mapsList = _mapsList;
    updateMapsList();
    mp.game.graphics.notify('Map saved successfully');
});

mp.events.add("client:requestNewMap", (ignoreUnsaved = false) => {

    if(mapObjects.length > 0 && !ignoreUnsaved){
        return browser.call('cef:showNewMapIgnoreUnsavedDialog');
    }

    clearMap();
    mp.events.callRemote('server:mapNew' );
});

mp.events.add("client:requestExit", () => {
    clearMap();
    freecamToggle();
    browser.call('cef:setCursorVisible', false);
    browser.active = false;
    isEditorStarted = false;
    currentMode = MODE_FLY;
    mp.keys.unbind(CHANGE_EDITOR_MODE_BUTTON, true, changeMode);
    killIdleCameraTimer();
    mp.game.graphics.notify('~g~Rage Builder ~w~closed');
    mp.events.callRemote('server:exitBuilder' );
});

mp.events.add("client:requestMapOpen", (_mapName) => {
    mp.events.callRemote('server:mapOpen', _mapName );
});

mp.events.add("client:editorOpenMap", (data) => {
    const mapData = JSON.parse(data);
    clearMap();

    mapName = mapData.name;
    mapData.elements.forEach( element => {
        if (element.type != 'object') return;
        addMapObject(element.modelName, element.position, element.rotation);
    });
});

function addMapObject(modelName, position, rotation = new mp.Vector3(0,0,0)){
    selectedObject = mp.objects.new(
        mp.game.joaat( modelName ),
        position,
        {
            rotation: rotation
        }
    );
    selectedObject.modelName = modelName;
    mapObjects[objectsCounter] =  selectedObject;
    browser.execute(`addMapElement('${objectsCounter}', '${modelName}')`);
    objectsCounter++;
}

function clearMap(){
    objectsCounter = 0;
    mapObjects.forEach( object => {
        object.destroy();
    })
    mapObjects = new Array();
    mapName = false;
    selectedObject = false;
}


function convertMapToJsonString(){
    let map = {};

    map.name = mapName;
    map.elements = [];

    mapObjects.forEach((object) => {
       const { modelName, position, rotation } = object;
       const type = getElementType(object);

       let element = {
           modelName,
           type,
           position,
           rotation
       };

        map.elements.push( element );
    });


    return JSON.stringify(map);
}

function getElementType(element){
    const types = [
        'no entity',
        'ped',
        'vehicle',
        'object',
        'player'
    ];

    const typeId = element.getType();
    if( types[typeId] ){
        return types[typeId];
    }

    return types[0];
}

function suppressIdleCamera(){
    idleCameraTimer = setInterval(() => {
         mp.game.invoke('0x9E4CFFF989258472');
         mp.game.invoke('0xF4F2C0D4EE209E20');
    }, 25000);
}

function killIdleCameraTimer(){
    clearInterval(idleCameraTimer);
    idleCameraTimer = false;
}

mp.events.add('client:confirmObjectDelete', () => {
    deleteObject(selectedObject);
});

function processDeleteKey(){
    if(mp.keys.isDown(KEY_DELETE) === true){
        if(!selectedObject) return mp.game.graphics.notify("~r~ERROR: Object was not selected");
        return browser.call('cef:showObjectDeleteDialog');
    }
}

function deleteObject(object){
    if( selectedObject == object){
        selectedObject = false;
    }

    mapObjects.forEach( (value, index) => {
       if(value == object){
           mapObjects.splice(index, 1);
           browser.execute(`deleteMapElement('${index}')`);
       }
    });

    object.destroy();
}

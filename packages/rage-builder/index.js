const fs = require('fs');

let maps = [];

const { reloadMaps } = require('../rage-builder-maps');

mp.events.add('packagesLoaded', () =>
{
    loadMapsList();
});

function loadMapsList(){
    fs.readdir(__dirname + '/../rage-builder-maps/', (err, files) => {
        files.forEach(fileName => {
            if( fileName.split('.').pop() != 'json') return; // check extension
            maps.push( fileName.replace('.json', '') );
        });
    });
}

function addMapsListItem(mapName){
    if(maps.indexOf(mapName) === -1) {
        maps.push(mapName);
    }
}

mp.events.add("server:command:builder", (player ) => {
    player.call('playerStartMapEditor', [ maps ]);
});


mp.events.add("server:mapOpen", (player, mapName) => {
    mapOpen(player, mapName);
    reloadMaps(mapName);
});

mp.events.add("server:mapNew", () => {
    reloadMaps();
});

mp.events.add("server:exitBuilder", () => {
    reloadMaps();
});

function mapOpen(player, mapName){
    fs.readFile( __dirname + `/../rage-builder-maps/${mapName}.json`, 'utf8', function(err,data){
        if(err){
            return console.log('Map read error: ' + err);
        }

        console.log(`[BUILDER] Player open map: ${mapName}`);
        player.call('client:editorOpenMap', [data]);
    });
}

mp.events.add("server:mapSave", (player, mapName, mapObjectsJson) => {

    fs.writeFile(__dirname + `/../rage-builder-maps/${mapName}.json`, mapObjectsJson, function(err){
        if(err)throw err;
        addMapsListItem(mapName);
        player.call('client:mapSaved', [maps]);
        console.log(`[BUILDER] Map saved: ${mapName}`);
    });

});

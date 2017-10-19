var io = require("socket.io")(1337);
var Player = require("./player");

var players = [];
var playerId = 0;

var sendPlayersUpdate = function () {
    io.emit("players", players.map(ply => ply.name));
};

io.on("connection", function (client) {
    var ply = new Player(++playerId, client);
    players.push(ply);
    ply.connect();
    sendPlayersUpdate();

    client.on("disconnect", function () {
        ply.disconnect();
        var plyId = players.indexOf(ply);
        if (plyId >= 0) players.splice(plyId, 1);
        sendPlayersUpdate();
    });
});
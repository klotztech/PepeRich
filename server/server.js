var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/peperich", {
    socketTimeoutMS: 0,
    keepAlive: true,
    reconnectTries: 30,
    useMongoClient: true
});
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on("error", console.error.bind(console, "mongoose error:"));
db.once("open", function() {
    console.log("mongoose connected.");
});

var Pepe = mongoose.model("Pepe", { name: String });

Pepe.create({ name: 'Classic Pepe' }, function (err, small) {
    if (err) return handleError(err);
    console.log("pepe saved");
});
  

var express = require("express");
var app = express();
var server = require("http").createServer(app);

var io = require("socket.io")(server);
var Player = require("./player");

server.listen(1337);

app.use(express.static(__dirname + "/public"));  
app.get("/", function (req, res) {
    res.end("Hello World");
});

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
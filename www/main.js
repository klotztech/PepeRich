var client = io("http://localhost:1337");

client.on("connect", function () {
    console.log("connected :)");
});

client.on("players", function (players) {
    console.log(players);
    var plyList = $("#players");

    plyList.html("");
    players.forEach(function (ply) {
        $("<div>")
            .text(ply)
            .addClass("player")
            .appendTo(plyList);
    });
});
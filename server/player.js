var fs = require("fs");

class Player {
    constructor(id, client) {
        this.id = id;
        this.client = client;
        this.name = "Player #" + id;
    }
    
    connect() {
        console.log("connect", this.client.handshake.address);
        this.load();
    }
    
    disconnect() {
        console.log("disconnect", this.client.handshake.address);
        this.save();
    }

    load() {
        // fs.readFile("data/" + this.id + ".json", function (err, data) {
        //     if (err) throw err;
        //     var playerData = JSON.parse(data);
        //     console.log("load:", playerData);
        // })
    }

    save() {
        
    }
}

module.exports = Player;
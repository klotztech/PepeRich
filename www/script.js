var rares = [];
for(var i = 0; i <= 19; i++){
    rares.push("pepes/" + i + ".png");
}

var pepe = document.getElementById("pepe");
var kek = [document.getElementById("kek1"), document.getElementById("kek2"), document.getElementById("kek1b"), document.getElementById("kek2b")];
var soos = document.getElementById("soos");
var laal = document.getElementById("laal");
var cunt = 0, saggyCunt = 0;
var powa = 1;
var inta;

var mop;
pepe.addEventListener("mousedown", mop=function (ev) {
    ev.preventDefault();
    powa = 1;
    clearInterval(inta);
    inta = setInterval(function () {
        powa++;
        spawnOne();
        cunt++;
        laal.innerHTML = "+" + powa.toLocaleString("en");
    }, 50);
});
pepe.addEventListener("touchstart", mop);

var mup;
pepe.addEventListener("mouseup", mup=function (ev) {
    ev.preventDefault();
    //powa = Math.max(1, cunt / 100);
    clearInterval(inta);
    laal.innerHTML = "";

    for (var j = 0; j < powa; j++) {
        spawnOne();
    }
    
    cunt += powa;
});
pepe.addEventListener("touchend", mup);

function spawnOne() {
    var p = document.createElement("div");
    //var scl = -Math.log10(Math.random()+0.04)+.4;
    //-1.6(x*2-.85)^2 + 2.2
    //var scl = -1.2 * Math.pow(Math.random()*1.5 - 0.85, 2) + 2.0
    var scl = Math.exp(Math.random()) - 0.5;
    p.style.transform = "rotate(" + (Math.random() * 360) + "deg) scale(" + scl + ")";
    p.className = "pp";
    
    var pee = document.createElement("img");
    pee.style.width = pee.style.height = Math.random() * 32 + 32;
    pee.src = rares[Math.floor(Math.random() * rares.length)];
    pee.draggable = false;
    pee.className = "pee pa" + Math.round(Math.random() * 4);
    p.appendChild(pee);

    kek[Math.floor(Math.random() * kek.length)].appendChild(p);
}

setInterval(function () {
    if (Math.abs(cunt - saggyCunt) < 0.4) return;
    saggyCunt += (cunt - saggyCunt) / 4;
    soos.innerHTML = Math.floor(saggyCunt).toLocaleString("en");
}, 50);

var meem;if((meem=parseInt(location.hash.substr(1)))>0)for(;meem>=0;meem--)setTimeout("spawnOne(cunt++)",meem*10);

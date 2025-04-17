class plot {
    building;
    moneyGen;
    happiness;
    constructor (building, moneyGen, happiness, plotNum) {
        this.building = building;
        this.moneyGen = moneyGen;
        this.happiness = happiness;
    }
    getBuilding() {
        return this.building;
    }
    bank() {
        this.building = "images/apartment.png";
        this.moneyGen = 5;
        this.happiness = 1;

    }
}

let rate = 0;
let happiness = 0;
var KEY = 'changeMoney';
var num = localStorage[KEY];
let parsedArray = JSON.parse(localStorage.getItem("plotArray"));
let tempPlotNum = localStorage.getItem("tempPlotNum");
if (parsedArray) {
    plotArray = parsedArray.map(obj => new plot(obj.building, obj.moneyGen, obj.happiness));
} else {
    plotArray = new Array(16);
}


function startButton () {
    localStorage.clear();
    for (let i = 0; i < plotArray.length; i++) {
        plotArray[i] = new plot("images/emptylot.png", 0, 0)
    }
    console.log(plotArray[0].getBuilding());
    localStorage.setItem("plotArray", JSON.stringify(plotArray));
    console.log("something");
    localStorage[KEY] = 100;
    window.location.href="index.html";
}

function setImage(plotNum) {
    var id = "b" + plotNum;
    const element = document.getElementById(id);
    element.src=plotArray[plotNum].getBuilding();
}

function changeMoney() {
    KEY = 'changeMoney';
    num = localStorage[KEY];
    if (!num) {
        num = 0;
    }
    rate = 0;
    for (const p of plotArray) {
        rate += p.moneyGen;
    }
    const element = document.getElementById("money");
    if (element) {
        element.innerHTML = "$" + num;
        let num2 = Number(num);
        num2+=rate;
        num = num2;
        localStorage[KEY] = num
    }
}

function upgrade(plotNum) {
    tempPlotNum = plotNum;
    localStorage.setItem("tempPlotNum", plotNum);
    window.location.href="shop.html";
}
function clearPlotNum() {
    localStorage.setItem("tempPlotNum", null);
}
function buildBank() {
    if (localStorage[KEY] < 100) {
        localStorage.setItem("tempPlotNum", null);
        return;
    }
    localStorage[KEY] -= 100;
    plotArray[tempPlotNum].bank();
    localStorage.setItem("plotArray", JSON.stringify(plotArray));
    localStorage.setItem("tempPlotNum", null);
    window.location.href = "index.html";
}
//localStorage.clear();
setInterval(changeMoney, 1000);
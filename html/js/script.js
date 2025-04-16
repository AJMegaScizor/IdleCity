let rate = 0;
let happiness = 0;
var KEY = 'changeMoney';
var num = localStorage[KEY];
const plotArray = new Array(16);


function startButton () {
    for (let i = 0; i < plotArray.length; i++) {
        plotArray[i] = new plot("images/apartment.png", 0, 0, i)
    }
    console.log("something");
}

function setImage(plotNum) {
    var id = "b" + plotNum;
    const element = document.getElementById(id);
    element.src=String(plotArray[plotNum].getBuilding());

}

function changeMoney() {
    KEY = 'changeMoney';
    num = localStorage[KEY];
    if (!num) {
        num = 0;
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
//localStorage.clear();
setInterval(changeMoney, 1000);
function buildBank(img) {
    document.getElementById("img").src="images/bread.png";
}

class plot {
    building;
    moneyGen;
    happiness;
    plotNum;
    constructor (building, moneyGen, happiness, plotNum) {
        this.building = building;
        this.moneyGen = moneyGen;
        this.happiness = happiness;
        this.plotNum = plotNum;
    }
    getBuilding() {
        return this.building;
    }
}

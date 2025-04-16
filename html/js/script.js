let rate = 0;
let happiness = 0;
var KEY = 'changeMoney';
var num = localStorage[KEY];
let parsedArray = JSON.parse(localStorage.getItem("plotArray"));
if (parsedArray) {
    plotArray = parsedArray.map(obj => new plot(obj.building, obj.moneyGen, obj.happiness, obj.plotNum));
} else {
    plotArray = new Array(16);
}


function startButton () {
    for (let i = 0; i < plotArray.length; i++) {
        plotArray[i] = new plot("images/apartment.png", 0, 0, i)
    }
    console.log(plotArray[0].getBuilding());
    localStorage.setItem("plotArray", JSON.stringify(plotArray));
    console.log("something");
}

function setImage(plotNum) {
    var id = "b" + plotNum;
    const element = document.getElementById(id);
    element.src=plotArray[1].building();
    console.log(plotArray[1].buidling);

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

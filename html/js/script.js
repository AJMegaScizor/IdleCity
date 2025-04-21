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
    demolish() {
        this.building = "images/emptylot.png";
        this.moneyGen = 0;
        this.happiness = 0;
    }
    bank() {
        this.building = "images/apartment.png";
        this.moneyGen = 5;
        this.happiness = 20;
    }
}

let rate = 0;
let happiness = 0;
var KEY = 'changeMoney';
var num = localStorage[KEY];
let parsedArray = JSON.parse(localStorage.getItem("plotArray"));
let tempPlotNum = localStorage.getItem("tempPlotNum");
var hasStarted = localStorage.getItem("hasStarted");
if (hasStarted === null) {
    hasStarted = String(false);
}
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
    localStorage.setItem("plotArray", JSON.stringify(plotArray));
    console.log("something");
    localStorage[KEY] = 100;
    window.location.href="index.html";
    hasStarted = String(true);
    localStorage.setItem("hasStarted", hasStarted);
}

function setImage(plotNum) {
    var id = "b" + plotNum;
    const element = document.getElementById(id);
    element.src=plotArray[plotNum].getBuilding();
}

function changeMoney() {
    if (hasStarted === String(true)) {
        KEY = 'changeMoney';
        num = localStorage[KEY];
        if (!num) {
            num = 0;
        }
        rate = 0;
        happiness = 0
        for (const p of plotArray) {
            if (p.moneyGen) {
                rate += p.moneyGen;
                happiness += p.happiness
            }
        }
        const emoji = document.getElementById("happiness");
        const element = document.getElementById("money");
        if (emoji) {
            if (happiness < 33) {
                emoji.src = "images/sad.png";
            }
            if (happiness > 33) {
                emoji.src = "images/neutral.png";
            }
            if (happiness > 66) {
                emoji.src = "images/happy.png";
            }
        }
        if (element) {
            element.innerHTML = "$" + num;
            let num2 = Number(num);
            num2+=rate;
            num = num2;
            localStorage[KEY] = num
        }
    }
}
function demolish(plotNum) {
    plotArray[plotNum].demolish();
    localStorage.setItem("plotArray", JSON.stringify(plotArray));
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

function happinessInfo() {
    const tBody = document.getElementById("body");
    let body = '<tr mt-5><th scope="row"><img src="images/bread.png" id="icons" alt="bread"></th> <td>Bank</td> </tr>';
    tBody.innerHTML=body;
    console.log("something happened");

}


//localStorage.clear();
setInterval(changeMoney, 1000);
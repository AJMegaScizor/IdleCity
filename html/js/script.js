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
        const cost = 200;
        if (localStorage[KEY] < cost) {
            localStorage.setItem("tempPlotNum", null);
            
            return;
        }
        this.building = "images/bank.png";
        this.moneyGen = 20;
        this.happiness = 5;
        localStorage[KEY] -= cost;
        localStorage.setItem("plotArray", JSON.stringify(plotArray));
        localStorage.setItem("tempPlotNum", null);
        window.location.href = "index.html";
    }
    apartment() {
        const cost = 50;
        if (localStorage[KEY] < cost) {
            localStorage.setItem("tempPlotNum", null);
            return;
        }
        this.building = "images/apartment.png";
        this.moneyGen = 5;
        this.happiness = 0;
        localStorage[KEY] -= cost;
        localStorage.setItem("plotArray", JSON.stringify(plotArray));
        localStorage.setItem("tempPlotNum", null);
        window.location.href = "index.html";
    }
    theater() {
        const cost = 3500;
        if (localStorage[KEY] < cost) {
            localStorage.setItem("tempPlotNum", null);
            return;
        }
        this.building = "images/theater.png";
        this.moneyGen = -10;
        this.happiness = 25;
        localStorage[KEY] -= cost;
        localStorage.setItem("plotArray", JSON.stringify(plotArray));
        localStorage.setItem("tempPlotNum", null);
        window.location.href = "index.html";
    }
    office() {
        const cost = 4000;
        if (localStorage[KEY] < cost) {
            localStorage.setItem("tempPlotNum", null); 
            return;
        }
        this.building = "images/office.png";
        this.moneyGen = 50;
        this.happiness = -20;
        localStorage[KEY] -= cost;
        localStorage.setItem("plotArray", JSON.stringify(plotArray));
        localStorage.setItem("tempPlotNum", null);
        window.location.href = "index.html";
    }
    school() {
        const cost = 3000;
        if (localStorage[KEY] < cost) {
            localStorage.setItem("tempPlotNum", null);
            return;
        }
        this.building = "images/school.png";
        this.moneyGen = -15;
        this.happiness = 30;
        localStorage[KEY] -= cost;
        localStorage.setItem("plotArray", JSON.stringify(plotArray));
        localStorage.setItem("tempPlotNum", null);
        window.location.href = "index.html";
    }
    supermarket() {
        const cost = 1000;
        if (localStorage[KEY] < cost) {
            localStorage.setItem("tempPlotNum", null);
            return;
        }
        this.building = "images/supermarket.png";
        this.moneyGen = 10;
        this.happiness = 15;
        localStorage[KEY] -= cost;
        localStorage.setItem("plotArray", JSON.stringify(plotArray));
        localStorage.setItem("tempPlotNum", null);
        window.location.href = "index.html";
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
    localStorage[KEY] = 100;
    window.location.href="index.html";
    hasStarted = String(true);
    localStorage.setItem("hasStarted", hasStarted);
}

function setImage(plotNum) {
    var id = "b" + plotNum;
    const element = document.getElementById(id);
    element.src=plotArray[plotNum].getBuilding();
    adjustBuildingPadding();
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
        if (document.getElementById("buildingCount")) {
            const counter = document.getElementById("buildingCount");
            var count = 0;
            for (var p of plotArray) {
                if (p.building !== "images/emptylot.png") {
                    count++;
                }
            }
            counter.innerHTML = `${count} / 16`;
        }

        if (element) {
            element.innerHTML = "$" + num;
        }
        let num2 = Number(num);
        num2+=rate;
        num = num2;
        localStorage[KEY] = num
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
function build(choice) {
    switch (choice) {
        case 1:
            plotArray[tempPlotNum].bank();
            break;
        case 2:
            plotArray[tempPlotNum].apartment();
            break;
        case 3:
            plotArray[tempPlotNum].theater();
            break;
        case 4:
            plotArray[tempPlotNum].office();
            break;
        case 5:
            plotArray[tempPlotNum].school();
            break;
        case 6:
            plotArray[tempPlotNum].supermarket();
            break;
    }
}

if (document.getElementById("body")) {
    document.getElementById("body").addEventListener("load", happinessInfo());
}
if (document.getElementById("incomeRate")) {
    document.getElementById("incomeRate").addEventListener("load", setIncomeRate());
}

function setIncomeRate() {
    var incomeRate = document.getElementById("incomeRate");
    var incomeBody = document.getElementById("incomeBody");
    var bodyHTML = "";
    var rate = 0;
    for (var p of plotArray) {
        rate += p.moneyGen;
        if (p.moneyGen !== 0) {
            if (p.moneyGen > 0) {
                bodyHTML += `<tr class="table-success"><th scope="row"><img src="${p.building}" class="img-fluid footer-icon" id="icons" alt="building"></th> <td>+${p.moneyGen}</td> </tr>`;
            } else {
                bodyHTML += `<tr class="table-danger"><th scope="row"><img src="${p.building}" class="img-fluid footer-icon" id="icons" alt="building"></th> <td>${p.moneyGen}</td> </tr>`;
            }
        }
    }
    incomeRate.innerHTML= `$${rate} / sec`;
    incomeBody.innerHTML = bodyHTML;
}

function happinessInfo() {
    var progressBar = document.getElementById("happinessBar");
    const smile = document.getElementById("smile");
    var happyTotal = 0;
    var tBody = document.getElementById("body");
    var body = "";
    for (var p of plotArray) {
        if (p.happiness !== 0) {
            happyTotal += p.happiness;
            if (p.happiness > 0) {
                body += `<tr class="table-success"><th scope="row"><img src="${p.building}" id="icons" alt="bread"></th> <td>+${p.happiness}</td> </tr>`;
            } else {
                body += `<tr class="table-danger"><th scope="row"><img src="${p.building}" id="icons" alt="bread"></th> <td>${p.happiness}</td> </tr>`;
            }
        }
    }
    if (happyTotal < 33) {
        smile.src = "images/sad.png";
    }
    if (happyTotal > 33) {
        smile.src = "images/neutral.png";
    }
    if (happyTotal > 66) {
        smile.src = "images/happy.png";
    }
    progressBar.style.width = `${happyTotal}%`;
    progressBar.innerHTML = `<h1>${happyTotal}%</h1>`;
    progressBar.style.backgroundColor = "green";

    tBody.innerHTML=body;
}

function adjustBuildingPadding() {
    if (document.getElementById('header')) {
        const header = document.getElementById('header');
        const footer = document.getElementById('footer');
        const buildings = document.getElementById('buildings');
        const headerHeight = header.offsetHeight;
        const footerHeight = footer.offsetHeight;
        buildings.style.paddingTop = `${headerHeight + 20}px`;  // Add extra spacing if needed
        buildings.style.paddingBottom = `${footerHeight + 20}px`;
    }
}
window.addEventListener('load', adjustBuildingPadding);
window.addEventListener('resize', adjustBuildingPadding);

//localStorage.clear();
setInterval(changeMoney, 1000);
let number = 0;
let rate = 1;
let happiness = 0;

function changeMoney() {
    var KEY = 'changeMoney';
    var num = localStorage[KEY];
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

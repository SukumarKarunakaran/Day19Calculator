//calculator container consist of two rows 1. display and 2. keypad.
let calculator = crtel("div","calculator");

// display contains two parts 1. history and output
let display = crtel("div","display");
let history=crtel("div","history");
let historyValue= crtel("p","historyValue");
historyValue.innerText="0";
history.append(historyValue);
let output = crtel("div","output");
let outputValue = crtel("p","outputValue");
outputValue.innerText="0";
output.append(outputValue);
display.append(history,output);

// keypad contains 1. number keys(00,0-9) 2. Operator keys(+,-,*,/) 
//3. All clear key(AC) 4. Clear Entry key (CE) 5. decimal key(.) 6. equals key(=)

let keypad = crtel("div","keypad");
let allclear = crtbtn("button","operator","id","clear","AC");
let clearEntry = crtbtn("button","operator","id","backspace","CE");

let multiply = crtbtn("button","operator","id","multiply","*");
keypad.append(allclear,clearEntry,multiply);

let seven = crtbtn("button","number","id","7","7");
let eight = crtbtn("button","number","id","8","8");
let nine = crtbtn("button","number","id","9","9");
let devide = crtbtn("button","operator","id","divide","/");
keypad.append(seven,eight,nine,devide);

let four = crtbtn("button","number","id","4","4");
let five = crtbtn("button","number","id","5","5");
let six = crtbtn("button","number","id","6","6");
let subtract = crtbtn("button","operator","id","subtract","-");
keypad.append(four,five,six,subtract);

let one = crtbtn("button","number","id","1","1");
let two = crtbtn("button","number","id","2","2");
let three = crtbtn("button","number","id","3","3");
let add = crtbtn("button","operator","id","add","+");
keypad.append(one,two,three,add);

let zero = crtbtn("button","number","id","0","0");
let doublezero = crtbtn("button","number","id","00","00");
let decimalkey = crtbtn("button","decimal","id",".",".");
let equal = crtbtn("button","equal","id","=","=");
keypad.append(zero,doublezero,decimalkey,equal);

calculator.append(display,keypad);
document.body.append(calculator);


function crtel(elementname,attrname){
    let ele = document.createElement(elementname);
    ele.className = attrname;
    return ele;
}

function crtbtn(elementname,attrname,attr1,attr2,value){
    let ele = document.createElement(elementname);
    ele.className = attrname;
    ele.setAttribute(attr1,attr2);
    ele.innerHTML = value;
    return ele;
}

function getHistory(){
    return document.getElementsByClassName("historyValue")[0].innerText;
}
function printHistory(value){
    return document.getElementsByClassName("historyValue")[0].innerText=value;
}

function getOutput(){
    return document.getElementsByClassName("outputValue")[0].innerText;
}

function printOutput(value){
    return document.getElementsByClassName("outputValue")[0].innerText=value;
}
var previousKey = "";
var number = document.getElementsByClassName("number");
for (i=0; i<number.length ; i++){
    number[i].addEventListener("click", function(){
        var displayedNum = getOutput();
        if(displayedNum ==='0' && (this.id === '0' || this.id === '00')){
            printOutput("0");
            previousKey = "number";
        }
        else if(displayedNum ==='0'&& (this.id !== '0' || this.id !== '00')){
            displayedNum = this.id;
            printOutput(displayedNum);
            previousKey = "number";
        }
        else if(displayedNum !== '0'){
            displayedNum =displayedNum + this.id;
            printOutput(displayedNum);
            previousKey = "number";
        }
    })
}

var decimal = document.getElementsByClassName("decimal");
for(var i = 0; i < decimal.length; i++) {
    decimal[i].addEventListener("click",function(){
        var displayedNum = getOutput();
        if (!displayedNum.includes(".")) {
            displayedNum = displayedNum + this.id;
            printOutput(displayedNum);
            previousKey = "decimal";
        }
    })
}

var operator =document.getElementsByClassName("operator");
for(i=0; i<operator.length ; i++){
    operator[i].addEventListener("click", function(){
        if (this.id === "clear"){
            printOutput('0');
            printHistory('0'); 
        }
        else if(this.id === "backspace"){
            var displayedNum =getOutput();
            if(displayedNum.length==1){
                printOutput('0');
            }
            else{
                displayedNum = displayedNum.substring(0,displayedNum.length-1);
                printOutput(displayedNum); 
            }
        }
        else {
            var secondValue = getOutput();
            var firstValue = getHistory();
            if(firstValue === '0'){
                firstValue = secondValue + this.innerText;
                printHistory(firstValue);
                printOutput("0");
                previousKey = "operatorKey";
            }
            else if(firstValue !== '0'){
                firstValue = firstValue + secondValue + this.innerText;
                printHistory(firstValue);
                printOutput("0");
                previousKey = "operatorKey";
            }
        }
    })
}
var equals =document.getElementsByClassName("equal");
for(var i=0; i<equals.length; i++){
    equals[i].addEventListener("click", function(){       
        var firstVal = getHistory();
        var secondVal = getOutput();
        if(previousKey==="number") {
            let exp = firstVal + secondVal;
            printOutput(eval(exp));
            printHistory("0")
        } 
        else if(previousKey==="operatorKey"){
            let exp = firstVal.substring(0, firstVal.length-1);
            printOutput(eval(exp));
            printHistory("0")
        }
    })
}

// function calculate(firstVal,arOperation,secondVal){
//     if (arOperation === "add"){
//         return parseFloat(firstVal) + parseFloat(secondVal); 
//     }
//     else if (arOperation === "subtract"){
//         return parseFloat(firstVal) - parseFloat(secondVal); 
//     }
//     else if(arOperation === "multiply"){
//         return parseFloat(firstVal) * parseFloat(secondVal); 
//     }
//     else if(arOperation === "divide"){
//         return parseFloat(firstVal) / parseFloat(secondVal); 
//     }
// }
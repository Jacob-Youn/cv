// <⚠️ DONT DELETE THIS ⚠️>
//import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const calculator = document.querySelector(".js-calculator");
const button = document.getElementsByClassName("button");
const result = document.querySelector(".top-line");
const display = document.querySelector(".js-display")

function userInput(event) {
    const action = event.target.dataset.action;
    const keyContent = event.target.value;
    const displayedNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;

    if(isNaN(event.target.value)){
        if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
            event.target.classList.add('is-depressed');
            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.firstValue = displayedNum;
            calculator.dataset.operator = action;
        } else if (action === 'clear') {
            if (keyContent === 'C') {
                calculator.dataset.firstValue = '';
                calculator.dataset.modValue = '';
                calculator.dataset.operator = '';
                calculator.dataset.previousKeyType = '';
              } else {
                key.textContent = 'C';
              }
              
            display.textContent = 0;
            calculator.dataset.previousKeyType = 'clear'
        } else {  
            const firstValue = calculator.dataset.firstValue;
            const secondValue = displayedNum;
            const operator = calculator.dataset.operator;
            const calculate = (n1, operator, n2) => {
                let result = ''
                
                if (operator === 'add') {
                    result = parseInt(n1) + parseInt(n2)
                  } else if (operator === 'subtract') {
                    result = parseInt(n1) - parseInt(n2)
                  } else if (operator === 'multiply') {
                    result = parseInt(n1) * parseInt(n2)
                  } else if (operator === 'divide') {
                    result = parseFloatt(n1) / parseFloat(n2)
                  }
                  return result;
            }
            display.textContent = calculate(firstValue, operator, secondValue);
        }         
    } else {
        Array.from(event.target.parentNode.children).forEach(k => k.classList.remove('is-depressed'));
        if (displayedNum === '0' || previousKeyType === 'operator') {
            display.textContent = keyContent;
            calculator.dataset.previousKeyType = 'number'
        } else {
            display.textContent = displayedNum + keyContent;
        }
    }
};


function init(){
    Array.from(button).forEach(buttons => buttons.addEventListener("click",userInput));
};

init();
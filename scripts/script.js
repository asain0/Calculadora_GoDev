const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");

const isSoftButton = document.getElementById("isSoftButton"); //desenvolver funcionalidade
const isAlternativeTheme = document.getElementById("isAlternativeTheme");

const workspace = document.getElementById('workspace');

const themes = {
    'dark':'green',
    'green':'dark',
}

class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    bgWritter = (valueButtom)=>{
        // var child ='<span style="color:white; position:fixed">Teste</span>'
        // const newChild = workspace.children[1].cloneNode(true);
        // console.log(newChild)
        // console.log(workspace);
        // newChild.innerText = "teste";
        // var leftValue = Math.random();
        // var rightValue = Math.random();
        // var sizeValue = Math.floor(Math.random()*100);
        // newChild.setAttribute('left','55px')
        // newChild.setAttribute('top','45px')
        // newChild.setAttribute('font-size',`${sizeValue}px`)
        // console.log(newChild)

        //  workspace.appendChild(newChild)

         workspace.children[1].innerText += valueButtom;
    }
    

    formatDisplayNumber(number){
        const stringNumber = number.toString();

        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]

        let integerDisplay;

        if(isNaN(integerDigits)){
            integerDisplay ='';
        } else{
            integerDisplay = integerDigits.toLocaleString("en", 
            {maximumFractionDigits: 0,
            });
        }
        
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay;
        }
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    calculate(){
        let result;

        const _previousOperand = parseFloat(this.previousOperand);
        const _currentOperand = parseFloat(this.currentOperand);

        if(isNaN(_previousOperand) || isNaN(_currentOperand)) return;

        switch (this.operation) {
            case '+':
                result = _previousOperand + _currentOperand;
                break;
            case '-':
                result = _previousOperand - _currentOperand;
                break;
            case '÷':
                result = _previousOperand / _currentOperand;
                break;
            case '*':
                result = _previousOperand * _currentOperand;
                break;
            default:
                return;       
        }

        this.currentOperand = result;
        this.operation = undefined;;
        this.previousOperand = "";
    }

    chooseOperation(operation){
        if (this.currentOperand ==='') return;

        if(this.previousOperand !== ''){
            this.calculate();
        }

        this.operation = operation;
        
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }
    
    appendNumber(number){
        if ( this.currentOperand.includes('.') && number === '.') return;

        this.currentOperand = `${this.currentOperand}${number.toString()}`;
    }

    clear(){
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    updateDisplay(){
        this.previousOperandTextElement.innerText = `${this.formatDisplayNumber(this.previousOperand)} ${
            this.operation || ""
        }`;
        this.currentOperandTextElement.innerText = this.formatDisplayNumber(
            this.currentOperand);
    }
}

const calculator = new Calculator(
    previousOperandTextElement,
    currentOperandTextElement
);

for (const numberButton of numberButtons){
    numberButton.addEventListener('click', ()=>{
        calculator.appendNumber(numberButton.innerText);
        calculator.updateDisplay();
        calculator.bgWritter(numberButton.innerText);
    })
}

for (const operationButton of operationButtons){
    operationButton.addEventListener('click', () =>{
        calculator.chooseOperation(operationButton.innerText);
        calculator.updateDisplay();
        calculator.bgWritter(operationButton.innerText);

    })
};


allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
    calculator.bgWritter("~~~~AC~~~~");
})

equalsButton.addEventListener('click', ()=>{
    calculator.calculate();
    calculator.updateDisplay();
    calculator.bgWritter("=");
})

deleteButton.addEventListener('click', ()=>{
    calculator.delete();
    calculator.updateDisplay();
    calculator.bgWritter("~~~~DEL~~~~");
})

isAlternativeTheme.addEventListener('click', () => {
     const currentTheme =document.body.dataset.theme;
    document.body.setAttribute('data-theme', themes[currentTheme] || 'green')
})

// document.addEventListener("keypress", function(event) {
//     if (event.keyCode == 13) {
//       alert('hi.');
//     }
//   });
 
const numButtons = document.querySelectorAll("[dataNumber]")
const opeButtons = document.querySelectorAll("[dataOperator]")
const clearButtons = document.querySelector("[dataClear]")
const clearAllButtons = document.querySelector("[dataClearAll]")
const ugualeButtons = document.querySelector("[dataEquals]")
const currentnum = document.querySelector("[data-current-operand]")
const prevnum = document.querySelector("[data-previous-operand]")

class Calculator {
  constructor(firstNumberText, secondNumberText) {
    this.firstNumberText=firstNumberText
    this.secondNumberText=secondNumberText
    this.clearAll()
  }
  
  clearAll (){
    this.firstNumber=""
    this.secondNumber=""
    this.operator=""
  }

  delete () {
    this.firstNumber = this.firstNumber.substr(0, this.firstNumber.length-1)
  }

  addNumber (num) {
      if (num==="." && this.firstNumber.includes(".")) return
      this.firstNumber =this.firstNumber.toString() + num.toString()
  }

  ope (operator) {
    this.operator = operator
    if (this.firstNumber === "") return
    if (this.secondNumber !== "") {
      this.chooseOpe()
      this.operator=undefined
    }
    
    this.secondNumber=this.firstNumber
    this.firstNumber=""
  }

  chooseOpe () {
    let ris

    const one = parseFloat(this.secondNumber)
    const sec = parseFloat(this.firstNumber)
    if (isNaN(one) || isNaN(sec)) return

    switch (this.operator) {
      case '+':
        ris = one + sec
        break
      case '-':
        ris = one - sec
        break
      case 'x':
        ris = one * sec
        break
      case '÷':
        ris = one / sec
        break
      default:
        return
    }
    this.firstNumber = ris
    this.operator = undefined
    this.secondNumber = ""
  }
  checkDiplayNum (number) {
    const numC = number.toString()
    const integerDigits = parseFloat(numC.split('.')[0])
    const decimalDigits = numC.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }
  updateDisplayNum () {
    this.firstNumberText.innerText = this.checkDiplayNum(this.firstNumber)
    if (this.operator != undefined) {
      this.secondNumberText.innerText = `${this.checkDiplayNum(this.secondNumber)} ${this.operator}`
    } else {
      this.secondNumberText.innerText = ""
    }
  }
}




const cal = new Calculator (currentnum, prevnum)

numButtons.forEach(button => {
  button.addEventListener("click", () => {
    cal.addNumber(button.innerText)
    cal.updateDisplayNum()
  })
})
opeButtons.forEach(button => {
  button.addEventListener("click", () => {
    cal.ope(button.innerText)
    cal.updateDisplayNum()
  })
})

ugualeButtons.addEventListener("click", button => {
  cal.chooseOpe()
  cal.updateDisplayNum()
})

clearAllButtons.addEventListener("click", button => {
  cal.clearAll()
  cal.updateDisplayNum()
})

clearButtons.addEventListener("click", button => {
  cal.delete()
  cal.updateDisplayNum()
})

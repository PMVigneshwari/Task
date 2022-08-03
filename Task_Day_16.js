let cal = document.createElement("div")
cal.setAttribute("class", "container mt-5 px-4 overflow-hidden")
document.body.appendChild(cal)

let output = document.createElement("div")
output.setAttribute("class", "output mb-3 py-3")
cal.appendChild(output)

let history = document.createElement("div")
history.setAttribute("id", "history")

let result = document.createElement("div")
result.setAttribute("id", "result")

output.append(history, result)


let row = document.createElement("row")
row.setAttribute("class", "row gx-4 gy-2")
cal.appendChild(row)

function createButton(tagName, innerText, attName) {
    let buttonName = innerText
    let button = document.createElement(tagName)
    let classValue = "col-3"
    if (innerText === "=") {
        classValue = "col-6 operator"
    } else if (!isNaN(parseInt(innerText))) {
        classValue = "col-3 number"
    } else {
        classValue = "col-3 operator"
    }

    if (innerText === "Del") {
        button.innerHTML = "<img src='./assets/icons8-arrow-pointing-left-96.png' height='18px' alt='backspace icon'>"
    } else {
        button.innerText = innerText
    }


    button.setAttribute(attName, buttonName)
    button.setAttribute("class", classValue)
    row.appendChild(button)
}

let buttC = createButton("button", "C", "id")
let buttDel = createButton("button", "Del", "id")
let buttDot = createButton("button", ".", "id")
let buttMult = createButton("button", "X", "id")
let butt7 = createButton("button", "7", "id")
let butt8 = createButton("button", "8", "id")
let butt9 = createButton("button", "9", "id")
let buttDiv = createButton("button", "/", "id")
let butt4 = createButton("button", "4", "id")
let butt5 = createButton("button", "5", "id")
let butt6 = createButton("button", "6", "id")
let buttSubt = createButton("button", "-", "id")
let butt1 = createButton("button", "1", "id")
let butt2 = createButton("button", "2", "id")
let butt3 = createButton("button", "3", "id")
let buttAdd = createButton("button", "+", "id")
let butt0 = createButton("button", "0", "id")
let butt00 = createButton("button", "00", "id")
let buttEqual = createButton("button", "=", "id")


// // functionality/ logics for calculator app

function gethistory() {
    return document.getElementById("history").innerText
}

function printHistory(num) {
    history.innerText = num
}

function getResult() {
    return document.getElementById("result").innerText
}

function printResult(num) {
    if (num == "") {
        result.innerText = num
    } else {
        result.innerText = getFormattedNumber(num)
    }

}

function getFormattedNumber(num) {
    if (num == "-") {
        return ""
    }
    let n = Number(num)
    return n.toLocaleString("en")
}

function reverseNumberFormat(num) {
    return Number(num.split(",").join(""))
}

function evaluate(string) {
    let numbers = string.split(/\+|-|\X|\//g).filter(ele => ele !== "")
    let operators = string.split("").filter(ele => ele === "+" || ele === "-" || ele === "X" || ele === "/")
    let result

    for (let i = 0; i < operators.length; i++) {
        if (operators.length < numbers.length) {
            if (operators[i] && i === 0) {
                switch (operators[i]) {
                    case "+":
                        result = parseInt(numbers[i]) + parseInt(numbers[i + 1])
                        break
                    case "-":
                        result = parseInt(numbers[i]) - parseInt(numbers[i + 1])
                        break
                    case "X":
                        result = parseInt(numbers[i]) * parseInt(numbers[i + 1])
                        break
                    case "/":
                        result = parseInt(numbers[i]) / parseInt(numbers[i + 1])
                        break
                }
            } else if (operators[i] && i > 0) {

                switch (operators[i]) {
                    case "+":
                        result = result + parseInt(numbers[i + 1])
                        break
                    case "-":
                        result = result - parseInt(numbers[i + 1])
                        break
                    case "*":
                        result = result * parseInt(numbers[i + 1])
                        break
                    case "/":
                        result = result / parseInt(numbers[i + 1])
                        break
                }
            }
        } else if (operators.length === numbers.length) {
            if (operators[i] === "-" && i === 0) {

                switch (operators[i + 1]) {
                    case "+":
                        result = (-1 * parseInt(numbers[i])) + parseInt(numbers[i + 1])
                        break
                    case "-":
                        result = (-1 * parseInt(numbers[i])) - parseInt(numbers[i + 1])
                        break
                    case "X":
                        result = (-1 * parseInt(numbers[i])) * parseInt(numbers[i + 1])
                        break
                    case "/":
                        result = (-1 * parseInt(numbers[i])) / parseInt(numbers[i + 1])
                        break
                }
            }
        }

    }
    return result
}

//.......... operators events execution..............

let operators = document.getElementsByClassName("operator")

for (let index = 0; index < operators.length; index++) {
    let operator = operators[index]
    operator.addEventListener("click", () => {
        if (operator.id == "C") {
            printHistory("")
            printResult("")
        } else if (operator.id == "Del") {
            let result = reverseNumberFormat(getResult()).toString()
            if (result) {
                result = result.slice(0, result.length - 1)
                printResult(result)
            }
        } else {
            let history = gethistory()
            let result = getResult()
            if (result == "" && history != "") {
                if (isNaN(history[history.length - 1])) {
                    history = history.slice(0, - 1)
                }
            }
            if (result != "" || history != "") {
                result = result == "" ? result : reverseNumberFormat(result)
                history = history + result
                if (operator.id == "=") {
                    let output = evaluate(history)
                    printResult(output)
                    printHistory("")
                } else {
                    history += operator.id
                    printHistory(history)
                    printResult("")
                }
            }
        }
    })
}


//.......... numbers events execution..............

let numbers = document.getElementsByClassName("number")

for (let i = 0; i < numbers.length; i++) {
    let number = numbers[i]
    number.addEventListener("click", () => {
        let result = reverseNumberFormat(getResult())
        if (result != NaN) {
            result += number.innerText
            printResult(result)
        }
    })
}

const handleKeydown = (e) => {
    if (!isNaN(parseInt(e.key))) {
        let num = document.getElementById(e.key)
        let result = reverseNumberFormat(getResult())
        result += num.innerText
        printResult(result)
    }
}


document.addEventListener("keydown", handleKeydown)
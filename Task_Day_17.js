let content = document.getElementById("words")

let displayCountDown = (num) => {
    if (num >= 1) {
        content.innerText = num
        setTimeout(() => {
            displayCountDown(num - 1)
        }, 1000)
    } else {
        content.innerText = "Happy Independance Day"
    }

}


displayCountDown(10)
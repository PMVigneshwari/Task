let container = document.createElement("div")
container.setAttribute("class", "container")
document.body.appendChild(container)

let content = document.createElement("div")
content.setAttribute("class", "content")
content.setAttribute("id", "content")
container.appendChild(content)

let pagination = document.createElement("div")
pagination.setAttribute("class", "pagination")
container.appendChild(pagination)

let buttons = document.createElement("ul")
pagination.appendChild(buttons)

// function for creating the content
function createContent(nameValue, emailValue) {

    let charDiv = document.createElement("div")
    content.appendChild(charDiv)
    let name = document.createElement("p")
    name.setAttribute("id", "name")

    let email = document.createElement("p")
    email.setAttribute("id", "email")

    charDiv.append(name, email)

    name.innerText = nameValue
    email.innerText = emailValue
}

// function for creating the button
function createButton(className, idValue, innerText) {
    if (idValue === 1) {
        className = className + " " + "active"
    }
    let list = document.createElement("li")
    buttons.appendChild(list)
    let button = document.createElement("button")
    button.setAttribute("class", className)
    button.setAttribute("id", idValue)
    button.innerText = innerText
    list.appendChild(button)
    return list
}

// function for loading the data
function loadData(id) {
    let dataEndId = parseInt(id) * 10
    let dataStartId = dataEndId - 9
    const dataLoaded = jsonData.filter((ele) => ele.id >= dataStartId && ele.id <= dataEndId)
    return dataLoaded
}

// function for clear the content
function clearContent() {
    let content = document.getElementById("content")
    content.innerHTML = ""
}

let jsonData = []

// Main function for logics
async function getData() {
    let res = await fetch("./Task_Day_16.1.json")
    let data = await res.json()
    data.forEach(element => {
        jsonData.push(element)
    });
    // console.log(jsonData)

    let dataLength = jsonData.length
    // console.log(dataLength)

    // Load the required amount of data
    const dataLoadFirst = jsonData.filter((ele) => ele.id >= 1 && ele.id <= 10)

    // create the content using the initial data
    dataLoadFirst.map((data) => {
        createContent(data.name, data.email)
    })

    // creating the page buttons
    createButton("pageName", "first", "first")
    createButton("pageName", "prev", "prev")
    for (let i = 1; i <= dataLength / 10; i += 1) {
        createButton("pageNum", i, i)
    }
    createButton("pageName", "next", "next")
    createButton("pageName", "last", "last")

    let activePage = document.getElementsByClassName("active")



    // creating the content while click on pages
    let namePages = document.getElementsByClassName("pageName")
    let numPages = document.getElementsByClassName("pageNum")

    let firstPageDisabled
    let prevPageDisabled
    let nextPageDisabled
    let lastPageDisabled

    for (let i = 0; i < namePages.length; i++) {
        let page = namePages[i]
        if (page.innerText === "first") {
            firstPageDisabled = page
        } else if (page.innerText === "prev") {
            prevPageDisabled = page
        } else if (page.innerText === "next") {
            nextPageDisabled = page
        } else if (page.innerText === "last") {
            lastPageDisabled = page
        }
    }

    if (activePage[0].innerText === "1") {
        firstPageDisabled.disabled = true
        prevPageDisabled.disabled = true
    }

    function getPagesDisabled() {
        if (activePage[0].innerText === "1") {
            firstPageDisabled.disabled = true
            prevPageDisabled.disabled = true
            nextPageDisabled.disabled = false
            lastPageDisabled.disabled = false
        } else if (activePage[0].innerText === "10") {
            console.log("hi")
            firstPageDisabled.disabled = false
            prevPageDisabled.disabled = false
            nextPageDisabled.disabled = true
            lastPageDisabled.disabled = true
        } else {
            firstPageDisabled.disabled = false
            prevPageDisabled.disabled = false
            nextPageDisabled.disabled = false
            lastPageDisabled.disabled = false
        }
    }


    for (let i = 0; i < numPages.length; i++) {
        let page = numPages[i]
        page.addEventListener("click", () => {
            let classValue
            if (page.id !== activePage[0].id) {
                let existingActiveClass = activePage[0].className.split(" ")[0]
                activePage[0].setAttribute("class", existingActiveClass) // deleting the active class in prev element
                classValue = page.getAttribute("class") + " " + "active" // setting the new class value
            } else {
                classValue = page.getAttribute("class")
            }
            page.setAttribute("class", classValue)
            clearContent()
            const data = loadData(page.innerText)
            data.map((content) => {
                createContent(content.name, content.email)
            })

            getPagesDisabled()

        })
    }


    for (let i = 0; i < namePages.length; i++) {
        let page = namePages[i]
        page.addEventListener("click", () => {
            clearContent()
            if (page.innerText === "first") {
                const data = loadData(1)
                console.log(data)
                data.map((content) => {
                    createContent(content.name, content.email)
                })
            } else if (page.innerText === "last") {
                const data = loadData(numPages.length)
                console.log(data)
                data.map((content) => {
                    createContent(content.name, content.email)
                })

            } else if (page.innerText === "prev") {
                let toLoad = parseInt(activePage[0].innerText) - 1

                let prevPage
                for (let i = 0; i < numPages.length; i++) {
                    let page = numPages[i]
                    if (page.innerText === `${toLoad}`) {
                        prevPage = page
                        break
                    }
                }
                let classValue
                let existingActiveClass = activePage[0].className.split(" ")[0]
                activePage[0].setAttribute("class", existingActiveClass) // deleting the active class in current element
                classValue = prevPage.getAttribute("class") + " " + "active" // setting the new class value in prev page
                prevPage.setAttribute("class", classValue)

                const data = loadData(toLoad)
                console.log(data, toLoad)
                data.map((content) => {
                    createContent(content.name, content.email)
                })

                getPagesDisabled()


            } else if (page.innerText === "next") {
                let toLoad = parseInt(activePage[0].innerText) + 1

                let nextPage
                for (let i = 0; i < numPages.length; i++) {
                    let page = numPages[i]
                    if (page.innerText === `${toLoad}`) {
                        nextPage = page
                        break
                    }
                }
                let classValue
                let existingActiveClass = activePage[0].className.split(" ")[0]
                activePage[0].setAttribute("class", existingActiveClass) // deleting the active class in current element
                classValue = nextPage.getAttribute("class") + " " + "active" // setting the new class value in next page
                nextPage.setAttribute("class", classValue)

                const data = loadData(toLoad)
                console.log(data, toLoad)
                data.map((content) => {
                    createContent(content.name, content.email)
                })
                getPagesDisabled()
            }
        })
    }

}

getData()
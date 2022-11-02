var form = document.querySelector("#form")
var nameEl = document.querySelector("#name")
var imageEl = document.querySelector("#image")
var salePriceEl = document.querySelector("#salePrice")
var regularPriceEl = document.querySelector("#regularPrice")
var descriptionEl = document.querySelector("#description")
var ratingEl = document.querySelector("#rating")
var categoriesEl = document.querySelector("#categories")

//validate

var fields = ['name', 'image', 'salePrice', 'regularPrice', 'description']

function showError(field, content) {
    var element = document.querySelector('#' + field)
    if (element.nextElementSibling) {
        element.nextElementSibling.innerHTML = content
    }
}

function clearError(field) {
    var element = document.querySelector('#' + field)
    if (element.nextElementSibling) {
        element.nextElementSibling.innerHTML = ''
    }
}


function create(data) {
    return fetch('http://localhost:3000/product', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    ).then(function (res) {
        return res.json()
    })
}

var error = false

form.onsubmit = function (e) {
    e.preventDefault()
    fields.forEach((e) => {
        clearError(e)
    })

    fields.forEach((e) => {
        var field = document.querySelector("#" + e)
        if (field.value == '') {
            showError(e, 'Không được để trống')
            error = true
        }
    })

    if (!error) {
        var name = nameEl.value
        var image = imageEl.value
        var description = descriptionEl.value
        var regularPrice = regularPriceEl.value
        var salePrice = salePriceEl.value
        var rating = ratingEl.value
        var categories = categoriesEl.value
        var data = { name, categories, description, image, salePrice, regularPrice, rating }
        create(data).then(function (result) {
            location.href = "../index.html"
        })
    }
}


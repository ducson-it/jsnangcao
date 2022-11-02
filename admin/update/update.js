var form = document.querySelector("#form")
var nameEl = document.querySelector("#name")
var imageEl = document.querySelector("#image")
var salePriceEl = document.querySelector("#salePrice")
var regularPriceEl = document.querySelector("#regularPrice")
var descriptionEl = document.querySelector("#description")
var ratingEl = document.querySelector("#rating")
var categoriesEl = document.querySelector("#categories")
var hiddenId = document.querySelector('#hidden-id')

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

function getProductValue(id) {
    return fetch('http://localhost:3000/product/'+id).then(res => {
        return res.json()
    })
}


function main() {
    var queryString = location.search

    var param = new URLSearchParams(queryString)

    var id = param.get('id')

    getProductValue(id).then(result => {
        hiddenId.value = result.id
        nameEl.value = result.name
        descriptionEl.value = result.description
        salePriceEl.value = result.salePrice
        regularPriceEl.value = result.regularPrice
        imageEl.value = result.images
        ratingEl.value = result.rating
        categoriesEl.value = result.categories
    })
}

main()


function update(id,data) {
    return fetch('http://localhost:3000/product/'+id, {
        method: "PUT",
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
        var images = imageEl.value
        var description = descriptionEl.value
        var regularPrice = regularPriceEl.value
        var salePrice = salePriceEl.value
        var rating = ratingEl.value
        var categories = categoriesEl.value
        var data = { name, categories, description, images, salePrice, regularPrice, rating }
        update(hiddenId.value,data).then(function (result) {
            location.href = "../index.html"
        })
    }
}
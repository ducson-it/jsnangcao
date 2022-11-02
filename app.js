var renderData = document.querySelector("#renderData")
var renderCategories = document.querySelector("#renderCategories")

function fetchData(url) {
    return fetch(url)
        .then(function (res) {
            return res.json()
        })
}

function div(e) {
    return `
    <div class="card" style="width: 18rem;">
        <img src="${e.images}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${e.name}</h5>
            <p class="card-text">${e.description}</p>
            <p class="card-text">${e.salePrice}</p>
            <p class="card-text">${e.regularPrice}</p>
            <p class="card-text">${e.categories}</p>
            <p class="card-text">${e.rating}</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
  </div>
`
}

function render(result) {
    content = ''

    result.map(e => {
        content += div(e)
        renderData.innerHTML = content
    });
}

var form = document.querySelector("#form")
var search = document.querySelector("#search")

form.onsubmit = function (e) {
    e.preventDefault()
    content = ''
    fetchData('http://localhost:3000/product').then(
        (result) => {
            result.filter((e) => {
                if (e.name.includes(search.value)) {
                    content += div(e)
                }
                renderData.innerHTML = content
            })
        }
    )
}

fetchData('http://localhost:3000/product')
.then(function (res) {
    render(res)
})

fetchData('http://localhost:3000/categories')
    .then(function (res) {
        content = ''
        res.map((e) => {
            content += `
            <button class="btn" onclick="filterSelection('${e.name}')">${e.name}</button>                 
        `
         renderCategories.innerHTML = content
        })
    })

function filterSelection(name) {
    content1 = ''
    fetchData('http://localhost:3000/product').then((result) => {
        result.filter((e) => {
            if (e.categories == name) {
                content1 += div(e)
            }
            renderData.innerHTML = content1
        })
    })
}
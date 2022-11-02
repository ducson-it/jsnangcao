var renderData = document.querySelector('#render-data')
var form = document.querySelector('#form')
var search = document.querySelector('#search')
var sortName = document.querySelector('#sort-name')

function fetchData(url) {
    return fetch(url)
        .then(function (res) {
            return res.json()
        })
}

function div(e) {
    return `
    <tr>
    <th scope="row">${e.name}</th>
    <td>${e.categories}</td>
    <td>${e.description}</td>
    <td><img src="${e.images}" width="100px"></td>
    <td>
        <a class="btn btn-danger" onclick="deleteItem(${e.id})">xóa</a>
        <a href="update/update.html?id=${e.id}" class="btn btn-warning">sửa</a>
    </td>
  </tr>
`
}

function deleteItem(id) {
    confirm("Bạn có muốn xóa Item?")
    return fetch('http://localhost:3000/product/'+id,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then( (result) => {
        location.reload();
    })
}

function render(result) {
    content = ''

    result.map(e => {
        content += div(e)
        renderData.innerHTML = content
    });
}

search.onkeyup = function (e) {
    e.preventDefault()
    if (search.value == '') {
        fetchData('http://localhost:3000/product')
            .then(function (res) {
                render(res)
            })
    } else {
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
}

sortName.onchange = function () {
    fetchData('http://localhost:3000/product').then(
        (result) => {
            if (sortName.value == 1) {
                result.sort((a, b) => (a.name > b.name) ? 1 : (b.name > a.name) ? -1 : 0)
            } else {
                result.sort((a, b) => (a.name < b.name) ? 1 : (b.name < a.name) ? -1 : 0)
            }

            render(result)
        })
}


fetchData('http://localhost:3000/product')
    .then(function (res) {
        render(res)
    })
let admin = JSON.parse( localStorage.getItem('admin') );
if( admin != true ){
    window.location = 'index.html';
}

function drawProducts(){
    const products = storageGet("products") || [];
    let products_html = ``;
    products.forEach( function(product, index){
        products_html +=
        `
        <tr>
            <th>${index + 1}</th>
            <td>
                <img src=" ${product.image}" height="100" />
            </td>
            <td>${product.name}</td>
            <td>${product.count}</td>
            <td>${product.price}</td>

            <td>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Змінити
                </button>
            </td>

            <td>
                <button type="button" class="btn btn-danger btn-sm" onclick="deleteProduct(${index})">Видалити</button>
            </td>
        </tr>
        `
    } )
    document.getElementById("admin_table").innerHTML = products_html;
}

function deleteProduct(index){
    const products = storageGet("products") || [];

    products.splice(index, 1);

    storageSave("products", products);

    drawProducts();
}

function EditProduct(index){
    const products = storageGet("products") || [];

    products[index].name = document.getElementById('name');
    products[index].image = document.getElementById('image');
    products[index].price = document.getElementById('price');
    products[index].count = document.getElementById('count');

    storageSave("products", products);

    drawProducts(); 
}

drawProducts()
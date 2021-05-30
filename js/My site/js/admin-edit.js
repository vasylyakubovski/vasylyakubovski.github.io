let admin = JSON.parse( localStorage.getItem('admin'));

if( admin != true ){
    window.location = 'index.html';
}

function saveProduct(){
    
    const new_product = {
        name:  document.getElementById('name').value,
        image: document.getElementById('image').value,
        price: document.getElementById('price').value,
        count: document.getElementById('count').value
    }

    let products = storageGet("products") || [];

    products.push(new_product)

    if(new_product.name.length < 3){
        displayMessage('message-error', 'Admin', 'Коротка Назва!', 4000);
        return
    }
    if(new_product.image.length < 3){
        displayMessage('message-error', 'Admin', 'Коротка Назва!', 4000);
        return
    }
    if(new_product.price < 1){
        displayMessage('message-error', 'Admin', 'Невірна ціна!', 4000);
        return
    }
    if(new_product.count < 1){
        displayMessage('message-error', 'Admin', 'Невірна кількість!', 4000);
        return
    }
    
    storageSave("products", products);
}
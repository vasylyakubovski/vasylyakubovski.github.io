const data = {
    products: [
        {
            id: 0,
            name: "iphone 11",
            img: "https://content.rozetka.com.ua/goods/images/big/37399220.jpg",
            price: 27000
        },
        {
            id: 1,
            name: "iphone 12",
            img: "https://content.rozetka.com.ua/goods/images/big/30872903.jpg",
            price: 21000
        }
    ]
}

const CardTemplate = {
    props: ['product'],
    template: 
    `
        <div class="card" style="width: 18rem; margin-right: 10px;">
            <img 
                v-bind:src=product.img
                class="card-img-top" 
                alt="..."
                style="max-height: 300px; width: fit-content;margin: 0 auto;">
            <div class="card-body">
                <h5 class="card-title">{{product.name}}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <p class="d-flex justify-content-between">
                <span>Price:</span>
                <span>{{product.price}}</span>
                </p>
            <a href="#" class="btn btn-primary">Add to cart</a>
            </div>
        </div>

    `
}
  

const app = {
    data() {
        return data
    },
    components: {
        CardTemplate 
    }
}
  
Vue.createApp(app).mount('#app')
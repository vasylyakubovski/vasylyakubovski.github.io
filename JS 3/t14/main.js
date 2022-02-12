document.addEventListener('DOMContentLoaded', async function(){
    let text = await axios.get("templates/test.html");
    
    const data = {
        products: [
            {
                name: "Футболки",
                url: "https://talant.shop/static/items/2019/November/5dbc31ea8c52ab6209a6d122-medium.jpg",
                count: 1,
                color: "#fff",
                price: 20,
                preOrder: false,
                delivery: false,
                totalPrice :20
            },
            {
                name: "Штани",
                url: "https://shopsycdn.com/i/p/d8/1e/d81e4934b5590176f7d187f3074e0eb7_medium.jpg",
                count: 1,
                color: "#fff",
                price: 40,
                preOrder: false,
                delivery: false,
                totalPrice :40
            }
        ]
    }
    
    const CommentTemplate = {
       props: ['product'],
       template: text.data,
       methods:{
        countTotalPrice(){
            let allPrice = this.product.count * this.product.price;
            let preOrder = 0;
            let delivery = 0;
            if(this.product.preOrder){
                preOrder = (allPrice*(1/20))
            }

            if(this.product.delivery){
                delivery = allPrice/10;
            }

            this.product.totalPrice = allPrice - preOrder + delivery;
        }
       }
    }
    
    const app = {
       data(){
           return data
       },
       components: {
           'card':CommentTemplate
       },
       methods:{},   
    }
    Vue.createApp(app).mount('#app')
})


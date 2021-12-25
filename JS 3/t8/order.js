class SubmitedOrder{
    constructor(){
        this.getOrder();
    }
    getOrder(){
        const url = new URL(window.location.href);
        const id = url.searchParams.get("id");
        this.getOrderById(id)
    }
    getOrderById(id){
        db.collection("orders").doc(id).get().then(res =>{
            console.log(res.data())
            this.render(res.data())
        } )
    } 
    render(order){
        const root = document.getElementById("root");
        const order_name = document.createElement("p");
        order_name.innerText = "Order name: " + order.product_name;

        const order_price = document.createElement("p");
        order_price.innerText = "Product price:" + order.product_price;

        const count = document.createElement("p");
        count.innerText = "Count: " + order.count;

        const order_total = document.createElement("p");
        order_total.innerText = "total: " + order.total;

        const order_delivery = document.createElement("p");
        order_delivery.innerText = "delivery: " + order.delivery;

        root.appendChild(order_name)
        root.appendChild(order_price)
        root.appendChild(count)
        root.appendChild(order_total)
        root.appendChild(order_delivery)
        
    }
}
const order = new SubmitedOrder();
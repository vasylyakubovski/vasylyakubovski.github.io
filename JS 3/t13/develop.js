const products = [
    {
        id: 0,
        name: "Google Pixel 4 XL 64GB Black",
        url: "https://content1.rozetka.com.ua/goods/images/big/24330840.jpg",
        display: "6.3",
        camera: "8 Мп",
        acc: "3700",
        price: "14 290"
    },
    {
        id: 1,
        name: "Мобильный телефон Samsung Galaxy A32 4/64GB Blue",
        url: "https://content2.rozetka.com.ua/goods/images/big/165913388.jpg",
        display: "6.3",
        camera: "64Мп",
        acc: "5000",
        price: "6960"
    },
    {
        id: 2,
        name: "Iphone 13pro",
        url: "https://y.ua/pimg/378x378/07/2b/2080453.png",
        display: "6.3",
        camera: "100Мп",
        acc: "3700",
        price: "63 000"
    },
    {
        id: 3,
        name: "Xiaomi Redmi Note 10S 6/64GB",
        url: "https://i.citrus.world/imgcache/size_800/uploads/shop/0/a/0a53bb67c9eba16c4a5837af6ed57dcb.jpg",
        display: "6.3",
        camera: "48Мп",
        acc: "4800",
        price: "9900"
    },
    {
        id: 4,
        name: "Xiaomi Redmi Note 9 Pro 6/64GB",
        url: "https://avic.ua/assets/cache/products/228105/xiaomi-redmi-note-9-pro-aurora-blue-1-prod_md.jpg",
        display: "6.67",
        camera: "64Мп",
        acc: "4900",
        price: "6700"
    },
    {
        id: 5,
        name: "Мобильный телефон Samsung Galaxy S21 FE 6/128GB",
        url: "https://content.rozetka.com.ua/goods/images/big/245952419.jpg",
        display: "6.4",
        camera: "12Мп",
        acc: "4500",
        price: "22000"
    },
    {
        id: 6,
        name: "Мобильный телефон Huawei P Smart 2021 NFC 128GB",
        url: "https://content2.rozetka.com.ua/goods/images/big/163104727.png",
        display: "6.67",
        camera: "48Мп",
        acc: "5000",
        price: "4799"
    },
    {
        id: 7,
        name: "Мобильный телефон Poco F3 8/256GB Night Black",
        url: "https://content2.rozetka.com.ua/goods/images/big/167488104.jpg",
        display: "6.67",
        camera: "48Мп",
        acc: "4520",
        price: "12999"
    },
    
]
function addProductsToDB(products){
    products.forEach(element => {
        db.collection('products').add(element)
        .then(res => console.log('success'))
    });
}

addProductsToDB(products)
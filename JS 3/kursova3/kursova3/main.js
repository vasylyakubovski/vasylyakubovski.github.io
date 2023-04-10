document.addEventListener('DOMContentLoaded', async function () {

    //витягуємо темплейти
    let home             = await axios.get("templates/home.html");
    let login            = await axios.get("templates/login.html");
    let addProduct       = await axios.get("templates/addProduct.html");
    let allProducts      = await axios.get("templates/allProducts.html");
    let productCard      = await axios.get("templates/productCard.html");
    let orderProducts    = await axios.get("templates/orderProducts.html");
    let cart             = await axios.get("templates/cart.html");
    let orderProductCard = await axios.get("templates/orderProductCard.html");
    let myOrders         = await axios.get("templates/myOrders.html");
    let myOrdеrsAdmin    = await axios.get("templates/myOrdеrsAdmin.html");
    let productInfo      = await axios.get("templates/productInfo.html");


    //Основна інформація для spa (сайту)
    const data = {
        message: 'Hello Vue.js!',
        currentPath: window.location.hash,
        user: {},
        signIn: false,
        logged: false,
        admin: false,
        newProductImage: "",
        products: [],
        edit_product: {},
        cart: [],
        orderedProducts: [],
        newOrder: { order: {}, user: {}, status: "pending" },
        orderSubmited: false,
        myOrders: [],
        adminOrders: [],
        productInfoId: "1k1r3u0KWk6iZ6JEb2sK",
        productInfo: {},
        filter: {
            name: "",
            minPrice: 0,
            maxPrice: 1000000
        }
    };

    //Компоненти
    const Home = {
        template: home.data,

        mounted: function () {
            setTimeout(() => {
                var swiper = new Swiper(".homeSwiper", {
                    pagination: {
                        el: ".swiper-pagination",
                        type: "fraction",
                    },
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    },
                });
            }, 2000)
        }
    }

    const ProductInfo = {
        template: productInfo.data,
        methods: {
            getProduct(id) {
                db.collection("products")
                    .doc(id)

                    .get()
                    .then(doc => {
                        data.productInfo = doc.data();
                        this.$forceUpdate();
                    })
            }
        },
        mounted: function () {
            let productId = localStorage.getItem("productInfoId");
            this.getProduct(productId);

            setTimeout(() => {
                var swiper = new Swiper(".mySwiper", {
                    pagination: {
                        el: ".swiper-pagination",
                        type: "fraction",
                    },
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    },
                });
            }, 2000)
        }
    }

    const Login = {
        template: login.data,
        props: ['signIn'],
        methods: {
            googleAuth() {
                firebase.auth()
                    .signInWithPopup(provider)
                    .then(result => {
                        toastr.success('You are Login!');
                        const user = result.user;

                        const new_user = {
                            displayName: user.displayName,
                            email: user.email,
                            photo: user.photoURL
                        };
                        data.user = new_user;
                        data.logged = true;
                        this.$root.$forceUpdate();
                        window.location.hash = "/home";

                        localStorage.setItem("user", JSON.stringify(new_user));

                        this.checkAdmin(user.email);
                        this.checkCart(user.email);
                    })
                    .catch(error => {
                        toastr.error('Error!')
                    });
            },
            signUpWithPassword() {
                console.log('signUpWithPassword');
                const email = document.getElementById("user-email").value;
                const password = document.getElementById("user-password").value;

                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                        toastr.success('You are Login!');
                        var user = userCredential.user;

                        const new_user = {
                            displayName: user.displayName,
                            email: user.email,
                            photo: user.photoURL
                        };
                        data.user = new_user;
                        data.logged = true;
                        this.$root.$forceUpdate();
                        window.location.hash = "/home";
                        localStorage.setItem("user", JSON.stringify(new_user));
                        this.checkAdmin(user.email);
                        this.checkCart(user.email);
                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        toastr.error('Email address or code is incorrect!')
                    });
            },
            signInWithPassword() {
                const email = document.getElementById("user-email").value;
                const password = document.getElementById("user-password").value;

                firebase.auth().signInWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                        toastr.success('You are Login!');
                        var user = userCredential.user;

                        const new_user = {
                            displayName: user.displayName,
                            email: user.email,
                            photo: user.photoURL
                        };
                        data.user = new_user;
                        data.logged = true;
                        this.$root.$forceUpdate();
                        window.location.hash = "/home";

                        localStorage.setItem("user", JSON.stringify(new_user));

                        this.checkAdmin(user.email);
                        this.checkCart(user.email);
                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        toastr.error('Email address or code is incorrect!')
                    });
            },
            checkAdmin(email) {
                db.collection("admins")
                    .get()
                    .then(res => {
                        const adminEmails = [];
                        res.forEach(e => adminEmails.push(e.data().email));

                        if (adminEmails.includes(email)) {
                            data.admin = true;
                            localStorage.setItem("admin", true)
                            this.$root.$forceUpdate();
                            console.log("Welcome Admin!!!");
                        }
                        else if (data.admin == true) {
                            data.admin = false;
                            localStorage.setItem("admin", false)
                            this.$root.$forceUpdate();
                        }
                        else {
                            data.admin = false;
                            localStorage.setItem("admin", false)
                            this.$root.$forceUpdate();
                        }
                    })
            },
            checkCart(email) {
                const lastUserEmail = localStorage.getItem("lastUserEmail") || "";
                if (lastUserEmail != email) {
                    localStorage.setItem("cart", JSON.stringify([]));
                    data.cart = [];
                }
            }
        }
    }

    const AddProduct = {
        template: addProduct.data,
        props: ['newProduct'],
        methods: {
            addProductToDB() {
                const newProduct = {
                    name: document.getElementById('product_name').value,
                    url: document.getElementById('product_img').value,
                    price: Number(document.getElementById('product_price').value),
                    actionPrice: Number(document.getElementById('action_price').value),
                    display: Number(document.getElementById('product_display').value),
                    camera: Number(document.getElementById('product_camera').value),
                    acc: Number(document.getElementById('product_acc').value),
                    photos: document.getElementById('product_photos').value.split("\n"),
                    description: document.getElementById('product_description').value
                }

                if(newProduct.name.length < 3){
                    toastr.warning('Short name!')
                    return
                }
                if(newProduct.url.length < 3){
                    toastr.warning('No picture!')
                    return
                }
                if(newProduct.price < 1){
                    toastr.warning('Set a price!')
                    return
                }
                if(newProduct.display < 1){
                    toastr.warning('Set display settings!')
                    return
                }
                if(newProduct.camera < 1){
                    toastr.warning('Set camera settings!')
                    return
                }
                if(newProduct.acc < 1){
                    toastr.warning('Set the battery settings!')
                    return
                }
                if(newProduct.photos.length < 3){
                    toastr.warning('No picture!')
                    return
                }
                if(newProduct.description.length < 3){
                    toastr.warning('No description!')
                    return
                }

                db.collection("products")
                    .add(newProduct)
                    .then(() => toastr.success('Product Added!'))
            }
        }
    }

    const ProductCard = {
        name: "product-card",
        template: productCard.data,
        props: ['product'],
        methods: {
            goToProduct(id) {
                data.productInfoId = id;
                localStorage.setItem("productInfoId", id);
                window.location.hash = "#/product-info"
            },
            deleteProduct(id) {
                if (!confirm("Are you sure?")) return
                db.collection("products")
                    .doc(id)
                    .delete()
                    .then(() => {
                        // дії після видалення
                        toastr.info('Product deleted!');
                        data.edit_product = data.products.filter(e => e.id != id);
                        this.$parent.getAllProducts();
                    });
            },
            editProduct(id){
                data.edit_product = data.products.filter(e => e.id == id)[0];
                this.$parent.$forceUpdate();
            }
        }
    }

    const AllProducts = {
        template: allProducts.data,
        methods: {
            getAllProducts() {
                db.collection("products")
                    .get()
                    .then(res => {
                        data.products = [];
                        res.forEach(element => {
                            const product = {
                                ...element.data(),
                                id: element.id
                            };
                            data.products.push(product)
                        })
                        this.$forceUpdate();
                    })
            },
            saveEditedProduct() {
                db.collection("products")
                    .doc(data.edit_product.id)
                    .update(data.edit_product)
                    .then(() => {
                        // дії після оновлення
                        this.getAllProducts();
                    });
            },
            filter() {
                if (data.filter.minPrice < 0 ||
                    data.filter.maxPrice < data.filter.minPrice ||
                    data.filter.minPrice == "" ||
                    data.filter.maxPrice == ""
                ) {
                    data.filter.minPrice = 0;
                    data.filter.maxPrice = 1000000;
                }
                localStorage.setItem("filter", JSON.stringify(data.filter))
                db.collection("products")
                    .where("price", ">=", Number(data.filter.minPrice))
                    .where("price", "<=", Number(data.filter.maxPrice))
                    .get()
                    .then(res => {
                        data.products = [];
                        res.forEach(element => {
                            const product = {
                                ...element.data(),
                                id: element.id
                            };
                            if (data.cart.includes(product.id)) {
                                product.inCart = true;
                            }
                            if (data.filter.name != "") {

                                if (product.name.toLowerCase().includes(data.filter.name.toLowerCase())) {
                                    data.products.push(product);
                                }

                            } else {
                                data.products.push(product);
                            }
                        })
                        this.$forceUpdate();
                    })
            }
        },
        components: {
            ProductCard
        },
        mounted: function () {
            this.getAllProducts();
            let filter = JSON.parse(localStorage.getItem("filter"))
            if(filter != null){ 
                data.filter = filter
                this.filter();
            }
        }
    }

    const OrderProductCard = {
        name: "order-product-card",
        template: orderProductCard.data,
        props: ['product'],
        methods: {
            goToProduct(id) {
                data.productInfoId = id;
                localStorage.setItem("productInfoId", id);
                window.location.hash = "#/product-info"
            },
            addToCart(id) {
                if (data.logged == false) {
                    toastr.warning('Please login!')
                    return
                }
                if (!data.cart.includes(id)) {
                    data.cart.push(id);
                    localStorage.setItem("cart", JSON.stringify(data.cart))
                    toastr.success('Product added to cart!')
                }
                data.products.forEach(product => {
                    if (product.id == id) {
                        product.inCart = true;
                    };
                })
                this.$root.$forceUpdate();
                this.$forceUpdate();
            }
        }
    }

    //Products
    const OrderProducts = {
        template: orderProducts.data,
        methods: {
            getAllProducts() {
                db.collection("products")
                    .get()
                    .then(res => {
                        data.products = [];
                        res.forEach(element => {
                            const product = {
                                ...element.data(),
                                id: element.id
                            };
                            if (data.cart.includes(product.id)) {
                                product.inCart = true;
                            }
                            data.products.push(product)
                        })
                        console.log(data.products);
                        this.$forceUpdate();
                    })
            },
            filter(){
                if (data.filter.minPrice < 0 ||
                    data.filter.maxPrice < data.filter.minPrice ||
                    data.filter.minPrice == "" ||
                    data.filter.maxPrice == ""
                ) {
                    data.filter.minPrice = 0;
                    data.filter.maxPrice = 1000000;
                }
                localStorage.setItem("filter", JSON.stringify(data.filter))
                db.collection("products")
                    .where("price", ">=", Number(data.filter.minPrice))
                    .where("price", "<=", Number(data.filter.maxPrice))
                    .get()
                    .then(res => {
                        data.products = [];
                        res.forEach(element => {
                            const product = {
                                ...element.data(),
                                id: element.id
                            };
                            if (data.cart.includes(product.id)) {
                                product.inCart = true;
                            }
                            if (data.filter.name != "") {

                                if (product.name.toLowerCase().includes(data.filter.name.toLowerCase())) {
                                    data.products.push(product);
                                }

                            } else {
                                data.products.push(product);
                            }
                        })
                        this.$forceUpdate();
                    })
            }
        },
        components: {
            OrderProductCard
        },
        mounted: function () {
            this.getAllProducts();
            let filter = JSON.parse(localStorage.getItem("filter"))
            if(filter != null){ 
                data.filter = filter
                this.filter();
            }
            
            if(!data.logged){
                data.cart= [];
                console.log("clear cart");
            }
        }
    }

    const Cart = {
        template: cart.data,
        methods: {
            getProductsFromCart() {
                data.orderedProducts = [];
                data.cart = JSON.parse(localStorage.getItem("cart")) || [];
                this.$forceUpdate();
                if (data.cart.length < 1) return;
                db.collection("products")
                    .where(firebase.firestore.FieldPath.documentId(), "in", data.cart)
                    .get()
                    .then(res => {
                        res.forEach(e => {
                            const product = {
                                id: e.id,
                                count: 1,
                                ...e.data()
                            };
                            data.orderedProducts.push(product);
                        })
                        this.countOrderPrice();
                        this.$forceUpdate();
                    })
            },
            removeProductFromCart(id) {
                data.cart = data.cart.filter(prod_id => prod_id != id);
                data.orderedProducts = data.orderedProducts.filter(prod => prod.id != id);
                localStorage.setItem("cart", JSON.stringify(data.cart));
                this.countOrderPrice();
                this.$forceUpdate();
                this.$root.$forceUpdate();
            },
            countOrderPrice() {
                let ordersum = 0;
                data.orderedProducts.forEach(p => {
                    if(p.actionPrice == null || p.actionPrice == ''){
                        ordersum += Number(p.price) * p.count;
                    }else if(p.actionPrice > 0){
                        ordersum += Number(p.actionPrice) * p.count;
                    }
                })
                data.newOrder = {
                    order: {
                        sum: ordersum,
                        products: data.orderedProducts
                    },
                    user: data.user
                }
            },
            submitOrder() {
                if (!confirm("Submit order?")) { return }
                data.newOrder.status = "pending";
                db.collection("orders")
                    .add(data.newOrder)
                    .then(res => {
                        toastr.success('You order sended!')
                        data.cart = [];
                        data.orderedProducts = [];
                        data.newOrder = { order: {}, user: {}, status: "pending" };
                        localStorage.removeItem("cart");
                        this.$root.$forceUpdate();
                        this.$parent.$forceUpdate();
                        this.$forceUpdate();
                    })
            }
        },
        components: {
        },
        mounted: function(){
            this.getProductsFromCart()
        }
    }

    const MyOrdеrs = {
        template: myOrders.data,
        methods: {
            getMyOrders() {
                data.myOrders = [];
                const userEmail = data.user?.email || JSON.parse(localStorage.getItem("user"))?.email;
                db.collection("orders")
                    .where("user.email", "==", userEmail)
                    .get()
                    .then(res => {
                        res.forEach(e => {
                            const order = {
                                id: e.id,
                                ...e.data()
                            }
                            data.myOrders.push(order)
                        })
                        this.$forceUpdate();
                    })
            }
        },
        mounted: function () {
            //що відбувається при першому показі
            this.getMyOrders()
        }
    }

    const MyOrdеrsAdmin = {
        template: myOrdеrsAdmin.data,
        methods: {
            getAllOrders() {
                data.adminOrders = [];
                db.collection("orders")
                    .get()
                    .then(res => {
                        res.forEach(e => {
                            const order = {
                                id: e.id,
                                ...e.data()
                            }
                            data.adminOrders.push(order)
                        })
                        this.$forceUpdate();
                    })
            },
            changeStatus(status, id) {
                db.collection("orders")
                    .doc(id)

                    .update({ status: status })
                    .then(() => {
                        toastr.info('Status updated!')
                    })
            },
            deleteOrder(id) {
                if (!confirm("Are you sure?")) return
                db.collection("orders")
                    .doc(id)

                    .delete()
                    .then(() => {
                        this.getAllOrders()
                        toastr.info('Order deleted!');
                    })
            }
        },
        mounted: function () {
            //що відбувається при першому показі
            this.getAllOrders();
        }
    }

    //Роути (які копоненти відображати)
    const routes = {
        '/': Home,
        '/home': Home,
        '/login': Login,
        '/addproduct': AddProduct,
        '/allproducts': AllProducts,
        '/products': OrderProducts,
        '/cart': Cart,
        '/my-orders': MyOrdеrs,
        '/orders-admin': MyOrdеrsAdmin,
        '/product-info': ProductInfo
    }

    const app = {
        data() { return data },
        methods: {
            logOut() {
                firebase.auth().signOut().then(() => {
                    data.logged = false;
                    data.admin = false;
                    localStorage.removeItem("user");
                    localStorage.removeItem("admin");
                    data.user = {};
                    this.$forceUpdate();
                    window.location.hash = "/login";
                }).catch((error) => {
                });
            },
            checkUser() {
                data.user = JSON.parse(localStorage.getItem("user")) || {};
                data.admin = JSON.parse(localStorage.getItem("admin")) == true || false;
                data.cart = JSON.parse(localStorage.getItem("cart")) || [];

                if (data.user.email != null) {
                    data.logged = true;
                }
                this.$forceUpdate();
            }
        },
        components: {},
        computed: {
            currentView() {
                return routes[this.currentPath.slice(1) || '/'] || NotFound
            }
        },
        mounted() {
            window.addEventListener('hashchange', () => {
                this.currentPath = window.location.hash
            });
            this.checkUser();
        }
    }
    Vue.createApp(app).mount('#app');
})
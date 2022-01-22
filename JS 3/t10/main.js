const data = {
    message: "Hello vue.js",
    products: ["Iphone 13", "Iphone 14"],
    image: "https://i.allo.ua/media/catalog/product/cache/1/image/524x494/602f0fa2c1f0d1ba5e241f914e856ff9/i/p/iphone-13-mini-blue-select-2021_wid_940_hei_1112_f_1_3.jpg",
    test: {
        id: 0,
        name: "Ipad"
    }
}

const CardTemplate = {
    props: ["product"],
    template: `<p>{{product.name}}</p>`
  }
  

const app = {
    data(){
        return data
    },

    components: {
        CardTemplate
      },
}

Vue.createApp(app). mount('#app')
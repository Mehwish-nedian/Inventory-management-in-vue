import { createApp } from 'vue';
import {createStore} from 'vuex';

import App from './App.vue';

const store = createStore({
  state() {
    return {
      products: [
        
      ]
    };
  },
  getters: {
     getProducts(state) {
      return state.products;
    },
    getNamesArray(state){
      const Products = state.products;
      let names = [];
      for(var i = 0; i<Products.length; i++){
        const newname = Products[i].name;
        names.push(newname);
      }
      return names;
    }
  },
  mutations: {
    setProducts(state, payload){
      state.products = payload;
    },
    deleteProduct(state, payload) {
      const pid = payload.id;
      const newProducts = state.products.filter(prod => prod.id !== pid);
      state.products = newProducts;
    },
    async addProduct(state, payload) {
    const response = await fetch(
      "https://learning-vue-40341-default-rtdb.firebaseio.com/products.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }
    );
    const responseData = await response.json();
    if(!response.ok){
        const error = responseData.message || "Something went wrong";
        console.log(error);
    }
      state.products.unshift(payload);
    },
    async updateProduct(state,payload){
        let index = null;
        for(var i =0; i<state.products.length; i++){
            if(state.products[i].id === payload.id){
                index = i;
            }
        }
        const pid = payload.id;
        const response = await fetch(
      `https://learning-vue-40341-default-rtdb.firebaseio.com/products/${pid}.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }
    );
    const responseData = await response.json();
    if(!response.ok){
        const error = responseData.message || "Something went wrong";
        console.log(error);
    }
        state.products[index] = payload;
    }
  },
  actions: {
    async deleteProduct(context, payload) {
      const response = await fetch(
        `https://learning-vue-40341-default-rtdb.firebaseio.com/products/${payload.id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      const responseData = response.json();
      if(!response.ok){
        const error = responseData.message || 'Something went wrong';
        console.log(error);
      }
      context.commit("deleteProduct", payload);
    },
    addProduct(context, payload){
        context.commit('addProduct', payload);
    },
    updateProduct(context, payload){
        context.commit("updateProduct", payload);
    },
    
    async setProducts(context){
      const response = await fetch(
        "https://learning-vue-40341-default-rtdb.firebaseio.com/products.json"
      );
      const responseData = await response.json();
      if(!response.ok){
          const error = responseData.message || 'Something went wrong';
          console.log(error);
      }
      const Products = [];
      for(const key in responseData){
          const product = {
              id: key,
              name: responseData[key].name,
              desc: responseData[key].desc,
              quantity: responseData[key].quantity,
              rate: responseData[key].rate
          }
          Products.push(product);
      }
     
      context.commit('setProducts', Products)    
    }
  }
});

const app = createApp(App);

app.use(store);
app.mount('#app');

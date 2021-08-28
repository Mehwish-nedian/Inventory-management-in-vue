<template>
<section>
  <base-button @click="addProduct()" class="btn">Add New Product</base-button>
  <product-form typeOfForm='add' title="Add New Product" :show="this.adding" @close-save-dialog="this.adding = false" @close="this.adding = false">
  </product-form>
  <product-form :id="updatedActiveId" typeOfForm='edit' title="Edit Product" :show="this.editing" @close="this.editing = false"> 
  </product-form>
  <table>
    <thead>
      <tr>
        <th>Product Name</th>
        <th>Product Description</th>
        <th>Quantity</th>
        <th>Cost</th>
        <th>Total</th>
        <th colspan = '2'>Actions</th>
      </tr>
    </thead>
    <tbody>
     <tr v-for="product in Products" :key = product.id >
       <td>{{product.name}}</td>
       <td>{{product.desc}}</td>
       <td>{{product.quantity + ' pcs'}}</td>
       <td>${{product.rate}}</td>
       <td>${{product.rate * product.quantity}}</td>
       <td><base-button @click="editProduct(product.id)"  class="editbtn">Edit</base-button></td>
       <td><base-button @click="deleteProduct(product.id)" class="delbtn">Delete</base-button></td>
     </tr>
    </tbody>
  </table>
</section>
</template>

<script>
import BaseButton from './components/BaseButton.vue';
import productForm from './components/Form.vue';
export default {
  provide(){
    return{
      editProduct: this.editProduct
    };
  },
  data(){
    return{
      activeid : null,
      editing: false,
      adding: false,
    };
  },
  components:{
    BaseButton,
    productForm
  },
  computed:{
    Products(){
      
      return this.$store.getters.getProducts;
    },
    updatedActiveId(){
      return this.activeid;
    }
  },
  created(){
    this.$store.dispatch('setProducts')
  },
  methods:{
    async editProduct(id){
      this.editing = true;
       this.activeid = await id;
    },
    deleteProduct(id){
      const prod = this.Products.find((product)=>product.id ===id);
      this.$store.dispatch('deleteProduct', prod)
    },
    addProduct(){
      this.adding = true;
    },
  }
};
</script>

<style>

* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;

}

body {
  margin: 0;
  text-align: center;
  overflow-x: hidden;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
.delbtn{
  background-color: red;
  color: white;
}
.editbtn, .btn{
  background-color: green;
  color: white;
}
</style>
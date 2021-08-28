<template>
<section>
  <base-dialog showdialog v-if="error" title="Invalid input"  @close="error=false">
  Please enter valid data
  </base-dialog>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="show">
        <header>
          <slot name="header">
            <h2>{{ title }}</h2>
          </slot>
        </header>
        <section>
          <form>
              <div class="form-control">
                <label for="name">Product Name</label>
                <input type="text" id="name" ref="name" required/>
              </div>
              <div class="form-control">
                <label for="desc">Product Description</label>
                <input type="text" id="desc" ref="desc" required/>
              </div>
              <div class="form-control">
                <label for="cost">Cost</label>
                <input type="number" id="cost" ref="cost" required/>
              </div>
              <div class="form-control">
                <label for="quantity">Product Quantity</label>
                <input type="number" id="quantity" ref="quantity" required/>
              </div>
          </form>
        </section>
        <menu v-if="!fixed">
          <slot name="actions">
            <base-button v-if="typeOfForm ==='add'" class = 'save-btn'  @click="addProduct">Add</base-button>
            <base-button v-if="typeOfForm ==='edit'" class = 'save-btn' @click="edit">Save changes</base-button>
            <base-button class="closebtn" @click="tryClose">Cancel</base-button>
          </slot>
        </menu>
      </dialog>
    </transition>
  </teleport>
</section>
</template>

<script>
import BaseButton from './BaseButton.vue';
import BaseDialog from './BaseDialog.vue';
export default {
    inject:['editProduct'],
    props: {
    id:{
        type: String,
        required: false
    },
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    },
    typeOfForm:{
      type: String,
      required: false,
    }
  },
  components:{
      BaseButton,
      BaseDialog
  },
    data(){
        return{
            name: '',
            desc: '',
            cost: null,
            quantity: null,
            error: false
        };
    },

  async updated(){
      console.log('Created running');
      if(this.typeOfForm==='edit'){
          const activeproduct = await this.$store.getters.getProducts.find((prod)=>prod.id===this.id);
          
          this.$refs.name.value = activeproduct.name;
          this.$refs.desc.value = activeproduct.desc;
          this.$refs.cost.value = activeproduct.rate;
          this.$refs.quantity.value = activeproduct.quantity;
          
      }
  },
  emits: ['close', 'edit-pro'],
  methods: {
    edit(){
      if(this.checkError()){
        const updatedProduct = {
            id : this.id,
            name : this.$refs.name.value,
            desc : this.$refs.desc.value,
            quantity : this.$refs.quantity.value,
            rate : this.$refs.cost.value,
        }
        this.$store.dispatch('updateProduct', updatedProduct);
        this.tryClose();
      }
    },

    tryClose() {
      if (this.fixed) {
        return;
      }
      this.$emit('close');
    },
    checkError(){
    const name = this.$refs.name.value;
      const desc = this.$refs.desc.value;
      const quantity = this.$refs.quantity.value;
      const rate = this.$refs.cost.value;
      console.log('running...');
      console.log(name);
      if(name === "" ||desc === "" ||quantity === ""  ||rate === ""){
  
        this.error = true;
        this.$emit('close-save-dialog');
        return false;
      }else{
        this.$emit('close-save-dialog');
        return true;
      }
    },
    addProduct(){
      if(this.checkError()){
        const newProduct = {
            id : new Date().toISOString(),
            name : this.$refs.name.value,
            desc : this.$refs.desc.value,
            quantity : this.$refs.quantity.value,
            rate : this.$refs.cost.value,
        }
        this.$store.dispatch('addProduct', newProduct);
        this.$refs.name.value = null;
        this.$refs.desc.value = null;
        this.$refs.quantity.value = null;
        this.$refs.cost.value = null;
        this.$emit('close-save-dialog');
      }
    },
    
  },
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}
.closebtn{
    background-color: #3a0061
}
.save-btn{
    background-color: green;
}
dialog {
  position: fixed;
  top: 20vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: white;
}
header {
  background-color: #3a0061;
  color: white;
  width: 100%;
  padding: 1rem;
}
header h2 {
  margin: 0;
}
section {
  padding: 1rem;
}
menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}
.dialog-enter-active {
  transition: all 0.3s ease-out;
}
.dialog-leave-active {
  transition: all 0.3s ease-in;
}
.dialog-enter-from{
  opacity: 0;
  transform: scale(0.8);
}
.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}
form {
  margin: 1rem;
  padding: 1rem;
}
.form-control {
  margin: 0.5rem 0;
}
label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}
input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}
input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>
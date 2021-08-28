<template>
    <div class="container">
        <h1><slot name="heading"></slot></h1>
        <hr>
        <h6><slot name="sub-heading"></slot></h6>
        <base-button>RETURN HOME</base-button>
    </div>
</template>
<script>
import BaseButton from './BaseButton.vue';
export default {
    components:{
        BaseButton
    }
}
</script>
<style scoped>
.container{
    width: 50rem;
    height: 18rem;
    background-color: black;
    opacity: 0.5;
    justify-content: center;
    align-items: center;
    color: white;
}
hr{
    margin: 0 17rem;
}
h6{
    font-size: 16px;
}
h1{
    font-size: 50px ;
    padding: 4%;
    margin: 0;
}

</style>
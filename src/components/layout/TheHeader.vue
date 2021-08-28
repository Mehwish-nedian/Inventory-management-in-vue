<template>
    <header>
        <nav>
            <img src="../../assets/images/Logo.png" alt="Logo">
            <ul>
                <li><router-link to="/home">Home</router-link></li>
                <li><router-link to="/rooms">Rooms</router-link></li>
            </ul>
        </nav>
    </header>
</template>
<style scoped>
header{
    width: 100%;
    height: 5rem;
    background-color: #daecf5;
    display: flex;
}
img{
    height: 60px;
    float: left;
    margin: 0 5rem 0 7rem;
}
header ul{
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
}
header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
header a{
    text-decoration: none;
    display: inline-block;
    color: #f7940a;
    padding: 0.75rem 1.5rem;
    font-size: 1.2rem;
    border: 1px solid transparent;
}
header li{
    margin: 0 0.5rem;
    text-decoration: none;
}

a:active,
a:hover,
a.router-link-active{
  border-bottom: 1px solid #f7940a;
}
</style>
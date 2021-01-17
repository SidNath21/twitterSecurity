<template>
    <div id="app">
        
        <Nav/>
        <router-view />
    </div>
</template>

<script>
import Nav from './components/Nav'
export default {
    name: "App",
    components: {Nav},
};
</script>

<style>

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
    scroll-behavior: smooth;
}

#app{
    background-color: #121212;
}
</style>

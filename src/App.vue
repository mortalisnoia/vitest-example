<template>
<!-- ##001: use the component in template -->
  <RollTheDice />
</template>
<script>
// ##002: import the component
import RollTheDice from './components/RollTheDice.vue'
export default {
  name: 'App',
  components: {
    // ##003: declare the component
    RollTheDice
  }
}
</script>
<style>
#app {
  color: #2c3e50;
  margin-top: 60px;
  margin-left:800px;
  display: inline-block;
  font-size: 20px;
}
</style>

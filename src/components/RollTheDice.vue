<template>
  <h1 id="currentNumber">Number is: {{ dice }}</h1>
  <div id="numberOfRolls">Number of rolls: {{ rolls.length }}</div>
  <div id="total">Total: {{ total }}</div>
  <button id="roll" @click="roll()">Let's roll the dice</button>
  <button id="restart" @click="restart()">Restart</button>
  <ul>
    <li v-for="(t, index) in rolls" :key="index">
       {{ t }}
    </li>
  </ul>
</template>

<script>
// ##001 : import ref and computed from vue3
import { ref, computed } from "vue";
export default {
  name: 'RollTheDice',
// ##002 : implement setup function
  setup() {
// ##003 : declare and initialize 2 reactive variables dice and rolls
    const dice = ref(0);
    const rolls = ref([]);
// ##004: implement roll function (inside setup() )
    function roll() {
      dice.value = Math.floor(Math.random() * Math.floor(5)) + 1;
      rolls.value.unshift(dice.value);
      console.log('foi chamado!');
    }
// ##005: implement restart function (inside setup() )
    function restart() {
      dice.value=0
      rolls.value = [];
    }
// ##006: define a computed function (total)
    const total = computed(() => {
      let temptotal = 0;
      for (let i=0 ; i< rolls.value.length; i++) {
        temptotal = temptotal + rolls.value[i]
      }
      return temptotal;
    });
// ##007: expose to the template all stuff (variables, functions, computed etc)
    return { dice, rolls, total, roll, restart };
  }
}
</script>

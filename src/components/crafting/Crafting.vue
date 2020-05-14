<template>
  <div class="tables-wrapper">
    <Dragonhide></Dragonhide>
    <Battlestaves></Battlestaves>
    <Gems></Gems>
    <Glass></Glass>
  </div>
</template>

<script>
import Glass from "./tables/Glass";
import Dragonhide from "./tables/Dragonhide";
import Gems from "./tables/Gems";
import Battlestaves from "./tables/Battlestaves";

export default {
  name: "CraftingTables",
  components: {
    Glass,
    Dragonhide,
    Gems,
    Battlestaves
  }
};
</script>

<style>
</style>
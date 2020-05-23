<template>
  <div class="tables-wrapper">
    <Potions></Potions>
    <Herbs></Herbs>
  </div>
</template>

<script>
import Potions from "./tables/Potions";
import Herbs from "./tables/Herbs";

export default {
  name: "HerbloreTables",
  components: {
    Potions,
    Herbs
  }
};
</script>

<style>
</style>
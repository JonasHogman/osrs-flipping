<template>
  <div class="tables-wrapper">
    <Bows></Bows>

    <Darts></Darts>
  </div>
</template>

<script>
import Bows from "./tables/Bows";
import Darts from "./tables/Darts";
export default {
  name: "FletchingTables",
  components: {
    Bows,
    Darts
  }
};
</script>

<style>
</style>
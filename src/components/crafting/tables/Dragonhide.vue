<template>
  <div class="bow-table">
    <ag-grid-vue
      v-if="rowData !== null"
      class="ag-theme-balham-dark table-div"
      :gridOptions="gridOptions"
      :defaultColDef="defaultColDef"
      :columnDefs="columnDefs"
      :rowData="rowData"
      @grid-ready="onGridReady"
      @first-data-rendered="onFirstDataRendered"
    ></ag-grid-vue>
  </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";
import { tableMixin } from "../../mixins/tableMixin";

export default {
  name: "DragonhideTable",
  components: {
    AgGridVue
  },
  mixins: [tableMixin],

  beforeMount() {
    this.loadTableData("../assets/crafting.json", "Crafting dragonhide bodies");
    this.defaultColDef = {
      resizable: true,
      sortable: true,
      suppressMenu: true,
      valueFormatter: this.numberFormatter
    };
    this.domLayout = "autoHeight";
    this.columnDefs = this.createDefaultColDefs();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

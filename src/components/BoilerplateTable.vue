<template>
  <ag-grid-vue
    class="ag-theme-balham-dark table-div"
    :gridOptions="gridOptions"
    :defaultColDef="defaultColDef"
    :columnDefs="columnDefs"
    :rowData="rowData"
    @grid-ready="onGridReady"
    @first-data-rendered="onFirstDataRendered"
  ></ag-grid-vue>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";
//import axios from "axios";
import { tableMixin } from "./mixins/tableMixin";

export default {
  name: "BoilerplateTable",
  components: {
    AgGridVue
  },
  mixins: [tableMixin],
  methods: {},

  beforeMount() {
    this.loadTableData("../assets/herblore.json", "Crafting potions");
    this.defaultColDef = {
      resizable: true,
      sortable: true,
      suppressMenu: true,
      valueFormatter: this.numberFormatter
    };
    this.domLayout = "autoHeight";
    this.columnDefs = this.createDefaultColDefs();
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table-div {
  max-width: 700px;
  margin: auto;
}
</style>

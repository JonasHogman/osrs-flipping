<template>
  <div class="flip-table cols">
    <ag-grid-vue
      v-if="hideRowData !== null"
      class="ag-theme-balham-dark table-div"
      :gridOptions="hideGridOptions"
      :defaultColDef="defaultColDef"
      :columnDefs="columnDefs"
      :rowData="hideRowData"
      @grid-ready="onHideGridReady"
      @first-data-rendered="onFirstHideDataRendered"
    ></ag-grid-vue>
    <ag-grid-vue
      class="ag-theme-balham-dark table-div"
      :gridOptions="gemGridOptions"
      :defaultColDef="defaultColDef"
      :columnDefs="columnDefs"
      :rowData="gemRowData"
      @grid-ready="onGemGridReady"
      @first-data-rendered="onFirstGemDataRendered"
    ></ag-grid-vue>
    <ag-grid-vue
      class="ag-theme-balham-dark table-div"
      :gridOptions="staffGridOptions"
      :defaultColDef="defaultColDef"
      :columnDefs="columnDefs"
      :rowData="staffRowData"
      @grid-ready="onStaffGridReady"
      @first-data-rendered="onFirstStaffDataRendered"
    ></ag-grid-vue>
    <ag-grid-vue
      class="ag-theme-balham-dark table-div"
      :gridOptions="glassGridOptions"
      :defaultColDef="defaultColDef"
      :columnDefs="columnDefs"
      :rowData="glassRowData"
      @grid-ready="onGlassGridReady"
      @first-data-rendered="onFirstGlassDataRendered"
    ></ag-grid-vue>
  </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";
import axios from "axios";

export default {
  name: "CraftingTables",
  components: {
    AgGridVue
  },
  data: function() {
    return {
      hideGridOptions: null,
      hideGridApi: null,
      hideGridColumnApi: null,
      hideColumnDefs: null,
      hideRowData: null,
      gemGridOptions: null,
      gemGridApi: null,
      gemGridColumnApi: null,
      gemColumnDefs: null,
      gemRowData: null,
      staffGridOptions: null,
      staffGridApi: null,
      staffGridColumnApi: null,
      staffColumnDefs: null,
      staffRowData: null,
      glassGridOptions: null,
      glassGridApi: null,
      glassGridColumnApi: null,
      glassColumnDefs: null,
      glassRowData: null,

      defaultColDef: null,
      activeTab: 1
    };
  },
  computed: {
    ge_json() {
      return this.$store.getters.ge_json;
    },
    ge_icons() {
      return this.$store.getters.ge_icons;
    }
  },
  methods: {
    getCategoryData(category, json) {
      for (let item of json) {
        if (item["category"] == category) {
          this.category_items = item;
          break;
        }
      }

      let categoryInfo = this.category_items["information"];
      let data = [];
      for (let item of categoryInfo) {
        let rowData = {};
        rowData["name"] = item["name"];
        rowData["icon_id"] = item["icon_id"];
        rowData["level"] = item["information"]["level"];
        rowData["xp_per_unit"] = item["information"]["xp_per_unit"];
        rowData["units_per_hour"] = item["information"]["units_per_hour"];
        rowData["inputs"] = item["information"]["inputs"];
        rowData["outputs"] = item["information"]["outputs"];
        data.push(rowData);
      }
      return data;
    },

    isActiveTab(id) {
      return this.activeTab === id;
    },
    onHideGridReady(params) {
      this.hideGridOptions.getRowNodeId = function(data) {
        return data.name;
      };
      this.hideGridOptions.rowHeight = 32;

      this.hideGridApi = params.api;
      this.hideGridColumnApi = params.columnApi;
      this.hideGridApi.setRowData(this.hideRowData);
      window.onresize = () => {
        this.gridApi.sizeColumnsToFit();
        //this.gridColumnApi.autoSizeColumns(allColumnIds);
      };
    },

    onGemGridReady(params) {
      this.gemGridOptions.getRowNodeId = function(data) {
        return data.name;
      };
      this.gemGridOptions.rowHeight = 32;

      this.gemGridApi = params.api;
      this.gemGridColumnApi = params.columnApi;
      this.gemGridApi.setRowData(this.gemRowData);
      window.onresize = () => {
        this.gridApi.sizeColumnsToFit();
      };
    },

    onStaffGridReady(params) {
      this.staffGridOptions.getRowNodeId = function(data) {
        return data.name;
      };
      this.staffGridOptions.rowHeight = 32;

      this.staffGridApi = params.api;
      this.staffGridColumnApi = params.columnApi;

      this.staffGridApi.setRowData(this.staffRowData);
      window.onresize = () => {
        this.gridApi.sizeColumnsToFit();
      };
    },
    onGlassGridReady(params) {
      this.glassGridOptions.getRowNodeId = function(data) {
        return data.name;
      };
      this.glassGridOptions.rowHeight = 32;

      this.glassGridApi = params.api;
      this.glassGridColumnApi = params.columnApi;
      this.glassGridApi.setRowData(this.glassRowData);
      window.onresize = () => {
        this.gridApi.sizeColumnsToFit();
        //this.gridColumnApi.autoSizeColumns(allColumnIds);
      };
    },
    onFirstHideDataRendered() {
      var allColumnIds = [];
      this.hideGridColumnApi.getAllColumns().forEach(function(column) {
        allColumnIds.push(column.colId);
      });
      this.hideGridOptions.api.setDomLayout("autoHeight");
      this.hideGridOptions.api.sizeColumnsToFit();
      //this.gridColumnApi.autoSizeColumns(allColumnIds);
    },
    onFirstGemDataRendered() {
      var allColumnIds = [];
      this.gemGridColumnApi.getAllColumns().forEach(function(column) {
        allColumnIds.push(column.colId);
      });
      this.gemGridOptions.api.setDomLayout("autoHeight");
      this.gemGridOptions.api.sizeColumnsToFit();
    },
    onFirstStaffDataRendered() {
      var allColumnIds = [];
      this.staffGridColumnApi.getAllColumns().forEach(function(column) {
        allColumnIds.push(column.colId);
      });
      this.staffGridOptions.api.setDomLayout("autoHeight");
      this.staffGridOptions.api.sizeColumnsToFit();
    },
    onFirstGlassDataRendered() {
      var allColumnIds = [];
      this.glassGridColumnApi.getAllColumns().forEach(function(column) {
        allColumnIds.push(column.colId);
      });
      this.glassGridOptions.api.setDomLayout("autoHeight");
      this.glassGridOptions.api.sizeColumnsToFit();
    }
  },

  beforeMount() {
    axios
      .get("../assets/crafting.json")
      .then(result => {
        this.hideRowData = this.getCategoryData(
          "Crafting dragonhide bodies",
          result.data
        );
        this.gemRowData = this.getCategoryData("Cutting gems", result.data);
        this.staffRowData = this.getCategoryData(
          "Crafting battlestaves",
          result.data
        );
        this.glassRowData = this.getCategoryData("Glassblowing", result.data);
      })
      .catch(error => {
        throw new Error(`API ${error}`);
      });
    this.hideGridOptions = {};
    this.gemGridOptions = {};
    this.staffGridOptions = {};
    this.glassGridOptions = {};

    this.defaultColDef = {
      resizable: true,
      sortable: true,
      suppressMenu: true,
      valueFormatter: numberFormatter
    };
    function numberFormatter(params) {
      try {
        return params.value.toLocaleString("en-US");
      } catch (TypeError) {
        return 0;
      }
    }
    this.columnDefs = [
      {
        headerName: "Item",
        field: "name",
        minWidth: 200,
        cellRenderer: function(params) {
          var element = document.createElement("span");
          var imageElement = document.createElement("img");
          imageElement.style.cssText = "vertical-align:middle;";
          imageElement.src =
            "data:image/png;base64, " + this.ge_icons[params.data.icon_id];
          element.appendChild(imageElement);
          element.appendChild(document.createTextNode(params.value));
          return element;
        }.bind(this)
      },
      {
        headerName: "Level",
        field: "level",
        cellStyle: { textAlign: "right" },
        maxWidth: 125
      },
      {
        headerName: "Units/hr",
        field: "units_per_hour",
        cellStyle: { textAlign: "right" },
        editable: true
      },
      {
        headerName: "XP",
        field: "xp_per_unit",
        cellStyle: { textAlign: "right" },
        maxWidth: 125
      },
      {
        headerName: "XP/hr",
        cellStyle: { textAlign: "right" },
        valueGetter: function(params) {
          return params.data.xp_per_unit * params.data.units_per_hour;
        }
      },
      {
        headerName: "Profit",
        colId: "profit",
        cellStyle: { textAlign: "right" },
        valueGetter: function(params) {
          var inputPrice = 0;
          var outputPrice = 0;
          for (let item of params.data.inputs) {
            let itemPrice = this.ge_json[item["id"]]["overall_average"];
            let totalPrice = itemPrice * item["quantity"];
            inputPrice += totalPrice;
          }

          for (let item of params.data.outputs) {
            let itemPrice = this.ge_json[item["id"]]["overall_average"];
            let totalPrice = itemPrice * item["quantity"];
            outputPrice += totalPrice;
          }
          let profit = outputPrice - inputPrice;
          return profit;
        }.bind(this)
      },
      {
        headerName: "GP/XP",
        cellStyle: { textAlign: "right" },
        valueGetter: function(params) {
          //console.log(params.data.units_per_hour);
          return params.getValue("profit") / params.data.xp_per_unit;
        }
      },
      {
        headerName: "Profit/hr",
        cellStyle: { textAlign: "right" },
        valueGetter: function(params) {
          //console.log(params.data.units_per_hour);
          return params.getValue("profit") * params.data.units_per_hour;
        }
      }
    ];
    this.domLayout = "autoHeight";
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.flip-table {
  width: 100%;
  height: 100%;
  background-color: #181d1f;
}

.cols {
  -moz-column-count: 2;
  -moz-column-width: 50%;
  -webkit-column-count: 2;
  -webkit-column-width: 50%;
  column-count: 2;
  column-width: 50%;
}

.table-div {
  padding-top: 20px;
}
</style>

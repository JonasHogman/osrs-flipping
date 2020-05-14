<template>
  <div class="flip-table">
    <div class="quick-filter">
      <input
        class="mr-2 form-control d-inline-block"
        @keyup="onQuickFilterChanged"
        type="text"
        id="quickFilterInput"
        placeholder="Type text to filter..."
      />
    </div>

    <ag-grid-vue
      class="ag-theme-balham-dark table-div"
      :gridOptions="gridOptions"
      :defaultColDef="defaultColDef"
      :columnDefs="columnDefs"
      :rowData="rowData"
      @grid-ready="onGridReady"
      @first-data-rendered="onFirstDataRendered"
      :pagination="true"
      :deltaRowDataMode="true"
      :floatingFilter="true"
    ></ag-grid-vue>
  </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";

export default {
  name: "FlipTable",
  components: {
    AgGridVue
  },
  data: function() {
    return {
      gridOptions: null,
      gridApi: null,
      columnApi: null,
      columnDefs: null,
      defaultColDef: null,
      rowData: null,
      activeTab: 0
    };
  },
  computed: {
    ge_json() {
      return this.$store.getters.ge_json;
    },
    ge_icons() {
      return this.$store.getters.ge_icons;
    },
    ge_limits() {
      return this.$store.getters.ge_limits;
    }
  },
  methods: {
    isActiveTab(id) {
      return this.activeTab === id;
    },
    /*
    updateData() {
      // eslint-disable-next-line
      console.log("updating data");
      axios
        .get("https://storage.googleapis.com/osb-exchange/summary.json")
        .then(response => {
          this.data = [];
          for (var key in response.data) {
            var item = response.data[key];
            item["ge_limit"] = this.geLimit[key];
            item["icon"] = this.itemIcons[key];
            this.data.push(item);
          }
          this.gridApi.setRowData(this.data);
          this.gridApi.refreshCells();
        });
    },*/
    onGridReady(params) {
      this.gridOptions.getRowNodeId = function(data) {
        return data.id;
      };
      this.gridOptions.rowHeight = 32;
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      let ge_limits = this.ge_limits;
      let ge_icons = this.ge_icons;
      let ge_data = this.ge_json;

      this.data = [];
      for (var key in ge_data) {
        var item = ge_data[key];
        item["ge_limit"] = ge_limits[key];
        item["icon"] = ge_icons[key];
        this.data.push(item);
      }
      params.api.setRowData(this.data);
    },
    onFirstDataRendered() {
      var sellFilterInstance = this.gridOptions.api.getFilterInstance(
        "sell_average"
      );
      sellFilterInstance.setModel({
        type: "greaterThan",
        filter: 0
      });
      var buyFilterInstance = this.gridOptions.api.getFilterInstance(
        "buy_average"
      );
      buyFilterInstance.setModel({
        type: "greaterThan",
        filter: 0
      });
      this.gridOptions.api.onFilterChanged();
      var allColumnIds = [];
      this.gridColumnApi.getAllColumns().forEach(function(column) {
        allColumnIds.push(column.colId);
      });
      this.gridOptions.api.sizeColumnsToFit();
      //this.gridColumnApi.autoSizeColumns(allColumnIds);
    },
    onQuickFilterChanged(event) {
      this.gridOptions.api.setQuickFilter(event.target.value);
    }
  },
  beforeMount() {
    this.gridOptions = {};
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
        filter: true,
        cellRenderer: function(params) {
          var element = document.createElement("span");
          var imageElement = document.createElement("img");
          imageElement.style.cssText = "vertical-align:middle;";
          imageElement.src = "data:image/png;base64, " + params.data.icon;
          element.appendChild(imageElement);
          element.appendChild(document.createTextNode(params.value));
          return element;
        },
        width: 300
      },
      {
        headerName: "Members",
        field: "members",
        width: 115,
        filter: true
      },
      {
        headerName: "Buy Average",
        field: "buy_average",
        cellStyle: { textAlign: "right" },
        filter: "agNumberColumnFilter"
      },
      {
        headerName: "Sell Average",
        field: "sell_average",
        cellStyle: { textAlign: "right" },
        filter: "agNumberColumnFilter"
      },
      {
        headerName: "Margin",
        colId: "margin",
        valueGetter: function(params) {
          return params.data.buy_average - params.data.sell_average;
        },
        filter: "agNumberColumnFilter",
        filterParams: {
          defaultOption: "greaterThan"
        },
        cellStyle: params => {
          if (params.value > 80) {
            return { textAlign: "right", color: "green" };
          } else if (params.value < 0) {
            return { textAlign: "right", color: "red" };
          } else {
            return { textAlign: "right", color: "yellow" };
          }
        }
      },
      {
        headerName: "Volume (items)",
        field: "overall_quantity",
        cellStyle: { textAlign: "right" },
        filter: "agNumberColumnFilter",
        filterParams: {
          defaultOption: "greaterThan"
        }
      },
      {
        headerName: "Volume (GP)",
        colId: "volume_gp",
        cellStyle: { textAlign: "right" },
        valueGetter: function(params) {
          return params.data.overall_average * params.data.overall_quantity;
        },
        filter: "agNumberColumnFilter",
        filterParams: {
          defaultOption: "greaterThan"
        }
      },
      {
        headerName: "ROI (%)",
        cellStyle: { textAlign: "right" },
        valueGetter: function(params) {
          if (params.data.buy_average == 0) {
            return 0;
          } else if (params.data.sell_average == 0) {
            return 0;
          } else {
            return (params.getValue("margin") / params.data.sell_average) * 100;
          }
        },
        filter: "agNumberColumnFilter",
        filterParams: {
          defaultOption: "greaterThan"
        },
        width: 115
      },
      {
        headerName: "Buy/Sell Ratio",
        cellStyle: { textAlign: "right" },
        valueGetter: function(params) {
          if (params.data.buy_quantity == 0) {
            return 0;
          } else if (params.data.sell_quantity == 0) {
            return 0;
          } else {
            return params.data.buy_quantity / params.data.sell_quantity;
          }
        },
        filter: "agNumberColumnFilter",
        filterParams: {
          defaultOption: "greaterThan"
        },
        width: 135
      },
      {
        headerName: "GE Limit",
        cellStyle: { textAlign: "right" },
        field: "ge_limit",
        filter: "agNumberColumnFilter"
      },
      {
        headerName: "Potential Profit",
        cellStyle: { textAlign: "right" },
        valueGetter: function(params) {
          return params.getValue("margin") * params.data.ge_limit;
        },
        filter: "agNumberColumnFilter",
        filterParams: {
          defaultOption: "greaterThan"
        }
      },
      {
        headerName: "Volume-based Profit",
        cellStyle: { textAlign: "right" },
        valueGetter: function(params) {
          if (params.data.overall_quantity < params.data.ge_limit) {
            return params.data.overall_quantity * params.getValue("margin");
          } else {
            return params.getValue("margin") * params.data.ge_limit;
          }
        },
        filter: "agNumberColumnFilter",
        filterParams: {
          defaultOption: "greaterThan"
        }
      }
    ];
  },

  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.flip-table,
.table-div {
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  margin: 0;
  background-color: #181d1f;
}

.table-div {
  height: 97%;
  padding-bottom: 1%;
}

.quick-filter {
  height: 3%;
  padding-bottom: 5px;
}

.quick-filter input {
  height: 100%;
  background-color: #181d1f;
  color: #ffffff;
  padding: 10px 10px;
  border-width: thin;
}
</style>

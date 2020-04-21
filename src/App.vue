<template>
  <div class="outer-div">
    <!-- <input
      class="mr-2 form-control d-inline-block"
      @keyup="onQuickFilterChanged"
      type="text"
      id="quickFilterInput"
      placeholder="Type text to filter..."
    />

    <button v-on:click="updateData">Refresh data</button>
    {{ timerCount }}-->
    <!-- <h1>Large Data Set Component (50,000 rows)</h1> -->
    <ag-grid-vue
      class="ag-theme-alpine-dark table-div"
      :gridOptions="gridOptions"
      :columnDefs="columnDefs"
      :rowData="rowData"
      @grid-ready="onGridReady"
      @first-data-rendered="onFirstDataRendered"
      :pagination="true"
      :deltaRowDataMode="true"
    ></ag-grid-vue>
  </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    AgGridVue
  },
  data: function() {
    return {
      columnDefs: null,
      rowData: null
    };
  },
  methods: {
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
    },
    onGridReady(params) {
      this.gridOptions.getRowNodeId = function(data) {
        return data.id;
      };
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      axios.get("ge-limits-ids.json").then(response => {
        this.geLimit = response.data;
        axios
          .get("assets/base64/icons-items-complete-filtered.json")
          .then(response => {
            this.itemIcons = response.data;
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
                params.api.setRowData(this.data);
              });
          });
      });
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
      this.gridColumnApi.autoSizeColumns(allColumnIds);
    },
    onQuickFilterChanged(event) {
      this.gridOptions.api.setQuickFilter(event.target.value);
    }
  },
  beforeMount() {
    this.gridOptions = {};
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
        resizable: true,
        cellRenderer: function(params) {
          /*var cellHTML =
            '<span><img style="vertical-align:middle;" src=data:image/png;base64, ' +
            params.data.icon +
            "/>" +
            params.value +
            "</span>";*/
          var element = document.createElement("span");
          var imageElement = document.createElement("img");
          imageElement.style.cssText = "vertical-align:middle;";
          imageElement.src = "data:image/png;base64, " + params.data.icon;
          element.appendChild(imageElement);
          element.appendChild(document.createTextNode(params.value));
          return element;
        }
      },
      {
        headerName: "Members",
        field: "members",
        filter: true,
        resizable: true
      },
      {
        headerName: "Buy Average",
        field: "buy_average",
        sortable: true,
        filter: "agNumberColumnFilter",
        valueFormatter: numberFormatter,
        resizable: true
      },
      {
        headerName: "Sell Average",
        field: "sell_average",
        sortable: true,
        filter: "agNumberColumnFilter",
        valueFormatter: numberFormatter,
        resizable: true
      },
      {
        headerName: "Margin",
        colId: "margin",
        resizable: true,
        valueGetter: function(params) {
          return params.data.buy_average - params.data.sell_average;
        },
        sortable: true,
        filter: "agNumberColumnFilter",
        cellStyle: params => {
          if (params.value > 80) {
            return { color: "green" };
          } else if (params.value < 0) {
            return { color: "red" };
          } else {
            return { color: "yellow" };
          }
        },
        valueFormatter: numberFormatter
      },
      {
        headerName: "Volume (items)",
        field: "overall_quantity",
        sortable: true,
        filter: "agNumberColumnFilter",
        valueFormatter: numberFormatter,
        resizable: true
      },
      {
        headerName: "Volume (GP)",
        colId: "volume_gp",
        valueGetter: function(params) {
          return params.data.overall_average * params.data.overall_quantity;
        },
        sortable: true,
        filter: "agNumberColumnFilter",
        valueFormatter: numberFormatter,
        resizable: true
      },
      {
        headerName: "ROI (%)",
        valueGetter: function(params) {
          if (params.data.buy_average == 0) {
            return 0;
          } else if (params.data.sell_average == 0) {
            return 0;
          } else {
            return (params.getValue("margin") / params.data.sell_average) * 100;
          }
        },
        sortable: true,
        filter: "agNumberColumnFilter",
        valueFormatter: numberFormatter,
        resizable: true
      },
      {
        headerName: "GE Limit",
        field: "ge_limit",
        sortable: true,
        filter: "agNumberColumnFilter",
        valueFormatter: numberFormatter,
        resizable: true
      },
      {
        headerName: "Potential Profit",
        valueGetter: function(params) {
          return params.getValue("margin") * params.data.ge_limit;
        },
        sortable: true,
        filter: "agNumberColumnFilter",
        valueFormatter: numberFormatter,
        resizable: true
      },
      {
        headerName: "Volume-based Profit",
        valueGetter: function(params) {
          if (params.data.overall_quantity < params.data.ge_limit) {
            return params.data.overall_quantity * params.getValue("margin");
          } else {
            return params.getValue("margin") * params.data.ge_limit;
          }
        },
        sortable: true,
        filter: "agNumberColumnFilter",
        valueFormatter: numberFormatter,
        resizable: true
      }
    ];
  },

  created() {}
};
</script>

<style>
@import "../node_modules/ag-grid-community/dist/styles/ag-grid.css";
@import "../node_modules/ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

html,
body,
.outer-div,
.table-div {
  width: 100%;
  height: 100%;
  overflow: hidden;
  left: 0;
  right: 0;
  margin: 0;
}
</style>

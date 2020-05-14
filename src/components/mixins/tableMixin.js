/*
This file contains the default actions needed to set up a basic table
*/
import axios from "axios";
export const tableMixin = {
  data: function() {
    return {
      gridOptions: {},
      gridApi: null,
      gridColumnApi: null,
      rowData: null,
    };
  },
  computed: {
    ge_json() {
      return this.$store.getters.ge_json;
    },
    ge_icons() {
      return this.$store.getters.ge_icons;
    },
  },
  methods: {
    onGridReady: function(params) {
      this.gridOptions.getRowNodeId = function(data) {
        return data.name;
      };
      this.gridOptions.rowHeight = 32;

      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      this.gridApi.setRowData(this.rowData);
    },
    isActiveTab: function(id) {
      return this.activeTab === id;
    },
    numberFormatter: function numberFormatter(params) {
      try {
        return params.value.toLocaleString("en-US");
      } catch (TypeError) {
        return 0;
      }
    },
    getCategoryData: function(category, json) {
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
    onFirstDataRendered: function() {
      var allColumnIds = [];
      this.gridColumnApi.getAllColumns().forEach(function(column) {
        allColumnIds.push(column.colId);
      });
      this.gridOptions.api.setDomLayout("autoHeight");
      this.gridOptions.api.sizeColumnsToFit();
      //this.gridColumnApi.autoSizeColumns(allColumnIds);
    },
    loadTableData: function(link, category) {
      axios
        .get(link)
        .then((result) => {
          let categoryData = this.getCategoryData(category, result.data);
          this.rowData = categoryData;
        })
        .catch((error) => {
          throw new Error(`API ${error}`);
        });
    },
    createDefaultColDefs: function() {
      return [
        {
          headerName: "Item",
          headerClass: "herblore-header",
          field: "name",
          minWidth: 150,
          cellRenderer: function(params) {
            var element = document.createElement("span");
            var imageElement = document.createElement("img");
            imageElement.style.cssText = "vertical-align:middle;";
            imageElement.src =
              "data:image/png;base64, " + this.ge_icons[params.data.icon_id];
            element.appendChild(imageElement);
            element.appendChild(document.createTextNode(params.value));
            return element;
          }.bind(this),
        },
        {
          headerName: "Level",
          field: "level",
          cellStyle: { textAlign: "right" },
          maxWidth: 125,
        },
        {
          headerName: "Units/hr",
          field: "units_per_hour",
          cellStyle: { textAlign: "right" },
          editable: true,
        },
        {
          headerName: "XP",
          field: "xp_per_unit",
          cellStyle: { textAlign: "right" },
          maxWidth: 125,
        },
        {
          headerName: "XP/hr",
          cellStyle: { textAlign: "right" },
          valueGetter: function(params) {
            return params.data.xp_per_unit * params.data.units_per_hour;
          },
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
          }.bind(this),
        },
        {
          headerName: "GP/XP",
          cellStyle: { textAlign: "right" },
          valueGetter: function(params) {
            //console.log(params.data.units_per_hour);
            return params.getValue("profit") / params.data.xp_per_unit;
          },
        },
        {
          headerName: "Profit/hr",
          cellStyle: { textAlign: "right" },
          valueGetter: function(params) {
            //console.log(params.data.units_per_hour);
            return params.getValue("profit") * params.data.units_per_hour;
          },
        },
      ];
    },
  },
};

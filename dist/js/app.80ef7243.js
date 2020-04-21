(function(e){function t(t){for(var r,l,o=t[0],u=t[1],s=t[2],m=0,g=[];m<o.length;m++)l=o[m],Object.prototype.hasOwnProperty.call(i,l)&&i[l]&&g.push(i[l][0]),i[l]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);d&&d(t);while(g.length)g.shift()();return n.push.apply(n,s||[]),a()}function a(){for(var e,t=0;t<n.length;t++){for(var a=n[t],r=!0,o=1;o<a.length;o++){var u=a[o];0!==i[u]&&(r=!1)}r&&(n.splice(t--,1),e=l(l.s=a[0]))}return e}var r={},i={app:0},n=[];function l(t){if(r[t])return r[t].exports;var a=r[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,l),a.l=!0,a.exports}l.m=e,l.c=r,l.d=function(e,t,a){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(l.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)l.d(a,r,function(t){return e[t]}.bind(null,r));return a},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],u=o.push.bind(o);o.push=t,o=o.slice();for(var s=0;s<o.length;s++)t(o[s]);var d=u;n.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"034f":function(e,t,a){"use strict";var r=a("64a9"),i=a.n(r);i.a},"56d7":function(e,t,a){"use strict";a.r(t);var r=a("2b0e"),i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"outer-div"},[a("ag-grid-vue",{staticClass:"ag-theme-alpine-dark table-div",attrs:{gridOptions:e.gridOptions,columnDefs:e.columnDefs,rowData:e.rowData,pagination:!0,deltaRowDataMode:!0},on:{"grid-ready":e.onGridReady,"first-data-rendered":e.onFirstDataRendered}})],1)},n=[],l=(a("ac6a"),a("401b")),o=a("62c3"),u=a.n(o),s={name:"App",components:{AgGridVue:l["AgGridVue"]},data:function(){return{columnDefs:null,rowData:null}},methods:{updateData(){console.log("updating data"),u.a.get("https://storage.googleapis.com/osb-exchange/summary.json").then(e=>{for(var t in this.data=[],e.data){var a=e.data[t];a["ge_limit"]=this.geLimit[t],a["icon"]=this.itemIcons[t],this.data.push(a)}this.gridApi.setRowData(this.data),this.gridApi.refreshCells()})},onGridReady(e){this.gridOptions.getRowNodeId=function(e){return e.id},this.gridApi=e.api,this.gridColumnApi=e.columnApi,u.a.get("ge-limits-ids.json").then(t=>{this.geLimit=t.data,u.a.get("assets/base64/icons-items-complete-filtered.json").then(t=>{this.itemIcons=t.data,u.a.get("https://storage.googleapis.com/osb-exchange/summary.json").then(t=>{for(var a in this.data=[],t.data){var r=t.data[a];r["ge_limit"]=this.geLimit[a],r["icon"]=this.itemIcons[a],this.data.push(r)}e.api.setRowData(this.data)})})})},onFirstDataRendered(){var e=this.gridOptions.api.getFilterInstance("sell_average");e.setModel({type:"greaterThan",filter:0});var t=this.gridOptions.api.getFilterInstance("buy_average");t.setModel({type:"greaterThan",filter:0}),this.gridOptions.api.onFilterChanged();var a=[];this.gridColumnApi.getAllColumns().forEach((function(e){a.push(e.colId)})),this.gridColumnApi.autoSizeColumns(a)},onQuickFilterChanged(e){this.gridOptions.api.setQuickFilter(e.target.value)}},beforeMount(){function e(e){try{return e.value.toLocaleString("en-US")}catch(t){return 0}}this.gridOptions={},this.columnDefs=[{headerName:"Item",field:"name",filter:!0,resizable:!0,cellRenderer:function(e){var t=document.createElement("span"),a=document.createElement("img");return a.style.cssText="vertical-align:middle;",a.src="data:image/png;base64, "+e.data.icon,t.appendChild(a),t.appendChild(document.createTextNode(e.value)),t}},{headerName:"Members",field:"members",filter:!0,resizable:!0},{headerName:"Buy Average",field:"buy_average",sortable:!0,filter:"agNumberColumnFilter",valueFormatter:e,resizable:!0},{headerName:"Sell Average",field:"sell_average",sortable:!0,filter:"agNumberColumnFilter",valueFormatter:e,resizable:!0},{headerName:"Margin",colId:"margin",resizable:!0,valueGetter:function(e){return e.data.buy_average-e.data.sell_average},sortable:!0,filter:"agNumberColumnFilter",cellStyle:e=>e.value>80?{color:"green"}:e.value<0?{color:"red"}:{color:"yellow"},valueFormatter:e},{headerName:"Volume (items)",field:"overall_quantity",sortable:!0,filter:"agNumberColumnFilter",valueFormatter:e,resizable:!0},{headerName:"Volume (GP)",colId:"volume_gp",valueGetter:function(e){return e.data.overall_average*e.data.overall_quantity},sortable:!0,filter:"agNumberColumnFilter",valueFormatter:e,resizable:!0},{headerName:"ROI (%)",valueGetter:function(e){return 0==e.data.buy_average||0==e.data.sell_average?0:e.getValue("margin")/e.data.sell_average*100},sortable:!0,filter:"agNumberColumnFilter",valueFormatter:e,resizable:!0},{headerName:"GE Limit",field:"ge_limit",sortable:!0,filter:"agNumberColumnFilter",valueFormatter:e,resizable:!0},{headerName:"Potential Profit",valueGetter:function(e){return e.getValue("margin")*e.data.ge_limit},sortable:!0,filter:"agNumberColumnFilter",valueFormatter:e,resizable:!0},{headerName:"Volume-based Profit",valueGetter:function(e){return e.data.overall_quantity<e.data.ge_limit?e.data.overall_quantity*e.getValue("margin"):e.getValue("margin")*e.data.ge_limit},sortable:!0,filter:"agNumberColumnFilter",valueFormatter:e,resizable:!0}]},created(){}},d=s,m=(a("034f"),a("2877")),g=Object(m["a"])(d,i,n,!1,null,null,null),c=g.exports;r["a"].config.productionTip=!1,new r["a"]({render:e=>e(c)}).$mount("#app")},"64a9":function(e,t,a){}});
//# sourceMappingURL=app.80ef7243.js.map
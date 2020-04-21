(function(e){function t(t){for(var r,l,o=t[0],u=t[1],s=t[2],c=0,m=[];c<o.length;c++)l=o[c],Object.prototype.hasOwnProperty.call(n,l)&&n[l]&&m.push(n[l][0]),n[l]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);d&&d(t);while(m.length)m.shift()();return i.push.apply(i,s||[]),a()}function a(){for(var e,t=0;t<i.length;t++){for(var a=i[t],r=!0,o=1;o<a.length;o++){var u=a[o];0!==n[u]&&(r=!1)}r&&(i.splice(t--,1),e=l(l.s=a[0]))}return e}var r={},n={app:0},i=[];function l(t){if(r[t])return r[t].exports;var a=r[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,l),a.l=!0,a.exports}l.m=e,l.c=r,l.d=function(e,t,a){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(l.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)l.d(a,r,function(t){return e[t]}.bind(null,r));return a},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],u=o.push.bind(o);o.push=t,o=o.slice();for(var s=0;s<o.length;s++)t(o[s]);var d=u;i.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"034f":function(e,t,a){"use strict";var r=a("64a9"),n=a.n(r);n.a},"56d7":function(e,t,a){"use strict";a.r(t);a("cadf"),a("551c"),a("f751"),a("097d");var r=a("2b0e"),n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"outer-div"},[a("ag-grid-vue",{staticClass:"ag-theme-alpine-dark table-div",attrs:{gridOptions:e.gridOptions,columnDefs:e.columnDefs,rowData:e.rowData,pagination:!0,deltaRowDataMode:!0},on:{"grid-ready":e.onGridReady,"first-data-rendered":e.onFirstDataRendered}})],1)},i=[],l=(a("ac6a"),a("401b")),o=a("62c3"),u=a.n(o),s={name:"App",components:{AgGridVue:l["AgGridVue"]},data:function(){return{columnDefs:null,rowData:null}},methods:{updateData:function(){var e=this;console.log("updating data"),u.a.get("https://storage.googleapis.com/osb-exchange/summary.json").then((function(t){for(var a in e.data=[],t.data){var r=t.data[a];r["ge_limit"]=e.geLimit[a],r["icon"]=e.itemIcons[a],e.data.push(r)}e.gridApi.setRowData(e.data),e.gridApi.refreshCells()}))},onGridReady:function(e){var t=this;this.gridOptions.getRowNodeId=function(e){return e.id},this.gridApi=e.api,this.gridColumnApi=e.columnApi,u.a.get("ge-limits-ids.json").then((function(a){t.geLimit=a.data,u.a.get("assets/base64/icons-items-complete-filtered.json").then((function(a){t.itemIcons=a.data,u.a.get("https://storage.googleapis.com/osb-exchange/summary.json").then((function(a){for(var r in t.data=[],a.data){var n=a.data[r];n["ge_limit"]=t.geLimit[r],n["icon"]=t.itemIcons[r],t.data.push(n)}e.api.setRowData(t.data)}))}))}))},onFirstDataRendered:function(){var e=this.gridOptions.api.getFilterInstance("sell_average");e.setModel({type:"greaterThan",filter:0});var t=this.gridOptions.api.getFilterInstance("buy_average");t.setModel({type:"greaterThan",filter:0}),this.gridOptions.api.onFilterChanged();var a=[];this.gridColumnApi.getAllColumns().forEach((function(e){a.push(e.colId)})),this.gridColumnApi.autoSizeColumns(a)},onQuickFilterChanged:function(e){this.gridOptions.api.setQuickFilter(e.target.value)}},beforeMount:function(){function e(e){try{return e.value.toLocaleString("en-US")}catch(t){return 0}}this.gridOptions={},this.columnDefs=[{headerName:"Item",field:"name",filter:!0,resizable:!0,cellRenderer:function(e){var t=document.createElement("span"),a=document.createElement("img");return a.style.cssText="vertical-align:middle;",a.src="data:image/png;base64, "+e.data.icon,t.appendChild(a),t.appendChild(document.createTextNode(e.value)),t}},{headerName:"Members",field:"members",filter:!0,resizable:!0},{headerName:"Buy Average",field:"buy_average",sortable:!0,filter:"agNumberColumnFilter",valueFormatter:e,resizable:!0},{headerName:"Sell Average",field:"sell_average",sortable:!0,filter:"agNumberColumnFilter",valueFormatter:e,resizable:!0},{headerName:"Margin",colId:"margin",resizable:!0,valueGetter:function(e){return e.data.buy_average-e.data.sell_average},sortable:!0,filter:"agNumberColumnFilter",cellStyle:function(e){return e.value>80?{color:"green"}:e.value<0?{color:"red"}:{color:"yellow"}},valueFormatter:e},{headerName:"Volume (items)",field:"overall_quantity",sortable:!0,filter:"agNumberColumnFilter",valueFormatter:e,resizable:!0},{headerName:"Volume (GP)",colId:"volume_gp",valueGetter:function(e){return e.data.overall_average*e.data.overall_quantity},sortable:!0,filter:"agNumberColumnFilter",valueFormatter:e,resizable:!0},{headerName:"ROI (%)",valueGetter:function(e){return 0==e.data.buy_average||0==e.data.sell_average?0:e.getValue("margin")/e.data.sell_average*100},sortable:!0,filter:"agNumberColumnFilter",valueFormatter:e,resizable:!0},{headerName:"GE Limit",field:"ge_limit",sortable:!0,filter:"agNumberColumnFilter",valueFormatter:e,resizable:!0},{headerName:"Potential Profit",valueGetter:function(e){return e.getValue("margin")*e.data.ge_limit},sortable:!0,filter:"agNumberColumnFilter",valueFormatter:e,resizable:!0},{headerName:"Volume-based Profit",valueGetter:function(e){return e.data.overall_quantity<e.data.ge_limit?e.data.overall_quantity*e.getValue("margin"):e.getValue("margin")*e.data.ge_limit},sortable:!0,filter:"agNumberColumnFilter",valueFormatter:e,resizable:!0}]},created:function(){}},d=s,c=(a("034f"),a("2877")),m=Object(c["a"])(d,n,i,!1,null,null,null),g=m.exports;r["a"].config.productionTip=!1,new r["a"]({render:function(e){return e(g)}}).$mount("#app")},"64a9":function(e,t,a){}});
//# sourceMappingURL=app-legacy.74144648.js.map
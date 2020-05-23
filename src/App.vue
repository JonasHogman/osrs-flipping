<template>
  <div class="outer-div">
    <div class="tabs is-medium is-centered">
      <ul>
        <li :class="{'is-active' : isActiveTab(0)}">
          <a @click="activeTab = 0">Flipping</a>
        </li>
        <li :class="{'is-active' : isActiveTab(1)}">
          <a @click="activeTab = 1">Crafting</a>
        </li>
        <li :class="{'is-active' : isActiveTab(2)}">
          <a @click="activeTab = 2">Herblore</a>
        </li>
        <li :class="{'is-active' : isActiveTab(3)}">
          <a @click="activeTab = 3">Fletching</a>
        </li>
        <li :class="{'is-active' : isActiveTab(4)}">
          <a @click="activeTab = 4">Boilerplate Test</a>
        </li>
      </ul>
    </div>
    <div class="tab-panels">
      <div class="tab-panel" v-if="isActiveTab(0)">
        <Money v-if="ge_loading==false && ge_icons_loading == false && ge_limits_loading == false"></Money>
        <div v-else>Loading GE data...</div>
      </div>
      <div class="tab-panel" v-if="isActiveTab(1)">
        <Crafting v-if="ge_loading==false"></Crafting>
        <div v-else>Loading GE data...</div>
      </div>
      <div class="tab-panel" v-if="isActiveTab(2)">
        <Herblore v-if="ge_loading==false"></Herblore>
        <div v-else>Loading GE data...</div>
      </div>
      <div class="tab-panel" v-if="isActiveTab(3)">
        <Fletching v-if="ge_loading==false"></Fletching>
        <div v-else>Loading GE data...</div>
      </div>
      <div class="tab-panel" v-if="isActiveTab(4)">
        <BoilerplateTable v-if="ge_loading==false"></BoilerplateTable>
        <div v-else>Loading GE data...</div>
      </div>
    </div>
  </div>
</template>

<script>
import Money from "./components/money/Money";
import Crafting from "./components/crafting/Crafting";
import Herblore from "./components/herblore/Herblore";
import Fletching from "./components/fletching/Fletching";
import BoilerplateTable from "./components/BoilerplateTable";
import Vuex from "vuex";

export default {
  name: "App",
  components: {
    Money,
    Crafting,
    Herblore,
    Fletching,
    BoilerplateTable
  },
  computed: Vuex.mapState([
    "ge_loading",
    "ge_icons_loading",
    "ge_limits_loading"
  ]),
  data: function() {
    return {
      activeTab: 0
    };
  },
  methods: {
    isActiveTab(id) {
      return this.activeTab === id;
    }
  },
  mounted() {
    this.$store.dispatch("GET_GE");
    this.$store.dispatch("GET_GE_ICONS");
    this.$store.dispatch("GET_GE_LIMITS");
  }
};
</script>

<style>
@import "../node_modules/ag-grid-community/dist/styles/ag-grid.css";
@import "../node_modules/ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
@import "../node_modules/ag-grid-community/dist/styles/ag-theme-balham-dark.css";
@import "../node_modules/bulma/css/bulma.css";

html,
body,
.outer-div,
.tab-panel {
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  margin: 0;
  background-color: #181d1f;
}

.tab-panels {
  width: 100%;
  height: 95%;
  padding-left: 5%;
  padding-right: 5%;
  margin: 0 !important;
}

.tabs {
  margin-bottom: 0 !important;
  height: 5%;
}

.tabs ul {
  border-bottom-width: 0;
}

li.is-active a {
  color: white !important;
}

li a {
  color: gray !important;
}

.ag-header-cell-label {
  flex: 0.5 1 auto !important;
}

.table-div {
  max-width: 700px;
  margin: auto;
}
</style>

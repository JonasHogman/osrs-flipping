import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ge_json: {},
    ge_loading: true,
    ge_icons: {},
    ge_icons_loading: true,
    ge_limits: {},
    ge_limits_loading: true,
  },
  getters: {
    ge_json: (state) => {
      return state.ge_json;
    },
    ge_icons: (state) => {
      return state.ge_icons;
    },
    ge_limits: (state) => {
      return state.ge_limits;
    },
  },
  mutations: {
    SET_GE(state, ge_json) {
      state.ge_json = ge_json;
    },
    SET_GE_LOADING(state, loading) {
      state.ge_loading = loading;
    },
    SET_GE_ICONS(state, icons_json) {
      state.ge_icons = icons_json;
    },
    SET_GE_ICONS_LOADING(state, loading) {
      state.ge_icons_loading = loading;
    },
    SET_GE_LIMITS(state, limits_json) {
      state.ge_limits = limits_json;
    },
    SET_GE_LIMITS_LOADING(state, loading) {
      state.ge_limits_loading = loading;
    },
  },
  actions: {
    GET_GE({ commit }) {
      axios
        .get("https://storage.googleapis.com/osb-exchange/summary.json")
        .then((result) => {
          commit("SET_GE", result.data);
          commit("SET_GE_LOADING", false);
        })
        .catch((error) => {
          throw new Error(`API ${error}`);
        });
    },
    GET_GE_ICONS({ commit }) {
      axios
        .get("../assets/base64/icons-items-complete-filtered.json")
        .then((result) => {
          commit("SET_GE_ICONS", result.data);
          commit("SET_GE_ICONS_LOADING", false);
        })
        .catch((error) => {
          throw new Error(`API ${error}`);
        });
    },

    GET_GE_LIMITS({ commit }) {
      axios
        .get("../ge-limits-ids.json")
        .then((result) => {
          commit("SET_GE_LIMITS", result.data);
          commit("SET_GE_LIMITS_LOADING", false);
        })
        .catch((error) => {
          throw new Error(`API ${error}`);
        });
    },
  },
});

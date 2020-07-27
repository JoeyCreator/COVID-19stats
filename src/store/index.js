import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import moment from "moment";

Vue.use(Vuex);

// const stateAPI = 'https://covidtracking.com/api/v1/states/info.json';
const usAPI = "https://pomber.github.io/covid19/timeseries.json";

export default new Vuex.Store({
  state: {
    data: [],
    loading: true,
    dates: [],
    confirmed: [],
    deaths: [],
    recovered: [],
    navDrawerOpen: false,
    lastRecovered: 0,
    lastConfirmed: 0,
    lastDeaths: 0
  },
  mutations: {
    SET_DATES(state, dates) {
      for (let i = 0; i < dates.length; i++) {
        state.dates.push(
          moment(dates[i].date, "YYYY-M-D").format("MMM D, YYYY")
        );
      }
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    MAP_DATA_CONFIRMED(state, data) {
      for (let i = 0; i < data.length; i++) {
        state.confirmed.push(data[i].confirmed);
      }
    },
    MAP_DATA_DEATHS(state, data) {
      for (let i = 0; i < data.length; i++) {
        state.deaths.push(data[i].deaths);
      }
    },
    MAP_DATA_RECOVERED(state, data) {
      for (let i = 0; i < data.length; i++) {
        state.recovered.push(data[i].recovered);
      }
    },
    SET_LAST_RECOVERED(state, data) {
      state.lastRecovered = data;
    }
  },
  actions: {
    getData({ commit }) {
      commit("SET_LOADING", true);
      axios
        .get(usAPI)
        .then(response => {
          commit("SET_DATES", response.data["US"]);
          commit("MAP_DATA_CONFIRMED", response.data["US"]);
          commit("MAP_DATA_DEATHS", response.data["US"]);
          commit("MAP_DATA_RECOVERED", response.data["US"]);
          commit("SET_LAST_RECOVERED", response.data["US"]);
          commit("SET_LOADING", false);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  getters: {
    startDate(state) {
      return state.dates[0];
    },
    endDate() {
      return moment().format("MMM D, YYYY");
    },
    viewportWidth() {
      return window.innerWidth;
    },
    getDates(state) {
      return state.dates;
    },
    getConfirmed(state) {
      return state.confirmed;
    },
    getDeaths(state) {
      return state.deaths;
    },
    getRecovered(state) {
      return state.recovered;
    },
    getLastRecovered(state) {
      return state.lastRecovered;
    }
  }
});

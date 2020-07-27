<template>
  <div>
    <section class="hero text-center">
      <h1 class="display-1 text-white">Welcome</h1>
      <h6 class="title text-white">
        <span style="font-weight: bold;">COVID-19 Health</span> is dedicated to providing public data on COVID-19 in the US in a simple and easy to access way.
      </h6>
    </section>
    <transition name="fadeUp" mode="out-in">
      <main class="main" v-if="gotData && !$store.state.loading">
        <div class="columns cards">
          <div class="column">
            <router-link to="/recovered" class="card card--info flex flex-row align-center">
              <div class="card--icon text-success">
                <i class="uil uil-smile-beam"></i>
              </div>
              <div class="card--text">
                <h3 class="display-1 text-center">{{ totalRecovered }}</h3>
                <h6 class="overline">Recovered Cases</h6>
              </div>
              <i class="uil uil-info-circle helper"></i>
            </router-link>
          </div>
          <div class="column">
            <router-link to="/confirmed" class="card card--info flex flex-row align-center">
              <div class="card--icon text-warning">
                <i class="uil uil-sad"></i>
              </div>
              <div class="card--text">
                <h3 class="display-1 text-center">{{ totalConfirmed }}</h3>
                <h6 class="overline">Confirmed Cases</h6>
              </div>
              <i class="uil uil-info-circle helper"></i>
            </router-link>
          </div>
          <div class="column">
            <router-link to="/deaths" class="card card--info flex flex-row align-center">
              <div class="card--icon text-danger">
                <i class="uil uil-sad-dizzy"></i>
              </div>
              <div class="card--text">
                <h3 class="display-1 text-center">{{ totalDeaths }}</h3>
                <h6 class="overline">Deaths</h6>
              </div>
              <i class="uil uil-info-circle helper"></i>
            </router-link>
          </div>
        </div>
        <div class="columns graphs">
          <div class="column">
            <div class="card">
              <h4 class="text-center text-dark mb-x">COVID-19 in the United States</h4>
              <h5
                class="subtitle text-center"
              >{{ $store.getters.startDate }} - {{ $store.getters.endDate }}</h5>
              <apexchart
                id="pie"
                type="donut"
                :height="viewportWidth < 600 ? chartBreakpoints.mobile : chartBreakpoints.desktop"
                :options="optionsPie"
                :series="seriesPie"
              ></apexchart>
            </div>
          </div>
          <div class="column">
            <div class="card">
              <h4 class="text-center text-dark mb-x">COVID-19 in the United States</h4>
              <h5
                class="subtitle text-center"
              >{{ $store.getters.startDate }} - {{ $store.getters.endDate }}</h5>
              <apexchart
                id="line"
                type="line"
                :height="viewportWidth < 600 ? chartBreakpoints.mobile : chartBreakpoints.desktop"
                :options="optionsLine"
                :series="seriesLine"
              ></apexchart>
            </div>
          </div>
        </div>
      </main>
    </transition>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import numeral from "numeral";

export default {
  name: "Dashboard",
  components: {
    apexchart: VueApexCharts
  },
  data: function() {
    return {
      gotData: false,
      optionsLine: {
        colors: ["#2dca73", "#FFBE11", "#E84762"],
        chart: {
          id: "line",
          toolbar: {
            show: false
          }
        },
        xaxis: {
          categories: []
        },
        dataLabels: {
          enabled: false
        }
      },
      seriesLine: [
        {
          name: "Recovered",
          data: []
        },
        {
          name: "Confirmed",
          data: []
        },
        {
          name: "Deaths",
          data: []
        }
      ],
      optionsPie: {
        colors: ["#2dca73", "#FFBE11", "#E84762"],
        chart: {
          id: "pie",
          toolbar: {
            show: false
          }
        },
        labels: ["Recovered", "Confirmed", "Dearths"],
        legend: {
          position: "bottom"
        }
      },
      seriesPie: [],
      chartBreakpoints: {
        mobile: 200,
        desktop: 400
      }
    };
  },
  computed: {
    dates: function() {
      return this.$store.getters.getDates;
    },
    seriesDataRecovered: function() {
      return this.$store.getters.getRecovered;
    },
    seriesDataConfirmed: function() {
      return this.$store.getters.getConfirmed;
    },
    seriesDataDeaths: function() {
      return this.$store.getters.getDeaths;
    },
    totalRecovered: function() {
      return numeral(
        this.$store.getters.getRecovered[
          this.$store.getters.getRecovered.length - 1
        ]
      ).format(0, 0);
    },
    totalConfirmed: function() {
      return numeral(
        this.$store.getters.getConfirmed[
          this.$store.getters.getConfirmed.length - 1
        ]
      ).format(0, 0);
    },
    totalDeaths: function() {
      return numeral(
        this.$store.getters.getDeaths[this.$store.getters.getDeaths.length - 1]
      ).format(0, 0);
    },
    viewportWidth: function() {
      return window.innerWidth;
    },
    lastRecovered: function() {
      return this.$store.getters.getLastRecovered;
    }
  },
  beforeMount() {
    this.optionsLine.xaxis.categories = this.dates;
    this.seriesLine[0].data = this.seriesDataRecovered;
    this.seriesLine[1].data = this.seriesDataConfirmed;
    this.seriesLine[2].data = this.seriesDataDeaths;

    this.seriesPie.push(
      this.$store.getters.getRecovered[
        this.$store.getters.getRecovered.length - 1
      ],
      this.$store.getters.getConfirmed[
        this.$store.getters.getConfirmed.length - 1
      ],
      this.$store.getters.getDeaths[this.$store.getters.getDeaths.length - 1]
    );
  },
  mounted() {
    this.gotData = true;
  }
};
</script>
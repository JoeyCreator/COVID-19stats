<template>
  <div>
    <section class="hero text-center">
      <h1 class="display-1 text-white">{{ totalConfirmed }}</h1>
      <h6 class="overline text-white">Total Confirmed COVID-19 Cases in the US</h6>
    </section>
    <main class="main">
      <div class="card">
        <h4 class="text-center text-dark mb-x">Confirmed COVID-19 Cases in the United States</h4>
        <h5
          class="subtitle text-center"
        >{{ $store.getters.startDate }} - {{ $store.getters.endDate }}</h5>
        <apexchart
          v-if="gotData"
          type="line"
          :height="$store.getters.viewportWidth < 600 ? chartBreakpoints.mobile : chartBreakpoints.desktop"
          :options="options"
          :series="series"
        ></apexchart>
      </div>
    </main>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import numeral from "numeral";

export default {
  name: "Confirmed",
  components: {
    apexchart: VueApexCharts
  },
  data: function() {
    return {
      gotData: false,
      options: {
        colors: ["#FFBE11"],
        chart: {
          id: "vuechart-example",
          toolbar: {
            show: false
          }
        },
        xaxis: {
          categories: []
        }
      },
      series: [
        {
          name: "Confirmed",
          data: []
        }
      ],
      chartBreakpoints: {
        mobile: 250,
        desktop: 500
      }
    };
  },
  computed: {
    dates: function() {
      return this.$store.getters.getDates;
    },
    seriesData: function() {
      return this.$store.getters.getConfirmed;
    },
    totalConfirmed: function() {
      return numeral(
        this.$store.getters.getConfirmed[
          this.$store.getters.getConfirmed.length - 1
        ]
      ).format(0, 0);
    }
  },
  mounted() {
    this.options.xaxis.categories = this.dates;
    this.series[0].data = this.seriesData;
    this.gotData = true;
  }
};
</script>
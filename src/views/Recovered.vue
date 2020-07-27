<template>
  <div>
    <section class="hero text-center">
      <h1 class="display-1 text-white">{{ total }}</h1>
      <h6 class="overline text-white">Total Recovered COVID-19 Cases in the US</h6>
    </section>
    <main class="main">
      <div class="card">
        <h4 class="text-center text-dark mb-x">Recovered COVID-19 Cases in the United States</h4>
        <h5
          class="subtitle text-center"
        >{{ $store.getters.startDate }} - {{ $store.getters.endDate }}</h5>
        <apexchart
          v-if="gotData"
          type="line"
          :height="viewportWidth < 600 ? chartBreakpoints.mobile : chartBreakpoints.desktop"
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
  name: "Recovered",
  components: {
    apexchart: VueApexCharts
  },
  data: function() {
    return {
      gotData: false,
      options: {
        colors: ["#2dca73"],
        chart: {
          id: "vuechart",
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
      series: [
        {
          name: "Recovered",
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
    seriesDataRecovered: function() {
      return this.$store.getters.getRecovered;
    },
    total: function() {
      return numeral(
        this.$store.getters.getRecovered[
          this.$store.getters.getRecovered.length - 1
        ]
      ).format(0, 0);
    },
    viewportWidth: function() {
      return window.innerWidth;
    }
  },
  mounted() {
    this.options.xaxis.categories = this.dates;
    this.series[0].data = this.seriesDataRecovered;
    this.gotData = true;
  }
};
</script>
<template>
  <div class="page-root">
    <Counter @customEvent="customClick" />
    <div class="chart-wrapper">
      <VueApexCharts
        width="500"
        type="bar"
        :options="options"
        :series="series"
      />
      <VueApexCharts
        width="500"
        type="line"
        :options="options"
        :series="series"
      />
      <VueApexCharts
        width="500"
        type="pie"
        :options="pieOptions"
        :series="seriesPie"
      />
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'
import Counter from '../components/counter.vue'

export default {
  name: 'index',
  components: {
    VueApexCharts,
    Counter,
  },
  setup() {
    const customClick = (val) => {
      console.log('custom', val)
    }
    return {
      customClick,
      options: {
        legend: {
          show: true,
        },
        chart: {
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 2021],
        },
      },
      series: [
        {
          name: 'series-1',
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
      ],
      seriesPie: [44, 55, 41, 17, 15],
      pieOptions: {
        labels: ['Apple', 'Mango', 'Orange', 'Watermelon', 'io'],
      },
    }
  },
}
</script>

<style scoped>
.chart-wrapper {
  display: flex;
  justify-content: center;
}
</style>

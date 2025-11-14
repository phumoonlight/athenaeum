<template>
  <div class="page-root">
    <Counter @customEvent="customClick">
      <template #me>content</template>
    </Counter>
    <div class="chart-wrapper">
      <VueApexCharts
        width="500"
        type="bar"
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
    <LineAreaChart />
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'
import Counter from '../components/counter.vue'
import LineAreaChart from '../components/LineAreaChart.vue'

export default {
  name: 'index',
  components: {
    VueApexCharts,
    Counter,
    LineAreaChart,
  },
  setup() {
    const customClick = (val) => {
      console.log('custom', val)
    }
    return {
      customClick,
      options: {
        dataLabels: {
          enabled: false,
        },
        fill: {
          color: 'red',
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 90, 100],
          },
        },
        stroke: {
          curve: 'straight',
          colors: ['blue'],
          width: 2,
        },
        markers: {
          size: 3,
          colors: '#fff',
          strokeColors: 'blue',
          strokeWidth: 2,
        },
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

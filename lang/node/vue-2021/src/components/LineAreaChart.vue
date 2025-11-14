<template>
  <div class="component-root">
    <VueApexCharts
      width="500"
      type="area"
      :options="options"
      :series="series"
    />
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'

export default {
  name: 'LineAreaChart',
  components: {
    VueApexCharts,
  },
  setup() {
    return {
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
          // categories: [1991, 1, 1993, 1994, 1995, 1996, 1997, 2021, 2022, 2023],
          type: 'datetime',
        },
      },
      series: [
        {
          name: 'series-1',
          data: [30, 40, 45, 50, 49, 60, 70, 91, 2, 2, 24, 5, 55, 645],
        },
      ],
    }
  },
}
</script>

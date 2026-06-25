<template>
  <div class="root">
    <AppTitle />
    <div class="container">
      <GroupStats
        :confirmed="todayStats.Confirmed"
        :hospitalized="todayStats.Hospitalized"
        :recovered="todayStats.Recovered"
        :deaths="todayStats.Deaths"
      />
      <AppFooter :updateDate="todayStats.UpdateDate" />
    </div>
  </div>
</template>

<script>
import AppTitle from '../src/components/AppTitle.vue'
import GroupStats from '../src/components/GroupStats.vue'
import AppFooter from '../src/components/AppFooter.vue'
import getStats from '../src/libs/getStats'

export default {
  components: {
    AppTitle,
    GroupStats,
    AppFooter,
  },
  data: () => ({
    todayStats: {},
  }),
  async mounted() {
    const stats = await getStats()
    this.$data.todayStats = stats.todayStats
  },
}
</script>

<style scoped>
  .container {
    margin-left: 150px;
    margin-right: 150px;
    text-align: center;
  }

  @media only screen and (max-width: 600px) {
    .container {
      margin-left: 100px;
      margin-right: 100px;
    }
  }

  @media only screen and (max-width: 426px) {
    .container {
      margin-left: 10px;
      margin-right: 10px;
    }
  }

  .topic-title {
    text-align: center;
    font-size: 25px;
    font-weight: bold;
  }

  .display-card {
    display: inline-block;
    width: 250px;
    margin: 10px;
  }
</style>

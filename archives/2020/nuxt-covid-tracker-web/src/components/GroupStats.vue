<template>
  <div class="root">
    <div class="topic-label">{{ topicLabel }}</div>
    <ElementCard shadow="always" class="display-card">
      <div class="label">Confirmed</div>
      <div class="number confirmed">{{ confirmed }}</div>
    </ElementCard>
    <ElementCard shadow="always" class="display-card">
      <div class="label">Hospitalized</div>
      <div class="number hospitalized">{{ hospitalized }}</div>
    </ElementCard>
    <ElementCard shadow="always" class="display-card">
      <div class="label">Recovered</div>
      <div class="number recovered">{{ recovered }}</div>
    </ElementCard>
    <ElementCard shadow="always" class="display-card">
      <div class="label">Deaths</div>
      <div class="number deaths">{{ deaths }}</div>
    </ElementCard>
  </div>
</template>

<script>
import element from 'element-ui'

export default {
  props: {
    topicLabel: String,
    confirmed: Number,
    hospitalized: Number,
    recovered: Number,
    deaths: Number,
  },
  components: {
    ElementCard: element.Card,
  },
}
</script>

<style scoped>
  .topic-label {
    text-align: center;
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .display-card {
    display: inline-block;
    width: 225px;
    margin: 10px;
  }

  .label {
    font-weight: bold;
  }

  .number {
    margin: 25px;
    font-weight: bold;
    font-size: 40px;
  }

  .number.confirmed {
    color: rgb(255, 145, 0);
  }

  .number.hospitalized {
    color: rgb(0, 80, 255);
  }

  .number.recovered {
    color: rgb(0, 165, 75);
  }

  .number.deaths {
    color: rgb(255, 25, 0);
  }
</style>

<template>
  <footer class="root">
    <Card>
      <div class="date">Latest update : {{ updateDate }}</div>
      <ButtonGroup>
        <Button
          type="danger"
          icon="el-icon-info"
          v-on:click="onClickApi"
        >
          API Source
        </Button>
        <Button
          type="info"
          icon="el-icon-star-on"
          v-on:click="onClickGithub"
        >
          GitHub
        </Button>
      </ButtonGroup>
    </Card>
  </footer>
</template>

<script>
import element from 'element-ui'

export default {
  props: {
    updateDate: String,
  },
  components: {
    Card: element.Card,
    ButtonGroup: element.ButtonGroup,
    Button: element.Button,
  },
  methods: {
    onClickApi: () => window.open('https://covid19.th-stat.com/th/api'),
    onClickGithub: () => window.open('https://github.com/phumoonlight/nuxt-covid-tracker-th'),
  },
}
</script>

<style scoped>
  .root {
    text-align: center;
    margin-top: 75px;
    margin-bottom: 25px;
    margin-left: 100px;
    margin-right: 100px;
  }

  @media screen and (max-width: 769px) {
    .root {
      margin-left: 50px;
      margin-right: 50px;
    }
  }

  @media screen and (max-width: 376px) {
    .root {
      margin-left: 25px;
      margin-right: 25px;
    }
  }

  @media screen and (max-width: 321px) {
    .root {
      margin-left: -10px;
      margin-right: -10px;
    }
  }

  .date {
    margin: 15px;
    font-weight: bold;
  }
</style>

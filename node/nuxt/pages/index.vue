<template>
  <div>
    Hello World! {{ name }}
    <el-button type="primary">Primary</el-button>
  </div>
</template>

<script>
import { Button } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

export default {
  asyncData() {
    return {
      name: 'phumo'
    }
  },
  components: {
    [Button.name]: Button
  }
}
</script>
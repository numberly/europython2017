<template>
  <div>
    <h1>Home</h1>
    <div style="margin-top:100px">
      <router-link to="/stats">
        <el-button type="primary">Show stats</el-button>
      </router-link>
      <router-link to="/register">
        <el-button type="primary">Let's play !</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<style scoped>
</style>

<template>
  <div class="stats_container">
    <el-row :gutter="20">
      <el-col :span="12" :xs="24">
        <ScoreCard title="Global Top"></ScoreCard>
      </el-col>
      <el-col :span="12" :xs="24">
        <ScoreCard title="Today's Top" :datetime="currentDate()"></ScoreCard>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import moment from 'moment'

import ScoreCard from '@/components/ScoreCard'

export default {
  name: 'stats',
  components: {
    ScoreCard
  },
  methods: {
    currentDate () {
      return moment().format('YYYY-MM-DD')
    }
  }
}
</script>

<style>
.stats_container {
  max-width: 1480px;
  padding: 20px;
  margin: 0 auto;
  margin-top: 100px;
}
</style>

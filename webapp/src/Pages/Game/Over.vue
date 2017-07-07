<template>
  <div>
    <div style="text-align:right;margin: 20px;">
      <router-link to="/register">
        <el-button type="primary">
          <i class="material-icons" style="font-size: 16px;line-height: 16px;vertical-align: middle;">&#xE879;</i>
          play again !</el-button>
      </router-link>
    </div>
    <h1>Game Over !</h1>
    <div class="scoring-3">
      <div class="scoring-2">
        <div class="scoring-1">
          <h3>{{todayScore()}}</h3>
          <span>points</span>
        </div>
      </div>
    </div>
    <h4 style="font-size:24px">
      {{scoring}}<br />
      {{tomorrow}}
    </h4>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'over',
  data () {
    return {
      user: this.$store.getters.getUser,
      loading: true
    }
  },
  computed: {
    currentDate () {
      return moment().format('YYYY-MM-DD')
    },
    scoring () {
      let score = this.todayScore()

      if (score > 25) {
        return 'Woaaaahhh got a pretty nice score !'
      } else if (score > 18) {
        return 'Not bad :) !'
      } else if (score > 10) {
        return 'You\'re having a good day !'
      } else if (score > 5) {
        return 'Well played, ' + this.user.name
      } else {
        return 'Not bad, ' + this.user.name
      }
    },
    tomorrow () {
      return 'See you tomorrow to beat your score !'
    }
  },
  methods: {
    bestScore: function () {

    },
    todayScore () {
      if (this.user.scores) {
        return this.user.scores[this.currentDate]
      }
      return 0
    }
  },
  mounted () {
    this.$store.dispatch('getUser', {
      email: this.user.email
    }).then((json) => {
      if (json) {
        this.user = json
      }
      this.loading = false
    })
  }
}
</script>

<style scoped>
.scoring-1, .scoring-2, .scoring-3 {
  margin: 10px;
  background-color: white;
  border-radius: 50%;
  display: inline-block;
}

.scoring-3 {
  margin: 10px;
  background-color: rgba(255, 255, 255, 0.3)
}

.scoring-2 {
  margin: 10px;
  background-color: rgba(255, 255, 255, 0.5)
}

.scoring-1 {
  width: 140px;
  height: 140px;
}

.scoring-1 h3 {
  color: #ec4d7b;
  font-weight: 400;
  font-size: 72px;
  line-height: 80px;
  margin: 20px 0 0 0;
}
</style>

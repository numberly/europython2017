<template>
  <div>
    <!-- PART 1 : COUNTER -->
    <Counter :counter="counter" v-show="counter.value" v-if="!over"></Counter>
    <!-- PART 2 : QUIZZ  -->
    <div class="quiz_container" v-if="!over && quiz.length > 0 && timeout > 0">
      <div class="quiz_timer" v-show="!counter.value">
        <div style="float:right;font-size:14px;width:60px;text-align:right;color:white">
          {{Math.ceil(timeout)}}s
          <i class="material-icons" style="vertical-align:middle;font-size:18px">&#xE425;</i>
        </div>
        <el-progress
          :stroke-width="10"
          style="padding-top:5px;"
          :percentage="timeout / maxTimeout * 100"
          :show-text="false">
        </el-progress>
      </div>

      <div class="quiz" v-bind:class="{active: !counter.value}">
        <Quiz
          :callback="nextQuestion"
          :question="quiz[idQuestion].text"
          :answers="quiz[idQuestion].answers">
        </Quiz>
      </div>
      <Distractor :counter="idQuestion"></Distractor>
    </div>
    <!-- PART 3 : GAME OVER SCREEN -->
    <Over v-if="over"></Over>
    <!-- PART 4 : USER STATS SCREEN -->
  </div>
</template>

<script>
import moment from 'moment'

import Counter from './Counter'
import Quiz from './Quiz'
import Over from './Over'
import Distractor from '@/components/Distractor'
import config from '@/config'

export default {
  name: 'game',
  components: {
    Counter,
    Quiz,
    Over,
    Distractor
  },
  beforeCreate () {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push({name: 'Register'})
    }
  },
  data () {
    return {
      timeout: config.DEFAULT_TIMEOUT,
      maxTimeout: config.DEFAULT_TIMEOUT,
      counter: {value: true},
      over: false,
      idQuestion: 0,
      quiz: this.$store.getters.getQuiz
    }
  },
  methods: {
    sendAnswer (answer) {
      this.$store.dispatch('sendAnswer', {
        question: this.quiz[this.idQuestion],
        userId: this.$store.getters.getUser.id,
        answer: answer
      })
    },
    nextQuestion (answer) {
      this.sendAnswer(answer)
      if (this.idQuestion < this.quiz.length - 1) {
        this.idQuestion += 1
        this.timeout += config.RESPONSE_BONUS
        if (this.timeout > this.maxTimeout) {
          this.timeout = this.maxTimeout
        }
      } else {
        this.over = true
      }
    }
  },
  mounted () {
    // Redirect user if already played today
    const currentTime = moment().format('YYYY-MM-DD')
    let user = this.$store.getters.getUser
    if (user.scores && user.scores.hasOwnProperty(currentTime)) {
      this.over = true
    }

    // Prepare timer decrease
    var $this = this
    function timerDecrease () {
      setTimeout(function () {
        if ($this.timeout > 0) {
          $this.timeout -= 0.01
          timerDecrease()
        } else {
          $this.over = true
        }
      }, 10)
    }
    timerDecrease()

    // Support switch tab
    var t = new Date()
    window.addEventListener('focus', function () {
      let n = new Date()
      $this.timeout -= (n - t) / 1000
    }, false)

    window.addEventListener('blur', function () {
      t = new Date()
    }, false)
  }
}
</script>

<style scoped>
.quiz_timer {
  border-radius: 0 0 5px 5px;
  height:20px;
  padding: 15px 20px;
}
.quiz {
  opacity: 0;
  max-width: 920px;
  margin: 0 auto;
  border-radius: 5px;
  transition: all 0.3s ease-out;
  padding-bottom: 20px;
}
.quiz.active {
  opacity: 1;
}
.quiz_container {
  padding: 0 30px;
}
</style>

<template>
  <div>
    <h1 class="quiz_title" style="">{{question}}</h1>
    <div class="quiz_wrapper">
      <el-row :gutter="20">
        <el-col
          :span="12"
          :xs="24"
          v-bind:key="index"
          v-for="(answer, index) in answers">
          <div class="quiz-btn_wrapper">
            <el-button type="default" @click="callback(index)">
              {{answer}}
            </el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'quiz',
  props: {
    question: String,
    answers: Array,
    callback: Function
  }
}
</script>

<style>
.quiz_wrapper {
  margin: 20px 30px 0;
}

.quiz-btn_wrapper {
  padding: 30px;
}

.quiz_title {
  color:#fff;
  padding:0 50px;
  font-size: 3.4rem;
  text-align:left;
  min-height: 140px;
  margin: 20px 0;
}


.quiz-btn_wrapper button,
.quiz-btn_wrapper button:focus,
.quiz-btn_wrapper button:hover {
  width: 100%;
  min-height: 80px;
  line-height: 24px;
  font-size: 18px;
  border:0;
  background: rgba(255,255,255,0.1);
  color:white;
  font-size:22px;
  white-space: inherit;
  word-break: break-all;
}

@media all and (orientation:portrait) {
  .el-col-12 {
    width: 100%;
  }

  .quiz-btn_wrapper button, .quiz-btn_wrapper button:focus, .quiz-btn_wrapper button:hover {
    font-size: 26px;
  }
}
</style>

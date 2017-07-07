<template>
  <div>
    <h1 class="quizz_title" style="">{{question}}</h1>
    <div class="quizz_wrapper">
      <el-row :gutter="20">
        <el-col
          :span="12"
          :xs="24"
          v-bind:key="index"
          v-for="(answer, index) in answers">
          <div class="quizz-btn_wrapper">
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
  name: 'quizz',
  props: {
    question: String,
    answers: Array,
    callback: Function
  }
}
</script>

<style>
.quizz_wrapper {
  margin: 40px 30px 0;
}

.quizz-btn_wrapper {
  padding: 30px;
}

.quizz_title {
  color:#fff;
  padding:0 50px;
  font-size: 3.4rem;
  text-align:left;
  max-width:80%;
  min-height: 140px;
}


.quizz-btn_wrapper button,
.quizz-btn_wrapper button:focus,
.quizz-btn_wrapper button:hover {
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
</style>

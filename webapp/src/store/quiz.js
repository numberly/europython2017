import Vue from 'vue'
import config from '@/config'

const QUIZZ = 'QUIZZ'
const QUIZZ_SUCCESS = 'QUIZZ_SUCCESS'
const QUIZZ_FAILED = 'QUIZZ_FAILED'

const moduleQuiz = {
  state: {
    quiz: []
  },
  mutations: {
    [QUIZZ] (state) {
      state.quizPending = true
    },
    [QUIZZ_SUCCESS] (state, quiz) {
      state.quizPending = false
      for (var i = 0; i < quiz.length; i++) {
        state.quiz.push(quiz[i])
      }
    },
    [QUIZZ_FAILED] (state) {
      state.quizPending = false
    }
  },
  actions: {
    getQuiz ({ commit }, creds) {
      commit(QUIZZ)
      const url = config.API_URL + '/questions'
      return Vue.http.get(url)
        .then(response => response.json())
        .then(json => {
          commit(QUIZZ_SUCCESS, json)
          return json
        }).catch(() => {
          commit(QUIZZ_FAILED)
        })
    },
    sendAnswer ({ commit }, {question, answer, userId}) {
      const url = config.API_URL + '/questions/' + question.id
      return Vue.http.post(url, {
        user_id: userId,
        answer: answer
      })
    }
  },
  getters: {
    getQuiz: state => {
      return state.quiz
    }
  }
}

export default moduleQuiz

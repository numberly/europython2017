import Vue from 'vue'
import config from '@/config'

const QUIZZ = 'QUIZZ'
const QUIZZ_SUCCESS = 'QUIZZ_SUCCESS'
const QUIZZ_FAILED = 'QUIZZ_FAILED'

const moduleQuizz = {
  state: {
    quizz: []
  },
  mutations: {
    [QUIZZ] (state) {
      state.quizzPending = true
    },
    [QUIZZ_SUCCESS] (state, quizz) {
      console.log('Quizz in mutation: ', quizz)
      state.quizzPending = false
      for (var i = 0; i < quizz.length; i++) {
        state.quizz.push(quizz[i])
      }
    },
    [QUIZZ_FAILED] (state) {
      state.quizzPending = false
    }
  },
  actions: {
    getQuizz ({ commit }, creds) {
      commit(QUIZZ)
      const url = config.API_URL + '/questions'
      return Vue.http.get(url)
        .then(response => response.json())
        .then(json => {
          console.log('Quizz response: ', json)
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
    getQuizz: state => {
      return state.quizz
    }
  }
}

export default moduleQuizz

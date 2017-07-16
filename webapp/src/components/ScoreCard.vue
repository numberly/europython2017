<template>
  <div class="card">
    <h2 class="card-header">
      {{title}}
    </h2>
    <div>
      <UserScore
        v-for="user in users"
        v-bind:key="user.id"
        v-bind:datetime="datetime"
        v-bind:user="user">
      </UserScore>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import config from '@/config'

import UserScore from './UserScore'

export default {
  name: 'score-card',
  components: {
    UserScore
  },
  data () {
    return {
      users: []
      // users: [
      //   {
      //     'id': '1def3263216ea165f7caaf69ebe9f4ff',
      //     'cool': true,
      //     'email': 'emre.yilmaz@metglobal.com',
      //     'name': 'Yunus emre yilmaz',
      //     'country': 'Turkey',
      //     'scores': {
      //       '2017-07-10': 4,
      //       '2017-07-11': 11,
      //       '2017-07-12': 23,
      //       '2017-07-13': 35
      //     },
      //     'total_score': ''
      //   },
      //   {
      //     'id': 'b7883a985f3d04cd64837abdf8a9cd02',
      //     'cool': false,
      //     'email': 'dincelumit@gmail.com',
      //     'name': 'Umit',
      //     'country': 'Turkey',
      //     'scores': {
      //       '2017-07-10': 8,
      //       '2017-07-11': 7,
      //       '2017-07-12': 10,
      //       '2017-07-13': 30
      //     },
      //     'total_score': ''
      //   },
      //   {
      //     'id': 'a4521b2b186593d74e27ff6e23eb2696',
      //     'cool': true,
      //     'email': 'krother@academis.eu',
      //     'name': 'Kristian',
      //     'country': 'Germany',
      //     'scores': {
      //       '2017-07-12': 1,
      //       '2017-07-13': 26
      //     },
      //     'total_score': ''
      //   },
      //   {
      //     'id': 'cd2341319944fff2b7c29527b5d98187',
      //     'cool': false,
      //     'email': 'moreno.mazzocchetti@gmail.com',
      //     'name': 'Moreno',
      //     'country': 'Italy',
      //     'scores': {
      //       '2017-07-11': 2,
      //       '2017-07-12': 10,
      //       '2017-07-13': 21
      //     },
      //     'total_score': ''
      //   }
      // ]
      //
    }
  },
  props: {
    title: String,
    datetime: String
  },
  methods: {
    fetchStats () {
      let url = config.API_URL + '/scores'
      if (this.datetime) {
        url += '?date=' + this.datetime
      }
      Vue.http.get(url)
        .then(response => response.json())
        .then(json => {
          this.users = json
        })
    },
    cancelAutoUpdate () {
      clearInterval(this.timer)
    }
  },
  beforeDestroy () {
    this.cancelAutoUpdate()
  },
  created () {
    this.fetchStats()
    this.timer = setInterval(this.fetchStats, 1000)
  }
}
</script>

<style>
  .card {
    max-width: 400px;
    margin: 0 auto;
  }

  .card h2 {
    padding: 30px;
    background-color: rgba(255,255,255,0.2);
    border-radius: 3px;
  }

  .card .card-user {
    position: relative;
    text-align: left;
    padding: 20px 40px 20px 20px;
    background-color: rgba(255,255,255,0.95);
    border-radius: 3px;
    margin: 15px 0;
    box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;
  }

  .card-user_name {
    color: #c85976;
  }

  .card-user_score {
    float: right;
  }

  .card-user_score i.material-icons {
    vertical-align: text-bottom;
    font-size: 18px;
    display: none;
    position: absolute;
    top: 18px;
    right: 15px;
  }

  .card-user:nth-child(1) .card-user_score i.material-icons,
  .card-user:nth-child(2) .card-user_score i.material-icons,
  .card-user:nth-child(3) .card-user_score i.material-icons {
    display: inline-block;
  }

  .card-user:nth-child(1) i.material-icons,
  .card-user:nth-child(1) .card-user_name {
    color: #FB8C00;
  }

  .card-user:nth-child(2) i.material-icons,
  .card-user:nth-child(2) .card-user_name {
    color: #78909C;
  }

  .card-user:nth-child(3) i.material-icons,
  .card-user:nth-child(3) .card-user_name {
    color: #8D6E63;
  }


  .card-user_name {
    font-weight: 600;
  }
</style>

<template>
  <div class="card">
    <h2 class="card-header">
      {{title}}
    </h2>
    <div>
      <div v-for="user in users" class="card-user">
        <span class="card-user_name">
          {{user.name}}
        </span>
        <span class="card-user_score">
          {{getScore(user)}}
          <i class="material-icons">&#xE885;</i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'score-card',
  date () {
    return {
      users: []
    }
  },
  props: {
    title: String,
    datetime: String
  },
  methods: {
    getScore (user) {
      // Specific date
      if (this.datetime && this.datetime.length > 0) {
        return user[this.datetime]
      }

      // find biggest score
      return 1111
    }
  },
  beforeCreate () {
    this.users = [
      {
        'id': '98948b56841bc5ded022c5c1f9288da2',
        'cool': false,
        'email': 'clovss.mna@gmail.com',
        'name': 'JC',
        'country': 'France',
        'scores': {
          '2017-07-08': 90
        }
      },
      {
        'id': '98948b56841bc5ded022c5c1f9288da3',
        'cool': false,
        'email': 'clovss.mna@gmail.com',
        'name': 'Paul',
        'country': 'France',
        'scores': {
          '2017-07-08': 35
        }
      },
      {
        'id': '98948b56841bc5ded022c5c1f9288da4',
        'cool': false,
        'email': 'clovss.mna@gmail.com',
        'name': 'Clovis',
        'country': 'France',
        'scores': {
          '2017-07-08': 22
        }
      },
      {
        'id': '98948b56841bc5ded022c5c1f9288da5',
        'cool': false,
        'email': 'clovss.mna@gmail.com',
        'name': 'Remi',
        'country': 'France',
        'scores': {
          '2017-07-08': 13
        }
      },
      {
        'id': '98948b56841bc5ded022c5c1f9288da6',
        'cool': false,
        'email': 'clovss.mna@gmail.com',
        'name': 'Geoffrey',
        'country': 'France',
        'scores': {
          '2017-07-08': 4
        }
      }
    ]
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
    padding: 20px 30px 20px 40px;
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
    top: 20px;
    left: 15px;
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

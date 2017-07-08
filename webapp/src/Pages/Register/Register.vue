<template>
  <div class="register-wrapper">
    <div class="register-title"></div>
    <div class="register-content">
      <div class="register-content_inner">
        <div class="register-card">
          <h3 style="">
          {{greeting}}! <span style="margin-left:5px">Welcome Back</span>
          </h3>
          <div style="color:#999;text-align:center;margin-bottom:30px">
            Enter your detail below
          </div>

          <div v-if="!completeProfile">
            <el-form
              style="text-align:left"
              label-position="top"
              label-width="100px"
              :model="user">
              <el-form-item label="Email">
                <el-input v-model="user.email" type="email" min="3"></el-input>
              </el-form-item>
              <el-button
                type="primary"
                style="width:100%"
                @click="matchUser">
                Continue
              </el-button>
            </el-form>
          </div>

          <div v-if="completeProfile">
            <el-form
              label-position="top"
              label-width="100px"
              style="text-align:left"
              :model="user">
              <el-form-item>
                <el-input
                  v-model="user.name"
                  placeholder="Name..."
                  >
                </el-input>
              </el-form-item>
              <el-form-item>
                <countrySelect :user="user"></countrySelect>
              </el-form-item>
              <el-form-item>
                <el-checkbox v-model="user.cool">I'm cool !</el-checkbox>
              </el-form-item>
              <el-button
                type="primary"
                style="width:100%"
                @click="register">
                Register
              </el-button>
            </el-form>
          </div>
        </div>
      </div>
    </div>

    <div class="register-footer">
    </div>
  </div>
</template>

<script>
import countrySelect from '@/components/CountrySelect'

export default {
  name: 'register',
  components: {
    countrySelect
  },
  computed: {
    greeting () {
      let currentTime = new Date()
      let hours = currentTime.getHours()

      if (hours >= 5 && hours < 13) {
        return 'Good morning'
      } else if (hours >= 13 && hours < 18) {
        return 'Good afternon'
      } else {
        return 'Good evening'
      }
    }
  },
  methods: {
    matchUser: function () {
      this.error = null
      if (this.user.email.split('@').length !== 2) {
        this.$message.error('Email is not valid.')
        return
      }

      this.$store.dispatch('getUser', {
        email: this.user.email
      }).then((json) => {
        if (json) {
          this.$router.push({name: 'Game'})
        } else {
          this.completeProfile = true
        }
      })
    },
    register: function () {
      if (this.user.name.length < 1 ||
        this.user.country.length < 1) {
        this.$message.error('Please complete all form.')
        return
      }

      this.$store.dispatch('register', this.user
      ).then((json) => {
        // if (json) {
        this.$router.push({name: 'Game'})
        // }
      })
    }
  },
  data () {
    return {
      completeProfile: false,
      error: null,
      user: {
        email: '',
        country: '',
        name: '',
        cool: false
      }
    }
  }
}
</script>

<style>

.register-content_inner {
  align-self: center;
  display: inline-block;
  width:100%;
  padding-bottom:10px;
}

.register-card {
  max-width: 500px;
  position: relative;
  box-sizing: border-box;
  margin:0 auto 20px;
  border-radius: 8px;
  /*// border: 1px solid #E9448A;
  // border-image: linear-gradient(to right, #f50b9a 0%, #ff839d 100%);
  // border-image-slice: 1;
  // box-shadow: 0 1px 1px rgba(0,0,0,0.05);*/
}

.register-card h3 {
  margin:20px 0 10px;
  text-align:center;
  font-weight: 600;
  color: #555;
  font-size: 24px;
}

.register-card > .el-card__body {
  padding:0;
}

.register-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 50%;
  max-width: 800px;
  min-width: 700px;
  height: 100%;
  background-color: #fefefe;
}

.register-title {
	-webkit-box-ordinal-group: 1;
	-moz-box-ordinal-group: 1;
	box-ordinal-group: 1;

	-webkit-box-flex: 0;
	-moz-box-flex: 0;
	box-flex: 0;
}

.register-content {
  padding: 30px;

	-webkit-box-ordinal-group: 1;
	-moz-box-ordinal-group: 1;
	box-ordinal-group: 1;

	-webkit-box-flex: 1;
	-moz-box-flex: 1;
	box-flex: 1;

  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;


  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  /* align-items: center; */
  -webkit-box-flex: 1 auto;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;


  display: inline-flex;
  position: relative;
  justify-content: center;
}

.register-footer {
	-webkit-box-ordinal-group: 1;
	-moz-box-ordinal-group: 1;
	box-ordinal-group: 1;

	-webkit-box-flex: 0;
	-moz-box-flex: 0;
	box-flex: 0;

  text-align: center;
  padding: 30px 0;
}

</style>

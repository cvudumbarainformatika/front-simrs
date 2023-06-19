<template>
  <div class="box">
    <div
      class="square"
      style="--i:0;"
    />
    <div
      class="square"
      style="--i:1;"
    />
    <div
      class="square"
      style="--i:2;"
    />
    <div
      class="square"
      style="--i:3;"
    />
    <div
      class="square"
      style="--i:4;"
    />
    <div class="container">
      <div class="row q-pa-sm">
        <div
          class="col-6 bg-x min-h"
        >
          <div class="column flex-center full-height  text-white">
            <div class="text-subtitle1">
              Selamat Datang
            </div>
            <div class="text-subtitle">
              di Aplikasi
            </div>
            <div class="text-h5 q-mb-md">
              XENTER SIMRS
            </div>
            <q-img
              :src="img"
              spinner-color="white"
              style="max-width: 150px"
            />
            <div class="q-mt-md">
              silahkan Anda Login Terlebih dahulu
            </div>
          </div>
        </div>
        <div class="col-6 min-h">
          <div class="login-form full-height column flex-center text-white q-pa-lg">
            <div class="form q-mb-md">
              <div class="text-h6 judul-form">
                LOGIN FORM
              </div>
            </div>
            <div class="q-my-lg full-width">
              <q-form
                ref="myForm"
                class="q-pa-md"
                @submit="onSubmit"
              >
                <q-input
                  v-model="form.email"
                  color="white"
                  label="Username"
                  dark
                  :rules="[val => !!val || 'Harap diisi terlebih dahulu']"
                >
                  <template #label>
                    <!-- <span class="text-weight-bold text-deep-orange">You</span> -->
                    <span class="q-px-sm bg-deep-orange text-white text-italic rounded-borders">Username</span>
                  </template>
                  <template #prepend>
                    <q-icon name="icon-mat-person" />
                  </template>
                </q-input>
                <q-input
                  v-model="form.password"
                  color="white"
                  label="Password"
                  dark
                  :rules="[val => !!val || 'Harap diisi terlebih dahulu']"
                  :type="isPasw ? 'password' : 'text'"
                >
                  <template #label>
                    <!-- <span class="text-weight-bold text-deep-orange">You</span> -->
                    <span class="q-px-sm bg-deep-orange text-white text-italic rounded-borders">Password</span>
                  </template>
                  <template #prepend>
                    <q-icon name="icon-mat-key" />
                  </template>
                  <template #append>
                    <q-icon
                      :name="isPasw ? 'icon-mat-visibility_off' : 'icon-mat-visibility'"
                      class="cursor-pointer"
                      @click="isPasw = !isPasw"
                    />
                  </template>
                </q-input>
                <div class="row q-mt-lg">
                  <q-btn
                    push
                    color="white"
                    text-color="primary"
                    label="Login"
                    type="submit"
                    :disable="storeAuth.loading"
                  >
                    <template #loading>
                      <q-spinner-hourglass class="on-right" />
                      Loading...
                    </template>
                  </q-btn>
                </div>
              </q-form>
            </div>
            <div class="app-v text-grey-4">
              app versi v2.0
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { computed, ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
// import madSaleh from 'src/assets/images/mad_saleh_minum.png'
import { useAuthStore } from 'src/stores/auth'
// import { useRouter } from 'vue-router'
const img = computed(() => {
  return new URL('../../../assets/images/mad_saleh_minum.png', import.meta.url).href
})

const isPasw = ref(true)
const myForm = ref(null)
const form = ref({
  email: '',
  password: '',
  device_name: $q.platform.is.name + '-' + $q.platform.is.platform
})

const storeAuth = useAuthStore()
// const router = useRouter()
function onSubmit () {
  const formData = new FormData()
  formData.append('email', form.value.email + '@app.com')
  formData.append('password', form.value.password)
  formData.append('device_name', form.value.device_name)
  storeAuth.login(formData)
}
</script>

<style lang="scss" scoped>
.app-v {
  position: absolute;
  bottom:20px;
  right: 20px;
}
.box {
  position: relative;

  .square {
    position: absolute;
    // filter: blur(1px);
    backdrop-filter: blur(10px);
    // backdrop-filter: sepia(.2);
    box-shadow: 0 25px 45px rgba(0,0,0,0.1);
    border: 1px solid rgba(255,255,255,0.5);
    border-radius: 10px;
    border-right: 1px solid rgba(255,255,255,0.2);
    border-bottom: 1px solid rgba(255,255,255,0.2);
    // background: rgba(255,255,255,0.1);
    animation: animate 10s linear infinite;
    animation-delay: calc(-1s * var(--i));

  }

  @keyframes animate {
    0%,100%{
      transform: translateY(-40px);
    }
    50% {
      transform: translateY(40px);
    }
  }

  .min-h {
    min-height: 400px;
  }

  .square:nth-child(1){
      top: -50px;
      right: -60px;
      width: 100px;
      height: 100px;
    }
  .square:nth-child(2){
      top: 150px;
      left: -100px;
      width: 120px;
      height: 120px;
      z-index: 2;
    }
  .square:nth-child(3){
    bottom: 50px;
    right: -60px;
    width: 80px;
    height: 80px;
    z-index: 2;
  }
  .square:nth-child(4){
    bottom: -70px;
    left: 100px;
    width: 50px;
    height: 50px;
  }
  .square:nth-child(5){
    top: -30px;
    left: 100px;
    width: 60px;
    height: 60px;
  }
  .container {
    position: relative;
    width: 100%;
    min-height: 400px;
    // background: rgba(255,255,255,0.1);
    border-radius: 10px;
    backdrop-filter: blur(10px);
    // filter: blur(1px);
    box-shadow: 0 25px 45px rgba(0,0,0,0.1);
    border: 2px solid rgba(255,255,255,0.5);
    border-right: 2px solid rgba(255,255,255,0.2);
    border-bottom: 2px solid rgba(255,255,255,0.2);
    // display: flex;
    // justify-content: center;
    // align-items: center;
  }

  .bg-x {
    background: linear-gradient(120deg, $primary 0%, $primary 100%);
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
  }

  .login-form {
    align-items: flex-start;
    .form {
      position: relative;
      .judul-form {
        width: 100%;
        position: relative;
        &:before {
          content: '';
          position: absolute;
          left: 0;
          bottom: -8px;
          width: 50px;
          height: 3px;
          background-color: #fff;
          border-radius: 2px;
        }
      }
    }
  }
}
</style>

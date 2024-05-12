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
          v-if="!isMobile"
          class="col-md-6 col-lg-6 col-xl-6 col-sm-6 col-xs-12 bg-x min-h z-top"
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
            />
            <div class="q-px-lg q-mt-md text-weight-thin">
              silahkan Anda Scan Code di samping melalui Aplikasi Xenter
            </div>
          </div>
        </div>
        <template v-if="!loading">
          <div
            v-if="mode==='login-model-jadul' && !isMobile"
            class="login-form col-md-6 col-lg-6 col-xl-6 col-sm-6 col-xs-12 min-h"
          >
            <FormLogin
              :key="mode"
            />
          </div>
          <div
            v-else-if="mode==='qr' && isMobile"
            class="login-form col-md-6 col-lg-6 col-xl-6 col-sm-6 col-xs-12 min-h"
          >
            <FormLogin
              :key="isMobile"
            />
          </div>
          <div
            v-else
            class="login-qr col-md-6 col-lg-6 col-xl-6 col-sm-6 col-xs-12 min-h"
          >
            <FormQr
              :key="mode"
              :qr="store.qrCode"
            />
          </div>
        </template>

        <template v-else>
          <div class="col-md-6 col-lg-6 col-xl-6 col-sm-6 col-xs-12 min-h bg-r slide-from-left">
            <div class="fit column flex-center">
              <q-spinner-box
                color="secondary"
                size="10em"
              />

              <div class="text-white">
                Harap Tunggu
                <q-spinner-comment
                  color="primary"
                  size="2em"
                />
              </div>
              <div class="f-18 text-secondary">
                {{ auth?.titleLoading }}
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { useAuthStore } from 'src/stores/simrs/logistik/sigarang/auth'
import { useQuasar } from 'quasar'
import { useIdentityStore } from 'src/stores/auth/identity'
import FormLogin from './FormLogin.vue'
import FormQr from './FormQr.vue'

import { computed, onMounted, ref } from 'vue'
import { useAuthStore } from 'src/stores/auth'
// import { useRoute } from 'vue-router'

const auth = useAuthStore()
// const route = useRoute()
const store = useIdentityStore()
const $q = useQuasar()

const isMobile = ref($q.platform.is.mobile)
// const routeForm = ref(route.params.mode === 'login-model-jadul')
// const routeQr = ref(route.params.mode === 'qr')

defineProps({
  mode: {
    type: String,
    default: 'login-model-jadul'
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const img = computed(() => {
  return new URL('../../../assets/images/Xenter_fix.svg', import.meta.url).href
})

onMounted(() => {
  store.makeQr()
  // console.log('login', $q)
})

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
  .bg-r {
    background: linear-gradient(120deg, $primary 0%, $primary 100%);
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
  }
}

.slide-from-left {
  animation: slideInFromLeft 0.5s forwards;
}

@keyframes slideInFromLeft {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>

<template>
  <q-page class="fullscreen">
    <app-loader
      v-if="store.loading"
      class="dimmed"
    />
    <div class="top-page">
      <BoxAnimation class="absolute" />
      <BgAnimation class="z--" />
      <div class="inner-top-page column flex-center">
        <LoginForm class="login-form" />
      </div>

      <!-- <bgAnimation /> -->
    </div>
    <div class="bot column flex-center">
      <div class="text-subtitle">
        Aplikasi Xenter UOBK RSUD MOHAMAD SALEH
      </div>
    </div>
  </q-page>
</template>
<script setup>
// import { computed } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import BgAnimation from './comp/BgAnimation.vue'
import BoxAnimation from './comp/BoxAnimation.vue'
import LoginForm from './comp/LoginForm.vue'

const store = useAuthStore()

</script>

<style lang="scss" scoped>
$grad:#187DC1;

* {
  margin:0;
  padding:0;
}

.top-page {
  position: relative;
  text-align: center;
  background: linear-gradient(60deg, $secondary 0%, $primary 100%);

  .inner-top-page {
      width: 100%;
      height:100vh;
      margin:0;
      padding: 0;
    }

}

.login-form {
  width: 50%;
  margin-top: 40px;
  z-index: 2;
}

.bot {
  position: absolute;
  width: 100%;
  height: 5vh;
  bottom: 0;
  background-color: transparent ;
}
.z-- {
  z-index: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 10vh;
}
</style>

<template>
  <div>
    <HeaderSso
      :user="user"
      @sign-out="signOut"
    />
    <div class="box">
      <div class="column flex-center">
        <div class="container q-pa-lg">
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
          asdas
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import HeaderSso from './comp/HeaderSso.vue'
import { useAuthStore } from 'src/stores/auth'
import { computed, onMounted } from 'vue'

const store = useAuthStore()

onMounted(() => {
  store.getUser()
})

const user = computed(() => {
  return store.currentUser
})

const signOut = () => {
  store.logout()
}
</script>

<style lang="scss" scoped>
.box {
  position: relative;

  .square {
    position: absolute;
    // filter: blur(1px);
    // backdrop-filter: blur(15px);
    backdrop-filter: sepia(.5);
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
    width: 90%;
    min-height: 80vh;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    box-shadow: 0 25px 45px rgba(0,0,0,0.1);
    border: 3px solid rgba(255,255,255,0.5);
    border-right: 3px solid rgba(255,255,255,0.2);
    border-bottom: 3px solid rgba(255,255,255,0.2);
  }

  .bg-x {
    background: linear-gradient(120deg, $primary 0%, $primary 100%);
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
  }

}
</style>

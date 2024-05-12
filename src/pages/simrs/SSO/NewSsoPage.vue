<template>
  <div class="column flex-center full-height">
    <!-- <Transition>
      <div
        v-if="store.loading"
        class="fullscreen column flex-center dimmed"
      >
        <app-loader />
      </div>
    </Transition> -->
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
      <div class="container full-height">
        <div class="column full-height ">
          <div class="col-grow">
            <KumpulanAplikasi
              :key="apps.aksesApps"
              :loading="store.loading"
              :items="apps.items"
              :akses="apps.aksesApps"
              @go-to="(item)=>goTo(item)"
            />
          </div>
          <div class="col-auto bg-primary corner">
            <HeaderSso
              :key="apps.user"
              :loading="store.loading"
              :user-local="apps.user"
              @sign-out="signOut"
              @setting="setting"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import HeaderSso from './comp/HeaderSso.vue'
import KumpulanAplikasi from './comp/KumpulanAplikasi.vue'
import { useAuthStore } from 'src/stores/auth'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const store = useAuthStore()
const apps = useAplikasiStore()
const router = useRouter()

const num = ref(0)

const loading = ref(false)

// onBeforeMount(() => {
//   loading.value
// })

onMounted(() => {
  store.getUserNew()
  num.value = num.value + 1
})

// const goTo = (item) => {
//   loading.value = true
//   apps.setCurrentApp(item)
//   const localAp = JSON.parse(localStorage.getItem('aplikasiX'))
//   if (localAp?.currentApp === null) {
//     localAp.currentApp = item
//     localStorage.setItem('aplikasiX', JSON.stringify(localAp))
//   }
//   loading.value = false
//   router.push({ path: item.url, replace: true })

//   // setTimeout(() => {
//   //   loading.value = false
//   // }, 2000)
// }

const goTo = async (item) => {
  loading.value = true
  await apps.setCurrentApp(item) // Asumsi bahwa ini adalah fungsi asynchronous
  const localAp = JSON.parse(localStorage.getItem('aplikasiX'))
  if (localAp?.currentApp === null) {
    localAp.currentApp = item
    localStorage.setItem('aplikasiX', JSON.stringify(localAp))
  }
  loading.value = false
  router.push({ path: item.url, replace: true })
}

const signOut = () => {
  store.logout()
}

function setting() {
  if (apps?.user?.pegawai?.role_id === 1) {
    router.push({ path: '/settings/aplikasi', replace: true })
    // console.log('root')
  }
  // console.log('apps', apps?.user?.pegawai)
}

</script>

<style lang="scss" scoped>
.box {
  position: relative;

  .square {
    position: absolute;
    // filter: blur(1px);
    backdrop-filter: blur(15px);
    // backdrop-filter: sepia(.5);
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
    width: 90vw;
    min-height: 90vh;
    border-radius: 10px;
    backdrop-filter: blur(5px);
    // backdrop-filter: sepia(.5);
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

  .corner {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

}

/* we will explain what these classes do next! */
.v-enter-active{
  opacity: 1;
}
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from{
  opacity: 1;
}
.v-leave-to {
  opacity: 0;
}
</style>

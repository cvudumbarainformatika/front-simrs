<template>
  <q-page class="fullscreen bg-img column flex-center">
    <q-card
      flat
      bordered
      class="card-login"
    >
      <q-card-section>
        <div
          class="text-center"
          style="margin-top:20px"
        >
          <q-avatar size="70px">
            <img :src="logo">
          </q-avatar>
          <div class="f-12 text-white q-mt-md">
            SISTEM INFORMASI MANAJEMEN RUMAH SAKIT
          </div>
          <div class="text-h6 text-white">
            RSUD DOKTER MOHAMAD SALEH
          </div>
        </div>
        <q-form
          ref="myForm"
          class="q-pa-md"
          style="margin-top:70px"
          @submit="onSubmit"
        >
          <app-input
            v-model="form.email"
            dense
            label="email"
            icon="icon-mat-email"
          />
          <app-input
            v-model="form.password"
            dense
            type="password"
            label="password"
            icon="icon-mat-key"
            class="q-mt-sm"
          />

          <div style="margin-top:50px">
            <app-btn
              type="submit"
              :loading="storeAuth.loading"
              class="full-width"
              label="Login"
            />
          </div>
        </q-form>
      </q-card-section>
      <!-- <div class="absolute-bottom q-pa-lg text-grey-6">
        <q-separator />
        <div class="">
          Aplikasi ini tidak di perjualbelikan secara bebas tanpa seizin dari pembuatnya.
        </div>
        <div class="q-mt-lg text-right f-14">
          ADMIN WEBSITE
        </div>
      </div> -->
    </q-card>
  </q-page>
</template>
<script setup>
import { computed, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth'
import { useAppStore } from 'src/stores/app'
import { pathImg } from 'src/boot/axios'

const storeAuth = useAuthStore()
const app = useAppStore()
const $q = useQuasar()

console.log($q.platform.has.touch)

const myForm = ref(null)
const form = ref({
  email: '',
  password: '',
  device_name: $q.platform.is.name + '-' + $q.platform.is.platform
})

const logo = computed(() => {
  if (app.logo === null) {
    return new URL('../../assets/logos/logo-rsud.png', import.meta.url).href
  } else {
    return pathImg + app.logo
  }
})
// console.log(logo)
// console.log(form)
// console.log(storeAuth)

function onSubmit () {
  const formData = new FormData()
  formData.append('email', form.value.email + '@app.com')
  formData.append('password', form.value.password)
  formData.append('device_name', form.value.device_name)
  storeAuth.login(formData)
}

</script>

<style lang="scss" scoped>

.bg-img {
  background-image: url("../../assets/images/bg.png");
  background-repeat: no-repeat, repeat;
  background-size: cover;
}
// .card-login {
//   width:30vw;
//   min-height:30vh;
//   overflow: hidden;
//   position: relative;
//   // border: 4px solid $grey-6;
//     // &::before {
//     //   content: "";
//     //   width:360px;
//     //   height:200px;
//     //   position: absolute;
//     //   border-radius: 0 0 50% 50%;
//     //   background: linear-gradient(-45deg, $secondary, $primary);
//     //   overflow: hidden;
//     // }

//     .login-sec {
//       background: linear-gradient(-45deg, $secondary, $primary);
//       height: 100%;
//     }
//     .form-login {
//       width:70%;
//       min-height:100px;
//       background-color: #fff;
//       border-radius:5px;
//     }
// }

// @media(max-width:800px){
//     .card-login {
//         width: 100vw;
//         height:100vh;
//         border-radius: 0px;
//           &::before {
//             width: 100vw;
//           }

//           .form-login {
//             width:80%;
//             margin-top:80px;
//             min-height:100px;
//             background-color: #fff;
//             border-radius:5px;
//           }

//           .login-sec {
//             background: linear-gradient(-45deg, $secondary, $primary);
//             height: 100vh;
//           }
//     }
// }

.card-login {
  width:420px;
  left: 30%;
  min-height:480px;
  overflow: hidden;
  position: relative;
    &::before {
      content: "";
      width:420px;
      height:230px;
      position: absolute;
      border-radius: 0 0 50% 50%;
      background: linear-gradient(-45deg, $secondary, $primary);
      overflow: hidden;
    }
}
@media(max-width:800px){
    .card-login {
        left: 0;
        width: 100vw;
        height:100vh;
        border-radius: 0px;
          &::before {
            width: 100vw;
          }
    }
}
</style>

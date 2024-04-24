<template>
  <div class="login-form full-height column flex-center text-white q-pa-lg">
    <div class="form q-mb-sm">
      <div class="text-h6 judul-form">
        LOGIN FORM
      </div>
    </div>
    <div class="q-my-md full-width">
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
          autocorrect="off"
          autocapitalize="off"
          autocomplete="chrome-off"
          spellcheck="false"
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
          autocorrect="off"
          autocapitalize="off"
          autocomplete="chrome-off"
          spellcheck="false"
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
        <div class="row justify-between q-mt-lg">
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
          <div
            class="column flex-center cursor-pointer f-12"
            :class="hoverred?'text-red':'text-grey-4'"
            @mouseover="hoverred=true"
            @mouseleave="hoverred=false"
            @click="goToQr()"
          >
            <q-icon
              name="icon-mat-qr_code_2"
              size="lg"
            />
            <div>Login Qr ?</div>
            <div>Klik disini</div>
          </div>
        </div>
      </q-form>
    </div>
    <div class="app-v text-grey-4">
      app versi v2.21
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
const $q = useQuasar()
const router = useRouter()

const isPasw = ref(true)
const hoverred = ref(false)
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
  // .then(() => {
  //   const channel = laravelEcho.join('private.notif.1')

  //   channel.subscribed(() => {
  //     console.log('subscribed notif channel!!!')
  //   })
  // })
  // .then(() => {
  //   // console.log('loading false', storeAuth.aplications)
  //   if (storeAuth.aplications.length === 1) {
  //     if (storeAuth.aplications[0].aplikasi === 'pegawai') {
  //       router.push('pegawai/user/list')
  //     } else {
  //       router.push(storeAuth.route.link)
  //     }
  //   }
  //   // window.location.reload()
  // })
}

function goToQr() {
  router.push({ name: 'login-mode', params: { mode: 'qr' }, replace: true })
  // location.reload()
}
</script>

<style lang="scss" scoped>
.app-v {
  position: absolute;
  bottom:20px;
  right: 20px;
}

.q-field__native{

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active{
      transition: background-color 9999s ease-in-out 0s;
  }

  // &input:-internal-autofill-previewed,
  // &input:-internal-autofill-selected{
  //   -webkit-box-shadow: none;
  // }

}
</style>

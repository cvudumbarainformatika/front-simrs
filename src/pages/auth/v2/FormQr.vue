<template>
  <div class="full-height column flex-center items-center text-white">
    <figure class="qrcode full-width q-pa-xl">
      <vue-qrcode
        :value="qr"
        tag="svg"
        :options="{
          errorCorrectionLevel: 'Q',
          color: {
            dark: '#000000',
            light: '#ffffff',
          },
          margin:2
        }"
      />
      <img
        class="qrcode__image"
        src="~assets/logos/logo-rsud.png"
        alt="Chen Fengyuan"
      >
    </figure>

    <div
      class="column flex-center cursor-pointer f-12 q-pa-md"
      :class="hoverred?'text-red':'text-grey-4'"
      @mouseover="hoverred=true"
      @mouseleave="hoverred=false"
      @click="goToQr()"
    >
      <div>Login Default ? Klik disini</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
defineProps({
  qr: {
    type: String,
    default: 'RSUD MOH SALEH'
  }
})
const hoverred = ref(false)

function goToQr () {
  router.push({ name: 'login-mode', params: { mode: 'login-model-jadul' }, replace: true })
  // location.reload()
}
</script>

<style scoped>
.qrcode {
  display: inline-block;
  font-size: 0;
  margin: 0;
  position: relative;
}

.qrcode__image {
  background-color: #fff;
  border: 0.15rem solid #fff;
  border-radius: 50%;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.25);
  height: 10%;
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 10%;
}

</style>

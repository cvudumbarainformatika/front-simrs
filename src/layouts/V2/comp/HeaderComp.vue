<template>
  <q-header
    :bordered="!mobile"
    reveal
    :class="dark?'bg-dark':'bg-white text-dark'"
    height-hint="60"
  >
    <!-- header class old
    :class="dark?'bg-dark':'bg-white text-dark'"
  -->
    <div
      class="q-px-sm flex items-center justify-between"
      style="height:50px"
    >
      <!-- LEFT -->
      <div @click="emit('goToSso')">
        <q-avatar
          size="35px"
          class="cursor-pointer bg-white"
        >
          <img src="~assets/logos/logo-rsud.png">
        </q-avatar>
      </div>
      <!-- <div>
        <q-btn
          v-if="!mobile"
          flat
          round
          icon="icon-mat-segment"
          class="flip__icon"
          @click="emit('toggleLeft')"
        />
        <div v-else>
          <q-avatar size="40px">
            <img src="~assets/logos/logo.png">
          </q-avatar>
        </div>
      </div> -->
      <!-- RIGHT -->
      <div :class="!mobile?'q-pr-md':'q-pr-sm'">
        <div class="row items-center">
          <div class="text-right">
            <div class="q-mr-sm text-weight-bold">
              {{ user?.nama }}
            </div>
            <div
              v-if="user?.pegawai?.ruang"
              class="q-mr-sm "
            >
              {{ user?.pegawai?.ruang?.uraian }}
            </div>
            <div
              v-else-if="user?.pegawai?.depo"
              class="q-mr-sm"
            >
              {{ user?.pegawai?.depo?.nama }}
            </div>
            <div
              v-else-if="user?.pegawai?.poli"
              class="q-mr-sm"
            >
              {{ user?.pegawai?.poli?.rs2 }}
            </div>
            <div
              v-else
              class="q-mr-sm text-primary"
            >
              Tidak ada ruangan
            </div>
          </div>
          <q-btn
            flat
            round
            icon="icon-eva-bell-outline"
          />
          <q-avatar
            size="40px"
            class="q-ml-sm cursor-pointer bg-grey"
          >
            <img src="~assets/images/actor.svg">
            <adm-header-menu-profile />
          </q-avatar>
        </div>
      </div>
    </div>
  </q-header>
</template>

<script setup>
import AdmHeaderMenuProfile from './AdmHeaderMenuProfile.vue'
const emit = defineEmits(['goToSso'])
defineProps({
  dark: {
    type: Boolean,
    default: false
  },
  mobile: {
    type: Boolean,
    default: false
  },
  user: {
    type: Object,
    default: null
  }
})

</script>

<style lang="scss" scoped>
.flip__icon {
  transform: scaleX(-1);
}

.glass {
  background: rgba(255,255,255,.1);
  backdrop-filter: blur(20px);
}
</style>

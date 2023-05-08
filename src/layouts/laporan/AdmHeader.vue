<template>
  <!-- reveal -->
  <q-header
    :bordered="!mobile"
    :class="dark?'bg-dark':'bg-white text-dark'"
  >
    <div
      class="q-px-sm q-py-sm flex items-center justify-between"
      style="height:60px"
    >
      <!-- LEFT -->
      <div>
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
            <img src="~assets/logos/logo-rsud.png">
          </q-avatar>
        </div>
      </div>
      <!-- RIGHT -->
      <div :class="!mobile?'q-pr-md':'q-pr-sm'">
        <!-- <q-btn
          flat
          round
          icon="icon-eva-bell-outline"
        /> -->
        <div class="row items-center">
          <div v-if="role!=='root' && role!==''">
            <div class="row">
              <q-badge>
                Akses : {{ role }}
              </q-badge>
            </div>
            <div class="row q-mt-sm">
              <q-badge>
                {{ ruangan }}
              </q-badge>
            </div>
          </div>
          <div>
            <q-avatar
              size="40px"
              class="q-ml-sm cursor-pointer bg-grey"
            >
              <img
                v-if="role!=='root'"
                :src="foto"
              >
              <img
                v-if="role==='root'"
                src="~assets/images/actor.svg"
              >
              <adm-header-menu-profile />
            </q-avatar>
          </div>
        </div>
      </div>
    </div>
  </q-header>
</template>

<script setup>
import AdmHeaderMenuProfile from './AdmHeaderMenuProfile.vue'
const emit = defineEmits(['toggleLeft'])
defineProps({
  dark: {
    type: Boolean,
    default: false
  },
  mobile: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    default: ''
  },
  ruangan: {
    type: String,
    default: ''
  },
  foto: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.flip__icon {
  transform: scaleX(-1);
}
</style>

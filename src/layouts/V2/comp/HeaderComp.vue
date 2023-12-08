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
      <div
        class="row items-center"
        @click="emit('goToSso')"
      >
        <q-avatar
          size="35px"
          class="cursor-pointer bg-white"
        >
          <img src="~assets/logos/logo-rsud.png">
        </q-avatar>
        <div class="text q-ml-sm">
          <div class="f-12 text-weight-bold">
            {{ namaPath(route?.matched[0]?.path) }}
          </div>
          <div>
            {{ route?.matched[1]?.path }}
          </div>
        </div>
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
              class="q-mr-sm  text-primary"
            >
              {{ user?.pegawai?.ruang?.uraian }}
            </div>
            <div
              v-else-if="user?.pegawai?.depo"
              class="q-mr-sm text-primary"
            >
              {{ user?.pegawai?.depo?.nama }}
            </div>
            <div
              v-else-if="user?.pegawai?.kdruangansim"
              class="q-mr-sm text-primary"
            >
              {{ poli(user?.pegawai) }}
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
import { useSettingsAplikasi } from 'src/stores/simrs/settings'
import AdmHeaderMenuProfile from './AdmHeaderMenuProfile.vue'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
const emit = defineEmits(['goToSso'])

const route = useRoute()

onMounted(() => {
  console.log('route', route)
})

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
const setting = useSettingsAplikasi()
function poli(val) {
  console.log(val)
  if (setting.polis?.length) {
    const temp = val.kdruangansim.split('|')
    const anu = []
    let fin = null
    if (temp.length) {
      temp.forEach(a => {
        const pol = setting?.polis?.filter(b => b.kodepoli === a)
        if (pol.length) anu.push(pol[0])
      })
      if (anu.length) {
        fin = anu.map(x => x.polirs).join(', ')
      }
    }
    const ruang = fin ?? 'Tidak ada Akses Poli'
    return ruang
  } else {
    return 'menunggu data poli'
  }
}

function namaPath(val) {
  const stringdepan = val[0]
  let res = val
  if (stringdepan === '/') {
    res = val.substring(0, val.length)
  }
  console.log('nama path', stringdepan)
  return res.toUpperCase()
}

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

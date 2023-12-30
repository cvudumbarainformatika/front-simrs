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
          <div class="f-18 text-weight-bold">
            {{ namaPath(route?.matched[0]?.path) }}
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
          <!-- <div class="text-right q-mr-sm items-center">
            <app-autocomplete-new
              ref="refObat"
              :key="user.kdruangansim"
              :model="user.kdruangansim"
              autocomplete="nama"
              option-label="nama"
              option-value="kdruangansim"
              label="Set Gudang / Depo"
              outlined
              bg-color="white"
              :source="optionsGudang"
              :loading="setting.loadingGudang"
              @on-select="emit('setGudang',$event)"
              @clear="emit('setGudang',null)"
            />
          </div> -->
          <div class="text-right">
            <div class="q-mr-sm text-weight-bold">
              {{ user?.nama }}
            </div>

            <div
              v-if="!!user?.pegawai?.ruang?.uraian"
              class="q-mr-sm  text-primary"
            >
              {{ user?.pegawai?.ruang?.uraian }}
            </div>
            <div
              v-else-if="!!user?.pegawai?.depo"
              class="q-mr-sm text-primary"
            >
              {{ user?.pegawai?.depo?.nama }}
            </div>
            <div
              v-else-if="!!user?.pegawai?.depo_sim"
              class="q-mr-sm text-primary"
            >
              {{ user?.pegawai?.depo_sim?.nama }}
            </div>
            <div
              v-else-if="!!user?.pegawai?.kdruangansim"
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
import { onMounted, ref } from 'vue'
const emit = defineEmits(['goToSso', 'setGudang'])

const route = useRoute()

const props = defineProps({
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
  },
  gudangs: {
    type: Object,
    default: null
  },
  polis: {
    type: Object,
    default: null
  },
  ruangs: {
    type: Object,
    default: null
  }
})

onMounted(() => {
  // console.log('route', route)
  const temp = props.user?.pegawai?.kdruangansim.split('|')
  if (!props.user?.kdruangansim && temp.length) emit('setGudang', temp[0])
})

// eslint-disable-next-line no-unused-vars
const setting = useSettingsAplikasi()
const optionsGudang = ref([])
function poli(val) {
  // const gudangs = [
  //   { nama: 'Gudang Farmasi ( Kamar Obat )', value: 'Gd-05010100' },
  //   { nama: 'Gudang Farmasi (Floor Stok)', value: 'Gd-03010100' }
  // ]
  console.log(val)
  const temp = val.kdruangansim.split('|')
  const anu = []
  let fin = null
  const anu2 = []
  let fin2 = null
  const anu3 = []
  let fin3 = null
  let ruang = ''
  if (temp.length && (parseInt(props?.user?.pegawai?.role_id) >= 3 && parseInt(props?.user?.pegawai?.role_id) <= 7)) {
    temp.forEach(a => {
      if (a.toLowerCase().includes('pol') || a.toLowerCase().includes('pen')) {
        // console.log('pol')
        if (props.polis?.length) {
          const pol = props?.polis?.filter(b => b.kodepoli === a)
          if (pol.length) anu.push(pol[0])

          if (anu.length) {
            fin = anu.map(x => x.polirs).join(', ')
          }
          ruang = fin ?? 'Tidak ada Akses Poli'
        } else {
          ruang = 'Menunggu data poli'
        }
      } else if (a.toLowerCase().includes('gd')) {
        if (props.gudangs?.length) {
          const gud = props?.gudangs.filter(c => c.kode === a)
          if (gud.length) anu2.push(gud[0])
          if (anu2.length) {
            fin2 = anu2.map(x => x.nama).join(', ')
          }
          ruang = fin2 ?? 'Tidak ada Akses gudang / depo'
        } else {
          ruang = 'Menunggu data gudang'
        }
      } else if (a.toLowerCase().includes('r-')) {
        if (props.ruangs?.length) {
          const gud = props?.ruangs.filter(c => c.kode === a)
          if (gud.length) anu3.push(gud[0])
          if (anu3.length) {
            fin3 = anu3.map(x => x.uraian).join(', ')
          }
          ruang = fin3 ?? 'Tidak ada Akses Ruangan'
        } else {
          ruang = 'Menunggu data ruangan'
        }
      } else {
        ruang = 'NN'
      }
    })
  } else {
    ruang = 'data ruangan tidak ditemukan'
  }
  console.log(ruang)
  optionsGudang.value = anu2
  return ruang
}

function namaPath(val) {
  const stringdepan = val[0]
  let res = val
  if (stringdepan === '/') {
    res = val.substring(val.length, 1)
  }
  // console.log('nama path', stringdepan)
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

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
          <div class="text-right">
            <div class="q-mr-sm text-weight-bold">
              {{ user?.pegawai?.nama ?? '-' }}
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
              v-else-if="(rsim?.length===1 && rsim[0]!=='') || (rsim?.length>1)"
              class="q-mr-sm text-primary"
            >
              <!-- style="max-width: 80%;" -->
              {{ poli(user?.pegawai) }}
            </div>
            
          </div>
          <div
            v-if="optionsGudang?.length >1"
            class="q-mr-sm items-center"
          >
            <!-- :label="labelGd()" -->
            <q-btn
              no-caps
              dense
              color="primary"
            >
              <div class="f-10">
                {{ labelGd() }}
              </div>
              <adm-choice-ruangan
                :option="optionsGudang"
                @set-gudang="emit('setGudang',$event)"
              />
            </q-btn>
            
          </div>
          <div
            v-if="optionsRuangans?.length >1"
            class="q-mr-sm items-center"
          >
            <!-- style="width: 180px;" -->
            <q-btn
              no-caps
              dense
              color="primary"
            >
              <div class="f-10">
                {{ labelRu() }}
              </div>
              <adm-choice-ruangan
                :option="optionsRuangans"
                @set-gudang="emit('setGudang',$event)"
              />
            </q-btn>
            
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
import AdmChoiceRuangan from './AdmChoiceRuangan.vue'
import { useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'
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

// console.log('props', props?.user)

// eslint-disable-next-line no-unused-vars
const setting = useSettingsAplikasi()
const rsim = computed(() => {
  return props.user?.pegawai?.kdruangansim.split('|')
})
const optionsGudang = computed(() => {
  return props?.gudangs?.filter(gud => rsim.value?.includes(gud.kode))
})
const optionsRuangans = computed(() => {
  return props?.ruangs?.filter(gud => rsim.value?.includes(gud.kode))
})
const optionsPolis = computed(() => {
  return props?.polis?.filter(gud => rsim.value?.includes(gud.kodepoli))
})
onMounted(() => {
  const temp = props.user?.pegawai?.kdruangansim.split('|')
  const ruang=temp.filter(a=>a.includes('R-'))
  if (!props.user?.kdruangansim && temp?.length) emit('setGudang', ruang[0]??temp[0])
  // rsim.value = temp
})
function labelGd () {
  const anu = props?.gudangs.filter(gud => gud.kode === props.user?.kdruangansim)
  if (anu.length) return anu[0]?.nama
  else return 'Gudang Tidak Dipilih'
}
function labelRu () {
  const anu = props?.ruangs?.filter(gud => gud.kode === props.user?.kdruangansim)
  if (anu.length) return anu[0]?.uraian
  else return 'Ruangan Tidak Dipilih'
}
function poli (val) {
  let fin = null
  let ruang = ''
  const temp = val.kdruangansim.split('|')
  if (temp.length) {
    if (optionsPolis.value.length) {
      fin = optionsPolis.value.map(x => x.polirs).join(', ')
    }
    // else if (optionsGudang.value?.length) {
    //   fin = optionsGudang.value.map(x => x.nama).join(', ')
    // }
    // else if (optionsRuangans.value?.length) {
    //   fin = optionsRuangans.value.map(x => x.uraian).join(', ')
    // }
    // console.log('fin', fin);
    ruang = fin ?? 'Tidak ada Akses Poli'
  }
  else {
    ruang = 'data ruangan tidak ditemukan'
  }
  return ruang
}

function namaPath (val) {
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

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
            <!-- <div
              v-else-if="!!user?.pegawai?.depo_sim"
              class="q-mr-sm text-primary"
            >
              {{ user?.pegawai?.depo_sim?.nama }}
            </div> -->
            <div
              v-else-if="user?.pegawai?.kdruangansim.split('|').length===1 || (user?.pegawai?.kdruangansim.split('|').length>1 && !optionsGudang?.length && !optionsRuangans?.length )"
              class="q-mr-sm text-primary"
            >
              <!-- style="max-width: 80%;" -->
              {{ poli(user?.pegawai) }}
            </div>
            <!-- <div
              v-else
              class="q-mr-sm text-primary"
            >
              Tidak ada ruangan
            </div> -->
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
            <!-- <app-autocomplete-new
              ref="refObat"
              :key="user.kdruangansim"
              :model="user.kdruangansim"
              autocomplete="nama"
              option-label="nama"
              option-value="kode"
              label="Set Gudang / Depo"
              outlined
              bg-color="white"
              :source="optionsGudang"
              :loading="setting.loadingGudang"
              @on-select="emit('setGudang',$event)"
              @clear="emit('setGudang',null)"
            />
              -->
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
            <!-- <app-autocomplete-new
              ref="refObat"
              :key="user.kdruangansim"
              :model="user.kdruangansim"
              autocomplete="nama"
              option-label="nama"
              option-value="kode"
              label="Set Ruangan"
              outlined
              bg-color="white"
              :source="optionsRuangans"
              :loading="setting.loadingRuangSim"
              @on-select="emit('setGudang',$event)"
              @clear="emit('setGudang',null)"
            /> -->
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
  optionsGudang.value = props?.gudangs.filter(gud => temp.includes(gud.kode))
  optionsRuangans.value = props?.ruangs.filter(gud => temp.includes(gud.kode))
})
function labelGd() {
  const anu = props?.gudangs.filter(gud => gud.kode === props.user?.kdruangansim)
  if (anu.length) return anu[0]?.nama
  else return 'Tidak ada ruangan'
}
function labelRu() {
  const anu = props?.ruangs.filter(gud => gud.kode === props.user?.kdruangansim)
  if (anu.length) return anu[0]?.uraian
  else return 'Tidak ada ruangan'
}
// eslint-disable-next-line no-unused-vars
const setting = useSettingsAplikasi()
const optionsGudang = ref([])
const optionsRuangans = ref([])
function poli(val) {
  let fin = null
  // optionsGudang.value = []
  // optionsRuangans.value = []
  let ruang = ''
  // console.log(val)
  const temp = val.kdruangansim.split('|')
  // if (temp.length && (parseInt(props?.user?.pegawai?.role_id) >= 3 && parseInt(props?.user?.pegawai?.role_id) <= 7)) {
  if (temp.length) {
    const anu = props?.polis.filter(gud => temp.includes(gud.kodepoli))
    if (anu.length) {
      fin = anu.map(x => x.polirs).join(', ')
      console.log('gu', optionsRuangans.value.map(x => x.uraian))
    } else if (optionsGudang.value.length) {
      fin = optionsGudang.value.map(x => x.nama).join(', ')
      console.log('gu', optionsRuangans.value.map(x => x.uraian))
    } else if (optionsRuangans.value.length) {
      fin = optionsRuangans.value.map(x => x.uraian).join(', ')
      console.log('ru', optionsRuangans.value.map(x => x.uraian))
    }
    ruang = fin ?? 'Tidak ada Akses Ruangan'
    // console.log('gud', optionsRuangans.value)
  } else {
    ruang = 'data ruangan tidak ditemukan'
  }
  // console.log(ruang)
  // optionsGudang.value = anu2
  // optionsRuangans.value = anu3
  // console.log('gud', optionsGudang.value)
  // console.log('ru', optionsRuangans.value.map(x => x.uraian)).join(', ')
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

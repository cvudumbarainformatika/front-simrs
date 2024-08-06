<template>
  <q-toolbar>
    <q-btn
      flat
      dense
      icon="icon-mat-sort"
      @click="emits('toggleLeftDrawer')"
    />
    <q-toolbar-title class="f-14">
      <div class="row items-center q-gutter-md">
        <div class="row items-center no-wrap q-gutter-sm text-white">
          <q-avatar size="30px">
            <img :src="getImageDokter(pasien?.datasimpeg?.kelamin)">
          </q-avatar>
          <div class="column f-12">
            <div>
              DPJP | {{ pasien?.dokter?.nama }}
            </div>
          </div>
        </div>
      </div>
    </q-toolbar-title>

    <div v-if="pasien?.dokter !== '' ">
      <q-btn
        v-if="pasien?.status==='' || pasien?.status==='2'"
        label="selesaikan layanan"
        color="negative"
        class="q-mr-lg q-px-lg"
        dense
        :loading="loadingFinish"
        :disable="loadingFinish"
        @click="selesaikanLayanan"
      />
      <q-btn
        v-else-if="pasien?.status==='3'"
        label="LAYANAN TELAH BATAL"
        color="negative"
        class="q-mr-lg q-px-lg"
        dense
      />
      <q-btn
        v-else
        label="SUDAH DILAYANI"
        color="white"
        class="q-mr-lg q-px-lg"
        dense
        outline
        disable
      />
    </div>
    <q-btn
      v-close-popup
      dense
      flat
      icon="icon-mat-close"
      :disable="store.loading || store.loadingObat"
    >
      <q-tooltip class="bg-white text-primary">
        Close
      </q-tooltip>
    </q-btn>
  </q-toolbar>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { ref } from 'vue'
import { usePermintaanEResepStore } from 'src/stores/simrs/farmasi/permintaanresep/eresep'

const store = usePermintaanEResepStore()

const emits = defineEmits(['toggleLeftDrawer', 'layananSelesai'])

// eslint-disable-next-line no-unused-vars
const search = ref('')
const kodedpjp = ref(null)
const kdpegsimrs = ref(null)
const options = ref([])
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  loadingSaveDpjp: {
    type: Boolean,
    default: false
  },
  loadingFinish: {
    type: Boolean,
    default: false
  }
})

// eslint-disable-next-line no-unused-vars
function updateKodeDpjp (val) {
  // console.log(props?.pasien?.groups)
  kodedpjp.value = val?.kddpjp ?? ''
  kdpegsimrs.value = val?.kdpegsimrs
}

// eslint-disable-next-line no-unused-vars
// function gantiDpjp() {
//   // console.log('ok')
//   const form = {
//     kodedpjp: kodedpjp.value ?? '',
//     kdpegsimrs: kdpegsimrs.value,
//     noreg: props?.pasien?.noreg
//   }

//   // emits('gantidpjp', form)
// }

// eslint-disable-next-line no-unused-vars
function getImage (kelamin, row) {
  if (row?.foto === null || row?.foto === '' || row?.foto === 'undefined' || row?.foto === undefined) {
    return kelamin === 'Perempuan'
      ? new URL('../../../../../assets/images/actress.svg', import.meta.url).href
      : new URL('../../../../../assets/images/user-avatar.svg', import.meta.url).href
  }
  else {
    return 'http://192.168.100.100/simpeg/foto/' + row.nip + '/' + row.foto
  }
}
function getImageDokter (kelamin, row) {
  if (row?.foto === null || row?.foto === '' || row?.foto === 'undefined' || row?.foto === undefined || row.kddpjp === null) {
    return kelamin === 'Perempuan'
      ? new URL('../../../../../assets/images/actress.svg', import.meta.url).href
      : new URL('../../../../../assets/images/user-avatar.svg', import.meta.url).href
  }
  else {
    return 'http://192.168.100.100/simpeg/foto/' + row.nip + '/' + row.foto
  }
}

// eslint-disable-next-line no-unused-vars
async function filterOptions (val, update) {
  if (!val) {
    update(() => {
      options.value = []
    })
    return
  }
  const params = {
    params: {
      q: val
    }
  }
  // console.log('q :', val)
  const resp = await api.get('/v1/settings/appmenu/cari_dokter', params)
  console.log('cari', resp)
  update(
    () => (options.value = resp.data),
    ref => {
      if (val !== '' && ref.options.length) {
        ref.setOptionIndex(-1)
        ref.moveOptionSelection(1, true)
      }
    }
  )
}

function selesaikanLayanan () {
  // console.log('ok')
  emits('layananSelesai')
}
</script>

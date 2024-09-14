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
        <q-btn
          color="primary"
          class="q-pl-xs"
          flat
        >
          <div class="row items-center no-wrap q-gutter-sm text-white">
            <q-avatar size="30px">
              <img :src="getImageDokter(pasien?.datasimpeg?.kelamin, pasien?.datasimpeg)">
            </q-avatar>
            <div class="column f-12">
              <div>
                Dokter Pengirim | {{ pasien?.dokter === null || pasien?.dokter==='' ? '----': pasien?.dokter }}
              </div>
            </div>
          </div>
          <q-menu style="max-width: 460px;">
            <div class="row no-wrap q-pa-md">
              <div class="column items-center">
                <q-avatar size="72px">
                  <img :src="getImageDokter(pasien?.datasimpeg?.kelamin, pasien?.datasimpeg)">
                </q-avatar>

                <div class="f12 q-mt-md q-mb-xs">
                  {{ pasien?.dokter === null || pasien?.dokter==='' ? '----': pasien?.dokter }}
                </div>
              </div>
              <q-separator
                vertical
                inset
                class="q-mx-lg"
              />
            </div>
          </q-menu>
        </q-btn>
      </div>
    </q-toolbar-title>
    <q-btn
      v-if="props.pasien.flag === '2'"
      color="red"
      label="Selesai Layanan"
      :disable="store.loading || store.loadingObat"
      @click="store.flaglayanan(props.pasien)"
    />
    <q-btn
      v-if="props.pasien.flag === '1'"
      color="red"
      label="Selesai Layanan"
      disable
      @click="store.flaglayanan(props.pasien)"
    />

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
import { usePermintaanCathLab } from 'src/stores/simrs/penunjang/cathlab/permintaan'

// import { api } from 'src/boot/axios'
// import { ref } from 'vue'
// import { usePermintaanEResepStore } from 'src/stores/simrs/farmasi/permintaanresep/eresep'

// const store = usePermintaanEResepStore()

const store = usePermintaanCathLab()

const emits = defineEmits(['toggleLeftDrawer', 'gantidpjp', 'layananSelesai'])

// const search = ref('')
// const kodedpjp = ref(null)
// const kdpegsimrs = ref(null)
// const options = ref([])
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

// function updateKodeDpjp (val) {
//   // console.log(props?.pasien?.groups)
//   kodedpjp.value = val?.kddpjp ?? ''
//   kdpegsimrs.value = val?.kdpegsimrs
// }

// function gantiDpjp () {
//   // console.log('ok')
//   const form = {
//     kodedpjp: kodedpjp.value ?? '',
//     kdpegsimrs: kdpegsimrs.value,
//     noreg: props?.pasien?.noreg
//   }

//   emits('gantidpjp', form)
// }

// function getImage (kelamin, row) {
//   if (row?.foto === null || row?.foto === '' || row?.foto === 'undefined' || row?.foto === undefined) {
//     return kelamin === 'Perempuan'
//       ? new URL('../../../../../assets/images/actress.svg', import.meta.url).href
//       : new URL('../../../../../assets/images/user-avatar.svg', import.meta.url).href
//   }
//   else {
//     return 'http://192.168.100.100/simpeg/foto/' + row.nip + '/' + row.foto
//   }
// }
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

// async function filterOptions (val, update) {
//   if (!val) {
//     update(() => {
//       options.value = []
//     })
//     return
//   }
//   const params = {
//     params: {
//       q: val
//     }
//   }
//   // console.log('q :', val)
//   const resp = await api.get('/v1/settings/appmenu/cari_dokter', params)
//   update(
//     () => (options.value = resp.data),
//     ref => {
//       if (val !== '' && ref.options.length) {
//         ref.setOptionIndex(-1)
//         ref.moveOptionSelection(1, true)
//       }
//     }
//   )
// }

// function selesaikanLayanan() {
//   // console.log('ok')
//   emits('layananSelesai')
// }
</script>

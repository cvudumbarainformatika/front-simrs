<template>
  <div class="fit q-pa-md scroll">
    <q-card
      v-for="(item, n) in lists"
      :key="n"
      class="q-mb-sm"
    >
      <q-card-section>
        <div>Dokter : <b>{{ getDokter(item) }}</b> </div>
        <div>Jenis Tindakan : <b>{{ item?.jenistindakan }}</b> </div>
        <div>di kirim unt pemeriksaa PA : <b>{{ item?.dikirimuntukpemeriksaanpa }}</b> </div>
        <div>tanggal : <b>{{ item?.tanggal }}</b> </div>
        <div>Jam dimulai : <b>{{ item?.jammulai }}</b> </div>
        <div>Jam Selesai : <b>{{ item?.jamselesai }}</b> </div>
        <div>catatan komplikasi : <b>{{ item?.catatankomplikasi ?? '-' }}</b> </div>
        <div>List Tindakan :  </div>
        <q-list
          dense
          separator
          bordered
        >
          <q-item
            v-for="(it, x) in item.laporantindakan"
            :key="x"
          >
            <q-item-label>{{ namaTindakan(it) }}</q-item-label>
          </q-item>
        </q-list>
      </q-card-section>
      <q-separator />
      <q-card-section align="right">
        <q-btn
          dense
          icon="icon-mat-delete"
          color="negative"
          size="sm"
          padding="sm"
          flat
          rounded
          @click="hapusItem(item)"
        >
          <q-tooltip>Hapus data</q-tooltip>
        </q-btn>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { useLaporanTindakanPoliStore } from 'src/stores/simrs/pelayanan/poli/laporanTindakan'

const $q = useQuasar()
const store = useLaporanTindakanPoliStore()

const props = defineProps({
  lists: {
    type: Array,
    default: () => []
  },

  listdokter: {
    type: Array,
    default: () => []
  },
  pasien: {
    type: Object,
    default: null
  }
})

function getDokter(item) {
  const dok = props.listdokter.filter(x => x.kode === item.kddokter)
  if (dok.length) {
    return dok[0].nama
  }
  return '-'
}

function namaTindakan(kode) {
  const arr = props?.pasien?.tindakan
  const target = arr.filter(x => x.rs4 === kode)
  console.log('tt', target)
  if (target.length) {
    return target[0].mastertindakan?.rs2
  }
  return 'tidak valid'
}

function hapusItem(item) {
  // console.log('hi', item)
  $q.dialog({
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true
    // persistent: true
  }).onOk(() => {
    store.hapusData(props.pasien, item?.id)
  }).onCancel(() => {
    console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}
</script>

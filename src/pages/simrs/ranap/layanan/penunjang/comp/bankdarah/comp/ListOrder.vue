<template>
  <div class="fit column">
    <div v-if="items?.length" class="fit scroll q-pa-sm">
      <q-card
        v-for="item in filterredTable" :key="item"
        flat bordered class="full-width q-mb-sm"
      >
        <q-card-section>
          <div class="row items-center full-width justify-between relative-position">
            <div class="col-auto" style="max-width: 85%;">
              <div>NOTA : <b>{{ item?.rs2 }}</b></div>
              <div><b>jenis :</b> <em>{{ item?.rs4 }}</em></div>
              <div><b>Golongan :</b> <em>{{ item?.rs5 ?? '-' }} {{ item?.rs15 }}</em></div>
              <div><b>u/p :</b> <em>{{ item?.rs7 }}</em></div>
              <div><em>Qty :</em> <b>{{ item?.rs6 }}</b> <em>Transfusi Ke -</em> <b>{{ item?.rs13 }}</b></div>
              <div><em>Reaksi :</em> <b>{{ store?.reaksis?.find(x => x?.value === item?.rs9)?.label }}</b> </div>
              <div><em>Keterangan :</em> <b>{{ item?.ket ?? '-' }}</b> </div>
              <div class="">
                <!-- <div>by : <em>{{ item?.petugas?.nama }}</em></div> -->
              </div>
            </div>
            <div class="col-grow">
              <div class="row reverse">
                <div class="column ">
                  <div class="self-end q-mb-sm">
                    <q-btn icon="icon-mat-delete" outline color="negative" round size="sm" @click="hapusItem(item?.id)" />
                  </div>
                  <div class="self-end q-mb-sm">
                    <q-btn icon="icon-mat-print" outline color="dark" round size="sm" @click="printItem(item)" />
                  </div>
                  <div class="f-10 text-grey-8">
                    <div>{{ item?.rs3 }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div v-else class="fit column flex-center">
      <div v-if="!loading" class="f-14">
        Belum ada data
      </div>
      <div v-else>
        Sedang memuat ...
      </div>
    </div>

    <!-- Dialog Print -->
    <dialog-cetak v-model="openDialogCetak" :item="itemx" :pasien="pasien" :dokters="store?.dokters" :perawats="store?.perawats" />
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { usePermintaanBankDarahStore } from 'src/stores/simrs/ranap/bankdarah.js'
import { computed, defineAsyncComponent, ref } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  pasien: {
    type: Object,
    default: null
  }
})
const store = usePermintaanBankDarahStore()
const DialogCetak = defineAsyncComponent(() => import('./DialogCetak.vue'))
const openDialogCetak = ref(false)
const itemx = ref(null)

const filterredTable = computed(() => {
  const val = store?.form?.nota
  const arr = props?.pasien?.bankdarah
  // console.log('pasien ', props?.pasien)
  // console.log('pasien fisio', arr)
  return (val === 'SEMUA' || val === null || val === '') ? arr : arr?.filter(x => x?.rs2 === val)
})

const printItem = (item) => {
  console.log(item)
  itemx.value = item
  openDialogCetak.value = true
}

const $q = useQuasar()
function hapusItem (id) {
  $q.dialog({
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    store.hapusPermintaan(props?.pasien, id)
  }).onCancel(() => {
    // console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}
</script>

<template>
  <div class="fit column">
    <div v-if="filterredTable?.length" class="fit scroll q-pa-sm">
      <q-card
        v-for="item in filterredTable" :key="item"
        flat bordered class="full-width q-mb-sm"
      >
        <q-card-section>
          <div class="row items-center full-width justify-between relative-position">
            <div class="col-auto" style="max-width: 85%;">
              <div>NOTA : <b>{{ item?.nota_permintaan }}</b></div>
              <div><b>layanan :</b> <em>{{ store?.optionsApheresis?.find(x => x?.kodetindakan === item?.tindakan)?.namatindakan }}</em></div>
              <div><b>Golongan :</b> <em>{{ item?.golongan ?? '-' }} </em></div>
              <div><em>Qty :</em> <b>{{ item?.jumlah }}</b> <em>Transfusi Ke -</em> <b>{{ item?.rs13 }}</b></div>
              <div><em>Reaksi :</em> <b>{{ item?.reaksi }}</b> </div>
              <div><em>Ket :</em> <b>{{ item?.keterangan ?? '-' }}</b> </div>
              <div class="">
                <div>by : <em>{{ item?.perawatyanmeminta }}</em></div>
              </div>
            </div>
            <div class="col-grow">
              <div class="row reverse">
                <div class="column ">
                  <div class="self-end q-mb-sm">
                    <q-btn icon="icon-mat-delete" outline color="negative" round size="sm" @click="hapusItem(item?.id)" />
                  </div>
                  <div class="f-10 text-grey-8">
                    <div>{{ item?.tgl_permintaan }}</div>
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
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { usePermintaanApheresisStore } from 'src/stores/simrs/ranap/apheresis'
import { computed } from 'vue'

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
const store = usePermintaanApheresisStore()

const filterredTable = computed(() => {
  const val = store?.form?.nota
  const arr = props?.pasien?.apheresis
  console.log('pasien ', props?.pasien)
  // console.log('pasien fisio', arr)
  return (val === 'SEMUA' || val === null || val === '') ? arr : arr?.filter(x => x?.nota_permintaan === val)
})

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

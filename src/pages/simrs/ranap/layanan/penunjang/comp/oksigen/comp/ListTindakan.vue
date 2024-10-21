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
              <div><em>Ket :</em> <b>{{ store?.options?.find(x => x?.rs1 === item?.rs3)?.rs2 ?? '-' }}</b> </div>
              <div><em>Jumlah :</em> <b>{{ parseInt(item?.rs4 ?? 0) + parseInt(item?.rs5 ?? 0) }} X {{ item?.rs6 }}</b> </div>
              <div class="">
                <!-- <div>by : <em>{{ item?.userinput }}</em></div> -->
              </div>
            </div>
            <div class="col-grow">
              <div class="row reverse">
                <div class="column ">
                  <div class="self-end q-mb-sm">
                    <q-btn icon="icon-mat-delete" outline color="negative" round size="sm" @click="hapusItem(item?.id)" />
                  </div>
                  <div class="f-10 text-grey-8">
                    <div>{{ item?.rs2 }}</div>
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
import { computed } from 'vue'
import { usePermintaanOksigenStore } from 'src/stores/simrs/ranap/oksigen'

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
const store = usePermintaanOksigenStore()

const filterredTable = computed(() => {
  const arr = props?.pasien?.oksigen
  return arr
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

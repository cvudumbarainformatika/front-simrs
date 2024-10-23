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
              <div><em>isk :</em> <b>{{ item?.isk ?? '-' }}</b> </div>
              <div><em>iadp :</em> <b>{{ item?.iadp ?? '-' }}</b> </div>
              <div><em>ido :</em> <b>{{ item?.ido ?? '-' }}</b> </div>
              <div><em>Plebitis :</em> <b>{{ item?.plebitis ?? '-' }}</b> </div>
              <div><em>Vap :</em> <b>{{ item?.vap ?? '-' }}</b> </div>
              <div class="">
                <div>by : <em>{{ store?.perawats?.find(x => x?.kdpegsimrs === item?.user )?.nama ?? '-' }}</em></div>
              </div>
            </div>
            <div class="col-grow">
              <div class="row reverse">
                <div class="column ">
                  <div class="self-end q-mb-sm">
                    <q-btn icon="icon-mat-delete" outline color="negative" round size="sm" @click="hapusItem(item?.id)" />
                  </div>
                  <div class="f-10 text-grey-8">
                    <div>{{ item?.tgl }}</div>
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
import { useHaisRanapStore } from 'src/stores/simrs/ranap/hais'

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
const store = useHaisRanapStore()

const filterredTable = computed(() => {
  const arr = props?.pasien?.hais
  // console.log('pasien fisio', arr)
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

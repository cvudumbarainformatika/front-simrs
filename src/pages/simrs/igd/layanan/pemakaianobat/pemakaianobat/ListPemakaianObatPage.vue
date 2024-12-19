<template>
  <q-card
    flat
    bordered
    square
    class="full-height bg-teal-2"
    style="overflow: hidden;"
  >
    <q-bar
      class="bg-teal text-white z-top"
      style="width: inherit;"
    >
      <div class="f-12">
        Data Pemaikaian Obat
      </div>
      <q-space />
    </q-bar>
    <q-card-section
      style="padding:0"
      class="full-height bg-grey"
    >
      <div
        v-if="loadingaja"
        class="column full-height flex-center"
      >
        <div class="text-white">
          Harap Tunggu .....
        </div>
        <div class="text-white">
          Sinkron Data Ke DATABASE
        </div>
      </div>
      <div
        v-if="pasien?.pemberianobat?.length <= 0"
        class="column full-height flex-center"
      >
        <div class="text-white">
          Belum Ada data tersimpan
        </div>
      </div>
      <q-scroll-area
        v-else
        style="height:calc(100% - 32px);"
      >
        <q-list
          class="bg-white"
          separator
        >
          <transition-group name="list">
            <q-item
              v-for="(item , n) in lists"
              :key="n"
              class="list-move"
            >
              <q-item-section>
                <div class="row q-pb-sm">
                  <div class="col-12">
                    <q-item-label>
                      <span class="">Nama Obat </span>: <span class="text-weight-bold">{{ item?.mobat?.nama_obat }}</span>
                      <span class="text-italic">({{ item?.kdobat }})</span>
                    </q-item-label>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <q-item-label>
                      <span class="">Dosis </span>: <span class="text-weight-bold">{{ item?.dosis }}</span>
                    </q-item-label>
                  </div>
                  <div class="col-6">
                    <q-item-label>
                      <span class="">Satuan </span>: <q-badge outline color="indigo">
                        {{ item?.satuan }}
                      </q-badge>
                    </q-item-label>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <q-item-label>
                      <span class="">Pakai Pump </span>: <span class="text-weight-bold">{{ pump(item?.pump) }}</span>
                    </q-item-label>
                  </div>
                  <div class="col-6">
                    <q-item-label>
                      <span class="">Waktu Pemakaian </span>: <span class="text-weight-bold">{{ item?.waktupump ?? '-' }}</span>
                    </q-item-label>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <q-item-label>
                      <span class="">Route Pemakaian Obat</span>: <q-badge color="orange">
                        {{ item?.routepemberianobat }}
                      </q-badge>
                    </q-item-label>
                  </div>
                  <div class="col-6">
                    <q-item-label>
                      <span class="">Waktu Pemberian Obat </span>: <q-badge color="red">
                        {{ item?.tgl }}
                      </q-badge>
                    </q-item-label>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <q-item-label>
                      <q-badge color="primary">
                        {{ item?.datasimpeg?.nama }}
                      </q-badge>
                    </q-item-label>
                  </div>
                </div>
              </q-item-section>

              <q-item-section
                side
                v-if="bisaEditHapus"
              >
                <div class="q-gutter-sm">
                  <!-- <q-btn
                    flat
                    round
                    size="sm"
                    icon="icon-mat-edit"
                    @click="store.editForm(item)"
                  /> -->
                  <q-btn
                    flat
                    round
                    size="sm"
                    icon="icon-mat-delete"
                    color="negative"
                    @click="hapusItem(item.id)"
                  />
                </div>
              </q-item-section>
            </q-item>
          </transition-group>
          <q-separator />
        </q-list>
      </q-scroll-area>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { usePemakaianObatStore } from 'src/stores/simrs/igd/pemakaianobat'
import { computed } from 'vue'
const store = usePemakaianObatStore()
const $q = useQuasar()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  loadingaja: {
    type: Boolean,
    default: false
  },
  bisaEditHapus: {
    type: Boolean,
    default: true
  }
})

const lists = computed(() => {
  const arr = props.pasien?.pemberianobat
  // console.log('sasa', props.pasien)
  return arr?.sort((a, b) => { return b.id - a.id })
})

function pump (val) {
  if (val === '1' || val === 1) {
    return 'Ya'
  }
  else {
    return 'Tidak'
  }
}

// function getYT (val) {
//   if (val === 1 || val === '1') {
//     return 'Ya'
//   }
//   else if (val === 0 || val === '0') {
//     return 'Tidak'
//   }
//   else {
//     return '-'
//   }
// }

function hapusItem (id) {
  $q.dialog({
    dark: true,
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    // console.log('OK')
    store.deleteData(props.pasien, id)
  }).onCancel(() => {
    // console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

// function primarysurvex (val) {
//   if (val === '0' || val === 0) {
//     return '-'
//   }
//   else {
//     return val
//   }
// }

</script>

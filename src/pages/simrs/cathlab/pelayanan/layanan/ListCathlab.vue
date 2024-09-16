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
        Data Pelayanan Cathlab
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
        v-if="pasien?.cathlab?.length <= 0"
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
                <div class="row">
                  <div class="col-7">
                    <q-item-label
                      class="f-12"
                    >
                      <span class="">Nama Tindakan </span> : <span class="text-weight-bold">{{ item?.tarif?.nama_tindakan ?? '-' }}</span>
                    </q-item-label>
                    <q-item-label>
                      <span class="">Tarif : <span class="text-weight-bold">Rp. {{ formatDouble(item?.subtotal) }}</span>
                      </span>
                    </q-item-label>
                    <q-item-label>
                      <span class="">Keterangan : <span class="text-weight-bold">{{ item?.keterangan ?? '-' }}</span>
                      </span>
                    </q-item-label>
                    <q-item-label>
                      <span class="">Pelaksana 1 : <span class="text-weight-bold">{{ item?.pelaksana1?.nama }}</span>
                      </span>
                    </q-item-label>
                    <q-item-label>
                      <span class="">Pelaksana 2 : <span class="text-weight-bold">{{ item?.pelaksana2?.nama ?? '+' }}</span>
                      </span>
                    </q-item-label>
                  </div>
                </div>
              </q-item-section>

              <q-item-section
                side
              >
                <div class="q-gutter-sm">
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
import { formatDouble } from 'src/modules/formatter'
import { usePermintaanCathLab } from 'src/stores/simrs/penunjang/cathlab/permintaan'
import { computed } from 'vue'
const store = usePermintaanCathLab()

const $q = useQuasar()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  loadingaja: {
    type: Boolean,
    default: false
  }
})

const lists = computed(() => {
  const arr = props.pasien?.cathlab
  return arr?.sort((a, b) => { return b.id - a.id })
})

function hapusItem (id) {
  console.log('id', id)
  $q.dialog({
    dark: true,
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    store.deleteDataCathlab(props.pasien, id)
  }).onCancel(() => {
    // console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

</script>

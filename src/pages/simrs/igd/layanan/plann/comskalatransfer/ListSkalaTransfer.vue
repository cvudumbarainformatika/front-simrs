<template>
  <div class="fit column absolute">
    <div class="col full-height ">
      <q-card
        flat
        bordered
        square
        class="full-height "
        style="overflow: hidden;"
      >
        <q-bar
          class="bg-teal text-white z-top"
          style="width: inherit;"
        >
          <div class="f-12">
            Data Skala Transfer
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
            v-if="pasien?.skalatransfer?.length <= 0"
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
                      <div class="col-6">
                        <q-item-label>
                          <span class="">Tanggal </span> : <span class="text-weight-bold">{{ dateFullFormat(item.tgl) }}</span>
                        </q-item-label>
                      </div>
                      <div class="col-6">
                        <q-item-label>
                          <span class="">Airways </span> : <span class="text-weight-bold">{{ item.airways }}</span>
                        </q-item-label>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-6">
                        <q-item-label>
                          <span class="">Cardio </span> : <span class="text-weight-bold">{{ item.cardio }}</span>
                        </q-item-label>
                      </div>
                      <div class="col-6">
                        <q-item-label>
                          <span class="">Ecg monitor </span> : <span class="text-weight-bold">{{ item.ecgmonitor }}</span>
                        </q-item-label>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-6">
                        <q-item-label>
                          <span class="">Haemo Dinamik </span> : <span class="text-weight-bold">{{ item.haemodinamik }}</span>
                        </q-item-label>
                      </div>
                      <div class="col-6">
                        <q-item-label>
                          <span class="">Intravenusline </span> : <span class="text-weight-bold">{{ item.intravenusline }}</span>
                        </q-item-label>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-6">
                        <q-item-label>
                          <span class="">Kesadaran </span> : <span class="text-weight-bold">{{ item.kesadaran }}</span>
                        </q-item-label>
                      </div>
                      <div class="col-6">
                        <q-item-label>
                          <span class="">Lanjut Usia </span> : <span class="text-weight-bold">{{ item.lanjutusia }}</span>
                        </q-item-label>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-6">
                        <q-item-label>
                          <span class="">Prematuritas </span> : <span class="text-weight-bold">{{ item.prematurias }}</span>
                        </q-item-label>
                      </div>
                      <div class="col-6">
                        <q-item-label>
                          <span class="">Provesional Pacemaker </span> : <span class="text-weight-bold">{{ item.provesionalpacemaker }}</span>
                        </q-item-label>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-6">
                        <q-item-label>
                          <span class="">Respirasi </span> : <span class="text-weight-bold">{{ item.respirasi }}</span>
                        </q-item-label>
                      </div>
                      <div class="col-6">
                        <q-item-label>
                          <span class="">Respritarory Support </span> : <span class="text-weight-bold">{{ item.respritarorysupport }}</span>
                        </q-item-label>
                      </div>
                    </div>
                    <q-separator />
                    <div class="row">
                      <q-item-label class="q-mt-sm q-mb-sm">
                        <span>Skor : {{ item.scoretotal }} || Derajat Transfer : {{ item.drajattransfer }}</span>
                      </q-item-label>
                    </div>
                    <q-separator />
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
            </q-list>
          </q-scroll-area>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script setup>
import { date, useQuasar } from 'quasar'
import { useSkalaTransfer } from 'src/stores/simrs/igd/skalatransfer'
import { computed } from 'vue'

const store = useSkalaTransfer()
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
  const arr = props.pasien?.skalatransfer
  return arr?.sort((a, b) => { return b.id - a.id })
})

const dateFullFormat = (val) => {
  return date.formatDate(val, 'DD MMMM YYYY H:m:s')
}

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
</script>

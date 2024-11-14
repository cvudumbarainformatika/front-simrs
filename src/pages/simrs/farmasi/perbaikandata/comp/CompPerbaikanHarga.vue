<template>
  <q-dialog persistent @hide="hide()">
    <q-card style="width: 900px; height: 90vh; max-width: 90vw;">
      <q-bar class="bg-primary">
        <q-space />

        <q-btn
          v-close-popup
          dense
          flat
          color="white"
          icon="icon-mat-close"
          @click="()=>{store.openHarga=false}"
        >
          <q-tooltip class="bg-white text-primary">
            Close
          </q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section class="q-pa-sm">
        <div class="text-h6">
          Perbaikan Harga
        </div>
        <div v-if="store.loadingHarga" style="min-height: 500px;">
          <app-loading />
        </div>
        <div v-if="!store.loadingHarga && !Object.keys(store.detailHargas)?.length" style="min-height: 500px;">
          <app-no-data />
        </div>
        <div v-if="!store.loadingHarga && Object.keys(store.detailHargas)?.length">
          <div v-if="store.detailHargas?.reference?.length" class="q-mb-md">
            <div class="q-my-sm text-weight-bold f-14">
              Data Referensi
            </div>
            <div class="row items-center bg-dark text-white">
              <div class="col-auto" style="width: 5%;">
                No
              </div>
              <div class="col-2">
                Tgl Penerimaan
              </div>
              <div class="col-3">
                Nomor Penerimaan
              </div>
              <div class="col-2">
                Harga
              </div>
              <div class="col-1">
                No Batch
              </div>
              <div class="col-1">
                Exp
              </div>
              <div class="col-2 text-right">
                <div class="q-mr-sm">
                  #
                </div>
              </div>
            </div>
            <div v-for="(item, index) in store.detailHargas?.reference" :key="index">
              <div class="row items-center" :class="index % 2 === 0 ? 'bg-grey-2' : 'bg-grey-4'">
                <div class="col-auto" style="width: 5%;">
                  {{ index + 1 }}
                </div>
                <div class="col-2">
                  {{ dateFull( item?.tglpenerimaan) }}
                </div>
                <div class="col-3">
                  {{ item?.nopenerimaan }}
                </div>
                <div class="col-2">
                  {{ item?.harga }}
                </div>
                <div class="col-1">
                  {{ item?.nobatch }}
                </div>
                <div class="col-1">
                  {{ item?.tglexp }}
                </div>
                <div class="col-2 text-right">
                  <div class="q-mr-sm">
                    <q-radio v-model="store.detailHargas.id" :val="item?.id" dense />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="store.detailHargas?.mutasi?.length" class="q-mb-md">
            <div class="q-my-sm text-weight-bold f-14">
              Data Mutasi
            </div>
            <div class="row items-center bg-dark text-white">
              <div class="col-auto" style="width: 5%;">
                No
              </div>
              <div class="col-3">
                No Permintaan
              </div>
              <div class="col-2">
                Tgl Penerimaan
              </div>
              <div class="col-2">
                Nomor Penerimaan
              </div>
              <div class="col-1">
                Harga
              </div>
              <div class="col-1">
                No Batch
              </div>
              <div class="col-1">
                Exp
              </div>
              <div class="col-1 text-right">
                <div class="q-mr-sm">
                  #
                </div>
              </div>
            </div>
            <div v-for="(item, index) in store.detailHargas?.mutasi" :key="index">
              <div class="row items-center" :class="index % 2 === 0 ? 'bg-grey-2' : 'bg-grey-4'">
                <div class="col-auto" style="width: 5%;">
                  {{ index + 1 }}
                </div>
                <div class="col-3">
                  {{ item?.no_permintaan }}
                </div>
                <div class="col-2">
                  {{ dateFull(item?.tglpenerimaan) }}
                </div>
                <div class="col-2">
                  {{ item?.nopenerimaan }}
                </div>
                <div class="col-1">
                  {{ item?.harga }}
                </div>
                <div class="col-1">
                  {{ item?.nobatch }}
                </div>
                <div class="col-1">
                  {{ item?.tglexp }}
                </div>
                <div class="col-1 text-right">
                  <div class="q-mr-xs">
                    <div class="row justify-end">
                      <q-btn v-if="!item.edit" flat dense color="primary" icon="icon-mat-edit" @click="editHarga(item)">
                        <q-tooltip>Edit</q-tooltip>
                      </q-btn>
                      <q-btn v-if="item.edit" flat dense color="green" icon="icon-mat-check" @click="checkHarga(item)">
                        <q-tooltip>Sesuikan</q-tooltip>
                      </q-btn>
                      <q-btn v-if="item.edit" flat dense color="negative" icon="icon-mat-save" @click="saveHarga(item)" :loading="store.loadingFixHarga">
                        <q-tooltip>Simpan</q-tooltip>
                      </q-btn>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { dateFull } from 'src/modules/formatter'
import { notifErrVue } from 'src/modules/utils'
import { usePerbaikanDataFarmasiStore } from 'src/stores/simrs/farmasi/perbaikandata/perbaikandata'

const store = usePerbaikanDataFarmasiStore()

function editHarga (item) {
  console.log('item', item)
  item.edit = true
}

function checkHarga (item) {
  if (!store.detailHargas.id) return notifErrVue('Referensi belum dipilih')
  const data = store.detailHargas?.reference?.find(x => x.id === store.detailHargas.id)
  if (!data) return notifErrVue('Referensi tidak ditemukan')
  item.harga = data?.harga
  item.tglexp = data?.tglexp
  item.nobatch = data?.nobatch
  item.tglpenerimaan = data?.tglpenerimaan
  item.fixed = true
  console.log('item', item, data)
}
function saveHarga (item) {
  console.log('item', item)
  if (!item.fixed) return notifErrVue('Data belum disesuaikan')
  store.simpanPerbaikanHarga(item).then(() => {
    console.log('sudah simpan')
    item.edit = false
  })
  store.openHarga = false
}
function hide () {
  store.detailHargas = []
}
</script>

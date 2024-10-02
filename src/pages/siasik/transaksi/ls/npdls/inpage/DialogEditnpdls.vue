<template>
  <q-dialog persistent backdrop-filter="blur(4px)">
    <q-card style="min-width:80vw; max-width: 80vw;">
      <q-bar class="bg-black text-white">
        <div>Edit NPD-LS</div>
        <q-space />

        <q-btn dense flat icon="icon-mat-close" v-close-popup>
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <div class="col full-width">
          <div class="row justify-between">
            <div>
              <div class="text-weight-bold">
                {{ store.form.nonpdls }}
              </div>
              <div>
                PPTK : {{ store.form.pptk }}
              </div>
              <div>
                Kegiatan : {{ store.form.kegiatanblud }}
              </div>
              <div>
                Pihak Ketiga : {{ store.form.penerima }}
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-form class="fit" ref="formNpdLS" @submit="onSimpan">
          <div class="row">
            <template v-if="store.form.serahterimapekerjaan === '3'">
              <app-input-simrs
                class="q-pa-sm q-gutter-y-xs"
                style="width: 40%;"
                v-model="store.form.noserahterima"
                label="Nomor Serahterima"
                disable
                outlined
                :autofocus="false"
                :valid="{required:true}"
              />

              <div class="row items-center">
                <q-btn
                  color="dark"
                  round
                  size="sm"
                  :disable="store.disabled"
                  :loading="store.loading"
                  icon="icon-mat-add"
                  :source="store.dariserahterima"
                  :key="store.form.kodepenerima"
                  @click=" () => {
                    carisrt.reqs.kodebast = ''
                    store.openDialogFarmasi = true}"
                />
              </div>
            </template>
            <select-serahterima
              v-model="store.openDialogFarmasi"
              :key="carisrt.reqs.kodepenerima"
            />
          </div>
          <div class="row items-center float-left q-pt-md q-pa-sm q-gutter-y-xs">
            <app-btn
              label="Simpan NPD-LS"
              :disable="store.loading"
              :loading="store.loading"
              @click="onSimpan()"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { notifErrVue } from 'src/modules/utils'
import { dataBastFarmasi } from 'src/stores/siasik/transaksi/ls/npdls/databast'
import { formNotaPermintaanDanaLS } from 'src/stores/siasik/transaksi/ls/npdls/formnpdls'
import { defineAsyncComponent } from 'vue'

const SelectSerahterima = defineAsyncComponent(() => import('./SelectSerahterima.vue'))
const store = formNotaPermintaanDanaLS()
const carisrt = dataBastFarmasi()
function onSimpan (val) {
  // if (store.reqs.subtotal > store.itembelanja.sisapagu) {
  //   return notifErrVue('Maaf Pengajuan Lebih dari Sisa Pagu')
  // }
  const unikjumlah = store.form.rincians.map((x) => x.koderek108)
  const unik = unikjumlah.length ? [...new Set(unikjumlah)] : []
  const arr = []
  for (let i = 0; i < unik.length; i++) {
    const el = unik[i]
    const obj = {
      jumlah: store.form.rincians.filter((z) => z.koderek108 === el).map((x) => parseFloat(x.nominalpembayaran)).reduce((a, b) => a + b, 0),
      koderek108: el,
      sisapagu: store.form.rincians.filter((z) => z.koderek108 === el)[0]?.sisapagu

    }
    console.log('jumlahnya', obj?.jumlah)
    console.log('sisa', obj?.sisapagu)
    if (obj?.jumlah > obj?.sisapagu) {
      return notifErrVue('Maaf Pengajuan Lebih dari Sisa Pagu')
    }
    arr.push(obj)
    const subtotal = arr.map((x) => x.jumlah).reduce((x, y) => x + y, 0)
    store.reqs.subtotal = subtotal
  }
  store.simpanNpdls()
  // return notifSuccessVue('Sukses Disimpan')

  // console.log('sisa', carisrt.itembelanja)
  // console.log('realisas', store.reqs.jmlperkoderek108)
  // console.log('tidak boleh', store.reqs.subtotal > carisrt.itembelanja.sisapagu)

  // store.form.rincians.push(store.rinci = val)
  // .then(() => {
  //   store.resetFORM()
  //   carisrt.itembelanja = []
  //   store.form.rincians = {}
  // })
}
</script>

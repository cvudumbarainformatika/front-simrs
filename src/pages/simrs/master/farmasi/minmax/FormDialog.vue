<template>
  <q-dialog>
    <app-card
      class="my-card"
      title="Form Min Max Obat"
      desc="Input data Min Max Obat per ruangan"
    >
      <template #content>
        <div>
          <div class="row q-col-gutter-md q-mb-sm">
            <div class="col-md-6 col-xs-12">
              <app-autocomplete-new
                :model="store.form.kodeobat"
                label="Cari Obat"
                outlined
                autocomplete="namaobat"
                option-value="kodeobat"
                option-label="namaobat"
                :source="store.obats"
                :loading="store.loading"
                @on-select="store.obatSelected"
                @clear="clearObat"
                @buang="obatInput"
                @new-val="obatSet"
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-autocomplete-new
                :model="store.form.koderuang"
                label="Cari Ruang"
                outlined
                autocomplete="ruang"
                option-value="kode"
                :option-label="['ruang','keterangan']"
                :hint="'kode ' + store.form.koderuang"
                :source="store.ruangs"
                :loading="store.loading"
                @on-select="store.ruangSelected"
                @clear="clearRuang"
                @buang="ruangInput"
                @new-val="ruangSet"
              />
            </div>
          </div>
          <div class="row q-col-gutter-md q-mb-sm">
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.min"
                label="Minimal"
                type="number"
                outlined
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.max"
                label="maksimal"
                outlined
                type="number"
              />
            </div>
          </div>

          <q-separator class="q-my-md" />
          <div class="text-right">
            <app-btn
              color="dark"
              label="Cancel"
              class="q-mr-md"
              @click="onReset"
            />
            <app-btn
              label="Simpan"
              :loading="store.loading"
              @click="onSubmit"
            />
          </div>
        </div>
      </template>
    </app-card>
  </q-dialog>
</template>
<script setup>
import { useMasterFarmasiMinMaxObatStore } from 'src/stores/simrs/master/farmasi/minmax/minmax.js'
const store = useMasterFarmasiMinMaxObatStore()
function onSubmit() {
  console.log('on Submit', store.form)
  store.simpanData().then(() => {
    store.setOpen()
  })
}
function onReset() {
  store.setOpen()
  console.log('on Reset')
}
// const timer = setInterval(cari, 1000)
// function cari() {
//   console.log(timer)
// }
function clearObat() {
  store.setForm('kodeobat', '')
}
function obatSet(val) {
  store.filterObat = val
  store.getDataObat()
}
function obatInput(val) {
  store.filterObat = val
  if (val.length % 2 === 0) {
    store.getDataObat()
  }
}
function clearRuang() {
  store.setForm('koderuang', '')
}
function ruangSet(val) {
  store.filterRuang = val
  store.getDataRuang()
}
function ruangInput(val) {
  store.filterRuang = val
  if (val.length % 2 === 0) {
    store.getDataRuang()
  }
}
</script>

<template>
  <app-fullscreen>
    <app-card
      class="my-card"
      title="Form Min Max Obat"
      desc="Input data Min Max Obat per ruangan"
    >
      <template #content>
        <div>
          <div class="row q-col-gutter-md">
            <div class="col-md-6 col-xs-12">
              <app-autocomplete-new
                :model="store.form.koderuang"
                label="Cari Ruang"
                outlined
                autocomplete="ruang"
                option-value="kode"
                :option-label="['ruang','keterangan']"
                :source="store.ruangs"
                :loading="store.loading"
                @on-select="store.ruangSelected"
                @clear="clearRuang"
                @buang="ruangInput"
                @new-val="ruangSet"
              />
            </div>
            <!-- <div class="col-md-6 col-xs-12">
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
            </div> -->
          </div>
          <div
            v-if="store.form.koderuang"
            class="row q-mb-sm text-grey text-italic"
          >
            {{ 'kode ' + store.form.koderuang }}
          </div>
          <!-- <div class="row q-col-gutter-md q-mb-sm">
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
          </div> -->

          <q-separator class="q-my-sm" />
          <div class="row q-col-gutter-md q-mb-sm">
            <div class="col-6">
              <app-input
                v-model="store.filterObat"
                label="Cari Obat"
                valid
                outlined
                debounce="800"
                :loading="store.loading"
                @update:model-value="obatInput"
              />
            </div>
          </div>
          <!-- <div class="text-right">
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
          </div> -->

          <!-- list Obat -->
          <div v-if="store.form.koderuang">
            <div
              v-for="(obat,i) in store.filteredObats"
              :key="i"
              class="row no-wrap items-center"
            >
              <div class="col-1">
                {{ obat.kd_obat }}
              </div>
              <div class="col-3">
                <div class="row items-center">
                  <div>
                    {{ obat.namaobat }}
                  </div>
                  <div class="q-ml-xs text-italic f-10">
                    (<span class="text-weight-bold"> {{ obat.satuan_k }}</span>)
                  </div>
                </div>
              </div>
              <div class="col-2">
                <div class="row no-wrap">
                  <app-input
                    v-model="obat.min"
                    label="Minimal"
                    outlined
                    valid
                    @update:model-value="setMin($event,obat)"
                  />
                  <app-input
                    v-model="obat.max"
                    label="maksimal"
                    outlined
                    valid
                    @update:model-value="setMax($event,obat)"
                    @keyup.enter="onSubmit(obat)"
                  />
                </div>
              </div>
              <div class="col-1">
                <app-btn
                  label=""
                  flat
                  icon="icon-mat-save"
                  :loading="store.loading || obat.loading"
                  @click="onSubmit(obat)"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </app-card>
  </app-fullscreen>
</template>
<script setup>
import { notifErrVue } from 'src/modules/utils'
import { useMasterFarmasiMinMaxObatStore } from 'src/stores/simrs/master/farmasi/minmax/minmax.js'
const store = useMasterFarmasiMinMaxObatStore()
function onSubmit(val) {
  console.log('on Submit', val)
  if (val.max > 0 && val.min > 0) {
    store.simpanData(val) // .then(() => {
  }
  //   store.setOpen()
  // })
}
function setMin(evt, val) {
  const min = isNaN(parseInt(evt)) ? 0 : parseInt(evt)
  val.min = min
  console.log('evt', evt)
  console.log('val', val)
}
function setMax(evt, val) {
  const max = isNaN(parseInt(evt)) ? 0 : parseInt(evt)
  val.max = max
  console.log('evt', evt)
  console.log('val', val)
}
// function onReset() {
//   store.setOpen()
//   console.log('on Reset')
// }
// const timer = setInterval(cari, 1000)
// function cari() {
//   console.log(timer)
// }
// function clearObat() {
//   store.setForm('kodeobat', '')
// }
// function obatSet(val) {
//   store.filterObat = val
//   store.getDataObat()
// }
function obatInput(val) {
  store.filterObat = val
  const needle = val.toLowerCase()
  const splits = ['namaobat', 'kd_obat']
  const multiFilter = (data = [], filterKeys = [], value = '') =>
    data.filter((item) =>
      filterKeys.some(
        (key) =>
          item[key]?.toString()?.toLowerCase()?.includes(value.toLowerCase()) &&
    item[key]
      )
    )
  const filteredData = multiFilter(store.obats, splits, needle)
  store.filteredObats = filteredData
  if (!filteredData.length && store.form.kd_ruang) {
    store.getDataObatByRuang()
  } else {
    if (!store.form.kd_ruang) {
      notifErrVue('ruangan belum dipilih')
    }
  }
  console.log('obat input', val, store.obats, store.filteredObats)
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

<template>
  <q-dialog
    full-width
    full-height
  >
    <q-card style="width:70vw !important;">
      <q-card-section>
        <div class="f-14 text-weight-bold">
          Form Troble
        </div>
        <div class="title-desc">
          Input Dispenssi Pegawai Ketika ada Trouble
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="row q-col-qutter-md">
          <div class="col-md-6 col-sm-12 col-xs-12 col-lg-6 col-xl-6">
            <!-- searc -->
            <div class="row q-col-gutter-md">
              <div class="col-6">
                <q-input
                  v-model="store.params.q"
                  debounce="500"
                  filled
                  placeholder="Pencarian pegawai"
                  dense
                  @update:model-value="store.searchPegawai()"
                >
                  <template #append>
                    <q-icon name="icon-mat-search" />
                  </template>
                </q-input>
              </div>
              <div class="col-6">
                <q-select
                  v-model="ruang"
                  dense
                  outlined
                  option-value="koderuangan"
                  option-label="namaruang"
                  behavior="menu"
                  map-options
                  emit-value
                  :options="store.ruangan"
                  label="Ruangan"
                  style="min-width:150px"
                  @update:model-value="changeRuang"
                />
              </div>
            </div>
            <div class="row q-col-gutter-sm q-mt-xs items-center">
              <div class="col-12 text-right">
                <app-btn
                  class="q-mr-sm"
                  label="Ambil data pegawai shift"
                  :loading="store.loading"
                  :disable="store.loading"
                  @click="store.getPegawai()"
                />
                <app-btn
                  label="Pilih Semua"
                  :loading="store.loading"
                  :disable="store.loading"
                  @click="store.allList()"
                />
              </div>
            </div>
            <!-- list -->
            <div class="q-my-md">
              <ListPegawai :key="store.pegawais" />
            </div>
          </div>
          <!-- list select -->
          <div class="col-md-6 col-sm-12 col-xs-12 col-lg-6 col-xl-6">
            <div class="q-ml-md">
              <q-form
                @submit.prevent="onSubmit"
                @reset="onReset"
              >
                <div class="q-mb-md">
                  <div class="row no-wrap q-col-gutter-sm">
                    <app-input-date
                      class="q-mb-md"
                      :model="store.form.tanggal"
                      label="Tanggal"
                      style="width:30%"
                      outlined
                      @set-model="(val)=> store.setForm('tanggal', val)"
                    />
                    <app-input-date
                      class="q-mb-md"
                      :model="store.params.mulai"
                      label="Jam Mulai"
                      style="width:30%"
                      :type-date="false"
                      outlined
                      @set-model="(val)=> store.setParamsGet('mulai', val)"
                    />
                    <app-input-date
                      class="q-mb-md"
                      :model="store.params.selesai"
                      label="Jam Selesai"
                      style="width:30%"
                      :type-date="false"
                      outlined
                      @set-model="(val)=> store.setParamsGet('selesai', val)"
                    />
                  </div>
                  <div class="row no-wrap q-col-gutter-sm">
                    <q-checkbox
                      v-model="store.form.dispen_masuk"
                      left-label
                      label="Dispen Jam Masuk"
                      checked-icon="icon-mat-task_alt"
                      unchecked-icon="icon-mat-panorama_fish_eye"
                    />
                    <q-checkbox
                      v-model="store.form.dispen_pulang"
                      left-label
                      label="Dispen Jam Pulang"
                      checked-icon="icon-mat-task_alt"
                      unchecked-icon="icon-mat-panorama_fish_eye"
                    />
                  </div>
                  <app-input
                    v-model="store.form.alasan"
                    label="alasan"
                    outlined
                  />
                </div>
                <q-scroll-area
                  style="height: 500px;"
                  class="bg-grey-2"
                >
                  <ListSelectPegawai />
                </q-scroll-area>
                <div class="q-mt-md">
                  <app-btn
                    label="Simpan"
                    class="q-mr-md"
                    type="submit"
                  />
                  <app-btn
                    label="Reset"
                    color="dark"
                    type="reset"
                  />
                </div>
              </q-form>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import ListPegawai from './trouble/ListPegawai.vue'
import ListSelectPegawai from './trouble/ListSelectPegawai.vue'
import { onMounted, ref } from 'vue'
import { notifErrVue } from 'src/modules/utils'
import { useQuasar } from 'quasar'
import { useLiburAbsenStore } from 'src/stores/simrs/pegawai/user/libur/libur'
import { useTroubleStore } from 'src/stores/simrs/pegawai/user/libur/trouble'

const $q = useQuasar()
const store = useTroubleStore()
const table = useLiburAbsenStore()

const ruang = ref('all')
const changeRuang = (val) => {
  store.filterByRuang(val)
}
onMounted(() => {
  store.setToday()
  store.getPegawai()
  store.autocomplete()
})

const onSubmit = () => {
  console.log('onSubmit')
  if (!store.list.length) {
    return notifErrVue('Maaf, Belum Ada Pegawai yang dipilih!')
  }
  store.saveData().then(() => {
    table.getDataTablePage()
    store.setIsOpen()
    store.resetList()
  })
}
const onReset = () => {
  console.log('onReset')
  $q.dialog({
    title: 'Konfirmasi',
    message: 'Apakah Benar Seluruh List akan dihapus?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    console.log('>>>> OK')
    store.resetList()
  }).onCancel(() => {
    console.log('>>>> Cancel')
  })
}
</script>

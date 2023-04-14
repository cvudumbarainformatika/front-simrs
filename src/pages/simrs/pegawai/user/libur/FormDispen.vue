<template>
  <q-dialog
    full-width
    full-height
  >
    <q-card style="width:70vw !important;">
      <q-card-section>
        <div class="f-14 text-weight-bold">
          Form Dispen
        </div>
        <div class="title-desc">
          Input Dispenssi Pegawai
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="row q-col-qutter-md">
          <div class="col-md-6 col-sm-12 col-xs-12 col-lg-6 col-xl-6">
            <!-- searc -->
            <div>
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
                  <app-input-date
                    class="q-mb-md"
                    :model="store.form.tanggal"
                    label="Tanggal"
                    style="width:40%"
                    outlined
                    @set-model="(val)=> store.setForm('tanggal', val)"
                  />
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
import ListPegawai from './dispen/ListPegawai.vue'
import ListSelectPegawai from './dispen/ListSelectPegawai.vue'
import { useDispenStore } from 'src/stores/simrs/pegawai/user/libur/dispen'
import { onMounted } from 'vue'
import { notifErrVue } from 'src/modules/utils'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const store = useDispenStore()
onMounted(() => {
  store.setToday()
  store.getPegawai()
})

const onSubmit = () => {
  console.log('onSubmit')
  if (!store.list.length) {
    return notifErrVue('Maaf, Belum Ada Pegawai yang dipilih!')
  }
  store.saveData()
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

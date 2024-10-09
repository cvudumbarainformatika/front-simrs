<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog
      v-model="store.dialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="full-width">
        <q-bar class="text-white bg-primary">
          <q-space />

          <q-btn dense flat icon="icon-mat-close" v-close-popup>
            <q-tooltip class="bg-white text-dark">
              Close
            </q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6 text-center text-weight-bold">
            <q-badge color="red" class="text-h6 text-center">
              No. Bukti:   {{ store?.form?.nobukti }}
            </q-badge>
          </div>
        </q-card-section>

        <q-form
          ref="refForm"
          class="full-height"
          @submit="onSubmit"
        >
          <q-card-section class="q-pt-none">
            <div class="container q-pa-md">
              <q-card class="items-center  q-pa-md full-width">
                <div class="row q-col-gutter-sm">
                  <div class="col-5">
                    <app-input-date-human
                      ref="reftanggal"
                      v-model="store.form.tanggal"
                      label="Tanggal"
                      outlined
                      standout="bg-yellow-3"
                      :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                    />
                  </div>
                  <div class="col-6">
                    <q-input
                      ref="refketerangan"
                      v-model="store.form.keterangan"
                      label="Keterangan"
                      outlined
                      dense
                      standout="bg-yellow-3"
                      :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                    />
                  </div>
                  <div class="col-1">
                    <q-btn type="submit" rounded color="primary" class="items-center" size="sm">
                      <q-icon left size="3em" name="icon-mat-add" />
                      <q-tooltip class="bg-red text-white">
                        Input Rincian
                      </q-tooltip>
                    </q-btn>
                  </div>
                </div>
              </q-card>
            </div>
            <div class="container q-px-md">
              <q-card class="items-center bg-white q-pa-xl full-width">
                <div class="row flex-center">
                  <div class="col items-center" v-if="store.loading">
                    <q-spinner-hourglass
                      color="purple"
                      size="4em"
                      class="items-center"
                    />
                  </div>
                  <div class="col" v-else>
                    <q-markup-table class="full-width" :separator="separator" flat bordered>
                      <thead>
                        <tr class="bg-primary text-white items-center">
                          <th class="text-weight-bold text-white">
                            Kode Rekening 50
                          </th>
                          <th class="text-weight-bold text-white">
                            Uraian  Rekening 50
                          </th>
                          <th class="text-weight-bold text-white">
                            Debet
                          </th>
                          <th class="text-weight-bold text-white">
                            Kredit
                          </th>
                          <th class="text-weight-bold text-white">
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(item , n) in store.rincis"
                          :key="n"
                          class="list-move"
                        >
                          <td>
                            <span>{{ item?.kodepsap13 }}</span>
                          </td>
                          <td>
                            <span>{{ item?.uraianpsap13 }}</span>
                          </td>
                          <td class="text-right">
                            <span>{{ item?.debet }}</span>
                          </td>
                          <td class="text-right">
                            <span>{{ item?.kredit }}</span>
                          </td>
                          <td class="text-right">
                            <q-btn rounded color="red" class="items-center" size="sm">
                              <q-icon left size="1em" name="icon-mat-delete" />
                              <q-tooltip class="bg-primary text-white">
                                Input Rincian
                              </q-tooltip>
                            </q-btn>
                          </td>
                        </tr>
                      </tbody>
                    </q-markup-table>
                  </div>
                </div>
              </q-card>
            </div>
          </q-card-section>
        </q-form>
      </q-card>
      <form-rincian-jurnal-umum />
    </q-dialog>
  </div>
</template>
<script setup>
import { usejurnalumummanual } from 'src/stores/siasik/akuntansi/jurnal/umummanual'
import { onBeforeMount, onMounted, ref } from 'vue'
import FormRincianJurnalUmum from './FormRincianJurnalUmum.vue'

const maximizedToggle = ref(true)
const store = usejurnalumummanual()
const separator = ref('cell')

const refForm = ref(null)
const reftanggal = ref(null)
const refketerangan = ref(null)
// const model = ref(null)

function onSubmit () {
  store.fixed = true
}

onMounted(() => {
  store.getRekenining50()
})

onBeforeMount(() => {
  store.form.nobukti = ''
  store.form.keterangan = ''
})

// function setTo (val) {
//   console.log('sa', val)
//   store.form.tanggal = val
// }

// function setToDisp (vaal) {
//   store.tanggal = vaal
// }
</script>

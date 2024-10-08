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
      <q-card class="text-white full-width">
        <q-bar class="bg-primary">
          <q-space />

          <q-btn dense flat icon="icon-mat-close" v-close-popup>
            <q-tooltip class="bg-white text-dark">
              Close
            </q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section class="q-pt-none">
          <div class="container q-pa-md">
            <q-card class="items-center bg-white q-pa-xl full-width">
              <div class="row q-col-gutter-sm">
                <div class="col-3">
                  <q-input
                    label="No. Bukti"
                    outlined
                    dense
                    disable
                  />
                </div>
                <div class="col-3">
                  <app-input-date-human
                    :model="store.tanggal"
                    label="Tanggal"
                    outlined
                    @rn-model="setTo"
                    @set-display="setToDisp"
                  />
                </div>
                <div class="col-6">
                  <q-input
                    label="Keterangan"
                    outlined
                    dense
                  />
                </div>
              </div>
            </q-card>
          </div>
          <div class="container q-px-md">
            <q-card class="items-center bg-white q-pa-xl full-width">
              <div class="row flex-center">
                <div class="col">
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
                      <tr>
                        <td>
                          <q-select
                            v-model="model"
                            label="Kode Rekening 50"
                            outlined
                            emit-value
                            map-options
                            option-label="uraian"
                            option-value="kodeall"
                            standout="bg-yellow-3"
                            dense
                            transition-show="flip-up"
                            transition-hide="flip-down"
                            :options="store.rekening50"
                            clearable
                            use-input
                            :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                            @filter="filterFn"
                            @update:model-value="(val) => store.rekening50(val)"
                          />
                          <!-- <template>
                            <q-item v-bind="scope.itemProps">
                              <q-item-section avatar>
                                <q-item-label> {{ scope.opt.name }} <br> </q-item-label>
                              </q-item-section>
                            </q-item>
                          </template> -->
                        </td>
                        <td>
                          <q-input
                            v-model="store.form.koderekeningx"
                            label="Kode Rekening 50"
                            outlined
                            standout="bg-yellow-3"
                            dense
                            :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </q-markup-table>
                </div>
              </div>
            </q-card>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script setup>
import { usejurnalumummanual } from 'src/stores/siasik/akuntansi/jurnal/umummanual'
import { onMounted, ref } from 'vue'

const maximizedToggle = ref(true)
const store = usejurnalumummanual()
const separator = ref('cell')
const model = ref(null)

const stringOptions = store.rekening50
const options = ref(stringOptions)

// eslint-disable-next-line no-unused-vars
const scope = ref()

function filterFn (val, update) {
  if (val === '') {
    update(() => {
      options.value = stringOptions

      // here you have access to "ref" which
      // is the Vue reference of the QSelect
    })
    return
  }
  update(() => {
    const needle = val.toLowerCase()

    options.value = stringOptions.filter(
      (v) => v.name.toString().toLowerCase().indexOf(needle) > -1
    )
  })
}

onMounted(() => {
  store.getRekenining50()
})

function setTo (val) {
  store.form.tanggal = val
}

function setToDisp (vaal) {
  store.tanggal = vaal
}
</script>

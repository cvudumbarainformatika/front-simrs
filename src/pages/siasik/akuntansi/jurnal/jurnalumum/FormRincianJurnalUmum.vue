<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="store.fixed">
      <q-card>
        <q-form
          ref="refForm"
          class="full-height"
          @submit="onSubmit"
        >
          <q-card-section>
            <div class="text-h6 text-center">
              Masukkan Kode Rekening 50 dan Jumlah Debet Kredit
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section style="max-height: 50vh" class="scroll">
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
              :options="options"
              clearable
              use-input
              :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
              @filter="filterFn"
              @update:model-value="(val) => store.rekening50(val)"
            />
            <!-- <template>
              <q-item v-bind="scope.options">
                <q-item-section avatar>
                  <q-item-label> {{ scope.opt.name }} <br> </q-item-label>
                </q-item-section>
              </q-item>
            </template> -->
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn flat label="Decline" color="primary" v-close-popup />
            <q-btn flat label="Accept" color="primary" v-close-popup />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>
<script setup>
import { usejurnalumummanual } from 'src/stores/siasik/akuntansi/jurnal/umummanual'
import { ref } from 'vue'

const store = usejurnalumummanual()
const model = ref(null)

const stringOptions = store.rekening50
const options = ref(stringOptions)

// eslint-disable-next-line no-unused-vars
const scope = ref()

function filterFn (val, update) {
  console.log('aaaaaa', val, update)
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
</script>

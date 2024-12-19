<template>
  <q-dialog v-model="store.fixed" transition-show="rotate" transition-hide="rotate">
    <q-card>
      <q-card-section>
        <div class="text-h6 text-center text-justify">
          {{ store.namaobat }}
        </div>
      </q-card-section>

      <q-separator />
      <q-form
        ref="refForm"
        @submit="onSubmit"
        class="column full-height"
      >
        <q-card-section class="flat">
          <div class="row q-py-sm">
            <div class="col-12">
              <q-input v-model="store.form.dosis" label="Dosis" outlined dense mask="##.#" type="number" />
            </div>
          </div>
          <div class="row q-pr-xs">
            <div class="col-12">
              <q-select
                v-model="store.form.satuan"
                label="Satuan"
                :options="options"
                option-label="nama"
                option-value="nama"
                emit-value
                map-options
                outlined
                dense
              />
            </div>
          </div>
          <div class="row" q-gutter-sm>
            <div class="col-12">
              <q-checkbox v-model="store.form.pump" val="Ya" label="Pakai Pump" color="teal" @update:model-value="(val) => cekpemakaian(val)" />
            </div>
          </div>
          <div class="row q-gutter-sm">
            <div class="col-6" v-if="store.form.pump === true">
              <app-input-date
                :model="store.form.tglpump"
                mask="date"
                outlined
                standout="bg-yellow-3"
                label="Tanggal Pemakaian Pump"
                @set-model="val=>store.form.tglpump=val"
                :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
              >
                <template #append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="date">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </app-input-date>
            </div>
            <div class="col-4" v-if="store.form.pump === true">
              <app-input-date
                :model="store.form.jampump"
                :type-date="false"
                outlined
                standout="bg-yellow-3"
                label="Jam Pemakaian Pump"
                @set-model="val=>store.form.jampump=val"
              >
                <template #append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="date">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </app-input-date>
            </div>
          </div>
          <div class="row q-py-sm">
            <div class="col-12 q-pr-xs">
              <q-select
                v-model="store.form.routepemberianobat"
                outlined
                dense
                label="Route Pemberian obat"
                :options="optionroutepemberianobat"
              />
            </div>
          </div>
          <div class="row q-gutter-sm">
            <div class="col-6">
              <app-input-date
                :model="store.form.tglpemberianobat"
                mask="date"
                outlined
                standout="bg-yellow-3"
                label="Tanggal Pemberian Obat"
                @set-model="val=>store.form.tglpemberianobat=val"
                :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
              >
                <template #append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="date">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </app-input-date>
            </div>
            <div class="col-4">
              <app-input-date
                :model="store.form.jampemberianobat"
                :type-date="false"
                outlined
                standout="bg-yellow-3"
                label="Jam Pemberian Obat"
                @set-model="val=>store.form.jampemberianobat=val"
              >
                <template #append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="date">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </app-input-date>
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn type="submit" label="SIMPAN" color="primary" :loading="store.loadingForm" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { date } from 'quasar'
import { usePemakaianObatStore } from 'src/stores/simrs/igd/pemakaianobat'
import { ref } from 'vue'

const store = usePemakaianObatStore()
const optionroutepemberianobat = ref(['IV', 'IM', 'SC', 'IC', 'PO'])

const refForm = ref('')

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  satuan: {
    type: Array,
    default: () => []
  }
})

const sekarang = Date.now()
store.form.tglpemberianobat = date.formatDate(sekarang, 'YYYY-MM-DD')
store.form.jampemberianobat = date.formatDate(sekarang, 'H:m')

function cekpemakaian (val) {
  if (val === true) {
    const sekarang = Date.now()
    store.form.tglpump = date.formatDate(sekarang, 'YYYY-MM-DD')
    store.form.jampump = date.formatDate(sekarang, 'H:m')
  }
  else {
    store.form.tglpump = ''
    store.form.jampump = ''
  }
}

// store.initReset()
const options = ref(props?.satuan)

function onSubmit () {
  store.saveData(props.pasien).then(() => {
    refForm.value.resetValidation()
  })
}
</script>

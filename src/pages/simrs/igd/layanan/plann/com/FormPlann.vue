<template>
  <div class="fit column absolute">
    <div class="col full-height ">
      <q-card
        flat
        bordered
        square
        class="full-height "
        style="overflow: hidden;"
      >
        <q-form
          ref="refForm"
          @submit="onSubmit"
          class="column full-height"
        >
          <q-card-section class="q-px-md q-py-xs bg-primary text-white col-auto full-width">
            <div class="row items-center justify-between">
              <div class="f-12 text-weight-bold">
                Form Plann
              </div>
              <div>
                <q-btn
                  flat
                  dense
                  size="md"
                  icon="icon-mat-history"
                >
                  <q-tooltip class="bg-dark text-white">
                    {{ tooltip }}
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
          </q-card-section>
          <q-card-section class="col full-height scroll">
            <div class="row q-col-gutter-sm">
              <div class="col-12">
                <span class="text-bold">Assesmen Nyeri</span>
                <q-option-group
                  v-model="store.form.panel"
                  inline
                  :options="[
                    { label: 'Rawat Inap', value: 'Rawat Inap' },
                    { label: 'Rujuk Ke Rumah Sakit Lain', value: 'Rujuk Ke Rumah Sakit Lain' },
                    { label: 'Pulang', value: 'Pulang' }
                  ]"
                />
              </div>
              <div class="col-12">
                <q-tab-panels v-model="store.form.panel" animated class="shadow-2 rounded-borders">
                  <q-tab-panel name="Rawat Inap">
                    <div class="row q-col-gutter-sm">
                      <div class="col-6">
                        <q-select
                          v-model="store.form.operasi"
                          label="Operasi"
                          :options="optionoperasi"
                          dense
                          outlined
                          standout="bg-yellow-3"
                          transition-show="flip-up"
                          transition-hide="flip-down"
                        />
                      </div>
                      <div class="col-6" v-if="store.form.operasi === 'Ya'">
                        <q-select
                          v-model="store.form.jenisoperasi"
                          label="Jenis Operasi"
                          :options="optionjenisoperasi"
                          dense
                          standout="bg-yellow-3"
                          outlined
                          transition-show="flip-up"
                          transition-hide="flip-down"
                        />
                      </div>
                      <div class="col-6" v-if="store.form.operasi === 'Ya'">
                        <app-input-date
                          :model="store.form.tgloperasi"
                          mask="date"
                          outlined
                          standout="bg-yellow-3"
                          label="Tanggal Operasi"
                          @set-model="val=>store.form.tgloperasi=val"
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
                      <div class="col-6" v-if="store.form.operasi === 'Ya'">
                        <q-select
                          v-model="store.form.ruangtujuan"
                          label="Ruang Tujuan"
                          :options="props.ruangranap"
                          map-options
                          option-label="rs2"
                          option-value="rs1"
                          dense
                          standout="bg-yellow-3"
                          outlined
                          emit-value
                          transition-show="flip-up"
                          transition-hide="flip-down"
                        />
                      </div>
                      <div class="col-12" v-if="store.form.operasi === 'Ya'">
                        <q-input v-model="store.form.keterangan" outlined standout="bg-yellow-3" label="Keterangan" />
                      </div>
                    </div>
                  </q-tab-panel>
                  <q-tab-panel name="Rujuk Ke Rumah Sakit Lain">
                    <div class="row q-col-gutter-sm">
                      <div class="col-6">
                        <q-select
                          v-model="store.form.atasdasar"
                          label="Atas Dasar"
                          :options="atasdasar"
                          dense
                          outlined
                          standout="bg-yellow-3"
                          transition-show="flip-up"
                          transition-hide="flip-down"
                        />
                      </div>
                      <div class="col-6">
                        <q-select
                          v-model="store.form.jenispelayanan"
                          label="Jenis Pelayanan"
                          :options="optionjenispelayanan"
                          dense
                          standout="bg-yellow-3"
                          outlined
                          transition-show="flip-up"
                          transition-hide="flip-down"
                        />
                      </div>
                      <div class="col-6">
                        <app-input-date
                          :model="store.form.tglrujukan"
                          mask="date"
                          outlined
                          standout="bg-yellow-3"
                          label="Tanggal Rujukan"
                          @set-model="val=>store.form.tglrujukan=val"
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
                      <div class="col-6">
                        <app-input-date
                          :model="store.form.tglrencanakunjungan"
                          mask="date"
                          outlined
                          standout="bg-yellow-3"
                          label="Tanggal Rencana Kunjungan"
                          @set-model="val=>store.form.tglrencanakunjungan=val"
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
                      <div class="col-6">
                        <q-select
                          v-model="store.form.typefaskes"
                          label="Type Faskes"
                          :options="optiontypefaskes"
                          dense
                          standout="bg-yellow-3"
                          outlined
                          emit-value
                          transition-show="flip-up"
                          transition-hide="flip-down"
                        />
                      </div>
                      <div class="col-6">
                        <q-select
                          v-model="store.form.dirujuk"
                          label="Dirujuk"
                          :options="optiontypefaskes"
                          dense
                          standout="bg-yellow-3"
                          outlined
                          emit-value
                          transition-show="flip-up"
                          transition-hide="flip-down"
                        />
                      </div>
                      <div class="col-12" v-if="store.form.operasi === 'Ya'">
                        <q-input v-model="store.form.keterangan" outlined standout="bg-yellow-3" label="Keterangan" />
                      </div>
                    </div>
                  </q-tab-panel>
                </q-tab-panels>
              </div>
              <div class="col-12">
                <div
                  class="text-right"
                  style="margin-bottom: 50px;"
                >
                  <app-btn
                    color="primary"
                    label="Simpan"
                    tooltip="Simpan Data"
                    type="submit"
                    tip
                    :loading="store.loadingForm"
                  />
                </div>
              </div>
            </div>
          </q-card-section>
        </q-form>
      </q-card>
    </div>
  </div>
</template>
<script setup>
import { usePlannStore } from 'src/stores/simrs/igd/plann'
import { ref } from 'vue'

const store = usePlannStore()

const optionoperasi = ref(['Ya', 'Tidak'])
const optionjenisoperasi = ref(['Ya', 'Tidak'])
const atasdasar = ref(['Tempat Penuh', 'Permintaan Pasien', 'Penanganan Lebih Lanjut'])
const optionjenispelayanan = ref(['Rawat Inap', 'Rawat Jalan'])
const optiontypefaskes = ref(['Penuh', 'Partial'])

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  ruangranap: {
    type: Object,
    default: null
  },
  triage: {
    type: Object,
    default: null
  },
  tooltip: {
    type: String,
    default: 'History Pasien'
  }
})

function onSubmit () {
  console.log('ssas')
}

store.formattanggal()

</script>

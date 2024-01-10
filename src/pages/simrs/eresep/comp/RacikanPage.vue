<template>
  <div
    class="bg-white column"
    style="height:90vh"
  >
    <div class="col-auto bg-primary text-white">
      <div class="q-pa-sm f-16">
        Input Obat Racikan
      </div>
    </div>
    <div class="col full-height relative-position">
      <q-scroll-area
        style="height: calc( 100% ); padding-bottom: 60px;"
      >
        <q-list
          separator
          bordered
        >
          <!-- Header nya Racikan -->
          <q-item
            class="bg-dark text-white"
          >
            <q-item-section style="width: 20%;">
              NAMA RACIKAN
            </q-item-section>
            <q-item-section
              side
              style="width:80%"
            >
              <div class="text-white row items-center q-col-gutter-sm full-width">
                <div
                  class="text-right col-2"
                >
                  Tipe Racikan
                </div>
                <div
                  class="text-center col-2"
                >
                  Jumlah (Bungkus/Kapsul/pot)
                </div>

                <div
                  class="col-2 text-right"
                >
                  Atr Pakai
                </div>
                <div
                  class="col text-right"
                >
                  Keterangan
                </div>
              </div>
            </q-item-section>
          </q-item>
          <!-- input nama Racikan -->
          <q-item
            class="q-my-sm"
          >
            <q-item-section style="width: 20%;">
              <app-input
                v-model="store.racikan.nama"
                label="Nama Racikan"
                outlined
              />
            </q-item-section>
            <q-item-section
              side
              style="width:80%"
            >
              <div class="row items-center q-col-gutter-sm full-width">
                <div
                  class="text-right col-2"
                >
                  <q-option-group
                    v-model="store.racikan.jenis"
                    :options="store.tipeRacikan"
                    color="primary"
                    class="q-ml-sm"
                    dense
                    inline
                  />
                  <!-- <div class="row q-my-xs items-center">
                  </div> -->
                </div>
                <div
                  class="text-right col-2"
                >
                  <app-input
                    v-model="store.racikan.jumlah_diminta"
                    label="Jumlah Racikan"
                    outlined
                    @update:model-value="setNumber($event,'jumlah_diminta')"
                  />
                </div>

                <div
                  class="col-2 text-right"
                >
                  <q-select
                    ref="refSigna"
                    v-model="signa"
                    label="Aturan Pakai"
                    use-input
                    dense
                    standout="bg-yellow-3"
                    option-label="signa"
                    outlined
                    :rules="[sigaValid]"
                    lazy-rules
                    no-error-icon
                    hide-bottom-space
                    hide-dropdown-icon
                    :options="store.signas"
                    @update:model-value="signaSelected"
                  />
                </div>
                <div
                  class="col text-right"
                >
                  <app-input
                    v-model="store.racikan.keterangan"
                    label="Keterangan"
                    outlined
                  />
                </div>
              </div>
            </q-item-section>
          </q-item>
          <div class="q-mt-lg f-14 bg-yellow q-pa-sm">
            Bahan Obat Racikan
          </div>
          <!-- Header nya Obat non DTD-->
          <q-item
            class="bg-dark text-white"
          >
            <q-item-section style="width: 20%;">
              OBAT
            </q-item-section>
            <q-item-section
              side
              style="width:80%"
            >
              <div class="text-white row items-center q-col-gutter-sm full-width">
                <div
                  class="text-right col-2"
                >
                  Jumlah
                </div>

                <div
                  class="col text-right"
                >
                  Keterangan
                </div>
              </div>
            </q-item-section>
          </q-item>
          <!-- input nya Obat non DTD-->
          <q-item
            class=""
          >
            <q-item-section style="width: 20%;">
              nama obat,stok alokasi, kandungan, dosis
            </q-item-section>
            <q-item-section
              side
              style="width:80%"
            >
              <div class=" row items-center q-col-gutter-sm full-width">
                <div
                  class="text-right col-2"
                >
                  Jumlah
                </div>

                <div
                  class="col text-right"
                >
                  Keterangan
                </div>
              </div>
            </q-item-section>
          </q-item>
          <!-- Header nya Obat DTD-->
          <q-item
            class="bg-dark text-white"
          >
            <q-item-section style="width: 20%;">
              OBAT
            </q-item-section>
            <q-item-section
              side
              style="width:80%"
            >
              <div class="text-white row items-center q-col-gutter-sm full-width">
                <div
                  class="text-right col-2"
                >
                  Dosis
                </div>
                <div
                  class="text-right col-2"
                >
                  Satuan
                </div>
                <div
                  class="text-right col-2"
                >
                  Jumlah
                </div>

                <div
                  class="col text-right"
                >
                  Keterangan
                </div>
              </div>
            </q-item-section>
          </q-item>
          <!-- input nya Obat DTD-->
          <q-item
            class=""
          >
            <q-item-section style="width: 20%;">
              nama obat,stok alokasi, kandungan, dosis
            </q-item-section>
            <q-item-section
              side
              style="width:80%"
            >
              <div class=" row items-center q-col-gutter-sm full-width">
                <div
                  class="text-right col-2"
                >
                  Dosis
                </div>
                <div
                  class="text-right col-2"
                >
                  Satuan
                </div>
                <div
                  class="text-right col-2"
                >
                  Jumlah
                </div>

                <div
                  class="col text-right"
                >
                  Keterangan
                </div>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
      <div class="absolute-bottom q-pa-sm bg-yellow-3 row items-center justify-between">
        ada
      </div>
    </div>
  </div>
</template>
<script setup>
import { usePermintaanEResepStore } from 'src/stores/simrs/farmasi/permintaanresep/eresep'
import { ref } from 'vue'

// eslint-disable-next-line no-unused-vars
const store = usePermintaanEResepStore()

function setNumber(evt, key) {
  const inc = evt.includes('.')
  const ind = evt.indexOf('.')
  const panj = evt.length
  const nilai = isNaN(parseFloat(evt)) ? 0 : (inc && (ind === (panj - 1)) ? evt : parseFloat(evt))
  store.setRacikan(key, nilai)
}
const signa = ref('')
function signaSelected(val) {
  store.setRacikan('aturan', val?.signa)
  store.setRacikan('jumlahdosis', parseFloat(val?.jumlah))
  if (parseFloat(store.racikan.jumlah_diminta) > 0) {
    const kons = store.racikan.jumlah_diminta / parseFloat(val?.jumlah)
    store.setRacikan('konsumsi', kons)
  }
}
function sigaValid (val) {
  return (val !== null && val !== '') || 'Harap diisi'
}
</script>

<template>
  <div class="bg-white full-height column">
    <div class="col-auto bg-primary text-white">
      <div class="q-pa-sm">
        Form Resep Dokter
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
          <!-- Header nya -->
          <q-item
            class="bg-dark text-white"
          >
            <q-item-section style="width: 50%;">
              NAMA OBAT
            </q-item-section>
            <q-item-section
              side
              style="width:50%"
            >
              <div class="text-white row items-center q-col-gutter-sm full-width">
                <div
                  class="text-right col-2"
                >
                  Jumlah
                </div>
                <div
                  class="col-3 text-right"
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
          <!-- Inputan -->
          <q-item>
            <q-item-section
              style="width: 50%;"
              class="relative-position"
            >
              <q-input
                v-model="namaObat"
                placeholder="Cari Obat / tekan Alt + Enter untuk racikan"
                dense
                standout="bg-yellow-3"
                outlined
                debounce="800"
                class="full-width"
                @keyup.alt.enter="racikan"
                @focus="carObat=true"
                @blur="carObat=false"
                @update:model-value="cariObat"
              >
                <template #prepend>
                  <q-icon name="icon-mat-search" />
                </template>
              </q-input>
              <q-card
                v-if="carObat"
                class="absolute full-width"
                style="margin-top: 65px"
              >
                <q-card-section style="padding:0px">
                  <q-list style="min-width: 100px">
                    <q-item
                      v-if="Obats.length && !loadingObat"
                      clickable
                    >
                      <q-item-section>New tab</q-item-section>
                    </q-item>
                    <q-item
                      v-if="!Obats.length && !loadingObat"
                      clickable
                    >
                      <q-item-section>
                        <div class="text-italic">
                          Tidak ada data
                        </div>
                      </q-item-section>
                    </q-item>
                    <q-item
                      v-if="loadingObat"
                      clickable
                    >
                      <q-item-section>
                        <div class="text-italic">
                          Tunngu sebentar ...
                        </div>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </q-item-section>
            <q-item-section
              side
              style="width:50%"
            >
              <div class="text-white row items-center q-col-gutter-sm full-width">
                <div
                  class="text-right col-2"
                >
                  <q-input
                    placeholder="Qty"
                    dense
                    standout="bg-yellow-3"
                    outlined
                  />
                </div>
                <div
                  class="col-4 text-right"
                >
                  <q-input
                    placeholder="Aturan Pakai"
                    dense
                    standout="bg-yellow-3"
                    outlined
                  />
                </div>
                <div
                  class="col text-right"
                >
                  <q-input
                    placeholder="Keterangan"
                    dense
                    standout="bg-yellow-3"
                    outlined
                    class="full-width"
                  />
                </div>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
      <div class="absolute-bottom q-pa-sm bg-yellow-3 row items-center justify-between">
        <div class="q-gutter-sm">
          <q-btn color="dark">
            Simpan Resep
          </q-btn>
          <q-btn color="negative">
            Reset Resep
          </q-btn>
        </div>
        <div>
          <q-btn color="primary">
            Kirim Resep
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { onMounted, ref } from 'vue'

const props = defineProps({
  pasien: { type: Object, default: null },
  depo: { type: String, default: '' }
})
onMounted(() => {
  console.log('depo', props?.depo, props.pasien)
})
const namaObat = ref('')
const carObat = ref(false)
const loadingObat = ref(false)
const Obats = ref([])
function racikan() {
  console.log('ok')
  alert('oooi')
}
// eslint-disable-next-line no-unused-vars
const depos = [
  { nama: 'Floor Stock 1 (AKHP)', value: 'Gd-03010101', jenis: 't' },
  { nama: 'Depo Rawat inap', value: 'Gd-04010102', jenis: 'rnp' },
  { nama: 'Depo OK', value: 'Gd-04010103', jenis: 'ok' },
  { nama: 'Depo Rawat Jalan', value: 'Gd-05010101', jenis: 'rjl' },
  { nama: 'Depo IGD', value: 'Gd-02010104', jenis: 'igd' }
]
function cariObat(val) {
  // const depo = depos.filter(pa => pa.jenis === props.depo)
  console.log('depo', props?.depo, props.pasien)
  const param = {
    groups: props?.pasien?.groups,
    kdruang: props?.user?.kdruangansim
  }
  console.log('obat', val, namaObat.value)
  loadingObat.value = true
  const params = { params: param }
  return new Promise(resolve => {
    api.get('v1/simrs/farmasinew/depo/lihatstokobateresep', params)
      .then(resp => {
        loadingObat.value = false
        this.obats = resp.data?.dataobat
        console.log(resp.data)
        resolve(resp)
      })
      .catch(() => { loadingObat.value = false })
  })
}
</script>

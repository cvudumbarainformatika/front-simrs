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
              class="relative-position full-height"
            >
              <q-select
                ref="refObat"
                v-model="store.namaObat"
                use-input
                label="Cari Obat / tekan Alt + Enter untuk racikan"
                dense
                option-label="namaobat"
                option-value="kodeobat"
                standout="bg-yellow-3"
                outlined
                input-debounce="800"
                class="full-width"
                hide-dropdown-icon
                :rules="[obatValid]"
                lazy-rules
                hide-bottom-space
                no-error-icon
                :options="store.Obats"
                :loading="store.loadingObat"
                @keyup.alt.enter="racikan"
                @input-value="inputObat"
                @update:model-value="obatSelected"
              >
                <template #prepend>
                  <q-icon name="icon-mat-search" />
                </template>
                <template #option="scope">
                  <q-item v-bind="scope.itemProps">
                    <div
                      v-if="scope.opt.namaobat"
                    >
                      {{ scope.opt.namaobat }}
                    </div>
                    <div
                      v-if="scope.opt.kandungan"
                      class="q-ml-xs q-mr-xs text-deep-orange"
                    >
                      ({{ scope.opt.kandungan }})
                    </div>
                    <div
                      v-if="scope.opt.stokalokasi"
                      class="q-ml-xs text-weight-bold tetx-green"
                    >
                      {{ scope.opt.stokalokasi }}
                    </div>
                    <div
                      v-if="scope.opt.satuankecil"
                      class="q-ml-xs text-primary"
                    >
                      {{ scope.opt.satuankecil }}
                    </div>
                  </q-item>
                </template>
                <template #no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
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
                    ref="refQty"
                    v-model="store.form.jumlah_diminta"
                    label="Qty"
                    dense
                    :rules="[val=> parseFloat(val) >= 1 || 'lebih besar dari 0']"
                    lazy-rules
                    no-error-icon
                    hide-bottom-space
                    standout="bg-yellow-3"
                    outlined
                    @update:model-value="setJumlah"
                  />
                </div>
                <div
                  class="col-4 text-right"
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
                  <q-input
                    v-model="store.form.keterangan"
                    label="Keterangan"
                    dense
                    standout="bg-yellow-3"
                    outlined
                    class="full-width"
                  />
                </div>
              </div>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section />
            <q-item-section>
              <div class="text-right q-mr-sm">
                <q-btn
                  color="dark"
                  dense
                  no-caps
                  :loading="store.loading"
                  :disable="store.loading"
                  @click="simpanObat"
                >
                  Simpan Obat
                </q-btn>
              </div>
            </q-item-section>
          </q-item>
          <!-- hasil Inputan -->
          <template v-if="store.listPemintaanSementara.length">
            <q-item
              v-for="(item, i) in store.listPemintaanSementara"
              :key="i"
            >
              <!-- {{ item }} -->
              <q-item-section style="width: 50%;">
                <div class="row">
                  {{ item?.mobat?.namaobat }}
                </div>
                <div class="row text-italic f-10">
                  {{ item?.kdobat }}
                </div>
              </q-item-section>
              <q-item-section
                side
                style="width:50%"
              >
                <div class="row items-center q-col-gutter-sm full-width">
                  <div
                    class="text-right col-2"
                  >
                    {{ item?.jumlah }}
                  </div>
                  <div
                    class="col-3 text-right"
                  >
                    {{ item?.aturan }}
                  </div>
                  <div
                    class="col text-right"
                  >
                    {{ item?.keterangan }}
                  </div>
                </div>
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-scroll-area>
      <div class="absolute-bottom q-pa-sm bg-yellow-3 row items-center justify-between">
        <div class="q-gutter-sm">
          <!-- <q-btn color="negative">
            Reset Resep
          </q-btn> -->
        </div>
        <div>
          <q-btn
            color="primary"
            @click="store.selesaiResep"
          >
            Kirim Resep
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { api } from 'src/boot/axios'
// import { notifErrVue } from 'src/modules/utils'
import { onMounted, ref } from 'vue'
import { usePermintaanEResepStore } from 'src/stores/simrs/farmasi/permintaanresep/eresep'

const props = defineProps({
  pasien: { type: Object, default: null },
  depo: { type: String, default: '' }
})
const store = usePermintaanEResepStore()
onMounted(() => {
  console.log('depo', props?.depo, props.pasien)
  store.pasien = props?.pasien
  store.depo = props?.depo
  store.getSigna()
  setPasien()
})
function setPasien() {
  const val = props?.pasien
  const temp = val?.diagnosa?.map(x => x?.rs3 + ' - ' + x?.masterdiagnosa?.rs4)
  const diag = temp?.length ? temp.join(', ') : '-'
  if (val) {
    store.setForm('noreg', val.noreg)
    store.setForm('norm', val.norm)
    store.setForm('groupsistembayar', val.groups)
    store.setForm('sistembayar', val.kodesistembayar ?? val?.kdsistembayar)
    store.setForm('dokter', val.kodedokter)
    store.setForm('diagnosa', diag ?? '-')
    store.cariSimulasi(val?.noreg)
    if (props?.depo === 'rjl') store.getBillRajal(val)
    if (props?.depo === 'rnp') store.getBillRanap(val)
    if (props?.depo === 'igd') store.getBillIgd(val)
    // store.getBillRajal(val)
  }
}

// const namaObat = ref('')
// const carObat = ref(false)
// const loadingObat = ref(false)
// const Obats = ref([])

function racikan() {
  console.log('ok')
  alert('oooi')
}
// eslint-disable-next-line no-unused-vars
// const depos = [
//   { nama: 'Floor Stock 1 (AKHP)', value: 'Gd-03010101', jenis: 't' },
//   { nama: 'Depo Rawat inap', value: 'Gd-04010102', jenis: 'rnp' },
//   { nama: 'Depo OK', value: 'Gd-04010103', jenis: 'ok' },
//   { nama: 'Depo Rawat Jalan', value: 'Gd-05010101', jenis: 'rjl' },
//   { nama: 'Depo IGD', value: 'Gd-02010104', jenis: 'igd' }
// ]
// let nonFilteredObat = []
// // eslint-disable-next-line no-unused-vars
// let dpPar = ''
// function cariObat(val) {
//   const depo = depos.filter(pa => pa.jenis === props.depo)
//   console.log('depo', props?.depo, depo)
//   if (depo.length) {
//     dpPar = depo[0]?.value
//   } else return notifErrVue('depo tujuan tidak ditemukan')
//   const param = {
//     groups: props?.pasien?.groups,
//     kdruang: dpPar
//   }
//   const filtObat = nonFilteredObat.filter(nfil => nfil?.namaobat.toLowerCase().includes(val?.toLowerCase()))
//   if (filtObat.length) {
//     Obats.value = filtObat
//   } else {
//     console.log('obat', val, namaObat.value)
//     loadingObat.value = true
//     const params = { params: param }
//     return new Promise(resolve => {
//       api.get('v1/simrs/farmasinew/depo/lihatstokobateresep', params)
//         .then(resp => {
//           loadingObat.value = false
//           nonFilteredObat = resp.data?.dataobat
//           Obats.value = nonFilteredObat.filter(nfil => nfil?.namaobat.toLowerCase().includes(val?.toLowerCase()))
//           console.log(resp.data)
//           resolve(resp)
//         })
//         .catch(() => {
//           loadingObat.value = false
//           Obats.value = []
//         })
//     })
//   }
// }
function inputObat(val) {
  if (val !== '') store.cariObat(val)
}
function obatSelected(val) {
  // console.log('obat selected', val)
  store.setForm('satuan_kcl', val?.satuankecil ?? '-')
  store.setForm('kodeobat', val?.kodeobat ?? '-')
  store.setForm('kandungan', val?.kandungan ?? '-')
  store.setForm('fornas', val?.fornas ?? '-')
  store.setForm('forkit', val?.forkit ?? '-')
  store.setForm('generik', val?.generik ?? '-')
  store.setForm('kode108', val?.kode108 ?? '-')
  store.setForm('uraian108', val?.uraian108 ?? '-')
  store.setForm('kode50', val?.kode50 ?? '-')
  store.setForm('uraian50', val?.uraian50 ?? '-')
  store.setForm('stokalokasi', val?.stokalokasi ?? '-')
  store.setForm('kodedepo', store.dpPar)
  // console.log('form', store.form)
}
// signa
const signa = ref('')
function signaSelected(val) {
  // console.log('signa', val)
  store.setForm('aturan', val?.signa)
  // const sign = store.signas.filter(sig => sig.signa === val?.signa)
  // if (sign.length) {
  store.setForm('jumlahdosis', parseFloat(val?.jumlah))
  if (parseFloat(store.form.jumlah_diminta) > 0) {
    const kons = store.form.jumlah_diminta / parseFloat(val?.jumlah)
    store.setForm('konsumsi', kons)
  }
  // }
  // console.log('form', store.form)
}
// jumlah
function setJumlah(val) {
  console.log('jumlah', val)
  if (Object.keys(signa.value)?.length) {
    if (parseFloat(val) > 0) {
      const kons = val / parseFloat(signa.value?.jumlah)
      store.setForm('konsumsi', kons)
    }
  } else if (store.form?.aturan !== '') {
    const sign = store.signas.filter(sig => sig.signa === store?.form?.aturan)
    if (sign.length) {
      if (parseFloat(val) > 0) {
        const kons = val / parseFloat(signa.value?.jumlah)
        store.setForm('konsumsi', kons)
      }
    }
  }
}
const refObat = ref(null)
const refQty = ref(null)
const refSigna = ref(null)
function obatValid (val) {
  return (val !== null && val !== '') || 'Harap diisi'
}
function sigaValid (val) {
  return (val !== null && val !== '') || 'Harap diisi'
}
function validate() {
  if (store?.form?.kodeobat !== '') {
    const ob = store.nonFilteredObat.filter(o => o.kodeobat === store?.form?.kodeobat)
    if (ob.length && !Object.keys(store.namaObat)?.length) store.namaObat = ob[0]
    // console.log('non', store.nonFilteredObat)
  }
  if (store?.form?.aturan !== '') {
    const sign = store.signas.filter(sig => sig.signa === store?.form?.aturan)
    if (sign.length && !Object.keys(signa.value)?.length) signa.value = sign[0]
    // console.log('at', store.signas, sign)
  }
  // console.log('obat', refObat.value.validate())
  // console.log('qty', refQty.value.validate())
  // console.log('signa', refSigna.value.validate())
  // console.log('form', store.form)
  if (refObat.value.validate() && refQty.value.validate() && refSigna.value.validate()) return true
  else return false
}
function simpanObat() {
  if (validate()) {
    store.simpanObat()
  }
}
</script>

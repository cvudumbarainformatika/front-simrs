<template>
  <div class="row items-center q-mt-md justify-between no-wrap">
    <div class="anu q-mr-sm">
      {{ 'flag '+det?.flag }}
      <div
        v-if="det?.masterobat?.nama_obat"
        class="row justify-between no-wrap items-center q-mb-xs"
      >
        <div class="q-mr-sm">
          Nama
        </div>
        <div class="text-purple">
          {{ det.masterobat ? det.masterobat.nama_obat :'-' }}
        </div>
      </div>
      <div
        v-if="det?.masterobat?.kd_obat"
        class="row justify-between no-wrap items-center q-mb-xs"
      >
        <div class="q-mr-sm">
          kode
        </div>
        <div class="text-deep-purple">
          {{ det.masterobat ? det.masterobat.kd_obat :'-' }}
        </div>
      </div>
      <div
        v-if="det?.masterobat?.merk"
        class="row justify-between no-wrap items-center q-mb-xs"
      >
        <div class="q-mr-sm">
          Pabrikan
        </div>
        <div class="text-deep-orange">
          {{ det.masterobat ? det.masterobat.merk :'-' }}
        </div>
      </div>
      <div
        v-if="det?.masterobat?.bentuk_sediaan"
        class="row justify-between no-wrap items-center q-mb-xs"
      >
        <div class="q-mr-sm">
          Bentuk Sediaan
        </div>
        <div class="text-deep-orange">
          {{ det.masterobat ? det.masterobat.bentuk_sediaan :'-' }}
        </div>
      </div>
      <div
        v-if="det?.masterobat?.kekuatan_dosis"
        class="row justify-between no-wrap items-center q-mb-xs"
      >
        <div class="q-mr-sm">
          Kekuatan Dosis
        </div>
        <div class="text-deep-orange">
          {{ det.masterobat ? det.masterobat.kekuatan_dosis :'-' }}
        </div>
      </div>
      <div
        v-if="det?.masterobat?.kelas_terapi"
        class="row justify-between no-wrap items-center q-mb-xs"
      >
        <div class="q-mr-sm">
          Kelas Terapi
        </div>
        <div class="text-deep-orange">
          {{ det.masterobat ? det.masterobat.kelas_terapi :'-' }}
        </div>
      </div>
      <div
        v-if="det?.masterobat?.volumesediaan"
        class="row justify-between no-wrap items-center q-mb-xs"
      >
        <div class="q-mr-sm">
          Volume Sediaan
        </div>
        <div class="text-deep-orange">
          {{ det.masterobat ? det.masterobat.volumesediaan :'-' }}
        </div>
      </div>
    </div>
    <div
      v-if="det?.flag===''||det?.flag==='1'"
      class="anu q-mr-sm"
    >
      <div class="row justify-between no-wrap items-center q-mb-xs text-green">
        <div class="q-mr-sm">
          Dipesan
        </div>
        <div class=" text-weight-bold">
          {{ det.jumlahdpesan ? det.jumlahdpesan : '-' }}
        </div>
        <div class="q-ml-sm text-weight-bold">
          {{ det.satuan_kcl ? det.satuan_kcl : '-' }}
        </div>
      </div>
      <div class="row justify-between no-wrap items-center q-mb-xs text-primary">
        <div class="q-mr-sm">
          Diterima Sekarang
        </div>
        <div class="text-weight-bold q-mr-sm">
          {{ det.jml_terima_k ? det.jml_terima_k : 0 }}
        </div>
        <div class="">
          {{ det.satuan_kcl ? det.satuan_kcl : '-' }}
        </div>
      </div>
      <div class="row justify-between no-wrap items-center q-mb-xs text-orange">
        <div class="q-mr-sm">
          Diterima Sebelumnya
        </div>
        <div class="text-weight-bold">
          {{ det.jml_terima_laluK ? det.jml_terima_laluK : 0 }}
        </div>
      </div>
      <div
        class="row justify-between no-wrap items-center q-mb-xs"
        :class="det.jml_all_penerimaan <= parseFloat(det.jumlahdpesan) ?'text-green':'text-negative'"
      >
        <div class="q-mr-sm">
          Seluruh Penerimaan
        </div>
        <div class="text-weight-bold">
          {{ det.jml_all_penerimaan ? det.jml_all_penerimaan : 0 }}
        </div>
      </div>
    </div>
    <div
      v-if="det?.flag===''||det?.flag==='1'"
      class="anu q-mr-sm"
    >
      <div class="row justify-between no-wrap items-center q-mb-xs">
        <div class="col-12">
          <app-input
            ref="refIsi"
            v-model="store.details[i].isi"
            label="Isi"
            outlined
            :readonly="det.jml_all_penerimaan >= det.jumlahdpesan"
            @update:model-value="setHargaNetNew($event, det,'isi')"
          />
        </div>
      </div>
      <div class="row justify-between no-wrap items-center q-mb-xs">
        <div class="col-12">
          <app-input
            ref="refJmlDiterimaB"
            v-model="store.details[i].jml_terima_b"
            :label="'Diterima ('+ det.satuan_bsr+')'"
            outlined
            :readonly="det.jml_all_penerimaan >= det.jumlahdpesan"
            :rules="[
              val => !isNaN(val) || 'Harus pakai Nomor',
              val => !!val || 'Harap di isi',
              val => parseFloat(det.jumlahdpesan)>=det.jml_all_penerimaan || 'Tidak Boleh Melebihi Pemesanan',
            ]"
            @update:model-value="setHargaNetNew($event, det,'jml_terima_b')"
          />
        </div>
      </div>
      <div class="row justify-between no-wrap items-center q-mb-xs">
        <div class="col-12">
          <app-input
            ref="refJmlDiterima"
            v-model="store.details[i].jml_terima_k"
            :label="'Diterima ('+ det.satuan_kcl+')'"
            outlined
            :disable="det.jml_all_penerimaan >= det.jumlahdpesan"
            :rules="[
              val => !isNaN(val) || 'Harus pakai Nomor',
              val => !!val || 'Harap di isi',
            ]"
            @update:model-value="setHargaNetNew($event, det,'jml_terima_k')"
          />
        </div>
      </div>
      <!-- <div class="row justify-between no-wrap items-center q-mb-xs">
              <div class="q-mr-sm">
                Satuan Kecil
              </div>
              <div class="text-weight-bold">
                {{ det.satuan_kcl }}
              </div>
            </div> -->
      <div class="row no-wrap items-center q-mb-xs">
        <div class="col-12">
          <app-input
            ref="refBatch"
            v-model="store.details[i].no_batch"
            label="No Batch"
            outlined
            :readonly="det.jml_all_penerimaan >= det.jumlahdpesan"
          />
        </div>
      </div>
      <div class="row justify-between no-wrap items-center q-mb-xs">
        <div class="col-12">
          <app-input-date
            ref="refExp"
            :model="det.tgl_exp"
            label="Tanggal Kadalwarsa"
            outlined
            :readonly="det.jml_all_penerimaan >= det.jumlahdpesan"
            @set-model="detKadal($event,det)"
          />
        </div>
      </div>
    </div>

    <div
      v-if="det?.flag===''||det?.flag==='1'"
      class="anu q-mr-sm"
    >
      <div class="row justify-between no-wrap items-center q-mb-xs">
        <div class="col-12">
          <app-input
            ref="refHarga"
            v-model="store.details[i].harga"
            :label="'Harga' + ' per ' + det.satuan_bsr"
            outlined
            :readonly="det.jml_all_penerimaan >= det.jumlahdpesan"
            :rules="[
              val => !isNaN(val) || 'Harus pakai Nomor'
            ]"
            @update:model-value="setHargaNetNew($event, det,'harga')"
          />
        </div>
      </div>
      <div class="row justify-between no-wrap items-center q-mb-xs">
        <div class="col-12">
          <app-input
            ref="refHargaKcl"
            v-model="store.details[i].harga_kcl"
            :label="'Harga' + ' per ' + det.satuan_kcl"
            outlined
            :readonly="det.jml_all_penerimaan >= det.jumlahdpesan"
            :rules="[
              val => !isNaN(val) || 'Harus pakai Nomor'
            ]"
            @update:model-value="setHargaNetNew($event, det,'harga_kcl')"
          />
        </div>
      </div>
      <div class="row justify-between no-wrap items-center q-mb-xs">
        <div class="col-12">
          <app-input
            v-model="store.details[i].diskon"
            label="Diskon (%)"
            outlined
            :readonly="det.jml_all_penerimaan >= det.jumlahdpesan"
            :rules="[
              val => !isNaN(val) || 'Harus pakai Nomor'
            ]"
            @update:model-value="setHargaNetNew($event, det,'diskon')"
          />
        </div>
      </div>
      <div class="row justify-between no-wrap items-center q-mb-xs">
        <div class="col-12">
          <q-checkbox
            v-model="store.details[i].adaPPN"
            label="PPN 11%"
            :disable="det.jml_all_penerimaan >= det.jumlahdpesan"
            @update:model-value="adaPPN($event,det)"
          />
        </div>
      </div>
      <div class="row justify-between no-wrap items-center q-mb-xs">
        <div class="q-mr-sm">
          Harga Netto
        </div>
        <div class="">
          {{ det.harga_netto ? formatRpDouble(det.harga_netto,2):0 }}
        </div>
      </div>
      <div class="row justify-between no-wrap items-center q-mb-xs">
        <div class="q-mr-sm">
          Sub Total
        </div>
        <div class="">
          {{ det.subtotal ? formatRpDouble(det.subtotal,2) : 0 }}
        </div>
      </div>
    </div>
    <div
      v-if="det?.flag===''||det?.flag==='1'"
      class="anu q-mr-sm"
    >
      <q-btn
        flat
        icon="icon-mat-save"
        color="primary"
        round
        :disable="det.jml_all_penerimaan >= det.jumlahdpesan || det.loading"
        :loading="det.loading"
        @click="simpan(i)"
      >
        <q-tooltip
          class="primary"
          :offset="[10, 10]"
        >
          Simpan Rincian Penerimaan
        </q-tooltip>
      </q-btn>
      <q-btn
        flat
        icon="icon-mat-hand-front-left"
        color="negative"
        round
        :disable="det.loading"
        :loading="det.loading"
        @click="tolak(i)"
      >
        <q-tooltip
          class="primary"
          :offset="[10, 10]"
        >
          Tidak diterima
        </q-tooltip>
      </q-btn>
    </div>
    <div
      v-if="det?.flag==='2'"
      class="anu q-mr-sm text-weight-bold f-18"
    >
      Sudah ditolak
    </div>
  </div>
</template>
<script setup>
import { formatRpDouble } from 'src/modules/formatter'
import { ref } from 'vue'

import { usePenerimaanFarmasiStore } from 'src/stores/simrs/farmasi/penerimaan/penerimaan'
import { notifErrVue } from 'src/modules/utils'

const store = usePenerimaanFarmasiStore()
defineProps({
  det: { type: Object, default: () => {} },
  i: { type: Number, default: 0 }
})

const emits = defineEmits(['simpanObat', 'tolak'])
const refJmlDiterimaB = ref(null)
const refJmlDiterima = ref(null)
const refBatch = ref(null)
const refIsi = ref(null)
const refExp = ref(null)
const refHarga = ref(null)
const refHargaKcl = ref(null)

function resetValidasi() {
  // console.log('reset', refJmlDiterimaB.value.$refs.refInput)
  refJmlDiterimaB.value.$refs.refInput.resetValidation()
  refJmlDiterima.value.$refs.refInput.resetValidation()
  refBatch.value.$refs.refInput.resetValidation()
  refIsi.value.$refs.refInput.resetValidation()
  refExp.value.$refs.refInputDate.resetValidation()
  refHarga.value.$refs.refInput.resetValidation()
  refHargaKcl.value.$refs.refInput.resetValidation()
}
function validasi() {
  const diterimaB = refJmlDiterimaB.value.$refs.refInput.validate()
  const diterima = refJmlDiterima.value.$refs.refInput.validate()
  const batch = refBatch.value.$refs.refInput.validate()
  const isi = refIsi.value.$refs.refInput.validate()
  const exp = refExp.value.$refs.refInputDate.validate()
  const harga = refHarga.value.$refs.refInput.validate()
  const hargaKcl = refHargaKcl.value.$refs.refInput.validate()
  if (diterimaB && diterima && batch && isi && exp && harga && hargaKcl) return true
  else return false
}

function simpan(index) {
  if (validasi()) {
    const deta = store.details[index]
    deta.jml_all_penerimaan += deta.jumlah
    const key = Object.keys(deta)
    key.forEach(a => {
      if (a !== 'masterobat') store.setForm(a, deta[a])
    })
    // console.log('aa', store.form)
    // console.log('simpan valid', store.details[index])
    emits('simpanObat', index)
    // store.simpanPenerimaan().then(() => { ind.value = null })
  }
}
function tolak(index) {
  emits('tolak', index)
}
function adaPPN(evt, det) {
  // console.log('ada ppn', evt, det)
  if (evt) setHargaNetNew('11', det, 'ppn')
  if (!evt) setHargaNetNew('0', det, 'ppn')
}
let isiPrev = 0
function setHargaNetNew(evt, det, key) {
  const inc = evt.includes('.')
  const ind = evt.indexOf('.')
  const panj = evt.length
  const nilai = isNaN(parseFloat(evt)) ? 0 : (inc && (ind === (panj - 1)) ? evt : parseFloat(evt))
  det[key] = nilai
  if (key === 'isi' && nilai <= 0) return

  const isi = det.isi ?? 1
  let harga = det.harga ?? 0
  let hargaKcl = det.harga_kcl ?? 0
  const diskon = det.diskon ?? 0
  const ppn = det.ppn ?? 11
  let jmlTerimaB = det.jml_terima_b ?? 0
  let jmlTerimaK = det.jml_terima_k ?? 0
  const diskonRp = harga * (diskon / 100)
  const hargaSetelahDiskon = harga - diskonRp
  const ppnRp = isNaN(hargaSetelahDiskon * (ppn / 100)) ? 0 : hargaSetelahDiskon * (ppn / 100)
  const hargaPembelian = hargaSetelahDiskon + ppnRp
  const subtotal = hargaPembelian * jmlTerimaB
  if (key === 'isi') {
    if (nilai > 0) {
      if (parseFloat(jmlTerimaK) > 0 && det.isi > 0) {
        // console.log('isi if', parseFloat(evt), isiPrev)
        if (isiPrev > det.isi) {
          if (parseFloat(jmlTerimaK) < 1) {
            const jml = parseFloat(det.jml_pesan) - det.jml_terima_lalu
            det.jumlah = jml
            jmlTerimaK = jml
            jmlTerimaB = jml / det.isi
          }
          if (parseFloat(det.isi) <= 1) {
            const jml = parseFloat(det.jml_pesan) - det.jml_terima_lalu
            det.jumlah = jml
            jmlTerimaK = jml
            jmlTerimaB = jml / det.isi
          }
        } else {
          det.jumlah = parseFloat(jmlTerimaK)
          jmlTerimaB = det.jumlah / det.isi
        }
      }
      isiPrev = det.isi
    }
  }

  if (key === 'jml_terima_b' || key === 'isi') jmlTerimaK = jmlTerimaB * isi
  if (key === 'jml_terima_k' || key === 'isi') jmlTerimaB = jmlTerimaK / isi
  if (key === 'harga_kcl' || key === 'isi') harga = hargaKcl * isi
  if (key === 'harga' || key === 'isi') hargaKcl = harga / isi
  const jmlAll = jmlTerimaK + det.jml_terima_laluK
  // console.log('terima ', jmlAll, jmlTerimaK)
  // console.log('lebih', det)
  if (jmlAll > parseFloat(det.jumlahdpesan)) {
    notifErrVue('Jumlah Maksimal diterima ' + det.jumlahdpesan + ' ' + det?.satuan_kcl)
    jmlTerimaK = (parseFloat(det.jumlahdpesan) - det.jml_terima_laluK)
    jmlTerimaB = (parseFloat(det.jumlahdpesan) - det.jml_terima_laluK) / isi
  }
  det.isi = isi
  det.harga = harga
  det.harga_kcl = hargaKcl
  det.diskon = diskon
  det.ppn = ppn
  det.jml_terima_b = jmlTerimaB
  det.jml_terima_k = jmlTerimaK
  det.diskon_rp = diskonRp
  det.diskon_rp_kecil = diskonRp / isi
  det.ppn_rp = ppnRp
  det.ppn_rp_kecil = ppnRp / isi
  det.harga_netto = hargaPembelian
  det.harga_netto_kecil = hargaPembelian / isi
  det.subtotal = subtotal
  // console.log('evt', evt)
  // console.log('nilai', nilai)
  // console.log('det', det)
  // console.log('key', key)
}
function detKadal(evt, val) {
  val.tgl_exp = evt
}
defineExpose({ resetValidasi })
</script>

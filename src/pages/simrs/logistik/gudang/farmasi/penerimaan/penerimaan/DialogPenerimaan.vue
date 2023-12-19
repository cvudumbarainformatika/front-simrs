<template>
  <div
    class="row no-wrap items-center justify-between q-mx-sm bg-white"
    style="z-index: 10;"
  >
    <div>
      <div class="row items-center">
        <div class="q-mr-md">
          No Penerimaan:
        </div>
        <div class="q-mr-sm">
          {{ store.form.nopenerimaan ? store.form.nopenerimaan :'-' }}
        </div>
        <!-- <app-input
          v-model="store.form.nopenerimaan"
          label="Nomor Penerimaan"
          outlined
          readonly
          valid
          :loading="store.loading"
        /> -->
        <div class="q-ml-md">
          <q-btn
            v-if="store.form.nopenerimaan"
            flat
            icon="icon-mat-done"
            dense
            color="primary"
            :loading="store.loadingKunci"
            @click="store.selesaiDanKunci()"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Selesai dan Kunci Penerimaan
            </q-tooltip>
          </q-btn>
        </div>
      </div>
    </div>
  </div>
  <!-- penerimaan -->
  <div class="q-py-md q-px-sm">
    <!-- header -->
    <div class="row items-center q-col-gutter-md q-px-sm q-pb-md">
      <div class="col-6">
        <div class="q-mb-xs">
          <div v-if="store.namaPenyedia">
            <div class="row">
              <div class="col-12">
                <app-input
                  v-model="store.namaPenyedia.nama "
                  label="Penyedia"
                  outlined
                  readonly
                />
              </div>
            </div>
          </div>
          <div v-else>
            -
          </div>
        </div>

        <div class="row q-mb-xs">
          <div class="col-12">
            <app-input
              v-model="store.form.nopemesanan"
              label="Gudang"
              outlined
              readonly
            />
            <!--
            <app-autocomplete-new
              :model="store.form.nopemesanan"
              autocomplete="nopemesanan"
              option-label="nopemesanan"
              option-value="nopemesanan"
              label="Pilih Pemesanan"
              outlined
              :source="store.pemesanans"
              @on-select="store.pemesananSelected"
              @clear="store.clearPemesanan"
            />
        -->
          </div>
        </div>

        <div class="row q-mb-xs">
          <div class="col-12">
            <app-autocomplete-new
              ref="refJenisSurat"
              :model="store.form.jenissurat"
              autocomplete="nama"
              option-label="nama"
              option-value="nama"
              label="Pilih Jenis Surat"
              outlined
              :source="store.jenisSurats"
              @on-select="store.jenisSuratSelected"
              @clear="store.clearJenisSurat"
            />
          </div>
        </div>
        <div class="row q-mb-xs">
          <div class="col-12">
            <app-input
              ref="refNoSurat"
              v-model="store.form.nomorsurat"
              label="Nomor Surat"
              outlined
            />
          </div>
        </div>
        <div class="row q-mb-xs">
          <div class="col-12">
            <app-input
              ref="refPengirim"
              v-model="store.form.pengirim"
              label="Nama Pengirim"
              outlined
            />
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="row q-mb-xs">
          <div
            v-if="!gudang && apps.user.pegawai.role_id===1"
            class="col-12"
          >
            <app-autocomplete-new
              ref="refGudang"
              :model="store.form.gudang"
              autocomplete="nama"
              option-label="nama"
              option-value="value"
              label="Pilih Gudang"
              outlined
              :source="store.gudangs"
              @on-select="store.gudangSelected"
              @clear="store.clearGudang"
            />
          </div>
          <div
            v-else
            class="col-12"
          >
            <div class="row justify-between no-wrap">
              <!-- <div>Gudang tujuan </div> -->
              <div
                v-if="gudang"
                class="col-12"
              >
                <app-input
                  v-model="gudang.nama "
                  label="Gudang"
                  outlined
                  readonly
                />
                <!-- {{ gudang.nama }} -->
              </div>
              <div
                v-if="!gudang"
                class="text-negative text-weight-bold q-mr-lg"
              >
                Anda tidak memiliki akses Penerimaan Gudang
              </div>
            </div>
          </div>
        </div>

        <div class="row q-mb-xs">
          <div class="col-12">
            <app-input-date-human
              :model="store.disp.tanggal"
              label="Tanggal Transaksi"
              outlined
              @set-display="dispTanggal"
              @db-model="setTanggal"
            />
          </div>
        </div>
        <div class="row q-mb-xs">
          <div class="col-12">
            <app-input-date-human
              :model="store.disp.surat"
              label="Tanggal Surat"
              outlined
              @set-display="dispSurat"
              @db-model="setSurat"
            />
          </div>
        </div>
        <div class="row q-mb-xs">
          <div class="col-12">
            <app-input-date-human
              :model="store.disp.batasbayar"
              label="Batas Akhir Pembayaran"
              outlined
              @set-display="dispTempo"
              @db-model="setTempo"
            />
          </div>
        </div>
        <!-- <div class="row q-mb-xs">
          <div class="col-12">
            <app-input
              ref="refTotalFaktur"
              v-model="store.form.total_faktur_pbf"
              label="Total Faktur PBF"
              outlined
              valid
              :rules="[
                val => !isNaN(val) || 'Harus pakai Nomor'
              ]"
            />
          </div>
        </div> -->
      </div>
    </div>
    <q-separator />
    <!-- details -->
    <div
      v-if="store.details.length && !store.loading"
      class="bg-grey-2"
    >
      <div
        class="row bg-grey q-pa-sm"
      >
        <div class="f-14 text-weight-bold">
          Rincian Pemesanan
        </div>
      </div>
      <div
        v-for="(det, i) in store.details"
        :key="i"
      >
        <div class="row items-center q-mt-md justify-between no-wrap">
          <div class="anu q-mr-sm">
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
          <div class="anu q-mr-sm">
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
            <!-- <div class="row justify-between no-wrap items-center q-mb-xs">
              <div class="col-12">
                <app-input
                  ref="refJmlDiterima"
                  v-model="det.inpJumlah"
                  label="Diterima"
                  outlined
                  :readonly="det.jml_all_penerimaan >= det.jumlahdpesan"
                  :rules="[
                    val => !isNaN(val) || 'Harus pakai Nomor',
                    val => !!val || 'Harap di isi',
                    val => parseFloat(det.jumlahdpesan)>=det.jml_all_penerimaan || 'Tidak Boleh Melebihi Pemesanan',
                  ]"
                  @update:model-value="setDiterima($event, det)"
                />
              </div>
            </div> -->
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
          <div class="anu q-mr-sm">
            <!-- <div class="row justify-between no-wrap items-center q-mb-xs">
              <div class="q-mr-sm">
                Satuan Besar
              </div>
              <div class="text-weight-bold">
                {{ det.satuan_bsr }}
              </div>
            </div> -->
            <div class="row justify-between no-wrap items-center q-mb-xs">
              <div class="col-12">
                <app-input
                  ref="refIsi"
                  v-model="det.isi"
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
                  ref="refJmlDiterima"
                  v-model="det.jml_terima_b"
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
                  v-model="det.jml_terima_k"
                  :label="'Diterima ('+ det.satuan_kcl+')'"
                  outlined
                  :readonly="det.jml_all_penerimaan >= det.jumlahdpesan"
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
                  v-model="det.no_batch"
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

          <div class="anu q-mr-sm">
            <div class="row justify-between no-wrap items-center q-mb-xs">
              <div class="col-12">
                <app-input
                  ref="refHarga"
                  v-model="det.harga"
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
                  v-model="det.harga_kcl"
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
                  v-model="det.diskon"
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
                <app-input
                  ref="refPpn"
                  v-model="det.ppn"
                  label="Ppn (%)"
                  outlined
                  :readonly="det.jml_all_penerimaan >= det.jumlahdpesan"
                  :rules="[
                    val => !isNaN(val) || 'Harus pakai Nomor'
                  ]"
                  @update:model-value="setHargaNetNew($event, det,'ppn')"
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
          <div class="anu q-mr-sm">
            <q-btn
              flat
              icon="icon-mat-save"
              color="primary"
              round
              :disable="det.jml_all_penerimaan >= det.jumlahdpesan"
              :loading="store.loading && i===ind"
              @click="simpan(i)"
            >
              <q-tooltip
                class="primary"
                :offset="[10, 10]"
              >
                Simpan Rincian Penerimaan
              </q-tooltip>
            </q-btn>
          </div>
        </div>
        <q-separator class="q-mt-sm" />
      </div>
    </div>
    <div v-if="store.loading">
      <app-loading />
    </div>
    <div v-if="!store.details.length && !store.loading">
      <app-no-selected-page
        color="primary"
        icon="icon-mat-receipt_long"
        text="Tidak ada rinci"
      />
    </div>
  </div>
</template>
<script setup>
import { formatRpDouble } from 'src/modules/formatter'
import { notifErrVue } from 'src/modules/utils'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { usePenerimaanFarmasiStore } from 'src/stores/simrs/farmasi/penerimaan/penerimaan'
import { computed, ref } from 'vue'

const store = usePenerimaanFarmasiStore()

// head
const refJenisSurat = ref(null) // inp
const refNoSurat = ref(null) // inp
const refPengirim = ref(null) // inp
const refGudang = ref(null) // auto
// const refTotalFaktur = ref(null) // inp
// det
const refPpn = ref(null)
const refJmlDiterima = ref(null)
const refIsi = ref(null)
const refExp = ref(null)
const refHarga = ref(null)
const refHargaKcl = ref(null)
function validasi(index) {
  // console.log('index', index)
  console.log('ref noSurat', refNoSurat.value.$refs.refInput.validate())
  // console.log('ref ppn', refPpn.value[index].refInput.validate())
  // console.log('ref diterima', refJmlDiterima.value[index].refInput.validate())
  // console.log('ref isi', refIsi.value[index].refInput.validate())
  // console.log('ref exp', refExp.value[index].$refs.refInputDate.validate())
  // console.log('ref harga', refHarga.value[index].refInput.validate())

  const jenisSurat = refJenisSurat.value.$refs.refAuto.validate()
  const Gudang = refGudang.value ? refGudang.value.$refs.refAuto.validate() : !!store.form.gudang
  const noSurat = refNoSurat.value.$refs.refInput.validate()
  const pengirim = refPengirim.value.$refs.refInput.validate()
  // const totalFaktur = refTotalFaktur.value.$refs.refInput.validate()

  const ppn = refPpn.value[index].refInput.validate()
  const diterima = refJmlDiterima.value[index].refInput.validate()
  const isi = refIsi.value[index].refInput.validate()
  const exp = refExp.value[index].$refs.refInputDate.validate()
  const harga = refHarga.value[index].refInput.validate()
  const hargaKcl = refHargaKcl.value[index].refInput.validate()
  console.log('validasi', jenisSurat, Gudang, noSurat, pengirim, ppn, diterima, isi, exp, harga, hargaKcl, !!store.form.gudang)
  if (!Gudang && !store.form.gudang) notifErrVue('Gudang Tujuan tidak ditemukan, Apakah Anda memiliki Akses Penerimaan Gudang?')
  if (jenisSurat && Gudang && noSurat && pengirim && ppn && diterima && isi && exp && harga && hargaKcl) return true
  else return false
}
const ind = ref(null)
function simpan(index) {
  // store.details[index].forEach(a => {
  //   console.log('each', a)
  // })
  if (validasi(index)) {
    ind.value = index
    const deta = store.details[index]
    deta.jml_all_penerimaan += deta.jumlah
    const key = Object.keys(deta)
    key.forEach(a => {
      if (a !== 'masterobat') store.setForm(a, deta[a])
    })
    console.log('aa', store.form)
    console.log('simpan valid', store.details[index])
    store.simpanPenerimaan().then(() => { ind.value = null })
  }
}
let isiPrev = 0
function setHargaNetNew(evt, det, key) {
  const inc = evt.includes('.')
  const ind = evt.indexOf('.')
  const panj = evt.length
  const nilai = isNaN(parseFloat(evt)) ? 0 : (inc && (ind === (panj - 1)) ? evt : parseFloat(evt))
  det[key] = nilai
  const isi = det.isi ?? 1
  let harga = det.harga ?? 0
  let hargaKcl = det.harga_kcl ?? 0
  const diskon = det.diskon ?? 0
  const ppn = det.ppn ?? 0
  let jmlTerimaB = det.jml_terima_b ?? 0
  let jmlTerimaK = det.jml_terima_k ?? 0
  const diskonRp = harga * (diskon / 100)
  const hargaSetelahDiskon = harga - diskonRp
  const ppnRp = hargaSetelahDiskon * (ppn / 100)
  const hargaPembelian = hargaSetelahDiskon + ppnRp
  const subtotal = hargaPembelian * jmlTerimaB
  if (key === 'isi') {
    if (parseFloat(jmlTerimaK) > 0 && det.isi > 0) {
      console.log('isi if', parseFloat(evt), isiPrev)
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

  if (key === 'jml_terima_b' || key === 'isi') jmlTerimaK = jmlTerimaB * isi
  if (key === 'jml_terima_k' || key === 'isi') jmlTerimaB = jmlTerimaK / isi
  if (key === 'harga' || key === 'isi') hargaKcl = harga / isi
  if (key === 'harga_kcl' || key === 'isi') harga = hargaKcl * isi
  const jmlAll = jmlTerimaK + det.jml_terima_lalu
  console.log('terima ', jmlAll, jmlTerimaK)
  if (jmlAll > parseFloat(det.jumlahdpesan)) {
    console.log('lebih')
    notifErrVue('Jumlah Maksimal diterima ' + det.jumlahdpesan + ' ' + det?.satuan_kcl)
    jmlTerimaK = (parseFloat(det.jumlahdpesan) - det.jml_terima_lalu)
    jmlTerimaB = (parseFloat(det.jumlahdpesan) - det.jml_terima_lalu) / isi
  }
  det.isi = isi
  det.harga = harga
  det.harga_kcl = hargaKcl
  det.diskon = diskon
  det.ppn = ppn
  det.jml_terima_b = jmlTerimaB
  det.jml_terima_k = jmlTerimaK
  det.diskon_rp = diskonRp
  det.ppn_rp = ppnRp
  det.harga_netto = hargaPembelian
  det.subtotal = subtotal
  // console.log('evt', evt)
  // console.log('nilai', nilai)
  console.log('det', det)
  // console.log('key', key)
}
function setHargaNet(val) {
  val.harga_netto = 0
  if (val.harga > 0 && val.diskon > 0) {
    val.diskon_rp = val.diskon / 100 * val.harga
    val.harga_netto = val.harga - val.diskon_rp
  }
  if (val.harga > 0 && val.ppn > 0) {
    if (val.harga_netto > 0) {
      const harga = val.harga_netto
      val.ppn_rp = val.ppn / 100 * harga
      val.harga_netto = harga + val.ppn_rp
    } else {
      const harga = val.harga
      val.ppn_rp = val.ppn / 100 * harga
      val.harga_netto = harga + val.ppn_rp
    }
  }
  if (val.harga_netto > 0) {
    val.subtotal = val.harga_netto * parseFloat(val.jumlah)
  } else {
    val.harga_netto = val.harga
    val.subtotal = val.harga * parseFloat(val.jumlah)
  }
  const total = store.details.map(a => a.subtotal).reduce((a, b) => a + b, 0)
  if (store.form.total_faktur_pbf) {
    if (parseFloat(store.form.total_faktur_pbf) < total) {
      store.setForm('total_faktur_pbf', total)
    }
  } else {
    store.setForm('total_faktur_pbf', total)
  }
  console.log(val)
}
// eslint-disable-next-line no-unused-vars
function setHarga(evt, val, index) {
  val.harga = !isNaN(parseFloat(evt)) ? parseFloat(evt) : 0
  const diterima = refJmlDiterima.value[index].refInput.validate()
  const isi = refIsi.value[index].refInput.validate()
  if (isi && diterima) {
    const isi = parseFloat(val.isi)
    val.isi = isi
    val.harga_kcl = (val.harga / isi)
    setHargaNet(val)
  } else {
    val.harga = 0
  }
  // console.log('harga', val)
}
// eslint-disable-next-line no-unused-vars
function setHargaKcl (evt, val, index) {
  val.harga_kcl = !isNaN(parseFloat(evt)) ? parseFloat(evt) : 0
  const diterima = refJmlDiterima.value[index].refInput.validate()
  const isi = refIsi.value[index].refInput.validate()
  if (isi && diterima) {
    const isi = parseFloat(val.isi)
    val.isi = isi
    val.harga = (val.harga_kcl * isi)
    setHargaNet(val)
  } else {
    val.harga_kcl = 0
  }
}
// eslint-disable-next-line no-unused-vars
function setDiskon(evt, val) {
  val.diskon = !isNaN(parseFloat(evt)) ? parseFloat(evt) : 0
  setHargaNet(val)
}
// eslint-disable-next-line no-unused-vars
function setPpn(evt, val) {
  val.ppn = !isNaN(parseFloat(evt)) ? parseFloat(evt) : 0
  setHargaNet(val)
}
// eslint-disable-next-line no-unused-vars
function setDiterima(evt, val) {
  val.inpJumlah = !isNaN(parseFloat(evt)) ? (parseFloat(evt) < 0 ? 0 : parseFloat(evt)) : 0
  if (!val.isi) val.isi = 1
  val.jumlah = val.inpJumlah
  const jmlAll = val.jumlah + val.jml_terima_lalu
  if (jmlAll > val.jumlahdpesan / val.isi) {
    console.log('lebih')
    val.inpJumlah = (val.jumlahdpesan - val.jml_terima_lalu)
    val.jumlah = val.inpJumlah
    val.jml_terima_b = val.jumlah
    val.jml_terima_k = val.jumlah / val.isi
  }
}
// eslint-disable-next-line no-unused-vars
function setDiterimaKcl(evt, val) {
  val.inpJumlahKcl = !isNaN(parseFloat(evt)) ? (parseFloat(evt) < 0 ? 0 : parseFloat(evt)) : 0
  if (!val.isi) val.isi = 1
  val.jumlah = val.inpJumlahKcl * val.isi
  const jmlAll = val.jumlah + val.jml_terima_lalu
  if (jmlAll > val.jumlahdpesan) {
    console.log('lebih')
    val.inpJumlahKcl = (val.jumlahdpesan - val.jml_terima_lalu) / val.isi
    val.jumlah = val.inpJumlahKcl * val.isi
    val.jml_terima_b = val.jumlah
    val.jml_terima_k = val.inpJumlahKcl
  }
}

// eslint-disable-next-line no-unused-vars
function setIsi(evt, val) {
  console.log('val', val)
  console.log('isi', parseFloat(evt))
  val.isi = !isNaN(parseFloat(evt)) ? parseFloat(evt) : 0
  if (!val.inpJumlah) val.inpJumlah = 1
  if (parseFloat(val.inpJumlah) > 0 && val.isi > 0) {
    console.log('isi if', parseFloat(evt), isiPrev)
    if (isiPrev > val.isi) {
      if (parseFloat(val.inpJumlah) < 1) {
        const jml = parseFloat(val.jml_pesan) - val.jml_terima_lalu
        val.jumlah = jml
        val.inpJumlah = jml
        val.inpJumlahKcl = jml / val.isi
      }
      if (parseFloat(val.isi) <= 1) {
        const jml = parseFloat(val.jml_pesan) - val.jml_terima_lalu
        val.jumlah = jml
        val.inpJumlah = jml
        val.inpJumlahKcl = jml / val.isi
      }
    } else {
      val.jumlah = parseFloat(val.inpJumlah)
      val.inpJumlahKcl = val.jumlah / val.isi
    }

    const jmlAll = val.jumlah + val.jml_terima_lalu
    if (jmlAll > val.jumlahdpesan) {
      console.log('lebih')
      val.inpJumlah = ((val.jumlahdpesan / val.isi) - val.jml_terima_lalu)
      val.jumlah = val.inpJumlah
      val.inpJumlahKcl = val.jumlah * val.isi
    }
    isiPrev = val.isi
  }
}
function detKadal(evt, val) {
  val.tgl_exp = evt
}
function setTanggal(val) {
  store.setForm('tglpenerimaan', val)
}
function dispTanggal(val) {
  store.setDisp('tanggal', val)
}

function setSurat(val) {
  store.setForm('tglpenerimaan', val)
}
function dispSurat(val) {
  store.setDisp('surat', val)
}

function setTempo(val) {
  store.setForm('batasbayar', val)
}
function dispTempo(val) {
  store.setDisp('batasbayar', val)
}
const apps = useAplikasiStore()

const gudang = computed(() => {
  let gud = null
  if (apps.user.pegawai.kdruangansim !== '') {
    const anu = store.gudangs.filter(a => a.value === apps.user.pegawai.kdruangansim)
    if (anu.length) {
      gud = anu[0]
      store.setForm('kdruang', gud.value)
      store.setForm('gudang', gud.value)
    }
  }
  return gud
})
console.log('gudang', gudang.value)
store.getInitialData()
</script>

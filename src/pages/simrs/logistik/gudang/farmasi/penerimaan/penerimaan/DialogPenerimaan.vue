<template>
  <div class="row f-24 bg-primary text-white rounded">
    <div class="col-12 q-ma-sm text-weight-bold">
      Form Penerimaan
    </div>
  </div>
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
              label="Nomor Pemesanan"
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
        <CompDetail
          ref="refComDetail"
          :i="i"
          :det="det"
          @simpan-obat="simpanObat(det)"
          @tolak="tolak(det)"
        />
        <!-- <div class="row items-center q-mt-md justify-between no-wrap">
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
                  :disable="det.jml_all_penerimaan >= det.jumlahdpesan"
                  :rules="[
                    val => !isNaN(val) || 'Harus pakai Nomor',
                    val => !!val || 'Harap di isi',
                  ]"
                  @update:model-value="setHargaNetNew($event, det,'jml_terima_k')"
                />
              </div>
            </div>
            <div class="row no-wrap items-center q-mb-xs">
              <div class="col-12">
                <app-input
                  ref="refBatch"
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
                <q-checkbox
                  v-model="det.adaPPN"
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
        </div> -->
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
/* catatatan :
  setelah simpan detail, belum terupdate data sudah diterima.
  cara cek, jika data sudah masuk, readonly aktif.
*/
// import { formatRpDouble } from 'src/modules/formatter'
// import { notifErrVue } from 'src/modules/utils'
import { notifErrVue } from 'src/modules/utils'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { usePenerimaanFarmasiStore } from 'src/stores/simrs/farmasi/penerimaan/penerimaan'
import { computed, onMounted, ref, defineAsyncComponent } from 'vue'

const store = usePenerimaanFarmasiStore()

const CompDetail = defineAsyncComponent(() => import('./comp/CompDetailDialog.vue'))
// head
const refJenisSurat = ref(null) // inp
const refNoSurat = ref(null) // inp
const refPengirim = ref(null) // inp
const refGudang = ref(null) // auto
const refComDetail = ref(null) // detail

function validasi() {
  const jenisSurat = refJenisSurat.value.$refs.refAuto.validate()
  const Gudang = refGudang.value ? refGudang.value.$refs.refAuto.validate() : !!store.form.gudang
  const noSurat = refNoSurat.value.$refs.refInput.validate()
  const pengirim = refPengirim.value.$refs.refInput.validate()

  if (!Gudang && !store.form.gudang) notifErrVue('Gudang Tujuan tidak ditemukan, Apakah Anda memiliki Akses Penerimaan Gudang?')
  if (jenisSurat && Gudang && noSurat && pengirim) return true
  else {
    notifErrVue('Periksa Kembali input anda')
    return false
  }
}
function tolak(val) {
  console.log('form', store.form)
  console.log('tolak', val)
  if (!val?.nopemesanan || !val?.kdobat) return notifErrVue('Nomor Pemesanan dan atau kode obat tidak ditemukan')
  store.tolakRinciPesanan(val)
}
function simpanObat(det) {
  if (validasi()) {
    // console.log('bisa disimpan', det)
    store.simpanPenerimaan(det).then(() => {
      store.ambilPemesanan(true).then(() => {
        const pes = store.pemesanans.find(a => a.nopemesanan === store.form.nopemesanan)
        if (pes) store.pemesananSelected(pes)
        setTimeout(() => {
          refComDetail.value.forEach(com => {
          // console.log('ambil obat', com)
          // console.log('ambil obat2', com.$refs)
            com.resetValidasi()
          })
        }, 100)
      })
    })
  }
}
function setTanggal(val) {
  store.setForm('tglpenerimaan', val)
}
function dispTanggal(val) {
  store.setDisp('tanggal', val)
}

function setSurat(val) {
  store.setForm('tglsurat', val)
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
  if (apps.user.kdruangansim !== '') {
    const anu = store.gudangs.filter(a => a.value === apps.user.kdruangansim)
    if (anu.length) {
      gud = anu[0]
      store.setForm('kdruang', gud.value)
      store.setForm('gudang', gud.value)
    }
  }
  return gud
})
// console.log('gudang', gudang.value)
onMounted(() => {
  // if (store.details.length) {
  //   // console.log('detailnya', store.details)
  //   const belumTsSmw = store.details.filter(a => parseFloat(a.jumlahdpesan) > parseFloat(a.jml_all_penerimaan))
  //   if (belumTsSmw.length) {
  //     belumTsSmw[0].adaPPN = !belumTsSmw[0].adaPPN
  //     if (belumTsSmw[0].adaPPN) setHargaNetNew('11', belumTsSmw[0], 'ppn')
  //     if (!belumTsSmw[0].adaPPN) setHargaNetNew('0', belumTsSmw[0], 'ppn')
  //     setTimeout(() => {
  //       belumTsSmw[0].adaPPN = !belumTsSmw[0].adaPPN
  //       if (belumTsSmw[0].adaPPN) setHargaNetNew('11', belumTsSmw[0], 'ppn')
  //       if (!belumTsSmw[0].adaPPN) setHargaNetNew('0', belumTsSmw[0], 'ppn')
  //     }, 500)
  //   }
  // }
})
// store.getInitialData()
</script>
<style lang="scss" scoped>
.rounded{
  border-radius: 5px;
  margin-top: -10px;
}
</style>

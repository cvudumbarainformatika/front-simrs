<template>
  <div
    class="fixed-top row no-wrap items-center justify-between q-mx-sm bg-white"
    style="z-index: 10;"
  >
    <div>
      <div class="row items-center">
        <div class="q-mr-md">
          No Penerimaan:
        </div>
        <app-input
          v-model="store.form.nopenerimaan"
          label="Nomor Penerimaan"
          outlined
          readonly
          valid
          :loading="store.loading"
        />
        <div class="q-ml-md">
          <q-btn
            v-if="store.form.nopenerimaan"
            flat
            icon="icon-mat-done"
            dense
            color="primary"
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
    <div>
      <q-btn
        flat
        :icon="!style.componentfull ? 'icon-mat-open_in_full' : 'icon-mat-close_fullscreen'"
        round
        :color="style.componentfull ? 'green' : 'primary'"
        size="12px"
        class="q-ml-md"
        @click="style.setComponentFull"
      />
    </div>
  </div>
  <!-- penerimaan -->
  <div class="q-mt-lg q-py-md q-px-sm">
    <!-- header -->
    <div class="row items-center q-col-gutter-md q-px-sm q-pb-md">
      <div class="col-6">
        <div class="row q-col-gutter-md no-wrap">
          <div class="row q-mb-xs">
            Penyedia :
          </div>
        </div>
        <div class="q-ml-xl q-pl-lg">
          <div v-if="store.namaPenyedia">
            <div class="row justify-between no-wrap items-center q-mb-xs">
              <div>
                Nama
              </div>
              <div class=" text-deep-orange text-weight-bold">
                {{ store.namaPenyedia ? store.namaPenyedia.nama : '-' }}
              </div>
            </div>
            <div class="row justify-between no-wrap items-center q-mb-xs">
              <div>
                Alamat
              </div>
              <div class=" text-deep-orange text-weight-bold">
                {{ store.namaPenyedia ? store.namaPenyedia.alamat : '-' }}
              </div>
            </div>
          </div>
          <div v-else>
            -
          </div>
        </div>

        <div class="row q-mb-xs">
          <div class="col-12">
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
          <div class="col-12">
            <app-autocomplete-new
              ref="refGudang"
              :model="store.form.kdruang"
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
              :model="store.disp.tempo"
              label="Batas Akhir Pembayaran"
              outlined
              @set-display="dispTempo"
              @db-model="setTempo"
            />
          </div>
        </div>
        <div class="row q-mb-xs">
          <div class="col-12">
            <app-input
              ref="refTotalFaktur"
              v-model="store.form.total_faktur_pbf"
              label="Total Faktur PBF"
              outlined
              :rules="[
                val => !isNaN(val) || 'Harus pakai Nomor'
              ]"
            />
          </div>
        </div>
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
            <div class="row justify-between no-wrap items-center q-mb-xs">
              <div class="q-mr-sm">
                Nama
              </div>
              <div class="text-purple">
                {{ det.masterobat ? det.masterobat.nama_obat :'-' }}
              </div>
            </div>
            <div class="row justify-between no-wrap items-center q-mb-xs">
              <div class="q-mr-sm">
                kode
              </div>
              <div class="text-deep-purple">
                {{ det.masterobat ? det.masterobat.kd_obat :'-' }}
              </div>
            </div>
            <div class="row justify-between no-wrap items-center q-mb-xs">
              <div class="q-mr-sm">
                Pabrikan
              </div>
              <div class="text-deep-orange">
                {{ det.masterobat ? det.masterobat.merk :'-' }}
              </div>
            </div>
            <div class="row justify-between no-wrap items-center q-mb-xs">
              <div class="q-mr-sm">
                Bentuk Sediaan
              </div>
              <div class="text-deep-orange">
                {{ det.masterobat ? det.masterobat.bentuk_sediaan :'-' }}
              </div>
            </div>
            <div class="row justify-between no-wrap items-center q-mb-xs">
              <div class="q-mr-sm">
                Kekuatan Dosis
              </div>
              <div class="text-deep-orange">
                {{ det.masterobat ? det.masterobat.kekuatan_dosis :'-' }}
              </div>
            </div>
            <div class="row justify-between no-wrap items-center q-mb-xs">
              <div class="q-mr-sm">
                Kelas Terapi
              </div>
              <div class="text-deep-orange">
                {{ det.masterobat ? det.masterobat.kelas_terapi :'-' }}
              </div>
            </div>
            <div class="row justify-between no-wrap items-center q-mb-xs">
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
            </div>
            <div class="row justify-between no-wrap items-center q-mb-xs">
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
            </div>
            <div class="row justify-between no-wrap items-center q-mb-xs text-primary">
              <div class="q-mr-sm">
                Diterima Sekarang
              </div>
              <div class="text-weight-bold">
                {{ det.jumlah ? det.jumlah : 0 }}
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
                {{ det.jml_terima_lalu ? det.jml_terima_lalu : 0 }}
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
              <div class="q-mr-sm">
                Satuan Besar
              </div>
              <div class="text-weight-bold">
                {{ det.satuan_bsr }}
              </div>
            </div>
            <div class="row justify-between no-wrap items-center q-mb-xs">
              <div class="col-12">
                <app-input
                  ref="refIsi"
                  v-model="det.isi"
                  label="Isi"
                  outlined
                  :readonly="det.jml_all_penerimaan >= det.jumlahdpesan"
                  @update:model-value="setIsi($event, det, i)"
                />
              </div>
            </div>
            <div class="row justify-between no-wrap items-center q-mb-xs">
              <div class="q-mr-sm">
                Satuan Kecil
              </div>
              <div class="text-weight-bold">
                {{ det.satuan_kcl }}
              </div>
            </div>
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
                  label="Harga (Satuan besar)"
                  outlined
                  :readonly="det.jml_all_penerimaan >= det.jumlahdpesan"
                  :rules="[
                    val => !isNaN(val) || 'Harus pakai Nomor'
                  ]"
                  @update:model-value="setHarga($event,det,i)"
                />
              </div>
            </div>
            <div class="row justify-between no-wrap items-center q-mb-xs">
              <div class="col-12">
                <app-input
                  ref="refHargaKcl"
                  v-model="det.harga_kcl"
                  label="Harga (Satuan kecil)"
                  outlined
                  :readonly="det.jml_all_penerimaan >= det.jumlahdpesan"
                  :rules="[
                    val => !isNaN(val) || 'Harus pakai Nomor'
                  ]"
                  @update:model-value="setHargaKcl($event,det,i)"
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
                  @update:model-value="setDiskon($event, det)"
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
                  @update:model-value="setPpn($event, det)"
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
import { useStyledStore } from 'src/stores/app/styled'
import { usePenerimaanFarmasiStore } from 'src/stores/simrs/farmasi/penerimaan/penerimaan'
import { ref } from 'vue'

const style = useStyledStore()
const store = usePenerimaanFarmasiStore()

// head
const refJenisSurat = ref(null) // inp
const refNoSurat = ref(null) // inp
const refPengirim = ref(null) // inp
const refGudang = ref(null) // auto
const refTotalFaktur = ref(null) // inp
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
  const gudang = refGudang.value.$refs.refAuto.validate()
  const noSurat = refNoSurat.value.$refs.refInput.validate()
  const pengirim = refPengirim.value.$refs.refInput.validate()
  const totalFaktur = refTotalFaktur.value.$refs.refInput.validate()

  const ppn = refPpn.value[index].refInput.validate()
  const diterima = refJmlDiterima.value[index].refInput.validate()
  const isi = refIsi.value[index].refInput.validate()
  const exp = refExp.value[index].$refs.refInputDate.validate()
  const harga = refHarga.value[index].refInput.validate()
  const hargaKcl = refHargaKcl.value[index].refInput.validate()
  if (jenisSurat && gudang && noSurat && pengirim && totalFaktur && ppn && diterima && isi && exp && harga && hargaKcl) return true
  else return false
}

function simpan(index) {
  const deta = store.details[index]
  const key = Object.keys(deta)
  key.forEach(a => {
    if (a !== 'masterobat') store.setForm(a, deta[a])
  })
  console.log('aa', store.form)
  // store.details[index].forEach(a => {
  //   console.log('each', a)
  // })
  if (validasi(index)) {
    console.log('simpan valid', store.details[index])
    store.simpanPenerimaan()
  }
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
  store.setForm('total_faktur_pbf', total)
  console.log(val)
}
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
function setDiskon(evt, val) {
  val.diskon = !isNaN(parseFloat(evt)) ? parseFloat(evt) : 0
  setHargaNet(val)
}
function setPpn(evt, val) {
  val.ppn = !isNaN(parseFloat(evt)) ? parseFloat(evt) : 0
  setHargaNet(val)
}
function setDiterima(evt, val) {
  val.inpJumlah = !isNaN(parseFloat(evt)) ? parseFloat(evt) : 0
  if (!val.isi) val.isi = 1
  val.jumlah = val.inpJumlah * val.isi
  const jmlAll = val.jumlah + val.jml_terima_lalu
  if (jmlAll > val.jumlahdpesan) {
    console.log('lebih')
    val.inpJumlah = (val.jumlahdpesan - val.jml_terima_lalu) / val.isi
    val.jumlah = val.inpJumlah * val.isi
  }
}

function setIsi(evt, val) {
  console.log('isi', parseFloat(evt))
  val.isi = !isNaN(parseFloat(evt)) ? parseFloat(evt) : 0
  if (!val.inpJumlah) val.inpJumlah = 1
  if (parseFloat(val.inpJumlah) > 0 && val.isi > 0) {
    console.log('isi if', parseFloat(evt))
    val.jumlah = val.isi * parseFloat(val.inpJumlah)

    const jmlAll = val.jumlah + val.jml_terima_lalu
    if (jmlAll > val.jumlahdpesan) {
      console.log('lebih')
      val.inpJumlah = (val.jumlahdpesan - val.jml_terima_lalu) / val.isi
      val.jumlah = val.inpJumlah * val.isi
    }
  }
}
function detKadal(evt, val) {
  val.tgl_exp = evt
}
function setTanggal(val) {
  store.setForm('tanggal', val)
}
function dispTanggal(val) {
  store.setDisp('tanggal', val)
}

function setSurat(val) {
  store.setForm('surat', val)
}
function dispSurat(val) {
  store.setDisp('surat', val)
}

function setTempo(val) {
  store.setForm('tempo', val)
}
function dispTempo(val) {
  store.setDisp('tempo', val)
}

store.getInitialData()
</script>

<template>
  <div class="q-mb-xl">
    <q-card>
      <q-card-section>
        <div class="row q-col-gutter-sm">
          <div class="col-6">
            <div class="row q-col-gutter-sm items-center q-mb-sm">
              <div class="col-4">
                Penyedia
              </div>
              <div class="col-8">
                <app-autocomplete-new
                  v-model="store.form.kdpbf"
                  label="pilih Perusahaan"
                  debounce="700"
                  autocomplete="namaperusahaan"
                  option-label="namaperusahaan"
                  option-value="kodeperusahaan"
                  outlined
                  valid
                  :loading="store.loading"
                  :source="store.perusahaans"
                  @on-select="store.perusahaanSelected"
                />
              </div>
            </div>
            <div class="row q-col-gutter-sm items-center q-mb-sm">
              <div class="col-4">
                Nomor Pemesanan
              </div>
              <div class="col-8">
                <app-autocomplete-new
                  v-model="store.form.kontrak"
                  label="pilih pemesanan"
                  autocomplete="nopemesanan"
                  option-label="nopemesanan"
                  option-value="nopemesanan"
                  outlined
                  valid
                  :loading="store.loading"
                  :source="store.kontraks"
                  @on-select="store.kontrakSelected"
                />
              </div>
            </div>
            <div class="row q-col-gutter-sm items-center q-mb-sm">
              <div class="col-4">
                Nomor BAST
              </div>
              <div class="col-8">
                <app-input
                  ref="refNoBast"
                  v-model="store.form.no_bast"
                  label="nomor BAST"
                  outlined
                  readonly
                />
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="row q-col-gutter-sm items-center q-mb-sm">
              <div class="col-4">
                Tanggal Pemesanan
              </div>
              <div class="col-8">
                {{ store.pemesanan.tanggal?dateFullFormat(store.pemesanan.tanggal):'-' }}
              </div>
            </div>
            <div class="row q-col-gutter-sm items-center q-mb-sm">
              <div class="col-4">
                Tanggal BAST
              </div>
              <div class="col-8">
                <app-input-date-human
                  ref="refTaBast"
                  :model="store.form.tanggal"
                  label="Tanggal BAST"
                  outlined
                  @set-display="setTanggalDisp"
                  @set-model="setTanggal"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          class="row justify-end"
        >
          <app-btn
            label="Simpan BAST"
            :disable="!store.tampilPenerimaans.length || store.loading"
            :loading="store.loading"
            @click="simpanBast"
          />
        </div>
      </q-card-section>
    </q-card>
    <q-card v-if="store.newPenerimaans.length">
      <q-card-section>
        <div
          class="row fit no-wrap items-center justify-start q-mb-sm q-col-gutter-sm text-weight-bold bb"
        >
          <div
            class="col-auto"
            style="width:5%"
          />

          <div class="anak">
            Nomor Pemesanan
          </div>
          <div class="anak">
            Nomor Penerimaan
          </div>
          <div class="anak">
            Tanggal Penerimaan
          </div>
          <div class="anak">
            Nomor Faktur
          </div>
          <div class="anak">
            Tanggal Faktur
          </div>
          <div class="anak">
            Nilai faktur
          </div>

          <!-- <div class="col-3">
            Total Pesanan
          </div> -->
        </div>
        <div
          v-for="(pesan, n) in store.newPenerimaans"
          ref="refPemesanans"
          :key="n"
        >
          <div
            class="row fit no-wrap items-center justify-start q-mb-sm q-col-gutter-sm"
            :class="pesan.checked?'':'bb'"
          >
            <div
              class="col-auto cursor-pointer"
              style="width:5%"
              @click="itemClicked(pesan,n)"
            >
              <q-checkbox
                v-model="pesan.checked"
                size="xs"
                dense
                @click="itemClicked(pesan,n)"
              />
            </div>

            <div class="anak">
              {{ pesan.nopemesanan }}
            </div>
            <div class="anak">
              {{ pesan.nopenerimaan }}
            </div>
            <div class="anak">
              {{ dateFullFormat(pesan.tglpenerimaan) }}
            </div>
            <div class="anak">
              <div v-if="pesan?.jenissurat==='Faktur' && pesan?.jenis_penerimaan==='Pesanan'">
                {{ pesan?.nomorsurat }}
              </div>
              <div v-if="pesan?.jenissurat!=='Faktur' && pesan?.jenis_penerimaan==='Pesanan'">
                {{ pesan?.faktur?.no_faktur }}
              </div>
            </div>
            <div class="anak">
              <div v-if="pesan?.jenissurat==='Faktur' && pesan?.jenis_penerimaan==='Pesanan'">
                {{ dateFullFormat(pesan?.tglsurat) }}
              </div>
              <div v-if="pesan?.jenissurat!=='Faktur' && pesan?.jenis_penerimaan==='Pesanan'">
                {{ dateFullFormat(pesan?.faktur?.tgl_faktur) }}
              </div>
            </div>
            <div class="anak">
              <div v-if="pesan?.jenissurat==='Faktur' && pesan?.jenis_penerimaan==='Pesanan'">
                {{ formatRpDouble(pesan.total_faktur_pbf) }}
              </div>
              <div v-if="pesan?.jenissurat!=='Faktur' && pesan?.jenis_penerimaan==='Pesanan'">
                {{ formatRpDouble(pesan?.faktur?.total_faktur) }}
              </div>
            </div>
          </div>
          <div v-if="pesan?.checked && pesan.penerimaanrinci.length">
            <div class="row q-mt-sm bb">
              <div class="q-mb-md">
                Daftar Barang Penerimaan <span class="text-weight-bold">{{ pesan?.nopenerimaan }}</span>
              </div>
              <div class="row fit no-wrap items-center q-mb-sm">
                <div class="deta text-weight-bold">
                  <div class="row">
                    <div class="col-2">
                      No
                    </div>
                    <div class="col-10">
                      Nama Barang
                    </div>
                  </div>
                </div>
                <div class="deta text-weight-bold">
                  Satuan
                </div>
                <div class="deta text-weight-bold">
                  Kuantitas
                </div>
                <div class="deta text-weight-bold">
                  Harga
                </div>
                <div class="deta text-weight-bold">
                  Diskon (%)
                </div>
                <div class="deta text-weight-bold">
                  PPN (%)
                </div>
                <div class="deta text-weight-bold">
                  Harga Netto
                </div>
                <div class="deta text-weight-bold">
                  Nilai Retur
                </div>
                <div class="deta text-weight-bold">
                  Jumlah
                </div>
              </div>
              <div
                v-for="(det, j) in pesan?.penerimaanrinci"
                ref="refDetails"
                :key="j"
                class="row fit no-wrap items-center q-mb-xs"
              >
                <div class="deta">
                  <div class="row">
                    <div class="col-2">
                      {{ j+1 }}
                    </div>
                    <div class="col-10">
                      {{ det?.masterobat?.nama_obat }}
                    </div>
                  </div>
                </div>
                <div class="deta">
                  {{ det?.masterobat?.satuan_b }}
                </div>
                <div class="deta">
                  {{ det.jml_terima_b }}
                </div>
                <div class="deta">
                  {{ formatRpDouble(det.harga,2) }}
                </div>
                <div class="deta">
                  {{ det.diskon }} %
                  <!-- <app-input
                    v-model="det.diskon"
                    outlined
                    label="diskon"
                    dense
                    type="number"
                    @focus="assign(n,i,j)"
                    @update:model-value="updateHargaDis($event,det)"
                  /> -->
                </div>
                <div class="deta">
                  {{ det.ppn }} %
                  <!-- <app-input
                    v-model="det.ppn"
                    outlined
                    label="PPN"
                    dense
                    type="number"
                    @focus="assign(n,i,j)"
                    @update:model-value="updateHargaPpn($event,det)"
                  /> -->
                </div>
                <div class="deta">
                  {{ formatRpDouble(det?.harga_netto,2) }}
                  <!-- <app-input
                    v-model="det.sub_total"
                    outlined
                    label="Sub Total"
                    dense
                    type="number"
                    @focus="assign(n,i,j)"
                    @update:model-value="updateHargaJadi"
                  /> -->
                  <!-- {{ formatRpDouble(det.harga_jadi,2) }} -->
                </div>
                <!-- nilai retur -->
                <div class="deta">
                  {{ formatRpDouble(det?.nilai_retur,2) }}
                </div>
                <!-- nilai faktur dikurangi nilai retur -->
                <div class="deta">
                  {{ formatRpDouble(det?.subtotal,2) }}
                </div>
              </div>
              <div class="row fit no-wrap items-center q-mb-sm">
                <div class="deta text-weight-bold" />
                <div class="deta text-weight-bold" />
                <div class="deta text-weight-bold" />
                <div class="deta text-weight-bold" />
                <div class="deta text-weight-bold" />
                <div class="deta text-weight-bold" />
                <div class="deta text-weight-bold" />
                <div class="deta text-weight-bold">
                  Total
                </div>
                <div class="deta text-weight-bold">
                  {{ formatRpDouble(pesan?.jumlah_bast,2) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { date } from 'quasar'
import { dateFullFormat, formatRpDouble } from 'src/modules/formatter'
import { findWithAttr, notifErrVue } from 'src/modules/utils'
import { useTransaksiBastFarmasiStore } from 'src/stores/simrs/farmasi/bast/bast'
import { ref } from 'vue'

/**
 * Yang di BAST kan dari penyedia yang sama yang belum terbayar,
 * bisa lebih dari satu pemesanan,
 * dan bisa jadi satu pemesanan ada beberapa penerimaan
 */
const store = useTransaksiBastFarmasiStore()

store.getInitialData()

function setTanggal(val) {
  store.setForm('tgl_bast', date.formatDate(val, 'YYYY-MM-DD'))
}
function setTanggalDisp(val) {
  store.setForm('tanggal', val)
  console.log('form ', store.form)
}

// eslint-disable-next-line no-unused-vars
function pesanClicked(val, i) {
  console.log('pesanan', val)
}
let indPem = 0
let indPene = 0
// let indDet = 0
// eslint-disable-next-line no-unused-vars
function assign(n, i, j) {
  indPem = n
  indPene = i
  // indDet = j
}
// eslint-disable-next-line no-unused-vars
function updateHargaKo(evt, val) {
  const value = !isNaN(evt) && evt !== '' ? parseFloat(evt) : 0
  val.harga_kontrak = value
  updateHarga(val)
}
// eslint-disable-next-line no-unused-vars
function updateHargaDis(evt, val) {
  const value = !isNaN(evt) && evt !== '' ? parseFloat(evt) : 0
  val.diskon = value
  updateHarga(val)
}
// eslint-disable-next-line no-unused-vars
function updateHargaPpn(evt, val) {
  const value = !isNaN(evt) && evt !== '' ? parseFloat(evt) : 0
  val.ppn = value
  updateHarga(val)
}
function updateHarga(val) {
  const hargaKontrak = !isNaN(val.harga_kontrak) && val.harga_kontrak !== '' ? parseFloat(val.harga_kontrak) : 0

  const diskon = (val.diskon / 100) * hargaKontrak
  const hargaDiskon = hargaKontrak - diskon
  const ppn = (val.ppn / 100) * hargaDiskon
  const ppnRp = ppn
  val.harga_jadi = hargaKontrak - diskon + ppnRp
  val.sub_total = (hargaKontrak - diskon + ppnRp) * val.qty
  console.log(val)
  // (store.pemesanans[indPem].penerimaan[indPene].details[indDet].qty *
  // parseFloat(store.pemesanans[indPem].penerimaan[indPene].details[indDet].harga_kontrak) -
  // parseFloat(store.pemesanans[indPem].penerimaan[indPene].details[indDet].diskon) +
  // ((parseFloat(store.pemesanans[indPem].penerimaan[indPene].details[indDet].harga_kontrak *
  // store.pemesanans[indPem].penerimaan[indPene].details[indDet].qty) *
  // parseFloat(store.pemesanans[indPem].penerimaan[indPene].details[indDet].ppn) / 100))

  store.pemesanans[indPem].penerimaan[indPene].nilai_tagihan = store.pemesanans[indPem].penerimaan[indPene].details.map(x => x.sub_total).reduce((a, b) => a + b, 0)
}
// eslint-disable-next-line no-unused-vars
function updateHargaJadi(val) {
  // console.log(val)
  store.pemesanans[indPem].penerimaan[indPene].nilai_tagihan = store.pemesanans[indPem].penerimaan[indPene].details.map(x => x.sub_total).reduce((a, b) => a + b, 0)
}

// eslint-disable-next-line no-unused-vars
function checkBox(val) {
  // console.log('cek bok', val)
}
function itemClicked(val, i) {
  console.log('item clicked', val)
  // val.checked = !val.checked
  const ind = findWithAttr(store.tampilPenerimaans, 'id', val.id)
  if (val.checked === true) {
    if (ind < 0) {
      console.log('push')
      store.tampilPenerimaans.push(val)
    } else {
      console.log('sama dengan')
      store.tampilPenerimaans[ind] = val
    }
  } else {
    if (ind >= 0) {
      store.tampilPenerimaans.splice(ind, 1)
      console.log('slice', ind)
    }
  }
  console.log('clicked bottom', store.tampilPenerimaans)
}
const refTaBast = ref(null)
const refNoBast = ref(null)
const refHargaKontrak = ref(null)
const refPemesanans = ref(null)
// eslint-disable-next-line no-unused-vars
const refPenerimaans = ref(null)
const refDetails = ref(null)
function simpanBast() {
  refHargaKontrak?.value?.forEach(kuylah => {
    console.log('harga Kontrak', kuylah.refInput.validate())
  })
  // console.log('harga Kontrak', refHargaKontrak.value[0].refInput)
  // store.form.details = store.penerimaans.filter(x => x.checked)
  const temp = store.pemesanans
  store.form.penerimaans = temp.map(psn => {
    const anu = psn
    psn.penerimaan = psn.penerimaan.filter(trm => trm.checked)
    if (anu.penerimaan.length) return anu.penerimaan
    else return false
  }).filter(x => x !== false)
  console.log('form', store.form)
  if (refTaBast.value.$refs.refInputDate.validate()) {
    // store.form.pemesanans = temp.map(psn => {
    //   const anu = psn
    //   psn.penerimaan = psn.penerimaan.filter(trm => trm.checked)
    //   return anu
    // }).filter(x => x.checked)
    console.log('form', store.form)
    console.log('pemesanan', store.pemesanans)
    store.simpanBast().then(() => {
      refNoBast.value.$refs.refInput.resetValidation()
      refTaBast.value.$refs.refInputDate.resetValidation()
    })
  } else {
    notifErrVue('Tanggal BAST Belum di isi')
  }
}

</script>
<style lang="scss" scoped>
.anak{
  width:calc(100vw/7);
  margin-right: .5em;
  overflow-wrap: anywhere;
}
.disp{
  width:calc(100vw/5);
  overflow-wrap: anywhere;
}
.deta{
  width:calc(100vw/10);
  margin-right: .5em;
  overflow-wrap: anywhere;
}
.wrap-it{
  overflow-wrap: anywhere;
}
.bb{
  border-bottom: 1px solid black;
}
</style>

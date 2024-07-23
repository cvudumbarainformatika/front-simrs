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
                  v-model="store.form.nopemesanan"
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
            <!-- <div class="row q-col-gutter-sm items-center q-mb-sm">
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
            </div> -->
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
                  @db-model="setTanggal"
                />
              </div>
            </div>
            <div class="row q-col-gutter-sm items-center q-mb-sm">
              <div class="col-4">
                Jumlah BAST
              </div>
              <div class="col-8 text-weight-bold">
                <!-- {{ isNaN(parseFloat(store.form.jumlah_bast)) ? 0 : formatRpDouble(store.form.jumlah_bast,2) }} -->
                <app-input
                  v-model="store.form.jumlah_bastx"
                  outlined
                  label="Jumlah BAST"
                  dense
                  valid
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
                  PPN (11%)
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
                  <!-- {{ formatRpDouble(det.harga,2) }} -->
                  <app-input
                    v-model="det.harga"
                    outlined
                    label="Harga"
                    dense
                    @update:model-value="updateHargaAll($event,det,pesan,'harga')"
                  />
                </div>
                <div class="deta">
                  <!-- {{ det.diskon }} % -->
                  <app-input
                    v-model="det.diskon"
                    outlined
                    label="diskon"
                    dense
                    valid
                    @update:model-value="updateHargaAll($event,det,pesan,'diskon')"
                  />
                </div>
                <div class="deta">
                  <!-- {{ det.ppn }} % -->
                  <!-- <app-input
                    v-model="det.ppn"
                    outlined
                    label="PPN"
                    dense
                    valid
                    @update:model-value="updateHargaAll($event,det,pesan,'ppn')"
                  /> -->
                  <q-checkbox
                    v-model="det.adaPPN"
                    label="PPN 11%"
                    :disable="det.jml_all_penerimaan >= det.jumlahdpesan"
                    @update:model-value="adaPPN($event,det,pesan)"
                  />
                </div>
                <div class="deta">
                  {{ formatRpDouble(det?.harga_netto,2) }}
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
                  {{ formatRpDouble(pesan?.subtotal_bast,2) }}
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

function setTanggal (val) {
  store.setForm('tgl_bast', date.formatDate(val, 'YYYY-MM-DD'))
}
function setTanggalDisp (val) {
  store.setForm('tanggal', val)
  console.log('form ', store.form)
}

function adaPPN (evt, det, pesan) {
  // console.log('ada ppn', evt, det)
  if (evt) updateHargaAll('11', det, pesan, 'ppn')
  if (!evt) updateHargaAll('0', det, pesan, 'ppn')
}
function updateHargaAll (evt, det, trm, key) {
  const inc = evt.includes('.')
  const ind = evt.indexOf('.')
  const panj = evt.length
  const nilai = isNaN(parseFloat(evt)) ? 0 : (inc && (ind === (panj - 1)) ? evt : parseFloat(evt))
  console.log('nilai', parseFloat(evt), isNaN(parseFloat(evt)))
  det[key] = nilai

  const isi = det.isi
  const harga = det.harga ?? 0
  let hargaKcl = det.harga_kcl
  const diskon = det.diskon ?? 0
  const ppn = det.ppn ?? 0
  const jmlTerimaB = det.jml_terima_b
  const jmlTerimaK = det.jml_terima_k

  const diskonRp = harga * (diskon / 100)
  const hargaSetelahDiskon = harga - diskonRp
  const ppnRp = isNaN(hargaSetelahDiskon * (ppn / 100)) ? 0 : hargaSetelahDiskon * (ppn / 100)
  const hargaPembelian = hargaSetelahDiskon + ppnRp
  const subtotal = hargaPembelian * jmlTerimaB

  if (key === 'harga' || key === 'isi') hargaKcl = harga / isi

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
  det.nilai_retur = det.jumlah_retur * det.harga_netto_kecil
  det.subtotal = subtotal

  det.afterRetur = parseFloat(det.subtotal) - parseFloat(det.nilai_retur)

  // jumlahkan semua nilai bast
  trm.subtotal_bast = trm.penerimaanrinci.map(a => parseFloat(a.afterRetur)).reduce((a, b) => a + b, 0)
  if (store.tampilPenerimaans.length > 0) store.form.jumlah_bast = store.tampilPenerimaans.map(a => parseFloat(a.subtotal_bast)).reduce((a, b) => a + b, 0)
  store.form.jumlah_bastx = store.form.jumlah_bast
}

function itemClicked (val, i) {
  console.log('item clicked', val)
  // val.checked = !val.checked
  const ind = findWithAttr(store.tampilPenerimaans, 'id', val.id)
  if (val.checked === true) {
    if (ind < 0) {
      // console.log('push')
      store.tampilPenerimaans.push(val)
    }
    else {
      // console.log('sama dengan')
      store.tampilPenerimaans[ind] = val
    }
  }
  else {
    if (ind >= 0) {
      store.tampilPenerimaans.splice(ind, 1)
      // console.log('slice', ind)
    }
  }
  store.form.jumlah_bast = 0
  if (store.tampilPenerimaans.length > 0) store.form.jumlah_bast = store.tampilPenerimaans.map(a => parseFloat(a.subtotal_bast)).reduce((a, b) => a + b, 0)
  store.form.jumlah_bastx = store.form.jumlah_bast
  console.log('clicked bottom', store.tampilPenerimaans)
}
const refTaBast = ref(null)
// const refNoBast = ref(null)
const refPemesanans = ref(null)
const refDetails = ref(null)
function simpanBast () {
  store.newPenerimaans?.forEach(ter => {
    ter.subtotal_retur = ter.penerimaanrinci.map(a => parseFloat(a.nilai_retur)).reduce((a, b) => a + b, 0)
  })
  const temp = store.newPenerimaans
  console.log('temp', temp)
  store.form.penerimaans = temp.filter(x => x !== false)

  if (!store.form.penerimaans.length) notifErrVue('Belum ada Penerimaan dipilih')
  console.log('form', store.form)
  if (refTaBast.value.$refs.refInputDate.validate()) {
    // console.log('form', store.form)
    console.log('pemesanan', store.newPenerimaans)
    store.simpanBast().then(() => {
      refTaBast.value.$refs.refInputDate.resetValidation()
    })
  }
  else {
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

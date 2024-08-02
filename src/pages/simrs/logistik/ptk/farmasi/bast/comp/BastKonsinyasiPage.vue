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
                  autocomplete="nama"
                  option-label="nama"
                  option-value="kode"
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
                Nomor Transaksi Konsinyasi
              </div>
              <div class="col-8">
                <app-autocomplete-new
                  v-model="store.form.notranskonsi"
                  label="pilih pemesanan"
                  autocomplete="notranskonsi"
                  option-label="notranskonsi"
                  option-value="notranskonsi"
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
                Tanggal Transaksi Konsinyasi
              </div>
              <div class="col-8">
                {{ store.penerimaan.tgl_trans?dateFullFormat(store.penerimaan.tgl_trans):'-' }}
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
            Nomor Trans Konsinyasi
          </div>

          <div class="anak">
            Tanggal Trans
          </div>

          <div class="anak">
            Nilai Konsinyasi
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
              {{ pesan?.notranskonsi }}
            </div>
            <div class="anak">
              {{ dateFullFormat(pesan?.tgl_trans) }}
            </div>

            <div class="anak">
              {{ formatRpDouble(pesan?.subtotal_bast) }}
            </div>
          </div>
          <div v-if="pesan?.checked && pesan.rinci.length">
            <div class="row q-mt-sm bb">
              <div class="q-mb-md">
                Daftar Barang Konsinyasi Terpakai
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
                  Jumlah
                </div>
              </div>
              <div
                v-for="(det, j) in pesan?.rinci"
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
                      {{ det?.obat?.nama_obat }}
                    </div>
                  </div>
                </div>
                <div class="deta">
                  {{ det?.obat?.satuan_k }}
                </div>
                <div class="deta">
                  {{ det.jumlah }}
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
                  {{ formatRpDouble(det?.harga_net,2) }}
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
import { useTransaksiBastKonsinyasiFarmasiStore } from 'src/stores/simrs/farmasi/bast/bastkonsinyasi'
import { ref } from 'vue'

/**
 * Yang di BAST kan dari penyedia yang sama yang belum terbayar,
 * bisa lebih dari satu pemesanan,
 * dan bisa jadi satu pemesanan ada beberapa penerimaan
 */
const store = useTransaksiBastKonsinyasiFarmasiStore()

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
  const nilai = isNaN(parseFloat(evt)) ? 0 : (inc && (ind === (panj - 2)) ? evt : parseFloat(evt))
  console.log('nilai', parseFloat(evt), isNaN(parseFloat(evt)))
  det[key] = nilai

  const harga = det.harga ?? 0
  const diskon = det.diskon ?? 0
  const ppn = det.ppn ?? 0
  const jmlTerimaK = det.jumlah

  const diskonRp = harga * (diskon / 100)
  const hargaSetelahDiskon = harga - diskonRp
  const ppnRp = isNaN(hargaSetelahDiskon * (ppn / 100)) ? 0 : hargaSetelahDiskon * (ppn / 100)
  const hargaPembelian = hargaSetelahDiskon + ppnRp
  const subtotal = hargaPembelian * jmlTerimaK

  det.harga = harga
  det.diskon = diskon
  det.ppn = ppn
  det.jumlah = jmlTerimaK
  det.diskon_rp = diskonRp
  det.ppn_rp = ppnRp
  det.harga_net = hargaPembelian
  det.subtotal = subtotal

  // jumlahkan semua nilai bast
  trm.subtotal_bast = trm.rinci.map(a => parseFloat(a.subtotal)).reduce((a, b) => a + b, 0)
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
  const temp = store.newPenerimaans
  console.log('temp', temp)
  store.form.list = temp.filter(x => x !== false)

  if (!store.form.list.length) notifErrVue('Belum ada transaksi yang dipilih')
  console.log('form', store.form)
  if (refTaBast.value.$refs.refInputDate.validate()) {
    console.log('form', store.form)
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
  width:calc(100vw/3);
  margin-right: .5em;
  overflow-wrap: anywhere;
}
.disp{
  width:calc(100vw/5);
  overflow-wrap: anywhere;
}
.deta{
  width:calc(100vw/9);
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

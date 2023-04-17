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
                  v-model="store.form.kode_perusahaan"
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
                Nomor kontrak
              </div>
              <div class="col-8">
                <app-autocomplete-new
                  v-model="store.form.kontrak"
                  label="pilih Kontrak"
                  autocomplete="kontrak"
                  option-label="kontrak"
                  option-value="kontrak"
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
                  :loading="store.loadingNomor"
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
      <!--
      <q-card-section>
          <div class="f-14 text-weight-bold q-mb-sm">
          Daftar Pemesanan
        </div> -->

      <!-- <div class="f-14 text-weight-bold q-mb-sm">
          Daftar Penerimaan
        </div>
        <div v-if="store.penerimaans.length">
          <q-list
            bordered
            separator
          >
            <q-item
              v-ripple
              clickable
            >
              <q-item-section>
                <div class="row fit no-wrap justify-start items-center text-weight-bolder">
                  <div class="anak">
                    Nomor Faktur
                  </div>
                  <div class="anak">
                    Tanggal Faktur
                  </div>
                  <div class="anak">
                    Nilai faktur
                  </div>
                  <div class="anak">
                    Nomor Pemesanan
                  </div>
                  <div class="anak">
                    Nomor Penerimaan
                  </div>
                </div>
              </q-item-section>
            </q-item>
            <q-item
              v-for="(item,i) in store.penerimaans"
              :key="i"
              v-ripple
              clickable
            >
              <q-item-section>
                <q-item-label>
                  <div class="row fit no-wrap justify-start items-center q-mb-sm">
                    <div
                      class="anak"
                      @click="itemClicked(item,i)"
                    >
                      <div class="row">
                        <div
                          class="col-1"
                          @click="itemClicked(item,i)"
                        >
                          <q-checkbox
                            v-model="item.checked"
                            size="xs"
                            dense
                            @click="itemClicked(item,i)"
                            @update:model-value="checkBox"
                          />
                        </div>
                        <div class="col-11">
                          {{ item.faktur?item.faktur:'-' }}
                        </div>
                      </div>
                    </div>
                    <div class="anak">
                      {{ item.tanggal_faktur?dateFullFormat( item.tanggal_faktur):'-' }}
                    </div>
                    <div class="anak">
                      {{ item.nilai_tagihan?formatRpDouble(item.nilai_tagihan,2):'-' }}
                    </div>
                    <div class="anak">
                      {{ item.nomor }}
                    </div>
                    <div class="anak">
                      {{ item.no_penerimaan }}
                    </div>
                  </div>
                </q-item-label>
                <q-item-label v-if="item.checked">
                  <q-separator />
                  <div class="row q-mt-sm">
                    <div class="q-mb-md">
                      Daftar Barang Pesanan <span class="text-weight-bold">{{ item.nomor }}</span>
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
                        Harga Pemesanan
                      </div>
                      <div class="deta text-weight-bold">
                        Harga Kontrak
                      </div>
                      <div class="deta text-weight-bold">
                        Diskon (Rp)
                      </div>
                      <div class="deta text-weight-bold">
                        PPN (%)
                      </div>
                      <div class="deta text-weight-bold">
                        Jumlah
                      </div>
                    </div>
                    <div
                      v-for="(det, j) in item.details"
                      :key="j"
                      class="row fit no-wrap items-center q-mb-xs"
                    >
                      <div class="deta">
                        <div class="row">
                          <div class="col-2">
                            {{ j+1 }}
                          </div>
                          <div class="col-10">
                            {{ det.nama_barang }}
                          </div>
                        </div>
                      </div>
                      <div class="deta">
                        {{ det.satuan_besar }}
                      </div>
                      <div class="deta">
                        {{ det.qty }}
                      </div>
                      <div class="deta">
                        {{ formatRpDouble(det.harga,2) }}
                      </div>
                      <div class="deta">
                        <app-input
                          v-model="det.harga_kontrak"
                          outlined
                          label="harga kontrak"
                          dense
                          type="number"
                          @focus="assign(i,j)"
                          @update:model-value="updateHarga"
                        />
                      </div>
                      <div class="deta">
                        <app-input
                          v-model="det.diskon"
                          outlined
                          label="diskon"
                          dense
                          @focus="assign(i,j)"
                          @update:model-value="updateHarga"
                        />
                      </div>
                      <div class="deta">
                        <app-input
                          v-model="det.ppn"
                          outlined
                          label="PPN"
                          dense
                          @focus="assign(i,j)"
                          @update:model-value="updateHarga"
                        />
                      </div>
                      <div class="deta">
                        {{ formatRpDouble(det.harga_jadi,2) }}

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
                        {{ formatRpDouble(item.nilai_tagihan,2) }}
                      </div>
                    </div>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div v-else-if="store.loading">
          <app-loading />
        </div>
        <div v-else>
          <app-no-data />
        </div>
      </q-card-section>
        -->
      <!-- <q-card-actions align="right">
        <div
          v-if="store.tampilPenerimaans.length"
          class="row justify-end"
        >
          <app-btn
            label="Simpan BAST"
            :loading="store.loading"
            :disable="store.loading"
            @click="simpanBast"
          />
        </div>
      </q-card-actions> -->
    </q-card>
    <q-card v-if="store.pemesanans.length">
      <q-card-section>
        <div
          class="row fit no-wrap items-center justify-start q-mb-sm q-col-gutter-sm text-weight-bold bb"
        >
          <div
            class="col-1"
          />
          <div class="col-5">
            Nomor Pemesanan
          </div>
          <div class="col-3">
            Tanggal
          </div>
          <div class="col-3">
            Total Pesanan
          </div>
        </div>
        <div
          v-for="(pesan, n) in store.pemesanans"
          ref="refPemesanans"
          :key="n"
        >
          <div
            class="row fit no-wrap items-center justify-start q-mb-sm q-col-gutter-sm"
            :class="pesan.checked?'':'bb'"
          >
            <div
              class="col-1 cursor-pointer"
              @click="pesanClicked(pesan,n)"
            >
              <q-checkbox
                v-model="pesan.checked"
                size="xs"
                dense
                @click="pesanClicked(pesan,n)"
              />
            </div>
            <div class="col-5">
              {{ pesan.nomor }}
            </div>
            <div class="col-3">
              {{ dateFullFormat(pesan.tanggal) }}
            </div>
            <div class="col-3">
              {{ formatRpDouble(pesan.total) }}
            </div>
          </div>
          <div v-if="pesan.checked && pesan.penerimaan.length">
            <div class="row fit no-wrap justify-start items-center text-weight-bolder">
              <div class="anak">
                Nomor Faktur
              </div>
              <div class="anak">
                Tanggal Faktur
              </div>
              <div class="anak">
                Nilai faktur
              </div>
              <div class="anak">
                Nomor Pemesanan
              </div>
              <div class="anak">
                Nomor Penerimaan
              </div>
            </div>
            <div
              v-for="(item,i) in pesan.penerimaan"
              ref="refPenerimaans"
              :key="i"
            >
              <div
                class="row fit no-wrap items-center justify-start q-mb-sm q-col-gutter-sm"
                :class="item.checked?'':'bb'"
              >
                <div
                  class="anak"
                  @click="itemClicked(item,i)"
                >
                  <div class="row">
                    <div
                      class="col-1"
                      @click="itemClicked(item,i)"
                    >
                      <q-checkbox
                        v-model="item.checked"
                        size="xs"
                        dense
                        @click="itemClicked(item,i)"
                        @update:model-value="checkBox"
                      />
                    </div>
                    <div class="col-11">
                      {{ item.faktur?item.faktur:'-' }}
                    </div>
                  </div>
                </div>
                <div class="anak">
                  {{ item.tanggal_faktur?dateFullFormat( item.tanggal_faktur):'-' }}
                </div>
                <div class="anak">
                  {{ item.nilai_tagihan?formatRpDouble(item.nilai_tagihan,2):'-' }}
                </div>
                <div class="anak">
                  {{ item.nomor }}
                </div>
                <div class="anak">
                  {{ item.no_penerimaan }}
                </div>
              </div>
              <div v-if="item.checked">
                <div class="row q-mt-sm bb">
                  <div class="q-mb-md">
                    Daftar Barang Pesanan <span class="text-weight-bold">{{ item.nomor }}</span>
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
                      Harga Pemesanan
                    </div>
                    <div class="deta text-weight-bold">
                      Harga Kontrak
                    </div>
                    <div class="deta text-weight-bold">
                      Diskon (Rp)
                    </div>
                    <div class="deta text-weight-bold">
                      PPN (%)
                    </div>
                    <div class="deta text-weight-bold">
                      Jumlah
                    </div>
                  </div>
                  <div
                    v-for="(det, j) in item.details"
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
                          {{ det.nama_barang }}
                        </div>
                      </div>
                    </div>
                    <div class="deta">
                      {{ det.satuan_besar }}
                    </div>
                    <div class="deta">
                      {{ det.qty }}
                    </div>
                    <div class="deta">
                      {{ formatRpDouble(det.harga,2) }}
                    </div>
                    <div class="deta">
                      <app-input
                        ref="refHargaKontrak"
                        v-model="det.harga_kontrak"
                        outlined
                        label="harga kontrak"
                        dense
                        type="number"
                        :rules="[val=> val > 0 ||'Harus lebih besar dari 0']"
                        @focus="assign(n,i,j)"
                        @update:model-value="updateHarga"
                      />
                    </div>
                    <div class="deta">
                      <app-input
                        v-model="det.diskon"
                        outlined
                        label="diskon"
                        dense
                        type="number"
                        @focus="assign(n,i,j)"
                        @update:model-value="updateHarga"
                      />
                    </div>
                    <div class="deta">
                      <app-input
                        v-model="det.ppn"
                        outlined
                        label="PPN"
                        dense
                        type="number"
                        @focus="assign(n,i,j)"
                        @update:model-value="updateHarga"
                      />
                    </div>
                    <div class="deta">
                      {{ formatRpDouble(det.harga_jadi,2) }}
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
                      {{ formatRpDouble(item.nilai_tagihan,2) }}
                    </div>
                  </div>
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
import { useTransaksiBastStore } from 'src/stores/simrs/logistik/sigarang/transaksi/bast/bast'
import { ref } from 'vue'

/**
 * Yang di BAST kan dari penyedia yang sama yang belum terbayar,
 * bisa lebih dari satu pemesanan,
 * dan bisa jadi satu pemesanan ada beberapa penerimaan
 */
const store = useTransaksiBastStore()

store.getInitialData()

function setTanggal(val) {
  store.setForm('tanggal', val)
  store.setForm('tanggal_bast', date.formatDate(val, 'YYYY-MM-DD'))
}

function pesanClicked(val, i) {
  console.log('pesanan', val)
}
let indPem = 0
let indPene = 0
let indDet = 0
function assign(n, i, j) {
  indPem = n
  indPene = i
  indDet = j
}
function updateHarga(val) {
  // console.log(val)
  store.pemesanans[indPem].penerimaan[indPene].details[indDet].harga_jadi =
  (store.pemesanans[indPem].penerimaan[indPene].details[indDet].qty *
  parseFloat(store.pemesanans[indPem].penerimaan[indPene].details[indDet].harga_kontrak)) -
  parseFloat(store.pemesanans[indPem].penerimaan[indPene].details[indDet].diskon) +
  ((parseFloat(store.pemesanans[indPem].penerimaan[indPene].details[indDet].harga_kontrak * store.pemesanans[indPem].penerimaan[indPene].details[indDet].qty) *
  parseFloat(store.pemesanans[indPem].penerimaan[indPene].details[indDet].ppn) / 100))
  store.pemesanans[indPem].penerimaan[indPene].nilai_tagihan = store.pemesanans[indPem].penerimaan[indPene].details.map(x => x.harga_jadi).reduce((a, b) => a + b, 0)
}

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
const refPenerimaans = ref(null)
const refDetails = ref(null)
function simpanBast() {
  refHargaKontrak.value.forEach(kuylah => {
    console.log('harga Kontrak', kuylah.refInput.validate())
  })
  // console.log('harga Kontrak', refHargaKontrak.value[0].refInput)
  // store.form.details = store.penerimaans.filter(x => x.checked)
  if (refTaBast.value.$refs.refInputDate.validate()) {
    const temp = store.pemesanans
    store.form.penerimaans = temp.map(psn => {
      const anu = psn
      psn.penerimaan = psn.penerimaan.filter(trm => trm.checked)
      if (anu.penerimaan.length) return anu.penerimaan
      else return false
    }).filter(x => x !== false)
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
  width:calc(100vw/6);
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

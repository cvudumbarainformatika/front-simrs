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
                Nomor Pemesanan
              </div>
              <div class="col-8">
                <app-autocomplete-new
                  v-model="store.form.nomor"
                  label="pilih Pemesanan"
                  autocomplete="nomor"
                  option-label="nomor"
                  option-value="nomor"
                  outlined
                  valid
                  :loading="store.loading"
                  :source="store.pemesanans"
                  @on-select="store.pemesananSelected"
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
      <q-card-section>
        <div class="f-14 text-weight-bold q-mb-sm">
          Daftar Penerimaan
        </div>
        <div v-if="store.penerimaans.length">
          <!-- {{ store.penerimaans }} -->
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
              <!-- @click="itemClicked(item,i)" -->
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
                        <!-- {{ formatRpDouble(det.harga_kontrak,2) }} -->
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
                        <!-- {{ det.diskon }} -->
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
                        <!-- {{ det.ppn }} -->
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
                        <!-- <app-input
                          v-model="det.harga_jadi"
                          outlined
                          label="harga jadi"
                          dense
                        /> -->
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
      <q-card-actions align="right">
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
      </q-card-actions>
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

let indPene = 0
let indDet = 0
function assign(i, j) {
  indPene = i
  indDet = j
}
function updateHarga(val) {
  // console.log(val)
  store.penerimaans[indPene].details[indDet].harga_jadi = parseFloat(store.penerimaans[indPene].details[indDet].harga_kontrak) - parseFloat(store.penerimaans[indPene].details[indDet].diskon) + (parseFloat(store.penerimaans[indPene].details[indDet].harga_kontrak) * parseFloat(store.penerimaans[indPene].details[indDet].ppn) / 100)
  store.penerimaans[indPene].nilai_tagihan = store.penerimaans[indPene].details.map(x => x.harga_jadi).reduce((a, b) => a + b, 0)
}

function checkBox(val) {
  // console.log('cek bok', val)
}
function itemClicked(val, i) {
  console.log('item clicked', val)
  val.checked = !val.checked
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
function simpanBast() {
  // console.log('no bast', refNoBast.value.$refs.refInput.resetValidation())
  // store.form.details = store.penerimaans.filter(x => x.checked)
  // console.log('form', store.form)
  if (refTaBast.value.$refs.refInputDate.validate()) {
    store.form.penerimaans = store.penerimaans.filter(x => x.checked)
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
</style>

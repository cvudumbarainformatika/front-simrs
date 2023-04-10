<template>
  <div>
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
                  :model="store.form.tanggal_bast"
                  label="Tanggal BAST"
                  outlined
                  @set-model="setTanggal"
                />
              </div>
            </div>
          </div>
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
                <div class="row fit no-wrap justify-start items-center">
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
              @click="itemClicked(item,i)"
            >
              <q-item-section>
                <div class="row fit no-wrap justify-start items-center">
                  <div class="anak">
                    <div class="row">
                      <div class="col-1">
                        <q-checkbox
                          v-model="item.checked"
                          size="xs"
                          dense
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
                    {{ item.nilai_tagihan?item.nilai_tagihan:'-' }}
                  </div>
                  <div class="anak">
                    {{ item.nomor }}
                  </div>
                  <div class="anak">
                    {{ item.no_penerimaan }}
                  </div>
                </div>
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
      <q-card-section>
        <div class="f-14 text-weight-bold">
          Daftar Barang
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { dateFullFormat } from 'src/modules/formatter'
import { useTransaksiBastStore } from 'src/stores/simrs/logistik/sigarang/transaksi/bast/bast'

/**
 * Yang di BAST kan dari penyedia yang sama yang belum terbayar,
 * bisa lebih dari satu pemesanan,
 * dan bisa jadi satu pemesanan ada beberapa penerimaan
 */
const store = useTransaksiBastStore()

store.getInitialData()

function setTanggal(val) {
  store.setForm('tanggal_bast', val)
}

function toggle(val) {
  return !val
}

function itemClicked(val, i) {
  val.checked = toggle(val.checked)
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
</style>

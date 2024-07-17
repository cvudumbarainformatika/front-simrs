<template>
  <!-- <div
    class="fixed-top row items-center justify-end q-mr-sm"
    style="z-index: 10;"
  >
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
  </div> -->
  <div class="q-mr-sm" style="white-space: normal !important;">
    <app-table-extend
      :columns="store.columns"
      :column-hide="store.columnHide"
      :items="store.items"
      :meta="store.meta"
      :per-page="store.param.per_page"
      :loading="store.loading"
      :to-search="store.param.cari"
      :click-able="true"
      :default-btn="false"
      :ada-tambah="false"
      :ada-filter="false"
      row-no
      use-full
      @find="store.setSearch"
      @goto="store.setPage"
      @set-row="store.setPerPage"
      @refresh="store.refreshTable"
      @on-click="onClick"
    >
    <template #header-left-after-search>
      <div class="q-ml-sm row">
        <div class="col-auto">
          <app-autocomplete-new
            :model="store.param.jenispenerimaan"
            autocomplete="nama"
            option-label="nama"
            option-value="nama"
            label="Jenis Penerimaan"
            outlined
            dark
            valid
            :source="store.jenisPenerimaans"
            @on-select="store.jenisPenerimaanSelected"
            @clear="store.clearJenisPenerimaan"
          />
        </div>
        <div class="col-auto q-ml-sm">
          <q-btn
            outline
            color="grey-8"
            class="bg-white"
            no-caps
          >
            <div class="flex items-center q-mx-xs">
              <div class="f-12 q-mr-sm">
                {{ store.header.periode }}
              </div>
              <transition>
                <q-icon
                  :name="`${showMenuPeriode?'icon-mat-keyboard_arrow_up':'icon-mat-keyboard_arrow_down'}`"
                  size="16px"
                />
              </transition>
            </div>

            <q-menu
              @show="showMenuPeriode=true"
              @hide="showMenuPeriode=false"
            >
              <div class="row no-wrap q-pa-sms">
                <q-list style="min-width: 100px">
                  <q-item
                    v-for="item in store.periods"
                    :key="item"
                    clickable
                    :active="item === store.header.periode"
                    active-class="bg-primary text-white"
                    :disable="item === 'Custom'"
                    @click="store.setPeriode(item)"
                  >
                    <q-item-section>{{ item }}</q-item-section>
                  </q-item>
                </q-list>
                <q-separator
                  vertical
                  inset
                />

                <div class="column">
                  <div class="row q-pa-sm q-col-gutter-sm">
                    <div class="col">
                      <q-date
                        v-model="store.param.from"
                        minimal
                        bordered
                        flat
                        mask="YYYY-MM-DD"
                        @update:model-value="store.setPeriode('Custom')"
                      />
                      <div class="f-10 text-grey-8 q-mt-xs">
                        DARI TANGGAL : <b>{{ store.param.from }}</b>
                      </div>
                    </div>
                    <div class="col">
                      <q-date
                        v-model="store.param.to"
                        minimal
                        bordered
                        flat
                        mask="YYYY-MM-DD"
                        @update:model-value="store.setPeriode('Custom')"
                      />
                      <div class="f-10 text-grey-8 q-mt-xs">
                        SAMPAI TANGGAL : <b>{{ store.param.to }}</b>
                      </div>
                    </div>
                  </div>
                  <q-separator />
                  <div class="row q-pa-sm justify-end">
                    <q-btn
                      v-close-popup
                      color="primary"
                      label="Terapkan"
                      push
                      size="sm"
                      @click="store.cariRencanaBeli"
                    />
                  </div>
                </div>
              </div>
            </q-menu>
          </q-btn>
        </div>
        <div class="col-auto q-ml-sm">
          <div v-if="store.items.length">
            <download-excel
              class="btn"
              :data="store.items"
              :fields="jsonFields"
              :fetch="fetch"
              :name="'Penerimaan '+ (store?.param?.jenispenerimaan ?? '') + ' '+ store?.param?.from + ' sd ' + store?.param?.to+'.xls'"
            >
              <app-btn
                color="orange"
                label="Download Excel"
                icon="icon-mat-download"
                push
              />
            </download-excel>                
        </div>
        </div>
      </div>
      
    </template>
      <template #col-nopenerimaan>
        <div>Nomor</div>
      </template>
      <template #col-tgl>
        <div>Tanggal</div>
      </template>
      <template #col-penyedia>
        <div>Penyedia</div>
      </template>
      <template #col-surat>
        <div>Surat</div>
      </template>
      <template #col-total>
        <div>Total</div>
      </template>
      <template #cell-nopenerimaan="{ row }">
        <div class="row justify-between" style="min-width: 300px;">
          <div class="col-4">
            Penerimaan
          </div>
          <div class="col-8">
            {{ row.nopenerimaan ?? '-' }}
          </div>
        </div>
        <div class="row justify-between">
          <div class="col-4">
            Pesanan
          </div>
          <div class="col-8">
            {{ row.nopemesanan ? row.nopemesanan : '-' }}
          </div>
        </div>
        <div class="row justify-between">
          <div class="col-auto">
            Jenis Penerimaan
          </div>
          <div class="col-auto text-weight-bold">
            {{ row.jenis_penerimaan ?? '-' }}
          </div>
        </div>
        <div class="row text-italic f-10">
          {{ getGudang(row.gudang) }}
        </div>
      </template>
      <template #cell-penyedia="{ row }">
        <div>{{ row.pihakketiga?.nama ? row.pihakketiga?.nama : '-' }}</div>
      </template>
      <template #cell-total="{ row }">
        <div
          v-if="row?.faktur && row?.jenissurat==='Surat Jalan'"
          class="text-weight-bold"
        >
          {{ formatDouble(parseFloat(row?.faktur?.total_faktur),2) ??'-' }}
        </div>
        <div
          v-else
          class="text-weight-bold"
        >
          {{ row.total_faktur_pbf? formatDouble(parseFloat(row.total_faktur_pbf),2) : (row.total?formatDouble(parseFloat(row.total),2):'-') }}
        </div>
      </template>
      <template #cell-surat="{ row }">
        <div class="row items-center justify-between no-wrap q-mb-xs">
          <div class="q-mr-sm">
            Nomor
          </div>
          <div class="q-mr-xs text-weight-bold">
            {{ row.nomorsurat ?row.nomorsurat : '-' }}
          </div>
        </div>
        <div class="row items-center justify-between no-wrap q-mb-xs">
          <div class="q-mr-sm">
            Jenis
          </div>
          <div class="q-mr-xs text-weight-bold">
            {{ row.jenissurat ?row.jenissurat : '-' }}
          </div>
        </div>
        <div v-if="row?.faktur && row?.jenissurat==='Surat Jalan'">
          <div class="row items-center justify-between no-wrap q-mb-xs">
            <div class="q-mr-sm">
              Nomor Faktur
            </div>
            <div class="q-mr-xs text-weight-bold">
              {{ row?.faktur?.no_faktur??'-' }}
            </div>
          </div>
          <div class="row items-center justify-between no-wrap q-mb-xs">
            <div class="q-mr-sm">
              Tanggal Faktur
            </div>
            <div class="q-mr-xs text-weight-bold">
              {{ dateFullFormat(row?.faktur?.tgl_faktur)??'-' }}
            </div>
          </div>
        </div>
      </template>
      <template #cell-tgl="{ row }">
        <div class="row items-center justify-between no-wrap q-mb-xs">
          <div class="q-mr-sm">
            Penerimaan
          </div>
          <div class="q-mr-xs text-weight-bold">
            {{ row.tglpenerimaan ? dateFullFormat(row.tglpenerimaan) : '-' }}
          </div>
        </div>
        <div class="row items-center justify-between no-wrap q-mb-xs text-primary">
          <div class="q-mr-sm">
            Surat
          </div>
          <div class="q-mr-xs text-weight-bold">
            {{ row.tglsurat ? dateFullFormat(row.tglsurat) : '-' }}
          </div>
        </div>
        <div
          v-if="row.batasbayar"
          class="row items-center justify-between no-wrap q-mb-xs text-deep-orange"
        >
          <div class="q-mr-sm">
            Batas Bayar
          </div>
          <div class="q-mr-xs text-weight-bold">
            {{ row.batasbayar ? dateFullFormat(row.batasbayar) : '-' }}
          </div>
        </div>
      </template>
      <template #expand="{ row }">
        <div v-if="row.penerimaanrinci">
          <div class="row items-center text-weight-bold">
            <div class="col-3">
              Obat
            </div>
            <div class="col-2">
              Jumlah
            </div>
            <div class="col-2">
              Harga
            </div>
            <div class="col-2">
              Satuan
            </div>
            <div class="col-2">
              Info
            </div>
            <div class="col-1 text-right">
              #
            </div>
          </div>
          <div
            v-for="(rin, i) in row.penerimaanrinci"
            :key="i"
          >
            <div class="row items-center q-col-gutter-sm anu">
              <div class="col-3">
                <div class="row justify-between no-wrap">
                  <div class="q-mr-sm">
                    Kode
                  </div>
                  <div class="text-weight-bold text-right">
                    {{ rin.kdobat }}
                  </div>
                </div>
                <div class="row justify-between no-wrap items-center">
                  <div class="q-mr-sm">
                    Nama
                  </div>
                  <div
                    class="text-weight-bold text-right"
                    style="white-space: normal;"
                  >
                    {{ rin.masterobat? rin.masterobat.nama_obat:'-' }}
                  </div>
                </div>
              </div>
              <div class="col-2">
                <div class="row justify-between no-wrap">
                  <div class="q-mr-sm">
                    Pesan
                  </div>
                  <div class="text-weight-bold">
                    {{ rin.jml_pesan }}
                  </div>
                </div>
                <div class="row justify-between no-wrap">
                  <div class="q-mr-sm">
                    Terima
                  </div>
                  <div class="text-weight-bold">
                    {{ rin.jml_terima_k }}
                  </div>
                </div>
                <div class="row justify-between no-wrap">
                  <div class="q-mr-sm">
                    Seluruhnya
                  </div>
                  <div class="text-weight-bold">
                    {{ rin.jml_all_penerimaan }}
                  </div>
                </div>
              </div>
              <div class="col-2">
                <div class="row justify-between no-wrap">
                  <div class="q-mr-sm">
                    Harga
                  </div>
                  <div class="text-weight-bold">
                    {{ formatDouble( rin.harga,2) }}
                  </div>
                </div>
                <div class="row justify-between no-wrap">
                  <div class="q-mr-sm">
                    Diskon
                  </div>
                  <div class="text-weight-bold">
                    {{ rin.diskon }} %
                  </div>
                </div>
                <div class="row justify-between no-wrap">
                  <div class="q-mr-sm">
                    Ppn
                  </div>
                  <div class="text-weight-bold">
                    {{ rin.ppn }} %
                  </div>
                </div>
                <div class="row justify-between no-wrap">
                  <div class="q-mr-sm">
                    Netto
                  </div>
                  <div class="text-weight-bold">
                    {{ formatDouble( rin.harga_netto,2) }}
                  </div>
                </div>
              </div>
              <div class="col-2">
                <div class="row justify-between no-wrap">
                  <div class="q-mr-sm">
                    Besar
                  </div>
                  <div class="text-weight-bold">
                    {{ rin.satuan_bsr?? rin.satuan }}
                  </div>
                </div>
                <div class="row justify-between no-wrap">
                  <div class="q-mr-sm">
                    Isi
                  </div>
                  <div class="text-weight-bold">
                    {{ rin.isi }}
                  </div>
                </div>
                <div class="row justify-between no-wrap">
                  <div class="q-mr-sm">
                    Kecil
                  </div>
                  <div class="text-weight-bold">
                    {{ rin.satuan_kcl }}
                  </div>
                </div>
              </div>
              <div class="col-2">
                <div class="row justify-between no-wrap">
                  <div class="q-mr-sm">
                    Batch
                  </div>
                  <div class="text-weight-bold">
                    {{ rin.no_batch }}
                  </div>
                </div>
                <div class="row justify-between no-wrap">
                  <div class="q-mr-sm">
                    Expired
                  </div>
                  <div class="text-weight-bold">
                    {{ dateFullFormat( rin.tgl_exp) }}
                  </div>
                </div>
              </div>
              <div class="col-1 text-right">
                <q-btn
                  v-if="!row.kunci"
                  flat
                  icon="icon-mat-delete"
                  dense
                  size="sm"
                  color="negative"
                  :loading="penerimaan.loadingDelete && rin.loading"
                  @click="penerimaan.deleteRinci(rin)"
                >
                  <q-tooltip
                    class="primary"
                    :offset="[10, 10]"
                  >
                    Hapus
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          Tidak ada Rincian
        </div>
      </template>
      <template #left-acttion="{ row }">
        <div
          v-if="!row.kunci"
          class="row items-center"
        >
          <q-btn
            class="q-mr-md"
            flat
            icon="icon-mat-add_circle"
            dense
            color="primary"
            :loading=" row.loading || penerimaan.loading"
            @click="tambahPenerimaan(row)"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Tambah Penerimaan
            </q-tooltip>
          </q-btn>
          <q-btn
            flat
            icon="icon-mat-delete"
            dense
            size="sm"
            color="negative"
            :loading="penerimaan.loadingDelete && row.loading"
            @click="penerimaan.deleteHeader(row)"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Hapus
            </q-tooltip>
          </q-btn>
          <q-btn
            flat
            icon="icon-mat-lock_open"
            dense
            color="green"
            :loading="penerimaan.loadingKunci && row.nopenerimaan === toloadBeli"
            @click="kunci(row)"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Rencana Pemesanan sudah selesai dan siap di kunci
            </q-tooltip>
          </q-btn>
        </div>
        <div v-if="row.kunci">
          <q-btn
            flat
            icon="icon-mat-lock"
            dense
            color="negative"
            @click="info(row)"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Cetak Penerimaan
            </q-tooltip>
          </q-btn>
          <q-btn
            round
            icon="icon-mat-print"
            dense
            color="dark"
            size="sm"
            @click="viewcetak(row)"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Cetak Penerimaan
            </q-tooltip>
          </q-btn>
        </div>
      </template>
    </app-table-extend>
  </div>
  <cetak-penerimaan-comp
    ref="refCetakPenerimaan"
    v-model="printCetakPenerimaan"
  />
</template>
<script setup>
import { dateFullFormat, formatDouble,formatDoubleKoma } from 'src/modules/formatter'
import { notifErrVue, notifSuccessVue } from 'src/modules/utils'
import { useListPenerimaanStore } from 'src/stores/simrs/farmasi/penerimaan/listpenerimaan'
import { usePenerimaanFarmasiStore } from 'src/stores/simrs/farmasi/penerimaan/penerimaan'
import CetakPenerimaanComp from './comp/CetakPenerimaanComp.vue'

import { useRouter } from 'vue-router'

import { ref, watch } from 'vue'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { usePenerimaanLangsungFarmasiStore } from 'src/stores/simrs/farmasi/penerimaan/penerimaanlangsung'

const store = useListPenerimaanStore()
const penerimaan = usePenerimaanFarmasiStore()
const penerimaanlangsung = usePenerimaanLangsungFarmasiStore()
const router = useRouter()

const showMenuPeriode = ref(false)
// excel

const jsonFields = {
  'No': 'no',
  'Nomor Penerimaan': 'nopenerimaan',
  'Nomor Pemesanan': 'nopemesanan',
  'Jenis Penerimaan': 'jenis_penerimaan',
  'Gudang': 'gudang',
  'Tanggal Penerimaan': 'tgl_penerimaan',
  'Tanggal Surat': 'tgl_surat',
  'Batas Bayar': 'batas_bayar',
  'Nomor Surat': 'nosurat',
  'Jenis Surat': 'jenis_surat',
  'Nomor Faktur': 'nofaktur',
  'Penyedia': 'penyedia',
  'Total': 'total',
}
function fetch () {
  const data = []
  store.items.forEach((item, i) => {
    const temp = {}
    let total=0
    if(item?.faktur && item?.jenissurat==='Surat Jalan'){
      total=formatDoubleKoma(parseFloat(item?.faktur?.total_faktur),2)
    }else{
      total=formatDoubleKoma(parseFloat(item?.total),2)
    }
    temp.no = i + 1
    temp.nopenerimaan = item.nopenerimaan
    temp.nopemesanan = item.nopemesanan
    temp.jenis_penerimaan = item.jenis_penerimaan
    temp.gudang = getGudang(item.gudang)
    temp.tgl_penerimaan = dateFullFormat(item.tglpenerimaan)
    temp.tgl_surat = dateFullFormat(item.tglsurat)
    temp.batas_bayar = dateFullFormat(item.batasbayar)
    temp.nosurat = item.jenissurat==='Faktur'?'':item?.nomorsurat
    temp.jenis_surat = item.jenissurat    
    temp.nofaktur = item.jenissurat==='Faktur'?item?.nomorsurat:item?.faktur?.no_faktur
    temp.penyedia = item.pihakketiga?.nama
    temp.total = total

    data.push(temp)
  })
  return data
}
function tambahPenerimaan (val) {
  val.expand = !val.expand
  val.highlight = !val.highlight
  console.log('val', val)
  // val.rinci = val?.penerimaanrinci
  if (val.jenis_penerimaan === 'Pesanan') {
    penerimaan.ambilPemesanan().then(resp => {
    // setTimeout(()=>{

      // },200)
      console.log('list resolve', resp)
      console.log('filt pes', penerimaan.filteredPemesanans)
      const gue = penerimaan.filteredPemesanans?.find(fil => fil.nopemesanan === val.nopemesanan)
      if (gue) {
        penerimaan.pemesananSelected(gue)
        penerimaan.setForm('nopenerimaan', val?.nopenerimaan)
        penerimaan.setForm('jenissurat', val?.jenissurat)
        penerimaan.setForm('nomorsurat', val?.nomorsurat)
        penerimaan.setForm('pengirim', val?.pengirim)
        penerimaan.setForm('batasbayar', val?.batasbayar)
        penerimaan.setForm('tglpenerimaan', val?.tglpenerimaan)
        penerimaan.setForm('tglsurat', val?.tglsurat)
        penerimaan.setDisp('batasbayar', val?.batasbayar)
        penerimaan.setDisp('tanggal', val?.tglpenerimaan)
        penerimaan.setDisp('surat', val?.tglsurat)

        console.log('penerimaan', penerimaan.form)
        router.push({ path: '/gudang/farmasi/penerimaan/penerimaan', replace: true })
      }
      else {
        return notifErrVue('Pesanan tidak ditemukan')
      }
    })
  }
  else {
    penerimaanlangsung.setForm('nopenerimaan', val?.nopenerimaan)
    penerimaanlangsung.setForm('jenissurat', val?.jenissurat)
    penerimaanlangsung.setForm('nomorsurat', val?.nomorsurat)
    penerimaanlangsung.setForm('pengirim', val?.pengirim)
    penerimaanlangsung.setForm('batasbayar', val?.batasbayar)
    penerimaanlangsung.setForm('tglpenerimaan', val?.tglpenerimaan)
    penerimaanlangsung.setForm('tglsurat', val?.tglsurat)
    penerimaanlangsung.setForm('kdpbf', val?.kdpbf)
    penerimaanlangsung.setForm('jenispenerimaan', val?.jenis_penerimaan)
    penerimaanlangsung.setDisp('batasbayar', val?.batasbayar)
    penerimaanlangsung.setDisp('tanggal', val?.tglpenerimaan)
    penerimaanlangsung.setDisp('surat', val?.tglsurat)
    penerimaanlangsung.rincis = val?.penerimaanrinci
    router.push({ path: '/gudang/farmasi/penerimaan/penerimaanlangsung', replace: true })
  }
}
// click
function onClick (val) {
  // console.log('click', val)
  val.item.expand = !val.item.expand
  val.item.highlight = !val.item.highlight
}

function info (val) {
  val.expand = !val.expand
  val.highlight = !val.highlight
  notifSuccessVue('Penerimaan nomor ' + val.nopenerimaan + ' Sudah dikunci dan dapat dilakukan Penerimaan')
}

const printCetakPenerimaan = ref(false)
const refCetakPenerimaan = ref(false)

function viewcetak (val) {
  const nomor = val.nopenerimaan
  val.expand = !val.expand
  val.highlight = !val.highlight
  printCetakPenerimaan.value = true
  store.cetaks = []
  store.getPenerimaanBynomor(nomor)
}

const toloadBeli = ref('')
function kunci (val) {
  val.expand = !val.expand
  val.highlight = !val.highlight
  toloadBeli.value = val.nopenerimaan
  penerimaan.kunci(val.nopenerimaan).then(() => {
    toloadBeli.value = ''
    if (!val.flag) val.flag = 1
  })
}
const apps = useAplikasiStore()
function getGudang (val) {
  const gud = store.gudangs?.find(a => a.value === val)
  return gud?.nama ?? '-'
}
store.setParam('gudang', apps?.user?.kdruangansim)
store.getInitialData()
watch(() => apps?.user?.kdruangansim, (kod) => {
  const gud = store.gudangs.find(a => a.value === kod)
  if (gud) {
    store.setParam('gudang', gud?.value)
    store.cariRencanaBeli()
  }
  // console.log('kode', gud)
})
</script>
<style lang="scss" scoped>
.anu {
  margin-top: 2px;
  margin-bottom: 2px;
}

.anu:hover {
  background-color: #87e9df;
}
</style>

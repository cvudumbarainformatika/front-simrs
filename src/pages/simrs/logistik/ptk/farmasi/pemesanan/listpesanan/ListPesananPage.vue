<template>
  <!-- <div
    class="fixed-top row items-center justify-end q-mr-sm"
    style="z-index: 10;"
  >
    <div>
      <q-btn
        flat
        :icon="!style.componentfull?'icon-mat-open_in_full':'icon-mat-close_fullscreen'"
        round
        :color="style.componentfull?'green':'primary'"
        size="12px"
        class="q-ml-md"
        @click="style.setComponentFull"
      />
    </div>
  </div> -->
  <div class="q-mx-sm">
    <app-table-extend
      :columns="store.columns"
      :column-hide="store.columnHide"
      :items="store.items"
      :meta="store.meta"
      :per-page="store.param.per_page"
      :loading="store.loading"
      :to-search="store.param.nopemesanan"
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
        <div class="q-ml-xs text-white">
          <q-option-group
            v-model="store.param.gudang"
            :options="store.gudangs"
            color="primary"
            class="q-ml-sm"
            dense
            type="checkbox"
            inline
            @update:model-value="store.setGudang"
          />
        </div>
      </template>
      <template #col-nopemesanan>
        <div>Nomor Pemesanan</div>
      </template>
      <template #col-tgl>
        <div>Tanggal</div>
      </template>
      <template #col-penyedia>
        <div>Penyedia</div>
      </template>
      <template #col-gudang>
        <div>Gudang</div>
      </template>
      <template #cell-penyedia="{row}">
        <div>{{ row.pihakketiga? row.pihakketiga.nama:'-' }}</div>
      </template>
      <template #cell-gudang="{row}">
        <div>{{ row.gudang? row.gudang.nama:'-' }}</div>
      </template>
      <template #cell-tgl="{row}">
        <div>{{ row.tgl_pemesanan? dateFullFormat( row.tgl_pemesanan) : '-' }}</div>
      </template>
      <template #expand="{row}">
        <div v-if="row.rinci.length">
          <div class="row items-center text-weight-bold">
            <div class="col-4">
              Obat
            </div>
            <div class="col-2 text-right">
              Jumlah Bisa di beli
            </div>
            <div class="col-2 text-right">
              Jumlah Diverif
            </div>
            <div class="col-2 text-right">
              Jumlah Dipesan
            </div>
            <div class="col-1 text-right">
              Harga
            </div>
            <div class="col-1 text-right">
              <div class="q-mr-md">
                #
              </div>
            </div>
          </div>
          <div
            v-for="(rin, i) in row.rinci"
            :key="i"
          >
            <div class="row items-center anu">
              <div class="col-4">
                <div
                  class="row"
                  style="white-space: normal;"
                >
                  {{ rin?.masterobat?.nama_obat }}
                </div>
                <div class="row text-italic f-8">
                  {{ rin.kdobat }}
                </div>
              </div>
              <div class="col-2 text-right">
                {{ rin.jumlah_bisa_dibeli }}
              </div>
              <div class="col-2 text-right">
                {{ rin?.jumlah_diverif??'0' }}
              </div>
              <div class="col-2 text-right">
                {{ rin.jumlahdpesan }}
              </div>
              <div class="col-1 text-right">
                {{ formatRp( rin.harga) }}
              </div>
              <div class="col-1 text-right">
                <q-btn
                  v-if="!row.flag"
                  class="q-mr-md"
                  flat
                  icon="icon-mat-delete"
                  size="sm"
                  no-caps
                  color="negative"
                  :loading="pemesanan.loading && rin.loading "
                  @click="batalRinci(rin)"
                >
                  <q-tooltip
                    class="primary"
                    :offset="[10, 10]"
                  >
                    Batalkan Rincian Pesanan
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
      <template #left-acttion="{row}">
        <div v-if="!row.flag">
          <q-btn
            class="q-mr-md"
            flat
            icon="icon-mat-add_circle"
            dense
            no-caps
            color="primary"
            @click="tambah(row)"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Tambah Pesanan
            </q-tooltip>
          </q-btn>
          <q-btn
            class="q-mr-md"
            flat
            icon="icon-mat-delete"
            dense
            no-caps
            color="negative"
            :loading="pemesanan.loading && row.loading"
            @click="batal(row)"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Batalkan Pesanan
            </q-tooltip>
          </q-btn>
          <q-btn
            flat
            icon="icon-mat-lock_open"
            dense
            color="green"
            :loading="pemesanan.loading && row.nopemesanan === toloadBeli"
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
        <div v-if="row.flag">
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
              Rencana Pemesanan sudah di kunci
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
              Cetak Pemesanan
            </q-tooltip>
          </q-btn>
        </div>
      </template>
    </app-table-extend>
    <app-fullscreen-blue
      v-model="pemesanan.isOpen"
      @close="pemesanan.setClose"
    >
      <template #default>
        <CompDialog />
      </template>
    </app-fullscreen-blue>
    <CetakPemesananPage
      ref="refCetakPemesanan"
      v-model="printCetakPemesanan"
    />
  </div>
</template>
<script setup>
import { dateFullFormat, formatRp } from 'src/modules/formatter'
import { notifSuccessVue } from 'src/modules/utils'
// import { useStyledStore } from 'src/stores/app/styled'
import { useListPemesananStore } from 'src/stores/simrs/farmasi/pemesanan/listpesanan'
import { usePemesananObatStore } from 'src/stores/simrs/farmasi/pemesanan/pesanan'
import { useTabelPemesananObatStore } from 'src/stores/simrs/farmasi/pemesanan/tabelObat'
import { ref, defineAsyncComponent } from 'vue'
import CetakPemesananPage from './CetakPemesananPage.vue'

// const style = useStyledStore()
const store = useListPemesananStore()
const pemesanan = usePemesananObatStore()
const table = useTabelPemesananObatStore()

const CompDialog = defineAsyncComponent(() => import('../pemesanan/comp/CompDialog.vue'))
// click
function onClick (val) {
  console.log('click', val)
  val.item.expand = !val.item.expand
  val.item.highlight = !val.item.highlight
}

function info (val) {
  val.expand = !val.expand
  val.highlight = !val.highlight
  notifSuccessVue('Pembelian nomor ' + val.nopemesanan + ' Sudah dikunci dan dapat dilakukan Penerimaan')
}
const toloadBeli = ref('')
function tambah(val) {
  val.expand = !val.expand
  val.highlight = !val.highlight
  pemesanan.setForm('nopemesanan', val.nopemesanan)
  pemesanan.setForm('kdpbf', val.kdpbf)
  table.rencanaSelected(val?.rinci[0]?.noperencanaan, 'list')
  console.log(val)
}
function kunci (val) {
  val.expand = !val.expand
  val.highlight = !val.highlight
  toloadBeli.value = val.nopemesanan
  pemesanan.kunci(val.nopemesanan).then(() => {
    toloadBeli.value = ''
    if (!val.flag) val.flag = 1
  })
}
function batal (val) {
  val.expand = !val.expand
  val.highlight = !val.highlight
  console.log('batal', val)
  pemesanan.batal(val).then(() => {
    toloadBeli.value = ''
    // if (!val.flag) val.flag = 1
  })
}
function batalRinci (val) {
  val.expand = !val.expand
  val.highlight = !val.highlight
  console.log('batal rinci', val)
  pemesanan.batalRinci(val).then(() => {
    toloadBeli.value = ''
    // if (!val.flag) val.flag = 1
  })
}

const printCetakPemesanan = ref(false)
const refCetakPemesanan = ref(false)

function viewcetak(val) {
  const nomor = val.nopemesanan
  val.expand = !val.expand
  val.highlight = !val.highlight
  printCetakPemesanan.value = true
  store.cetaks = []
  store.getPemesananBynomor(nomor)
}

store.getInitialData()
</script>
<style lang="scss" scoped>
.anu{
  padding-top:2px;
  padding-bottom:2px;
}
.anu:hover{
  background-color: #87e9df;
}
</style>

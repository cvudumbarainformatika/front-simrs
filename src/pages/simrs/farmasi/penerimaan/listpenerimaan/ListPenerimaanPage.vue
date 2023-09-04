<template>
  <div
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
  </div>
  <div class="q-mt-xl q-mx-sm">
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
      @find="store.setSearch"
      @goto="store.setPage"
      @set-row="store.setPerPage"
      @refresh="store.refreshTable"
      @on-click="onClick"
    >
      <template #col-nopenerimaan>
        <div>Nomor Penerimaan</div>
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
      <template #cell-penyedia="{ row }">
        <div>{{ row.pbf ? row.pbf : '-' }}</div>
      </template>
      <template #cell-total="{ row }">
        <div class="text-weight-bold">
          {{ formatRp( row.total) }}
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
        <div class="row items-center justify-between no-wrap q-mb-xs text-deep-orange">
          <div class="q-mr-sm">
            Batas Bayar
          </div>
          <div class="q-mr-xs text-weight-bold">
            {{ row.batasbayar ? dateFullFormat(row.batasbayar) : '-' }}
          </div>
        </div>
      </template>
      <template #expand="{ row }">
        <div v-if="row.rinci">
          <div class="row items-center text-weight-bold">
            <div class="col-2">
              Kode Obat
            </div>
            <div class="col-2">
              Stok Gudang
            </div>
            <div class="col-2">
              Stok RS
            </div>
            <div class="col-2">
              Stok Max
            </div>
            <div class="col-2">
              Jumlah Bisa di beli
            </div>
            <div class="col-2">
              Jumlah Dipesan
            </div>
          </div>
          <div
            v-for="(rin, i) in row.rinci"
            :key="i"
          >
            <div class="row items-center anu">
              <div class="col-2">
                {{ rin.kdobat }}
              </div>
              <div class="col-2">
                {{ rin.stok_real_gudang }}
              </div>
              <div class="col-2">
                {{ rin.stok_real_rs }}
              </div>
              <div class="col-2">
                {{ rin.stok_max_rs }}
              </div>
              <div class="col-2">
                {{ rin.jumlah_bisa_dibeli }}
              </div>
              <div class="col-2">
                {{ rin.jumlahdpesan }}
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          Tidak ada Rincian
        </div>
      </template>
      <template #left-acttion="{ row }">
        <div v-if="!row.flag">
          <q-btn
            flat
            icon="icon-mat-lock_open"
            dense
            color="negative"
            :loading="penerimaan.loading && row.nopemesanan === toloadBeli"
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
            color="green"
            @click="info(row)"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Rencana Pemesanan sudah di kunci
            </q-tooltip>
          </q-btn>
        </div>
      </template>
    </app-table-extend>
  </div>
</template>
<script setup>
import { dateFullFormat, formatRp } from 'src/modules/formatter'
import { notifSuccessVue } from 'src/modules/utils'
import { useStyledStore } from 'src/stores/app/styled'
import { useListPenerimaanStore } from 'src/stores/simrs/farmasi/penerimaan/listpenerimaan'
import { usePenerimaanFarmasiStore } from 'src/stores/simrs/farmasi/penerimaan/penerimaan'
import { ref } from 'vue'

const style = useStyledStore()
const store = useListPenerimaanStore()
const penerimaan = usePenerimaanFarmasiStore()
// click
function onClick (val) {
  console.log('click', val)
  val.item.expand = !val.item.expand
  val.item.highlight = !val.item.highlight
}

function info (val) {
  val.expand = !val.expand
  val.highlight = !val.highlight
  notifSuccessVue('Penerimaan nomor ' + val.nopenerimaan + ' Sudah dikunci dan dapat dilakukan Penerimaan')
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
store.getInitialData()
</script>
<style lang="scss" scoped>
.anu {
  padding-top: 2px;
  padding-bottom: 2px;
}

.anu:hover {
  background-color: #87e9df;
}
</style>

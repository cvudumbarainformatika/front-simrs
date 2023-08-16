<template>
  <div
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
  </div>
  <div class="q-mt-xl q-mx-sm">
    <app-table-extend
      :columns="store.columns"
      :column-hide="store.columnHide"
      :items="store.items"
      :meta="store.meta"
      :per-page="store.param.per_page"
      :loading="store.loading"
      :to-search="store.param.no_rencbeliobat"
      :click-able="true"
      :default-btn="false"
      @find="store.setSearch"
      @goto="store.setPage"
      @set-row="store.setPerPage"
      @refresh="store.refreshTable"
      @on-click="onClick"
    >
      <template #col-no_rencbeliobat>
        <div>Nomor Rencana Beli</div>
      </template>
      <template #col-tgl>
        <div>Tanggal</div>
      </template>
      <template #cell-tgl="{row}">
        <div>{{ row.tgl? dateFullFormat( row.tgl) : '-' }}</div>
      </template>
      <template #expand="{row}">
        <div v-if="row.rincian.length">
          <div class="row items-center text-weight-bold">
            <div class="col-3">
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
          </div>
          <div
            v-for="(rin, i) in row.rincian"
            :key="i"
          >
            <div class="row items-center">
              <div class="col-3">
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
            </div>
          </div>
        </div>
        <div v-else>
          Tidak ada Rincian
        </div>
      </template>
      <!-- <template #left-acttion="{row,col}">
        <div>
          row : {{ row.id }}
        </div>
        <div>
          col : {{ col }}
        </div>
      </template> -->
    </app-table-extend>
  </div>
</template>
<script setup>
import { dateFullFormat } from 'src/modules/formatter'
import { useStyledStore } from 'src/stores/app/styled'
import { useListRencanaPemesananStore } from 'src/stores/simrs/farmasi/pemesanan/listrencana'

const style = useStyledStore()
const store = useListRencanaPemesananStore()
// click
function onClick (val) {
  console.log('click', val)
  val.item.expand = !val.item.expand
  val.item.highlight = !val.item.highlight
}
store.getInitialData()
</script>

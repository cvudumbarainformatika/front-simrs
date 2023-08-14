<template>
  <div
    class="fixed-top row no-wrap items-center justify-between q-mr-sm"
    style="z-index: 10;"
  >
    <div>
      <div class="row items-center">
        <div class="q-mr-md">
          No Perencanaan:
        </div>
        <app-input
          v-model="store.form.no_rencbeliobat"
          label="Nomor rencana beli obat"
          :filled="false"
          valid
        />
      </div>
    </div>
    <div>
      <div class="row items-center no-wrap">
        <div class="q-mr-md">
          Tanggal Perencanaan:
        </div>
        <app-input-date-human
          :model="store.disp.tanggal"
          label="Tanggal"
          :filled="false"
          @set-display="setDispTanggal"
          @db-model="setTanggal"
        />
      </div>
    </div>
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
  <!-- perencanaan -->
  <div class="q-mt-lg q-pt-lg">
    <app-table
      title="obat"
      :columns="table.columns"
      :column-hide="table.columnHide"
      :items="table.items"
      :meta="table.meta"
      :per-page="table.params.per_page"
      :order-by="table.params.order_by"
      :sort="table.params.sort"
      :loading="table.loading"
      :to-search="table.params.q"
      :ada-edit="false"
      :ada-paginasi="false"
      @goto="table.setPage"
      @set-row="table.setPerPage"
      @refresh="table.refreshTable"
      @find="table.setSearch"
      @set-order="table.setOder"
      @new-data="store.newData"
      @delete="table.deletesData"
    >
      <!-- @edit-data="store.editData" -->
      <!--
            row-image="image"
            @delete-ids="table.deletesData"
            -->
      <template #col-bentuksediaan>
        <div>Bentuk Sediaan</div>
      </template>
      <template #cell-stok_gudang="{row}">
        <div v-if="row.stokrealgudang.length">
          {{ row.stokrealgudang[0].jumlah }}
        </div>
        <div v-else>
          -
        </div>
      </template>
      <template #cell-stok_rs="{row}">
        <div v-if="row.stokrealallrs.length">
          {{ row.stokrealallrs[0].jumlah }}
        </div>
        <div v-else>
          -
        </div>
      </template>
      <template #cell-stok_max_rs="{row}">
        <div v-if="row.stokmaxrs.length">
          {{ row.stokmaxrs[0].jumlah }}
        </div>
        <div v-else>
          -
        </div>
      </template>
    </app-table>
  </div>
</template>
<script setup>
import { useStyledStore } from 'src/stores/app/styled'
import { useRencanaPemesananObatStore } from 'src/stores/simrs/farmasi/pemesanan/rencana'
import { useTabelObatMauDibeliStore } from 'src/stores/simrs/farmasi/pemesanan/tabelObat'

const style = useStyledStore()
const store = useRencanaPemesananObatStore()
const table = useTabelObatMauDibeliStore()

function setDispTanggal(val) {
  store.disp.tanggal = val
}
function setTanggal(val) {
  store.setParam('tanggal', val)
  console.log('param ', store.param)
}
table.getInitialData()
</script>

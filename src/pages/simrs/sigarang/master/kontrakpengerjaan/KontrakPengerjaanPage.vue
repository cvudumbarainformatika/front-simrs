<template>
  <q-page class="q-pa-sm">
    <div>
      <app-card :is-header="false">
        <template #content>
          <app-table-view
            title="Data Kontrak Pengerjaan"
            :columns="table.columns"
            :column-hide="table.columnHide"
            :items="table.items"
            :meta="table.meta"
            :per-page="table.params.per_page"
            :order-by="table.params.order_by"
            :sort="table.params.sort"
            :loading="table.loading"
            :to-search="table.params.q"
            @goto="table.setPage"
            @set-row="table.setPerPage"
            @refresh="table.refreshTable"
            @find="table.setSearch"
            @set-order="table.setOder"
            @delete="table.deletesData"
          >
            <template #col-nokontrak>
              <div>No Transaksi</div>
            </template>
            <template #col-namaperusahaan>
              <div>Nama Perusahaan</div>
            </template>
            <template #col-tglmulaikontrak>
              <div>Tgl Mulai Kontrak</div>
            </template>
            <template #col-tglakhirkontrak>
              <div>Tgl Berakhir Kontrak</div>
            </template>
            <template #col-namapptk>
              <div>PPTK</div>
            </template>
            <template #col-program>
              <div>Program</div>
            </template>
            <template #col-kegiatan>
              <div>Kegiatan</div>
            </template>
            <template #col-nilaikontrak>
              <div>Nilai Kontrak</div>
            </template>
            <template #cell-nilaikontrak="{row}">
              <div class="text-right">
                {{ formatRp(row.nilaikontrak) }}
              </div>
            </template>
          </app-table-view>
          <!--
            row-image="image"
            @delete-ids="table.deletesData"
            -->
        </template>
      </app-card>
    </div>
  </q-page>
</template>
<script setup>
import { formatRp } from 'src/modules/formatter'
import { useMasterKontrakPengerjaanTable } from 'src/stores/simrs/logistik/sigarang/master/kontrakpengerjaan/table'
const table = useMasterKontrakPengerjaanTable()
table.getDataTable()
</script>

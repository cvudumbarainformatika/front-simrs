<template>
  <!-- persistent -->
  <q-dialog
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card
      style="width:80vw; max-width:90vw;"
      class="emak"
    >
      <q-bar class="anak">
        <q-space />
        <q-btn
          v-close-popup
          dense
          flat
          icon="icon-mat-close"
        >
          <q-tooltip class="bg-white text-primary">
            Close
          </q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <HeaderDetails

          :header="table.header"
        />
      </q-card-section>
      <q-card-section>
        <app-card :is-header="false">
          <template #content>
            <app-table-view
              :title="`Detail Data ${titleCase(table.header.nama)}`"
              :columns="table.columns"
              :column-hide="table.columnHide"
              :items="table.items"
              :loading="table.loading"
              :to-search="table.params.q"
              :paginasi="false"
              :ada-cari="false"
              :ada-refresh="false"
              :ada-filter="false"
              @goto="table.setPage"
              @set-row="table.setPerPage"
              @refresh="table.refreshTable"
              @find="table.setSearch"
              @set-order="table.setOder"
              @delete="table.deletesData"
              @detail="table.setDetails"
            >
              <template #col-sub_total>
                Sub Total
              </template>
              <template #col-merk>
                Keterangan
              </template>
              <template #col-kode_108>
                Kode 108
              </template>
              <template #col-kode_rs>
                Kode Rs
              </template>
              <template #col-barangrs>
                Nama Barang
              </template>
              <template #col-uraian_108>
                Uraian 108
              </template>
              <template #col-uraian_50>
                Uraian 50
              </template>
              <template #col-qty>
                Jumlah
              </template>
              <template #col-satuan>
                Satuan
              </template>
              <template #col-harga>
                Harga
              </template>
              <template #col-no_penerimaan>
                Nomor Penerimaan
              </template>
              <template #col-satuan_kecil>
                Satuan Kecil
              </template>
              <template #col-jumlah>
                Jumlah
              </template>
              <template #col-tujuan>
                Tujuan
              </template>
              <template #col-dari>
                Dari
              </template>
              <template #col-alasan>
                Alasan
              </template>
              <template #col-gudang>
                Depo
              </template>
              <template #col-ruang>
                Ruang
              </template>
              <template #col-jumlah_disetujui>
                Jumlah Disetujui
              </template>
              <template #col-jumlah_distribusi>
                Jumlah Distribusi
              </template>
              <template #cell-harga="{row}">
                {{ formatRp(row.harga) }}
              </template>
              <template #cell-sub_total="{row}">
                {{ formatRp(row.sub_total) }}
              </template>
              <template #cell-barang108="{row}">
                {{ row.barangrs.barang108.uraian }}
              </template>
              <template #cell-kode_108="{row}">
                {{ row.barangrs.kode_108 }}
              </template>
              <template #cell-satuan="{row}">
                {{ row.satuan?row.satuan.nama:'-' }}
              </template>
              <template #cell-barangrs="{row}">
                {{ row.barangrs.nama }}
              </template>
              <template #cell-gudang="{row}">
                {{ row.gudang.nama }}
              </template>
              <template #cell-ruang="{row}">
                {{ row.ruang.uraian }}
              </template>
              <template #cell-uraian_50="{row}">
                <div style="width:7vw;">
                  <div class="ellipsis">
                    {{ row.uraian_50 }}
                  </div>
                  <q-tooltip
                    anchor="top middle"
                    self="center middle"
                  >
                    {{ row.uraian_50 }}
                  </q-tooltip>
                </div>
              </template>
            </app-table-view>
            <!--
                    row-image="image"
                    @delete-ids="table.deletesData"
                    -->
          </template>
        </app-card>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { formatRp, titleCase } from 'src/modules/formatter'
import { useDetailHistoryTable } from 'src/stores/simrs/logistik/sigarang/history/details'
import HeaderDetails from './header/HeaderDetails.vue'

const table = useDetailHistoryTable()
</script>
<style scoped>
.emak{
  position: absolute;
}
</style>

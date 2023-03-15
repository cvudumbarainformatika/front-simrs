<template>
  <q-page class="q-pa-sm">
    <div>
      <app-card :is-header="false">
        <template #content>
          <app-table
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
            :ada-tambah="false"
            :default-btn="false"
            @goto="table.setPage"
            @set-row="table.setPerPage"
            @refresh="table.refreshTable"
            @find="table.setSearch"
          >
            <!-- @set-order="table.setOder" -->
            <template #col-nokontrakx>
              <div>No Kontrak</div>
            </template>
            <template #cell-nokontrakx="{row}">
              <div style="width:10vw;">
                <div class="ellipsis">
                  {{ row.nokontrakx }}
                </div>
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  {{ row.nokontrakx }}
                </q-tooltip>
              </div>
            </template>
            <template #col-namaperusahaan>
              <div>Nama Perusahaan</div>
            </template>
            <template #col-tglmulaikontrak>
              <div>Tgl Mulai Kontrak</div>
            </template>
            <template #col-tglakhirkontrak>
              <div>Tgl Akhir Kontrak</div>
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
            <template #col-kunci>
              <div>Kunci Siasik</div>
            </template>
            <template #cell-tglmulaikontrak="{row}">
              <div>{{ dateFullFormat(row.tglmulaikontrak) }}</div>
            </template>
            <template #cell-tglakhirkontrak="{row}">
              <div>{{ dateFullFormat(row.tglakhirkontrak) }}</div>
            </template>
            <template #cell-nilaikontrak="{row}">
              <div class="text-right">
                {{ formatRp(row.nilaikontrak) }}
              </div>
            </template>
            <template #cell-kunci="{row}">
              <div
                v-if="row.kunci==='1' "
                class="text-center"
              >
                <q-icon
                  name="icon-mat-lock"
                  color="primary"
                  size="25px"
                />
              </div>
              <div
                v-else
              >
                <q-icon
                  name="icon-mat-lock_open"
                  color="negative"
                  size="25px"
                />
              </div>
            </template>
            <template #left-acttion="{row}">
              <q-btn
                icon="icon-mat-edit_document"
                color="primary"
                flat
                @click="store.kontrakSelected(row)"
              >
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  Pakai Kontrak ini
                </q-tooltip>
              </q-btn>
            </template>
          </app-table>
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
import { formatRp, dateFullFormat } from 'src/modules/formatter'
import { useTransaksiPemensananForm } from 'src/stores/simrs/logistik/sigarang/transaksi/pemesanan/form'
import { useKontrakPemensananStore } from 'src/stores/simrs/logistik/sigarang/transaksi/pemesanan/kontrak'
const table = useKontrakPemensananStore()
const store = useTransaksiPemensananForm()
table.getDataTable()
</script>

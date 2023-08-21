<template>
  <div
    class="fixed-top row no-wrap items-center justify-between q-mx-sm bg-white"
    style="z-index: 10;"
  >
    <div>
      <div class="row items-center">
        <div class="q-mr-md">
          No Pemesanan:
        </div>
        <app-input
          v-model="store.form.nopemesanan"
          label="Nomor Pemesanan obat"
          :filled="false"
          readonly
          valid
          :loading="store.loading"
        />
        <div class="q-ml-md">
          <q-btn
            v-if="store.form.nopemesanan"
            flat
            icon="icon-mat-done"
            dense
            color="primary"
            @click="store.refreshForm()"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Refresh Form
            </q-tooltip>
          </q-btn>
        </div>
      </div>
    </div>
    <div>
      <div class="row items-center no-wrap">
        <div class="q-mr-md">
          Tanggal Pemesanan:
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
      <div class="row items-center no-wrap">
        <div class="q-mr-md">
          Penyedia:
        </div>
        <div>Auto complete nama penyedia</div>
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
    <q-card>
      <q-card-section>
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
          :default-btn="false"
          :ada-cari="false"
          :ada-refresh="false"
          :ada-filter="false"
          :ada-tambah="false"
          @find="table.setSearch"
          @set-row="table.setPerPage"
          @goto="table.setPage"
        >
          <!-- @edit-data="store.editData" -->
          <!--
            row-image="image"
            @delete-ids="table.deletesData"
            -->
          <template #col-rencana>
            <div>Perencanaan</div>
          </template>
          <template #col-obat>
            <div>Obat</div>
          </template>
          <template #col-stok>
            <div>Stok</div>
          </template>
          <template #col-jumlah>
            <div>Jumlah</div>
          </template>
          <template #col-centang>
            <div>Beli</div>
          </template>
          <template #cell-rencana="{row}">
            <div class="row justify-between no-wrap">
              <div class="q-mr-xs">
                Nomor
              </div>
              <div>
                {{ row.noperencanaan }}
              </div>
            </div>
            <div class="row justify-between no-wrap">
              <div class="q-mr-xs">
                tanggal
              </div>
              <div>
                {{ row.tglperencanaan ? dateFullFormat( row.tglperencanaan):'-' }}
              </div>
            </div>
          </template>
          <template #cell-obat="{row}">
            <div class="row justify-between no-wrap">
              <div class="q-mr-xs">
                Kode
              </div>
              <div>
                {{ row.kdobat }}
              </div>
            </div>
            <div class="row justify-between no-wrap">
              <div class="q-mr-xs">
                Nama
              </div>
              <div>
                {{ row.namaobat }}
              </div>
            </div>
          </template>
          <template #cell-stok="{row}">
            <div class="row justify-between no-wrap">
              <div class="q-mr-xs">
                Gudang
              </div>
              <div>
                {{ row.stokgudang }}
              </div>
            </div>
            <div class="row justify-between no-wrap">
              <div class="q-mr-xs">
                Seluruh Rumah Sakit
              </div>
              <div>
                {{ row.stokrs }}
              </div>
            </div>
            <div class="row justify-between no-wrap">
              <div class="q-mr-xs">
                Maksimal Rumah Sakit
              </div>
              <div>
                {{ row.stomaxkrs }}
              </div>
            </div>
          </template>
          <template #cell-jumlah="{row}">
            <div class="row justify-between no-wrap">
              <div class="q-mr-xs">
                di rencakan
              </div>
              <div>
                {{ row.jumlahdirencanakan }}
              </div>
            </div>
            <div class="row justify-between no-wrap">
              <app-input
                v-model="row.jumlahdipesan"
                label="Jumlah Dipesan"
                :filled="false"
                :disable="row.jumlahdirencanakan<=0"
                :rules="[
                  val=> (val <= row.jumlahdirencanakan) || 'Tidak Boleh Lebih dari Jumlah maksimal dibeli'
                ]"
              />
            </div>
          </template>
          <template #cell-centang="{row}">
            <div v-if="row.jumlahdirencanakan >0">
              <q-btn
                flat
                no-caps
                icon-right="icon-mat-send"
                label="kirim"
                color="primary"
                :loading="store.loading && (store.form.kdobat === row.kdobat) && (store.form.noperencanaan === row.noperencanaan)"
                @click="store.kirimRencana(row)"
              />
            </div>
            <div v-else>
              Tidak bisa melakukan pemesanan
            </div>
          </template>
        </app-table>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { dateFullFormat } from 'src/modules/formatter'
import { useStyledStore } from 'src/stores/app/styled'
import { usePemesananObatStore } from 'src/stores/simrs/farmasi/pemesanan/pesanan'
import { useTabelPemesananObatStore } from 'src/stores/simrs/farmasi/pemesanan/tabelObat'

const style = useStyledStore()
const store = usePemesananObatStore()
const table = useTabelPemesananObatStore()

function setDispTanggal(val) {
  store.disp.tanggal = val
}
function setTanggal(val) {
  store.setParam('tanggal', val)
  console.log('param ', store.param)
}
table.getInitialData()
store.getInitialData()
</script>

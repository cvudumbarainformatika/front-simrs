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
          readonly
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
          <template #col-kd_obat>
            <div>Kode Obat</div>
          </template>
          <template #col-nama_obat>
            <div>Nama Obat</div>
          </template>
          <template #col-stok>
            <div>Stok</div>
          </template>
          <template #col-pabrikan>
            <div>Penyedia</div>
          </template>
          <template #col-jumlah>
            <div>Jumlah</div>
          </template>
          <template #col-centang>
            <div>Beli</div>
          </template>
          <template #cell-stok="{row}">
            <div class="row justify-between no-wrap">
              <div class="q-mr-xs">
                Gudang
              </div>
              <div>
                {{ row.stokGudang }}
              </div>
            </div>
            <div class="row justify-between no-wrap">
              <div class="q-mr-xs">
                Seluruh Rumah Sakit
              </div>
              <div>
                {{ row.stokRS }}
              </div>
            </div>
            <div class="row justify-between no-wrap">
              <div class="q-mr-xs">
                Maksimal Rumah Sakit
              </div>
              <div>
                {{ row.stokMaxRS }}
              </div>
            </div>
          </template>
          <template #cell-pabrikan="{row}">
            nanti isinya pabrikan
            <div v-if="row.stokrealgudang.length">
              {{ row.stokrealgudang[0].jumlah }}
            </div>
            <div v-else>
              -
            </div>
          </template>
          <template #cell-jumlah="{row}">
            <div class="row justify-between no-wrap">
              <div class="q-mr-xs">
                Maksimal dibeli
              </div>
              <div>
                {{ row.bisaBeli }}
              </div>
            </div>
            <div class="row justify-between no-wrap">
              <app-input
                v-model="row.jumlahBeli"
                label="Jumlah Dipesan"
                :filled="false"
                :rules="[
                  val=> (val <= row.bisaBeli) || 'Tidak Boleh Lebih dari Jumlah maksimal dibeli'
                ]"
              />
            </div>
          </template>
          <template #cell-centang="{row}">
            <div v-if="row.bisaBeli>0">
              <q-checkbox
                v-model="row.checked"
                dense
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
store.getInitialData()
</script>

<template>
  <q-card-section>
    <TablePagex
      id="printMe"
      :columns="store.columns"
      :meta="store.meta"
      :column-hide="store.columnHide"
      :items="store.items"
      :per-page="store.params.per_page"
      :loading="store.loading"
      :to-search="store.params.q"
      click-able
      row-no
      @goto="store.setPage"
      @set-row="store.setPerPage"
      @refresh="store.refreshTable"
      @find="store.setSearch"
      @on-click="click"
    >
      <template #header-left-after-search>
        <q-form
          ref="formRef"
          class="row q-pa-md q-col-gutter-xs"
          @submit="store.getDataTable"
        >
          <div class="row q-col-gutter-sm">
            <div>
              <app-input-date-human
                :model="store.tanggal.from"
                label="dari tanggal"
                outlined
                @db-model="setFrom"
                @set-display="setToFromDisp"
              />
            </div>
            <div>
              <app-input-date-human
                :model="store.tanggal.to"
                label="sampai tanggal"
                outlined
                @db-model="setTo"
                @set-display="setToDisp"
              />
            </div>

            <div>
              <q-btn
                label="Cari"
                type="submit"
                color="primary"
                :loading="store.loading"
                :disable="store.loading"
              />
            </div>
          </div>
        </q-form>
      </template>

      <template #cell-NoBASTKonsinyasi="{row}">
        <div class="row justify-center">
          {{ row?.NoBASTKonsinyasi }}
        </div>
      </template>
      <template #cell-TanggalBAST="{row}">
        <div class="row justify-center">
          {{ row?.TanggalBAST }}
        </div>
      </template>
      <template #cell-Suplier="{row}">
        <div class="row justify-center">
          {{ row?.Suplier }}
        </div>
      </template>
      <template #cell-FlagTerbayar="{row}">
        <div class="text-right">
          {{ row?.FlagTerbayar === '1' ? 'Lunas': '' }}
        </div>
      </template>
      <template #cell-TotalBast="{row}">
        <div class="text-right">
          {{ formatDouble(row?.TotalBast) }}
        </div>
      </template>
      <!-- eslint-disable-next-line vue/no-unused-vars -->
      <template #expand="{row}">
        <div v-if="row?.rinci?.length">
          <div class="row f-14 text-weight-bold q-my-sm">
            Detail List Konsinyasi
          </div>
          <q-markup-table :separator="cell" flat bordered>
            <thead>
              <tr class="bg-dark text-white items-center">
                <th>No</th>
                <th>No. Transaksi</th>
                <th>Obat</th>
                <th>Jumlah</th>
                <th>Harga</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(rincix,i) in row.rinci" :key="rincix">
                <td>{{ i+1 }}</td>
                <td>{{ rincix?.nopenerimaan }}</td>
                <td> {{ rincix?.obat?.nama_obat }}</td>
                <td class="text-right">
                  {{ rincix?.jumlah }}
                </td>
                <td class="text-right">
                  {{ formatDouble(rincix?.harga_net) }}
                </td>
                <td class="text-right">
                  {{ formatDouble(rincix?.subtotal) }}
                </td>
              </tr>
            </tbody>
          </q-markup-table>
          <!-- <div class="row text-weight-bold bg-dark text-white items-center q-py-xs" style="border-bottom: 1px solid black;">
            <div class="col-1">
              No.
            </div>
            <div class="col-2">
              No. Transaksi
            </div>
            <div class="col-3">
              Obat
            </div>
            <div class="col-1 text-right ">
              Jumlah
            </div>
            <div class="col-2 text-right">
              Harga
            </div>
            <div class="col-2 text-right ">
              Subtotal
            </div>
          </div>
          <div v-for="(det,i) in row.rinci" :key="det">
            <div class="row no-wrap " style="border-bottom: 1px solid black;">
              <div class="col-1">
                {{ i+1 }}.
              </div>
              <div class="col-2 bg-grey-2" style="white-space: normal; overflow-wrap: normal;">
                {{ det?.notranskonsi }}
              </div>
              <div class="col-3 text-right" style="white-space: normal; overflow-wrap: normal;">
                <div class="q-mr-xs">
                  {{ det?.obat?.nama_obat }}
                </div>
              </div>
              <div class="col-1 bg-grey-2" style="white-space: normal; overflow-wrap: normal;">
                {{ det?.jumlah }}
              </div>
              <div class="col-2 text-right bg-grey-2" style="white-space: normal; overflow-wrap: normal;">
                {{ formatDouble(det?.harga_net,2) }}
              </div>
              <div class="col-2 text-right " style="white-space: normal; overflow-wrap: normal;">
                {{ formatDouble(det?.subtotal,2) }}
              </div>
            </div>
          </div> -->
        </div>
        <div v-if="!row?.rinci?.length ">
          <app-no-data />
        </div>
        <!-- {{ row }} -->
      </template>
      <template #bottom-row>
        <td style="color: red;" colspan="5" class="col-1 text-right text-bold">
          Total
        </td>
        <td style="color: red;" class="col-1 text-right text-bold">
          {{ formatDouble(store.totalall) }}
        </td>
      </template>
    </tablepagex>
  </q-card-section>
</template>
<script setup>
import { useLaporanHutangKonsinyasiFarmasiStore } from 'src/stores/simrs/laporan/farmasi/hutang/konsinyasi'
import { formatDouble } from 'src/modules/formatter'
import TablePagex from './TablePageX.vue'

const store = useLaporanHutangKonsinyasiFarmasiStore()

function click (val) {
  val.item.expand = !val.item.expand
}

function setToDisp (vaal) {
  store.tanggal.to = vaal
}

function setToFromDisp (vaal) {
  store.tanggal.from = vaal
}

function setTo (val) {
  store.params.tglsampai = val
}

function setFrom (val) {
  store.params.tgldari = val
}
// onMounted(() => {
//   store.getDataTable()
// })
</script>

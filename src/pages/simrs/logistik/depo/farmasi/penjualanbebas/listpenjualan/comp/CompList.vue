<template>
  <div class="row">
    <app-table-extend
      title="obat"
      :columns="table.columns"
      :column-hide="table.columnHide"
      :items="table.items"
      :meta="table.meta"
      :per-page="table.params.per_page"
      :order-by="table.params.order_by"
      :sort="table.params.sort"
      :loading="table?.loading"
      :to-search="table.params.q"
      :default-btn="false"
      :ada-paginasi="false"
      :ada-cari="false"
      :ada-refresh="false"
      :ada-per-page="false"
      :ada-filter="false"
      :ada-tambah="false"
      click-able
      row-no
      @on-click="clicked"
    >
      <template #col-noreg>
        <div>Nomor Registrasi</div>
      </template>
      <template #col-kode_identitas>
        <div>Kode Identitas</div>
      </template>
      <template #col-nama>
        <div>Nama</div>
      </template>
      <template #col-tgl_kunjungan>
        <div>Tanggal kunjungan</div>
      </template>

      <template #cell-tgl_kunjungan="{row}">
        <div class="row no-wrap">
          {{ dateFullFormat(row.tgl_kunjungan) }}
        </div>
      </template>
      <template #expand="{row}">
        <div v-if="row?.apotek?.length" style="width: 90vw;">
          <div class="row q-mr-xs q-pa-sm text-weight-bold bg-dark text-white no-wrap">
            <div class="col-1">
              No
            </div>
            <div class="col-2">
              Nomor Resep
            </div>
            <div class="col-9">
              <div class="row">
                <div class="col-5">
                  Obat
                </div>
                <div class="col-2">
                  Satuan
                </div>
                <div class="col-1 text-right">
                  Jumlah
                </div>
                <div class="col-1 text-right">
                  Harga
                </div>
                <div class="col-2 text-right">
                  Subtotal
                </div>
              </div>
            </div>
          </div>
          <div v-for="(item,i) in row.apotek" :key="item" :class="i%2===1?'bg-grey-4':''">
            <div class="row no-wrap q-mr-xs q-py-xs items-center">
              <div class="col-1">
                {{ i+1 }}
              </div>

              <div class="col-2">
                {{ item?.noresep }}
              </div>
              <div class="col-9">
                <div v-for="(det,j) in item?.rincian" :key="det">
                  <div class="row q-py-xs" :class="j%2===1?'bg-blue-2':''">
                    <div class="col-5">
                      {{ det?.mobat?.nama_obat }}
                    </div>
                    <div class="col-2">
                      {{ det?.mobat?.satuan_k }}
                    </div>
                    <div class="col-1 text-right">
                      {{ det?.jumlah }}
                    </div>
                    <div class="col-1 text-right">
                      {{ formatDouble(det?.harga_jual,2) }}
                    </div>
                    <div class="col-2 text-right">
                      <!-- {{ formatDouble((parseFloat(det?.harga_jual)*parseFloat(det?.jumlah)),2) }} -->
                      {{ formatDouble(det?.subtotal,2) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row q-py-xs text-weight-bold">
              <div class="col-8 text-right">
                Total
              </div>
              <div class="col-4 text-right">
                {{ formatDouble(item?.total,2) }}
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          Tidak ada data
        </div>
      </template>
    </app-table-extend>
  </div>
</template>
<script setup>
import { dateFullFormat, formatDouble } from 'src/modules/formatter'
import { useListKunjunganPenjualanLangsungStore } from 'src/stores/simrs/farmasi/penjualanbebas/list'

const table = useListKunjunganPenjualanLangsungStore()
function clicked (val) {
  console.log(val)
  val.item.expand = !val?.item?.expand
  val.item.highlight = !val?.item?.highlight
}
</script>

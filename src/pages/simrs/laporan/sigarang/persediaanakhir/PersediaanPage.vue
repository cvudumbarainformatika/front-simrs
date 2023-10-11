<template>
  <div class="bg-white q-pa-xs">
    <div
      class="row bg-primary text-white q-pa-sm q-mb-sm"
    >
      <div class="f-14 text-weight-bold">
        Laporan Persediaan (FIFO)
      </div>
    </div>
    <div class="row q-col-gutter-sm q-my-sm">
      <div class="col-2">
        <app-autocomplete
          v-model="store.params.bulan"
          label="Pilih Bulan"
          autocomplete="nama"
          option-label="nama"
          option-value="value"
          outlined
          :source="store.bulans"
          :loading="store.loading"
        />
      </div>
      <div class="col-2">
        <app-input
          v-model="store.params.tahun"
          label="Tahun"
          outlined
          :loading="store.loading"
        />
      </div>
    </div>
    <div class="row q-col-gutter-sm q-my-sm">
      <div class="col-4">
        <app-autocomplete
          v-model="store.params.kode_ruang"
          label="Pilih Gudang / Depo"
          autocomplete="nama"
          option-label="nama"
          option-value="value"
          valid
          outlined
          :source="store.gudangs"
          :loading="store.loading"
        />
      </div>
      <div class="col-2">
        <app-btn
          label="Ambil Data"
          :disable="store.loading"
          :loading="store.loading"
          @click="store.getDataTable"
        />
      </div>
    </div>
    <app-table-extend
      :columns="store.columns"
      :items="store.items"
      :meta="store.meta"
      :per-page="store.params.per_page"
      :loading="store.loading"
      :to-search="store.params.q"
      :default-btn="false"
      :ada-tambah="false"
      :ada-filter="false"
      text-cari="Cari Nama / Kode ..."
      row-no
      bottom-row
      @find="store.setSearch"
      @goto="store.setPage"
      @set-row="store.setPerPage"
      @refresh="store.refreshTable"
    >
      <template #col-kode>
        <div>Kode</div>
      </template>
      <template #col-nama>
        <div>Nama</div>
      </template>
      <template #col-satuan>
        <div>Satuan</div>
      </template>
      <template #col-qty>
        <div class="row no-wrap justify-between">
          <div class="q-mr-md">
            Qty
          </div>
          <div class="q-mr-md">
            Harga
          </div>
          <div class="q-mr-md">
            Nilai
          </div>
        </div>
      </template>
      <template #cell-satuan="{row}">
        <div>{{ row.satuan?.nama }}</div>
      </template>
      <template #cell-qty="{row}">
        <div v-if="row.monthly.length">
          <div
            v-for="(item,i) in row.monthly"
            :key="i"
            class="row no-wrap justify-between q-mt-xs"
          >
            <div class="q-mr-md">
              {{ item.sisa_stok }}
            </div>
            <div class="q-mr-md">
              {{ formatRp( item.harga) }}
            </div>
            <div class="q-mr-md">
              {{ formatRp(item.total) }}
            </div>
          </div>
        </div>
        <div v-if="row.recent.length">
          <div
            v-for="(item,i) in row.recent"
            :key="i"
            class="row no-wrap justify-between q-mt-xs"
          >
            <div class="q-mr-sm">
              {{ item.sisa_stok }}
            </div>
            <div class="q-mr-sm">
              {{ formatRp(item.harga) }}
            </div>
            <div class="q-mr-sm">
              {{ formatRp(item.total) }}
            </div>
          </div>
        </div>
        <div
          v-else
          class=" row jutify-center"
        >
          -
        </div>
      </template>
      <template #bottom-row>
        <td colspan="3">
          <div class="text-right">
            Jumlah
          </div>
        </td>
        <td>
          <div
            v-if="store.items.length"
            class="text-right"
          >
            {{ formatRp(store.items.map(a=>{a.subtotal}).reduce((a,b)=>a+b,0)) }}
            <!-- {{ store.items.map(anu=>anu.subtotal) }} -->
          </div>
        </td>
      </template>
    </app-table-extend>
  </div>
</template>
<script setup>
import { formatRp } from 'src/modules/formatter'
import { useLaporanSigarangPersediaanFifoStore } from 'src/stores/simrs/laporan/sigarang/persediaanakhir/persediaan'

const store = useLaporanSigarangPersediaanFifoStore()
store.getInitialData()
</script>

<template>
  <app-table-extend
    id="printMe"
    :columns="store.columns"
    :items="store.items"
    :meta="store.meta"
    :per-page="store.params.per_page"
    :loading="store.loading"
    :to-search="store.params.q"
    :default-btn="false"
    :ada-tambah="false"
    :ada-filter="false"
    row-no
    use-full
    text-cari="Cari ..."
    @find="store.setSearch"
    @goto="store.setPage"
    @set-row="store.setPerPage"
    @refresh="store.refreshTable"
  >
    <template #col-obat>
      <div>Obat</div>
    </template>
    <template #col-jenis_belanja>
      <div>Jenis Belanja</div>
    </template>
    <template #col-kode_108>
      <div>Group Kode Barang</div>
    </template>
    <template #col-harga>
      <div>Harga</div>
    </template>
    <template #col-pbf>
      <div>PBF</div>
    </template>
    <template #col-stok_awal>
      <div>Stok Awal</div>
    </template>
    <template #col-masuk>
      <div>Masuk</div>
    </template>
    <template #col-keluar_umum>
      <div>Keluar Umum</div>
    </template>
    <template #col-keluar_bpjs>
      <div>Keluar BPJS</div>
    </template>
    <template #col-keluar_sktm>
      <div>Keluar SKTM</div>
    </template>
    <template #col-keluar_tagihan>
      <div>Keluar Tagihan</div>
    </template>
    <template #col-keluar_lain>
      <div>Keluar Lain-lain</div>
    </template>
    <!-- cell -->
    <template #cell-obat="{row}">
      <div class="row f-12 text-weight-bold">
        {{ row?.nama_obat }}
      </div>
      <div class="row f-10 text-italic">
        {{ row?.kd_obat }}
      </div>
      <div class="row f-10 ">
        {{ row?.bentuk_sediaan }}
      </div>
      <div class="row f-10 q-col-gutter-sm text-weight-bold">
        <div v-if="row?.status_forkid==='1'" class="col-auto text-green">
          Forkit
        </div>
        <div v-if="row?.status_fornas==='1'" class="col-auto text-green">
          Fornas
        </div>
        <div v-if="row?.status_generik==='1'" class="col-auto text-green">
          Generik
        </div>
        <div v-if="row?.status_prb==='1'" class="col-auto text-green">
          PRB
        </div>
        <div v-if="row?.status_konsinyasi==='1'" class="col-auto text-orange">
          Konsinyasi
        </div>
        <div v-if="row?.status_kronis==='1'" class="col-auto text-blue">
          Kronis
        </div>
        <div v-if="row?.kelompok_psikotropika==='1'" class="col-auto text-negative">
          Psikotropika
        </div>
      </div>
    </template>
    <template #cell-kode_108="{row}">
      {{ row.kode108 }}
    </template>
  </app-table-extend>
</template>
<script setup>
import { useLaporanPemakaianObatStore } from 'src/stores/simrs/laporan/farmasi/pemakaianobat/pemakaian'
import { onMounted } from 'vue'

const store = useLaporanPemakaianObatStore()
onMounted(() => {
  store.getDataTable()
})
</script>

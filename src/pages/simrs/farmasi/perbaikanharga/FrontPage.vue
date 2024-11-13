<template>
  <div class="bg-white q-pa-sm">
    <div class="q-mb-md text-weight-bold">
      Perbaikan Harga
    </div>
    <div>
      <app-table
        :columns="store.columns"
        :items="store.items"
        :meta="store.meta"
        :per-page="store.params.per_page"
        :loading="store.loading"
        :to-search="store.params.q"
        :default-btn="false"
        :ada-tambah="false"
        :ada-filter="false"
        @goto="store.setPage"
        @set-row="store.setPerPage"
        @refresh="store.refreshTable"
        @find="store.setSearch"
        @set-order="store.setOder"
      >
        <template #header-left-after-search>
          <div class=" q-ml-sm" style="width: 250px">
            <app-autocomplete-new
              v-model="store.params.kdruang"
              label="Pilih Gudang / Depo"
              autocomplete="nama"
              option-label="nama"
              option-value="kode"
              outlined
              clearable
              :source="store.gudangs"
              @on-select="(val)=>{
                store.setParams('kdruang', val)
                store.getData()
              }"
            />
          </div>
          <div class="q-ml-sm" style="width: 100px">
            <app-input v-model="store.params.tahun" label="Tahun" outlined />
          </div>
          <div class="q-ml-sm" style="width: 75px">
            <app-input v-model="store.params.bulan" label="Bulan" outlined />
          </div>
        </template>
        <template #col-kd_obat>
          Kode
        </template>
        <template #col-nama_obat>
          Nama
        </template>
        <template #col-stok>
          Stok Sekarang
        </template>
        <template #col-opname>
          Stok Opname
        </template>
        <template #col-mutasi>
          Mutasi Masuk
        </template>
        <template #col-mutasi_keluar>
          Mutasi Keluar
        </template>
        <template #col-resep>
          Resep
        </template>
        <template #col-racikan>
          Racikan
        </template>
        <template #col-retur>
          Retur
        </template>
        <template #cell-stok="{ row }">
          <div class="text-right">
            {{ formatDouble(parseFloat(row?.stok),2) }}
          </div>
        </template>
        <template #cell-opname="{ row }">
          <div class="text-right">
            {{ formatDouble(parseFloat(row?.opname),2) }}
          </div>
        </template>
        <template #cell-mutasi="{ row }">
          <div class="text-right">
            {{ formatDouble(parseFloat(row?.mutasi),2) }}
          </div>
        </template>
        <template #cell-mutasi_keluar="{ row }">
          <div class="text-right">
            {{ formatDouble(parseFloat(row?.mutasi_keluar),2) }}
          </div>
        </template>
        <template #cell-resep="{ row }">
          <div class="text-right">
            {{ formatDouble(parseFloat(row?.resep),2) }}
          </div>
        </template>
        <template #cell-racikan="{ row }">
          <div class="text-right">
            {{ formatDouble(parseFloat(row?.racikan),2) }}
          </div>
        </template>
        <template #cell-retur="{ row }">
          <div class="text-right">
            {{ formatDouble(parseFloat(row?.retur),2) }}
          </div>
        </template>
        <template #cell-status="{ row }">
          <q-chip
            size="sm"
            dense
            :color="row?.beda?.filter(a=>a===true)?.length>0?'negative':'primary'"
            text-color="white"
          >
            <div v-if="row?.beda?.filter(a=>a===true)?.length>0">
              Beda
            </div>
            <div v-else>
              sama
            </div>
          </q-chip>
        </template>
        <template #cell-act="{ row }">
          <div>
            <q-btn
              no-caps
              dense
              color="primary"
              @click="()=>{
                store.isOpen=true
                store.data=row
              }"
            >
              Buka
            </q-btn>
          </div>
        </template>
      </app-table>
    </div>
  </div>
  <DetailPage v-model="store.isOpen" @close="store.isOpen=false" />
</template>
<script setup>
import { formatDouble } from 'src/modules/formatter'
import { usePerbaikanHargaFarmasiStore } from 'src/stores/simrs/farmasi/perbaikanharga/perbaikanharga'
import { defineAsyncComponent, onMounted, shallowRef } from 'vue'

const store = usePerbaikanHargaFarmasiStore()
const DetailPage = shallowRef(defineAsyncComponent(() => import('./DetailPage.vue')))
onMounted(() => {
  store.getData()
})
</script>

<style lang="scss" scoped>
.q-tab {
  border-top-left-radius: 40px;
  border-bottom-right-radius: 40px;
}

</style>

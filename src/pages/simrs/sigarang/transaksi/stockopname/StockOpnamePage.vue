<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="f-14 text-weight-bold">
          Stok Opname
        </div>
        <div class="title-desc">
          Halaman Stok Opname Barang Penunjang Non Medik
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <!-- tanggal -->
        <div class="fit row no-wrap justify-between items-center">
          <div class="col-3">
            Tanggal Stok Opname
          </div>
          <div class="col-9">
            {{ tanggalStokOpname }}
          </div>
        </div>
        <!-- gudang -->
        <div class="fit row no-wrap justify-between items-center q-mb-sm">
          <div class="col-3">
            Gudang
          </div>
          <div class="col-9">
            <app-autocomplete-new
              label="pilih "
              :model="store.form.kode_tempat"
              autocomplete="nama"
              option-label="nama"
              option-value="kode"
              :loading="store.loading"
              :source="store.gudangDepo"
              @on-select="gudangSelected"
              @clear="gudangCleared"
            />
          </div>
        </div>
        <q-separator />
        <div class="fit row no-wrap justify-between items-center q-mt-sm q-mb-sm">
          <q-input
            v-model="store.params.search"
            outlined
            class="search-big"
            borderless
            debounce="500"
            clearable
            dense
            placeholder="Search..."
            @keydown.enter.prevent="searchEnter"
            @update:model-value="searchEnter"
          >
            <template #prepend>
              <q-icon
                name="icon-mat-search"
                size="20px"
              />
            </template>
          </q-input>
        </div>
        <q-separator />
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { date } from 'quasar'
import { ref } from 'vue'
import { useStokOpnameStore } from 'stores/simrs/logistik/sigarang/transaksi/opname/stokOpname'

const tanggalStokOpname = ref(date.formatDate(Date.now(), 'DD MMMM YYYY'))
const store = useStokOpnameStore()
store.getInitialData()

const gudangSelected = (val) => {
  console.log('gudang', val)
  store.form.kode_tempat = val
}
const gudangCleared = () => {
  store.form.kode_tempat = null
}
const searchEnter = () => {
  console.log(store.params.search)
}
</script>

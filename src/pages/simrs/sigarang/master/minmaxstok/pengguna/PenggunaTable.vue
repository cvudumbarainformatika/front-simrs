<template>
  <q-page class="q-pa-sm">
    <div>
      <app-card
        title="Maks stok ruangan"
        desc="Data Maksimal Stok Ruangan"
      >
        <template #content>
          <div class="fit row wrap justify-start">
            <div class="q-mr-sm">
              <q-input
                v-model="store.params.ruang"
                outlined
                class="search-big"
                borderless
                debounce="1000"
                dense
                placeholder="Cari Ruangan"
                @update:model-value="store.setPenggunaSearch"
                @keyup.enter.prevent="store.setPenggunaSearch"
              >
                <template #prepend>
                  <q-icon
                    name="icon-mat-search"
                    size="20px"
                  />
                </template>
              </q-input>
            </div>
            <div class="q-mr-sm">
              <q-input
                v-model="store.params.barang"
                outlined
                class="search-big"
                borderless
                debounce="1000"
                dense
                placeholder="Cari barang"
                @update:model-value="store.setBarangSearch"
                @keyup.enter.prevent="store.setBarangSearch"
              >
                <template #prepend>
                  <q-icon
                    name="icon-mat-search"
                    size="20px"
                  />
                </template>
              </q-input>
            </div>
            <div class="q-mr-sm">
              <app-autocomplete-new
                v-model="store.params.flag_minta"
                label="Tampilkan"
                option-value="value"
                option-label="nama"
                autocomplete="nama"
                valid
                outlined
                :source="store.optionTampil"
                :loading="store.loading"
                @on-select="FlagSelected"
                @clear="FlagCleared"
              />
            </div>
            <div
              v-if="store.params.flag_minta==='1' && store.items.length"
              class="q-mr-sm"
            >
              <app-btn
                label="Terima Semua"
                push
                @click="store.accceptAll"
              />
            </div>
          </div>
          <app-table
            title="Data Gudang"
            :columns="store.columns"
            :column-hide="store.columnHide"
            :items="store.items"
            :meta="store.meta"
            :per-page="store.params.per_page"
            :order-by="store.params.order_by"
            :sort="store.params.sort"
            :loading="store.loading"
            :to-search="store.params.q"
            :ada-cari="false"
            @goto="store.setPage"
            @set-row="store.setPerPage"
            @refresh="store.refreshTable"
            @find="store.setSearch"
            @set-order="store.setOder"
            @new-data="store.newData"
            @edit-data="store.editData"
            @delete="store.deletesData"
          >
            <template #col-kode_rs>
              <div>Kode Barang</div>
            </template>

            <template #col-barang>
              <div>Nama Barang</div>
            </template>
            <template #cell-barang="{row}">
              <div>{{ row.barang.nama }}</div>
            </template>

            <template #col-depo>
              <div>Depo</div>
            </template>
            <template #cell-depo="{row}">
              <div>{{ row.depo?row.depo.nama:'-' }}</div>
            </template>
            <template #col-minta>
              <div>Permintaan max Ruangan</div>
            </template>
            <template #col-flag_minta>
              <div>ada Permintaan max</div>
            </template>
            <template #cell-flag_minta="{row}">
              <div>
                <q-badge v-if="row.flag_minta==='1'">
                  Ya
                </q-badge>
              </div>
            </template>

            <template #col-pengguna>
              <div>Pengguna</div>
            </template>
            <template #cell-pengguna="{row}">
              <div>{{ row.pengguna?row.pengguna.jabatan:'-' }}</div>
            </template>
            <template #col-ruang>
              <div>Ruangan</div>
            </template>
            <template #cell-ruang="{row}">
              <div>{{ row.ruang?row.ruang.uraian:'-' }}</div>
            </template>

            <template #col-min_stok>
              <div>Stok Minimun</div>
            </template>
            <template #col-max_stok>
              <div>Stok Maksimum</div>
            </template>
            <template #left-acttion="{row,col}">
              <div class="row items-center">
                <div v-if="row.loading">
                  <!-- <div> -->
                  <app-btn
                    flat
                    loading
                  />
                </div>
                <div v-if="row.flag_minta==='1'">
                  <app-input
                    v-model="row.max_stok"
                    label="max ruangan disetujui"
                    outlined
                    valid
                    @focus="maxFokus(row,col)"
                    @blur="maxBlur(row,col)"
                  />
                </div>
              </div>
            </template>
          </app-table>
          <!--
            row-image="image"
            @delete-ids="table.deletesData"
            -->
        </template>
      </app-card>
    </div>
    <!-- dialog -->
    <formDialog v-model="store.isOpen" />
  </q-page>
</template>
<script setup>
import { useMinMaxPenggunaStockStore } from 'src/stores/simrs/logistik/sigarang/master/minmaxstok/pengguna/pengguna'
import formDialog from './FormDialog.vue'
const store = useMinMaxPenggunaStockStore()
store.getDataTable()
const maxFokus = (val, i) => {
  store.items[i].max_stok = val.minta
  console.log('fokus', val, i)
}
const maxBlur = (val, i) => {
  store.items[i].loading = true
  store.items[i].flag_minta = null
  store.items[i].minta = 0
  store.setForm('kode_rs', store.items[i].kode_rs)
  store.setForm('kode_ruang', store.items[i].kode_ruang)
  store.setForm('max_stok', store.items[i].max_stok)
  store.setForm('id', store.items[i].id)
  store.setForm('minta', 0)
  store.setForm('flag_minta', null)
  store.setujuiMaxRuangan()
  // store.form = {
  //   kode_rs: store.items[i].kode_rs,
  //   kode_ruang: store.items[i].kode_ruang,
  //   minta: 0,
  //   max_stok: store.items[i],
  //   max_stok,
  //   id: store.items[i].id,
  //   flag_minta: null
  // },
  console.log('blur', store.form)
}
const FlagSelected = val => {
  store.params.flag_minta = val
  console.log('selected', val)
  store.getDataTable()
}
const FlagCleared = val => {
  console.log('clared', val)
}
</script>

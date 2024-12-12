<template>
  <q-card-section>
    <TablePage
      :ada-cari="false"
      :default-btn="false"
      :right-action="false"
      :items="store.items_rinci"
      :columns="store.kolom_rinci"
      :column-hide="store.columnHide"
      :loading="store.loading"
      row-no
      click-able
      @refresh="store.refreshTable"
    >
      <template #header-left-after-search>
        <q-form
          ref="formRef"
          class="row q-pa-md q-col-gutter-xs"
          @submit="store.initAmbilDataRinci"
        >
          <div class="row q-col-gutter-sm">
            <div>
              <app-input-date-human
                :model="store.tanggal_rinci.from"
                label="dari tanggal"
                outlined
                @db-model="setFrom"
                @set-display="setToFromDisp"
              />
            </div>
            <div>
              <app-input-date-human
                :model="store.tanggal_rinci.to"
                label="sampai tanggal"
                outlined
                @db-model="setTo"
                @set-display="setToDisp"
              />
            </div>
            <div>
              <q-select
                v-model="store.params_rinci.gudang"
                label="Gudang"
                dense
                outlined
                emit-value
                map-options
                option-label="label"
                option-value="value"
                :options="pilihgudang"
                style="width: 200px;"
              />
            </div>
            <div>
              <q-select
                v-model="store.params_rinci.rekeningbelanja"
                label="Kode Rekening Belanja"
                dense
                outlined
                :options="props.rekeningbelanja"
                style="width: 300px;"
                emit-value
                map-options
                option-label="uraian"
                option-value="kode"
              />
            </div>
            <div>
              <q-select
                v-model="store.pihakketiga_rinci"
                label="PBF"
                dense
                outlined
                :options="options"
                emit-value
                map-options
                option-label="nama"
                option-value="kode"
                style="width: 300px;"
                clearable
                use-input
                @filter="filterFn"
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
      <template #cell-Obat="{row}">
        <div class="row justify-left">
          <div class="col-12">
            {{ row?.NamaObat }}
          </div>
          <div class="col-12 text-grey text-italic" style="font-size: x-small;">
            {{ row?.KodeObat }}
          </div>
          <div class="col-12 text-grey text-italic" style="font-size: x-small;">
            {{ row?.Kode108 }} ({{ row?.Uraian108 }})
          </div>
          <div class="col-12 text-grey text-italic" style="font-size: x-small;">
            {{ row?.KodeBelanja050 }} ({{ row?.Uraian50 }})
          </div>
        </div>
      </template>
      <template #cell-Gudang="{row}">
        <div class="row justify-center">
          <div class="col-12">
            {{ row?.Gudang }}
          </div>
          <div class="col-12 text-grey text-italic" style="font-size: x-small;">
            {{ row?.NoPenerimaan }} || {{ row?.NoBatch }}
          </div>
        </div>
      </template>
      <template #cell-Kuantitas="{row}">
        <div class="row justify-end">
          {{ formatDouble(row?.Kuantitas) }} {{ row?.satuanB }}
        </div>
      </template>
      <template #cell-Harga="{row}">
        <div class="row justify-end">
          {{ formatDouble(row?.Harga) }}
        </div>
      </template>
      <template #cell-Total="{row}">
        <div class="row justify-end">
          {{ formatDouble(row?.Total) }}
        </div>
      </template>
      <template #bottom-row>
        <td style="color: red;" colspan="6" class="col-1 text-right text-bold">
          Total
        </td>
        <td style="color: red;" class="col-1 text-right text-bold">
          Rp.  {{ formatDouble(store.totalall_rinci) }}
        </td>
      </template>
    </TablePage>
  </q-card-section>
</template>
<script setup>
import { useLaporanPenerimaanObatStore } from 'src/stores/simrs/laporan/farmasi/penerimaanobat/penerimaanobat'
import TablePage from './TablePage.vue'
import { ref } from 'vue'
import { formatDouble } from 'src/modules/formatter'

const store = useLaporanPenerimaanObatStore()

const pilihgudang = ref([
  { label: 'Semua Gudang', value: 'all' },
  { label: 'Gudang KO', value: 'Gd-05010100' },
  { label: 'Gudang Flor Stok', value: 'Gd-03010100' }
])

const optionsx = store.pihakTigasx.unshift({ kode: 'all', nama: 'Semua Pbf' })
const options = ref([optionsx])

function filterFn (val, update) {
  if (val === '') {
    update(() => {
      options.value = []
    })
    return
  }
  update(() => {
    const needle = val.toLowerCase()

    options.value = store.pihakTigasx.filter(
      (v) => v.nama.toLowerCase().indexOf(needle) > -1 || v.kode.toLowerCase().indexOf(needle) > -1
    )
  })
}

function setToDisp (vaal) {
  store.tanggal_rinci.to = vaal
}

function setToFromDisp (vaal) {
  store.tanggal_rinci.from = vaal
}

function setTo (val) {
  store.params_rinci.tglsampai = val
}

function setFrom (val) {
  store.params_rinci.tgldari = val
}

// store.refreshrinci()

const props = defineProps({
  pihakketiga: {
    type: Object,
    default: null
  },
  rekeningbelanja: {
    type: Object,
    default: null
  }
})
</script>

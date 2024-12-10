<template>
  <q-card-section>
    <TablePage
      :ada-cari="false"
      :default-btn="false"
      :right-action="false"
      :items="store.items"
      :columns="store.kolom"
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
          @submit="store.initAmbilData"
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
              <q-select
                v-model="store.params.gudang"
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
                v-model="store.params.jenispenerimaan"
                label="Jenis Penerimaan"
                dense
                outlined
                :options="pilihpenerimaan"
                style="width: 200px;"
                emit-value
                map-options
                option-label="label"
                option-value="value"
              />
            </div>
            <div>
              <q-select
                v-model="store.pihakketiga"
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
      <template #cell-NoPenerimaan="{row}">
        <div class="row justify-center">
          {{ row?.NoPenerimaan }}
        </div>
      </template>
      <template #cell-TglPenerimaan="{row}">
        <div class="row justify-center">
          {{ row?.TglPenerimaan }}
        </div>
      </template>
      <template #cell-Suplier="{row}">
        <div class="row justify-center">
          {{ row?.Suplier }}
        </div>
      </template>
      <template #cell-NoPemesanan="{row}">
        <div class="row justify-center">
          {{ row?.NoPemesanan }}
        </div>
      </template>
      <template #cell-TglPemesanan="{row}">
        <div class="row justify-center">
          {{ row?.TglPemesanan }}
        </div>
      </template>
      <template #cell-NoDokumen="{row}">
        <div class="row justify-center">
          {{ row?.NoDokumen }}
        </div>
      </template>
      <template #cell-JenisDokumen="{row}">
        <div class="row justify-center">
          {{ row?.JenisDokumen }}
        </div>
      </template>
      <template #cell-TglSurat="{row}">
        <div class="row justify-center">
          {{ row?.TglSurat }}
        </div>
      </template>
      <template #cell-TglJatuhTempo="{row}">
        <div class="row justify-center">
          {{ row?.TglJatuhTempo }}
        </div>
      </template>
      <template #cell-Total="{row}">
        <div class="row justify-end">
          {{ formatDouble(row?.Total) }}
        </div>
      </template>
      <template #bottom-row>
        <td style="color: red;" colspan="10" class="col-1 text-right text-bold">
          Total
        </td>
        <td style="color: red;" class="col-1 text-right text-bold">
          {{ formatDouble(store.totalall) }}
        </td>
      </template>
    </TablePage>
  </q-card-section>
</template>
<script setup>
import { ref } from 'vue'
import TablePage from './TablePage.vue'
import { formatDouble } from 'src/modules/formatter'
import { useLaporanPenerimaanObatStore } from 'src/stores/simrs/laporan/farmasi/penerimaanobat/penerimaanobat'

const store = useLaporanPenerimaanObatStore()

const pilihgudang = ref([
  { label: 'Semua Gudang', value: 'all' },
  { label: 'Gudang KO', value: 'Gd-05010100' },
  { label: 'Gudang Flor Stok', value: 'Gd-03010100' }
])
const pilihpenerimaan = ref([
  { label: 'Semua Penerimaan', value: 'all' },
  { label: 'Pembelian Langsung', value: 'Pembelian Langsung' },
  { label: 'Pesanan', value: 'Pesanan' },
  { label: 'Pinjaman', value: 'Pinjaman' },
  { label: 'Konsinyasi', value: 'Konsinyasi' },
  { label: 'APBD', value: 'APBD' },
  { label: 'APBN', value: 'APBN' },
  { label: 'Penggantian Barang', value: 'Penggantian Barang' },
  { label: 'Hibah', value: 'Hibah' },
  { label: 'Sisa Pasien', value: 'Sisa Pasien' }])
const optionsx = store.pihakTigas.unshift({ kode: 'all', nama: 'Semua Pbf' })
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

    options.value = store.pihakTigas.filter(
      (v) => v.nama.toLowerCase().indexOf(needle) > -1 || v.kode.toLowerCase().indexOf(needle) > -1
    )
  })
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

</script>

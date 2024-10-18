<template>
  <q-card-section>
    <TablePagex
      :ada-cari="false"
      :default-btn="false"
      :right-action="false"
      :items="store.items"
      :columns="store.kolom"
      :column-hide="store.columnHide"
      :loading="store.loading"
      row-no
      click-able
      @on-click="click"
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
      <template #expand="{row}">
        <div v-if="row?.rinci?.length">
          <div class="row f-14 text-weight-bold q-my-sm">
            Detail Hutang Obat
          </div>
          <q-markup-table :separator="cell" flat bordered>
            <thead>
              <tr class="bg-dark text-white items-center">
                <th>No</th>
                <th>No. Peerimaan</th>
                <th>Obat</th>
                <th>Jumlah</th>
                <th>Harga</th>
                <th>Satuan</th>
                <th>Diskon</th>
                <th>PPN</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(rincix,i) in row.rinci" :key="rincix">
                <td>{{ i+1 }}</td>
                <td>{{ rincix?.nopenerimaan }}</td>
                <td> {{ rincix?.masterobat?.nama_obat }}</td>
                <td>
                  Pesan = {{ rincix?.jml_pesan }} <br>
                  Terima (Besar) = {{ formatDouble(rincix?.jml_terima_b) }} <br>
                  Terima (Kecil) = {{ formatDouble(rincix?.jml_terima_k) }} <br>
                  Penerimaan Sebelumnya = {{ rincix?.jml_terima_lalu }} <br>
                  Semua Penerimaan = {{ rincix?.jml_all_penerimaan }} <br>
                </td>
                <td>
                  Harga (Besar) = {{ formatDouble(rincix?.harga) }} <br>
                  Harga (Kecil) = {{ formatDouble(rincix?.harga_kcl) }} <br>
                  Harga Netto (Besar) = {{ formatDouble(rincix?.harga_netto) }} <br>
                  Harga Netto (Kecil) = {{ formatDouble(rincix?.harga_netto_kecil) }} <br>
                </td>
                <td>
                  Satuan (Besar) = {{ rincix?.satuan }} <br>
                  Satuan (Kecil) = {{ rincix?.satuan_kcl }} <br>
                  Isi = {{ formatDouble(rincix?.isi) }} <br>
                </td>
                <td>
                  Diskon (%) = {{ rincix?.diskon }}% <br>
                  Diskon (Besar) = {{ formatDouble(rincix?.diskon_rp) }} <br>
                  Diskon (Kecil) = {{ formatDouble(rincix?.diskon_rp_kecil) }} <br>
                </td>
                <td>
                  PPN (%) = {{ formatDouble(rincix?.ppn) }}% <br>
                  PPN (Besar) = {{ formatDouble(rincix?.ppn_rp) }} <br>
                  PPN (Kecil) = {{ formatDouble(rincix?.ppn_rp_kecil) }} <br>
                  Harga Netto (Besar) = {{ formatDouble(rincix?.harga_netto) }} <br>
                  Harga Netto (Kecil) = {{ formatDouble(rincix?.harga_netto_kecil) }} <br>
                </td>
                <td>
                  {{ formatDouble(rincix?.subtotal) }}
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      <!-- {{ row }} -->
      </template>
      <template #bottom-row>
        <td style="color: red;" colspan="10" class="col-1 text-right text-bold">
          Total
        </td>
        <td style="color: red;" class="col-1 text-right text-bold">
          {{ formatDouble(store.totalall) }}
        </td>
      </template>
    </TablePagex>
  </q-card-section>
</template>

<script setup>
import TablePagex from './TablePageX.vue'
import { formatDouble } from 'src/modules/formatter'
import { useHutangObatByTransaksi } from 'src/stores/simrs/laporan/farmasi/hutang/hutangobatbytransaksi'
import { ref } from 'vue'

const store = useHutangObatByTransaksi()
const cell = ref('cell')

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

</script>

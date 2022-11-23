
<template>
  <div class="q-px-lg q-pt-md">
    <app-card
      title="Rekap Absensi Pegawai"
      desc="Halaman Rekap Absensi per bulan"
    >
      <template #content>
        <div class="q-mb-sm">
          kamus warna
        </div>
        <app-table
          :columns="store.columns"
          :column-hide="store.columnHide"
          :items="store.items"
          :meta="store.meta"
          :per-page="store.params.per_page"
          :order-by="store.params.order_by"
          :sort="store.params.sort"
          :loading="store.loading"
          :to-search="store.params.q"
          :default-btn="false"
          :ada-tambah="false"
          @goto="store.setPage"
          @refresh="store.refreshTable"
          @find="store.setSearch"
          @set-order="store.setOder"
          @new-data="store.newData"
          @edit-data="store.editData"
          @delete="store.deletesData"
        >
          <template #col-nama>
            <div>Nama</div>
          </template>
          <template #cell-01="{row}">
            <div class="row">
              1. masuk normal centang ijo
            </div>
            <div class="row">
              2. telat kuning
            </div>
            <div class="row">
              3. tidak absen karena ijin dll
            </div>
            <div class="row">
              4. hari libur berdasarkan prota
            </div>
            <div v-if="!row['05']">
              hmh
            </div>
          </template>
          <template #cell-05="{row}">
            <div v-if="!row['05']">
              <q-chip
                color="red"
                text-color="white"
                class="chip"
                dense
                square
              >
                <div class="f-12 text-center">
                  None
                </div>
              </q-chip>
            </div>
            <div v-if="row['05']">
              <div class="row">
                <q-chip
                  :style="`background-color: ${row['05'].kategory.warna};`"
                  text-color="white"
                  class="chip"
                  dense
                  square
                >
                  <div class="f-12 text-center">
                    {{ dateHalfFormat (row['05'].tanggal) }}
                  </div>
                </q-chip>
              </div>
              <div class="row">
                <q-chip
                  color="green"
                  text-color="white"
                  class="chip"
                  dense
                  square
                >
                  <div class="f-12 text-center">
                    In   : {{ row['05'].masuk }}
                  </div>
                </q-chip>
              </div>
              <div class="row">
                <q-chip
                  color="orange"
                  text-color="white"
                  class="chip"
                  dense
                  square
                >
                  <div class="f-12 text-center">
                    out   : {{ row['05'].pulang }}
                  </div>
                </q-chip>
              </div>
              <div class="row">
                <q-chip
                  color="dark"
                  text-color="white"
                  class="chip"
                  dense
                  square
                >
                  <div class="f-12 text-center">
                    late   : {{ row['05'].diff }}
                  </div>
                </q-chip>
              </div>
            </div>
          </template>
        </app-table>
      </template>
    </app-card>
  </div>
</template>
<script setup>
import { dateHalfFormat } from 'src/modules/formatter'
import { useRekapAbsensiPegawaiStore } from 'src/stores/simrs/pegawai/user/rekapabsen/rekapabsen'

const store = useRekapAbsensiPegawaiStore()
store.getInitialData()
</script>

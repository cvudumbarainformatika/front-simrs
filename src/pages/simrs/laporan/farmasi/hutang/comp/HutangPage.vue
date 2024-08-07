<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="row items-center garis-bawah">
          <div class="col-2">
            <q-image
              src="~assets/images/logo-kota-grey.png"
              spinner-color="white"
              style="height: 3.56cm; max-width: 2.86cm"
            />
          </div>

          <div class="col-8">
            <div class="row justify-center f-18">
              PEMERINTAH KOTA PROBOLINGGO
            </div>
            <div class="row justify-center f-14 text-weight-bold">
              DINAS KESEHATAN, PENGENDALIAN PENDUDUK, DAN KELUARGA BERENCANA
            </div>
            <div class="row justify-center f-28 text-weight-bold">
              UOBK RSUD DOKTER MOHAMAD SALEH
            </div>
            <div class="row justify-center f-14">
              Jl. Mayjen Panjaitan No.65 Telp.(0335) 433119, 42118 Fax (0335) 432702
            </div>
            <div class="row justify-center f-14">
              E-mail : rsudprob@probolinggokota.go.id
            </div>
            <div class="row justify-center f-14 text-weight-bold">
              PROBOLINGGO  67219
            </div>
          </div>
          <div class="col-2">
            <q-img
              src="~assets/logos/logo-rsud.png"
              spinner-color="white"
              style="height: 4cm; max-width: 4cm"
            />
          </div>
        </div>
        <div class="row fit justify-center items-center text-weight-bold f-18">
          REKAP TAGIHAN PASIEN PER RUANGAN
        </div>
        <div class="row fit justify-center items-center text-weight-bold f-14">
          periode
        </div>
      </q-card-section>
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
                  <q-select
                    v-model="store.params.jenisreport"
                    use-input
                    fill-input
                    hide-selected
                    option-value="kodereport"
                    option-label="namareport"
                    :options="jenisreport"
                    emit-value
                    map-options
                    dense
                    outlined
                    label="Pilih Jenis Laporan Hutang"
                    transition-show="scale"
                    transition-hide="scale"
                    :rules="[
                      val => !!val || 'Harus diisi'
                    ]"
                  />
                </div>
                <div>
                  <app-input-date-human
                    :model="store.tanggal.from"
                    label="dari tanggal"
                    outlined
                    @db-model="setTo"
                    @set-display="setToDisp"
                  />
                </div>
                <!-- <div>
                  <app-input-date-human
                    :model="store.tanggal.to"
                    label="sampai tanggal"
                    outlined
                    @db-model="setTox"
                    @set-display="setToFromDisp"
                  />
                </div> -->

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
          <template #cell-PBF="{row}">
            {{ row?.PBF }}
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
              <div class="row text-weight-bold bg-dark text-white items-center q-py-xs" style="border-bottom: 1px solid black;">
                <div class="col-1">
                  No
                </div>
                <div class="col-2 ">
                  No. Penerimaan
                </div>
                <div class="col-1">
                  Kode
                </div>
                <div class="col-4">
                  Obat
                </div>
                <div class="col-1 text-right ">
                  Jumlah
                </div>
                <div class="col-1 text-right">
                  Harga
                </div>
                <div class="col-1 text-right">
                  PPN
                </div>
                <div class="col-1 text-right ">
                  Subtotal
                </div>
              </div>
              <div v-for="(rincix,i) in row.rinci" :key="rincix">
                <div class="row no-wrap " style="border-bottom: 1px solid black;">
                  <div class="col-1">
                    {{ i+1 }}
                  </div>
                  <div class="col-2 bg-grey-2" style="white-space: normal; overflow-wrap: normal;">
                    {{ rincix?.nopenerimaan }}
                  </div>
                  <div class="col-1 text-right" style="white-space: normal; overflow-wrap: normal;">
                    <div class="q-mr-xs">
                      {{ rincix?.kdobat }}
                    </div>
                  </div>
                  <div class="col-4 bg-grey-2" style="white-space: normal; overflow-wrap: normal;">
                    {{ rincix?.masterobat?.nama_obat }}
                  </div>
                  <div class="col-1 text-right ">
                    {{ rincix?.jml_terima_b }}
                  </div>
                  <div class="col-1 text-right ">
                    {{ formatDouble(rincix?.harga) }}
                  </div>
                  <div class="col-1 text-right ">
                    {{ formatDouble(rincix?.ppn_rp) }}
                  </div>
                  <div class="col-1 text-right ">
                    {{ formatDouble(rincix?.subtotal) }}
                  </div>
                </div>
              </div>
            </div>
            <!-- {{ row }} -->
          </template>
        </TablePage>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script setup>
import { ref } from 'vue'
// import CustomTable from '../../../rekap/CustomTable.vue'
import { usehutangObatPerTanggalStore } from 'src/stores/simrs/laporan/farmasi/hutang/hutangobatpertanggal'
import TablePage from './TablePage.vue'
import { formatDouble } from 'src/modules/formatter'

const store = usehutangObatPerTanggalStore()
const jenisreport = ref([
  {
    kodereport: '1',
    namareport: 'Laporan Hutang Pertanggal'
  }
])

function click (val) {
  val.item.expand = !val.item.expand
}

function setToDisp (vaal) {
  store.tanggal.from = vaal
}

</script>

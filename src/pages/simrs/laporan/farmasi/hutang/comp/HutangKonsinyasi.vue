<template>
  <div>
    <q-card :key="store.items">
      <q-card-section>
        <div class="row items-center garis-bawah">
          <div class="col-2">
            <q-img
              src="~assets/images/logo-kota-grey.png"
              spinner-color="white"
              style="height: 3.56cm; max-width: 2.86cm"
            />
          </div>
          <div class="col-8">
            <div class="row justify-center f-18">
              PEMERINTAH KOTA PROBOLINGGO
            </div>
            <div class="row justify-center f-12 text-weight-bold">
              DINAS KESEHATAN, PENGENDALIAN PENDUDUK, DAN KELUARGA BERENCANA
            </div>
            <div class="row justify-center f-20 text-weight-bold">
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
      </q-card-section>
      <q-card-section>
        <TablePage
          id="printMe"
          :columns="store.columns"
          :meta="store.meta"
          :column-hide="store.columnHide"
          :items="store.items"
          :per-page="store.params.per_page"
          :loading="store.loading"
          :to-search="store.params.q"
          ada-cari
          click-able
          row-no
          @goto="store.setPage"
          @set-row="store.setPerPage"
          @refresh="store.refreshTable"
          @find="store.setSearch"
          @on-click="click"
        >
          <template #cell-PBF="{row}">
            {{ row?.nama }}
          </template>
          <template #cell-Hutang="{row}">
            <div class="row justify-end">
              {{ formatDouble(row?.Hutang,2) }}
            </div>
          </template>

          <!-- eslint-disable-next-line vue/no-unused-vars -->
          <template #expand="{row}">
            <div v-if="row?.dist?.length">
              <div class="row f-14 text-weight-bold q-my-sm">
                Detail Hutang sudah di list konsinyasi
              </div>
              <div class="row text-weight-bold bg-dark text-white items-center q-py-xs" style="border-bottom: 1px solid black;">
                <div class="col-1">
                  No
                </div>
                <div class="col-2 ">
                  Pasien
                </div>
                <div class="col-1">
                  Kode
                </div>
                <div class="col-3">
                  Obat
                </div>
                <div class="col-1 text-right ">
                  Jumlah
                </div>
                <div class="col-2 text-right">
                  Harga
                </div>
                <div class="col-2 text-right ">
                  Subtotal
                </div>
              </div>
              <div v-for="(det,i) in row.dist" :key="det">
                <div class="row no-wrap " style="border-bottom: 1px solid black;">
                  <div class="col-1">
                    {{ i+1 }}
                  </div>
                  <div class="col-2 bg-grey-2" style="white-space: normal; overflow-wrap: normal;">
                    {{ det?.persiapan?.pasien?.rs2 }}
                  </div>
                  <div class="col-1 text-right" style="white-space: normal; overflow-wrap: normal;">
                    <div class="q-mr-xs">
                      {{ det?.kd_obat }}
                    </div>
                  </div>
                  <div class="col-3 bg-grey-2" style="white-space: normal; overflow-wrap: normal;">
                    {{ det?.nama_obat }}
                  </div>
                  <div class="col-1 text-right ">
                    {{ det?.dipakai }}
                  </div>
                  <div class="col-2 text-right bg-grey-2" style="white-space: normal; overflow-wrap: normal;">
                    {{ formatDouble(det?.harga_net,2) }}
                  </div>
                  <div class="col-2 text-right " style="white-space: normal; overflow-wrap: normal;">
                    {{ formatDouble(det?.sub,2) }}
                  </div>
                </div>
              </div>
            </div>
            <div v-if="row?.list?.length">
              <div class="row f-14 text-weight-bold q-my-sm">
                Detail Hutang belum di list konsinyasi
              </div>
              <div class="row text-weight-bold bg-dark text-white items-center q-py-xs" style="border-bottom: 1px solid black;">
                <div class="col-1">
                  No
                </div>
                <div class="col-2 ">
                  Pasien
                </div>
                <div class="col-1">
                  Kode
                </div>
                <div class="col-3">
                  Obat
                </div>
                <div class="col-1 text-right ">
                  Jumlah
                </div>
                <div class="col-2 text-right">
                  Harga
                </div>
                <div class="col-2 text-right ">
                  Subtotal
                </div>
              </div>
              <div v-for="(det,i) in row.list" :key="det">
                <div class="row no-wrap " style="border-bottom: 1px solid black;">
                  <div class="col-1">
                    {{ i+1 }}
                  </div>
                  <div class="col-2 bg-grey-2" style="white-space: normal; overflow-wrap: normal;">
                    {{ det?.persiapan?.pasien?.rs2 }}
                  </div>
                  <div class="col-1 text-right" style="white-space: normal; overflow-wrap: normal;">
                    <div class="q-mr-xs">
                      {{ det?.kd_obat }}
                    </div>
                  </div>
                  <div class="col-3 bg-grey-2" style="white-space: normal; overflow-wrap: normal;">
                    {{ det?.nama_obat }}
                  </div>
                  <div class="col-1 text-right ">
                    {{ det?.dipakai }}
                  </div>
                  <div class="col-2 text-right bg-grey-2" style="white-space: normal; overflow-wrap: normal;">
                    {{ formatDouble(det?.harga_net,2) }}
                  </div>
                  <div class="col-2 text-right " style="white-space: normal; overflow-wrap: normal;">
                    {{ formatDouble(det?.sub,2) }}
                  </div>
                </div>
              </div>
            </div>
            <div v-if="!row?.dist?.length && !row?.list?.length">
              <app-no-data />
            </div>
            <!-- {{ row }} -->
          </template>
        </TablePage>
        <!--
            row-image="image"
            @delete-ids="table.deletesData"
            -->
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { useLaporanHutangKonsinyasiFarmasiStore } from 'src/stores/simrs/laporan/farmasi/hutang/konsinyasi'
import { defineAsyncComponent, onMounted, shallowRef } from 'vue'
import { formatDouble } from 'src/modules/formatter'

const store = useLaporanHutangKonsinyasiFarmasiStore()
const TablePage = shallowRef(defineAsyncComponent(() => import('./TablePage.vue')))

function click (val) {
  val.item.expand = !val.item.expand
}
onMounted(() => {
  store.getDataTable()
})
</script>

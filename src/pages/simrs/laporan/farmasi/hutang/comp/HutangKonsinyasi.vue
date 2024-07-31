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
          <template #cell-tanggal="{row}">
            {{ dateFullFormat(row.rs3) }}
          </template>
          <template #cell-pasien="{row}">
            {{ row.pasien_kunjungan_poli?row.pasien_kunjungan_poli.nama:row.pasien_kunjungan_rawat_inap.nama }}
          </template>
          <template #cell-masuk="{row}">
            {{ row.rs11?row.rs11:'-' }}
          </template>
          <template #cell-keluar="{row}">
            {{ row.rs12?row.rs12:'-' }}
          </template>
          <template #cell-lama="{row}">
            {{ timeDiff(row.rs11,row.rs12) }}
          </template>
          <template #cell-regional="{row}">
            <div
              v-if="row.rs4==='Regional'"
              class="text-center"
            >
              <q-avatar size="12px">
                <img src="~assets/images/check.png">
              </q-avatar>
            </div>
          </template>
          <template #cell-general="{row}">
            <div
              v-if="row.rs4!=='Regional'"
              class="text-center"
            >
              <q-avatar size="12px">
                <img src="~assets/images/check.png">
              </q-avatar>
            </div>
          </template>
          <!-- eslint-disable-next-line vue/no-unused-vars -->
          <template #expand="{row}">
            <div class="row">
              <div class="col">
                Pasien
              </div>
              <div class="col">
                Obat
              </div>
              <div class="col">
                Jumlah
              </div>
              <div class="col">
                Harga
              </div>
              <div class="col">
                Subtotal
              </div>
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

const store = useLaporanHutangKonsinyasiFarmasiStore()
const TablePage = shallowRef(defineAsyncComponent(() => import('./TablePage.vue')))

function click (val) {
  console.log(val)
  val.item.expand = !val.item.expand
}
onMounted(() => {
  store.getDataTable()
})
</script>

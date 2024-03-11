<template>
  <div class="q-px-lg q-pt-md">
    <app-card
      title="Kategori Jadwal"
      desc="Halaman Input Kategori Jadwal Absensi"
    >
      <template #content>
        <div class="row fit justify-end q-mb-md">
          <div class="q-mr-sm">
            <q-btn
              dense
              label="ganti jadwal"
              color="primary"
              @click="store.isGanti=true"
            >
              <q-tooltip
                class="primary"
                :offset="[10, 10]"
              >
                Ganti jadwal pegawai
              </q-tooltip>
            </q-btn>
          </div>
        </div>
        <app-table
          title="Data Prota"
          :columns="store.columns"
          :column-hide="store.columnHide"
          :items="store.items"
          :meta="store.meta"
          :per-page="store.params.per_page"
          :order-by="store.params.order_by"
          :sort="store.params.sort"
          :loading="store.loading"
          :to-search="store.params.q"
          @goto="store.setPage"
          @set-row="store.setPerPage"
          @refresh="store.refreshTable"
          @find="store.setSearch"
          @set-order="store.setOder"
          @new-data="store.newData"
          @edit-data="store.editData"
          @delete="store.deletesData"
        >
          <template #col-durasi>
            <div>Durasi per-minggu</div>
          </template>
          <template #cell-durasi="{row}">
            <div class="row">
              <div class="col-6">
                {{ row.jam }} jam
              </div>
              <div class="col-6">
                : {{ row.menit }} menit
              </div>
            </div>
          </template>
          <template #cell-masuk="{row}">
            {{ formatJam(row.masuk) }}
          </template>
          <template #cell-pulang="{row}">
            {{ formatJam(row.pulang) }}
          </template>
          <template #cell-warna="{row}">
            <q-card
              flat
              class="text-white"
              :style="`background-color: ${row.warna };`"
            >
              <q-card-section>
                <div :style="`color: ${row.warna };`">
                  {{ row.warna }}
                </div>
              </q-card-section>
            </q-card>
          </template>
          <template #col-nama>
            <div>Nama Kategori</div>
          </template>
          <template #col-masuk>
            <div>Jam Masuk</div>
          </template>
          <template #col-pulang>
            <div>Jam Pulang</div>
          </template>
        </app-table>
      </template>
    </app-card>
    <FormDialog v-model="store.isOpen" />
    <app-fullscreen-blue
      v-model="store.isGanti"
      title="Ganti Jadwal Pegawai"
    >
      <template #default>
        <GantiDialog />
      </template>
    </app-fullscreen-blue>
  </div>
</template>
<script setup>
import { defineAsyncComponent, shallowRef } from 'vue'
import { useKategoriJadwalStore } from 'src/stores/simrs/pegawai/master/kategori/kategori'
// import FormDialog from './FormDialog.vue'
const store = useKategoriJadwalStore()

const FormDialog = shallowRef(defineAsyncComponent(() => import('./FormDialog.vue')))
const GantiDialog = shallowRef(defineAsyncComponent(() => import('./GantiJadwalDialog.vue')))

const formatJam = data => {
  const temp = data.split(':')
  return temp[0] + ' : ' + temp[1]
}
store.getInitialData()

</script>

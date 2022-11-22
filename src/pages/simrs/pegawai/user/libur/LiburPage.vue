<template>
  <div class="q-px-lg q-pt-md">
    <app-card
      title="Data Pegawai Tidak Masuk"
      desc="Halaman Pegawai yang Tidak hadir ke tempat kerja"
    >
      <template #content>
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
          @goto="store.setPage"
          @set-row="store.setPerPage"
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
          <template #col-flag>
            <div>Tipe</div>
          </template>
          <template #col-tanggal>
            <div>Tanggal</div>
          </template>
          <template #col-image>
            <div>Gambar</div>
          </template>
          <template #col-alasan>
            <div>Alasan</div>
          </template>
          <template #cell-nama="{row}">
            <div>{{ row.user.nama }}</div>
          </template>
          <template #cell-image="{row}">
            <div v-if="row.image">
              <q-img
                :src="pathImg + row.image"
                class="cursor-pointer"
                @click="imgClick(pathImg + row.image)"
              />
            </div>
            <div v-if="!row.image">
              <q-img
                src="~assets/images/no-image.png"
                class=""
              />
            </div>
          </template>
          <template #cell-flag="{row}">
            <div v-if="row.flag==='DL'">
              <q-chip
                color="blue-grey"
                text-color="white"
                class="chip"
                dense
                square
              >
                <div class="f-12 text-center">
                  Dinas Luar
                </div>
              </q-chip>
            </div>
            <div v-if="row.flag==='CUTI'">
              <q-chip
                color="cyan"
                text-color="white"
                class="chip"
                dense
                square
              >
                <div class="f-12 text-center">
                  Cuti
                </div>
              </q-chip>
            </div>
            <div v-if="row.flag==='IJIN'">
              <q-chip
                color="deep-orange"
                text-color="white"
                class="chip"
                dense
                square
              >
                <div class="f-12 text-center">
                  Ijin
                </div>
              </q-chip>
            </div>
            <div v-if="row.flag==='SAKIT'">
              <q-chip
                color="grey"
                text-color="white"
                class="chip"
                dense
                square
              >
                <div class="f-12 text-center">
                  SAKIT
                </div>
              </q-chip>
            </div>
          </template>
        </app-table>
      </template>
    </app-card>
    <FormDialog v-model="store.isOpen" />
    <ImageDialog v-model="store.expand" />
  </div>
</template>
<script setup>
import FormDialog from './FormDialog.vue'
import ImageDialog from './ImageDialog.vue'
import { useLiburAbsenStore } from 'src/stores/simrs/pegawai/user/libur/libur'
import { pathImg } from 'src/boot/axios'

const store = useLiburAbsenStore()
store.getInitialData()
const imgClick = val => {
  store.image = val
  store.setExpand()
}
</script>

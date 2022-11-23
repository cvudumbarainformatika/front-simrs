<template>
  <div class="q-px-lg q-pt-md">
    <app-card
      title="Data User Pegawai"
      desc="Halaman Pegawai yang sudah terdaftar sebagai user"
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
          :ada-tambah="false"
          @goto="store.setPage"
          @set-row="store.setPerPage"
          @refresh="store.refreshTable"
          @find="store.setSearch"
          @set-order="store.setOder"
          @new-data="store.newData"
          @edit-data="store.editData"
          @delete="store.deletesData"
        >
          <template #col-username>
            <div>Username</div>
          </template>
          <template #col-nama>
            <div>Nama</div>
          </template>
          <template #col-ganti>
            <div class="text-center">
              More Actions
            </div>
          </template>
          <template #col-status>
            <div>Status</div>
          </template>
          <!-- cell -->
          <template #cell-ganti="{row}">
            <div class="text-center">
              <q-btn
                flat
                color="primary"
                icon="icon-mat-swap_horiz"
                dense
                rounded
                @click="changeDevice(row)"
              >
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  Ganti Device
                </q-tooltip>
              </q-btn>
              <q-btn
                flat
                color="primary"
                icon="icon-mat-event"
                dense
                rounded
                @click="detailJadwal(row)"
              >
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  Lihat Jadwal
                </q-tooltip>
              </q-btn>
              <q-btn
                flat
                color="primary"
                icon="icon-mat-summarize"
                dense
                rounded
                @click="detailRekap(row)"
              >
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  Lihat Rekap Absensi
                </q-tooltip>
              </q-btn>
            </div>
          </template>
          <template #cell-status="{row}">
            <div v-if="row.status===null">
              <q-chip
                color="grey"
                text-color="white"
                class="chip"
                dense
                square
              >
                <div class="f-12 text-center">
                  none
                </div>
              </q-chip>
            </div>
            <div v-if="row.status===''">
              <q-chip
                color="green"
                text-color="white"
                class="chip"
                dense
                square
              >
                <div class="f-12 text-center">
                  siap absen
                </div>
              </q-chip>
            </div>
            <div v-if="row.status==='2'">
              <q-chip
                color="deep-orange"
                text-color="white"
                class="chip"
                dense
                square
              >
                <div class="f-12 text-center">
                  Ganti Device
                </div>
              </q-chip>
            </div>
          </template>
        </app-table>
      </template>
    </app-card>
    <FormChangeDevice v-model="store.isOpen" />
    <RekapPage v-model="rekap.rekapOpen" />
    <JadwalPage v-model="rekap.jadwalOpen" />
  </div>
</template>
<script setup>
import FormChangeDevice from './FormChangeDevice.vue'
import { useUserStore } from 'src/stores/simrs/pegawai/user/user'
import { useRekapAbesensiUserStore } from 'src/stores/simrs/pegawai/user/rekap/rekap'
import { date, Dialog } from 'quasar'
import RekapPage from './rekap/RekapPage.vue'
import JadwalPage from './rekap/JadwalPage.vue'
const store = useUserStore()
const rekap = useRekapAbesensiUserStore()

store.getInitialData()
const detailJadwal = (val) => {
  rekap.setJadwal()
  rekap.setUser(val)
  rekap.setParams('id', val.id)
  rekap.getJadwalByUser()
  console.log('detail jadwal', val)
}
const detailRekap = (val) => {
  const month = date.formatDate(Date.now(), 'MM')
  rekap.setParams('month', month)
  rekap.setRekap()
  rekap.setUser(val)
  rekap.setParams('id', val.id)
  rekap.getRekapAbsensiByUser()
}
const changeDevice = val => {
  Dialog.create({
    title: 'Konfirmasi',
    message: `Apakah <strong>: ${val.nama}</strong> meminta untuk ganti device?`,
    cancel: true,
    html: true
    // persistent: true
  })
    .onOk(() => {
      store.resetFORM()
      store.setForm('id', val.id)
      store.sanitazeForm()
      store.updateStatus()
      // store.setOpen()
    }).onCancel(() => {
      // store.setOpen()
    })
  console.log('change dev. req', val)
}

</script>
<style lang="scss" scoped>
.chip{
  width:100px;
  padding:5px;
}
</style>

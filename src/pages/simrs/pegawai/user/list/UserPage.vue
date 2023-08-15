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
          <template #col-detail>
            <div>Detail</div>
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
              <q-btn
                flat
                color="red"
                icon="icon-mat-delete"
                dense
                rounded
                @click="hapusJadwal(row)"
              >
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  Hapus Jadwal
                </q-tooltip>
              </q-btn>
            </div>
          </template>
          <template #cell-username="{row}">
            <div class="fit row no-wrap justify-between items-center">
              <div>{{ row.username }}</div>
              <div>
                <q-btn
                  flat
                  color="grey"
                  icon="icon-mat-visibility"
                  dense
                  rounded
                  size="xs"
                  @click="seeDetail(row)"
                >
                  <q-menu>
                    <q-chip
                      color="primary"
                      text-color="white"
                      class="chip-able"
                      dense
                      square
                      outline
                    >
                      <div class="f-12">
                        {{ row.pegawai?row.pegawai.account_pass:'-' }}
                      </div>
                    </q-chip>
                  </q-menu>
                  <q-tooltip
                    anchor="top middle"
                    self="center middle"
                  >
                    Lihat password
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
          </template>
          <template #cell-status="{row}">
            <div v-if="row.status===null || row.status===''">
              <q-chip
                color="green"
                text-color="white"
                class="chip"
                dense
                square
              >
                <div class="f-12 text-center">
                  bisa login
                </div>
              </q-chip>
            </div>
            <div v-if="row.status==='8'">
              <q-chip
                color="negative"
                text-color="white"
                class="chip"
                dense
                square
              >
                <div class="f-12 text-center">
                  Scan Barcode
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
    <!-- <app-calender-new v-model="store.calender" /> -->
  </div>
</template>
<script setup>
import FormChangeDevice from './FormChangeDevice.vue'
import { useUserStore } from 'src/stores/simrs/pegawai/user/user'
import { useRekapAbesensiUserStore } from 'src/stores/simrs/pegawai/user/rekap/rekap'
import { date, Dialog } from 'quasar'
import RekapPage from './rekap/RekapPage.vue'
import JadwalPage from './rekap/JadwalPage.vue'
import { ref } from 'vue'
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
  rekap.setParams('bulan', month)
  rekap.setRekap()
  rekap.setUser(val)
  rekap.setParams('id', val.id)
  rekap.getRekapAbsensiByUser()
}
// const bukaKalender = val => {
//   store.setCalender()
//   console.log(val)
// }
const hapusJadwal = val => {
  Dialog.create({
    title: 'Konfirmasi',
    message: `Apakah jadwal <strong>: ${val.nama}</strong> akan di hapus?`,
    cancel: true,
    html: true
    // persistent: true
  })
    .onOk(() => {
      store.deleteId = val.id
      store.deleteData()
      // store.setForm('id', val.id)
      // store.sanitazeForm()
      // store.updateStatus()
      // store.setOpen()
    }).onCancel(() => {
      // store.setOpen()
    })
  console.log('hapus jadwal', val)
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
      store.setForm('status', '2')
      store.sanitazeForm()
      store.updateStatus()
      // store.setOpen()
    }).onCancel(() => {
      // store.setOpen()
    })
  // console.log('change dev. req', val)
}

const detailPegawai = ref(false)
const seeDetail = (row) => {
  // console.log('row', row)
  detailPegawai.value = !detailPegawai.value
}
</script>
<style lang="scss" scoped>
.chip{
  width:100px;
  padding:5px;
}
</style>

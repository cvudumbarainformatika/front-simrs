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
            <div>Ganti Device</div>
          </template>
          <template #col-status>
            <div>Status</div>
          </template>
          <!-- cell -->
          <template #cell-ganti="{row}">
            <app-btn
              label="Ganti Device"
              dense
              @click="changeDevice(row)"
            />
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
              {{ row.status }}
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
  </div>
</template>
<script setup>
import FormChangeDevice from './FormChangeDevice.vue'
import { useUserStore } from 'src/stores/simrs/pegawai/user/user'
import { Dialog } from 'quasar'
const store = useUserStore()

store.getInitialData()

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

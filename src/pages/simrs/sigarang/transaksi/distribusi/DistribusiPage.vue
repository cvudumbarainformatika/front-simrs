<template>
  <div class="q-px-lg q-pt-md">
    <app-card
      title="Tabel Distribusi barang"
      desc="Halaman Distribusi barang"
    >
      <template #content>
        <app-table
          title="Data Distribusi"
          :columns="store.columns"
          :column-hide="store.columnHide"
          :items="store.items"
          :meta="store.meta"
          :per-page="store.params.per_page"
          :order-by="store.params.order_by"
          :sort="store.params.sort"
          :loading="store.loading"
          :to-search="store.params.q"
          row-no
          :ada-tambah="false"
          :ada-edit="false"
          :ada-delete="false"
          :click-able="true"
          @goto="store.setPage"
          @set-row="store.setPerPage"
          @refresh="store.refreshTable"
          @find="store.setSearch"
          @set-order="store.setOder"
          @new-data="store.newData"
          @edit-data="store.editData"
          @delete="store.deletesData"
          @on-click="onClick"
        >
          <template #col-tanggal>
            <div>Tanggal Permintaan</div>
          </template>
          <template #cell-tanggal="{row}">
            {{ dateFullFormat(row.tanggal) }}
          </template>
          <template #col-tanggal_distribusi>
            <div>Tanggal Dikeluarakan</div>
          </template>
          <template #cell-tanggal_distribusi="{row}">
            {{ dateFullFormat(row.tanggal_distribusi) }}
          </template>
          <template #col-tanggal_verif>
            <div>Tanggal Verifikasi</div>
          </template>
          <template #cell-tanggal_verif="{row}">
            {{ dateFull(row.tanggal_verif) }}
          </template>
          <template #col-pengguna>
            <div>User</div>
          </template>
          <template #cell-pengguna="{row}">
            {{ row.pengguna.jabatan }}
          </template>
          <template #col-pj>
            <div>Nama Penerima</div>
          </template>
          <template #cell-pj="{row}">
            {{ row.pj.jabatan }}
          </template>
          <template #col-no_permintaan>
            <div>Nomor Permintaan</div>
          </template>
          <template #col-no_distribusi>
            <div>Nomor Distribusi</div>
          </template>
          <template #col-aksi>
            <div>Aksi</div>
          </template>

          <template #cell-aksi="{row}">
            <q-btn
              v-if="row.status<7"
              icon="icon-mat-send"
              color="primary"
              flat
              no-caps
              dense
              round
              @click="distribusikan(row)"
            />
          </template>
          <template #cell-status="{row}">
            <!-- {{row.status}} -->
            <q-chip
              class="f-12"
              :color="color(row.status)"
              text-color="white"
              :label="label(row.status,row.nama)"
            />
          </template>
        </app-table>
        <div class="q-my-md">
          <div
            v-for="(item,i) in store.items"
            :key="i"
          >
            <q-card
              v-if="item.highlight"
            >
              <!-- style="width: 100%;" -->
              <q-card-section>
                <div class="fit row wrap justify-evenly items-center content-center">
                  <div class="col-3 text-center">
                    Kode Barang
                  </div>
                  <div class="col-3 text-center">
                    Nama Barang
                  </div>
                  <div class="col-3 text-center">
                    Kode 108
                  </div>
                  <div class="col-3 text-center">
                    Uraian 108
                  </div>
                </div>
                <q-separator />
                <div
                  v-for="(data, j) in item.details"
                  :key="j"
                >
                  <div class="fit row wrap justify-evenly items-center content-center">
                    <div class="col-3 text-center">
                      {{ data.barangrs.kode }}
                    </div>
                    <div class="col-3 text-center">
                      {{ data.barangrs.nama }}
                    </div>
                    <div class="col-3 text-center">
                      {{ data.barangrs.mapingbarang.barang108.kode }}
                    </div>
                    <div class="col-3 text-center">
                      {{ data.barangrs.mapingbarang.barang108.uraian }}
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </template>
    </app-card>
    <!-- <FormDialog v-model="store.isOpen" /> -->
  </div>
</template>
<script setup>
import { Dialog } from 'quasar'
import { dateFullFormat, dateFull } from 'src/modules/formatter'
import { useTransaksiDistribusiStore } from 'src/stores/simrs/logistik/sigarang/transaksi/distribusi/distribusi'
// import FormDialog from './FormDialog.vue'
const store = useTransaksiDistribusiStore()

store.getInitialData()
const onClick = val => {
  store.items.forEach(item => {
    delete item.highlight
  })
  store.items[val.index].highlight = true
  // console.log(val)
}
const distribusikan = val => {
  const toNum = val.no_permintaan.split('/')

  store.setForm('no_distribusi', 'RCVD/' + toNum[1] + '/' + toNum[2])
  store.setForm('id', val.id)
  Dialog.create({
    title: 'Konfirmasi',
    message: 'Distribusikan barang terlampir?'
  }).onOk(() => {
    store.saveForm()
  }).onCancel(() => {
    store.resetFORM()
    console.log('cancel', store.form)
  })
  console.log('distribusikan', val)
}
const color = val => {
  switch (val) {
    case 5:
      return 'orange'
      // eslint-disable-next-line no-unreachable
      break
    case 6:
      return 'green'
      // eslint-disable-next-line no-unreachable
      break
    case 7:
      return 'grey'
      // eslint-disable-next-line no-unreachable
      break

    default:
      return 'red'
      // eslint-disable-next-line no-unreachable
      break
  }
}

const label = (status, nama) => {
  switch (status) {
    case 5:
      return 'Menunggu verifikasi'
      // eslint-disable-next-line no-unreachable
      break
    case 6:
      return 'Telah di verifikasi'
      // eslint-disable-next-line no-unreachable
      break
    case 7:
      return 'Telah di distribusikan'
      // eslint-disable-next-line no-unreachable
      break

    default:
      return 'Belum di definisikan'
      // eslint-disable-next-line no-unreachable
      break
  }
}
</script>

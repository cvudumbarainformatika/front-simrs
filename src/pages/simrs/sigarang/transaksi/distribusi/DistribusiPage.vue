<template>
  <div class="q-px-sm q-pt-md">
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
              :disable="row.disableSend"
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
                <div class="fit row no-wrap justify-evenly items-center content-center">
                  <div class="anak text-center">
                    Kode Barang
                  </div>
                  <div class="anak text-center">
                    Nama Barang
                  </div>
                  <div class="anak text-center">
                    Kode 108
                  </div>
                  <div class="anak text-center">
                    Uraian 108
                  </div>
                  <div class="anak text-center">
                    Jumlah
                  </div>
                  <div class="anak text-center">
                    Jumlah Disetujui
                  </div>
                  <div class="anak text-center">
                    Jumlah Distribusi
                  </div>
                </div>
                <q-separator />
                <div
                  v-for="(data, j) in item.details"
                  :key="j"
                >
                  <div class="fit row no-wrap justify-evenly items-center content-center">
                    <div class="anak text-center">
                      {{ data.barangrs.kode }}
                    </div>
                    <div class="anak text-center">
                      {{ data.barangrs.nama }}
                    </div>
                    <div class="anak text-center">
                      {{ data.barangrs.mapingbarang.barang108.kode }}
                    </div>
                    <div class="anak text-center">
                      {{ data.barangrs.mapingbarang.barang108.uraian }}
                    </div>
                    <div class="anak text-center">
                      {{ data.jumlah }}
                    </div>
                    <div class="anak text-center">
                      {{ data.jumlah_disetujui }}
                    </div>
                    <div class="anak text-center">
                      <q-input
                        v-model="data.jumlah_distribusi"
                        label="jumlah distribusi"
                        type="number"
                        dense
                        @update:model-value="updateJumlahDistribusi"
                        @focus="fokus(i,j)"
                      />
                    </div>
                  </div>
                </div>
                <div
                  v-if="itemIndex!==null"
                >
                  <div
                    v-if="!store.items[itemIndex].disableSend"
                    class="q-mt-sm"
                  >
                    <q-separator />
                    <div class="fit row no-wrap justify-end items-center content-center">
                      <div class="q-mt-sm">
                        <q-btn
                          icon="icon-mat-send"
                          color="primary"
                          flat
                          no-caps
                          dense
                          round
                          @click="distribusikan(store.items[itemIndex])"
                        />
                      </div>
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
import { ref } from 'vue'
import { Dialog } from 'quasar'
import { dateFullFormat, dateFull } from 'src/modules/formatter'
import { notifErrVue } from 'src/modules/utils'
import { useTransaksiDistribusiStore } from 'src/stores/simrs/logistik/sigarang/transaksi/distribusi/distribusi'
// import FormDialog from './FormDialog.vue'
const store = useTransaksiDistribusiStore()

const itemIndex = ref(null)
store.getInitialData()
const onClick = val => {
  store.items.forEach(item => {
    delete item.highlight
  })
  store.items[val.index].highlight = true
  itemIndex.value = val.index
  console.log(val)
}
const distribusikan = val => {
  console.log('distribusikan', val)
  const toNum = val.no_permintaan.split('/')

  store.setForm('no_distribusi', 'RCVD/' + toNum[1] + '/' + toNum[2])
  store.setForm('id', val.id)
  const enolDetail = val.details.filter(data => {
    return data.jumlah_distribusi <= 0
  })
  if (enolDetail.length) {
    Dialog.create({
      title: 'Konfirmasi',
      message: 'Ada barang yang distribusinya bernilai 0, Tetap lanjutakan distribusi?',
      cancel: true
    }).onOk(() => {
      store.saveForm()
    })
  } else {
    Dialog.create({
      title: 'Konfirmasi',
      message: 'Distribusikan barang terlampir?',
      cancel: true
    }).onOk(() => {
      store.saveForm()
    })
  }
}
let itemsIndex = null
let detailIndex = null
const updateJumlahDistribusi = val => {
  const intVal = parseInt(val)
  store.items[itemsIndex].details[detailIndex].jumlah_distribusi = intVal
  const tempItems = store.items[itemsIndex].details.filter(item => {
    return item.jumlah_distribusi <= 0
  })
  console.log('jumlah distribusi', val)
  if (!tempItems.length) {
    store.items[itemsIndex].disableSend = false
    store.setForm('detail', store.items[itemsIndex].details)
  }
  if (store.items[itemsIndex].details[detailIndex].jumlah_disetujui < intVal) {
    notifErrVue('jumlah Distribusi tidak boleh melebihi jumlah distujui')
    store.items[itemsIndex].details[detailIndex].jumlah_distribusi = store.items[itemsIndex].details[detailIndex].jumlah_disetujui
    console.log('details item', store.items[itemsIndex].details[detailIndex])
  } else if (store.items[itemsIndex].details[detailIndex].jumlah_distribusi < 0) {
    notifErrVue('jumlah Distribusi tidak boleh kurang dari 0')
    store.items[itemsIndex].details[detailIndex].jumlah_distribusi = 0
  }
  console.log('items', tempItems)
}
const fokus = (i, j) => {
  console.log('fokus', i, j)
  // itemIndex.value = i
  itemsIndex = i
  detailIndex = j
  const current = store.items[i].details[j]
  console.log('current', current)
}
const color = val => {
  switch (val) {
    case 5:
      return 'light-blue'
      // eslint-disable-next-line no-unreachable
      break
    case 6:
      return 'green'
      // eslint-disable-next-line no-unreachable
      break
    case 7:
      return 'orange'
      // eslint-disable-next-line no-unreachable
      break
    case 8:
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
    case 8:
      return 'Telah di diterima ruangan'
      // eslint-disable-next-line no-unreachable
      break

    default:
      return 'Belum di definisikan'
      // eslint-disable-next-line no-unreachable
      break
  }
}
</script>

<style lang="scss" scoped>
.anak{
  width:calc(100vw/7);
}
.disp{
  width:calc(100vw/7);
}
</style>

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
            <div>Ruangan</div>
          </template>
          <template #cell-pengguna="{row}">
            {{ row.ruang?row.ruang.uraian:'-' }}
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
            <div
              v-if="row.status===6"
              class="fit row no-wrap justify-start items-center"
            >
              <div>
                {{ store.tanggalDisplay }}
              </div>
              <div class="q-ml-sm">
                <q-btn
                  icon="icon-mat-event"
                  round
                  flat
                  dense
                  color="primary"
                >
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                    @show="updateProxy"
                  >
                    <q-date
                      ref="refDate"
                      v-model="store.form.tanggal"
                      mask="YYYY-MM-DD HH:mm:ss"
                      @update:model-value="store.setTanggal"
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                  <q-tooltip
                    class="primary"
                    :offset="[10, 10]"
                  >
                    Ganti Tanggal
                  </q-tooltip>
                </q-btn>
                <q-btn
                  icon="icon-mat-send"
                  color="green"
                  flat
                  no-caps
                  dense
                  round
                  @click="distribusikan(row)"
                >
                  <q-tooltip
                    class="primary"
                    :offset="[10, 10]"
                  >
                    Distribusikan
                  </q-tooltip>
                </q-btn>
              </div>
            </div>

            <q-btn
              v-if="row.status===5"
              icon="icon-mat-move_to_inbox"
              color="blue"
              flat
              no-caps
              dense
              round
              @click="barangSiap(row)"
            >
              <q-tooltip
                class="primary"
                :offset="[10, 10]"
              >
                Barang Siap
              </q-tooltip>
            </q-btn>
            <!-- :disable="row.disableSend" -->
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
              <div class="print">
                <q-btn
                  ref="refPrint"
                  v-print="printObj"
                  unelevated
                  color="dark"
                  round
                  size="sm"
                  icon="icon-mat-print"
                >
                  <q-tooltip
                    class="primary"
                    :offset="[10, 10]"
                  >
                    Print
                  </q-tooltip>
                </q-btn>
              </div>
              <!-- style="width: 100%;" -->
              <q-card-section id="printMe">
                <div class="fit row no-wrap justify-evenly items-center content-center q-mt-lg">
                  <div class="anak text-left">
                    Kode Barang
                  </div>
                  <div class="anak text-left">
                    Nama Barang
                  </div>
                  <!-- <div class="anak text-left">
                    Kode 108
                  </div> -->
                  <div class="anak text-left">
                    Ruangan
                  </div>
                  <div class="anak text-right print-hide">
                    Stok Depo
                  </div>
                  <div class="anak text-right">
                    Alokasi
                  </div>
                  <div class="anak text-right">
                    Jumlah
                  </div>
                  <div class="anak text-right">
                    Jumlah Disetujui
                  </div>
                  <div class="anak text-right">
                    Jumlah Distribusi
                  </div>
                </div>
                <q-separator />
                <div
                  v-for="(data, j) in item.details"
                  :key="j"
                >
                  <div class="fit row no-wrap justify-evenly items-center content-center">
                    <div class="anak text-left">
                      {{ data.barangrs.kode }}
                    </div>
                    <div class="anak text-left">
                      {{ data.barangrs.nama }}
                    </div>
                    <!-- <div class="anak text-left">
                      {{ data.barangrs.mapingbarang.barang108.kode }}
                    </div> -->
                    <div class="anak text-left">
                      {{ data.ruang.uraian }}
                    </div>
                    <div class="anak text-right print-hide">
                      {{ data.barangrs.stokDepo }}
                    </div>
                    <div class="anak text-right">
                      {{ data.barangrs.alokasi }}
                    </div>
                    <div class="anak text-right">
                      {{ data.jumlah }}
                    </div>
                    <div class="anak text-right">
                      {{ data.jumlah_disetujui }}
                    </div>
                    <div class="anak text-right">
                      <!-- <div v-if="store.items[itemIndex].status < 7 && data.barangrs.alokasi>0">
                        <q-input
                          v-model="data.jumlah_distribusi"
                          label="jumlah distribusi"
                          type="number"
                          dense
                          @update:model-value="updateJumlahDistribusi"
                          @focus="fokus(i,j)"
                        />
                      </div> -->
                      <div v-if="store.items[itemIndex]?store.items[itemIndex].status >= 7:false">
                        {{ data.jumlah_distribusi }}
                      </div>
                      <div v-if="itemIndex?store.items[itemIndex].status < 7:false">
                        -
                      </div>
                      <!-- <div v-if="data.barangrs.alokasi<=0">
                        Tidak Ada Alokasi
                      </div> -->
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
import { date, Dialog } from 'quasar'
import { dateFullFormat, dateFull } from 'src/modules/formatter'
// import { notifErrVue } from 'src/modules/utils'
import { useTransaksiDistribusiStore } from 'src/stores/simrs/logistik/sigarang/transaksi/distribusi/distribusi'
// import FormDialog from './FormDialog.vue'
const store = useTransaksiDistribusiStore()

const proxyDate = ref(null)
const refDate = ref(null)
const updateProxy = () => {
  console.log('date', store.form.tanggal)
  // refDate.value.setToday()
  proxyDate.value = store.form.tanggal ? store.form.tanggal : date.formatDate(Date.now(), 'YYYY/MM/DD')
  store.setForm('tanggal', proxyDate.value)
  store.tanggalDisplay = dateFullFormat(proxyDate.value)
}

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
const barangSiap = val => {
  store.setForm('id', val.id)
  store.setForm('status', 6)
  Dialog.create({
    title: 'Konfirmasi',
    message: 'Apakah barang sudah siap?',
    cancel: true
  }).onOk(() => {
    store.updateStatus()
  })
}
const distribusikan = val => {
  console.log('distribusikan', val)
  const toNum = val.no_permintaan.split('/')

  store.setForm('no_distribusi', 'RCVD/' + toNum[1] + '/' + toNum[2])
  store.setForm('id', val.id)
  // const enolDetail = val.details.filter(data => {
  //   return data.jumlah_distribusi <= 0
  // })
  // if (enolDetail.length) {
  //   Dialog.create({
  //     title: 'Konfirmasi',
  //     message: 'Ada barang yang distribusinya bernilai 0, Tetap lanjutakan distribusi?',
  //     cancel: true
  //   }).onOk(() => {
  //     store.saveForm()
  //   })
  // } else {
  Dialog.create({
    title: 'Konfirmasi',
    message: 'Distribusikan barang terlampir?',
    cancel: true
  }).onOk(() => {
    store.saveForm()
  })
  // }
}

const printed = ref(false)
const printObj = {
  id: 'printMe',
  popTitle: 'print Dsitribusi',
  // extraCss: 'https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css',
  // extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
  beforeOpenCallback(vue) {
    printed.value = true
    console.log('wait...', vue)
  },
  openCallback (vue) {
    console.log('opened', vue)
  },
  closeCallback (vue) {
    printed.value = false
    // changePeriode()
    console.log('closePrint')
  }
}
// let itemsIndex = null
// let detailIndex = null
// const updateJumlahDistribusi = val => {
//   const intVal = parseInt(val)

//   if (store.items[itemsIndex].details[detailIndex].status > 15) return

//   store.items[itemsIndex].details[detailIndex].jumlah_distribusi = intVal
//   const tempItems = store.items[itemsIndex].details.filter(item => {
//     return item.jumlah_distribusi <= 0
//   })
//   console.log('jumlah distribusi', val)

//   if (!tempItems.length) {
//     const habis = store.items[itemsIndex].details.filter(det => { return det.barangrs.alokasi <= 0 })
//     if (!habis.length) {
//       store.items[itemsIndex].disableSend = false
//       store.setForm('detail', store.items[itemsIndex].details)
//     } else {
//       // console.log(habis)
//       habis.forEach(a => {
//         notifErrVue('tidak ada alokasi untuk ' + a.barangrs.nama)
//       })
//     }
//   }

//   if (store.items[itemsIndex].details[detailIndex].jumlah_disetujui < intVal) {
//     store.items[itemsIndex].details[detailIndex].jumlah_distribusi = store.items[itemsIndex].details[detailIndex].jumlah_disetujui
//     notifErrVue('jumlah Distribusi tidak boleh melebihi jumlah distujui')
//     console.log('details item', store.items[itemsIndex].details[detailIndex])
//   } else if (store.items[itemsIndex].details[detailIndex].jumlah_distribusi < 0) {
//     notifErrVue('jumlah Distribusi tidak boleh kurang dari 0')
//     store.items[itemsIndex].details[detailIndex].jumlah_distribusi = 0
//   }
//   console.log('items', tempItems)
// }
// const fokus = (i, j) => {
//   console.log('fokus', i, j)
//   // itemIndex.value = i
//   itemsIndex = i
//   detailIndex = j
//   const current = store.items[i].details[j]
//   console.log('current', current)
// }
const color = val => {
  switch (val) {
    case 4:
      return 'light-blue'
      // eslint-disable-next-line no-unreachable
      break
    case 5:
      return 'blue'
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
    case 4:
      return 'Menunggu verifikasi'
      // eslint-disable-next-line no-unreachable
      break
    case 5:
      return 'Telah di verifikasi'
      // eslint-disable-next-line no-unreachable
      break
    case 6:
      return 'Barang sudah bisa diambil'
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
    case 17:
      return 'Tidak Diambil Ruangan'
      // eslint-disable-next-line no-unreachable
      break
    case 18:
      return 'Invalid'
      // eslint-disable-next-line no-unreachable
      break
    case 19:
      return 'Kadaluarsa'
      // eslint-disable-next-line no-unreachable
      break
    case 20:
      return 'Ditolak'
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
  width:calc(100vw/8);
}
.disp{
  width:calc(100vw/9);
}
.print{
  position: absolute;
    right: 30px;
    top: 5px;
    z-index: 10;
}
</style>

<template>
  <q-dialog>
    <q-card
      style="width:80vw; max-width:95vw;"
    >
      <q-card-section>
        <div class="f-16 text-weight-bold q-mb-sm">
          Edit Pemesanan
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="row fit q-col-gutter-sm">
          <div class="col-6">
            <div class="row items-center q-mb-sm">
              <div class="col-4">
                <div v-if="!store.editKontrak">
                  Nomor Kontrak
                </div>
                <div v-if="store.editKontrak">
                  <app-btn
                    label="Batal Ganti nomor kontrak"
                    color="dark"
                    @click="store.editKontrak=false"
                  />
                </div>
              </div>
              <div class="col-8">
                <div
                  v-if="!store.editKontrak"
                  class="cursor-pointer"
                  @click="store.editKontrak=true"
                >
                  {{ store.form.kontrak }}
                </div>
                <div v-if="store.editKontrak">
                  <app-autocomplete-new
                    :model="store.form.kontrak"
                    outlined
                    label="Kontrak pilih"
                    autocomplete="namaperusahaan"
                    option-value="nokontrakx"
                    :option-label="['nokontrakx','namaperusahaan']"
                    :source="kontrakStore.items"
                    :loading="kontrakStore.loading"
                    @on-select="store.kontrakSelected"
                    @clear="clearKontrak"
                    @buang="modelSet"
                  />
                </div>
              </div>
            </div>
            <div class="row items-center">
              <div class="col-4">
                Nomor Pemesanan
              </div>
              <div class="col-8">
                <app-input
                  v-if="store.item.status<=2"
                  v-model="store.form.nomor"
                  label="Nomor Permintaan"
                  outlined
                />
                <div v-if="store.item.status>2">
                  {{ store.form.nomor }}
                </div>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col-4">
                Tanggal
              </div>
              <div class="col-8">
                <app-input-date
                  :model="store.form.tanggal"
                  label="Tanggal"
                  outlined
                  @set-model="setModel"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                Perusahaan
              </div>
              <div class="col-8">
                {{ store.item.perusahaan?store.item.perusahaan.nama:'-' }}
              </div>
            </div>
          </div>
        </div>
        <div class="row q-mb-md q-mt-sm">
          <div class="col-6" />
          <div class="col-6">
            <div class="row">
              <div class="col-6 text-left">
                Status
              </div>
              <div class="col-6 text-right cursor-pointer">
                <q-chip
                  class="f-12"
                  :color="color(store.item.status)"
                  text-color="white"
                  :label="label(store.item.status,store.item.nama)"
                />
                <q-menu
                  transition-show="jump-down"
                  transition-hide="jump-up"
                  anchor="center middle"
                  self="center middle"
                  :offset="[-50, 0]"
                >
                  <q-list>
                    <q-item
                      v-for="(item,i) in store.statuses"
                      :key="i"
                      v-close-popup
                      style="min-width:250px"
                      clickable
                      :style="'background-color:'+color(item.nilai)+'; color:white;'"
                      @click="store.gantiStatus(item)"
                    >
                      <q-item-section>
                        {{ item.nama }}
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-end">
          <app-btn
            label="simpan perubahan header transaksi"
            :loading="store.loading"
            @click="store.simpanHeader"
          />
        </div>
      </q-card-section>
      <q-card-section
        v-if="store.loadingHapus"
        style="height:300px;"
      >
        <app-loading />
      </q-card-section>
      <q-card-section v-if="!store.loadingHapus">
        <app-btn
          label="Tambah Barang"
          @click="tambahRow"
        />
        <div
          v-if="!store.item.details.length"
          style="height:300px"
        >
          <app-no-data />
        </div>
        <div v-if="store.item.details.length">
          <!-- header -->
          <div class="row text-weight-bold q-col-gutter-sm q-mb-sm q-mt-sm">
            <div class="col-1 border-tb border-left">
              Kode Barang
            </div>
            <div class="col-3 border-tb border-left">
              Nama barang
            </div>
            <div class="col-1 border-tb border-left">
              Harga
            </div>
            <div class="col-1 border-tb border-left">
              Jumlah
            </div>
            <div class="col-1 border-tb border-left">
              Diterima
            </div>
            <div class="col-1 border-tb border-left">
              Satuan
            </div>
            <div class="col-3 border-tb border-left">
              Keterangan
            </div>
            <div class="col-1 border-tb border-left border-right">
              Aksi
            </div>
          </div>
          <!-- data -->
          <div
            v-for="(detail,i) in store.item.details"
            :key="i"
          >
            <div class="row q-col-gutter-sm q-mb-sm">
              <div class="col-1 border-bottom border-left">
                <div class="row">
                  <div class="text-weight-bold col-3">
                    {{ i+1 }}.
                  </div>
                  <div class="col-9">
                    {{ detail.barangrs?detail.barangrs.kode:'-' }}
                  </div>
                </div>
              </div>
              <div class="col-3 border-bottom border-left">
                {{ detail.barangrs?detail.barangrs.nama:'-' }}
              </div>
              <div class="col-1 border-bottom border-left">
                <div class="text-right">
                  {{ formatRpDouble(detail.harga) }}
                </div>
              </div>
              <div class="col-1 border-bottom border-left">
                {{ detail.qty }}
              </div>
              <div class="col-1 border-bottom border-left">
                <q-btn
                  v-if="store.loadingDetailPenerimaan"
                  size="sm"
                  loading
                  dense
                  style="min-width:25px"
                  color="primary"
                  flat
                >
                  <template #loading>
                    <q-spinner-hourglass
                      class="on-left"
                      size="18px"
                    />
                  </template>
                </q-btn>
                <div
                  v-if="!store.loadingDetailPenerimaan"
                >
                  {{ detail.diterima }}
                </div>
              </div>
              <div class="col-1 border-bottom border-left">
                {{ detail.satuan?detail.satuan.nama:'-' }}
              </div>
              <div class="col-3 border-bottom border-left">
                {{ detail.merk }}
              </div>
              <div
                v-if="store.loadingDetailPenerimaan"
                class="col-1 border-bottom border-left border-right"
              >
                <q-btn
                  v-if="store.loadingDetailPenerimaan"
                  size="sm"
                  loading
                  dense
                  style="min-width:25px"
                  color="primary"
                  flat
                >
                  <template #loading>
                    <q-spinner-hourglass
                      class="on-left"
                      size="18px"
                    />
                  </template>
                </q-btn>
              </div>
              <div
                v-if="!store.loadingDetailPenerimaan"
                class="col-1 border-bottom border-left border-right"
              >
                <div v-if="detail.diterima===null || detail.diterima===0 || !detail.diterima">
                  <q-btn
                    color="primary"
                    round
                    icon="icon-mat-edit"
                    flat
                    size="sm"
                    @click="editRow(detail,i)"
                  >
                    <q-tooltip
                      anchor="top middle"
                      self="center middle"
                    >
                      Edit
                    </q-tooltip>
                  </q-btn>
                  <q-btn
                    color="negative"
                    round
                    icon="icon-mat-delete_sweep"
                    flat
                    size="sm"
                    @click="hapus(detail,i)"
                  >
                    <q-tooltip
                      anchor="top middle"
                      self="center middle"
                    >
                      Hapus
                    </q-tooltip>
                  </q-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { Dialog } from 'quasar'
import { formatRpDouble } from 'src/modules/formatter'
import { findWithAttr } from 'src/modules/utils'
import { useEditPemesananStore } from 'src/stores/simrs/logistik/sigarang/history/edit/pemesanan'
import { useKontrakPemensananStore } from 'src/stores/simrs/logistik/sigarang/transaksi/pemesanan/kontrak'
// import { onMounted } from 'vue'

const kontrakStore = useKontrakPemensananStore()
const store = useEditPemesananStore()
// kontrak
const clearKontrak = () => {
  store.setForm('kontrak', null)
}
const modelSet = val => {
  // store.params.q = val
  // store.getMapingBarang()
  setTimeout(() => {
    kontrakStore.setSearch(val)
  }, 700)
}
//
function setModel(val) {
  store.setForm('tanggal', val)
}
function tambahRow() {
  store.newDetail = true
  store.isEditDetail = false
  store.openForm()
  console.log('form', store.form)
}
function editRow(val, i) {
  console.log('edit', i, val)
  val.barangrs.satuan = val.satuan
  store.barangs.push(val.barangrs)
  store.barangSelected(val.kode_rs)
  store.setForm('jumlah', val.qty)
  store.setForm('harga', val.harga)
  store.newDetail = false
  store.isEditDetail = true
  store.openForm()
  console.log('form', store.form)
}
function hapus(val, i) {
  console.log('hapus', val)
  Dialog.create({
    title: 'Konfirmasi',
    message: 'Apakan anda akan menghapus <strong>' + val.nama_barang + '</strong> ?',
    html: true,
    ok: {
      push: true,
      label: 'Hapus',
      color: 'negative',
      'no-caps': true
    },
    cancel: {
      push: true,
      color: 'dark',
      'no-caps': true
    }
  })
    .onOk(() => {
      const kirim = {
        id: val.id,
        reff: store.form.reff
      }
      const index = findWithAttr(store.item.details, 'id', val.id)
      const det = store.item.details
      delete det[index]
      store.item.details = det.filter(a => a.kode_rs)
      const habisUdah = store.item.details.filter(y => y.diterima <= 0)
      if (!habisUdah.length) {
        kirim.status = 4
      } else {
        delete kirim.status
      }

      store.deleteDetail(kirim).then(resp => {
        store.tableHis.items[store.index] = resp.data
        store.item.status = resp.data.status
        console.log('items', store.item)
      })
    })
}

// -----------keterangan status-----------
const color = val => {
  switch (val) {
    case 1:
      return 'blue'
      // eslint-disable-next-line no-unreachable
      break
    case 2:
      // return 'grey'
      return 'red'
      // eslint-disable-next-line no-unreachable
      break
    case 3:
      return 'orange'
      // eslint-disable-next-line no-unreachable
      break
    case 4:
      return 'green'
      // eslint-disable-next-line no-unreachable
      break
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
    case 8:
      return 'blue-grey'
      // eslint-disable-next-line no-unreachable
      break
    case 9:
      return 'brown-6'
      // eslint-disable-next-line no-unreachable
      break

    default:
      return 'negative'
      // eslint-disable-next-line no-unreachable
      break
  }
}

const label = (status, nama) => {
  // console.log('nama', nama)
  if (nama === 'PEMESANAN') {
    switch (status) {
      case 1:
        return 'Draft'
        // eslint-disable-next-line no-unreachable
        break
      case 2:
        return 'Menunggu diterima Gudang'
        // eslint-disable-next-line no-unreachable
        break
      case 3:
        return 'Diterima Sebagian'
        // eslint-disable-next-line no-unreachable
        break
      case 4:
        return 'Diterima Seluruhnya'
        // eslint-disable-next-line no-unreachable
        break

      default:
        return 'Belum di definisikan'
        // eslint-disable-next-line no-unreachable
        break
    }
  } else if (nama === 'DISTRIBUSI DEPO') {
    switch (status) {
      case 1:
        return 'Menunggu diterima Depo'
        // eslint-disable-next-line no-unreachable
        break
      case 2:
        return 'Diterima Depo'
        // eslint-disable-next-line no-unreachable
        break

      default:
        return 'Belum di definisikan'
        // eslint-disable-next-line no-unreachable
        break
    }
  } else if (nama === 'PENERIMAAN RUANGAN') {
    switch (status) {
      case 1:
        return 'Menunggu diterima Ruangan'
        // eslint-disable-next-line no-unreachable
        break
      case 2:
        return 'Diterima Ruangan'
        // eslint-disable-next-line no-unreachable
        break

      default:
        return 'Belum di definisikan'
        // eslint-disable-next-line no-unreachable
        break
    }
  } else if (nama === 'BARANG RUSAK') {
    switch (status) {
      case 1:
        return 'Rusak'
        // eslint-disable-next-line no-unreachable
        break
      case 3:
        return 'Dinyatakn dipakai ruangan'
        // eslint-disable-next-line no-unreachable
        break

      default:
        return 'Belum di definisikan'
        // eslint-disable-next-line no-unreachable
        break
    }
  } else if (nama === 'PEMAKAIAN RUANGAN') {
    switch (status) {
      case 1:
        return 'Menunggu diterima Ruangan'
        // eslint-disable-next-line no-unreachable
        break
      case 2:
        return 'Sudah dipakai'
        // eslint-disable-next-line no-unreachable
        break
      case 9:
        return 'Rusak'
        // eslint-disable-next-line no-unreachable
        break

      default:
        return 'Belum di definisikan'
        // eslint-disable-next-line no-unreachable
        break
    }
  } else if (nama === 'PERMINTAAN RUANGAN') {
    switch (status) {
      case 1:
        return 'Draft'
        // eslint-disable-next-line no-unreachable
        break
      case 20:
        return 'Permintaan Ditolak'
        // eslint-disable-next-line no-unreachable
        break
      case 19:
        return 'Kadaluarsa'
        // eslint-disable-next-line no-unreachable
        break
      case 18:
        return 'Invalid'
        // eslint-disable-next-line no-unreachable
        break
      case 17:
        return 'Tidak Diambil Ruangan'
        // eslint-disable-next-line no-unreachable
        break
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
        return 'Telah diterima ruangan'
        // eslint-disable-next-line no-unreachable
        break

      default:
        return 'Belum di definisikan'
        // eslint-disable-next-line no-unreachable
        break
    }
  } else { // if (nama === 'PEMESANAN') {
    switch (status) {
      case 1:
        return 'Draft'
        // eslint-disable-next-line no-unreachable
        break
      case 2:
        return 'Selesai'
        // eslint-disable-next-line no-unreachable
        break
      case 3:
        return 'Diterima Sebagian'
        // eslint-disable-next-line no-unreachable
        break
      case 4:
        return 'Diterima Seluruhnya'
        // eslint-disable-next-line no-unreachable
        break
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
}
// onMounted(() => {
//   store.getInitData()
// })

// -----------keterangan status end-----------
</script>
<style scoped>
.border-tb{
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}
.border-top{
  border-top: 1px solid black;
}
.border-left{
  border-left: 1px solid black;
}
.border-right{
  border-right: 1px solid black;
}
.border-bottom{
  border-bottom: 1px solid black;
}
</style>

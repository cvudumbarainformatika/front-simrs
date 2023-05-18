<template>
  <q-dialog
    @hide="$emit('hide')"
  >
    <q-card style="min-width:75vw;">
      <q-card-section>
        <div class="f-14 text-weight-bold">
          Cari Pasien
        </div>
        <div class="title-desc">
          Dialog pencarian pasien
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <app-table
          title="Data Barang RS"
          :columns="dialog.columns"
          :column-hide="dialog.columnHide"
          :items="dialog.items"
          :meta="dialog.meta"
          :per-page="dialog.params.per_page"
          :loading="dialog.loading"
          :to-search="dialog.params.q"
          :wrap-cells="true"
          :ada-tambah="false"
          :default-btn="false"
          @goto="dialog.setPage"
          @set-row="dialog.setPerPage"
          @refresh="dialog.refreshTable"
          @find="dialog.setSearch"
        >
          <template #col-norm>
            <div>No. RM</div>
          </template>
          <template #cell-norm="{row}">
            <div>{{ row.norm?row.norm:'-' }}</div>
          </template>
          <template #cell-NIK="{row}">
            <div>{{ row.noktp?row.noktp:'-' }}</div>
          </template>
          <template #cell-Alamat="{row}">
            <div class="row">
              {{ row.alamat!==''?row.alamat+' ,':'-,' }}
            </div>
            <div class="row">
              <div class="col-2">
                {{ row.rt!==''?row.rt+' ,':'-,' }}
              </div>
              <div class="col-2">
                {{ row.rw!==''?row.rw+' ,':'-,' }}
              </div>
              <div class="col-2">
                {{ row.kelurahan!==''?row.kelurahan+' ,':'-,' }}
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                {{ row.kecamatan!==''?row.kecamatan+' ,':'-,' }}
              </div>
              <div class="col-6">
                {{ row.kabupaten!==''?row.kabupaten+' ,':'-,' }}
              </div>
            </div>
          </template>
          <template #cell-Nama="{row}">
            <div class="row">
              <div class="col-2">
                {{ row.sapan }}
              </div>
              <div class="col-10 ellipsis">
                {{ row.nama }}
              </div>
            </div>
          </template>
          <template #left-acttion="{row}">
            <div class="row no-wrap q-col-gutter-sm items-center">
              <q-btn
                dense
                flat
                round
                icon="icon-mat-launch"
                color="primary"
                @click="pilihPasienIni(row)"
              >
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  Pilih Pasien ini
                </q-tooltip>
                <template #loading>
                  <q-spinner-hourglass
                    class="on-left"
                    size="18px"
                  />
                  <span class="f-12"> Loading </span>
                </template>
              </q-btn>
            </div>
          </template>
        </app-table>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>

import { useDialogCariPasienPendaftaranUmum } from 'src/stores/simrs/pendaftaran/form/pasien/dialogCariPasien'
import { usePendaftaranPasienStore } from 'src/stores/simrs/pendaftaran/form/pasien/pasien'

const dialog = useDialogCariPasienPendaftaranUmum()
const store = usePendaftaranPasienStore()
defineEmits(['hide'])

function pilihPasienIni(val) {
  store.form = val
  const tglLahir = val.tgllahir.split('-')
  store.setForm('barulama', 'lama')
  if (tglLahir.length) {
    store.tanggal.tahun = tglLahir[0]
    store.tanggal.bulan = tglLahir[1]
    store.tanggal.hari = tglLahir[2]
    store.setTanggalLahir()
  }
  store.cariPasienDialog = false
  console.log('pasien terpilih', val)
}
</script>

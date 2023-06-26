<template>
  <q-dialog
    @hide="emits('hide')"
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
            <div>{{ row.noktp?row.noktp:row.nik?row.nik:'-' }}</div>
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
                {{ row.kabupatenkota!==''?row.kabupatenkota+' ,':'-,' }}
              </div>
            </div>
          </template>
          <template #cell-Nama="{row}">
            <div class="row">
              <div class="col-2">
                {{ row.sapan?row.sapan:'' }}
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

import { useRegistrasiPasienBPJSStore } from 'src/stores/simrs/pendaftaran/form/bpjs/registrasibpjs'
import { useDialogCariPasienPendaftaranUmum } from 'src/stores/simrs/pendaftaran/form/pasien/dialogCariPasien'
import { usePendaftaranPasienStore } from 'src/stores/simrs/pendaftaran/form/pasien/pasien'

const dialog = useDialogCariPasienPendaftaranUmum()
const store = usePendaftaranPasienStore()
const regis = useRegistrasiPasienBPJSStore()
const emits = defineEmits(['hide', 'gantiPasien'])
const props = defineProps({
  bpjs: { type: Boolean, default: false }
})

function pilihPasienIni(val) {
  val.noka = val.nokabpjs
  store.form = val
  if (store.alamataDomisiliSama) {
    if ((!store.form.alamatdomisili ? true : store.form.alamatdomisili === '') && store.form.alamat) store.setForm('alamatdomisili', store.form.alamat)
    if ((!store.form.rtdomisili ? true : store.form.rtdomisili === '') && store.form.rt) store.setForm('rtdomisili', store.form.rt)
    if ((!store.form.rwdomisili ? true : store.form.rwdomisili === '') && store.form.rw) store.setForm('rwdomisili', store.form.rw)
    if ((!store.form.kodeposdomisili ? true : store.form.kodeposdomisili === '') && store.form.kodepos) store.setForm('kodeposdomisili', store.form.kodepos)
    if ((!store.form.negaradomisili ? true : store.form.negaradomisili === '') && store.form.negara) store.setForm('negaradomisili', store.form.negara)
    if ((!store.form.propinsidomisili ? true : store.form.propinsidomisili === '') && store.form.propinsi) store.setForm('propinsidomisili', store.form.propinsi)
    if ((!store.form.kodepropinsidomisili ? true : store.form.kodepropinsidomisili === '') && store.form.kodepropinsi) store.setForm('kodepropinsidomisili', store.form.kodepropinsi)
    if ((!store.form.kabupatenkotadomisili ? true : store.form.kabupatenkotadomisili === '') && store.form.kabupatenkota) store.setForm('kabupatenkotadomisili', store.form.kabupatenkota)
    if ((!store.form.kodekabupatenkotadomisili ? true : store.form.kodekabupatenkotadomisili === '') && store.form.kodekabupatenkota) store.setForm('kodekabupatenkotadomisili', store.form.kodekabupatenkota)
    if ((!store.form.kecamatandomisili ? true : store.form.kecamatandomisili === '') && store.form.kecamatan) store.setForm('kecamatandomisili', store.form.kecamatan)
    if ((!store.form.kodekecamatandomisili ? true : store.form.kodekecamatandomisili === '') && store.form.kodekecamatan) store.setForm('kodekecamatandomisili', store.form.kodekecamatan)
    if ((!store.form.kelurahandomisili ? true : store.form.kelurahandomisili === '') && store.form.kelurahan) store.setForm('kelurahandomisili', store.form.kelurahan)
    if ((!store.form.kodekelurahandomisili ? true : store.form.kodekelurahandomisili === '') && store.form.kodekelurahan) store.setForm('kodekelurahandomisili', store.form.kodekelurahan)
  }
  if (props.bpjs) {
    if (val.nik !== '') {
      const form = { nik: val.nik, tglsep: regis.form.tglsep }
      store.cekPesertaByNik(form).then(resp => {
        if (Object.keys(resp.provUmum).length) {
          const rujukan = {
            kode: resp.provUmum.kdProvider,
            nama: resp.provUmum.nmProvider
          }
          regis.ppkRujukans.push(rujukan)
          regis.display.kode = rujukan.kode
          regis.setForm('ppkRujukan', rujukan.kode)
        }
      })
    } else if (val.noka !== '') {
      console.log('noka', val.noka === undefined)
      const form = { noka: val.noka, tglsep: regis.form.tglsep }
      store.cekPesertaByNoka(form).then(resp => {
        if (Object.keys(resp.provUmum).length) {
          const rujukan = {
            kode: resp.provUmum.kdProvider,
            nama: resp.provUmum.nmProvider
          }
          regis.ppkRujukans.push(rujukan)
          regis.display.kode = rujukan.kode
          regis.setForm('ppkRujukan', rujukan.kode)
        }
      })
    }
  }
  const tglLahir = val.tgllahir.split('-')
  store.setForm('barulama', 'lama')
  if (tglLahir.length) {
    store.tanggal.tahun = tglLahir[0]
    store.tanggal.bulan = tglLahir[1]
    store.tanggal.hari = tglLahir[2]
    store.setTanggalLahir()
  }
  store.cariPasienDialog = false
  emits('gantiPasien')
  console.log('pasien terpilih', val)
}
</script>

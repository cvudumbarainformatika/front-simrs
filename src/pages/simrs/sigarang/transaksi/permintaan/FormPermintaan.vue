<template>
  <div class="q-pt-sm q-pb-lg-xl">
    <app-card
      title="Form Permintaan"
      desc="Form Permintaan Ruangan"
    >
      <template #content>
        <div class="row q-col-gutter-md q-mb-sm">
          <div class="col-6">
            <div class="row q-col-gutter-md q-mb-sm items-center">
              <div class="col-md-3 col-xs-12">
                Tanggal Permintaan
              </div>
              <div class="col-md-9 col-xs-12">
                <app-input
                  v-model="store.tanggal"
                  readonly
                  label="Tanggal Permintaan"
                  outlined
                  dense
                />
              </div>
            </div>

            <div class="row q-col-gutter-md q-mb-sm items-center">
              <div class="col-md-3 col-xs-12">
                Ruangan Pengguna
              </div>
              <div class="col-md-9 col-xs-12">
                <app-autocomplete-new
                  :model="store.form.kode_ruang"
                  outlined
                  label="Ruangan Pengguna*"
                  autocomplete="uraian"
                  option-value="kode_ruang"
                  :loading="store.loading"
                  option-label="uraian"
                  :source="store.penggunaruangs"
                  @on-select="pilihPengguna"
                  @clear="clearPengguna"
                />
              </div>
            </div>

            <div class="row q-col-gutter-md q-mb-sm items-center">
              <div class="col-md-3 col-xs-12">
                Nama Barang
              </div>
              <div class="col-md-9 col-xs-12">
                <app-autocomplete-new
                  :model="store.form.kode_rs"
                  outlined
                  valid
                  label="Nama Barang RS"
                  autocomplete="nama"
                  option-value="kode"
                  option-label="nama"
                  :source="mapingbarang.barangrses"
                  :loading="table.loadingDepo"
                  :disable="table.loadingDepo"
                  @on-select="barangSelected"
                  @clear="clearBarangRs"
                  @set-model="modelSet"
                />
              </div>
            </div>
            <div class="row q-col-gutter-md q-mb-sm items-center">
              <div class="col-md-3 col-xs-12">
                Jumlah Minta
              </div>
              <div
                v-if="store.barang ? store.barang.alokasi<=0 ? false : true : false"
                class="col-md-9 col-xs-12"
              >
                <app-input
                  v-model="store.form.jumlah"
                  outlined
                  valid
                  type="number"
                  label="Jumlah Minta"
                />
              </div>
            </div>
            <div class="row q-col-gutter-md q-mb-sm items-center">
              <div class="col-md-3 col-xs-12">
                Alasan PNM
              </div>
              <div class="col-md-9 col-xs-12">
                <q-input
                  v-model="store.form.alasan"
                  dense
                  type="textarea"
                  borderless
                  outlined
                  autogrow
                />
              </div>
            </div>
            <div class="row q-col-gutter-md q-mb-sm items-center">
              <div class="col-md-9 col-xs-12" />
              <div class="col-md-3 col-xs-12">
                <app-btn
                  label="Simpan "
                  color="secondary"
                  :disable="store.barang?store.barang.alokasi>0?false:true:true"
                  :loading="table.loading"
                  @click="table.saveForm"
                />
                <div
                  v-if="store.barang?store.barang.alokasi<=0:false"
                  class="f-10"
                >
                  *Stok Depo tidak mencukupi
                </div>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="row q-col-gutter-md q-mb-sm items-center">
              <div class="col-md-3 col-xs-12">
                Nomor Permintaan :
              </div>
              <div class="col-md-9 col-xs-12">
                {{ store.form.no_permintaan }}
              </div>
            </div>
            <div class="row q-col-gutter-md q-mb-sm items-center">
              <div class="col-md-3 col-xs-12">
                Pengguna Ruang
              </div>
              <div class="col-md-9 col-xs-12 text-weight-bolder">
                {{ store.nama.pengguna }}
              </div>
            </div>
            <div class="row q-col-gutter-md q-mb-sm items-center">
              <div class="col-md-3 col-xs-12">
                Penanggung jawab
              </div>
              <div class="col-md-9 col-xs-12">
                {{ store.nama.penanggungjawab }}
              </div>
            </div>
            <div class="row q-col-gutter-md q-mb-sm items-center">
              <div class="col-md-3 col-xs-12">
                Kode Barang
              </div>
              <div class="col-md-9 col-xs-12">
                {{ store.form.kode_rs }}
              </div>
            </div>
            <div class="row q-col-gutter-md q-mb-sm items-center">
              <div class="col-md-3 col-xs-12">
                satuan
              </div>
              <div class="col-md-9 col-xs-12">
                {{ store.nama.satuan }}
              </div>
            </div>
            <div class="row q-col-gutter-md q-mb-sm items-center">
              <div class="col-md-3 col-xs-12">
                Depo
              </div>
              <div class="col-md-9 col-xs-12 text-weight-bolder">
                {{ store.nama.gudang }}
              </div>
            </div>
            <div class="row q-col-gutter-md q-mb-sm items-center text-weight-bolder">
              <div class="col-md-3 col-xs-12">
                Stok User
              </div>
              <div
                v-if="store.loading"
                class="col-md-9 col-xs-12"
              >
                <q-btn
                  flat
                  dense
                  :loading="store.loading"
                />
              </div>
              <div
                v-if="!store.loading"
                class="col-md-9 col-xs-12"
              >
                {{ store.stok.sisa_stok?store.stok.sisa_stok:0 }}
              </div>
            </div>
            <div class="row q-col-gutter-md q-mb-sm items-center text-weight-bolder">
              <div class="col-md-3 col-xs-12">
                Stok Alokasi
              </div>
              <div
                v-if="store.loading"
                class="col-md-9 col-xs-12"
              >
                <q-btn
                  flat
                  dense
                  :loading="store.loading"
                />
              </div>
              <div
                v-if="!store.loading"
                class="col-md-9 col-xs-12"
              >
                {{ Object.keys(store.barang).length?store.barang.alokasi:0 }}
              </div>
            </div>
            <div class="row q-col-gutter-md q-mb-sm items-center text-weight-bolder">
              <div class="col-md-3 col-xs-12">
                Maks Stok user
              </div>
              <div
                v-if="store.loading"
                class="col-md-9 col-xs-12"
              >
                <q-btn
                  flat
                  dense
                  :loading="store.loading"
                />
              </div>
              <div
                v-if="!store.loading"
                class="col-md-9 col-xs-12"
              >
                {{ store.minMaxPenggunas.max_stok?store.minMaxPenggunas.max_stok:0 }}
              </div>
            </div>
            <div class="row q-col-gutter-md q-mb-sm items-center">
              <div class="col-md-9 col-xs-12" />
              <div class="col-md-3 col-xs-12">
                <app-btn
                  label="Selesai"
                  :loading="table.Finishloading"
                  @click="table.selesaiInput"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </app-card>
  </div>
</template>
<script setup>
import { notifErrVue } from 'src/modules/utils'
import { useMasterMapingBarangForm } from 'src/stores/simrs/logistik/sigarang/master/mapingbarang/form'
import { useTransaksiPermintaanForm } from 'src/stores/simrs/logistik/sigarang/transaksi/permintaan/form'
import { useTransaksiPermintaanTable } from 'src/stores/simrs/logistik/sigarang/transaksi/permintaan/permintaan'

const table = useTransaksiPermintaanTable()
const store = useTransaksiPermintaanForm()
const mapingbarang = useMasterMapingBarangForm()

const clearPengguna = () => {
  store.setForm('kode_ruang', null)
  store.setForm('kode_pengguna', null)
  store.setForm('kode_penanggungjawab', null)
  store.setNama('penanggungjawab', 'ruangan pengguna belum dipilih')
  store.setNama('ruang', 'ruangan pengguna belum dipilih')
  store.setNama('pengguna', 'ruangan pengguna belum dipilih')
}
const pilihPengguna = (val) => {
  store.setForm('kode_ruang', val)
  const ruang = store.penggunaruangs.filter(data => { return data.kode_ruang === val })
  // console.log('ruang', ruang)
  const peng = ruang[0].pengguna
  // const peng = store.penggunas.filter(data => { return data.kode === val })
  // const pj = store.penanggungjawabs.filter(data => { return data.level_3 === peng[0].level_3 && data.level_2 === peng[0].level_2 && data.level_1 === peng[0].level_1 })
  const pj = ruang[0].penanggungjawab ? ruang[0].penanggungjawab : ruang[0].pengguna
  // console.log('pj', pj)

  store.setForm('kode_penanggungjawab', pj.kode)
  store.setNama('penanggungjawab', pj.jabatan)
  store.setForm('kode_pengguna', peng.kode)
  store.setNama('pengguna', peng.jabatan)
  if (ruang.length) {
    store.setForm('tujuan', ruang[0].kode_ruang)
    store.setParams('kode_rauangan', ruang[0].kode_ruang)
    store.setNama('ruang', ruang[0].ruang.uraian)
  } else {
    store.setForm('tujuan', null)
    store.setNama('ruang', 'ruang tidak ditemukan')
  }

  // console.log('val', val)
  // console.log('peng', peng)
  // console.log('pj', pj)
  // console.log('ruang', ruang)
}

const barangSelected = val => {
  // :source="mapingbarang.barangrses"

  if (!table.mapingDepos.length) return notifErrVue('data barang depo belum tersedia, mohon besabar menunggu sebentar. ')
  store.setForm('kode_rs', val)
  store.setParams('kode_rs', val)
  // console.log('maping depo', table.mapingDepos)
  store.getStokByBarang()
  store.getMinMaxPengguna()

  const apem = mapingbarang.barangrses.filter(data => { return data.kode === val })
  console.log('apem', apem)

  if (apem.length) store.setForm('kode_satuan', apem[0].kode_satuan)

  const satuan = apem.length ? mapingbarang.satuans.filter(data => { return data.kode === apem[0].kode_satuan }) : null
  if (satuan !== null) {
    store.setNama('satuan', satuan[0].nama)
  }

  const depo = table.mapingDepos.filter(data => { return data.kode_rs === val })
  console.log('depo', depo)
  if (depo.length) {
    const nama = depo[0].gudang.nama
    let noPer = ''
    // const nama = depo.map(data => {
    let temp = nama.split(' ')

    if (temp.length > 2) {
      let a = ''
      for (let i = 0; i < temp.length; i++) {
        temp[i] = temp[i].charAt(0)
        // noPer = noPer + temp[i]
        console.log('temp', a = a + temp[i])
      }
      noPer = temp.join('')
    } else {
      temp = temp[1]
      noPer = temp
    }
    console.log('noper', noPer)
    //   return data
    // })
    console.log('nama', nama)
    const ap = store.nomor.split('-')
    store.setForm('no_permintaan', ap[0] + '/' + noPer + '/' + ap[1])

    store.setForm('dari', depo[0].kode_gudang)
    store.setNama('gudang', depo[0].gudang.nama)
  } else {
    store.setForm('dari', null)
    store.setNama('gudang', 'gudang tidak ditemukan')
  }

  // console.log('epem', apem)
  // console.log('epem', mapingbarang.satuans[0])

  // cari stok user
  console.log(table.stoks)
  // const stok = table.stoks.filter(data => {
  //   return data.kode_rs === val && data.kode_ruang === store.form.dari
  // })
  // if (stok.length) store.stok = stok[0]
  // cari alokasi
  // const minMax = table.minMaxPenggunas.filter(data => {
  //   return data.kode_pengguna === store.form.kode_pengguna && data.kode_rs === val
  // })

  // console.log('stok', stok)
  // console.log('minMax', minMax)
  console.log('val', val)
  // console.log('table.minMaxPenggunas', table.minMaxPenggunas)
}
const clearBarangRs = () => {
  store.setForm('no_permintaan', null)
  store.setForm('kode_rs', null)
  store.setNama('satuan', 'barang belum dipilih')
  store.setNama('gudang', 'barang belum dipilih')
}
const modelSet = val => {
  console.log(val)
}
</script>

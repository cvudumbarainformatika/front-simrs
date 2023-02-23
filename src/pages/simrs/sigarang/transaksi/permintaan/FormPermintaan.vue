<template>
  <div class="q-pt-sm q-pb-lg-xl">
    <q-card class="q-mb-sm">
      <q-card-section>
        <!-- {{ stokOpname }} {{ tutupPermintaan }} -->
        <div class="row q-col-gutter-sm items-center">
          <div class="text-weight-bold">
            {{ tanggal.dayOfWeekStr }},
          </div>
          <div>{{ tanggal.day }} </div>
          <div>{{ tanggal.monthStr }} </div>
          <div>{{ tanggal.year }} </div>
          <div :class="parseInt(tanggal.hour)>=13?'text-weight-bold text-negative':''">
            {{ tanggal.hour }} :
          </div>
          <div :class="parseInt(tanggal.hour)>=13?'text-weight-bold text-negative':''">
            {{ tanggal.minute }} :
          </div>
          <div :class="parseInt(tanggal.hour)>=13?'text-weight-bold text-negative':''">
            {{ tanggal.second }}
          </div>
        </div>
        <marquee>
          <div
            v-if="!stokOpname"
            class="q-mb-sm"
          >
            Pelayanan Permintaan barang <span class="text-weight-bold"> Depo Habis Pakai </span>dibuka jam 07:00 dan ditutup jam 13:00. Permintaan diluar jam pelayanan tidak akan dilayani
          </div>
          <div
            v-if="stokOpname"
            class="q-mb-sm"
          >
            Sehubungan dengan Stok Opname <span class="text-weight-bold"> Depo Habis Pakai</span>, Pemintaan sementara ditutup
          </div>
        </marquee>
      </q-card-section>
    </q-card>
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
                <!-- v-model="store.tanggal" -->
                <app-input-date
                  :model="store.tanggal"
                  label="Tanggal Permintaan"
                  outlined
                  dense
                  @set-model="setTanggal"
                />
                <!-- <app-input
                  v-model="store.tanggal"
                  readonly
                  label="Tanggal Permintaan"
                  outlined
                  dense
                /> -->
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
              <div
                v-if="store.form.kode_ruang"
                class="col-md-9 col-xs-12"
              >
                <div
                  v-if="table.loadingHasStok"
                  class="row q-col-gutter-md"
                >
                  <div class="col-6">
                    <q-skeleton type="rect" />
                  </div>
                  <div class="col-6">
                    mengambil data barang yang memiliki stok..
                  </div>
                </div>
                <div v-if="!table.loadingHasStok">
                  <app-autocomplete-new
                    :model="store.form.kode_rs"
                    outlined
                    valid
                    label="Nama Barang RS"
                    autocomplete="nama"
                    option-value="kode"
                    option-label="nama"
                    :source="table.barangHasStok"
                    :loading="table.loadingHasStok"
                    :disable="table.loadingHasStok"
                    @on-select="barangSelected"
                    @clear="clearBarangRs"
                    @set-model="modelSet"
                    @buang="cariBarang"
                  />
                </div>
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
                <!-- valid -->
                <app-input
                  ref="inputJumlahMinta"
                  v-model="store.form.jumlah"
                  outlined
                  type="number"
                  label="Jumlah Minta"
                  :rules="[
                    val=> val <= store.barang.alokasi || 'tidak boleh melebihi alokasi',
                    val=> val < (store.minMaxPenggunas.flag_minta === null ? (store.minMaxPenggunas.max_stok - store.barang.stokRuangan):(store.minMaxPenggunas.minta - store.barang.stokRuangan)) ||'Sudah Melebihi Maksimal stok ruangan'
                  ]"
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
              <div
                class="col-md-3 col-xs-12 text-weight-bolder"
                :class="tutupPermintaan && store.nama.gudang!=='barang belum dipilih'?'text-negative':''"
              >
                {{ store.nama.gudang }}
              </div>
              <div
                v-if="tutupPermintaan && store.nama.gudang!=='barang belum dipilih'"
                class="col-md-3 col-xs-12 text-weight-bolder text-negative"
              >
                (Tutup)
              </div>
            </div>
            <!-- <div class="row q-col-gutter-md q-mb-sm items-center text-weight-bolder">
              <div class="col-md-3 col-xs-12">
                Stok Depo
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
                {{ store.barang.stok?store.barang.stok:0 }}
              </div>
            </div> -->
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
                Stok Ruangan
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
                {{ store.barang.stokRuangan?store.barang.stokRuangan:0 }}
              </div>
            </div>
            <div class="row q-col-gutter-md q-mb-sm items-center text-weight-bolder">
              <div class="col-md-3 col-xs-12">
                Maks Stok Ruangan
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
                class="col-md-1 col-xs-12"
              >
                {{ store.minMaxPenggunas.max_stok?store.minMaxPenggunas.max_stok:0 }}
              </div>
              <div
                v-if="!store.loading"
                class="col-md-8 col-xs-12"
              >
                <div v-if="maksRuangan.formRuangan.flag_minta===null && !Object.keys(store.minMaxPenggunas).length && store.form.kode_rs">
                  <app-btn
                    label="Minta maks ruangan"
                    color="orange"
                    @click="ruanganMinta"
                  />
                </div>
                <div
                  v-if="maksRuangan.formRuangan.flag_minta==='1' && !Object.keys(store.minMaxPenggunas).length"
                  class="row"
                >
                  <app-input
                    v-model="maksRuangan.formRuangan.minta"
                    label="Jumlah minta"
                    type="number"
                    :loading="maksRuangan.loading"
                    @keyup.enter="maksRuangan.simpanPermintaanMaksRuangan"
                  />
                  <app-btn
                    class="q-ml-sm"
                    label="Simpan"
                    icon="icon-mat-save"
                    :loading="maksRuangan.loading"
                    @click="maksRuangan.simpanPermintaanMaksRuangan"
                  />
                </div>
                <div
                  v-if="maksRuangan.formRuangan.flag_minta==='1' && Object.keys(store.minMaxPenggunas).length"
                  class="row"
                >
                  <q-badge>
                    Menunggu persetujuan depo sejumlah {{ store.minMaxPenggunas.minta }}
                  </q-badge>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row q-col-gutter-md q-mb-sm">
          <div
            v-if="!stokOpname && tutupPermintaan"
            class="col-md-12 col-xs-12"
          >
            <marquee>
              <p
                class="q-mb-sm"
              >
                Pelayanan Permintaan barang <span class="text-weight-bold"> Depo Habis Pakai</span>
                tutup. depo lain tetap melayani permintaan
              </p>
              <p>
                Silahkan pilih nama barang. Tombol akan tampil jika barang yang anda pilih bukan barang
                <span class="text-weight-bold"> Depo Habis Pakai</span>
              </p>
            </marquee>
          </div>
          <div
            v-if="stokOpname"
            class="col-md-12 col-xs-12"
          >
            <marquee>
              <p
                class="q-mb-sm"
              >
                Sehubungan dengan Stok Opname <span class="text-weight-bold"> Depo Habis Pakai</span>,
                Pemintaan <span class="text-weight-bold"> Depo Habis Pakai</span> sementara ditutup
              </p>
              <p>
                Silahkan pilih nama barang. Tombol akan tampil jika barang yang anda pilih bukan barang
                <span class="text-weight-bold"> Depo Habis Pakai</span>
              </p>
            </marquee>
          </div>
        </div>
        <div class="row q-col-gutter-md q-mb-sm">
          <div class="col-6">
            <div class="row q-col-gutter-md q-mb-sm items-center">
              <div class="col-md-9 col-xs-12" />
              <div
                v-if=" !stokOpname && !tutupPermintaan "
                class="col-md-3 col-xs-12"
              >
                <app-btn
                  label="Simpan List Barang"
                  color="secondary"
                  :disable="store.barang ? store.barang.alokasi > 0 && store.form.jumlah <= store.barang.alokasi && store.form.jumlah && store.form.jumlah > 0?false:true:true"
                  :loading="table.loading"
                  @click="simpanList"
                />
                <div
                  v-if="store.barang?store.barang.alokasi<=0:false"
                  class="f-10"
                >
                  *Stok Depo tidak mencukupi
                </div>
                <div
                  v-if="!store.form.jumlah"
                  class="f-10"
                >
                  *Tidak ada jumlah
                </div>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="row q-col-gutter-md q-mb-sm items-center">
              <div class="col-md-9 col-xs-12" />

              <div
                v-if="!stokOpname && !tutupPermintaan"
                class="col-md-3 col-xs-12"
              >
                <app-btn
                  label="Kirim ke Depo"
                  icon-right="icon-mat-send"
                  :disable="!table.mapGudang.length || table.loading"
                  :loading="table.Finishloading "
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
// import { notifErrVue } from 'src/modules/utils'
// import { useMasterMapingBarangForm } from 'src/stores/simrs/logistik/sigarang/master/mapingbarang/form'
import { date } from 'quasar'
import { useMinMaxPenggunaStockStore } from 'src/stores/simrs/logistik/sigarang/master/minmaxstok/pengguna/pengguna'
import { useTransaksiPermintaanForm } from 'src/stores/simrs/logistik/sigarang/transaksi/permintaan/form'
import { useTransaksiPermintaanTable } from 'src/stores/simrs/logistik/sigarang/transaksi/permintaan/permintaan'
import { ref } from 'vue'

const table = useTransaksiPermintaanTable()
const store = useTransaksiPermintaanForm()
const maksRuangan = useMinMaxPenggunaStockStore()
// const mapingbarang = useMasterMapingBarangForm()

// timer
const tanggal = ref({
  day: date.formatDate(Date.now(), 'D'),
  dayOfWeek: date.formatDate(Date.now(), 'd'),
  dayOfWeekStr: '',
  month: date.formatDate(Date.now(), 'M'),
  monthStr: date.formatDate(Date.now(), 'MMMM'),
  year: date.formatDate(Date.now(), 'YYYY'),
  hour: date.formatDate(Date.now(), 'HH'),
  minute: date.formatDate(Date.now(), 'mm'),
  second: date.formatDate(Date.now(), 'ss')
})
const stokOpname = ref(false)
const tutupPermintaan = ref(false)
// const depoTutup = ref(false)
const bhp = 'Gd-02010103'
const time = () => {
  // const sekarang = Date.now()
  const anu = Date.now()
  const sekarang = new Date(anu)
  tanggal.value.day = date.formatDate(sekarang, 'D')
  tanggal.value.dayOfWeek = date.formatDate(sekarang, 'd')
  tanggal.value.month = date.formatDate(sekarang, 'M')
  tanggal.value.monthStr = date.formatDate(sekarang, 'MMMM')
  tanggal.value.year = date.formatDate(sekarang, 'YYYY')
  tanggal.value.hour = date.formatDate(sekarang, 'HH')
  tanggal.value.minute = date.formatDate(sekarang, 'mm')
  tanggal.value.second = date.formatDate(sekarang, 'ss')
  stokOpname.value = tanggal.value.month === '2' ? !!(parseInt(tanggal.value.day) > 25) : !!(parseInt(tanggal.value.day) > 28)
  // tutupPermintaan.value = parseInt(tanggal.value.hour) >= 13 || parseInt(tanggal.value.hour) <= 7
  const barang = table.barangHasStok.filter(barang => { return barang.kode === store.form.kode_rs })
  if (barang.length) {
    if (barang[0].depo.kode === bhp && (parseInt(tanggal.value.hour) >= 13 || parseInt(tanggal.value.hour) <= 7)) {
      tutupPermintaan.value = true
    } else {
      tutupPermintaan.value = false
    }
  }
  switch (date.formatDate(sekarang, 'd')) {
    case '0':
      tanggal.value.dayOfWeekStr = 'Minggu'
      break
    case '1':
      tanggal.value.dayOfWeekStr = 'Senin'
      break
    case '2':
      tanggal.value.dayOfWeekStr = 'Selasa'
      break
    case '3':
      tanggal.value.dayOfWeekStr = 'Rabu'
      break
    case '4':
      tanggal.value.dayOfWeekStr = 'Kamis'
      break
    case '5':
      tanggal.value.dayOfWeekStr = 'Jum\'at'
      break
    case '6':
      tanggal.value.dayOfWeekStr = 'Sabtu'
      break

    default:
      tanggal.value.dayOfWeekStr = ''
      break
  }
}
setInterval(() => { time() }, 1000)

// end of timer
const ruanganMinta = () => {
  console.log('form', store.form)
  console.log('min-max', store.minMaxPenggunas)
  maksRuangan.formRuangan.flag_minta = '1'
  maksRuangan.formRuangan.kode_rs = store.form.kode_rs
  maksRuangan.formRuangan.kode_ruang = store.form.tujuan
}
const inputJumlahMinta = ref(null)
const simpanList = () => {
  console.log('ref input', inputJumlahMinta.value.$refs)
  table.saveForm().then(() => {
    inputJumlahMinta.value.$refs.refInput.resetValidation()
  })
}
const setTanggal = val => {
  store.tanggal = date.formatDate(val, 'DD MMMM YYYY')
  store.setForm('tanggal', date.formatDate(val, 'YYYY-MM-DD HH:mm:ss'))
  console.log(store.form)
}
const clearPengguna = () => {
  store.setForm('kode_ruang', null)
  store.setForm('kode_pengguna', null)
  store.setForm('kode_penanggungjawab', null)
  store.setNama('penanggungjawab', 'ruangan pengguna belum dipilih')
  store.setNama('ruang', 'ruangan pengguna belum dipilih')
  store.setNama('pengguna', 'ruangan pengguna belum dipilih')
  inputJumlahMinta.value.$refs.refInput.resetValidation()
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
    store.setParams('kode_ruangan', ruang[0].kode_ruang)
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
  /** usable code */
  const barang = table.barangHasStok.filter(barang => { return barang.kode === val })
  if (barang[0].depo.kode === bhp) {
    tutupPermintaan.value = true
  } else {
    tutupPermintaan.value = false
  }
  store.setForm('kode_satuan', barang[0].satuan.kode)
  store.setNama('satuan', barang[0].satuan.nama)
  console.log('barang', barang)
  store.setForm('kode_rs', val)
  store.setParams('kode_rs', val)

  const nama = barang[0].depo.nama
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
  const ap = store.nomor.split('-')
  store.setForm('no_permintaan', ap[0] + '/' + noPer + '/' + ap[1])

  store.setForm('dari', barang[0].depo.kode)
  store.setNama('gudang', barang[0].depo.nama)
  if (val !== null) {
    store.getStokByBarang()
  }
  store.getMinMaxPengguna()

  /** end of usable code */

  // const depo = table.mapingDepos.filter(data => { return data.kode_rs === val })
  // console.log('depo', depo)
  // if (depo.length) {
  //   const nama = depo[0].gudang.nama
  //   let noPer = ''
  //   // const nama = depo.map(data => {
  //   let temp = nama.split(' ')

  //   if (temp.length > 2) {
  //     let a = ''
  //     for (let i = 0; i < temp.length; i++) {
  //       temp[i] = temp[i].charAt(0)
  //       // noPer = noPer + temp[i]
  //       console.log('temp', a = a + temp[i])
  //     }
  //     noPer = temp.join('')
  //   } else {
  //     temp = temp[1]
  //     noPer = temp
  //   }
  //   // console.log('noper', noPer)
  //   //   return data
  //   // })
  //   // console.log('nama', nama)
  //   const ap = store.nomor.split('-')
  //   store.setForm('no_permintaan', ap[0] + '/' + noPer + '/' + ap[1])

  //   store.setForm('dari', depo[0].kode_gudang)
  //   store.setNama('gudang', depo[0].gudang.nama)
  // } else {
  //   store.setForm('dari', null)
  //   store.setNama('gudang', 'gudang tidak ditemukan')
  // }

  // console.log(table.stoks)
}
const clearBarangRs = () => {
  store.setForm('no_permintaan', null)
  store.setForm('kode_rs', null)
  store.setNama('satuan', 'barang belum dipilih')
  store.setNama('gudang', 'barang belum dipilih')
  inputJumlahMinta.value.$refs.refInput.resetValidation()
  tutupPermintaan.value = false
}
const modelSet = val => {
  console.log('model set', val)
}
const cariBarang = val => {
  console.log('cari', val)
  // carinya di table
}
</script>

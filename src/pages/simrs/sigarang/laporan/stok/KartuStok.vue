<template>
  <q-card>
    <q-card-section>
      <div class="f-14 text-weight-bold">
        Kartu Stok
      </div>
      <div class="title-desc">
        Infromasi Pergerakan Barang
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div
        class="row justify-start q-col-gutter-sm q-mt-sm q-mb-sm"
      >
        <div class="col-4">
          <app-autocomplete-debounce-input
            v-model="store.params.kd_barang"
            label="Cari Barang"
            autocomplete="nama"
            option-label="nama"
            option-value="kode"
            :hint="store.item!==null?'depo : ' + store.item.depo.nama:''"
            :source="store.barangs"
            :loading="store.loadingBarang"
            @buang="cariBarang"
            @on-select="barangSelected"
          />
        </div>
        <div class="col-2">
          <app-autocomplete-debounce-input
            v-model="store.params.bln"
            label="Pilih bulan"
            autocomplete="nama"
            option-label="nama"
            option-value="value"
            :source="months"
          />
        </div>
        <div class="col-2">
          <app-autocomplete
            v-model="store.params.thn"
            label="Pilih tahun"
            :filled="false"
            :source="years"
          />
        </div>
        <div class="col-2">
          <app-autocomplete-debounce-input
            v-model="store.params.kd_tempat"
            label="Cari tempat"
            autocomplete="nama"
            option-label="nama"
            option-value="kode"
            :source="store.tempats"
            :loading="store.loadingRuangan"
            @buang="cariTempat"
          />
        </div>
        <div class="col-1">
          <app-btn
            label="cari"
            @click="cariDataStok"
          />
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <div v-if="store.itemsGudang.length || store.itemsDepo.length || store.itemsRuangan.length">
        <div class="row items-center justify-end">
          <q-btn
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
      </div>
      <div
        id="printMe"
      >
        <!-- style="width:210mm; height:310mm; margin:10mm; " -->
        <div v-if="store.itemsGudang.length">
          <div class="row q-col-gutter-sm items-center">
            <!-- {{ store.item }} -->
            <div class="col-6">
              <div class="row items-center q-mb-sm">
                <div class="col-4">
                  Kode Barang
                </div>
                <div class="col-8 text-weight-bold">
                  {{ store.item.kode }}
                </div>
              </div>
              <div class="row items-center q-mb-sm">
                <div class="col-4">
                  Nama Barang
                </div>
                <div class="col-8 text-weight-bold">
                  {{ store.item.nama }}
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="row items-center q-mb-sm">
                <div class="col-4">
                  Satuan
                </div>
                <div class="col-8 text-weight-bold">
                  {{ store.item.satuan?store.item.satuan.nama:'-' }}
                </div>
              </div>
              <div class="row items-center q-mb-sm">
                <div class="col-4">
                  Maping Depo
                </div>
                <div class="col-8 text-weight-bold">
                  {{ store.item.depo?store.item.depo.nama:'-' }}
                </div>
              </div>
            </div>
          </div>
          <div class="q-mb-md row q-col-gutter-sm items-center text-weight-bold bg-grey-4">
            <div class="col-2">
              Tanggal
            </div>
            <div class="col-3">
              <div class="row justify-center">
                Nomor
              </div>
              <div class="row q-col-gutter-md">
                <div class="col-6">
                  Pemesanan
                </div>
                <div class="col-6">
                  Penerimaan
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="row justify-center">
                Mutasi
              </div>
              <div class="row q-col-gutter-sm">
                <div class="col-4 text-center">
                  Masuk
                </div>
                <div class="col-4 text-center">
                  Keluar
                </div>
                <div class="col-4 text-center">
                  Sisa
                </div>
              </div>
            </div>
            <!-- <div class="col-1">
            Satuan
          </div> -->
            <div class="col-1">
              Harga
            </div>
            <div class="col-2">
              Keterangan
            </div>
          </div>
          <div
            v-for="(gud,i) in store.itemsGudang"
            :key="i"
          >
            <div
              class="row q-col-gutter-sm items-center zero"
              :class="gud.trx==='stokAkhir'?'bg-red-10 text-white':i%2===0?'':'bg-grey-4'"
            >
              <!-- {{ gud }} -->
              <div class="col-2">
                {{ dateFullFormat(gud.tanggal) }}
              </div>
              <div class="col-3">
                <div class="row q-col-gutter-md items-center">
                  <div class="col-6 ww">
                    {{ gud.nomor?gud.nomor:'-' }}
                  </div>
                  <div class="col-6 ww">
                    {{ gud.no_penerimaan?gud.no_penerimaan:'-' }}
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="row q-col-gutter-sm justify-center items-center">
                  <div class="col-4 text-center">
                    {{ gud.saldo>0?gud.saldo:'' }}
                  </div>
                  <div class="col-4 text-center">
                    {{ gud.saldo<0?-(gud.saldo):'' }}
                  </div>
                  <div class="col-4 text-center">
                    {{ gud.sisaStok?gud.sisaStok:gud.sisa_stok }}
                  </div>
                </div>
              </div>
              <!-- <div class="col-1">
              {{ gud.satuan_besar?gud.satuan_besar:gud.satuan?gud.satuan.nama:'-' }}
            </div> -->
              <div class="col-1">
                {{ gud.harga?formatDouble( gud.harga):'-' }}
              </div>
              <div class="col-2 ww">
                {{ gud.pemesanan?gud.pemesanan.perusahaan?gud.pemesanan.perusahaan.nama:'-':gud.depo?gud.depo.nama:gud.trx==='stokAwal'?'Stok Awal':gud.trx==='stokAkhir'?'Stok Akhir':'' }}
              </div>
            </div>

            <q-separator />
          </div>
        </div>
        <div v-else-if="store.itemsDepo.length">
          <div class="row q-col-gutter-sm items-center">
            <!-- {{ store.item }} -->
            <div class="col-6">
              <div class="row items-center q-mb-sm">
                <div class="col-4">
                  Kode Barang
                </div>
                <div class="col-8 text-weight-bold">
                  {{ store.item.kode }}
                </div>
              </div>
              <div class="row items-center q-mb-sm">
                <div class="col-4">
                  Nama Barang
                </div>
                <div class="col-8 text-weight-bold">
                  {{ store.item.nama }}
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="row items-center q-mb-sm">
                <div class="col-4">
                  Satuan
                </div>
                <div class="col-8 text-weight-bold">
                  {{ store.item.satuan?store.item.satuan.nama:'-' }}
                </div>
              </div>
              <div class="row items-center q-mb-sm">
                <div class="col-4">
                  Maping Depo
                </div>
                <div class="col-8 text-weight-bold">
                  {{ store.item.depo?store.item.depo.nama:'-' }}
                </div>
              </div>
            </div>
          </div>
          <div class="q-mb-md row q-col-gutter-sm items-center text-weight-bold bg-grey-4">
            <div class="col-2">
              Tanggal
            </div>
            <div class="col-3">
              <div class="row justify-center">
                Nomor
              </div>
              <div class="row q-col-gutter-md">
                <div class="col-6">
                  Penerimaan
                </div>
                <div class="col-6">
                  Distribusi
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="row justify-center">
                Mutasi
              </div>
              <div class="row q-col-gutter-sm">
                <div class="col-4 text-center">
                  Masuk
                </div>
                <div class="col-4 text-center">
                  Keluar
                </div>
                <div class="col-4 text-center">
                  Sisa
                </div>
              </div>
            </div>
            <!-- <div class="col-1">
            Satuan
          </div> -->
            <div class="col-1">
              Harga
            </div>
            <div class="col-2">
              Keterangan
            </div>
          </div>
          <div
            v-for="(dep,i) in store.itemsDepo"
            :key="i"
          >
            <div
              class="row q-col-gutter-sm items-center zero"
              :class="dep.trx==='stokAkhir'?'bg-red-10 text-white':i%2===0?'':'bg-grey-4'"
            >
              <!-- {{ dep }} -->
              <div class="col-2">
                {{ dateFullFormat(dep.tanggal) }}
              </div>
              <div class="col-3">
                <div class="row q-col-gutter-md items-center">
                  <div class="col-6 ww">
                    {{ dep.no_penerimaan?dep.no_penerimaan:'-' }}
                  </div>
                  <div class="col-6 ww">
                    {{ dep.no_distribusi?dep.no_distribusi:'-' }}
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="row q-col-gutter-sm justify-center items-center">
                  <div class="col-4 text-center">
                    {{ dep.saldo>0?dep.saldo:'' }}
                  </div>
                  <div class="col-4 text-center">
                    {{ dep.saldo<0?-(dep.saldo):'' }}
                  </div>
                  <div class="col-4 text-center">
                    {{ dep.sisaStok?dep.sisaStok:0 }}
                  </div>
                </div>
              </div>
              <!-- <div class="col-1">
              {{ dep.satuan_besar?dep.satuan_besar:dep.satuan?dep.satuan.nama:'-' }}
            </div> -->
              <div class="col-1">
                {{ dep.harga?formatDouble(dep.harga):'-' }}
              </div>
              <div class="col-2 ww">
                {{ dep.ruangan?dep.ruangan.uraian:dep.depo?dep.depo.nama:dep.trx==='stokAwal'?'Stok Awal':dep.trx==='stokAkhir'?'Stok Opname bulan ini':'' }}
              </div>
            </div>
            <q-separator />
          </div>
        </div>
        <div v-else-if="store.itemsRuangan.length">
          <div class="row q-col-gutter-sm items-center">
            <!-- {{ store.item }} -->
            <div class="col-6">
              <div class="row items-center q-mb-sm">
                <div class="col-4">
                  Kode Barang
                </div>
                <div class="col-8 text-weight-bold">
                  {{ store.item.kode }}
                </div>
              </div>
              <div class="row items-center q-mb-sm">
                <div class="col-4">
                  Nama Barang
                </div>
                <div class="col-8 text-weight-bold">
                  {{ store.item.nama }}
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="row items-center q-mb-sm">
                <div class="col-4">
                  Satuan
                </div>
                <div class="col-8 text-weight-bold">
                  {{ store.item.satuan?store.item.satuan.nama:'-' }}
                </div>
              </div>
              <div class="row items-center q-mb-sm">
                <div class="col-4">
                  Maping Depo
                </div>
                <div class="col-8 text-weight-bold">
                  {{ store.item.depo?store.item.depo.nama:'-' }}
                </div>
              </div>
            </div>
          </div>
          <div class="q-mb-md row q-col-gutter-sm items-center text-weight-bold bg-grey-4">
            <div class="col-3">
              Tanggal
            </div>
            <div class="col-3">
              <div class="row justify-center">
                Nomor
              </div>
              <div class="row q-col-gutter-md">
                <div class="col-6">
                  Penerimaan
                </div>
                <div class="col-6">
                  Distribusi
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="row justify-center">
                Mutasi
              </div>
              <div class="row q-col-gutter-sm">
                <div class="col-4 text-center">
                  Masuk
                </div>
                <div class="col-4 text-center">
                  Keluar
                </div>
                <div class="col-4 text-center">
                  Sisa
                </div>
              </div>
            </div>
            <!-- <div class="col-1">
            Satuan
          </div> -->
            <!-- <div class="col-1">
            Harga
          </div> -->
            <div class="col-2">
              Keterangan
            </div>
          </div>
          <div
            v-for="(rua,i) in store.itemsRuangan"
            :key="i"
          >
            <div
              class="row q-col-gutter-sm items-center zero"
              :class="rua.trx==='stokAkhir'?'bg-red-10 text-white':i%2===0?'':'bg-grey-4'"
            >
              <!-- {{ rua }} -->
              <div class="col-3">
                {{ dateFullFormat(rua.tanggal) }}
              </div>
              <div class="col-3">
                <div class="row q-col-gutter-md items-center">
                  <div class="col-6 ww">
                    {{ rua.no_penerimaan?rua.no_penerimaan:'-' }}
                  </div>
                  <div class="col-6 ww">
                    {{ rua.no_distribusi?rua.no_distribusi:'-' }}
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="row q-col-gutter-sm justify-center items-center">
                  <div class="col-4 text-center">
                    {{ rua.saldo>0?rua.saldo:'' }}
                  </div>
                  <div class="col-4 text-center">
                    {{ rua.saldo<0?-(rua.saldo):'' }}
                  </div>
                  <div class="col-4 text-center">
                    {{ rua.sisaStok?rua.sisaStok:0 }}
                  </div>
                </div>
              </div>
              <!-- <div class="col-1">
              {{ rua.satuan_besar?rua.satuan_besar:rua.satuan?rua.satuan:'-' }}
            </div> -->
              <!-- <div class="col-1">
              {{ rua.harga?formatDouble(rua.harga):'-' }}
            </div> -->
              <div class="col-2">
                {{ rua.ruanganmaster?rua.ruanganmaster.uraian:rua.masterdepo?rua.masterdepo.nama:rua.trx==='stokAwal'?'Stok Awal':rua.trx==='stokAkhir'?'Stok Opname bulan ini':'' }}
              </div>
            </div>

            <q-separator />
          </div>
        </div>
        <app-loading v-else-if="store.loading" />
        <app-no-data v-else />
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup>
// import { dateFullFormat } from 'src/modules/formatter'
import { dateFullFormat, formatDouble } from 'src/modules/formatter'
import { findWithAttr, notifErrVue } from 'src/modules/utils'
import { useKartuStokStore } from 'src/stores/simrs/logistik/sigarang/laporan/stok/kartuStok'
import { ref } from 'vue'

const store = useKartuStokStore()
const props = defineProps({
  role: { type: String, default: '' },
  pegawai: { type: Object, default: () => {} }
})

const months = ref([
  { nama: 'Januari', value: '1' },
  { nama: 'Februari', value: '2' },
  { nama: 'Maret', value: '3' },
  { nama: 'April', value: '4' },
  { nama: 'Mei', value: '5' },
  { nama: 'Juni', value: '6' },
  { nama: 'Juli', value: '7' },
  { nama: 'Agustus', value: '8' },
  { nama: 'September', value: '9' },
  { nama: 'Oktober', value: '10' },
  { nama: 'November', value: '11' },
  { nama: 'Desember', value: '12' }

])
const curY = parseInt(store.params.thn)
const years = ref([])
for (let index = 0; index < 11; index++) {
  years.value[index] = String(curY - 5 + index)
}

// barang dipilih
function barangSelected(val) {
  console.log('barang dipilih ', val)
  const index = findWithAttr(store.barangs, 'kode', val)
  if (index >= 0) {
    store.item = store.barangs[index]
    store.setParams('kd_tempat', store.item.kode_depo)
    console.log('barang ', store.item)
  } else {
    store.item = null
  }
}

// cari barang
function cariBarang(val) {
  store.paramBarang.q = val
  // console.log('cari barang ', store.paramBarang)
  store.getDataBarang()
}
// cari tempat
function cariTempat(val) {
  // store.paramBarang.q = val
  // console.log('cari tempat ', val)
  store.getDataRuangan(val)
}
// cari data di kartu stok
function cariDataStok() {
  if (store.params.kd_tempat) {
    if (store.params.kd_tempat.includes('Gd-')) {
      if (store.params.kd_tempat === 'Gd-02010100' && (props.role === 'gudang' || props.role === 'gizi' || props.role === 'root')) {
        // console.log('params Ke gudang', store.params)
        store.getKartuStokGudang()
      } else {
        // console.log('params Ke Depo', store.params)
        store.getKartuStokDepo()
      }
    } else {
      // console.log('params ruangan', store.params)
      // console.log('role ', props.role)
      store.getKartuStokRuangan()
    }
  } else {
    // console.log('ga onok ruangane cak ')
    notifErrVue('Tempat belum dipilih')
  }
  console.log('params ', store.params)
}

// print
const openPrint = ref(false)
// let title = ''
const printed = ref(false)
const item = ref({})
// function toPrint (val) {
//   // console.log('print', val)
//   item.value = val
//   // title = 'Print ' + val.nama
//   openPrint.value = true
// }
const printObj = {
  id: 'printMe',
  // popTitle: title,
  // extraCss: 'https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css',
  // extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
  beforeOpenCallback (vue) {
    printed.value = true
    console.log('wait...', vue)
  },
  openCallback (vue) {
    console.log('opened', vue)
  },
  closeCallback (vue) {
    openPrint.value = false
    printed.value = false
    // changePeriode()
    item.value = {}
    console.log('closePrint')
  }
}
store.getInitialData()
// store.getDataByBarang()
</script>
<style lang="scss" scoped>
.ww{
    overflow-wrap: break-word;
}
.zero{
    margin: 0px;
}
.grey{
    background-color: #cfcbcbc3;
}

</style>

<template>
  <div class="column bg-white full-height full-width">
    <div class="row q-pa-sm f-14 bg-primary text-white text-weight-bold">
      Halaman Perbaikan Data
    </div>
    <div class="row q-px-sm items-center">
      <div class="col-4 q-mr-sm q-my-sm ">
        <div class="row q-mb-xs">
          <div class="col-12">
            <app-input
              v-model="store.params.q" label="Cari Obat ..." valid outlined @keyup.enter.stop="(val)=>{
                // console.log('val', val?.target?.value);
                store.setParams('q', val?.target?.value)
                if(store.params?.kdruang) store.getLists()
              }"
            />
          </div>
        </div>
        <div class="row q-mb-xs">
          <div class="col-12">
            <app-autocomplete-new
              v-model="store.params.kdruang"
              label="Pilih Gudang / Depo"
              autocomplete="nama"
              option-label="nama"
              option-value="kode"
              outlined
              :source="store.gudangs"
              @on-select="(val)=>{
                store.setParams('kdruang', val)
                store.getLists()
              }"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <app-input v-model="store.params.tahun" label="Tahun" outlined />
          </div>
          <div class="col-6">
            <app-input v-model="store.params.bulan" label="Bulan" outlined />
          </div>
        </div>
      </div>
      <div class="col-4 q-mr-sm q-my-sm">
        <div class="row">
          <div class="col-12">
            <q-option-group v-model="store.params.pilihan" :options="pilihanBermasalahs" type="radio" inline @update:model-value="setPilihan" />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-4">
            <app-input v-model="store.params.per_page" label="Data Per Halaman" outlined />
          </div>
          <div class="col-8">
            <div class="row items-center justify-center">
              Halaman
            </div>
            <div class="row items-center justify-center">
              <div class="col-2 text-right">
                <q-btn

                  :disable="(store.loading || store.loadingFix) "
                  dense flat icon="icon-mat-chevron_left"
                  @click="()=>{
                    if(store.params.page>1) {
                      store.params.page--
                      if(store.params?.kdruang) store.getLists()
                    }

                  }"
                />
              </div>
              <div class="col-2 text-center">
                <!-- {{ store.params.page }} -->
                <app-input v-model="store.params.page" label="" outlined />
              </div>
              <div class="col-2">
                <q-btn
                  :disable="(store.loading || store.loadingFix) "
                  dense flat icon="icon-mat-chevron_right"
                  @click="()=>{
                    if(store.params.page<(store.meta.total / store.params.per_page + 1)) {
                      store.params.page++
                      if(store.params?.kdruang) store.getLists()
                    }
                  }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-1 q-mr-sm q-my-sm">
        <q-btn label="Ambil Data" dense no-caps color="primary" @click="store.getLists()" :loading="store.loading" :disable="(store.loading || store.loadingFix) || !store.params?.kdruang">
          <q-tooltip v-if="!store.params?.kdruang" content-class="bg-white text-primary">
            Gudang / Depo Belum Dipilih
          </q-tooltip>
        </q-btn>
      </div>
      <!-- <div class="col-2 q-mr-sm q-my-sm">
        <q-btn label="Ambil Data dan Perbaiki" dense no-caps color="negative" @click="store.getListsFix()" :loading="store.loadingFix" :disable="(store.loadingFix || store.loading) || !store.params?.kdruang">
          <q-tooltip v-if="!store.params?.kdruang" content-class="bg-white text-primary">
            Gudang / Depo Belum Dipilih
          </q-tooltip>
        </q-btn>
      </div> -->
    </div>
    <div v-if="store.loadingFix || store.loading" class="q-pa-sm bg-white" style="height: 300px">
      <app-loading />
    </div>
    <div v-if="!(store.loadingFix || store.loading) && !store.items?.length" class="q-pa-sm bg-white" style="height: 300px">
      <app-no-data />
    </div>
    <div v-if="store.items?.length && !(store.loadingFix || store.loading)" class="q-pa-sm">
      <div class="row bg-dark text-white text-weight-bold items-center">
        <div class="col-auto" style="width: 2%;">
          No
        </div>
        <div class="col-1">
          Kode
        </div>
        <div class="col-2">
          Nama
        </div>
        <div class="col-1 text-right">
          Masuk
        </div>
        <div class="col-1 text-right">
          Keluar
        </div>
        <div class="col-1 text-right">
          Akhir
        </div>
        <div class="col-1 text-right">
          Stok Opname
        </div>
        <div class="col-1 text-center" />
        <div class="col-1 text-center">
          Status Opname
        </div>
        <div class="col-1 text-center">
          Status Trans
        </div>
      </div>
      <div v-for="(item, i) in store.items" :key="item">
        <div class="row items-center cursor-pointer" :class="i%2==0?'bg-grey-4':'bg-white'" @click="openDetail(item)">
          <div class="col-auto" style="width: 2%;">
            {{ i+1 +((store.meta.page-1)*store.params.per_page) }}
          </div>
          <div class="col-1">
            {{ item?.kd_obat }}
          </div>
          <div class="col-2">
            {{ item?.nama_obat }}
          </div>
          <div class="col-1 text-right">
            {{ formatDouble(parseFloat(item?.data?.data?.masuk),2) }}
          </div>
          <div class="col-1 text-right">
            {{ formatDouble(parseFloat(item?.data?.data?.keluar),2) }}
          </div>
          <div class="col-1 text-right" :class="parseFloat(item?.data?.data?.sisa).toFixed(2)!==parseFloat(item?.data?.data?.tts).toFixed(2)?'bg-negative':''">
            {{ formatDouble(parseFloat(item?.data?.data?.sisa),2) }}
          </div>
          <div class="col-1 text-right" :class="parseFloat(item?.data?.data?.sisa).toFixed(2)!==parseFloat(item?.data?.data?.tts).toFixed(2)?'bg-negative':''">
            {{ formatDouble(parseFloat(item?.data?.data?.tts),2) }}
          </div>
          <div class="col-1 text-right" :class="parseFloat(item?.data?.data?.sisa).toFixed(2)!==parseFloat(item?.data?.data?.tts).toFixed(2)?'bg-negative':''" />
          <div class="col-1 text-center" :class="parseFloat(item?.data?.data?.sisa).toFixed(2)!==parseFloat(item?.data?.data?.tts).toFixed(2)?'bg-negative':''">
            <q-chip size="sm" :color="item?.opnameJml && item?.opnameTrx?'green':'negative'" text-color="white">
              {{ item?.opnameJml && item?.opnameTrx?'Sesuai':'Tidak Sesuai' }}
            </q-chip>
          </div>
          <div class="col-1 text-center" :class="parseFloat(item?.data?.data?.sisa).toFixed(2)!==parseFloat(item?.data?.data?.tts).toFixed(2)?'bg-negative':''">
            <q-chip size="sm" :color="item?.trxSesuai && item?.trxLebih && item?.trxKurang?'green':'negative'" text-color="white">
              {{ item?.trxSesuai && item?.trxLebih && item?.trxKurang?'Sesuai':'Tidak Sesuai' }}
            </q-chip>
          </div>
        </div>
      </div>
    </div>
    <DetailCom
      v-model="isOpen" :data="data" @close="()=>{
        if(store.items?.length<=0) setPilihan(store.params.pilihan)
        isOpen=false
      }"
      @fix-mutasi="(val)=>{
        if(val) store.autoFixMutasi(val)
      }"
      @fix-resep="(val)=>{
        if(val) store.autoFixReseps(val)
      }"
    />
    <DetailMutasi
      v-model="store.openMutasi"
      :data="store.detailMutasis"
      :item="data"
      :loading="store.loadingMutasi"
      :loading-fix-mutasi="store.loadingFixMutasi || store.loadingPecah || store.loadingGanti"
      @close="()=>{
        if(store.items?.length<=0) setPilihan(store.params.pilihan)
        store.openMutasi=false
      }"
      @fix-mutasi="(val)=>{
        console.log('val', val)
        if(val) store.autoFixMutasi(val)
      }"
      @simpan-pecah="(val)=>{
        store.simpanPecahNomor(val)
      }"
      @ganti="(val)=>{
        store.gantiNomor(val)
      }"
    />
    <DetailResep
      v-model="store.openResep"
      :data="store.detailReseps"
      :item="data"
      :loading="store.loadingResep"
      :loading-fix-mutasi="store.loadingFixResep || store.loadingPecah || store.loadingGanti"
      @close="store.openResep=false"
      @fix-resep="(val)=>{
        console.log('val', val)
        if(val) store.autoFixReseps(val)
      }"
      @simpan-pecah="(val)=>{
        store.simpanPecahNomor(val)
      }"
      @ganti="(val)=>{
        store.gantiNomor(val)
      }"
    />
    <PerbaikanHarga
      v-model="store.openHarga"
    />
  </div>
</template>
<script setup>
import { formatDouble } from 'src/modules/formatter'
import { usePerbaikanDataFarmasiStore } from 'src/stores/simrs/farmasi/perbaikandata/perbaikandata'
import { defineAsyncComponent, ref } from 'vue'

const store = usePerbaikanDataFarmasiStore()

const DetailCom = defineAsyncComponent(() => import('./comp/CompDetail.vue'))
const DetailMutasi = defineAsyncComponent(() => import('./comp/CompListMutasi.vue'))
const DetailResep = defineAsyncComponent(() => import('./comp/CompListResep.vue'))
const PerbaikanHarga = defineAsyncComponent(() => import('./comp/CompPerbaikanHarga.vue'))

const isOpen = ref(false)
const data = ref({})

function openDetail (item) {
  isOpen.value = true
  data.value = item
  console.log('item', item, isOpen.value)
}
const pilihanBermasalahs = ref([
  { value: 'semua', label: 'Semua' },
  { value: 'bermasalah', label: 'Bermasalah' },
  { value: 'tidak', label: 'Tidak Bermasalah' }
])
function setPilihan (val) {
  // console.log('val', val)

  if (val === 'semua') store.items = store.semuas
  else if (val === 'bermasalah') store.items = store.semuas.filter(item => ((item.trxSesuai === false && item.trxLebih === false && item.trxKurang === false && item.opnameJml === false && item.opnameTrx === false) || item.trxSesuai === false || item.trxLebih === false || item.trxKurang === false || item.opnameJml === false || item.opnameTrx === false))
  else if (val === 'tidak') store.items = store.semuas.filter(item => (item.trxSesuai === true && item.trxLebih === true && item.trxKurang === true && item.opnameJml === true && item.opnameTrx === true))
}
</script>

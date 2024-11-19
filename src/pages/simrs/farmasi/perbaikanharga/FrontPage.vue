<template>
  <div class="bg-white q-pa-sm">
    <div class="q-mb-md text-weight-bold">
      Perbaikan Harga
    </div>
    <div>
      <app-table
        :columns="store.columns"
        :items="store.items"
        :meta="store.meta"
        :per-page="store.params.per_page"
        :loading="store.loading"
        :to-search="store.params.q"
        :default-btn="false"
        :ada-tambah="false"
        :ada-filter="false"
        force-paginasi
        @goto="store.setPage"
        @set-row="store.setPerPage"
        @refresh="store.refreshTable"
        @find="store.setSearch"
        @set-order="store.setOder"
      >
        <template #header-left-after-search>
          <div class=" q-ml-sm" style="width: 200px">
            <app-autocomplete-new
              v-model="store.params.kdruang"
              label="Pilih Gudang / Depo"
              autocomplete="nama"
              option-label="nama"
              option-value="kode"
              outlined
              clearable
              :source="store.gudangs"
              @on-select="(val)=>{
                store.setParams('kdruang', val)
                store.getData()
              }"
            />
          </div>
          <div class="q-ml-sm" style="width: 100px">
            <app-input v-model="store.params.tahun" label="Tahun" outlined />
          </div>
          <div class="q-ml-sm" style="width: 60px">
            <app-input v-model="store.params.bulan" label="Bulan" outlined />
          </div>
          <div class="q-ml-sm" style="width: 60px">
            <app-input v-model="store.params.page" label="Halaman" outlined />
          </div>
          <div class="q-ml-sm" style="width: 410px">
            <q-option-group v-model="store.params.pilihan" :options="pilihanBermasalahs" type="radio" inline @update:model-value="setPilihan" />
          </div>
        </template>
        <template #col-kd_obat>
          Kode
        </template>
        <template #col-nama_obat>
          Nama
        </template>
        <template #col-stok>
          Stok Sekarang
        </template>
        <template #col-opname>
          Stok Opname
        </template>
        <template #col-mutasi>
          Mutasi Masuk
        </template>
        <template #col-mutasi_keluar>
          Mutasi Keluar
        </template>
        <template #col-resep>
          Resep
        </template>
        <template #col-racikan>
          Racikan
        </template>
        <template #col-retur>
          Retur
        </template>
        <template #cell-nama_obat="{ row }">
          <div style="max-width: 250px; white-space: normal !important;">
            {{ row?.nama_obat }}
          </div>
        </template>
        <template #cell-stok="{ row }">
          <!-- <div v-if="store.params.kdruang" class="text-right" :class="row?.data?.stok?.filter(f=>f.beda===true)?.length>0?'text-negative':''">
            {{ formatDouble(parseFloat(row?.stok),2) }}
          </div> -->
          <div v-if="store.params.kdruang" class="text-right">
            <div v-if="row?.data?.stok?.filter(f=>f.beda===true)?.length>0">
              <q-btn
                :label="formatDouble(parseFloat(row?.stok),2)"
                no-caps
                dense
                :loading="row.loadingStok"
                :disable="row.loadingStok"
                :color="row?.data?.stok?.filter(f=>f.beda===true)?.length>0?'negative':''"
                @click="()=>{
                  const item=row?.data?.stok?.filter(f=>f.beda===true)
                  if(item?.length===0) return notifErrVue('data salah tidak terdeteksi')
                  item?.forEach(fo=>{
                    let pen=null
                    if(fo?.nopenerimaan?.includes('awal')){
                      pen=row?.data?.awal?.find(p=>p?.nopenerimaan===fo?.nopenerimaan)
                    }else{
                      pen=row?.data?.penerimaan?.find(p=>p?.nopenerimaan===fo?.nopenerimaan)
                    }
                    if(pen){
                      fo.harga=pen.harga
                      if(fo.tglpenerimaan !== pen.tglpenerimaan) fo.tglpenerimaan=pen.tglpenerimaan
                      if(fo.nobatch !== pen.nobatch) fo.nobatch=pen.nobatch
                    }
                  })
                  store.simpanPerbaikanHargaArray({
                    row:row,
                    item:item,
                    kd_obat:row?.kd_obat,
                    tipe:'stok',
                    loading:'Stok'
                  })
                }"
              >
                <q-tooltip>
                  Auto Fix
                </q-tooltip>
              </q-btn>
            </div>
            <div v-else>
              {{ formatDouble(parseFloat(row?.stok),2) }}
            </div>
          </div>
          <div v-else>
            -
          </div>
        </template>
        <template #cell-opname="{ row }">
          <!-- <div v-if="store.params.kdruang" class="text-right" :class="row?.data?.opname?.filter(f=>f.beda===true)?.length>0?'text-negative':''">
            {{ formatDouble(parseFloat(row?.opname),2) }}
          </div> -->
          <div v-if="store.params.kdruang" class="text-right">
            <div v-if="row?.data?.opname?.filter(f=>f.beda===true)?.length>0">
              <q-btn
                :label="formatDouble(parseFloat(row?.opname),2)"
                no-caps
                dense
                :loading="row.loadingOpname"
                :disable="row.loadingOpname"
                :color="row?.data?.opname?.filter(f=>f.beda===true)?.length>0?'negative':''"
                @click="()=>{
                  const item=row?.data?.opname?.filter(f=>f.beda===true)
                  if(item?.length===0) return notifErrVue('data salah tidak terdeteksi')
                  item?.forEach(fo=>{
                    let pen=null
                    if(fo?.nopenerimaan?.includes('awal')){
                      pen=row?.data?.awal?.find(p=>p?.nopenerimaan===fo?.nopenerimaan)
                    }else{
                      pen=row?.data?.penerimaan?.find(p=>p?.nopenerimaan===fo?.nopenerimaan)
                    }
                    if(pen){
                      fo.harga=pen.harga
                      if(fo.tglpenerimaan !== pen.tglpenerimaan) fo.tglpenerimaan=pen.tglpenerimaan
                      if(fo.nobatch !== pen.nobatch) fo.nobatch=pen.nobatch
                    }
                  })
                  store.simpanPerbaikanHargaArray({
                    row:row,
                    item:item,
                    kd_obat:row?.kd_obat,
                    tipe:'opname',
                    loading:'Opname'
                  })
                }"
              >
                <q-tooltip>
                  Auto Fix
                </q-tooltip>
              </q-btn>
            </div>
            <div v-else>
              {{ formatDouble(parseFloat(row?.opname),2) }}
            </div>
          </div>
          <div v-else>
            -
          </div>
        </template>
        <template #cell-mutasi="{ row }">
          <!-- <div v-if="store.params.kdruang" class="text-right" :class="row?.data?.mutasi?.filter(f=>f.beda===true)?.length>0?'text-negative':''">
            {{ formatDouble(parseFloat(row?.mutasi),2) }}
          </div> -->
          <div v-if="store.params.kdruang" class="text-right">
            <div v-if="row?.data?.mutasi?.filter(f=>f.beda===true)?.length>0">
              <q-btn
                :label="formatDouble(parseFloat(row?.mutasi),2)"
                no-caps
                dense
                :loading="row.loadingMutasi"
                :disable="row.loadingMutasi"
                :color="row?.data?.mutasi?.filter(f=>f.beda===true)?.length>0?'negative':''"
                @click="()=>{
                  const item=row?.data?.mutasi?.filter(f=>f.beda===true)
                  if(item?.length===0) return notifErrVue('data salah tidak terdeteksi')
                  item?.forEach(fo=>{
                    let pen=null
                    if(fo?.nopenerimaan?.includes('awal')){
                      pen=row?.data?.awal?.find(p=>p?.nopenerimaan===fo?.nopenerimaan)
                    }else{
                      pen=row?.data?.penerimaan?.find(p=>p?.nopenerimaan===fo?.nopenerimaan)
                    }
                    if(pen){
                      fo.harga=pen.harga
                      if(fo.tglpenerimaan !== pen.tglpenerimaan && !!pen.tglpenerimaan) fo.tglpenerimaan=pen.tglpenerimaan
                      if(fo.nobatch !== pen.nobatch && pen.nobatch) fo.nobatch=pen.nobatch
                      if(fo.tglexp !== pen.tglexp && pen.tglexp) fo.tglexp=pen.tglexp
                    }
                    // console.log('pen',pen);

                  })
                  store.simpanPerbaikanHargaArray({
                    row:row,
                    item:item,
                    kd_obat:row?.kd_obat,
                    tipe:'mutasi',
                    loading:'Mutasi'
                  })
                }"
              >
                <q-tooltip>
                  Auto Fix
                </q-tooltip>
              </q-btn>
            </div>
            <div v-else>
              {{ formatDouble(parseFloat(row?.mutasi),2) }}
            </div>
          </div>
          <div v-else>
            -
          </div>
        </template>
        <template #cell-mutasi_keluar="{ row }">
          <div v-if="store.params.kdruang" class="text-right">
            <div v-if="row?.data?.mutasikeluar?.filter(f=>f.beda===true)?.length>0">
              <q-btn
                :label="formatDouble(parseFloat(row?.mutasi_keluar),2)"
                no-caps
                dense
                :loading="row.loadingMutasiKeluar"
                :disable="row.loadingMutasiKeluar"
                :color="row?.data?.mutasikeluar?.filter(f=>f.beda===true)?.length>0?'negative':''"
                @click="()=>{
                  const item=row?.data?.mutasikeluar?.filter(f=>f.beda===true)
                  if(item?.length===0) return notifErrVue('data salah tidak terdeteksi')
                  item?.forEach(fo=>{
                    let pen=null
                    if(fo?.nopenerimaan?.includes('awal')){
                      pen=row?.data?.awal?.find(p=>p?.nopenerimaan===fo?.nopenerimaan)
                    }else{
                      pen=row?.data?.penerimaan?.find(p=>p?.nopenerimaan===fo?.nopenerimaan)
                    }
                    if(pen){
                      fo.harga=pen.harga
                      if(fo.tglpenerimaan !== pen.tglpenerimaan && !!pen.tglpenerimaan) fo.tglpenerimaan=pen.tglpenerimaan
                      if(fo.nobatch !== pen.nobatch && pen.nobatch) fo.nobatch=pen.nobatch
                      if(fo.tglexp !== pen.tglexp && pen.tglexp) fo.tglexp=pen.tglexp
                    }
                  })
                  store.simpanPerbaikanHargaArray({
                    row:row,
                    item:item,
                    kd_obat:row?.kd_obat,
                    tipe:'mutasi',
                    loading:'MutasiKeluar'
                  })
                }"
              >
                <q-tooltip>
                  Auto Fix
                </q-tooltip>
              </q-btn>
            </div>
            <div v-else>
              {{ formatDouble(parseFloat(row?.mutasi_keluar),2) }}
            </div>
          </div>
          <div v-else>
            -
          </div>
        </template>
        <template #cell-resep="{ row }">
          <!-- <div v-if="store.params.kdruang" class="text-right" :class="row?.data?.resep?.filter(f=>f.beda===true)?.length>0?'text-negative':''">
            {{ formatDouble(parseFloat(row?.resep),2) }}
          </div> -->
          <div v-if="store.params.kdruang" class="text-right">
            <div v-if="row?.data?.resep?.filter(f=>f.beda===true)?.length>0">
              <q-btn
                :label="formatDouble(parseFloat(row?.resep),2)"
                no-caps
                dense
                :loading="row.loadingResep"
                :disable="row.loadingResep"
                :color="row?.data?.resep?.filter(f=>f.beda===true)?.length>0?'negative':''"
                @click="()=>{
                  const item=row?.data?.resep?.filter(f=>f.beda===true)
                  if(item?.length===0) return notifErrVue('data salah tidak terdeteksi')
                  item?.forEach(fo=>{
                    let pen=null
                    if(fo?.nopenerimaan?.includes('awal')){
                      pen=row?.data?.awal?.find(p=>p?.nopenerimaan===fo?.nopenerimaan)
                    }else{
                      pen=row?.data?.penerimaan?.find(p=>p?.nopenerimaan===fo?.nopenerimaan)
                    }
                    if(pen){
                      fo.harga=pen.harga
                    }
                  })
                  store.simpanPerbaikanHargaArray({
                    row:row,
                    item:item,
                    kd_obat:row?.kd_obat,
                    tipe:'resep',
                    loading:'Resep'
                  })
                }"
              >
                <q-tooltip>
                  Auto Fix
                </q-tooltip>
              </q-btn>
            </div>
            <div v-else>
              {{ formatDouble(parseFloat(row?.resep),2) }}
            </div>
          </div>
          <div v-else>
            -
          </div>
        </template>
        <template #cell-racikan="{ row }">
          <!-- <div v-if="store.params.kdruang" class="text-right" :class="row?.data?.racikan?.filter(f=>f.beda===true)?.length>0?'text-negative':''">
            {{ formatDouble(parseFloat(row?.racikan),2) }}
          </div> -->
          <div v-if="store.params.kdruang" class="text-right">
            <div v-if="row?.data?.racikan?.filter(f=>f.beda===true)?.length>0">
              <q-btn
                :label="formatDouble(parseFloat(row?.racikan),2)"
                no-caps
                dense
                :loading="row.loadingRacikan"
                :disable="row.loadingRacikan"
                :color="row?.data?.racikan?.filter(f=>f.beda===true)?.length>0?'negative':''"
                @click="()=>{
                  const item=row?.data?.racikan?.filter(f=>f.beda===true)
                  if(item?.length===0) return notifErrVue('data salah tidak terdeteksi')
                  item?.forEach(fo=>{
                    let pen=null
                    if(fo?.nopenerimaan?.includes('awal')){
                      pen=row?.data?.awal?.find(p=>p?.nopenerimaan===fo?.nopenerimaan)
                    }else{
                      pen=row?.data?.penerimaan?.find(p=>p?.nopenerimaan===fo?.nopenerimaan)
                    }
                    if(pen){
                      fo.harga=pen.harga
                    }
                  })
                  store.simpanPerbaikanHargaArray({
                    row:row,
                    item:item,
                    kd_obat:row?.kd_obat,
                    tipe:'racikan',
                    loading:'Racikan'
                  })
                }"
              >
                <q-tooltip>
                  Auto Fix
                </q-tooltip>
              </q-btn>
            </div>
            <div v-else>
              {{ formatDouble(parseFloat(row?.racikan),2) }}
            </div>
          </div>
          <div v-else>
            -
          </div>
        </template>
        <template #cell-retur="{ row }">
          <!-- <div v-if="store.params.kdruang" class="text-right" :class="row?.data?.retur?.filter(f=>f.beda===true)?.length>0?'text-negative':''">
            {{ formatDouble(parseFloat(row?.retur),2) }}
          </div> -->
          <div v-if="store.params.kdruang" class="text-right">
            <div v-if="row?.data?.retur?.filter(f=>f.beda===true)?.length>0">
              <q-btn
                :label="formatDouble(parseFloat(row?.retur),2)"
                no-caps
                dense
                :loading="row.loadingRetur"
                :disable="row.loadingRetur"
                :color="row?.data?.retur?.filter(f=>f.beda===true)?.length>0?'negative':''"
                @click="()=>{
                  const item=row?.data?.retur?.filter(f=>f.beda===true)
                  if(item?.length===0) return notifErrVue('data salah tidak terdeteksi')
                  item?.forEach(fo=>{
                    let pen=null
                    if(fo?.nopenerimaan?.includes('awal')){
                      pen=row?.data?.awal?.find(p=>p?.nopenerimaan===fo?.nopenerimaan)
                    }else{
                      pen=row?.data?.penerimaan?.find(p=>p?.nopenerimaan===fo?.nopenerimaan)
                    }
                    if(pen){
                      fo.harga=pen.harga
                    }
                  })
                  store.simpanPerbaikanHargaArray({
                    row:row,
                    item:item,
                    kd_obat:row?.kd_obat,
                    tipe:'retur',
                    loading:'Retur'
                  })
                }"
              >
                <q-tooltip>
                  Auto Fix
                </q-tooltip>
              </q-btn>
            </div>
            <div v-else>
              {{ formatDouble(parseFloat(row?.retur),2) }}
            </div>
          </div>
          <div v-else>
            -
          </div>
        </template>
        <template #cell-status="{ row }">
          <div v-if="store.params.kdruang">
            <q-chip
              size="sm"
              dense
              :color="row?.beda === true?'negative':'primary'"
              text-color="white"
            >
              <div v-if="row?.beda === true">
                Beda
              </div>
              <div v-else>
                sama
              </div>
            </q-chip>
          </div>
          <div v-else>
            -
          </div>
        </template>
        <template #cell-act="{ row }">
          <div v-if="store.params.kdruang">
            <q-btn
              no-caps
              dense
              color="primary"
              @click="()=>{
                store.isOpen=true
                store.data=row
              }"
            >
              Buka
            </q-btn>
          </div>
          <div v-else>
            -
          </div>
        </template>
      </app-table>
    </div>
  </div>
  <DetailPage v-model="store.isOpen" @close="store.isOpen=false" />
</template>
<script setup>
import { formatDouble } from 'src/modules/formatter'
import { notifErrVue } from 'src/modules/utils'
import { usePerbaikanHargaFarmasiStore } from 'src/stores/simrs/farmasi/perbaikanharga/perbaikanharga'
import { defineAsyncComponent, onMounted, shallowRef, ref } from 'vue'

const store = usePerbaikanHargaFarmasiStore()
const DetailPage = shallowRef(defineAsyncComponent(() => import('./DetailPage.vue')))

const pilihanBermasalahs = ref([
  { value: 'semua', label: 'Semua' },
  { value: 'bermasalah', label: 'Bermasalah' },
  { value: 'tidak', label: 'Tidak Bermasalah' }
])
function setPilihan (val) {
  // console.log('val', val)

  if (val === 'semua') store.items = store.semuas
  else if (val === 'bermasalah') store.items = store.semuas.filter(fi => fi.beda === true)
  else if (val === 'tidak') store.items = store.semuas.filter(fi => !fi.beda === true)
  console.log('item', store.items)
}
onMounted(() => {
  store.getData()
})
</script>

<style lang="scss" scoped>
.q-tab {
  border-top-left-radius: 40px;
  border-bottom-right-radius: 40px;
}

</style>

<template>
  <q-page
    class=""
    :class="style.componentfull?'container-no-header':'container--q-header q-pa-xs'"
  >
    <div class="header bg-primary text-white">
      <HeaderComp
        :full="style.componentfull"
        :search="store.fNama"
        :custom="store.custom"
        :poli="apps?.user?.pegawai?.poli"
        @fullscreen="style.setComponentFull"
        @refresh="store.getAllSurat"
        @set-periode="(val)=>store.setPeriodik(val)"
        @set-tanggal="(val)=>store.setDate(val)"
        @set-search="store.setQ"
        @filter="store.setFilters"
        @normal="store.notCustom"
      />
    </div>
    <div class="footer absolute-bottom bg-primary text-white z-top">
      <BottomComp
        v-if="store.meta !==null"
        :key="store.meta"
        :meta="store.meta"
        @go-to="store.setPage"
      />
    </div>
    <q-card
      flat
      no-shadow
      class="my-flex-1 scroll"
    >
      <ListSuratKontrol />
    </q-card>
    <FilterPage
      v-model="store.filters"
      :search="store.fNama"
      @close="store.setFilters"
      @filter-data="store.filterData"
      @set-search="store.setQ"
    />
    <app-dialog-form
      v-model="store.isOpen"
      title="Edit Surat Kontrol"
      :loading="store.loading || store.loadingJadwalDokter"
      @save-form="save"
    >
      <template #default>
        <div class="full-width">
          <div class="row q-mb-sm">
            <div class="col-12">
              <app-input-date
                :model="store.form.tglrencanakontrol"
                outlined
                label="Tanggal Rencana Kontrol"
                :loading="store.loading"
                :disable="store.loading"
                @set-model="setTanggal"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <app-autocomplete
                :key="store.form.kodeDokter"
                v-model="store.form.kodeDokter"
                outlined
                label="Pilih Dokter"
                autocomplete="namadokter"
                option-label="namadokter"
                option-value="kodedokter"
                :loading="store.loadingJadwalDokter"
                :disable="store.loadingJadwalDokter"
                :source="store.jadwalDpjps"
              />
            </div>
          </div>
        </div>
      </template>
    </app-dialog-form>
  </q-page>
</template>
<script setup>
import { useStyledStore } from 'src/stores/app/styled'
import { useSuratKontrolPoliStore } from 'src/stores/simrs/pelayanan/poli/suratkontrol'
import { onUnmounted } from 'vue'
import HeaderComp from './comp/HeaderComp.vue'
import BottomComp from './comp/BottomComp.vue'
import ListSuratKontrol from './comp/ListSuratKontrol.vue'
import FilterPage from './comp/FilterPage.vue'
import { useAplikasiStore } from 'src/stores/app/aplikasi'

const style = useStyledStore()
const store = useSuratKontrolPoliStore()
const apps = useAplikasiStore()

console.log('app', apps?.user?.pegawai?.poli)

store.getAllSurat()
function setTanggal (val) {
  store.setForm('tglrencanakontrol', val)
  store.getjadwalDokterDpjp()
}
function save () {
  console.log(store.form)
  store.simpanEdit()
}
onUnmounted(() => {
  console.log('unmounted')
  store.resetParam()
})
</script>

<template>
  <div class="full-width q-mt-md">
    <div class="row items-center q-col-gutter-sm">
      <div class="col-4">
        <AutoComObt
          ref="refObat"
          :model="store.form.kdobat"
          autocomplete="namaobat"
          :option-label="['namaobat','total','kanduangan']"
          option-value="kdobat"
          label="Pilih Obat"
          outlined
          :source="options"
          :loading="store.loadingCari"
          @on-select="store.obatSelected"
          @clear="store.clearObat"
          @buang="cariObat"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useResepDepoFarmasiStore } from 'src/stores/simrs/farmasi/resepdepo/formresepdepo'
import { ref, defineAsyncComponent } from 'vue'

const store = useResepDepoFarmasiStore()
const apps = useAplikasiStore()

const AutoComObt = defineAsyncComponent(() => import('./AutoComObt.vue'))

const options = ref([])

function cariObat (val) {
  console.log(val)
  const param = {
    groups: store?.pasien?.groups,
    kdruang: apps?.user?.pegawai?.kdruangansim
  }
  if (store.obats.length) {
    options.value = store.obats.filter(ob => ob.namaobat.toLowerCase().includes(val.toLowerCase()))
  } else {
    store.getDataObat(param).then(() => {
      options.value = store.obats.filter(ob => ob.namaobat.toLowerCase().includes(val.toLowerCase()))
    })
  }
}
</script>

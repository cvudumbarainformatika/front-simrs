<template>
  <div class="full-width q-mt-md q-mb-lg">
    <div class="row items-start q-col-gutter-sm">
      <div class="col-6">
        <div class="q-my-sm">
          <AutoComObt
            ref="refObat"
            :model="store.form.kodeobat"
            autocomplete="namaobat"
            :option-label="['namaobat','total','kandungan']"
            option-value="kodeobat"
            label="Pilih Obat"
            outlined
            :source="options"
            :loading="store.loadingCari"
            @on-select="store.obatSelected"
            @clear="store.clearObat"
            @buang="cariObat"
          />
        </div>
        <div class="q-my-sm">
          <app-input
            ref="refJumlah"
            v-model="store.form.jumlah"
            label="Jumlah"
            outlined
            @update:model-value="setJumlah($event,'jumlah')"
          />
        </div>
        <div class="q-my-sm">
          <!-- <app-input
            ref="refAturan"
            v-model="store.form.aturan"
            label="Aturan"
            outlined
          /> -->
          <app-autocomplete-new
            ref="refAturan"
            :model="store.form.aturan"
            autocomplete="signa"
            option-label="signa"
            option-value="signa"
            label="Pilih Signa"
            outlined
            :source="store.signas"
            :loading="store.loadingSigna"
            @on-select="store.signaSelected"
            @buang="store.writeSigna"
            @on-enter="store.saveSigna"
          />
          <!-- @clear="store.clearObat"
            @buang="cariObat" -->
        </div>
        <div class="q-my-sm">
          <app-input
            ref="refKeterangan"
            v-model="store.form.keterangan"
            label="Keterangan"
            outlined
          />
        </div>
      </div>
      <div class="col-6">
        <div v-if="!!store.obatTerpilih">
          <div class="">
            {{ store?.obatTerpilih?.kodeobat }}
          </div>
          <div class="text-weight-bold text-orange">
            {{ store?.obatTerpilih?.kandungan }}
          </div>
          <div class="text-weight-bold text-blue">
            {{ store?.obatTerpilih?.kekuatandosis }}
          </div>
          <div class="text-weight-bold">
            {{ parseFloat(store?.obatTerpilih?.total) }} <span class="text-italic f-10">({{ store?.obatTerpilih?.satuankecil }})</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-end">
      <div class="q-mr-md">
        <app-btn
          label="Simpan"
          :loading="store.loading"
          :disable="store.loading"
          @click="store.simpanObat"
        />
      </div>
    </div>
    <q-separator class="q-my-sm" />
    <div
      v-if="store.reseprinci.length"
    >
      <div
        v-for="(res,i) in store.reseprinci"
        :key="i"
        class="row"
      >
        <div class="col q-mr-sm">
          {{ res?.kdobat }}
        </div>
        <div class="col q-mr-sm">
          {{ res?.mobat?.nama_obat }}
        </div>
        <div class="col q-mr-sm">
          {{ res?.jumlah }}
        </div>
        <div class="col q-mr-sm">
          {{ res?.aturan }}
        </div>
        <div class="col q-mr-sm">
          {{ res?.keterangan }}
        </div>
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
    kdruang: apps?.user?.kdruangansim
  }
  if (store.obats.length) {
    options.value = store.obats.filter(ob => ob.namaobat.toLowerCase().includes(val.toLowerCase()))
  }
  else {
    store.getDataObat(param).then(() => {
      options.value = store.obats.filter(ob => ob.namaobat.toLowerCase().includes(val.toLowerCase()))
    })
  }
}

// watch(() => apps?.user?.kdruangansim, (obj) => {

// })
function setJumlah (evt, key) {
  const inc = evt.includes('.')
  const ind = evt.indexOf('.')
  const panj = evt.length
  const nilai = isNaN(parseFloat(evt)) ? 0 : (inc && (ind === (panj - 1)) ? evt : parseFloat(evt))
  store.setForm(key, nilai)
  if (key === 'jumlah') {
    if (store.form.jumlahdosis > 0) {
      const kons = nilai / store.form.jumlahdosis
      this.setForm('konsumsi', kons)
    }
  }
}
</script>

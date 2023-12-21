<template>
  <div class="q-ma-sm">
    <div class="row items-center q-col-gutter-sm">
      <div class="col-6">
        <app-input-date-human
          :model="store.disp.tglpenerimaan"
          label="Tanggal"
          outlined
          @set-display="store.setDisp('tglpenerimaan',$event)"
          @db-model="store.setForm('tglpenerimaan',$event)"
        />
      </div>
      <div class="col-6">
        <app-autocomplete-debounce-input
          :model="store.form.kdobat"
          outlined
          label="Pilih Obat"
          autocomplete="namaobat"
          option-label="namaobat"
          option-value="kodeobat"
          :source="store.obats"
          :loading="store.loadingObat"
          @on-select="store.setForm('kdobat',$event)"
          @clear="store.setForm('kdobat','')"
          @buang="store.cariObat($event)"
        />
      </div>
      <div class="col-6">
        <app-input-date-human
          :model="store.disp.tglexp"
          label="Tanggal Expired"
          outlined
          @set-display="store.setDisp('tglexp',$event)"
          @db-model="store.setForm('tglexp',$event)"
        />
      </div>
      <div class="col-6">
        <app-input
          v-model="store.disp.kdruang"
          outlined
          :label="'Gudang / Depo : '+store.form.kdruang"
          readonly
        />
      </div>
      <div class="col-6">
        <app-input
          v-model="store.form.jumlah"
          outlined
          :label="'Jumlah '+ satuan"
          @update:model-value="numberOnly($event,'jumlah')"
        />
      </div>
      <div class="col-6">
        <app-input
          v-model="store.form.harga"
          outlined
          label="Harga"
          @update:model-value="numberOnly($event,'harga')"
        />
      </div>
      <div class="col-6">
        <app-input
          v-model="store.form.nobatch"
          outlined
          label="Nomor Batch"
        />
      </div>
      <div
        v-if="store.form.id"
        class="col-6"
      >
        {{ store.form.id }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { UseFarmasiStokStore } from 'src/stores/simrs/farmasi/stok/form'
import { computed } from 'vue'

const store = UseFarmasiStokStore()

function numberOnly(evt, key) {
  const inc = evt.includes('.')
  const ind = evt.indexOf('.')
  const panj = evt.length
  const nilai = isNaN(parseFloat(evt)) ? 0 : (inc && (ind === (panj - 1)) ? evt : parseFloat(evt))
  store.setForm(key, nilai)
}

const satuan = computed(() => {
  const obat = store.allObats.filter(ob => ob.kodeobat === store.form.kdobat)
  if (obat.length) return '( ' + obat[0]?.satuan_k + ')'
  else return ''
})

</script>

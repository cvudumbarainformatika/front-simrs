<template>
  <div class="q-ma-sm">
    <div class="row items-center q-col-gutter-sm">
      <div class="col-6">
        <app-input-date-human
          :model="store.disp.tglpenerimaan"
          label="Tanggal Penerimaan"
          outlined
          @set-display="store.setDisp('tglpenerimaan',$event)"
          @db-model="store.setForm('tglpenerimaan',$event)"
        />
      </div>
      <div class="col-6">
        <app-input
          v-model="store.disp.obat"
          outlined
          label="Nama Obat"
          readonly
        />
      </div>
      <div class="col-4">
        <app-autocomplete
          v-model="store.form.nopenerimaan"
          outlined
          label="Pilih Nomor Penerimaan Awal"
          :source="store.nopenerimaans"
          :loading="store.loadingAmbil"
          @selected="store.penerimaanSelected($event)"
        />
        <!--
          @clear="store.setForm('nopenerimaan','')" -->
      </div>
      <div class="col-4">
        <app-input-date-human
          :model="store.disp.tglexp"
          label="Tanggal Expired"
          outlined
          @set-display="store.setDisp('tglexp',$event)"
          @db-model="store.setForm('tglexp',$event)"
        />
      </div>
      <div class="col-4">
        <app-input
          v-model="store.disp.kdruang"
          outlined
          :label="'Gudang / Depo : '+store.form.kdruang"
          readonly
        />
      </div>
      <div class="col-4">
        <app-input
          v-model="store.form.awal"
          outlined
          :label="'Jumlah Stok Awal'+ satuan"
          readonly
          valid
          @update:model-value="numberOnly($event,'awal')"
        />
      </div>
      <div class="col-4">
        <app-input
          ref="refPenyesuaian"
          v-model="store.form.penyesuaian"
          outlined
          :label="'Jumlah Penyesuaian'+ satuan"
          @update:model-value="numberOnly($event,'penyesuaian')"
        />
      </div>
      <div class="col-4">
        <app-input
          v-model="store.form.akhir"
          outlined
          valid
          :label="'Jumlah Stok Setelah disesuaikan'+ satuan"
          @update:model-value="numberOnly($event,'akhir')"
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
      <!-- <div
        v-if="store.form.id"
        class="col-6"
      >
        {{ store.form.id }}
      </div> -->
    </div>
  </div>
</template>
<script setup>
import { UseFarmasiStokMinDepoStore } from 'src/stores/simrs/farmasi/stokmindepo/form'
import { computed, ref } from 'vue'

const store = UseFarmasiStokMinDepoStore()

function numberOnly (evt, key) {
  const inc = evt.includes('.')
  const ind = evt.indexOf('.')
  const panj = evt.length
  const nilai = isNaN(parseFloat(evt)) ? 0 : (inc && (ind === (panj - 1)) ? evt : parseFloat(evt))
  store.setForm(key, nilai)
  if (key === 'penyesuaian') {
    const awal = parseFloat(store.form.awal)

    store.setForm('akhir', awal + nilai)
  }
  if (key === 'akhir') {
    const awal = parseFloat(store.form.awal)

    store.setForm('penyesuaian', nilai - awal)
  }
}

const satuan = computed(() => {
  const obat = store.allObats.filter(ob => ob.kodeobat === store.form.kdobat)
  if (obat.length) return '( ' + obat[0]?.satuan_k + ')'
  else return ''
})
const refPenyesuaian = ref(null)
function validasi () {
  console.log(refPenyesuaian.value?.$refs?.refInput.validate())
  if (refPenyesuaian.value?.$refs?.refInput.validate()) return true
  else return false
}

defineExpose({ validasi })

</script>

<template>
  <div class="full-height ">
    <div v-if="!store.pasienIgd?.newapotekrajal?.length" class="column full-height flex-center">
      Tidak Ada Data Pengobatan
    </div>
    <div v-else class="full-height bg-grey-3 scroll">
      <q-card-section
        class="q-pa-none"
        flat
        bordered
        square
      >
        <q-bar class="bg-grey-9 text-white">
          <div>PENGOBATAN</div>
        </q-bar>
        <q-list
          separator
        >
          <q-item
            v-for="(it, r) in pengobatans"
            :key="r"
          >
            <q-item-section>
              <q-item-label>{{ it?.mobat?.nama_obat }} <span class="text-weight-bold text-accent"> X {{ it?.jumlah }}</span> <span class="text-weight-bold"> {{ it?.aturan }}</span></q-item-label>
              <q-item-label>Keterangan : {{ it?.keterangan }}</q-item-label>
              <!-- <q-item-label>Hasil Pemeriksaan Radiologi = {{ item?.hasilradiologi[r]?.rs3 }}</q-item-label> -->
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </div>
  </div>
</template>

<script setup>
import { useHistoryPasienRanapStore } from 'src/stores/simrs/ranap/history'
import { computed } from 'vue'

const store = useHistoryPasienRanapStore()

const pengobatans = computed(() => {
  let resep = []
  const headx = store?.pasienIgd?.newapotekrajal
  if (headx?.length) {
    const det = headx?.map(x => x.permintaanresep)?.flat()
    resep = det
  }
  // const f = resep.length ? resep?.map(x => x.mobat?.nama_obat) : []
  // console.log('resep', resep)

  return resep
})
</script>

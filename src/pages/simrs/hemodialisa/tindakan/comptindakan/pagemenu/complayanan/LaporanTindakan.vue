<template>
  <div class="row fit">
    <div class="col-6 full-height column relative-position">
      <FormComp
        :key="props.pasien"
        :pasien="props.pasien"
      />
    </div>
    <div class="col-6 full-height bg-grey-4">
      <ListComp
        v-if="pasien.laporantindakan.length"
        :lists="pasien?.laporantindakan"
        :listdokter="store.listdokters"
        :pasien="props.pasien"
      />

      <div
        v-else
        class="full-height column flex-center"
      >
        <div>Belum Ada Data Tersimpan</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ListComp from './compLaporanTindakan/ListComp.vue'
import FormComp from './compLaporanTindakan/FormComp.vue'
import { useLaporanTindakanPoliStore } from 'src/stores/simrs/pelayanan/poli/laporanTindakan'
const store = useLaporanTindakanPoliStore()

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

</script>

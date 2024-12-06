<template>
  <q-dialog
    persistent
    transition-show="slide-up"
    transition-hide="slide-down"
    @show="onShow"
  >
    <q-card class="bg-grey-4 column fit">
      <div class="bg-dark text-white col-auto">
        <div class="row justify-between items-center q-px-md q-py-xs">
          <div class="f-12">
            Permintaan & Hasil Radiologi
          </div>
          <q-btn size="12px" dense flat icon="icon-mat-close" v-close-popup>
            <q-tooltip class="bg-white text-primary">
              Close
            </q-tooltip>
          </q-btn>
        </div>
      </div>

      <q-card-section class="col full-height q-pa-none">
        <ListRadiologi :pasien="props.pasien" :loading="store.loading" :bisa-edit-hapus="false" :key="props?.pasien" />
      </q-card-section>
    </q-card>

    <!-- dialog laborat -->
  </q-dialog>
</template>

<script setup>
import { useRadiologiPoli } from 'src/stores/simrs/pelayanan/poli/radiologi'
import { defineAsyncComponent, onMounted } from 'vue'
// const ListLaborat = defineAsyncComponent(() => import('src/pages/simrs/poli/tindakan/comptindakan/pagemenu/comppenunjang/complaboratbaru/ListPemeriksaans.vue'))
const ListRadiologi = defineAsyncComponent(() => import('src/pages/simrs/poli/tindakan/comptindakan/pagemenu/comppenunjang/compradiologi/ListOrder.vue'))

const props = defineProps({
  pasien: {
    type: Object,
    default: () => {}
  },
  kasus: {
    type: Object,
    default: () => {}
  },
  nakes: {
    type: String,
    default: null
  }
})

// const emits = defineEmits(['exit'])

const store = useRadiologiPoli()

onMounted(() => {
  // console.log('mmounted index', store.loading)

})

const onShow = () => {
  const isRanap = true
  Promise.all([
    store.getNota(props?.pasien, isRanap),
    store.getData(props?.pasien, isRanap)
  ])
}
</script>

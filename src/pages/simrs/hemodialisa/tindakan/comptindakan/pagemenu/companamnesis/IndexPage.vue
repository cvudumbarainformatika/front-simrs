<template>
  <div
    class="full-height q-pa-sm"
    style="overflow: hidden;"
  >
    <div class="row q-col-gutter-x-xs full-height">
      <div class="col-7 full-height">
        <FormAnamnesis
          :key="props.pasien"
          :pasien="props.pasien"
          @open-history="seamless = !seamless"
        />
      </div>
      <div class="col-5 full-height">
        <ListAnamnesis
          :key="props.pasien"
          :pasien="props.pasien"
        />
      </div>
    </div>

    <!-- dialog -->

    <!-- <HistoryAnamnesis
      :key="props.pasien"
      :seamless="seamless"
      :pasien="props.pasien"
      @close="seamless =!seamless"
    /> -->

    <HistoryKanan
      :key="props.pasien"
      :seamless="seamless"
      :pasien="props.pasien"
      @close="seamless =!seamless"
    />
  </div>
</template>

<script setup>
// import { useAnamnesis } from 'src/stores/simrs/pelayanan/poli/anamnesis'
import ListAnamnesis from './ListAnamnesis.vue'
import FormAnamnesis from './FormAnamnesis.vue'
// import HistoryAnamnesis from './HistoryAnamnesis.vue'
import HistoryKanan from './HistoryKanan.vue'
import { onMounted, ref } from 'vue'

// const store = useAnamnesis()
const seamless = ref(false)
const text = ref('')

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
onMounted(() => {
  console.log(text.value)
})

</script>

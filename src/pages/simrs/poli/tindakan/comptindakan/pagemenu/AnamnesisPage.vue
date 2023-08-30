<template>
  <div class="full-height q-pa-sm">
    <div class="row q-col-gutter-x-xs full-height">
      <div class="col-7 full-height">
        <FormAnamnesis @open-history="seamless = !seamless" />
      </div>
      <div class="col-5 full-height">
        <ListAnamnesis />
      </div>
    </div>

    <!-- dialog -->

    <HistoryAnamnesis
      :seamless="seamless"
      @close="seamless =!seamless"
    />
  </div>
</template>

<script setup>
// import { useAnamnesis } from 'src/stores/simrs/pelayanan/poli/anamnesis'
import ListAnamnesis from './companamnesis/ListAnamnesis.vue'
import FormAnamnesis from './companamnesis/FormAnamnesis.vue'
import HistoryAnamnesis from './companamnesis/HistoryAnamnesis.vue'
import { onMounted, ref } from 'vue'

// const store = useAnamnesis()
const seamless = ref(false)
const options = ['Obat', 'Makanan', 'Udara', 'Lain-lain']
const model = ref(options[0])
const text = ref('')
onMounted(() => {
  console.log(model.value)
  console.log(text.value)
})

</script>

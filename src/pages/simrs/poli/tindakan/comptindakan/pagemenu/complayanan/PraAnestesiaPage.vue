<template>
  <div class="row fit absolute-top">
    <div class="col-7 bg-red">
      <FormPage />
    </div>
    <div class="col-5 bg-grey-4">
      sad
    </div>
    <!-- adsadas {{ props?.pasien }} -->
  </div>
</template>

<script setup>
import FormPage from './compPraAnestesi/FormPage.vue'

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

console.log(props.pasien)
</script>

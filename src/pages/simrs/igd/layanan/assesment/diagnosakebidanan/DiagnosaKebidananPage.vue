<template>
  <div
    class="row full-height full-width"
    style="overflow: hidden;"
  >
    <div
      class="col-6 full-height"
      style="border-right: 2px solid rgb(160, 160, 160);"
    >
      <FormDiagnosaKebidanan
        :key="props?.pasien"
        :pasien="props?.pasien"
      />

      Form
    </div>
    <div
      class="col-6 full-height"
    >
      <ListsComp
        :key="props?.pasien"
        :pasien="props.pasien"
      />
    </div>
  </div>
</template>

<script setup>
import ListsComp from './com/ListsComp.vue'
import FormDiagnosaKebidanan from './com/FormDiagnosaKebidanan.vue'
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

</script>

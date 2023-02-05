<template>
  <div>
    <!-- <div v-if="item.rekap_absensi.length > 0">
      ok
    </div>
    <div v-else>
      Kosong
    </div> -->
    {{ item }}
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    default: () => { }
  }
})
</script>

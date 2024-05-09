<template>
  <q-dialog maximized>
    <div class="bg-white q-pa-lg">
      maximized Ranap
    </div>
  </q-dialog>
</template>
<script setup>

function printPage () {
  console.log('print ')
  window.print()
  setTimeout(function () {
    afterPrint()
  }, 100)
}

function afterPrint () {
  // const r = confirm('Press a button!')
  // if (r === true) {
  // router.push({ path: store.prevUrl ? store.prevUrl : '/history' })
  window.close()
  // } else {
  //   window.close()
  // }
}
defineExpose({ printPage })
</script>

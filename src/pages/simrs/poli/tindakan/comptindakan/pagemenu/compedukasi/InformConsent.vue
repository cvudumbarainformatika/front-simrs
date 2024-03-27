<template>
  <div class="row fit">
    <div class="col-8 full-height ">
      <div class="column fit">
        <div class="col-auto bg-dark text-white">
          <div class="q-pa-sm">
            INFORM CONSENT
          </div>
        </div>
        <div class="col full-height">
          <q-scroll-area style="height:calc(100% - 1px)">
            Masih Maintenance
          </q-scroll-area>
        </div>
      </div>
    </div>
    <div class="col-4 full-height">
      <div class="column fit">
        <div class="col-auto bg-teal text-white">
          <div class="q-pa-sm">
            INFORM CONSENT TERSIMPAN
          </div>
        </div>
        <div class="col full-height">
          <q-scroll-area style="height:calc(100% - 1px)">
            Masih Maintenance
          </q-scroll-area>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
</script>

<template>
  <div class="row items-center ba-black">
    <div class="col-grow br-black">
      <div class="row q-pa-xs">
        <div class="col-auto">
          <img
            src="~assets/images/logo-kota-grey.png"
            width="80"
          >
        </div>
        <div class="col-grow">
          <div class="text-center">
            <div class="text-weight-bold f-14">
              PEMERINTAH KOTA PROBOLINGGO
            </div>
            <div>DINAS KESEHATAN, PENGENDALIAN PENDUDUK DAN KELUARGA BERENCANA</div>
            <div class="text-weight-bold f-14">
              UOBK RSUD DOKTER MOHAMAD SALEH
            </div>
            <div>Jl. Mayjend Panjaitan No.65 Telp: (0335)433119 Fax.(0335)432702</div>
            <div>email: rsudprob@probolinggokota.go.id</div>
            <div>PROBOLINGGO – 67219</div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-auto">
      <div class="q-pa-md">
        <div
          class="text-weight-bold text-center"
          style="max-width: 150px;"
        >
          {{ title1 }}
          <div>{{ title2 }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title1: {
    type: String,
    default: 'PERSETUJUAN UMUM'
  },
  title2: {
    type: String,
    default: '(GENERAL CONSENT)'
  }
})
</script>

<template>
  <q-form class="column fit" @submit="onSubmit">
    <div class="col-auto">
      <div class="q-px-lg q-py-md">
        <div class="f-14 text-bold">
          DISCHARGE SUMMARY
        </div>
        <div>diisi untuk dikasih ke pasien KRS</div>
      </div>
      <q-separator class="" />
    </div>
    <div class="col full-height q-px-lg scroll">
      <div class="q-mt-md q-mb-xs">
        Lanjutan Perawatan dirumah :
      </div>
      <q-input
        type="textarea"
        outlined
        standout="bg-yellow-3"
        rows="2"
      />
      <div class="q-mt-md q-mb-xs">
        ATURAN DIET/NUTRISI :
      </div>
      <q-input
        type="textarea"
        outlined
        standout="bg-yellow-3"
        rows="2"
      />
      <div class="q-mt-md q-mb-xs">
        OBAT-OBATAN YANG DIBAWA PULANG, JUMLAH DAN DOSIS :
      </div>
      <q-input
        type="textarea"
        outlined
        standout="bg-yellow-3"
        rows="2"
      />
      <div class="q-mt-md q-mb-xs">
        RENCANA AKTIFITAS :
      </div>
      <q-input
        type="textarea"
        outlined
        standout="bg-yellow-3"
        rows="2"
      />
      <div class="q-mt-md q-mb-xs">
        ISTIRAHAT :
      </div>
      <q-input
        type="textarea"
        outlined
        standout="bg-yellow-3"
        rows="2"
      />
      <div class="q-mt-md q-mb-xs">
        INFORMASI DAN EDUKASI YANG DIBERIKAN :
      </div>
      <q-input
        type="textarea"
        outlined
        standout="bg-yellow-3"
        rows="2"
      />

      <div style="margin-bottom:100px;" />
    </div>
    <div class="col-auto q-pa-md bg-dark">
      <div class="row flex justify-end bg-dark">
        <q-btn label="Simpan" type="submit" color="primary" />
      </div>
    </div>
  </q-form>
</template>

<script setup>
defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

function onSubmit () {
  console.log('onSubmit')
}
</script>

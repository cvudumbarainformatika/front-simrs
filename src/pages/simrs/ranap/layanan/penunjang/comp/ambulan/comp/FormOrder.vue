<template>
  <div class="fit column scroll">
    <q-form ref="formRef" @submit="onSubmit" class="q-pa-lg">
      <div class="row">
        <div class="row q-col-gutter-sm full-width">
          <div class="col-3">
            Tujuan
          </div>
          <div class="col-9">
            <app-autocomplete-new
              ref="refPerawat"
              :model="store.form.tujuan"
              label="Tujuan"
              autocomplete="rs2"
              option-value="rs1"
              option-label="rs2"
              outlined
              :source="store.tujuans"
              @on-select="(val)=> {
                store.form.tujuan = val
              }"
            />
          </div>

          <div class="col-3">
            Keterangan
          </div>
          <div class="col-9">
            <q-input v-model="store.form.keterangan" label="Keterangan" outlined standout="bg-yellow-3" type="textarea" rows="3" />
          </div>

          <div class="col-3">
            Layanan Supir
          </div>
          <div class="col-9">
            <app-autocomplete-new
              ref="refPerawat"
              :model="store.form.layanansupir"
              label="Layanan"
              autocomplete="label"
              option-value="value"
              option-label="label"
              outlined
              valid
              :source="store.layanans"
              @on-select="(val)=> {
                store.form.layanansupir = val
              }"
              style="width: 50%;"
            />
          </div>
          <div class="col-3">
            Layanan Perawat
          </div>
          <div class="col-9">
            <app-autocomplete-new
              ref="refPerawat"
              :model="store.form.layananperawat"
              label="Layanan"
              autocomplete="label"
              option-value="value"
              option-label="label"
              outlined
              valid
              :source="store.layanans"
              @on-select="(val)=> {
                store.form.layananperawat = val
              }"
              style="width: 50%;"
            />
          </div>

          <div class="col-12">
            <div class="text-bold">
              Pendamping
            </div>
          </div>

          <div class="col-3">
            Perawat 1
          </div>
          <div class="col-9">
            <app-autocomplete-new
              ref="refPerawat1"
              :model="store.form.perawat1"
              label="Perawat 1"
              autocomplete="nama"
              option-value="kdpegsimrs"
              option-label="nama"
              outlined
              valid
              :source="store.perawats"
              @on-select="(val)=> {
                store.form.perawat1 = val
              }"
            />
          </div>
          <div class="col-3">
            Perawat 2
          </div>
          <div class="col-9">
            <app-autocomplete-new
              ref="refPerawat2"
              :model="store.form.perawat2"
              label="Perawat 2"
              autocomplete="nama"
              option-value="kdpegsimrs"
              option-label="nama"
              outlined
              valid
              :source="store.perawats"
              @on-select="(val)=> {
                store.form.perawat2 = val
              }"
            />
          </div>
          <div class="col-3">
            Dokter
          </div>
          <div class="col-9">
            <app-autocomplete-new
              ref="refDokter"
              :model="store.form.dokter"
              label="Dokter"
              autocomplete="nama"
              option-value="kdpegsimrs"
              option-label="nama"
              outlined
              valid
              :source="store.dokters"
              @on-select="(val)=> {
                store.form.dokter = val
              }"
            />
          </div>
        </div>
      </div>
      <q-separator class="q-my-md" />
      <div class="row full-width justify-end">
        <q-btn :loading="store.loadingOrder" :disable="store.loadingOrder" label="Kirim Permintaan" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { usePermintaanAmbulanStore } from 'src/stores/simrs/ranap/ambulance'
import { ref } from 'vue'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  kasus: {
    type: Object,
    default: null
  }
})

const store = usePermintaanAmbulanStore()
const formRef = ref(null)

function onSubmit () {
  // console.log('onSubmit', store.form)
  store.saveOrder(props.pasien)
    .then(() => {
      formRef.value.resetValidation()
    })
}

</script>

<template>
  <div class="fit column scroll">
    <q-form ref="formRef" @submit="onSubmit" class="q-pa-lg">
      <div class="row q-col-gutter-md">
        <div class="col-6">
          <div><b>ISK</b></div>
          <q-separator class="q-my-sm" />
          <div class="column">
            <div v-for="field in filterredMaster?.isk" :key="field" class="flex no-wrap q-gutter-sm">
              <q-checkbox
                dense size="md" v-model="store.form.isk" :val="field?.kode"
                @update:model-value="(val)=> {
                  store.isk = val.join(',')
                }"
              />
              <span v-html="field?.poin" />
            </div>
          </div>
        </div>

        <div class="col-6">
          <div><b>IADP</b></div>
          <q-separator class="q-my-sm" />
          <div class="column">
            <div v-for="field in filterredMaster?.iadp" :key="field" class="flex no-wrap q-gutter-sm">
              <q-checkbox
                dense size="md" v-model="store.form.iadp" :val="field?.kode"
                @update:model-value="(val)=> {
                  store.iadp = val.join(',')
                }"
              />
              <span v-html="field?.poin" />
            </div>
          </div>
        </div>
        <div class="col-6">
          <div><b>IDO / ILO</b></div>
          <q-separator class="q-my-sm" />
          <div class="column">
            <div v-for="field in filterredMaster?.ido" :key="field" class="flex no-wrap q-gutter-sm">
              <q-checkbox
                dense size="md" v-model="store.form.ido" :val="field?.kode"
                @update:model-value="(val)=> {
                  store.ido = val.join(',')
                }"
              />
              <span v-html="field?.poin" />
            </div>
          </div>
        </div>
        <div class="col-6">
          <div><b>Plebitis</b></div>
          <q-separator class="q-my-sm" />
          <div class="column">
            <div v-for="field in filterredMaster?.plebitis" :key="field" class="flex no-wrap q-gutter-sm">
              <q-checkbox
                dense size="md" v-model="store.form.plebitis" :val="field?.kode"
                @update:model-value="(val)=> {
                  store.plebitis = val.join(',')
                }"
              />
              <span v-html="field?.poin" />
            </div>
          </div>
        </div>
        <div class="col-6">
          <div><b>VAP</b></div>
          <q-separator class="q-my-sm" />
          <div class="column">
            <div v-for="field in filterredMaster?.vap" :key="field" class="flex no-wrap q-gutter-sm">
              <q-checkbox
                dense size="md" v-model="store.form.vap" :val="field?.kode"
                @update:model-value="(val)=> {
                  store.vap = val.join(',')
                }"
              />
              <span v-html="field?.poin" />
            </div>
          </div>
        </div>
        <div class="col-6 q-gutter-sm">
          <q-input v-model="store.form.kultur" label="Hasil Kultur" outlined standout="bg-yellow-3" type="textarea" rows="3" />
          <q-input v-model="store.form.antibiotik" label="Antibiotik" outlined standout="bg-yellow-3" type="textarea" rows="3" />
        </div>
      </div>
      <!-- <div class="row">
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
              @clear="store.form.tujuan = ''"
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
              @clear="store.form.perawat1 = ''"
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
              @clear="store.form.perawat2 = ''"
            />
          </div>
          <div class="col-3">
            Dokter
          </div>
          <div class="col-9">
            <app-autocomplete-new
              ref="refDokter"
              :model="store.form.kodedokter"
              label="Dokter"
              autocomplete="nama"
              option-value="kdpegsimrs"
              option-label="nama"
              outlined
              valid
              :source="store.dokters"
              @on-select="(val)=> {
                store.form.kodedokter = val
              }"
              @clear="store.form.kodedokter = ''"
            />
          </div>
        </div>
      </div> -->
      <q-separator class="q-my-md" />
      <div class="row full-width justify-end">
        <q-btn :loading="store.loadingOrder" :disable="store.loadingOrder" label="Simpan" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { useHaisRanapStore } from 'src/stores/simrs/ranap/hais'
import { computed, ref } from 'vue'

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

const store = useHaisRanapStore()
const formRef = ref(null)

const filterredMaster = computed(() => {
  const arr = store.masters
  const isk = arr?.filter(x => x?.kriteria === 'isk') || []
  const iadp = arr?.filter(x => x?.kriteria === 'iadp') || []
  const ido = arr?.filter(x => x?.kriteria === 'ido') || []
  const plebitis = arr?.filter(x => x?.kriteria === 'plebitis') || []
  const vap = arr?.filter(x => x?.kriteria === 'vap') || []
  const obj = {
    isk, iadp, ido, plebitis, vap
  }
  return obj
})

function onSubmit () {
  // console.log('onSubmit', store.form)
  store.saveOrder(props.pasien)
    .then(() => {
      formRef.value.resetValidation()
    })
}

</script>

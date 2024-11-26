<template>
  <div class="fit column scroll">
    <q-form ref="formRef" @submit="onSubmit" class="q-pa-lg">
      <div class="row">
        <div class="row q-col-gutter-sm full-width">
          <div class="col-3">
            Jenis Darah
          </div>
          <q-select
            dense label="Jenis Darah" outlined standout="bg-yellow-3"
            v-model="store.form.jenis" :options="store.optionsJenis" hide-bottom-space class="col-9"
            :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
            option-label="nama" option-value="nama"
            map-options emit-value
          />
          <div class="col-3">
            Golongan Darah
          </div>
          <div class="col-9 q-gutter-sm q-mb-sm">
            <q-radio dense size="sm" v-model="store.form.gol" v-for="item in store.optionsGol" :key="item" :val="item" :label="item" />
          </div>
          <div class="col-3">
            Rhesus
          </div>
          <div class="col-9 q-gutter-sm">
            <q-radio dense size="sm" v-model="store.form.rhesus" v-for="item in store.optionsRhesus" :key="item" :val="item" :label="item" />
          </div>
          <div class="col-3">
            Sifat Permintaan
          </div>
          <div class="col-9 q-gutter-sm">
            <q-select
              dense label="Permintaan" outlined standout="bg-yellow-3"
              v-model="store.form.sifatpermintaan" :options="store.permintaans" hide-bottom-space class="col-9"
              :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
              option-label="nama" option-value="nama"
              map-options emit-value
            />
          </div>
          <div class="col-3">
            Jumlah
          </div>
          <div class="col-9">
            <div class="flex items-center q-gutter-sm">
              <app-input-simrs
                v-model="store.form.jumlah"
                label="Jumlah"
                style="width: 20%;"
                :valid="{ required: true, number: true }"
              />
              <div>Bag</div>
            </div>
          </div>
          <div class="col-3">
            Keterangan
          </div>
          <div class="col-9">
            <div class="flex items-center q-gutter-sm">
              <app-input-simrs
                v-model="store.form.keterangan"
                label="Keterangan"
                style="width: 80%;"
              />
            </div>
          </div>
          <div class="col-3">
            Transfusi Ke
          </div>
          <div class="col-9">
            <div class="flex items-center q-gutter-sm">
              <app-input-simrs
                v-model="store.form.transfusike"
                label="Ke"
                style="width: 20%;"
                :valid="{ required: true, number: true }"
              />
            </div>
          </div>
          <div class="col-3">
            Reaksi stl Transfusi
          </div>
          <div class="col-9">
            <app-autocomplete-new
              ref="refReaksi"
              :model="store.form.reaksi"
              label="Reaksi"
              autocomplete="label"
              option-value="value"
              option-label="label"
              outlined
              :source="store.reaksis"
              @on-select="(val)=> {
                store.form.reaksi=val
              }"
            />
          </div>
          <div class="col-3">
            Dokter yg Meminta
          </div>
          <div class="col-9">
            <app-autocomplete-new
              ref="refPengirim"
              :model="store.form.pengirim"
              label="Dokter"
              autocomplete="nama"
              option-value="kdpegsimrs"
              option-label="nama"
              outlined
              :source="store.dokters"
              @on-select="(val)=> store.form.pengirim=val"
            />
          </div>
          <div class="col-3">
            Pengirim
          </div>
          <div class="col-9">
            <app-autocomplete-new
              ref="refPerawat"
              :model="store.form.perawatpeminta"
              label="Perawat"
              autocomplete="nama"
              option-value="nama"
              option-label="nama"
              outlined
              :source="store.perawats"
              @on-select="(val)=> {
                store.form.perawatpeminta=val
                const ceck = store.perawats.find(item => item.nama === val) ?? null
                store.form.kodeperawat = ceck?.kdpegsimrs
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
import { usePermintaanBankDarahStore } from 'src/stores/simrs/ranap/bankdarah'
import { ref } from 'vue'

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

const store = usePermintaanBankDarahStore()
const formRef = ref(null)

function onSubmit () {
  console.log('onSubmit')
  store.saveOrder(props.pasien)
    .then(() => {
      formRef.value.resetValidation()
    })
}

</script>

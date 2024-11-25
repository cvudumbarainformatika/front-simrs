<template>
  <q-form @submit="onSubmit" class="q-pa-lg">
    <div class="">
      <div class="f-14 text-bold">
        FORM DISCHARGE PLANNING
      </div>
      <div>Rencana Tindak lanjut Awal Masuk Atau Rencana Tindak lanjut (Pulang)</div>
    </div>
    <q-separator class="q-my-md" />
    <div class="row q-mt-lg">
      <div class="col-6">
        Lama Perawatan rata-rata (hari)
      </div>
      <div class="col-6">
        <app-input-simrs v-model="store.form.lamaPerawatan" label="Lama" :valid="{ required: true, number: true}" style="width:100px;" />
      </div>
    </div>

    <div class="row q-mt-sm">
      <div class="col-6">
        Tanggal perencanaan pulang
      </div>
      <div class="col-6">
        <app-input-date
          :model="store.form.tglRencanaPlg"
          label=""
          outlined
          :disable="store.loading"
          :loading="store.loading"
          @set-model="val=>store.form.tglRencanaPlg=val"
        />
      </div>
    </div>

    <div class="row q-mt-sm">
      <div class="col-6">
        Perawatan lanjutan yang diberikan dirumah
        <div class="f-10 text-grey">
          Bisa input <b>Free Text</b> jika tdk ada di pilihan
        </div>
      </div>
      <div class="col-6">
        <q-select
          v-model="store.form.pldiRumah"
          dense
          standout="bg-yellow-3 text-black"
          outlined
          label="Pilih Perawatan Lanjutan"
          :options="store.perawatanLanjutanDirumahs"
          hide-selected
          fill-input
          use-input
          input-debounce="0"
          hide-bottom-space
          hide-dropdown-icon
          @input-value="(val)=> store.form.pldiRumah=val"
        />
      </div>
    </div>
    <div class="row q-mt-sm">
      <div class="col-6">
        Bayi tinggal bersama (jika pasien bayi)
        <!-- <div class="f-10 text-grey">
          Bisa input <b>Free Text</b> jika tdk ada di pilihan
        </div> -->
      </div>
      <div class="col-6">
        <q-select
          v-model="store.form.bayiTglBersama"
          dense
          standout="bg-yellow-3 text-black"
          outlined
          label="Bayi tinggal bersama"
          :options="store.bayiglBersamas"
          hide-selected
          fill-input
          use-input
          input-debounce="0"
          hide-bottom-space
          @input-value="(val)=> store.form.bayiTglBersama=val"
        />
      </div>
    </div>

    <div class="row q-mt-sm">
      <div class="col-6">
        Transportasi yang digunakan
        <div class="f-10 text-grey">
          Bisa input <b>Free Text</b> jika tdk ada di pilihan
        </div>
      </div>
      <div class="col-6">
        <q-select
          v-model="store.form.transportasi"
          dense
          standout="bg-yellow-3 text-black"
          outlined
          label="Pilih Transportasi yg digunakan"
          :options="store.TrasportasiYgDigunakans"
          hide-selected
          fill-input
          use-input
          input-debounce="0"
          hide-bottom-space
          hide-dropdown-icon
          @input-value="(val)=> store.form.transportasi=val"
        />
      </div>
    </div>
    <div class="row q-mt-sm">
      <div class="col-6">
        Anjuran
      </div>
      <div class="col-6">
        <q-input
          v-model="store.form.anjuran" type="textarea" standout="bg-yellow-3 text-black" outlined rows="3"
          :rules="[ val => val && val.length > 0 || 'Anjuran harus diisi']"
        />
      </div>
    </div>

    <div class="row q-mt-sm">
      <div class="col-6">
        Prognosis
        <!-- <div class="f-10 text-grey">
          Bisa input <b>Free Text</b> jika tdk ada di pilihan
        </div> -->
      </div>
      <div class="col-6">
        <q-select
          v-model="store.form.prognosis"
          dense
          standout="bg-yellow-3 text-black"
          outlined
          label="Prognosis"
          :options="store.prognosis"
          option-value="rs1"
          option-label="rs2"
          map-options
          emit-value
          hide-selected
          fill-input
          use-input
          input-debounce="0"
          hide-bottom-space
        />
      </div>
    </div>

    <q-separator class="q-my-md" />

    <div class="row q-mt-sm flex justify-end">
      <q-btn :loading="store.loadingOrder" :disable="store.loadingOrder" label="Simpan" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script setup>
import { useDischargePlanningRanapStore } from 'src/stores/simrs/ranap/dischargeplanning'
import { onMounted } from 'vue'

const store = useDischargePlanningRanapStore()

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  menu: {
    type: Object,
    default: null
  }
})

onMounted(() => {
  Promise.all([
    // store.getmasterprognosis(),
    store.initReset()
  ])
})

const onSubmit = () => {
  // console.log('simpan')
  store.simpandata(props?.pasien)
}
</script>

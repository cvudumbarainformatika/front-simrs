<template>
  <div class="column full-height">
    <q-bar class="col-auto bg-dark text-white">
      <div class="q-py-sm f-14 ">
        Form Permintaan Darah
      </div>
    </q-bar>
    <div class="col full-height">
      <q-scroll-area style="height: calc(100% - 1px);">
        <q-form
          ref="formRef"
          class="row q-pa-md q-col-gutter-xs"
          @submit="saveOrder"
        >
          <div class="col-12 q-mb-sm">
            <q-select
              v-model="store.form.jenisdarah"
              fill-input
              outlined
              standout="bg-yellow-3"
              dense
              emit-value
              map-options
              option-value="rs1"
              option-label="rs2"
              :options="jenisdarah"
              label="Jenis Darah"
              clearable
              :rules="[
                val => !!val || 'Harus diisi'
              ]"
            />
          </div>
          <div class="col-6 q-mb-sm">
            <q-select
              v-model="store.form.golda"
              fill-input
              outlined
              standout="bg-yellow-3"
              dense
              :options="golda"
              label="Golongan Darah"
              clearable
              :rules="[
                val => !!val || 'Harus diisi'
              ]"
            />
          </div>
          <div>
            <q-select
              v-model="store.form.rhesus"
              outlined
              style="width: 300px;"
              standout="bg-yellow-3"
              dense
              :options="rhesus"
              label="Rhesus"
              :rules="[
                val => !!val || 'Harus diisi'
              ]"
            />
          </div>
          <div class="col-6 q-mb-sm">
            <q-input
              v-model="store.form.jumlahbag"
              type="number"
              outlined
              standout="bg-yellow-3"
              dense
              label="Jumlah Bag"
              :rules="[
                val => !!val || 'Harus diisi'
              ]"
            />
          </div>
          <div class="col-6 q-mb-sm">
            <q-select
              v-model="store.form.sifatpermintaan"
              outlined
              standout="bg-yellow-3"
              dense
              emit-value
              map-options
              option-value="rs1"
              option-label="rs2"
              :options="sifatpermintaan"
              label="Sifat Permintaan"
            />
          </div>
          <div class="col-6 q-mb-sm">
            <q-input
              v-model="store.form.transfusike"
              type="number"
              outlined
              standout="bg-yellow-3"
              dense
              label="Trasnfusi Ke"
              :rules="[
                val => !!val || 'Harus diisi'
              ]"
            />
          </div>
          <div class="col-6">
            <q-select
              v-model="store.form.reaksi"
              label="Reaksi"
              dense
              outlined
              standout="bg-yellow-3"
              :options="reaksi"
              :rules="[
                val => !!val || 'Harus diisi'
              ]"
            />
          </div>
          <div class="col-6" v-if="store.form.reaksi === 'Lainnya'">
            <q-input v-model="store.form.sebutkan" label="Sebutkan" dense outlined />
          </div>
          <div class="col-12">
            <q-separator class="q-my-sm" />
          </div>
          <div class="col-12">
            <div class="text-right">
              <q-btn
                label="Simpan & Kirim Permintaan"
                type="submit"
                color="primary"
                :loading="store.loadingSaveBankDarah"
                :disable="store.loadingSaveBankDarah"
              />
            </div>
          </div>
        </q-form>
      </q-scroll-area>
    </div>
  </div>
</template>

<script setup>
import { useBankDarahStore } from 'src/stores/simrs/igd/bankdarah'
import { ref } from 'vue'

const store = useBankDarahStore()
const formRef = ref()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  tujuanambulan: {
    type: Array,
    default: () => []
  },
  perawat: {
    type: Array,
    default: () => []
  }
})

const rhesus = ref(['+', '-'])
const jenisdarah = ref(['Darah biasa (Whole Blood)', 'Sel darah merah yang dipadatkan (Packed Red Cell)', 'Plasma', 'Trombosit', 'Fresh Frozen Plasma'])
const golda = ref(['Belum Diketahui', 'A', 'B', 'AB', 'o'])
const sifatpermintaan = ref(['Biasa', 'Cito', 'Persiapan Operasi'])
const reaksi = ref(['Tidak Ada Reaksi', 'Demam', 'Mengigil', 'Urtikaria/Kemerahan', 'Peningkatan Tekanan Darah', 'Penurunan Tekanan Darah', 'Palpitasi', 'Dispnea', 'Urine Gelap/Kemerahan', 'Pendarahan /DIC', 'Lainnya'])

function saveOrder () {
  formRef.value.reset()
  store.saveOrderDarah(props.pasien).then(() => {
    formRef.value.resetValidation()
  })
}

</script>

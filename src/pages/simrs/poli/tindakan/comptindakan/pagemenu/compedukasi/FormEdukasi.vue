<template>
  <q-card
    flat
    bordered
    square
    class="full-height"
  >
    <div class="full-height column">
      <div class="col-auto bg-primary text-white">
        <q-bar>
          <div>Form Edukasi Pasien</div>
        </q-bar>
      </div>
      <div class="col full-height">
        <q-form
          ref="refForm"
          class="q-pa-sm"
          @submit="onSubmit"
        >
          <q-card-section
            class="scroll"
          >
            <div class="row q-col-gutter-md q-mb-sm items-center">
              <div class="col-4">
                <div class="text-weight-bold">
                  Perlu penerjemah
                </div>
                <div class="text-grey-8 f-10">
                  Pasien Memerlukan Penerjemah ?
                </div>
              </div>
              <div class="col-8">
                <q-option-group
                  v-model="store.form.perlupenerjemah"
                  :options="optionsPerluPenerjemah"
                  color="primary"
                  inline
                  dense
                />
              </div>
            </div>
            <div class="row q-col-gutter-md q-mb-sm items-center">
              <div class="col-4">
                <div class="text-weight-bold">
                  Bahasa Isyarat
                </div>
                <div class="text-grey-8 f-10">
                  Pasien Menggunakan Bahasa Isyarat ?
                </div>
              </div>
              <div class="col-8">
                <q-option-group
                  v-model="store.form.bahasaisyarat"
                  :options="optionsBahasaIsyarat"
                  color="primary"
                  inline
                  dense
                />
              </div>
            </div>
            <div class="row q-col-gutter-md q-mb-sm items-center">
              <div class="col-4">
                <div class="text-weight-bold">
                  Cara Edukasi
                </div>
                <div class="text-grey-8 f-10">
                  Pasien Menggunakan Bahasa Isyarat ?
                </div>
              </div>
              <div class="col-8">
                <q-option-group
                  v-model="store.form.caraedukasi"
                  :options="optionsCaraEdukasi"
                  color="primary"
                  inline
                  dense
                />
              </div>
            </div>
            <div class="row q-col-gutter-md q-mb-sm items-center">
              <div class="col-4">
                <div class="text-weight-bold">
                  Kesediaan menerima edukasi
                </div>
                <div class="text-grey-8 f-10">
                  Pasien menerima edukasi dan informasi dari Petugas ?
                </div>
              </div>
              <div class="col-8">
                <q-option-group
                  v-model="store.form.kesediaan"
                  :options="optionsKesediaan"
                  color="primary"
                  inline
                  dense
                />
              </div>
            </div>
            <div class="row q-col-gutter-md q-mb-sm items-center">
              <div class="col-4">
                <div class="text-weight-bold">
                  Kebutuhan Edukasi
                </div>
                <div class="text-grey-8 f-10">
                  Kebutuhan Edukasi Pasien
                </div>
              </div>
              <div class="col-8">
                <q-checkbox
                  v-for="(al, i) in store.mkebutuhanedukasi"
                  :key="i"
                  v-model="store.selectKebutuhanEdukasi"
                  :val="al?.kebutuhanedukasi"
                  :label="al?.kebutuhanedukasi"
                  size="sm"
                  color="primary"
                  @update:model-value="(val) => store.setForm('kebutuhanedukasi', val.join(', '))"
                />

                <div>
                  <q-input
                    v-model="store.form.kebutuhanedukasi"
                    autogrow
                    label="Kebutuhan Edukasi"
                    readonly
                  />
                </div>
              </div>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section align="right">
            <q-btn
              label="Simpan"
              type="submit"
              color="primary"
            />
          </q-card-section>
        </q-form>
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { useEdukasiPoliStore } from 'src/stores/simrs/pelayanan/poli/edukasi'
import { onMounted, ref } from 'vue'

const store = useEdukasiPoliStore()
const optionsPerluPenerjemah = ref([{ label: 'Ya', value: 'Iya' }, { label: 'Tidak', value: 'Tidak' }])
const optionsBahasaIsyarat = ref([{ label: 'Ya', value: 'Iya' }, { label: 'Tidak', value: 'Tidak' }])
const optionsCaraEdukasi = ref([{ label: 'Lisan', value: 'Lisan' }, { label: 'Tulisan', value: 'Tulisan' }])
const optionsKesediaan = ref([{ label: 'Ya', value: 'Iya' }, { label: 'Tidak', value: 'Tidak' }])
onMounted(() => {
  store.getMasterPenerimaEdukasi()
  store.getMasterKebutuhanEdukasi()
})

const onSubmit = () => {
  console.log('okkk')
}
</script>

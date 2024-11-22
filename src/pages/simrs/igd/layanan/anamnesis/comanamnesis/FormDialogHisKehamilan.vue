<template>
  <q-dialog v-model="storeHistorykehamilan.fixed">
    <q-card>
      <q-form
        ref="refForm"
        @submit="onSubmit"
        class="column full-height"
      >
        <q-card-section>
          <div class="text-h6 text-center">
            Form History Pernikahan
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <div class="row q-gutter-sm">
            <div class="col-12">
              <app-input-date
                :model="storeHistorykehamilan.form.tanggal"
                mask="date"
                outlined
                standout="bg-yellow-3"
                label="Taksiran Partus"
                @set-model="val=>storeHistorykehamilan.form.tanggal=val"
              >
                <template #append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="date">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </app-input-date>
            </div>
            <div class="col-12">
              <q-input v-model="storeHistorykehamilan.form.tempat" outlined dense label="Tempat" />
            </div>
            <div class="col-5">
              <q-input v-model="storeHistorykehamilan.form.umurkehamilan" type="number" outlined dense label="Umur Kehamilan (Bulan)" />
            </div>
            <div class="col-5">
              <q-select
                v-model="storeHistorykehamilan.form.penolong"
                label="Penolong"
                dense
                outlined
                :options="optionPenolong"
                transition-show="flip-up"
                transition-hide="flip-down"
              />
            </div>
            <div class="col-12">
              <q-select
                v-model="storeHistorykehamilan.form.jenispersalinan"
                label="Jenis Persalinan"
                dense
                outlined
                :options="optionjenispersalinan"
                transition-show="flip-up"
                transition-hide="flip-down"
              />
            </div>
            <div class="col-12">
              <q-input v-model="storeHistorykehamilan.form.penyulit" outlined dense label="Penyulit" />
            </div>
            <div class="col-3">
              <q-select
                v-model="storeHistorykehamilan.form.jk"
                label="Jenis Kelamin"
                dense
                outlined
                :options="optionJenisKelamin"
                transition-show="flip-up"
                transition-hide="flip-down"
              />
            </div>
            <div class="col-3">
              <q-input v-model="storeHistorykehamilan.form.bb" outlined dense type="number" label="Berat Badan" />
            </div>
            <div class="col-3">
              <q-input v-model="storeHistorykehamilan.form.pb" outlined dense type="number" label="PB" />
            </div>
            <div class="col-12">
              <q-input v-model="storeHistorykehamilan.form.nifas" outlined dense label="Nifas" />
            </div>
            <div class="col-12">
              <q-input v-model="storeHistorykehamilan.form.keadaananaksekarang" outlined dense label="Keadaan Anak Sekarang" />
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn label="Cancel" color="red" v-close-popup />
          <q-btn label="Simpan" color="primary" type="submit" :loading="storeHistorykehamilan.loading" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useHistoryKehamilanStore } from 'src/stores/simrs/igd/historykehamilan'
import { ref } from 'vue'

const storeHistorykehamilan = useHistoryKehamilanStore()
const refForm = ref()

const optionjenispersalinan = ref(['Abortus', 'Pervaginam', 'Pervaginam Dengan Tindakan', 'Section Caesarea(SC)'])
const optionPenolong = ref(['Dokter', 'Perawat', 'Bidan', 'Dukun'])
const optionJenisKelamin = ref(['Laki-laki', 'Perempuan'])

function onSubmit () {
  storeHistorykehamilan.saveData(props.pasien).then(() => {
    refForm.value.resetValidation()
  })
}

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
</script>

<template>
  <div class="fit column absolute">
    <div class="col full-height ">
      <q-card
        flat
        bordered
        square
        class="full-height "
        style="overflow: hidden;"
      >
        <q-form
          ref="refForm"

          class="column full-height"
        >
          <q-card-section class="q-px-md q-py-xs bg-primary text-white col-auto full-width">
            <div class="row items-center justify-between">
              <div class="f-12 text-weight-bold">
                Form Anamnesis
              </div>
              <div>
                <q-btn
                  flat
                  dense
                  size="md"
                  icon="icon-mat-history"
                >
                  <q-tooltip class="bg-dark text-white">
                    {{ tooltip }}
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
          </q-card-section>
          <q-card-section class="col full-height scroll">
            <div class="row q-col-gutter-sm ">
              <q-input
                v-model="store.form.keluhanutama"
                outlined
                autogrow
                stack-label
                standout="bg-yellow-3"
                label="Keluhan Utama"
                :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                hide-bottom-space
                style="width:50%"
              />
              <q-input
                v-model="store.form.riwayatpenyakitsekarang"
                outlined
                autogrow
                standout="bg-yellow-3"
                label="Riwayat Penyakit Sekarang"
                stack-label
                style="width:50%"
              />
              <q-input
                v-model="store.form.riwayatpenyakit"
                outlined
                autogrow
                standout="bg-yellow-3"
                label="Riwayat Penyakit (Dahulu)"
                stack-label
                style="width:50%"
              />
              <q-input
                v-model="store.form.riwayatpengobatan"
                outlined
                autogrow
                standout="bg-yellow-3"
                style="width:50%"
                label="Riwayat Pengobatan"
                stack-label
              />
              <q-input
                v-model="store.form.riwayatpenyakitkeluarga"
                outlined
                autogrow
                standout="bg-yellow-3"
                style="width:50%"
                label="Riwayat Penyakit Keluarga"
                stack-label
              />
              <q-input
                v-model="store.form.riwayatpekerjaan"
                outlined
                autogrow
                standout="bg-yellow-3"
                style="width:50%"
                label="Riwayat Pekerjaan yg berhubungan dgn zat berbahaya"
                stack-label
              />
              <div class="col-12">
                <div class="text-weight-bold">
                  Riwayat Alergi
                </div>
                <div class="text-grey-8 f-10">
                  Riwayat alergi yang pernah dialami
                  oleh pasien
                </div>
                <q-separator class="q-my-sm" />
                <q-checkbox
                  v-for="(al, i) in store.alergis"
                  :key="i"
                  v-model="store.selection"
                  :val="al"
                  :label="al"
                  color="primary"
                  @update:model-value="updateSelection"
                />
                <q-input
                  v-model="store.form.riwayatalergi"
                  outlined
                  label="Riwayat"
                  standout="bg-yellow-3"
                  readonly
                  class="q-mb-sm hidden"
                  autogrow
                />
                <q-input
                  v-model="store.form.keteranganalergi"
                  outlined
                  autogrow
                  label="Keterangan Alergi"
                  stack-label
                  standout="bg-yellow-3"
                />
              </div>
              <div class="col-12 q-mt-xs">
                <div class="text-weight-bold">
                  Skreening Gizi
                </div>
                <q-separator class="q-my-xs" />
                <div class="row items-center">
                  <div class="col-8">
                    Apakah Ada Penurunan Berat badan yang tidak diinginkan selama 6 Bulan terakhir ?
                  </div>
                  <div class="col-4">
                    <q-option-group
                      v-model="store.form.skreeninggizi"
                      :options="optionSkreening"
                      color="primary"
                      inline
                      dense
                      @update:model-value="lihatPerubahan"
                    />
                  </div>
                </div>
              </div>
              <div class="col-12 q-mt-xs">
                <q-separator class="q-my-xs" />
                <div class="row items-center">
                  <div class="col-8">
                    Apakah Asupan Makan berkurang karena tidak nafsu makan ?
                  </div>
                  <div class="col-4">
                    <q-option-group
                      v-model="store.form.asupanmakan"
                      :options="optionAsupanMakan"
                      color="primary"
                      inline
                      dense
                      @update:model-value="lihatPerubahan"
                    />
                  </div>
                </div>
              </div>
              <div class="col-12">
                <q-separator class="q-my-xs" />
                <div class="row items-center q-col-gutter-sm">
                  <div class="col-2">
                    Kondisi Khusus :
                  </div>
                  <div class="col-8">
                    <q-input
                      v-model="store.form.kondisikhusus"
                      outlined
                      dense
                      standout="bg-yellow-3"
                      label="Kondisi Khusus"
                      stack-label
                      @update:model-value="lihatPerubahan"
                    />
                  </div>
                  <div class="col-12">
                    <q-separator class="q-my-xs" />
                    <div class="flex">
                      Skor Skreening Gizi
                      = <div class="q-mx-sm">
                        <q-badge color="green">
                          {{ store.form.skor }}
                        </q-badge>
                      </div> <div>
                        Keterangan : <q-badge outline color="green">
                          {{ store.keteranganSkorGizi(store.form.skor) }}
                        </q-badge>
                      </div>
                    </div>
                  </div>
                </div>
                <q-separator class="q-my-xs" />
              </div>
            </div>
          </q-card-section>
        </q-form>
        <div style="margin-bottom: 100px;" />
      </q-card>
    </div>
  </div>
</template>
<script setup>
import { useAnamneseKebidananStore } from 'src/stores/simrs/igd/anamnesekebidanan'
import { ref } from 'vue'

const store = useAnamneseKebidananStore()

const optionSkreening = ref([
  { label: 'Iya (2)', value: 2 },
  { label: 'Tidak (0)', value: 0 }
])
const optionAsupanMakan = ref([
  { label: 'Iya (1)', value: 1 },
  { label: 'Tidak (0)', value: 0 }
])

function lihatPerubahan () {
  store.hitungNilaiSkor()
}

function updateSelection (val) {
  // console.log(val.join(','))
  store.setForm('riwayatalergi', val.join(', '))
}

</script>

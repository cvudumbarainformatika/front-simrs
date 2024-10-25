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
          @submit="onSubmit"
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
                  @click="historyOpen"
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
                      Skor Skreening Gizi : <div class="q-mx-sm">
                        <b>{{ store.form.skor }}</b>
                      </div> <div>
                        Keterangan : {{ store.keteranganSkorGizi(store.form.skor) }}
                      </div>
                    </div>
                  </div>
                </div>

                <q-separator class="q-my-xs" />
              </div>
              <div class="col-6">
                <div class="text-weight-bold">
                  Keluhan Nyeri ? <em class="text-primary">{{ store.form.keteranganscorenyeri }}</em>
                  <span class="q-ml-sm">
                    <q-icon
                      size="lg"
                      color="teal"
                      :name="iconNyeri"
                    />
                  </span>
                </div>
                <q-separator class="q-my-xs" />
                <q-slider
                  v-model="store.form.skornyeri"
                  color="primary"
                  thumb-color="primary"
                  label-color="primary"
                  label-text-color="yellow"
                  markers
                  :marker-labels="(val)=> fnMarkerLabel"
                  marker-labels-class="text-primary"
                  label-always
                  switch-label-side
                  :min="0"
                  :max="10"
                  @update:model-value="store.setKeteranganSkornyeri"
                />
              </div>
              <div class="col-12 text-bold">
                Status Fungsional
              </div>
              <div class="col-6">
                - Aktivitas Dan Mobilitas
                <q-input label="Sebutkan" v-if="store.form.aktivitasmobilitas === 'Perlu Bantuan'" />
              </div>
              <div class="col-6">
                <q-option-group
                  v-model="store.form.aktivitasmobilitas"
                  :options="optionAktivitasMobilitas"
                  color="primary"
                  inline
                  dense
                />
              </div>
              <div class="col-6">
                - Alat Bantu Jalan
                <q-input label="Sebutkan" v-if="store.form.aktivitasAlatBnatujalan === 'Ya'" />
              </div>
              <div class="col-6">
                <q-option-group
                  v-model="store.form.aktivitasAlatBnatujalan"
                  :options="optionAlatBantuJalan"
                  color="primary"
                  inline
                  dense
                />
              </div>
              <div class="col-12 text-bold">
                Kebutuhan Komunikasi dan Edukasi
              </div>
              <div class="col-6">
                - Bicara
                <q-input label="Sebutkan" v-if="store.form.kebutuhankomunikasidanedukasi === 'Lainnya'" />
              </div>
              <div class="col-6">
                <q-option-group
                  v-model="store.form.kebutuhankomunikasidanedukasi"
                  :options="optionkebutuhankomunikasidanedukasi"
                  color="primary"
                  inline
                  dense
                />
              </div>
              <div class="col-6">
                - Dibutuhkan Penerjemah
                <q-input label="Sebutkan" v-if="store.form.penerjemah === 'Ya'" />
              </div>
              <div class="col-6">
                <q-option-group
                  v-model="store.form.penerjemah"
                  :options="optionpenerjemah"
                  color="primary"
                  inline
                  dense
                />
              </div>
              <div class="col-6">
                - Bahasa Isyarat
              </div>
              <div class="col-6">
                <q-option-group
                  v-model="store.form.bahasaisyarat"
                  :options="optionbahasaisyarat"
                  color="primary"
                  inline
                  dense
                />
              </div>
              <div class="col-6">
                - Hambatan
                <q-input label="Sebutkan" v-if="store.form.hamabatan === 'Ya'" />
              </div>
              <div class="col-6">
                <q-option-group
                  v-model="store.form.hamabatan"
                  :options="optionhamabatan"
                  color="primary"
                  inline
                  dense
                />
              </div>
              <div class="col-12 text-bold">
                Batuk
              </div>
              <div class="col-6">
                - Riwayat Demam
              </div>
              <div class="col-6">
                <q-option-group
                  v-model="store.form.riwayatdemam"
                  :options="optionriwayatdemam"
                  color="primary"
                  inline
                  dense
                />
              </div>
              <div class="col-6">
                - Berkeringan Pada Malam Hari Tanpa Aktivitas
              </div>
              <div class="col-6">
                <q-option-group
                  v-model="store.form.berkeringat"
                  :options="optionberkeringat"
                  color="primary"
                  inline
                  dense
                />
              </div>
              <div class="col-6">
                - Riwayat Bepergian Dari Daerah Wabah
              </div>
              <div class="col-6">
                <q-option-group
                  v-model="store.form.daerahwabah"
                  :options="optiondaerahwabah"
                  color="primary"
                  inline
                  dense
                />
              </div>
              <div class="col-6">
                - Riwayat Pemakaian Obat Jangka Panjang
              </div>
              <div class="col-6">
                <q-option-group
                  v-model="store.form.obatjangkapanjang"
                  :options="optionobatjangkapanjang"
                  color="primary"
                  inline
                  dense
                />
              </div>
              <div class="col-6">
                - Riwayat BB Turun Tanpa Sebab Yang Diketauhi
              </div>
              <div class="col-6">
                <q-option-group
                  v-model="store.form.bbturun"
                  :options="optionbbturun"
                  color="primary"
                  inline
                  dense
                />
              </div>
            </div>
            <q-separator class="q-my-md" />
            <div
              class="text-right q-mt-md"
              style="margin-bottom: 50px;"
            >
              <app-btn
                color="primary"
                label="Simpan Anamnesis"
                tooltip="Simpan Data"
                type="submit"
                tip
                :loading="store.loadingForm"
              />
            </div>
          </q-card-section>
        </q-form>
        <div style="margin-bottom: 100px;" />
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { useAnamnesis } from 'src/stores/simrs/igd/anamnesis'
import { computed, ref } from 'vue'
const store = useAnamnesis()
const emits = defineEmits(['openHistory'])

const refForm = ref()

const optionSkreening = ref([
  { label: 'Iya (2)', value: 2 },
  { label: 'Tidak (0)', value: 0 }
])
const optionAsupanMakan = ref([
  { label: 'Iya (1)', value: 1 },
  { label: 'Tidak (0)', value: 0 }
])
const optionAktivitasMobilitas = ref([
  { label: 'Mandiri', value: 'Mandiri' },
  { label: 'Perlu Bantuan, Sebutkan', value: 'Perlu Bantuan' }
])
const optionAlatBantuJalan = ref([
  { label: 'Tidak', value: 'Tidak' },
  { label: 'Ya, Sebutkan', value: 'Ya' }
])
const optionkebutuhankomunikasidanedukasi = ref([
  { label: 'Normal', value: 'Normal' },
  { label: 'Gangguan Bicara', value: 'Gangguan Bicara' },
  { label: 'Lainnya', value: 'Lainnya' }
])
const optionpenerjemah = ref([
  { label: 'Tidak', value: 'Tidak' },
  { label: 'Ya', value: 'Ya' }

])
const optionriwayatdemam = ref([
  { label: 'Tidak', value: 'Tidak' },
  { label: 'Ya', value: 'Ya' }

])

const optionbahasaisyarat = ref([
  { label: 'Tidak', value: 'Tidak' },
  { label: 'Ya', value: 'Ya' }
])
const optionhamabatan = ref([
  { label: 'Tidak', value: 'Tidak' },
  { label: 'Ya', value: 'Ya' }
])

const optionberkeringat = ref([
  { label: 'Tidak', value: 'Tidak' },
  { label: 'Ya', value: 'Ya' }
])
const optiondaerahwabah = ref([
  { label: 'Tidak', value: 'Tidak' },
  { label: 'Ya', value: 'Ya' }
])
const optionobatjangkapanjang = ref([
  { label: 'Tidak', value: 'Tidak' },
  { label: 'Ya', value: 'Ya' }
])

const optionbbturun = ref([
  { label: 'Tidak', value: 'Tidak' },
  { label: 'Ya', value: 'Ya' }
])
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  tooltip: {
    type: String,
    default: 'History Pasien'
  }
})
function onSubmit () {
  store.saveData(props.pasien).then(() => {
    refForm.value.resetValidation()
  })
}

function historyOpen () {
  emits('openHistory')
  // store.getHistory(props.pasien?.norm)
}

function lihatPerubahan () {
  store.hitungNilaiSkor()
}

// eslint-disable-next-line no-unused-vars
function updateSelection (val) {
  // console.log(val.join(','))
  store.setForm('riwayatalergi', val.join(', '))
}
const iconNyeri = computed(() => {
  const val = store?.form.skornyeri
  let icon = 'icon-my-emoticon-excited-outline'
  if (val < 2) {
    icon = 'icon-my-emoticon-excited-outline'
  }
  else if (val >= 2 && val < 4) {
    icon = 'icon-my-emoticon-outline'
  }
  else if (val >= 4 && val < 6) {
    icon = 'icon-my-emoticon-neutral-outline'
  }
  else if (val >= 6 && val < 8) {
    icon = 'icon-my-emoticon-confused-outline'
  }
  else if (val >= 8 && val < 10) {
    icon = 'icon-my-emoticon-angry-outline'
  }
  else if (val === 10) {
    icon = 'icon-my-emoticon-cry-outline'
  }

  return icon
})
</script>

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
                  v-for="(al, i) in alergis"
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
                  <div class="col-10">
                    Kondisi Khusus (Penyakit DM/Kemoterapi/haemodialisa/geriatri/imunitas menurun/lain-lain)
                  </div>
                  <div class="col-2">
                    <q-select
                      v-model="store.form.kondisikhusus"
                      transition-show="flip-up"
                      transition-hide="flip-down"
                      option-label="label"
                      option-value="optionKondisiKhusus.value"
                      dense
                      outlined
                      :options="optionKondisiKhusus"
                      @update:model-value="(val) => lihatPerubahan(val, 1)"
                    />
                    <!-- <q-input
                      v-model="store.form.kondisikhusus"
                      outlined
                      dense
                      standout="bg-yellow-3"
                      label="Kondisi Khusus"
                      stack-label
                      @update:model-value="lihatPerubahan"
                    /> -->
                    <!-- <q-select
                      v-model="store.form.kondisikhusus"
                      :option-label="label"
                      :option-value="value"
                      dense
                      outlined
                      :options="optionKondisiKhusus"
                      @update:model-value="lihatPerubahan"
                    /> -->
                  </div>
                  <div class="col-12">
                    <q-separator class="q-my-xs" />
                    <div class="flex">
                      Skor Skreening Gizi
                      = <div class="q-mx-sm">
                        <q-badge color="green" v-if="store.form.skor < 2">
                          {{ store.form.skor }}
                        </q-badge>
                        <q-badge color="red" v-else>
                          {{ store.form.skor }}
                        </q-badge>
                      </div> <div>
                        Keterangan :
                        <q-badge outline color="green" v-if="store.form.skor < 2">
                          {{ store.keteranganSkorGizi(store.form.skor) }}
                        </q-badge>
                        <q-badge outline color="red" v-else>
                          {{ store.keteranganSkorGizi(store.form.skor) }}
                        </q-badge>
                      </div>
                    </div>
                  </div>
                </div>
                <q-separator class="q-my-xs" />
              </div>
              <div class="col-12">
                <q-radio v-model="store.form.metode" val="nrt" label="Numeric Rating Scale" @update:model-value="(val) => chagngereset(val)" />
                <q-radio v-model="store.form.metode" val="bps" label="Behavioral Pain Scale (BPS)" @update:model-value="(val) => chagngereset(val)" />
                <q-radio v-model="store.form.metode" val="nips" label="NIPS (Neonatus Infant Pain Scale)" @update:model-value="(val) => chagngereset(val)" />
              </div>

              <div class="col-12" v-if="store.form.metode === 'nrt'">
                <div class="col-12 text-weight-bold">
                  <span>Assesmen Nyeri</span>
                </div>
                <div class="col-12">
                  <div>
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
              </div>
              <br>
              <div v-if="store.form.metode === 'bps'" class="col-12">
                <div class="col-6 text-bold">
                  Behavioral Pain Scale (BPS)
                </div>
                <div class="col-3">
                  - Ekspresi Wajah
                </div>
                <div class="col-9">
                  <q-select
                    v-model="store.form.ekspresiwajah"
                    transition-show="flip-up"
                    transition-hide="flip-down"
                    dense
                    outlined
                    :options="ekspresiwajah"
                    @update:model-value="(val) => nilaiexpresiwajah(val)"
                  />
                </div>
                <div class="col-2">
                  - Gerakan Tangan
                </div>
                <div class="col-10">
                  <q-select dense outlined v-model="store.form.gerakantangan" :options="gerakantangan" @update:model-value="(val) => nilaigerakantangan(val)" />
                </div>
                <div class="col-4">
                  - Kepatuhan terhadap ventilasi mekanik
                </div>
                <div class="col-8">
                  <q-select dense outlined v-model="store.form.kepatuhanventilasimekanik" :options="kepatuhanventilasimekanik" @update:model-value="(val) => nilaikepatuhanventilasi(val)" />
                </div>
                <div class="col-12">
                  <q-separator class="q-my-xs" />
                  <div class="flex">
                    Skor Nyeri (BPS)
                    = <div class="q-mx-sm">
                      <q-badge color="green">
                        {{ store.form.scroebps }}
                      </q-badge>
                    </div> <div>
                      Keterangan : <q-badge outline color="green">
                        {{ store.form.ketscorebps }}
                      </q-badge>
                    </div>
                  </div>
                  <q-separator class="q-my-xs" />
                </div>
              </div>
              <div v-if="store.form.metode === 'nips'" class="col-12">
                <div class="col-6 text-bold">
                  NIPS (Neonatus Infant Pain Scale)
                </div>
                <div class="col-6">
                  - Ekspresi Wajah
                </div>
                <div class="col-6">
                  <q-select dense outlined v-model="store.form.ekspresiwajahnips" :options="ekspresiwajahnips" @update:model-value="(val) => nilaiekspresiwajahnips(val)" />
                </div>
                <div class="col-6">
                  - Menangis
                </div>
                <div class="col-6">
                  <q-select dense outlined v-model="store.form.menangis" :options="menangis" @update:model-value="(val) => nilaimenangis(val)" />
                </div>
                <div class="col-6">
                  - Pola Nafas
                </div>
                <div class="col-6">
                  <q-select dense outlined v-model="store.form.polanafas" :options="polanafas" @update:model-value="(val) => nilaipolanafas(val)" />
                </div>
                <div class="col-6">
                  - Lengan
                </div>
                <div class="col-6">
                  <q-select dense outlined v-model="store.form.lengan" :options="lengan" @update:model-value="(val) => nilailengan(val)" />
                </div>
                <div class="col-6">
                  - Kaki
                </div>
                <div class="col-6">
                  <q-select dense outlined v-model="store.form.kaki" :options="kaki" @update:model-value="(val) => nilaikaki(val)" />
                </div>
                <div class="col-6">
                  - Keadaan Rangsangan
                </div>
                <div class="col-6">
                  <q-select dense outlined v-model="store.form.keadaanrangsangan" :options="keadaanrangsangan" @update:model-value="(val) => nilairangsangan(val)" />
                </div>
                <div class="col-12">
                  <q-separator class="q-my-xs" />
                  <div class="flex">
                    Skor Nyeri (NIPS)
                    = <div class="q-mx-sm">
                      <q-badge color="green">
                        {{ store.form.scroenips }}
                      </q-badge>
                    </div> <div>
                      Keterangan : <q-badge outline color="green">
                        {{ store.form.ketscorenips }}
                      </q-badge>
                    </div>
                  </div>
                  <q-separator class="q-my-xs" />
                </div>
              </div>
              <div class="col-6 text-bold">
                Lokasi Nyeri
              </div>
              <div class="col-6">
                <q-input dense outlined v-model="store.form.lokasinyeri" />
              </div>
              <div class="col-6 text-bold">
                Durasi Nyeri
              </div>
              <div class="col-6">
                <q-input dense outlined v-model="store.form.durasinyeri" />
              </div>
              <div class="col-6 text-bold">
                Penyebab Nyeri
              </div>
              <div class="col-6">
                <q-input dense outlined v-model="store.form.penyebabnyeri" />
              </div>
              <div class="col-6 text-bold">
                Frekwensi Nyeri
              </div>
              <div class="col-6">
                <q-input dense outlined v-model="store.form.frekwensinyeri" />
              </div>
              <div class="col-6 text-bold">
                Nyeri Hilang
              </div>
              <div class="col-6">
                <!-- <q-select dense outlined v-model="store.form.nyerihilang" :options="nyerihilang" /> -->
                <q-checkbox
                  v-for="(al, i) in nyerihilang"
                  :key="i"
                  v-model="store.pilihnyerihilang"
                  :val="al"
                  :label="al"
                  color="primary"
                  @update:model-value="updateNyerihilang"
                /> <q-input label="Sebutkan" dense v-model="store.form.sebutkannyerihilang" v-if="store?.pilihnyerihilang?.includes('Lainnya')" />
              </div>
              <div class="col-12 text-bold">
                Status Fungsional
              </div>
              <div class="col-6">
                - Aktivitas Dan Mobilitas
              </div>
              <div class="col-6">
                <q-option-group
                  v-model="store.form.aktivitasmobilitas"
                  :options="optionAktivitasMobilitas"
                  color="primary"
                  inline
                  dense
                  @update:model-value="clearsebutkanperlubanuan"
                /><q-input label="Sebutkan" dense v-model="store.form.sebutkanperlubanuan" v-if="store.form.aktivitasmobilitas === 'Perlu Bantuan'" />
              </div>
              <div class="col-6">
                - Alat Bantu Jalan
              </div>
              <div class="col-6">
                <q-option-group
                  v-model="store.form.aktivitasAlatBnatujalan"
                  :options="optionAlatBantuJalan"
                  color="primary"
                  inline
                  dense
                  @update:model-value="clearsebutkanalatbantujalan"
                /><q-input label="Sebutkan" dense v-model="store.form.sebutkanalatbantujalan" v-if="store.form.aktivitasAlatBnatujalan === 'Ya'" />
              </div>
              <div class="col-12 text-bold">
                Kebutuhan Komunikasi dan Edukasi
              </div>
              <div class="col-6">
                - Bicara
              </div>
              <div class="col-6">
                <q-option-group
                  v-model="store.form.kebutuhankomunikasidanedukasi"
                  :options="optionkebutuhankomunikasidanedukasi"
                  color="primary"
                  inline
                  dense
                  @update:model-value="clearsebutkankomunaksilainnya"
                /><q-input v-model="store.form.sebutkankomunaksilainnya" dense label="Sebutkan" v-if="store.form.kebutuhankomunikasidanedukasi === 'Lainnya'" />
              </div>
              <div class="col-6">
                - Dibutuhkan Penerjemah
              </div>
              <div class="col-6">
                <q-option-group
                  v-model="store.form.penerjemah"
                  :options="optionpenerjemah"
                  color="primary"
                  inline
                  dense
                  @update:model-value="clearsebutkanpenerjemah"
                /><q-input v-model="store.form.sebutkanpenerjemah" dense label="Sebutkan" v-if="store.form.penerjemah === 'Ya'" />
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
              </div>
              <div class="col-6">
                <q-option-group
                  v-model="store.form.hamabatan"
                  :options="optionhamabatan"
                  color="primary"
                  inline
                  dense
                  @update:model-value="clearsebutkanhambatan"
                /><q-input v-model="store.form.sebutkanhambatan" dense label="Sebutkan" v-if="store.form.hamabatan === 'Ya'" />
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
                  v-model="store.form.riwayatbepergian"
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
// console.log('sa', store.form)
// const metode = ref('nrt')

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

const ekspresiwajah = ref([
  'Santai, Tanpa Ketegangan',
  'Sedikit Tegang, Seperti Dahi Berkerut',
  'Sedikit Tegang, Mata Tertutup Rapat',
  'Ekpresi Menunjukan Nyeri Parah, Seperti Menangis Atau Mengerutkan Wajah'
])

const gerakantangan = ref([
  'Tidak Ada Gerakan',
  'Ada Gerakan Ringan, Seperti Mengerutkan atau Menggerakan Telapak Tangan Tanpa Arah',
  'Ada Gerakan Kuat, Seperti Menarik Tangan Atau Berusaha Melepas Alat Medis',
  'Gerakan Tidak Terkendali, Seperti Upaya Melarikan Diri'
])

const kepatuhanventilasimekanik = ref([
  'Toleran, Tidak Ada Perlawanan',
  'Sedikit Tidak Toleran, Batuk Sekali atau Melawan Sedikit',
  'Sering Batuk atau Melawan Ventilasi',
  'Tidak Toleran Sama Sekali, Melawan Ventilasi Secara Konstan'
])

const ekspresiwajahnips = ref([
  'Santai',
  'Meringis'
])

const menangis = ref([
  'Tidak Menangis',
  'Merengek/Merintih',
  'Menangis'
])

const polanafas = ref([
  'Santai',
  'Perubahan Pola Nafas'
])

const lengan = ref([
  'Santai',
  'Flexi/Extensi'
])

const alergis = ref(['Obat', 'Makanan', 'Udara', 'Lain-lain', 'Tidak ada Alergi'])

const kaki = ref([
  'Santai',
  'Flexi/Extensi'
])
const keadaanrangsangan = ref([
  'Tertidur/Bangun',
  'Rewel'
])

const nyerihilang = ref([
  'Minum Obat', 'Istirahat', 'Mendengarkan Musik', 'Berubah Posisi Tidur', 'Lainnya'
])

const optionKondisiKhusus = ref(
  [
    { label: 'Tidak', value: 0 },
    { label: 'Ya', value: 2 }
  ]
)

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

function lihatPerubahan (val, x) {
  if (x === 1) {
    store.form.kondisikhusus = val?.label
    store.form.skorkondisikhusus = val?.value
  }
  store.hitungNilaiSkor()
}

function nilaiexpresiwajah (val) {
  if (val === 'Santai, Tanpa Ketegangan') {
    store.nilaiekspresiwajah = 1
  }
  else if (val === 'Sedikit Tegang, Seperti Dahi Berkerut') {
    store.nilaiekspresiwajah = 2
  }
  else if (val === 'Sedikit Tegang, Mata Tertutup Rapat') {
    store.nilaiekspresiwajah = 3
  }
  else if (val === 'Ekpresi Menunjukan Nyeri Parah, Seperti Menangis Atau Mengerutkan Wajah') {
    store.nilaiekspresiwajah = 4
  }

  hitungscorebps()
}

function nilaigerakantangan (val) {
  if (val === 'Tidak Ada Gerakan') {
    store.nilaigerakantangan = 1
  }
  else if (val === 'Ada Gerakan Ringan, Seperti Mengerutkan atau Menggerakan Telapak Tangan Tanpa Arah') {
    store.nilaigerakantangan = 2
  }
  else if (val === 'Ada Gerakan Kuat, Seperti Menarik Tangan Atau Berusaha Melepas Alat Medis') {
    store.nilaigerakantangan = 3
  }
  else if (val === 'Gerakan Tidak Terkendali, Seperti Upaya Melarikan Diri') {
    store.nilaigerakantangan = 4
  }

  hitungscorebps()
}

function nilaikepatuhanventilasi (val) {
  if (val === 'Toleran, Tidak Ada Perlawanan') {
    store.nilaikepatuhanventilasi = 1
  }
  else if (val === 'Sedikit Tidak Toleran, Batuk Sekali atau Melawan Sedikit') {
    store.nilaikepatuhanventilasi = 2
  }
  else if (val === 'Sering Batuk atau Melawan Ventilasi') {
    store.nilaikepatuhanventilasi = 3
  }
  else if (val === 'Tidak Toleran Sama Sekali, Melawan Ventilasi Secara Konstan') {
    store.nilaikepatuhanventilasi = 4
  }

  hitungscorebps()
}

function hitungscorebps () {
  // store.form.scroebps = parseInt(store.nilaiekspresiwajah) + parseInt(store.nilaigerakantangan) + parseInt(store.nilaikepatuhanventilasi)

  store.form.scroebps = parseInt(store.nilaiekspresiwajah) + parseInt(store.nilaigerakantangan) + parseInt(store.nilaikepatuhanventilasi)
  if (store.form.scroebps === 3) {
    store.form.ketscorebps = 'Tidak Ada Nyeri'
  }
  else if (store.form.scroebps >= 4 && store.form.scroebps <= 6) {
    store.form.ketscorebps = 'Nyeri Ringan'
  }
  else if (store.form.scroebps >= 7 && store.form.scroebps <= 9) {
    store.form.ketscorebps = 'Nyeri Sedang'
  }
  else if (store.form.scroebps >= 10 && store.form.scroebps <= 12) {
    store.form.ketscorebps = 'Nyeri Berat'
  }
}

function nilaiekspresiwajahnips (val) {
  if (val === 'Santai') {
    store.nilaiekspresiwajahnips = 0
  }
  else if (val === 'Meringis') {
    store.nilaiekspresiwajahnips = 1
  }
  hitungscorenipsb()
}

function nilaimenangis (val) {
  if (val === 'Tidak Menangis') {
    store.nilaimenangis = 0
  }
  else if (val === 'Merengek/Merintih') {
    store.nilaimenangis = 1
  }
  else if (val === 'Menangis') {
    store.nilaimenangis = 2
  }
  hitungscorenipsb()
}

function nilaipolanafas (val) {
  if (val === 'Santai') {
    store.nilaipolanafas = 0
  }
  else if (val === 'Perubahan Pola Nafas') {
    store.nilaipolanafas = 1
  }
  hitungscorenipsb()
}

function nilailengan (val) {
  if (val === 'Santai') {
    store.nilailengan = 0
  }
  else if (val === 'Flexi/Extensi') {
    store.nilailengan = 1
  }
  hitungscorenipsb()
}

function nilaikaki (val) {
  if (val === 'Santai') {
    store.nilaikaki = 0
  }
  else if (val === 'Flexi/Extensi') {
    store.nilaikaki = 1
  }
  hitungscorenipsb()
}

function nilairangsangan (val) {
  if (val === 'Tertidur/Bangun') {
    store.nilairangsangan = 0
  }
  else if (val === '') {
    store.nilairangsangan = 1
  }
  hitungscorenipsb()
}

function hitungscorenipsb () {
  store.form.scroenips = parseInt(store.nilaiekspresiwajahnips) + parseInt(store.nilaimenangis) + parseInt(store.nilaipolanafas) +
  parseInt(store.nilailengan) + parseInt(store.nilaikaki) + parseInt(store.nilairangsangan)

  if (store.form.scroenips === 0) {
    store.form.ketscorenips = 'Tidak Nyeri'
  }
  else if (store.form.scroenips <= 2) {
    store.form.ketscorenips = 'Tidak Nyaman'
  }
  else if (store.form.scroenips > 2 && store.form.scroenips <= 4) {
    store.form.ketscorenips = 'Nyeri Ringan - Sedang'
  }
  else if (store.form.scroenips >= 5 && store.form.scroenips <= 8) {
    store.form.ketscorenips = 'Nyeri Sedang - Berat'
  }
}
// eslint-disable-next-line no-unused-vars
function updateSelection (val) {
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

function chagngereset (val) {
  // console.log('sasasa', val)
  if (val === 'bps') {
    resetnrt()
    resetnips()
  }
  else if (val === 'nrt') {
    resetnips()
    resetbps()
  }
  else if (val === 'nips') {
    resetnrt()
    resetbps()
  }
}

function resetbps () {
  store.form.ekspresiwajah = ''
  store.form.gerakantangan = ''
  store.form.kepatuhanventilasimekanik = ''
  store.form.scroebps = 0
  store.form.ketscorebps = ''
}

function resetnrt () {
  store.form.keteranganscorenyeri = 'tidak ada nyeri'
  store.form.skornyeri = 0
}

function resetnips () {
  store.form.ekspresiwajahnips = ''
  store.form.menangis = ''
  store.form.polanafas = ''
  store.form.lengan = ''
  store.form.kaki = ''
  store.form.keadaanrangsangan = ''
  store.form.scroenips = 0
  store.form.ketscorenips = ''
}

function updateNyerihilang (val) {
  store.setForm('nyerihilang', val.join(', '))
}
function clearsebutkanperlubanuan () {
  store.form.sebutkanperlubanuan = ''
}

function clearsebutkanalatbantujalan () {
  store.form.sebutkanalatbantujalan = ''
}

function clearsebutkankomunaksilainnya () {
  store.form.sebutkankomunaksilainnya = ''
}

function clearsebutkanpenerjemah () {
  store.form.sebutkanpenerjemah = ''
}

function clearsebutkanhambatan () {
  store.form.sebutkanhambatan = ''
}

store.form.metode = 'nrt'
</script>

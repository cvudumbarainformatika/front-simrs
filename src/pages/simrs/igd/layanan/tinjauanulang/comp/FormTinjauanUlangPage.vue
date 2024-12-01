<template>
  <q-dialog v-model="store.basic" transition-show="rotate" transition-hide="rotate">
    <q-card>
      <q-card-section>
        <div class="text-h6">
          Form Peninjauan Ulang (FPU)
        </div>
        <q-separator />
      </q-card-section>
      <q-form
        ref="refForm"
        @submit="onSubmit"
        class="column full-height"
      >
        <q-card-section class="flat">
          <div class="row">
            <div class="col-12 q-py-sm">
              <q-input v-model="store.form.keluhan" label="Keluhan" dense outlined />
            </div>
          </div>
          <div class="row ">
            <div class="col-2 q-pr-xs">
              <q-input v-model="store.form.nadi" label="Nadi" dense outlined type="number" @update:model-value="scorenadi()" :rules="[val => !!val || 'Harap Diisi terlebih dahulu']" />
            </div>
            <div class="col-2 q-pr-xs">
              <q-input v-model="store.form.pernapasanx" label="Pernafasan" dense outlined type="number" @update:model-value="scorepernapasanx()" :rules="[val => !!val || 'Harap Diisi terlebih dahulu']" />
            </div>
            <div class="col-2 q-pr-xs">
              <q-input v-model="store.form.sistole" label="Sistole" dense outlined type="number" @update:model-value="scoresistole()" :rules="[val => !!val || 'Harap Diisi terlebih dahulu']" />
            </div>
            <div class="col-2 q-pr-xs">
              <q-input v-model="store.form.diastole" label="Diastole" dense outlined type="number" @update:model-value="scorediastole()" :rules="[val => !!val || 'Harap Diisi terlebih dahulu']" />
            </div>
            <div class="col-2 q-pr-xs">
              <q-input v-model="store.form.suhu" label="Suhu" dense outlined type="number" @update:model-value="scoresuhu()" :rules="[val => !!val || 'Harap Diisi terlebih dahulu']" />
            </div>
            <div class="col-2 q-pr-xs">
              <q-input v-model="store.form.spo2" label="SPo2 (%)" dense outlined type="number" @update:model-value="scorespo2()" :rules="[val => !!val || 'Harap Diisi terlebih dahulu']" />
            </div>
          </div>
          <div class="row ">
            <div class="col-2 q-pr-xs text-center">
              {{ store.form.scorenadi }}
            </div>
            <div class="col-2 q-pr-xs text-center">
              {{ store.form.scorepernapasanx }}
            </div>
            <div class="col-2 q-pr-xs text-center">
              {{ store.form.scoresistole }}
            </div>
            <div class="col-2 q-pr-xs text-center">
              {{ store.form.scorediastole }}
            </div>
            <div class="col-2 q-pr-xs text-center">
              {{ store.form.scoresuhu }}
            </div>
            <div class="col-2 q-pr-xs text-center">
              {{ store.form.scorespo2 }}
            </div>
          </div>
          <div class="row q-py-sm">
            <div class="col-12 q-pr-xs">
              <q-select v-model="store.form.kesadaran" label="Kesadaran" :options="optionkesadaran" dense outlined />
            </div>
          </div>
          <div class="row">
            <div class="col-4 q-pr-xs">
              <q-select v-model="store.form.eye" label="Eye" :options="optioneye" dense outlined />
            </div>
            <div class="col-4 q-pr-xs">
              <q-select v-model="store.form.verbal" label="Verbal" :options="optionverbal" dense outlined />
            </div>
            <div class="col-4 q-pr-xs">
              <q-select v-model="store.form.motorik" label="Motorik" :options="optionmotorik" dense outlined />
            </div>
          </div>
          <q-separator class="q-mt-sm q-mb-sm" />
          <div class="row" v-if="store.form.metodenyeri === 'bps'">
            <div class="col-12 q-mb-sm">
              <q-select
                v-model="store.form.ekspresiwajahbps"
                label="Ekspresi Wajah"
                transition-show="flip-up"
                transition-hide="flip-down"
                dense
                outlined
                :options="ekspresiwajah"
                @update:model-value="(val) => nilaiexpresiwajah(val)"
              />
            </div>
            <div class="col-12 q-mb-sm">
              <q-select dense outlined v-model="store.form.gerakantangan" :options="gerakantangan" @update:model-value="(val) => nilaigerakantangan(val)" />
            </div>
            <div class="col-12">
              <q-select dense outlined v-model="store.form.kepatuhanventilasimekanik" :options="kepatuhanventilasimekanik" @update:model-value="(val) => nilaikepatuhanventilasi(val)" />
            </div>
            <div class="col-12">
              <q-separator class="q-my-xs" />
              <div class="flex">
                Skor Nyeri (BPS)
                = <div class="q-mx-sm">
                  <q-badge :color="store.form.colorscorebps">
                    {{ store.form.scroebps }}
                  </q-badge>
                </div> <div>
                  Keterangan : <q-badge outline :color="store.form.colorscorebps">
                    {{ store.form.ketscorebps }}
                  </q-badge>
                </div>
              </div>
              <q-separator class="q-my-xs" />
            </div>
          </div>
          <div class="row" v-else-if="store.form.metodenyeri === 'nips'">
            <div class="col-12 text-bold">
              NIPS (Neonatus Infant Pain Scale)
            </div>
            <div class="col-6">
              - Eksprsi Wajah
            </div>
            <div class="col-6 q-py-sm">
              <q-select dense outlined v-model="store.form.ekspresiwajahnips" :options="ekspresiwajahnips" @update:model-value="(val) => nilaiekspresiwajahnips(val)" />
            </div>
            <div class="col-6">
              - Menangis
            </div>
            <div class="col-6 q-py-sm">
              <q-select dense outlined v-model="store.form.menangis" :options="menangis" @update:model-value="(val) => nilaimenangis(val)" />
            </div>
            <div class="col-6">
              - Pola Nafas
            </div>
            <div class="col-6 q-py-sm">
              <q-select dense outlined v-model="store.form.polanafas" :options="polanafas" @update:model-value="(val) => nilaipolanafas(val)" />
            </div>
            <div class="col-6">
              - Lengan
            </div>
            <div class="col-6 q-py-sm">
              <q-select dense outlined v-model="store.form.lengan" :options="lengan" @update:model-value="(val) => nilailengan(val)" />
            </div>
            <div class="col-6">
              - Kaki
            </div>
            <div class="col-6 q-py-sm">
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
                  <q-badge :color="store.form.colorscorenips">
                    {{ store.form.scroenips }}
                  </q-badge>
                </div> <div>
                  Keterangan : <q-badge outline :color="store.form.colorscorenips">
                    {{ store.form.ketscorenips }}
                  </q-badge>
                </div>
              </div>
              <q-separator class="q-my-xs" />
            </div>
          </div>
          <div class="row" v-else>
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
          <!-- <q-separator class="q-mt-sm" /> -->
          <br>
          <div class="row">
            <div class="col-12 q-py-sm">
              <q-select v-model="store.form.keadaanpupil" dense outlined label="Keadaan Pupil" :options="optionspupil" />
            </div>
          </div>
          <div class="row">
            <div class="col-6 q-pr-xs">
              <q-select v-model="store.form.reflekmatakirikecahaya" label="Mata Kiri" dense outlined :options="optionsyreflekcahaya" />
            </div>
            <div class="col-6 q-pr-xs">
              <q-select v-model="store.form.reflekmatakanankecahaya" label="Mata Kanan" dense outlined :options="optionsyreflekcahaya" />
            </div>
          </div>
          <div class="row">
            <div class="col-6 q-py-sm q-pr-xs">
              <q-input mask="##.#" v-model="store.form.diamterkiri" label="Diameter Kiri" dense outlined />
            </div>
            <div class="col-6 q-py-sm">
              <q-input mask="##.#" v-model="store.form.diamterkanan" label="Diameter Kanan" dense outlined />
            </div>
          </div>
          <div class="row">
            <div class="col-3 q-py-sm q-pr-xs">
              <q-input mask="##.#" v-model="store.form.output" label="Output (Cc)" dense outlined />
            </div>
            <div class="col-9 q-py-sm">
              <q-input v-model="store.form.keterangan" label="Keterangan" dense outlined />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Batal" color="red" v-close-popup />
          <q-btn type="submit" label="Simpan" color="primary" :loading="store.loadingForm" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useTinjauanUlangStore } from 'src/stores/simrs/igd/tinjauanulang'
import { computed, ref } from 'vue'

const store = useTinjauanUlangStore()

const refForm = ref('')
const optioneye = ref(['0', '1', '2', '3', '4'])
const optionverbal = ref(['0', '1', '2', '3', '4', '5'])
const optionmotorik = ref(['0', '1', '2', '3', '4', '5', '6'])

const optionkesadaran = ref(['Alert', 'Verbal', 'Pain', 'Unrespon'])

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  loadingaja: {
    type: Boolean,
    default: false
  }
})

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

const kaki = ref([
  'Santai',
  'Flexi/Extensi'
])
const keadaanrangsangan = ref([
  'Tertidur/Bangun',
  'Rewel'
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

const optionspupil = ref(['Isokor', 'Anisokor', 'Medriasis', 'Miosis', 'Pin Poin'])
const optionsyreflekcahaya = ref(['Positif', 'Negativ'])

function scorenadi () {
  const umurleng = props.pasien?.usia.split(' ')
  const umur = parseInt(umurleng[0])
  const umurbln = parseInt(umurleng[2])

  if (store.pasienhamil === 1) {
    if (store.form.nadi < 50) {
      store.form.scorenadi = 3
    }
    else if (store.form.nadi >= 50 && store.form.nadi <= 60) {
      store.form.scorenadi = 2
    }
    else if (store.form.nadi >= 61 && store.form.nadi <= 100) {
      store.form.scorenadi = 0
    }
    else if (store.form.nadi >= 101 && store.form.nadi <= 110) {
      store.form.scorenadi = 1
    }
    else if (store.form.nadi >= 111 && store.form.nadi <= 120) {
      store.form.scorenadi = 2
    }
    else if (store.form.nadi > 120) {
      store.form.scorenadi = 3
    }
  }
  else if (umur === 0 && umurbln >= 0 && umurbln <= 3) {
    if (store.form.nadi < 80) {
      store.form.scorenadi = 3
    }
    else if (store.form.nadi < 90) {
      store.form.scorenadi = 2
    }
    else if (store.form.nadi < 110) {
      store.form.scorenadi = 1
    }
    else if (store.form.nadi >= 110 && store.form.nadi <= 150) {
      store.form.scorenadi = 0
    }
    else if (store.form.nadi > 150 && store.form.nadi <= 180) {
      store.form.scorenadi = 1
    }
    else if (store.form.nadi > 180 && store.form.nadi <= 190) {
      store.form.scorenadi = 2
    }
    else if (store.form.nadi > 190) {
      store.form.scorenadi = 3
    }
  }
  else if (umur === 0 && umurbln >= 4 && umurbln <= 11) {
    if (store.form.nadi < 70) {
      store.form.scorenadi = 3
    }
    else if (store.form.nadi < 100) {
      store.form.scorenadi = 1
    }
    else if (store.form.nadi >= 100 && store.form.nadi <= 150) {
      store.form.scorenadi = 0
    }
    else if (store.form.nadi > 150 && store.form.nadi <= 170) {
      store.form.scorenadi = 1
    }
    else if (store.form.nadi > 170 && store.form.nadi <= 180) {
      store.form.scorenadi = 2
    }
    else if (store.form.nadi > 180) {
      store.form.scorenadi = 3
    }
  }
  else if (umur >= 1 && umur <= 4) {
    if (store.form.nadi < 60) {
      store.form.scorenadi = 3
    }
    else if (store.form.nadi < 80) {
      store.form.scorenadi = 1
    }
    else if (store.form.nadi >= 80 && store.form.nadi <= 130) {
      store.form.scorenadi = 0
    }
    else if (store.form.nadi > 130 && store.form.nadi <= 150) {
      store.form.scorenadi = 1
    }
    else if (store.form.nadi > 150 && store.form.nadi <= 170) {
      store.form.scorenadi = 2
    }
    else if (store.form.nadi > 170) {
      store.form.scorenadi = 3
    }
  }
  else if (umur >= 5 && umur <= 11) {
    if (store.form.nadi < 50) {
      store.form.scorenadi = 3
    }
    else if (store.form.nadi < 70) {
      store.form.scorenadi = 1
    }
    else if (store.form.nadi >= 70 && store.form.nadi <= 110) {
      store.form.scorenadi = 0
    }
    else if (store.form.nadi > 110 && store.form.nadi <= 130) {
      store.form.scorenadi = 1
    }
    else if (store.form.nadi > 130 && store.form.nadi <= 150) {
      store.form.scorenadi = 2
    }
    else if (store.form.nadi > 150) {
      store.form.scorenadi = 3
    }
  }
  else if (umur >= 12 && umur <= 17) {
    if (store.form.nadi < 40) {
      store.form.scorenadi = 3
    }
    else if (store.form.nadi < 60) {
      store.form.scorenadi = 1
    }
    else if (store.form.nadi >= 60 && store.form.nadi <= 100) {
      store.form.scorenadi = 0
    }
    else if (store.form.nadi > 100 && store.form.nadi <= 120) {
      store.form.scorenadi = 1
    }
    else if (store.form.nadi > 120 && store.form.nadi <= 140) {
      store.form.scorenadi = 2
    }
    else if (store.form.nadi > 140) {
      store.form.scorenadi = 3
    }
  }
  else if (umur > 17) {
    if (store.form.nadi <= 40) {
      store.form.scorenadi = 3
    }
    else if (store.form.nadi >= 41 && store.form.nadi <= 50) {
      store.form.scorenadi = 1
    }
    else if (store.form.nadi >= 51 && store.form.nadi <= 90) {
      store.form.scorenadi = 0
    }
    else if (store.form.nadi >= 91 && store.form.nadi <= 110) {
      store.form.scorenadi = 1
    }
    else if (store.form.nadi >= 111 && store.form.nadi <= 130) {
      store.form.scorenadi = 2
    }
    else if (store.form.nadi > 131) {
      store.form.scorenadi = 3
    }
  }
}

function scorepernapasanx () {
  const umurleng = props.pasien?.usia.split(' ')
  const umur = parseInt(umurleng[0])
  const umurbln = parseInt(umurleng[2])

  if (store.pasienhamil === 1) {
    if (store.form.pernapasanx >= 1 && store.form.pernapasanx < 12) {
      store.form.scorepernapasanx = 3
    }
    else if (store.form.pernapasanx >= 12 && store.form.pernapasanx <= 20) {
      store.form.scorepernapasanx = 0
    }
    else if (store.form.pernapasanx >= 21 && store.form.pernapasanx <= 25) {
      store.form.scorepernapasanx = 2
    }
    else if (store.form.pernapasanx > 25) {
      store.form.scorepernapasanx = 3
    }
  }
  else {
    if (umur === 0 && umurbln >= 0 && umurbln <= 3) {
      if (store.form.pernapasanx >= 1 && store.form.pernapasanx < 15) {
        store.form.scorepernapasanx = 3
      }
      else if (store.form.pernapasanx >= 15 && store.form.pernapasanx < 20) {
        store.form.scorepernapasanx = 2
      }
      else if (store.form.pernapasanx >= 20 && store.form.pernapasanx < 30) {
        store.form.scorepernapasanx = 1
      }
      else if (store.form.pernapasanx >= 30 && store.form.pernapasanx <= 60) {
        store.form.scorepernapasanx = 0
      }
      else if (store.form.pernapasanx > 60 && store.form.pernapasanx <= 70) {
        store.form.scorepernapasanx = 1
      }
      else if (store.form.pernapasanx > 70 && store.form.pernapasanx <= 80) {
        store.form.scorepernapasanx = 2
      }
      else if (store.form.pernapasanx > 80) {
        store.form.scorepernapasanx = 3
      }
    }
    else if (umur === 0 && umurbln >= 4 && umurbln <= 11) {
      if (store.form.pernapasanx >= 1 && store.form.pernapasanx < 15) {
        store.form.scorepernapasanx = 3
      }
      else if (store.form.pernapasanx >= 15 && store.form.pernapasanx < 30) {
        store.form.scorepernapasanx = 1
      }
      else if (store.form.pernapasanx >= 30 && store.form.pernapasanx <= 50) {
        store.form.scorepernapasanx = 0
      }
      else if (store.form.pernapasanx >= 50 && store.form.pernapasanx <= 60) {
        store.form.scorepernapasanx = 1
      }
      else if (store.form.pernapasanx > 60 && store.form.pernapasanx <= 70) {
        store.form.scorepernapasanx = 2
      }
      else if (store.form.pernapasanx > 70) {
        store.form.scorepernapasanx = 3
      }
    }
    else if (umur >= 1 && umur <= 4) {
      if (store.form.pernapasanx >= 1 && store.form.pernapasanx < 15) {
        store.form.scorepernapasanx = 3
      }
      else if (store.form.pernapasanx >= 15 && store.form.pernapasanx < 20) {
        store.form.scorepernapasanx = 1
      }
      else if (store.form.pernapasanx >= 20 && store.form.pernapasanx <= 40) {
        store.form.scorepernapasanx = 0
      }
      else if (store.form.pernapasanx > 40 && store.form.pernapasanx <= 50) {
        store.form.scorepernapasanx = 1
      }
      else if (store.form.pernapasanx > 50 && store.form.pernapasanx <= 60) {
        store.form.scorepernapasanx = 2
      }
      else if (store.form.pernapasanx > 60) {
        store.form.scorepernapasanx = 3
      }
    }
    else if (umur >= 5 && umur <= 11) {
      if (store.form.pernapasanx >= 1 && store.form.pernapasanx < 10) {
        store.form.scorepernapasanx = 3
      }
      else if (store.form.pernapasanx >= 10 && store.form.pernapasanx < 15) {
        store.form.scorepernapasanx = 1
      }
      else if (store.form.pernapasanx >= 15 && store.form.pernapasanx <= 30) {
        store.form.scorepernapasanx = 0
      }
      else if (store.form.pernapasanx > 30 && store.form.pernapasanx <= 40) {
        store.form.scorepernapasanx = 1
      }
      else if (store.form.pernapasanx > 40 && store.form.pernapasanx <= 50) {
        store.form.scorepernapasanx = 2
      }
      else if (store.form.pernapasanx > 50) {
        store.form.scorepernapasanx = 3
      }
    }
    else if (umur >= 12 && umur <= 17) {
      if (store.form.pernapasanx >= 1 && store.form.pernapasanx < 10) {
        store.form.scorepernapasanx = 3
      }
      else if (store.form.pernapasanx >= 10 && store.form.pernapasanx < 15) {
        store.form.scorepernapasanx = 1
      }
      else if (store.form.pernapasanx >= 15 && store.form.pernapasanx <= 20) {
        store.form.scorepernapasanx = 0
      }
      else if (store.form.pernapasanx > 20 && store.form.pernapasanx <= 25) {
        store.form.scorepernapasanx = 1
      }
      else if (store.form.pernapasanx > 25 && store.form.pernapasanx <= 30) {
        store.form.scorepernapasanx = 2
      }
      else if (store.form.pernapasanx > 30) {
        store.form.scorepernapasanx = 3
      }
    }
    else if (umur > 17) {
      if (store.form.pernapasanx >= 1 && store.form.pernapasanx <= 8) {
        store.form.scorepernapasanx = 3
      }
      else if (store.form.pernapasanx >= 9 && store.form.pernapasanx <= 11) {
        store.form.scorepernapasanx = 1
      }
      else if (store.form.pernapasanx >= 12 && store.form.pernapasanx <= 20) {
        store.form.scorepernapasanx = 0
      }
      else if (store.form.pernapasanx >= 21 && store.form.pernapasanx <= 24) {
        store.form.scorepernapasanx = 2
      }
      else if (store.form.pernapasanx >= 25) {
        store.form.scorepernapasanx = 3
      }
    }
  }
}

function scoresistole () {
  const umurleng = props.pasien?.usia.split(' ')
  const umur = parseInt(umurleng[0])
  // const umurbln = parseInt(umurleng[2])

  if (store.pasienhamil === 1) {
    if (store.form.sistole < 90) {
      store.form.scoresistole = 3
    }
    else if (store.form.sistole >= 90 && store.form.sistole <= 140) {
      store.form.scoresistole = 0
    }
    else if (store.form.sistole >= 141 && store.form.sistole <= 150) {
      store.form.scoresistole = 1
    }
    else if (store.form.sistole >= 151 && store.form.sistole <= 160) {
      store.form.scoresistole = 2
    }
    else if (store.form.sistole > 160) {
      store.form.scoresistole = 3
    }
  }
  else {
    if (umur >= 1 && umur <= 4) {
      if (store.form.sistole < 70) {
        store.form.scoresistole = 3
      }
      else if (store.form.sistole < 80) {
        store.form.scoresistole = 2
      }
      else if (store.form.sistole < 90) {
        store.form.scoresistole = 1
      }
      else if (store.form.sistole >= 90 && store.form.sistole <= 110) {
        store.form.scoresistole = 0
      }
      else if (store.form.sistole > 110 && store.form.sistole <= 120) {
        store.form.scoresistole = 1
      }
      else if (store.form.sistole > 120 && store.form.sistole <= 130) {
        store.form.scoresistole = 2
      }
      else if (store.form.sistole > 130) {
        store.form.scoresistole = 3
      }
    }
    else if (umur >= 5 && umur <= 11) {
      if (store.form.sistole < 80) {
        store.form.scoresistole = 3
      }
      else if (store.form.sistole < 90) {
        store.form.scoresistole = 1
      }
      else if (store.form.sistole >= 90 && store.form.sistole <= 120) {
        store.form.scoresistole = 0
      }
      else if (store.form.sistole > 120 && store.form.sistole <= 130) {
        store.form.scoresistole = 1
      }
      else if (store.form.sistole > 130 && store.form.sistole <= 140) {
        store.form.scoresistole = 2
      }
      else if (store.form.sistole > 140) {
        store.form.scoresistole = 3
      }
    }
    else if (umur >= 12 && umur <= 17) {
      if (store.form.sistole < 90) {
        store.form.scoresistole = 3
      }
      else if (store.form.sistole < 110) {
        store.form.scoresistole = 1
      }
      else if (store.form.sistole >= 110 && store.form.sistole <= 120) {
        store.form.scoresistole = 0
      }
      else if (store.form.sistole > 120 && store.form.sistole <= 130) {
        store.form.scoresistole = 1
      }
      else if (store.form.sistole > 130 && store.form.sistole <= 150) {
        store.form.scoresistole = 2
      }
      else if (store.form.sistole > 150) {
        store.form.scoresistole = 3
      }
    }
    else if (umur > 17) {
      if (store.form.sistole <= 90) {
        store.form.scoresistole = 3
      }
      else if (store.form.sistole >= 91 && store.form.sistole <= 100) {
        store.form.scoresistole = 2
      }
      else if (store.form.sistole >= 101 && store.form.sistole <= 110) {
        store.form.scoresistole = 1
      }
      else if (store.form.sistole >= 111 && store.form.sistole <= 219) {
        store.form.scoresistole = 0
      }
    }
  }
}

function scoresuhu () {
  const umurleng = props.pasien?.usia.split(' ')
  const umur = parseInt(umurleng[0])
  // const umurbln = parseInt(umurleng[2])

  if (store.pasienhamil === 1) {
    if (store.form.suhu >= 1 && store.form.suhu < 36) {
      store.form.scoresuhu = 3
    }
    else if (store.form.suhu >= 36.1 && store.form.suhu <= 37.2) {
      store.form.scoresuhu = 0
    }
    else if (store.form.suhu >= 37.3 && store.form.suhu <= 37.7) {
      store.form.scoresuhu = 2
    }
    else if (store.form.suhu > 37.7) {
      store.form.scoresuhu = 3
    }
  }
  else if (umur >= 17) {
    if (store.form.suhu >= 1 && store.form.suhu < 35) {
      store.form.scoresuhu = 3
    }
    else if (store.form.suhu >= 35.1 && store.form.suhu <= 36) {
      store.form.scoresuhu = 1
    }
    else if (store.form.suhu >= 36.1 && store.form.suhu <= 38) {
      store.form.scoresuhu = 0
    }
    else if (store.form.suhu >= 38.1 && store.form.suhu <= 39) {
      store.form.scoresuhu = 1
    }
    else if (store.form.suhu >= 39.1) {
      store.form.scoresuhu = 2
    }
  }
  else if (umur < 17) {
    store.form.scoresuhu = 0
  }
}

function scorediastole () {
  // const umurleng = props.pasien?.usia.split(' ')
  // const umur = parseInt(umurleng[0])
  // const umurbln = parseInt(umurleng[2])

  if (store.pasienhamil === 1) {
    if (store.form.diastole >= 60 && store.form.diastole <= 90) {
      store.form.scorediastole = 0
    }
    else if (store.form.diastole >= 91 && store.form.diastole <= 100) {
      store.form.scorediastole = 1
    }
    else if (store.form.diastole >= 101 && store.form.diastole <= 110) {
      store.form.scorediastole = 2
    }
    else if (store.form.diastole > 110) {
      store.form.scorediastole = 3
    }
    else {
      store.form.scorediastole = 0
    }
  }
  else {
    store.form.scorediastole = 0
  }
}

function scorespo2 () {
  const umurleng = props.pasien?.usia.split(' ')
  const umur = parseInt(umurleng[0])
  const umurbln = parseInt(umurleng[2])

  if (store.pasienhamil === 1) {
    if (store.form.spo2 >= 1 && store.form.spo2 < 92) {
      store.form.scorespo2 = 3
    }
    else if (store.form.spo2 >= 92 && store.form.spo2 <= 95) {
      store.form.scorespo2 = 2
    }
    else if (store.form.spo2 > 95) {
      store.form.scorespo2 = 0
    }
  }
  else {
    if (umur === 0 && umurbln >= 0 && umurbln <= 3) {
      if (store.form.spo2 >= 1 && store.form.spo2 <= 85) {
        store.form.scorespo2 = 3
      }
      else if (store.form.spo2 >= 86 && store.form.spo2 <= 89) {
        store.form.scorespo2 = 2
      }
      else if (store.form.spo2 >= 90 && store.form.spo2 <= 93) {
        store.form.scorespo2 = 1
      }
      else if (store.form.spo2 >= 94) {
        store.form.scorespo2 = 0
      }
    }
    else if (umur === 0 && umurbln >= 4 && umurbln <= 11) {
      if (store.form.spo2 >= 1 && store.form.spo2 <= 85) {
        store.form.scorespo2 = 3
      }
      else if (store.form.spo2 >= 86 && store.form.spo2 <= 89) {
        store.form.scorespo2 = 2
      }
      else if (store.form.spo2 >= 90 && store.form.spo2 <= 93) {
        store.form.scorespo2 = 1
      }
      else if (store.form.spo2 >= 94) {
        store.form.scorespo2 = 0
      }
    }
    else if (umur >= 1 && umur <= 4) {
      if (store.form.spo2 >= 1 && store.form.spo2 <= 85) {
        store.form.scorespo2 = 3
      }
      else if (store.form.spo2 >= 86 && store.form.spo2 <= 89) {
        store.form.scorespo2 = 2
      }
      else if (store.form.spo2 >= 90 && store.form.spo2 <= 93) {
        store.form.scorespo2 = 1
      }
      else if (store.form.spo2 >= 94) {
        store.form.scorespo2 = 0
      }
    }
    else if (umur >= 5 && umur <= 11) {
      if (store.form.spo2 >= 1 && store.form.spo2 <= 85) {
        store.form.scorespo2 = 3
      }
      else if (store.form.spo2 >= 86 && store.form.spo2 <= 89) {
        store.form.scorespo2 = 2
      }
      else if (store.form.spo2 >= 90 && store.form.spo2 <= 93) {
        store.form.scorespo2 = 1
      }
      else if (store.form.spo2 >= 94) {
        store.form.scorespo2 = 0
      }
    }
    else if (umur >= 12 && umur <= 17) {
      if (store.form.spo2 >= 1 && store.form.spo2 <= 85) {
        store.form.scorespo2 = 3
      }
      else if (store.form.spo2 >= 86 && store.form.spo2 <= 89) {
        store.form.scorespo2 = 2
      }
      else if (store.form.spo2 >= 90 && store.form.spo2 <= 93) {
        store.form.scorespo2 = 1
      }
      else if (store.form.spo2 >= 94) {
        store.form.scorespo2 = 0
      }
    }
    else if (umur > 17) {
      if (store.form.spo2 >= 1 && store.form.spo2 <= 91) {
        store.form.scorespo2 = 3
      }
      else if (store.form.spo2 >= 92 && store.form.spo2 <= 93) {
        store.form.scorespo2 = 2
      }
      else if (store.form.spo2 >= 94 && store.form.spo2 <= 95) {
        store.form.scorespo2 = 1
      }
      else if (store.form.spo2 >= 96) {
        store.form.scorespo2 = 0
      }
    }
  }
}
// onMounted(() => {
//   if (props?.pasien?.anamnesis[0]?.anamnesebps !== null || props?.pasien?.anamnesis?.anamnesebps !== undefined) {
//     store.form.metodenyeri = 'bps'
//   }
//   else if (props?.pasien?.anamnesis[0]?.anamnesenips !== null || props?.pasien?.anamnesis?.anamnesenips !== undefined) {
//     store.form.metodenyeri = 'nips'
//   }
//   else {
//     store.form.metodenyeri = 'nrs'
//   }
// })

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
    store.form.colorscorenips = 'green'
  }
  else if (store.form.scroenips <= 2) {
    store.form.ketscorenips = 'Tidak Nyaman'
    store.form.colorscorenips = 'green-10'
  }
  else if (store.form.scroenips > 2 && store.form.scroenips <= 4) {
    store.form.ketscorenips = 'Nyeri Ringan - Sedang'
    store.form.colorscorenips = 'orange'
  }
  else if (store.form.scroenips >= 5 && store.form.scroenips <= 8) {
    store.form.ketscorenips = 'Nyeri Sedang - Berat'
    store.form.colorscorenips = 'red'
  }
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
    store.form.colorscorebps = 'green'
  }
  else if (store.form.scroebps >= 4 && store.form.scroebps <= 6) {
    store.form.ketscorebps = 'Nyeri Ringan'
    store.form.colorscorebps = 'green-10'
  }
  else if (store.form.scroebps >= 7 && store.form.scroebps <= 9) {
    store.form.ketscorebps = 'Nyeri Sedang'
    store.form.colorscorebps = 'orange'
  }
  else if (store.form.scroebps >= 10 && store.form.scroebps <= 12) {
    store.form.ketscorebps = 'Nyeri Berat'
    store.form.colorscorebps = 'red'
  }
}

function onSubmit () {
  store.saveData(props.pasien).then(() => {
    refForm.value.resetValidation()
  })
}
</script>

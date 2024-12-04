<template>
  <!-- <q-card> -->
  <q-bar
    class="bg-dark text-white z-top"
    style="width: inherit;"
  >
    <div class="f-12 text-bold">
      Data Tinjauan Ulang
    </div>
    <div class="f-12 text-bold">
      <q-btn round color="dark" icon="icon-mat-post_add" size="sm" @click="showdialog()" />
    </div>
    <div class="f-12 text-bold">
      <q-radio v-model="layout" label=" Dense layout" val="dense" />
      <q-radio v-model="layout" label=" Comfortable layout" val="comfortable" />
      <q-radio v-model="layout" label=" Loose layout" val="loose" />
    </div>
    <q-space />
  </q-bar>
  <div
    v-if="loadingaja"
    class="column full-height flex-center"
  >
    <div class="text-h5 text-dark">
      Harap Tunggu .....
    </div>
    <div class="text-white">
      Sinkron Data Ke DATABASE
    </div>
  </div>
  <div
    v-if="pasien?.tinjauanulang?.length <= 0"
    class="column full-height flex-center"
  >
    <div class="text-h5 text-dark">
      Belum Ada data tersimpan
    </div>
  </div>
  <div v-else class="q-px-xl full-height scroll">
    <q-timeline :layout="layout" color="orange">
      <q-timeline-entry heading>
        <q-item-label> Tinjauan Ulang</q-item-label>
        <q-badge text-color="dark" color="indigo" outline>
          <q-item-label> Kunjungan Pasien => {{ pasien?.noreg }} <br> Nama : {{ pasien?.nama }} <br> No. RM : {{ pasien?.norm }}</q-item-label>
        </q-badge>
      </q-timeline-entry>

      <q-timeline-entry
        v-for="(item , n) in lists"
        :key="n"
        :title="jamFullFormat(item.tgl)"
        :subtitle="dateFullFormat(item?.tgl)"
        icon="icon-mat-done_all"
        :side="carinjilnap(n++)"
      >
        <div>
          <q-card dark bordered class="bg-cyan-9 my-card full-width">
            <q-card-section>
              <div class="row">
                <div class="col-12">
                  Keluhan : {{ item?.keluhan ?? '-' }}
                </div>
              </div>
              <div class="row">
                <div class="col-3">
                  Nadi :  {{ item?.nadi }} ({{ item?.scorenadi }})
                </div>
                <div class="col-3">
                  Pernapasan : {{ item?.pernapasanx ?? '-' }} ({{ item?.scorepernapasanx ?? '-' }})
                </div>
                <div class="col-3">
                  Sistole : {{ item?.sistole ?? '-' }} ({{ item?.scoresistole ?? '-' }})
                </div>
                <div class="col-3">
                  Diastole : {{ item?.diastole ?? '-' }} ({{ item?.scorediastole ?? '-' }})
                </div>
                <div class="col-3">
                  Suhu : {{ item?.suhu ?? '-' }} ({{ item?.scoresuhu ?? '-' }})
                </div>
                <div class="col-3">
                  Spo2 :  {{ item?.spo2 ?? '-' }} ({{ item?.scorespo2 ?? '-' }})
                </div>
              </div>
              <q-separator dark inset />
              <div v-if="item?.tinjauanulangnips !== null">
                <div class="row">
                  <div class="col-4">
                    Ekspresi Wajah : {{ item?.tinjauanulangnips?.ekspresiwajahnips ?? '-' }}
                  </div>
                  <div class="col-4">
                    Menangis : {{ item?.tinjauanulangnips?.menangis ?? '-' }}
                  </div>
                  <div class="col-4">
                    Pola Nafas : {{ item?.tinjauanulangnips?.polanafas ?? '-' }}
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">
                    Lengan : {{ item?.tinjauanulangnips?.lengan ?? '-' }}
                  </div>
                  <div class="col-4">
                    Kaki : {{ item?.tinjauanulangnips?.kaki ?? '-' }}
                  </div>
                  <div class="col-4">
                    Keadaan Rangsangan : {{ item?.tinjauanulangnips?.keadaanrangsangan ?? '-' }}
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    Skor Nyeri : {{ item?.tinjauanulangnips?.scroenips ?? '-' }} Keterangan : {{ item?.tinjauanulangnips?.ketscorenips ?? '-' }}
                  </div>
                </div>
              </div>
              <q-separator dark inset />
              <div v-if="item?.tinjauanulangbps !== null">
                <div class="row">
                  <div class="col-12">
                    Ekspresi Wajah : {{ item?.tinjauanulangbps?.ekspresiwajah ?? '-' }}
                  </div>
                  <div class="col-12">
                    Gerakan Tangan : {{ item?.tinjauanulangbps?.gerakantangan ?? '-' }}
                  </div>
                  <div class="col-12">
                    Kepatuhan terhadap ventilasi mekanik : {{ item?.tinjauanulangbps?.kepatuhanventilasimekanik ?? '-' }}
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    Skor Nyeri : {{ item?.tinjauanulangbps?.skor ?? '-' }} Keterangan : {{ item?.tinjauanulangbps?.keterangan_skor ?? '-' }}
                  </div>
                </div>
              </div>
              <div v-if="item?.skornyeri !== null">
                <div class="row">
                  <div class="col-12">
                    Skor Nyeri : {{ item?.skornyeri ?? '-' }} Keterangan : {{ item?.keteranganscorenyeri ?? '-' }}
                  </div>
                </div>
              </div>
              <q-separator dark inset />
              <div class="row">
                <div class="col-3">
                  Kesadaran :    {{ item?.kesadaran ?? '-' }}
                </div>
                <div class="col-3">
                  Eye : {{ item?.eye ?? '-' }}
                </div>
                <div class="col-3">
                  Verbal : {{ item?.verbal ?? '-' }}
                </div>
                <div class="col-3">
                  Motorik : {{ item?.motorik ?? '-' }}
                </div>
              </div>
              <q-separator dark inset />
              <div class="row">
                <div class="col-12">
                  Keadaan Pupil : {{ item?.keadaan_pupil ?? '-' }}
                </div>
                <div class="col-6">
                  Mata Kiri :  {{ item?.reflekcahaya_matakiri }}
                </div>
                <div class="col-6">
                  Mata Kanan : {{ item?.reflekcahaya_matakanan ?? '-' }}
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  Diameter Kiri : {{ item?.diamter_matakiri ?? '-' }}
                </div>
                <div class="col-6">
                  Diameter Kanan : {{ item?.diamter_matakanan ?? '-' }}
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  Output : {{ item?.output ?? '-' }}
                </div>
                <div class="col-6">
                  Keterangan: {{ item?.keterangan ?? '-' }}
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-timeline-entry>
    </q-timeline>
  </div>
  <!-- </q-card> -->
  <FormTinjauanUlangPage :pasien="props.pasien" />
  <br>
</template>
<script setup>
import { useTinjauanUlangStore } from 'src/stores/simrs/igd/tinjauanulang'
import FormTinjauanUlangPage from './FormTinjauanUlangPage.vue'
import { computed, ref } from 'vue'
import { date } from 'quasar'

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

const layout = ref('loose')

const store = useTinjauanUlangStore()

function carinjilnap (val) {
  // console.log('val', val)
  if (val % 2 === 0) {
    return 'left'
  }
  else {
    return 'right'
  }
}

function showdialog () {
  store.basic = true
}

const dateFullFormat = (val) => {
  return date.formatDate(val, 'DD MMMM YYYY')
}
const jamFullFormat = (val) => {
  return date.formatDate(val, 'H:m:s')
}

const lists = computed(() => {
  const arr = props.pasien?.tinjauanulang
  return arr?.sort((a, b) => { return b.id - a.id })
})
</script>

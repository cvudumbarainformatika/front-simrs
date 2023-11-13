<template>
  <div>
    <div class="row q-col-gutter-sm q-mb-sm">
      <div class="col-6">
        <app-input
          v-model="nomor"
          label="Nomor"
          outlined
          dense
        />
      </div>
      <div class="col-6">
        <app-input
          v-model="pekerjaan"
          label="Pekerjaan"
          outlined
          dense
        />
      </div>
    </div>
    <div class="row q-col-gutter-sm q-mb-sm">
      <div class="col-6">
        <app-input
          v-model="minta"
          label="Atas Permintaan"
          outlined
          dense
        />
      </div>
      <div class="col-6">
        <app-input-date
          v-model="tgl"
          label="Tanggal"
          outlined
          dense
          @set-model="(val)=>{tgl=val}"
        />
      </div>
    </div>
    <div class="row q-col-gutter-sm q-mb-sm">
      <div class="col-6">
        <app-input
          v-model="nomor1"
          label="Nomor Bawah"
          outlined
          dense
        />
      </div>
      <div class="col-6">
        <q-option-group
          v-model="doc"
          :options="documents"
          inline
        />
      </div>
    </div>
    <div class="row q-col-gutter-sm q-mb-sm">
      <div class="col-6">
        <app-input
          v-model="penglihatan.kiri"
          label="Penglihatan Kiri"
          outlined
          dense
        />
      </div>
      <div class="col-6">
        <app-input
          v-model="penglihatan.kanan"
          label="Penglihatan Kanan"
          outlined
          dense
        />
      </div>
    </div>
    <div class="row q-col-gutter-sm q-mb-sm">
      <div class="col-6">
        <app-input
          v-model="pendengaran.kiri"
          label="Pendengaran Kiri"
          outlined
          dense
        />
      </div>
      <div class="col-6">
        <app-input
          v-model="pendengaran.kanan"
          label="Pendengaran Kanan"
          outlined
          dense
        />
      </div>
    </div>
    <div class="row q-col-gutter-sm q-mb-sm">
      <div class="col-6">
        <app-input
          v-model="warna"
          label="Perbedaan warna"
          outlined
          dense
        />
      </div>
      <div class="col-6">
        <app-input
          v-model="tinggi"
          label="Tinggi Badan"
          outlined
          dense
        />
      </div>
    </div>
    <div class="row q-col-gutter-sm q-mb-sm">
      <div class="col-6">
        <app-input
          v-model="berat"
          label="Berat Badan"
          outlined
          dense
        />
      </div>
      <div class="col-6">
        <app-input
          v-model="golDar"
          label="Golongan Darah"
          outlined
          dense
        />
      </div>
    </div>
    <div class="row q-col-gutter-sm q-mb-sm">
      <div class="col-12">
        <app-input
          v-model="syarat"
          label="Syarat"
          outlined
          dense
        />
      </div>
    </div>
    <q-bar
      dense
      class="bg-white q-mt-sm"
    >
      <q-space />
      <q-btn
        ref="refPrint"
        v-print="printObj"
        unelevated
        color="dark"
        round
        size="sm"
        icon="icon-mat-print"
      >
        <q-tooltip
          class="primary"
          :offset="[10, 10]"
        >
          Print
        </q-tooltip>
      </q-btn>
    </q-bar>
    <div
      id="printMe"
      class="full-width"
    >
      <KopSuratPage />
      <!-- isi -->
      <div>
        <div class="row justify-center ">
          <div class="endas f-24">
            Surat Keterangan Dokter
          </div>
        </div>
        <div class="row justify-center ">
          <div class="q-mr-sm">
            Nomor
          </div>
          :
          <div class="endas">
            {{ nomor }}
          </div>
        </div>
        <div class="q-my-sm indent">
          Yang bertanda tangan dibawah ini <b>Dokter RSUD. dr. MOHAMAD SALEH KOTA PROBOLINGGO</b>
          dalam hal ini menjalankan tugasnya dengan mengingat sumpah yang telah di ucapkan waktu menerima jabatannya,
          dengan ini menerangkan bahwa ia telah memeriksa dengan teliti seorang :
        </div>
        <div
          class="row q-my-sm"
        >
          <div
            class="col-4"
            style="text-indent:50px;"
          >
            Nama
          </div>
          <div class="col-8">
            {{ pasien?.nama }}
          </div>
        </div>
        <div
          class="row q-my-sm"
        >
          <div
            class="col-4"
            style="text-indent:50px;"
          >
            Umur
          </div>
          <div class="col-8">
            {{ pasien?.usia }}
          </div>
        </div>
        <div
          class="row q-my-sm items-center"
        >
          <div
            class="col-4"
            style="text-indent:50px;"
          >
            Pekerjaan
          </div>
          <div class="col-8">
            {{ pekerjaan }}
          </div>
        </div>
        <div
          class="row q-my-sm"
        >
          <div
            class="col-4"
            style="text-indent:50px;"
          >
            Alamat
          </div>
          <div class="col-8">
            {{ pasien?.alamat }}
          </div>
        </div>
        <div>
          Atas Pemintaan <b>{{ minta }}</b> dengan surat tanggal <b>{{ date.formatDate(tgl,'DD MMMM YYYY') }} </b>
          No. <b>{{ nomor1 }}</b>
          dan berpendapat bahwa yang di periksa tersebut <b>{{ doc }}</b> untuk syarat : <b>{{ syarat }}</b>
        </div>
        <q-separator
          class="q-my-md"
          color="dark"
          size="2px"
        />
        <div class="row">
          <div class="col-12 text-weight-bold">
            KETERANGAN :
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <!-- kiri -->
            <div class="row q-mb-xs">
              <div class="col-6">
                <div class="row justfy-between">
                  <div class="col">
                    Penglihatan
                  </div>
                  <div class="col">
                    <div class="row justfy-between">
                      <div class="col">
                        :  kiri
                      </div>
                      <div class="col">
                        VOS
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="row justfy-between">
                  <div class="col text-weight-bold">
                    {{ penglihatan.kiri }}
                  </div>
                </div>
              </div>
            </div>
            <div class="row q-mb-xs">
              <div class="col-6">
                <div class="row justfy-between">
                  <div class="col" />
                  <div class="col">
                    <div class="row justfy-between">
                      <div class="col">
                        :  kanan
                      </div>
                      <div class="col">
                        VOD
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="row justfy-between">
                  <div class="col text-weight-bold">
                    {{ penglihatan.kanan }}
                  </div>
                </div>
              </div>
            </div>
            <div class="row q-mb-xs">
              <div class="col-6">
                <div class="row justfy-between">
                  <div class="col">
                    Pendengaran
                  </div>
                  <div class="col">
                    :  kiri
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="row justfy-between">
                  <div class="col text-weight-bold">
                    {{ pendengaran.kiri }}
                  </div>
                </div>
              </div>
            </div>
            <div class="row q-mb-xs">
              <div class="col-6">
                <div class="row justfy-between">
                  <div class="col" />
                  <div class="col">
                    :  kanan
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="row justfy-between">
                  <div class="col text-weight-bold">
                    {{ pendengaran.kanan }}
                  </div>
                </div>
              </div>
            </div>
            <div class="row q-mb-xs">
              <div class="col-6">
                <div class="row justfy-between">
                  <div class="col">
                    Perbedaan
                  </div>
                  <div class="col">
                    :  warna
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="row justfy-between">
                  <div class="col text-weight-bold">
                    {{ warna }}
                  </div>
                </div>
              </div>
            </div>
            <div class="row q-mb-xs">
              <div class="col-6">
                <div class="row justfy-between">
                  <div class="col">
                    Tinggi
                  </div>
                  <div class="col">
                    :  badan
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="row justfy-between">
                  <div class="col text-weight-bold">
                    {{ tinggi }}
                  </div>
                </div>
              </div>
            </div>
            <div class="row q-mb-xs">
              <div class="col-6">
                <div class="row justfy-between">
                  <div class="col">
                    Berat
                  </div>
                  <div class="col">
                    :  badan
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="row justfy-between">
                  <div class="col text-weight-bold">
                    {{ berat }}
                  </div>
                </div>
              </div>
            </div>
            <div class="row q-mb-xs">
              <div class="col-6">
                <div class="row justfy-between">
                  <div class="col">
                    Golongan
                  </div>
                  <div class="col">
                    :  darah
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="row justfy-between">
                  <div class="col text-weight-bold">
                    {{ golDar }}
                  </div>
                </div>
              </div>
            </div>
            <div class="row q-mt-md q-mb-xs justify-center">
              <div class="">
                <img
                  src="~assets/images/paru.png"
                  spinner-color="white"
                  style="height: 6cm; max-width: 12cm"
                >
              </div>
            </div>
          </div>
          <div class="col-6">
            <!-- TT -->
            <div class="">
              <div class="row">
                <div class="col-12 text-center">
                  Probolinggo, {{ date.formatDate(Date.now(),'DD MMMM YYYY') }}
                </div>
              </div>
              <div class="row">
                <div class="col-12 text-center">
                  Dokter yang memeriksa,
                </div>
              </div>
              <div class="row q-my-xl" />
              <div class="row q-mt-xl">
                <div class="col-12 text-center">
                  ( {{ props?.pasien?.dokter }} )
                </div>
              </div>
              <div class="row q-mt-xs">
                <div class="col-12 text-center">
                  NIP. {{ props?.pasien?.datasimpeg?.nip }}
                </div>
              </div>
              <div class="row q-my-xl">
                <div class="col-12 text-center">
                  Tanda Tangan yang diperiksa,
                </div>
              </div>
              <div class="row q-my-xl" />
              <div class="row q-mt-xl">
                <div class="col-12 text-center">
                  ( {{ props?.pasien?.nama }} )
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { date } from 'quasar'
import { ref } from 'vue'
import KopSuratPage from './KopSuratPage.vue'
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
const syarat = ref('')
const nomor = ref('')
const nomor1 = ref('')
const pekerjaan = ref('')
const minta = ref('')
const tgl = ref(date.formatDate(Date.now(), 'YYYY-MM-DD'))
const penglihatan = ref({ kanan: '', kiri: '' })
const pendengaran = ref({ kanan: '', kiri: '' })
const warna = ref('')
const tinggi = ref('')
const berat = ref('')
const golDar = ref('')

const doc = ref('')
const documents = ref([
  {
    label: 'BAIK',
    value: 'BAIK'
  },
  {
    label: 'TIDAK BAIK',
    value: 'TIDAK BAIK'
  }
])
const printObj = {
  id: 'printMe',
  popTitle: 'Surat Keterangan Dokter'

}
</script>
<style lang="scss" scoped>
.endas{
  border-bottom: 1px black solid;
}
.indent{
  text-indent: 50px;
}
</style>

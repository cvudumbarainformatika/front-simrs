<template>
  <div>
    <!-- input -->
    <div class="row q-col-gutter-sm q-mb-xs">
      <div class="col-6">
        <app-input
          v-model="norujukan"
          label="no rujukan"
          outlined
        />
      </div>
      <div class="col-6">
        <app-input
          v-model="faskes"
          label="Faskes rujukan"
          outlined
        />
      </div>
    </div>
    <div class="row q-col-gutter-sm q-mb-xs">
      <div class="col-12">
        <app-input
          v-model="diberi"
          label="Diberi"
          outlined
        />
      </div>
    </div>
    <div class="row q-col-gutter-sm q-mb-xs">
      <div class="col-6">
        <app-input-date
          :model="berangkat"
          label="jam berangkat"
          outlined
          :type-date="false"
          @set-model="val=>berangkat=val"
        />
      </div>
      <div class="col-6">
        <app-input-date
          :model="tiba"
          label="jam tiba"
          outlined
          :type-date="false"
          @set-model="val=>tiba=val"
        />
      </div>
    </div>
    <q-bar
      dense
      class="bg-white q-mt-lg"
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
          <div class="endas">
            Surat Rujukan Peserta BPJS
          </div>
        </div>
        <div class="row justify-center ">
          <div class="">
            ( Mohon diisi dengan lengkap digunaan sebagai lampiran penagihan )
          </div>
        </div>
        <div class="row justify-center ">
          <div class="col-6">
            T.S YTH.
          </div>
          <div class="col-6">
            Kepada Rumah Sakit : {{ faskes }}
          </div>
        </div>
        <div class="row justify-center ">
          <div class="col-12">
            Bersama ini mohon Konsul dan pertolongan selanjutnya kepada pasien
          </div>
        </div>
        <div class="row justify-center ">
          <div class="col-4">
            Nama
          </div>
          <div class="col-8">
            : {{ pasien?.nama }}
          </div>
        </div>
        <div class="row justify-center ">
          <div class="col-4">
            Umur
          </div>
          <div class="col-8">
            : {{ pasien?.usia }}
          </div>
        </div>
        <div class="row justify-center ">
          <div class="col-4">
            Jenis kelamin
          </div>
          <div class="col-8">
            : {{ pasien?.kelamin }}
          </div>
        </div>
        <div class="row justify-center ">
          <div class="col-4">
            Nomor Kepesertaan
          </div>
          <div class="col-8">
            : {{ pasien?.noka }}
          </div>
        </div>
        <div class="row justify-center ">
          <div class="col-4">
            Dengan Anamnesa
          </div>
          <div class="col-8">
            <q-list
              class="bg-white"
              separator
            >
              <transition-group name="list">
                <q-item
                  v-for="(item , n) in pasien?.anamnesis"
                  :key="n"
                  class="list-move q-pa-none"
                >
                  <q-item-section class="">
                    <q-item-label
                      lines="2"
                      class="f-12"
                    >
                      <span class="">Keluhan Utama </span> : <span class="text-weight-bold">{{ item?.rs4 }}</span>
                    </q-item-label>
                    <q-item-label
                      lines="2"
                    >
                      <span class="">Riwayat Penyakit (Sekarang) </span> : <span class="text-weight-bold">{{ item?.riwayatpenyakitsekarang }}</span>
                    </q-item-label>
                    <q-item-label
                      lines="2"
                    >
                      <span class="">Riwayat Penyakit </span> : <span class="text-weight-bold">{{ item?.riwayatpenyakit }}</span>
                    </q-item-label>
                    <q-item-label
                      lines="2"
                    >
                      <span class="">Riwayat Alergi </span> : <span class="text-weight-bold">{{ item?.riwayatalergi }}</span>
                    </q-item-label>
                    <q-item-label
                      lines="2"
                    >
                      <span class="">Reaksi berupa </span> : <span class="text-weight-bold">{{ item?.keteranganalergi }}</span>
                    </q-item-label>
                    <q-item-label
                      lines="2"
                    >
                      <span class="">Riwayat Pengobatan</span> : <span class="text-weight-bold">{{ item?.riwayatpengobatan }}</span>
                    </q-item-label>
                    <q-separator class="q-my-xs" />
                    <!--
                      <q-item-label
                      lines="1"
                    >
                      <span class="text-weight-bold">Skreening Gizi</span>
                    </q-item-label>
                    <q-item-label
                      lines="7"
                    >
                      <span class="">- Apakah Pasian mengalami penurunan / peningkatan BB yang tidak diinginkan dalam 6 Bulan terakhir ? <b>{{ getYT(item?.skreeninggizi) }}</b></span>
                      <div class="q-my-xs">
                        - Apakah Asupan Makan berkurang karena tidak nafsu makan ? <b>{{ getYT(item?.asupanmakan) }}</b>
                      </div>
                      <div>- Kondisi Khusus : <em>{{ item?.kondisikhusus }}</em> <b>Skor : {{ item?.skor }}</b> </div>
                    </q-item-label>
                    -->
                    <q-item-label
                      lines="1"
                    >
                      <span class="text-weight-bold">Keluhan Nyeri</span>
                    </q-item-label>
                    <q-item-label
                      lines="7"
                    >
                      <div>
                        - Skor Nyeri : <b>{{ item?.scorenyeri??'-' }}</b>

                        <em class="text-primary q-ml-sm"> {{ item?.keteranganscorenyeri ?? '-' }}</em>
                      </div>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </transition-group>
              <q-separator />
            </q-list>
          </div>
        </div>
        <div class="row justify-center ">
          <div class="col-4">
            Diagnosa Sementara
          </div>
          <div class="col-8">
            <div
              v-for="(item,i) in pasien?.diagnosa"
              :key="i"
              class="row"
            >
              <div class="col-12">
                {{ item?.masterdiagnosa?.rs1 }} {{ item?.masterdiagnosa?.diagnosa??item?.masterdiagnosa?.rs4 }} <span v-if="item?.jenisdiagnosa">({{ item?.jenisdiagnosa }})</span>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-center ">
          <div class="col-4">
            Telah diberi
          </div>
          <div class="col-8">
            : {{ diberi }}
          </div>
        </div>
        <div class="row justify-center ">
          <div class="col-12">
            Atas pertolongan TS. Banyak terima kasih, serta mohon informasi selanjutnya atas pasien tersebut.
          </div>
        </div>
      </div>
      <!-- bottom -->
      <div class="q-mt-lg">
        <div class="row">
          <div class="col-4" />
          <div class="col-4" />
          <div class="col-4 text-center">
            Probolinggo, {{ date.formatDate(Date.now(),'DD MMMM YYYY') }}
          </div>
        </div>
        <div class="row">
          <div class="col-4 text-center">
            Dokter Pengirim,
          </div>
          <div class="col-4  text-center">
            Petugas RS Rujukan
          </div>
          <div class="col-4 text-center">
            Peserta / Keluarga
          </div>
        </div>
        <div class="row q-my-xl" />
        <div class="row q-mt-xl">
          <div class="col-4 text-center">
            {{ props?.pasien?.dokter }}
          </div>
          <div class="col-4 text-center">
            ( ......................................................... )
          </div>
          <div class="col-4 text-center">
            ( ......................................................... )
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { date } from 'quasar'
import { ref } from 'vue'
import KopSuratPage from '../../surat/compsurat/KopSuratPage.vue'
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
const norujukan = ref(props?.pasien?.planning?.transrujukan?.rs3)
const faskes = ref(props?.pasien?.planning?.transrujukan?.rs7)
const diberi = ref('')
const berangkat = ref(date.formatDate(Date.now(), 'HH:mm'))
const tiba = ref(date.formatDate(Date.now(), 'HH:mm'))

// eslint-disable-next-line no-unused-vars
function getYT(val) {
  if (val === 1 || val === '1') {
    return 'Ya'
  } else if (val === 0 || val === '0') {
    return 'Tidak'
  } else {
    return '-'
  }
}

const printObj = {
  id: 'printMe',
  popTitle: 'Surat Pengantar Peserta BPJS'

}
</script>
<style lang="scss" scoped>
.endas{
  border-bottom: 1px black solid;
  font-size: 24px;
}
.indent{
  text-indent: 50px;
}
</style>

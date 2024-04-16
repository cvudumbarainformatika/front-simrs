<template>
  <q-bar
    dense
    class="bg-white q-mb-md"
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
  <div class="tinggi">
    <div
      id="printMe"
      class="full-width"
    >
      <KopSurat />
      <IdentitasPage :pasien="props.pasien" />
      <div
        class="row justify-end text-weight-bold q-gutter-sm"
        style="margin-right: 20px;"
      >
        <div class="col-1">
          RM IRJA-1a
        </div>
      </div>
      <div class="row justify-center f-20 text-weight-bold q-mb-md">
        ASESMEN AWAL KEPERAWATAN RAWAT JALAN
      </div>
      <div v-if="store.loading">
        <app-loading />
      </div>
      <q-separator />
      <div style="margin-left: 10px;">
        <b><u>Riwayat Kesehatan</u></b>
      </div>

      <div class="row">
        <div
          v-for="(erm,e) in store.item"
          :key="e"
        >
          <div
            v-for="(anamnesis,anm) in erm?.anamnesis"
            :key="anm"
          >
            <div
              class="col-5"
              style="margin-left: 20px;"
            >
              1. Riwayat Kesehatan Sekarang (Alasan masuk RS/Keluhan Utama) :
            </div>
            <div class="row">
              <div
                class="col-8"
                style="margin-left: 30px;"
              >
                - Keluhan Utama: {{ anamnesis?.rs4 ?? '' }}
              </div>
              <div
                class="col-8"
                style="margin-left: 30px;"
              >
                - Riwayat Penyakit (Sekarang) : {{ anamnesis?.riwayatpenyakitsekarang ?? '' }}
              </div>
              <div
                class="col-8"
                style="margin-left: 30px;"
              >
                - Riwayat Penyakit : {{ anamnesis?.riwayatpenyakit ?? '' }}
              </div>
              <div
                class="col-8"
                style="margin-left: 30px;"
              >
                - Riwayat Penyakit Keluarga: {{ anamnesis?.riwayatpenyakitkeluarga ?? '' }}
              </div>
              <div
                class="col-8"
                style="margin-left: 30px;"
              >
                - Riwayat Alergi : {{ anamnesis?.riwayatalergi ?? '' }}
              </div>
              <div
                class="col-8"
                style="margin-left: 30px;"
              >
                - Reaksi berupa : {{ anamnesis?.keteranganalergi ?? '' }}
              </div>
              <div
                class="col-8"
                style="margin-left: 30px;"
              >
                - Riwayat Pengobatan : {{ anamnesis?.riwayatpengobatan ?? '' }}
              </div>
              <br>
              <div
                class="col-8"
                style="margin-left: 30px;"
              >
                - Skreening Gizi : Skor {{ anamnesis?.skreeninggizi }} Ket {{ skorgizi(anamnesis?.skreeninggizi) }}
              </div>
              <div
                class="col-8"
                style="margin-left: 30px;"
              >
                - Keluhan Nyeri : Skor {{ anamnesis?.scorenyeri }} Ket {{ skornyeri(parseInt(anamnesis?.scorenyeri)) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <q-separator />
      <div style="margin-left: 10px;">
        <b><u>Pemeriksaan Fisik</u></b>
      </div>

      <div class="row">
        <div
          v-for="(erm,e1) in store.item"
          :key="e1"
        >
          <div
            v-for="(pfisik,e1x) in erm.pemeriksaanfisik"
            :key="e1x"
          >
            <div
              class="col-5"
              style="margin-left: 20px;"
            >
              1. Keadaan Umum dan Tanda Vital
            </div>
            <div class="row">
              <div
                class="col-8"
                style="margin-left: 30px;"
              >
                - Keadaan Umum: ????????
              </div>
              <div
                class="col-8"
                style="margin-left: 30px;"
              >
                - Kesadaran: {{ pfisik?.kesadaran }}
              </div>
              <div
                class="col-8"
                style="margin-left: 30px;"
              >
                - Suhu: {{ pfisik?.suhutubuh }} C
              </div>
              <div
                class="col-8"
                style="margin-left: 30px;"
              >
                - Nadi: {{ pfisik?.rs4 }} x/menit
              </div>
              <div
                class="col-8"
                style="margin-left: 30px;"
              >
                - TD: {{ pfisik?.diastole }}/{{ pfisik?.sistole }} mmHg
              </div>
              <div
                class="col-8"
                style="margin-left: 30px;"
              >
                - Pernafasan: {{ pfisik?.pernapasan
                }} x/menit
              </div>
            </div>
            <div
              class="col-5"
              style="margin-left: 20px;"
            >
              2. Data psikologi, edukasi, ekonomi, spiritual, dan kultural
            </div>
            <div class="row">
              <div
                class="col-8"
                style="margin-left: 30px;"
              >
                - Psikologis: {{ pfisik?.statuspsikologis
                }}
              </div>
              <div
                class="col-8"
                style="margin-left: 30px;"
              >
                - Sosial: ????????????????????
              </div>
              <div
                class="col-8"
                style="margin-left: 30px;"
              >
                - Edukasi: ??????????
              </div>
              <div
                class="col-8"
                style="margin-left: 30px;"
              >
                - Ekonomi: {{ pfisik?.sosialekonomi ?? '-' }}
              </div>
              <div
                class="col-8"
                style="margin-left: 30px;"
              >
                - Spiritual: {{ pfisik?.spiritual ?? '-'
                }}
              </div>
              <div
                class="col-8"
                style="margin-left: 30px;"
              >
                - Kultural: ???????????????????????????????????
              </div>
            </div>
          </div>
        </div>
      </div>

      <q-separator />
      <div style="margin-left: 10px;">
        <b><u>Skrining Gizi</u></b>
      </div>

      <div class="row">
        <div
          v-for="(erm,e1) in store.item"
          :key="e1"
        >
          <div
            v-for="(anamx,e2x) in erm.anamnesis"
            :key="e2x"
          >
            <div
              class="col-5"
              style="margin-left: 20px;"
            >
              - Apakah Pasian mengalami penurunan / peningkatan BB yang tidak diinginkan dalam 6 Bulan terakhir ? {{ skorgizi(anamx?.skreeninggizi) }}
            </div>
            <div
              class="col-5"
              style="margin-left: 20px;"
            >
              - Apakah Asupan Makan berkurang karena tidak nafsu makan ? {{ skorgizi(anamx?.asupanmakan) }}
            </div>
            <div
              class="col-5"
              style="margin-left: 20px;"
            >
              -  Kondisi Khusus = {{ skorgizi(anamx?.kondisikhusus) }}
            </div>
          </div>
        </div>
      </div>

      <q-separator />
      <div style="margin-left: 10px;">
        <b><u>Daftar Masalah Keperawatan</u></b>
      </div>
      <div class="row">
        <div
          v-for="(erm,e1) in store.item"
          :key="e1"
        >
          <div
            v-for="(kep,e3x) in erm.diagnosakeperawatan"
            :key="e3x"
          >
            <div
              class="col-5"
              style="margin-left: 20px;"
            >
              - {{ kep?.nama }}
            </div>
          </div>
        </div>
      </div>

      <q-separator />
      <div style="margin-left: 10px;">
        <b><u>Rencana Keperawatan</u></b>
      </div>
      <div class="row">
        <div
          class="col-5"
          style="margin-left: 20px;"
        >
          -  ????????????????????
        </div>
      </div>

      <q-separator />
      <div style="margin-left: 10px;">
        <b><u>Implementasi / Tindakan</u></b>
      </div>
      <div class="row">
        <div
          class="col-5"
          style="margin-left: 20px;"
        >
          -  ????????????????????
        </div>
      </div>

      <q-separator />
      <div style="margin-left: 10px;">
        <b><u>Evaluasi</u></b>
      </div>
      <div class="row">
        <div
          class="col-5"
          style="margin-left: 20px;"
        >
          -  ????????????????????
        </div>
      </div>

      <q-separator />
      <div style="margin-left: 10px;">
        <b><u>Catatan Kie</u></b>
      </div>
      <div class="row">
        <div
          v-for="(erm,e1) in store.item"
          :key="e1"
        >
          <div
            v-for="(plan,e10) in erm.planning"
            :key="e10"
          >
            <div
              class="col-5"
              style="margin-left: 20px;"
            >
              -  {{ plan?.rs4 }}
            </div>
          </div>
        </div>
      </div>
      <div class="q-mt-md">
        <div class="row">
          <div class="col-6">
            <div class="text-center text-weight-bold">
              Probolinggo, {{ date.formatDate(Date.now(),'DD MMMM YYYY') }}
            </div>
          </div>
        </div>
        <div class="row q-mb-xl">
          <div class="col-6">
            <div class="text-center text-weight-bold">
              Pasien / Keluarga
            </div>
          </div>
          <div class="col-6">
            <div class="text-center text-weight-bold">
              Perawat
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <div class="text-center text-weight-bold">
              (........................)
            </div>
          </div>
          <div class="col-6">
            <div class="text-center text-weight-bold">
              ( ???????????????????? )
            </div>
          </div>
        </div>
      </div>
      <div v-if="store.loading">
        <app-loading />
      </div>
    </div>
  </div>
</template>

<script setup>
import { date } from 'quasar'
import KopSurat from '../../comppoli/KopSurat.vue'
import IdentitasPage from '../../comppoli/IdentitasPage.vue'
import { useDokumenpengkajianawalmedisrjStore } from 'src/stores/simrs/dokumen/erm/pengkajianawalmedisrj'

const printObj = {
  id: 'printMe',
  popTitle: 'Resume Medik'

}
const store = useDokumenpengkajianawalmedisrjStore()
// eslint-disable-next-line no-use-before-define
store.setParams('noreg', props.pasien?.noreg)
// eslint-disable-next-line no-use-before-define
// console.log('noreg', props.pasien?.noreg)
store.getData()

function skorgizi (val) {
  if (val > 0) {
    return 'Ya'
  } else {
    return 'Tidak'
  }
}

// function getYT(val) {
//   if (val === 1 || val === '1') {
//     return 'Ya'
//   } else if (val === 0 || val === '0') {
//     return 'Tidak'
//   } else {
//     return '-'
//   }
// }

function skornyeri (val) {
  if (val === 0) {
    return 'Tidak Ada Nyeri'
  } else if (val >= 1) {
    return 'Nyeri Ringan'
  } else if (val >= 4) {
    return 'Nyeri Sedang'
  } else if (val >= 7) {
    return 'Nyeri Berat'
  }
}

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
</script>

<template>
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
    ASESMEN AWALKEPERAWATAN RAWAT JALAN
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
</template>

<script setup>
import KopSurat from '../../comppoli/KopSurat.vue'
import IdentitasPage from '../../comppoli/IdentitasPage.vue'
import { useDokumenpengkajianawalmedisrjStore } from 'src/stores/simrs/dokumen/erm/pengkajianawalmedisrj'

const store = useDokumenpengkajianawalmedisrjStore()
// eslint-disable-next-line no-use-before-define
store.setParams('noreg', props.pasien?.noreg)
// eslint-disable-next-line no-use-before-define
console.log('noreg', props.pasien?.noreg)
store.getData()

function skorgizi (val) {
  if (val >= 0) {
    return 'Beresiko Malnutrisi'
  } else {
    return 'Tidak Beresiko Malnutrisi'
  }
}

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

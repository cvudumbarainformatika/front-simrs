<template>
  <div class="full-height full-width">
    <div class="row justify-end print-hide">
      <q-btn
        round
        class="f-10 q-mr-sm"
        color="dark"
        text-color="white"
        icon="icon-mat-print"
        @click="toPrint()"
      >
        <q-tooltip
          class="primary"
          :offset="[10, 10]"
        >
          Print
        </q-tooltip>
      </q-btn>
    </div>
    <div class="q-ma-sm garis-luar">
      <div class="row garis-bawah q-pa-xs text-weight-bold justify-center f-16">
        PELAYANAN INFORMASI OBAT
      </div>
      <!-- hari -->
      <div class="row q-px-xs">
        <div
          class="col-auto"
          style="width:18%;"
        >
          Hari
        </div>
        <div
          class="col-auto"
          style="width:2%;"
        >
          :
        </div>
        <div
          class="col-auto"
          style="width:80%;"
        >
          {{ store.formInfo?.hari }}
        </div>
      </div>
      <!-- tanggal -->
      <div class="row q-px-xs items-center">
        <div
          class="col-auto"
          style="width:18%;"
        >
          Tanggal
        </div>
        <div
          class="col-auto"
          style="width:2%;"
        >
          :
        </div>
        <div
          class="col-auto print-hide"
          style="width:80%;"
        >
          <app-input-date-human
            :model="store.formInfo.tgl"
            label="Tanggal"
            outlined
            @set-display="dispTanggal"
            @db-model="setTanggal"
          />
        </div>
        <div
          class="col-auto print-only"
          style="width:80%;"
        >
          {{ store.formInfo.tgl }}
        </div>
      </div>
      <!-- waktu -->
      <div class="row q-px-xs">
        <div
          class="col-auto"
          style="width:18%;"
        >
          Waktu
        </div>
        <div
          class="col-auto"
          style="width:2%;"
        >
          :
        </div>
        <div
          class="col-auto"
          style="width:80%;"
        >
          {{ store.formInfo?.waktu }}
        </div>
      </div>
      <!-- Metode -->
      <div class="row q-px-xs items-center">
        <div
          class="col-auto"
          style="width:18%;"
        >
          Metode
        </div>
        <div
          class="col-auto"
          style="width:2%;"
        >
          :
        </div>
        <div
          class="col-auto"
          style="width:80%;"
        >
          <div class="print-only">
            {{ cariStatus(store.formInfo.metode) }}
          </div>
          <div class="print-hide">
            <q-option-group
              v-model="store.formInfo.metode"
              class="print-hide"
              :options="store.metodes"
              inline
            />
          </div>
        </div>
      </div>
      <div class="row text-weight-bold q-mt-md">
        Identitas Penanya :
      </div>
      <!-- nama penanya -->
      <div class="row q-px-xs items-center">
        <div
          class="col-auto"
          style="width:18%;"
        >
          Nama
        </div>
        <div
          class="col-auto"
          style="width:2%;"
        >
          :
        </div>
        <div
          class="col-auto"
          style="width:80%;"
        >
          <div class="print-only">
            {{ store.formInfo.nama_penanya }}
          </div>
          <div class="print-hide">
            <app-input
              ref="refNamaPenanya"
              v-model="store.formInfo.nama_penanya"
              label="Nama"
              outlined
            />
          </div>
        </div>
      </div>
      <!-- status penanya -->
      <div class="row q-px-xs items-center">
        <div
          class="col-auto"
          style="width:18%;"
        >
          Status
        </div>
        <div
          class="col-auto"
          style="width:2%;"
        >
          :
        </div>
        <div
          class="col-auto"
          style="width:80%;"
        >
          <div class="print-only">
            {{ cariStatus(store.formInfo.status_penanya) }}
          </div>
          <div class="print-hide">
            <q-option-group
              v-model="store.formInfo.status_penanya"
              class="print-hide"
              :options="store.statuses"
              inline
            />
          </div>
        </div>
      </div>
      <!-- tlp penanya -->
      <div class="row q-px-xs items-center">
        <div
          class="col-auto"
          style="width:18%;"
        >
          Nomor Telepon
        </div>
        <div
          class="col-auto"
          style="width:2%;"
        >
          :
        </div>
        <div
          class="col-auto"
          style="width:80%;"
        >
          <div class="print-only">
            {{ store.formInfo.tlp_penanya }}
          </div>
          <div class="print-hide">
            <app-input
              ref="refNamaPenanya"
              v-model="store.formInfo.tlp_penanya"
              label="Telepon"
              outlined
            />
          </div>
        </div>
      </div>
      <div class="row text-weight-bold q-mt-md">
        Data Pasien :
      </div>
      <!-- umur pasien -->
      <div class="row q-px-xs">
        <div
          class="col-auto"
          style="width:18%;"
        >
          Umur
        </div>
        <div
          class="col-auto"
          style="width:2%;"
        >
          :
        </div>
        <div
          class="col-auto"
          style="width:80%;"
        >
          {{ store.formInfo?.umur_pasien }}
        </div>
      </div>
      <!-- kehamilan -->
      <div class="row q-px-xs items-center">
        <div
          class="col-auto"
          style="width:18%;"
        >
          Kehamilan
        </div>
        <div
          class="col-auto"
          style="width:2%;"
        >
          :
        </div>
        <div
          class="col-auto"
          style="width:80%;"
        >
          <div class="print-only">
            {{ cariYN(store.formInfo.kehamilan) }}
          </div>
          <div class="print-hide">
            <q-option-group
              v-model="store.formInfo.kehamilan"
              class="print-hide"
              :options="store.yns"
              inline
            />
          </div>
        </div>
      </div>
      <!-- kasus khusus -->
      <div class="row q-px-xs">
        <div
          class="col-auto"
          style="width:18%;"
        >
          Kasus Khusus
        </div>
        <div
          class="col-auto"
          style="width:2%;"
        >
          :
        </div>
        <div
          class="col-auto"
          style="width:80%;"
        >
          <div class="print-only">
            {{ store.formInfo.kasus_khusus }}
          </div>
          <div class="print-hide">
            <app-input
              ref="refKasusKhusus"
              v-model="store.formInfo.kasus_khusus"
              label="Kasus Khusus"
              outlined
            />
          </div>
        </div>
      </div>
      <!-- jenis kelamin -->
      <div class="row q-px-xs">
        <div
          class="col-auto"
          style="width:18%;"
        >
          Jenis Kelamin
        </div>
        <div
          class="col-auto"
          style="width:2%;"
        >
          :
        </div>
        <div
          class="col-auto"
          style="width:80%;"
        >
          <div class="print-only">
            {{ cariKelamin(store.formInfo.jenis_kelamin) }}
          </div>
          <div class="print-hide">
            <q-option-group
              v-model="store.formInfo.jenis_kelamin"
              class="print-hide"
              :options="store.kelamins"
              inline
            />
          </div>
        </div>
      </div>
      <!-- menyusui -->
      <div class="row q-px-xs">
        <div
          class="col-auto"
          style="width:18%;"
        >
          Menyusui
        </div>
        <div
          class="col-auto"
          style="width:2%;"
        >
          :
        </div>
        <div
          class="col-auto"
          style="width:80%;"
        >
          <div class="print-only">
            {{ cariYN(store.formInfo.menyusui) }}
          </div>
          <div class="print-hide">
            <q-option-group
              v-model="store.formInfo.menyusui"
              class="print-hide"
              :options="store.yns"
              inline
            />
          </div>
        </div>
      </div>
      <div class="row text-weight-bold q-mt-md">
        Pertanyaan :
      </div>
      <div class="row q-ml-sm">
        <div class="col-12">
          <!-- <div class="print-only">
            {{ store.formInfo.uraian_pertanyaan }}
          </div> -->
          <!-- <div class="print-hide"> -->
          <div class="">
            <q-input
              ref="refNamaPenanya"
              v-model="store.formInfo.uraian_pertanyaan"
              label="Uraian Pertanyaan :"
              autogrow
            />
          </div>
        </div>
      </div>
      <div class="row text-weight-bold q-mt-md">
        Jenis Pertanyaan :
      </div>
      <div class="row q-col-gutter-sm q-ml-xs">
        <q-option-group
          v-model="store.formInfo.jenisPertanyaan"
          type="checkbox"
          :options="store.jenisPertanyaans"
          inline
        />
      </div>
      <div class="row text-weight-bold q-mt-md">
        Jawaban :
      </div>
      <div class="row q-ml-sm">
        <div class="col-12">
          <!-- <div class="print-only">
            {{ store.formInfo.jawaban }}
          </div> -->
          <!-- <div class="print-hide"> -->
          <div class="">
            <q-input
              ref="refNamaPenanya"
              v-model="store.formInfo.jawaban"
              label=""
              autogrow
            />
          </div>
        </div>
      </div>
      <div class="row text-weight-bold q-mt-md">
        Referensi :
      </div>
      <div class="row q-ml-sm">
        <div class="col-12">
          <!-- <div class="print-only">
            {{ store.formInfo.refernsi }}
          </div> -->
          <!-- <div class="print-hide"> -->
          <div class="">
            <q-input
              ref="refNamaPenanya"
              v-model="store.formInfo.referensi"
              label=""
              autogrow
            />
          </div>
        </div>
      </div>
      <div class="row q-my-md">
        <div class="col-7" />
        <div class="col-4 text-center text-weight-bold">
          Apoteker
        </div>
        <div class="col-1" />
      </div>
      <div class="row q-my-lg" />
      <div class="row q-my-md">
        <div class="col-7" />
        <div class="col-4 text-center">
          <div class="print-only">
            {{ cariApoteker(store.formInfo.apoteker) }}
          </div>
          <div class="print-hide">
            <app-autocomplete
              v-model="store.formInfo.apoteker"
              label="Apoteker"
              autocomplete="nama"
              option-label="nama"
              option-value="kdpegsimrs"
              outlined
              :source="store.apotekers"
            />
          </div>
        </div>
        <div class="col-1" />
      </div>
    </div>
    <div class="row justify-end print-hide">
      <q-btn
        label="Simpan Pelayanan Informasi Obat"
        class="q-mr-lg q-mb-lg"
        color="primary"
        text-color="white"
        icon="icon-mat-save"
        :loading="store.loadingPelayananInfoObat"
        :disable="store.loadingPelayananInfoObat"
        @click="simpan()"
      >
        <q-tooltip
          class="primary"
          :offset="[10, 10]"
        >
          Simpan
        </q-tooltip>
      </q-btn>
    </div>
  </div>
</template>
<script setup>
// import { onMounted } from 'vue'
import { useEResepDepoFarmasiStore } from 'src/stores/simrs/farmasi/eresep/eresep'
import { date } from 'quasar'

const store = useEResepDepoFarmasiStore()

function setTanggal (val) {
  store.setFormInfo('hari', date.formatDate(val, 'dddd'))
  store.setFormInfo('waktu', date.formatDate(Date.now(), 'HH:mm:ss'))
  store.setFormInfo('tanggal', date.formatDate(val, 'YYYY-MM-DD') + ' ' + store.formInfo.waktu)
  store.setFormInfo('tanggal', val + ' ' + store.formInfo?.waktu)
}
function dispTanggal (val) {
  store.setFormInfo('tgl', val)
}
function cariStatus (val) {
  const stat = store.statuses.find(st => st.value === val)
  if (stat) return stat.label
  else return '-'
}
function cariYN (val) {
  const stat = store.yns.find(st => st.value === val)
  if (stat) return stat.label
  else return '-'
}
function cariKelamin (val) {
  const stat = store.kelamins.find(st => st.value === val)
  if (stat) return stat.label
  else return '-'
}
function cariApoteker (val) {
  const stat = store.apotekers.find(st => st.kdpegsimrs === val)
  if (stat) return stat.nama
  else return '-'
}
function toPrint () {
  window.print()
}
function simpan () {
  const jenper = store.formInfo.jenisPertanyaan.join('|')
  store.setFormInfo('jenis_pertanyaan', jenper)
  console.log('form', store.formInfo)
  store.simpanPelayananInfoObat()
}
// onMounted(() => {
//   store.getApoteker()
// })
</script>
<style lang="scss" scoped>
.garis-luar{
  border: 1px solid black;

}

.garis-atas{
  border-top: 1px solid black;
  width: 100%;
}
.garis-bawah{
  border-bottom: 1px solid black;
  width: 100%;
}
.garis {
  width: 90%;
  border-top: 1px dashed black;
  margin-bottom: 2px;
}

.garis2 {
  width: 90%;
}
</style>

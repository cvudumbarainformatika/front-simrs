<template>
  <div>
    <app-loading v-if="loading" />
    <div v-else>
      <div v-if="items.length <= 0">
        <div
          class="column flex-center"
          style="min-height:50vh"
        >
          <div class="text-h3 q-mb-md">
            🏷️
          </div>
          <div class="f-14">
            Belum Ada Data
          </div>
        </div>
      </div>
      <q-list
        v-else
        separator
      >
        <q-separator
          spaced
          inset
        />

        <q-item
          v-for="(item, i) in items"
          :key="i"
        >
          <q-item-section avatar>
            <app-avatar-pasien
              :pasien="item"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-weight-bold">
              {{ item.nama }} | <span class="text-primary">{{ item.norm }}</span>
            </q-item-label>
            <q-item-label>
              NOREG : <span class="text-weight-bold">{{ item.noreg }} </span> | Penjamin : <span class="text-weight-bold"> {{ item.sistembayar }}</span>
            </q-item-label>
            <q-item-label>
              DPJP : <span class="text-negative text-weight-bold">{{ item.dokter }}</span> | RUANGAN : <span class="text-teal text-weight-bold"> {{ item.poli }}</span>
            </q-item-label>
            <q-item-label caption>
              USIA : <span class="text-weight-bold">{{ item.usia }}</span>  | Kelamin : <span class="text-weight-bold">{{ item.kelamin }}</span>
            </q-item-label>
            <!-- <q-item-label>
              Penjamin : <span class="text-weight-bold"> {{ item.sistembayar }}</span>
            </q-item-label> -->
            <!-- <q-item-label
              caption
            >
              Status Pasien: <span class="text-negative text-weight-bold">{{ getStatus(item.taskid) }}</span>
            </q-item-label> -->
          </q-item-section>

          <q-item-section
            side
            top
          >
            <q-item-label caption>
              <!-- <div class="row justify-end">
                <div class="q-ml-sm">
                  <q-badge
                    outline
                    :color="item.seprajal?'teal':'negative'"
                    :label="item.seprajal?'SEP terbit':'SEP Belum terbit'"
                  />
                </div>
              </div> -->
              <!-- <div class="row q-mt-sm text-end">
                <div class="q-ml-sm">
                  <q-btn
                    outline
                    size="sm"
                    padding="xs"
                    :color="item.generalconsent?'teal':'negative'"
                    :label="item.generalconsent?'Ada General Consent':'General Consent Belum Ada'"
                    @click="genCon(item)"
                  />
                </div>
              </div> -->
              <div class="row q-mt-sm justify-end">
                <div class="q-ml-sm">
                  <q-btn
                    outline
                    size="sm"
                    padding="xs"
                    color="cyan"
                    label="Buka Billing"
                    @click="openBill(item)"
                  />
                </div>
              </div>
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator
          spaced
          inset
        />
      </q-list>
    </div>
    <!-- Billing -->
    <app-fullscreen
      v-model="billOpen"
      @close="store.notas={}"
    >
      <template #default>
        <BillingPage
          :pasien="pasien"
          @print="openPrint"
          @rekap="openFaktur"
          @nota="getNota"
        />
      </template>
    </app-fullscreen>
    <!-- print nota -->
    <app-dialog-not-full
      v-model="printOpen"
    >
      <template #default>
        <div
          id="printMe"
          class="q-pa-xs"
        >
          <div class="row">
            UOBK RSUD dr. MOHAMAD SALEH
          </div>
          <div class="row">
            Jl. Mayjend Panjaitan No. 65 Probolinggo Jawa Timur
          </div>
          <div class="row garis-bawah-double">
            Telp. (0335) 433478,433119,421118 Fax. (0335) 432702
          </div>
          <div class="row no-wrap q-my-md bg-grey-3">
            <div class="col-6">
              <div class="row no-wrap">
                <div class="col-3">
                  No Rm
                </div>
                <div class="col-9">
                  {{ pasien.norm }}
                </div>
              </div>
              <div class="row no-wrap">
                <div class="col-3">
                  Nama
                </div>
                <div class="col-9">
                  {{ pasien.nama }}
                </div>
              </div>
              <div class="row no-wrap">
                <div class="col-3">
                  Kelamin
                </div>
                <div class="col-9">
                  {{ pasien.kelamin }}
                </div>
              </div>
              <div class="row no-wrap">
                <div class="col-3">
                  Alamat
                </div>
                <div class="col-9">
                  {{ pasien.alamat }}
                </div>
              </div>
              <div class="row no-wrap">
                <div class="col-3">
                  Tgl Masuk
                </div>
                <div class="col-9">
                  {{ dateFullFormat( pasien.tgl_kunjungan) }}
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="row no-wrap">
                <div class="col-3">
                  No Reg
                </div>
                <div class="col-9">
                  {{ pasien.rs1 }}
                </div>
              </div>
              <div class="row no-wrap">
                <div class="col-3">
                  Tgl Lahir
                </div>
                <div class="col-9">
                  {{ dateFullFormat( pasien.tgllahir) }}
                </div>
              </div>
              <div class="row no-wrap">
                <div class="col-3">
                  Ruang
                </div>
                <div class="col-9">
                  {{ pasien.poli }}
                </div>
              </div>
              <div class="row no-wrap">
                <div class="col-3">
                  Sistem Bayar
                </div>
                <div class="col-9">
                  {{ pasien.sistembayar }}
                </div>
              </div>
            </div>
          </div>
          <!-- header -->
          <div class="row items-center no-wrap garis-bawah-double garis-atas-double">
            <div class="col-1">
              No
            </div>
            <div class="col-9">
              Tindakan
            </div>
            <div class="col-2">
              Harga
            </div>
          </div>
          <!-- List -->
          <div class="row items-center no-wrap ">
            <div class="col-1">
              1
            </div>
            <div class="col-9">
              Tindakan nya
            </div>
            <div class="col-2 garis-bawah-double text-right">
              Harga nya
            </div>
          </div>
          <!-- total -->
          <div class="row items-center no-wrap ">
            <div class="col-10 text-right">
              Rp.
            </div>
            <div class="col-2 text-right">
              Harga
            </div>
          </div>
        </div>
      </template>
    </app-dialog-not-full>
    <!-- print Rekap -->
    <app-dialog-mm
      v-model="printRekap"
      label="Cetak Rekap Billing"
      label-btn-ok="Print"
      @on-ok="actPrintRekap"
    >
      <template #default>
        <div
          id="printMe"
          style="width: 17cm;"
          class="q-pa-xs"
        >
          <!-- header print -->
          <div class="row q-col-gutter-xs garis-bawah-double">
            <div class="col-2">
              <q-img
                src="~assets/images/logo-kota-grey.png"
                spinner-color="white"
                style="height: 2cm; max-width: 1.6cm"
              />
            </div>
            <div class="col-10">
              <div class="row justify-between">
                <div class="text-weight-bold">
                  UOBK RSUD dr. MOHAMAD SALEH
                </div>
                <div class="text-italic f-10">
                  {{ date.formatDate(Date.now(),'DD MMMM YYYY') }}
                </div>
              </div>
              <div class="row  justify-between">
                <div>
                  Jl. Mayjend Panjaitan No. 65 Probolinggo Jawa Timur
                </div>
                <div class="text-italic f-10">
                  {{ date.formatDate(Date.now(),'HH:mm:ss') }}
                </div>
              </div>
              <div class="row">
                Telp. (0335) 433478,433119,421118 Fax. (0335) 432702
              </div>
            </div>
            <!-- <div class="col-1">
              <div class="row text-italic f-10">
                {{ date.formatDate(Date.now(),'DD MMMM YYYY') }}
              </div>
              <div class="row text-italic f-10">
                {{ date.formatDate(Date.now(),'HH:mm:ss') }}
              </div>
            </div> -->
          </div>

          <div class="row no-wrap q-mt-md bg-grey-3">
            <div class="col-6">
              <div class="row no-wrap">
                <div class="col-3">
                  No Rm
                </div>
                <div class="col-9">
                  {{ pasien.norm }}
                </div>
              </div>
              <div class="row no-wrap">
                <div class="col-3">
                  Nama
                </div>
                <div class="col-9">
                  {{ pasien.nama }}
                </div>
              </div>
              <div class="row no-wrap">
                <div class="col-3">
                  Kelamin
                </div>
                <div class="col-9">
                  {{ pasien.kelamin }}
                </div>
              </div>
              <div class="row no-wrap">
                <div class="col-3">
                  Tgl Lahir
                </div>
                <div class="col-9">
                  {{ dateFullFormat( pasien.tgllahir) }}
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="row no-wrap">
                <div class="col-4">
                  No Reg
                </div>
                <div class="col-8">
                  {{ pasien.rs1 }}
                </div>
              </div>
              <div class="row no-wrap">
                <div class="col-4">
                  Tgl Masuk
                </div>
                <div class="col-8">
                  {{ dateFullFormat( pasien.tgl_kunjungan) }}
                </div>
              </div>
              <div class="row no-wrap">
                <div class="col-4">
                  Ruang
                </div>
                <div class="col-8">
                  {{ pasien.poli }}
                </div>
              </div>
              <div class="row no-wrap items-center">
                <div class="col-4">
                  Sistem Bayar
                </div>
                <div class="col-8">
                  {{ pasien.sistembayar }}
                </div>
              </div>
            </div>
          </div>
          <div class="row no-wrap q-mb-md bg-grey-3">
            <div class="col-1">
              Alamat :
            </div>
            <div class="col-10">
              {{ pasien.alamat }}
            </div>
          </div>
          <!-- header -->
          <div class="row items-center no-wrap garis-bawah-dblue garis-atas-dblue">
            <div class="col-1">
              No
            </div>
            <div class="col-9">
              Tindakan
            </div>
            <div class="col-2">
              Harga
            </div>
          </div>
          <!-- List -->
          <div v-if="store.rekapBill && !store.loading">
            <!-- {{ store.rekapBill }} -->
            <div class="row items-center no-wrap ">
              <div class="col-1">
                1
              </div>
              <div class="col-9">
                Pelayanan Rekam Medik
              </div>
              <div class="col-2 garis-bawah-dablue text-right">
                {{ formatRp(store.rekapBill.pelayananrm) }}
              </div>
            </div>
            <div class="row items-center no-wrap ">
              <div class="col-1">
                2
              </div>
              <div class="col-9">
                Biaya Kartu Identitas Pasien
              </div>
              <div class="col-2 garis-bawah-dablue text-right">
                {{ formatRp(store.rekapBill.kartuidentitas) }}
              </div>
            </div>
            <div class="row items-center no-wrap ">
              <div class="col-1">
                3
              </div>
              <div class="col-9">
                Poliklinik
              </div>
              <div class="col-2 garis-bawah-dablue text-right">
                {{ formatRp(store.rekapBill.poliklinik) }}
              </div>
            </div>
            <div class="row items-center no-wrap ">
              <div class="col-1">
                4
              </div>
              <div class="col-9">
                Konsultasi Antar Poli
              </div>
              <div class="col-2 garis-bawah-dablue text-right">
                {{ formatRp(store.rekapBill.konsulantarpoli) }}
              </div>
            </div>
            <div class="row items-center no-wrap ">
              <div class="col-1">
                5
              </div>
              <div class="col-9">
                Tindakan :
              </div>
              <!-- <div class="col-2 garis-bawah-dablue text-right">
                {{ formatRp(store.rekapBill.konsulantarpoli) }}
              </div> -->
            </div>
            <div v-if="store.rekapBill.tindakan.length">
              <div
                v-for="(tin,i) in store.rekapBill.tindakan"
                :key="i"
                class="row items-center no-wrap "
              >
                <div class="col-1" />
                <div class="col-9">
                  {{ tin.namatindakan }}
                </div>
                <div class="col-2 garis-bawah-dablue text-right">
                  {{ formatRp(tin.subtotal) }}
                </div>
              </div>
            </div>
            <!-- <div class="row items-center no-wrap ">
              <div class="col-1">
                6
              </div>
              <div class="col-9">
                Visite / Konsultasi / Oncall Dokter
              </div>
              <div class="col-2 garis-bawah-dablue text-right">
                {{ formatRp(store.rekapBill.konsulantarpoli) }}
              </div>
            </div> -->
            <div class="row items-center no-wrap ">
              <div class="col-1">
                6
              </div>
              <div class="col-9">
                Biaya Pelayanan Penunjang
              </div>
              <!-- <div class="col-2 garis-bawah-dablue text-right">
                {{ formatRp(store.rekapBill.konsulantarpoli) }}
              </div> -->
            </div>
            <div class="row items-center no-wrap ">
              <div class="col-1" />
              <div class="col-9">
                Laboratorium
              </div>
              <div class="col-2 garis-bawah-dablue text-right">
                {{ formatRp(store.rekapBill.laborat) }}
              </div>
            </div>
            <div class="row items-center no-wrap ">
              <div class="col-1" />
              <div class="col-9">
                Radiologi
              </div>
              <div class="col-2 garis-bawah-dablue text-right">
                {{ formatRp(store.rekapBill.radiologi) }}
              </div>
            </div>
            <div class="row items-center no-wrap ">
              <div class="col-1" />
              <div class="col-9">
                Operasi One Day Care
              </div>
              <div class="col-2 garis-bawah-dablue text-right">
                {{ formatRp(store.rekapBill.onedaycare) }}
              </div>
            </div>
            <div class="row items-center no-wrap ">
              <div class="col-1" />
              <div class="col-9">
                Fisioterapi
              </div>
              <div class="col-2 garis-bawah-dablue text-right">
                {{ formatRp(store.rekapBill.fisioterapi) }}
              </div>
            </div>
            <div class="row items-center no-wrap ">
              <div class="col-1" />
              <div class="col-9">
                Hemodialisa
              </div>
              <div class="col-2 garis-bawah-dablue text-right">
                {{ formatRp(store.rekapBill.hd) }}
              </div>
            </div>
            <div class="row items-center no-wrap ">
              <div class="col-1" />
              <div class="col-9">
                Anestesi Di Luar OK & ICU
              </div>
              <div class="col-2 garis-bawah-dablue text-right">
                {{ formatRp(store.rekapBill.penunjanglain) }}
              </div>
            </div>
            <div class="row items-center no-wrap ">
              <div class="col-1" />
              <div class="col-9">
                Klinik Psikologi
              </div>
              <div class="col-2 garis-bawah-dablue text-right">
                {{ formatRp(store.rekapBill.psikologi) }}
              </div>
            </div>
            <div class="row items-center no-wrap ">
              <div class="col-1" />
              <div class="col-9">
                Cardio
              </div>
              <div class="col-2 garis-bawah-dablue text-right">
                {{ formatRp(store.rekapBill.cardio) }}
              </div>
            </div>
            <div class="row items-center no-wrap ">
              <div class="col-1" />
              <div class="col-9">
                EEG
              </div>
              <div class="col-2 garis-bawah-dablue text-right">
                {{ formatRp(store.rekapBill.eeg) }}
              </div>
            </div>
            <div class="row items-center no-wrap ">
              <div class="col-1" />
              <div class="col-9">
                Endoscope
              </div>
              <div class="col-2 garis-bawah-dablue text-right">
                {{ formatRp(store.rekapBill.endoscopy) }}
              </div>
            </div>
            <div class="row items-center no-wrap ">
              <div class="col-1">
                7
              </div>
              <div class="col-9">
                Biaya Farmasi / Obat
              </div>
              <div class="col-2 garis-bawah-dablue text-right">
                {{ formatRp(store.rekapBill.obat) }}
              </div>
            </div>
            <!-- total -->
            <div class="row items-center no-wrap ">
              <div class="col-10 text-right">
                Sub Total Rp.
              </div>
              <div class="col-2 text-right garis-bawah-dablue">
                {{ formatRp(store.rekapBill.totalall) }}
              </div>
            </div>
            <div class="row items-center no-wrap ">
              <div class="col-10 text-right">
                Sharing BPJS Rp.
              </div>
              <div class="col-2 text-right ">
                <!-- {{ formatRp(store.rekapBill.totalall) }} -->
                0
              </div>
            </div>
            <div class="row items-center no-wrap">
              <div class="col-10 text-right">
                Total Rp.
              </div>
              <div class="col-2 text-right garis-atas-dblue garis-bawah-dablue">
                {{ formatRp(store.rekapBill.totalall) }}
              </div>
            </div>
            <!-- TT -->
            <div class="row items-center no-wrap q-mt-xl">
              <div class="col-6 text-right" />
              <div class="col-6 text-weight-bold text-center">
                Probolinggo, {{ date.formatDate(Date.now(),'DD MMMM YYYY') }}
              </div>
            </div>
            <div class="row items-center no-wrap">
              <div class="col-6 text-right" />
              <div class="col-6 text-weight-bold text-center">
                Dokter
              </div>
            </div>
            <div class="row items-center no-wrap q-mt-lg">
              <div class="col-6 text-right" />
              <div class="col-6 text-weight-bold text-center">
                {{ pasien.dokter }}
              </div>
            </div>
            <!--
            1  Pelayanan Rekam Medik  Rp.
            2  Biaya Kartu Identitas Pasien  Rp.
            3  Poliklinik Konsultasi (Gizi, Jiwa)  Rp.  10.000
            4  Konsultasi Antar Poli  Rp.
            5  Tindakan :
            (MMPI + Wawancara) Brief Psikoterapi (4x Brief)  Rp.  280.000
            6  Visite / Konsultasi / Oncall Dokter  Rp.
            7  Biaya Pelayanan Penunjang :
            Laboratorium  Rp.
            Radiologi  Rp.
            Operasi One Day Care Rp.
            Fisioterapi  Rp.
            Hemodialisa  Rp.
            Anestesi Di Luar OK & ICU  Rp.
            Klinik Psikologi  Rp.  110.000
            Cardio  Rp.
            EEG  Rp.
            Endoscope  Rp.
            8  Biaya Farmasi / Obat  Rp.
            SUB TOTAL    Rp.  120.000
            Sharing BPJS   Rp.
            TOTAL    Rp.  120.000

            Probolinggo, 02 Oktober 2023
            Dokter
            ( Saiful Alam, Sp.KJ )
            -->
          </div>
          <div v-if="!store.rekapBill && !store.loading">
            <app-no-data />
          </div>
          <div v-if="store.loading">
            <app-loading />
          </div>
        </div>
      </template>
    </app-dialog-mm>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BillingPage from './BillingPage.vue'
import { dateFullFormat, formatRp } from 'src/modules/formatter'
import { useKasirRajalListKunjunganStore } from 'src/stores/simrs/kasir/rajal/kunjungan'
import { date } from 'quasar'

const pasien = ref(null)
const billOpen = ref(false)
const printOpen = ref(false)
const printRekap = ref(false)
const store = useKasirRajalListKunjunganStore()
// const openPrevGc = ref(false)

function openBill(row) {
  pasien.value = row
  billOpen.value = !billOpen.value
}
function openPrint(val) {
  console.log('print', val)
  printOpen.value = true
}
function openFaktur(val) {
  console.log('faktur', val)
  printRekap.value = true
  const par = { noreg: val.noreg }
  console.log('par', par)
  store.getBill(par)
}
function actPrintRekap() {
  console.log('act print rekap')
  printRekap.value = false
}
function getNota(val) {
  const param = {
    golongan: val,
    noreg: pasien.value.noreg
  }
  console.log('golongan nota', param, pasien.value)
  store.getNotas(param)
}

defineProps({
  loading: { type: Boolean, default: false },
  items: { type: Array, default: () => [] }
})

// function getStatus(arr) {
//   if (arr.length === 0) {
//     return '-'
//   }

//   // 1 (mulai waktu tunggu admisi),
//   // 2 (akhir waktu tunggu admisi/mulai waktu layan admisi),
//   // 3 (akhir waktu layan admisi/mulai waktu tunggu poli),
//   // 4 (akhir waktu tunggu poli/mulai waktu layan poli),
//   // 5 (akhir waktu layan poli/mulai waktu tunggu farmasi),
//   // 6 (akhir waktu tunggu farmasi/mulai waktu layan farmasi membuat obat),
//   // 7 (akhir waktu obat selesai dibuat),
//   // 99 (tidak hadir/batal)
//   const arr0 = arr[0].taskid
//   let text
//   switch (arr0) {
//     case '1' || 1:
//       text = 'Menunggu di Admisi'
//       break
//     case '2' || 2:
//       text = 'Pelayanan di Admisi'
//       break
//     case '3' || 3:
//       text = 'Menunggu di Poli'
//       break
//     case '4' || 4:
//       text = 'Pelayanan di Poli'
//       break
//     case '5' || 5:
//       text = 'Menunggu di Farmasi'
//       break
//     case '6' || 6:
//       text = 'Farmasi'
//       break
//     case '7' || 7:
//       text = 'Sudah Ambil Obat di Farmasi'
//       break
//     default:
//       text = 'Tidak Hadir/ Batal'
//   }
//   return text
// }
</script>
<style lang="scss" scoped>
.garis-bawah-double{
  border-bottom: 4px solid rgba(0, 0, 0, 0.572);
  border-bottom-style: double;
}
.garis-atas-double{
  border-top: 4px solid rgba(0, 0, 0, 0.572);
  border-top-style: double;
}
.garis-bawah-dablue{
  border-bottom: 1px solid rgb(56, 150, 239);
  border-bottom-style: dashed;
}
.garis-bawah-dblue{
  border-bottom: 4px solid rgb(56, 150, 239);
  border-bottom-style: double;
}
.garis-atas-dblue{
  border-top: 4px solid rgb(56, 150, 239);
  border-top-style: double;
}
</style>

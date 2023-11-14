<template>
  <div
    id="printMe"
    style="width: 17cm;"
    class="q-pa-xs full-width"
  >
    <div class="row q-col-gutter-xs items-center garis-bawah-double q-mb-md">
      <div class="col-2">
        <q-img
          src="~assets/images/logo-kota-grey.png"
          spinner-color="white"
          style="height: 2cm; max-width: 1.6cm"
        />
      </div>
      <div class="col-8 ">
        <div class="row justify-center">
          <div class="text-weight-bold">
            UOBK RSUD dr. MOHAMAD SALEH
          </div>
        </div>
        <div class="row  justify-center">
          <div>
            Jl. Mayjend Panjaitan No. 65 Probolinggo Jawa Timur
          </div>
        </div>
        <div class="row justify-center">
          Telp. (0335) 433478,433119,421118 Fax. (0335) 432702
        </div>
      </div>
      <div class="col-2 text-right">
        <q-img
          src="~assets/logos/logo-rsud.png"
          spinner-color="white"
          style="height: 2cm; max-width: 2cm"
        />
      </div>
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

    <div class="row items-center no-wrap garis-bawah-dblue garis-atas-dblue">
      <div class="col-1">
        No
      </div>
      <div class="col-9">
        Jenis Layanan
      </div>
      <div class="col-2">
        Harga
      </div>
    </div>

    <div v-if="store.rekapBill && !store.loading">
      <div class="row items-center no-wrap ">
        <div class="col-1">
          1.
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
          2.
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
          3.
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
          4.
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
          5.
        </div>
        <div class="col-9">
          Tindakan :
        </div>
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
      <div class="row items-center no-wrap ">
        <div class="col-1">
          6.
        </div>
        <div class="col-9">
          Biaya Pelayanan Penunjang
        </div>
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
          7.
        </div>
        <div class="col-9">
          Biaya Farmasi / Obat
        </div>
        <div class="col-2 garis-bawah-dablue text-right">
          {{ formatRp(store.rekapBill.obat) }}
        </div>
      </div>

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
      <div class="row items-center no-wrap q-mt-xl">
        <div class="col-6 text-right" />
        <div class="col-6 text-weight-bold text-center">
          {{ pasien.dokter }}
        </div>
      </div>
    </div>
    <div v-if="!store.rekapBill && !store.loading">
      <app-no-data />
    </div>
    <div v-if="store.loading">
      <app-loading />
    </div>
  </div>
</template>
<script setup>
import { dateFullFormat, formatRp } from 'src/modules/formatter'
import { date } from 'quasar'
import { useKasirRajalListKunjunganStore } from 'src/stores/simrs/kasir/rajal/kunjungan'

const store = useKasirRajalListKunjunganStore()
const props = defineProps({
  pasien: { type: Object, default: () => {} }
})
function openFaktur() {
  const par = { noreg: props.pasien?.noreg }
  store.getBill(par)
  // console.log('par', par)
}
openFaktur()
defineExpose({ openFaktur })

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

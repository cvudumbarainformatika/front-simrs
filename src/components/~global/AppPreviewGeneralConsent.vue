<template>
  <q-dialog
    persistent
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card
      flat
      style="min-width:70vw"
    >
      <q-bar class="bg-secondary">
        <div>📝 Preview General Consent Pasien</div>
        <q-space />

        <q-btn
          dense
          flat
          icon="icon-mat-close"
          @click="emits('close')"
        >
          <q-tooltip
            class="bg-white text-primary"
          >
            close
          </q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section
        style="max-height: 80vh"
        class="scroll"
      >
        <div class="text-weight-bold text-center">
          PERSETUJUAN PASIEN
        </div>
        <div class="text-weight-bold">
          IDENTITAS PASIEN
        </div>
        <div class="q-ml-lg q-my-sm">
          <div>Nama Pasien : </div>
          <div>Nomor Rekam Medis : </div>
          <div>Tanggal Lahir : </div>
          <div>Alamat : </div>
          <div>No Telp : </div>
        </div>

        <div class="text-weight-bold q-mb-sm">
          I. PERSETUJUAN UNTUK PERAWATAN DAN PENGOBATAN
        </div>
        <div class="text-weight-bold">
          Yang bertanda tangan dibawah ini :
        </div>
        <div class="q-mb-sm">
          <div>Nama : </div>
          <div>Alamat : </div>
          <div>No Telp : </div>
          <div>Hubungan dengan Pasien : </div>
        </div>
        <p>
          Bahwasannya saya, <b>Menyetujui</b> dan <b>Mengizinkan</b> kepada Dokter dan profesional lainnya untuk melakukan
          prosedur diagnostik atau pengobatan medis yang diperlukan dalam penilaian profesional mereka
          contoh: pemeriksaanx-ray/radiology, tes darah, perawatan rutin dan prosedur seperti cairan infus atau suntikan, evaluasi
          (contohnya wawancara dan pemeriksaan fisik), pemberian obat dan pemeriksaan lainnya.
          Jika saya memutuskan untuk menghentikan perawatan medis untuk diri saya sendiri,
          Saya memahami dan menyadari bahwa Dokter atau profesional lainnya tidak bertanggung jawab atas hasil yang merugikan saya sendiri.
        </p>
        <div class="text-weight-bold q-mt-sm">
          a. Ketentuan Pembayaran
        </div>
        <p>
          Saya memahami dan <b>Menyetujui </b> informasi tentang ketentuan Pembayaran yang dijelaskan oleh petugas Rumah Sakit
        </p>
        <div class="text-weight-bold q-mt-sm">
          b. Hak dan Kewajiban Pasien
        </div>
        <p>
          saya mengakui dan <b>Menyetujui </b> bahwa dalam proses pendaftaran untuk mendapatkan perawatan di Rumah Sakit MOHAMAD SALEH dan penandatangan dokumen ini,
          saya telah mendapat informasi tentang hak-hak dan kewajiban saya sebagai pasien
        </p>
        <div class="text-weight-bold q-mt-sm">
          c. Kebutuhan Penterjemah Bahasa
        </div>
        <p>
          blablabla...
        </p>
        <div class="text-weight-bold q-mt-sm">
          d. Kebutuhan Rohaniawan
        </div>
        <p>
          blablabla...
        </p>
        <div class="text-weight-bold q-mt-sm">
          e. Pelepasan Informasi / Kerahasiaan Informasi
        </div>
        <p>
          Saya mengakui bahwa pihak Rumah Sakit akan menjamin kerahasiaan Informasi tentang Rekam Medis Saya kecuali saya
          mengungkapkan sendiri atau untuk kepentingan lain seperti pernyataan persetujuan saya dibawah berikut.
        </p>
        <div class="row no-wrap">
          <div class="q-mr-sm">
            1.
          </div>
          <div>
            Saya <b>Menyetujui </b> kepada pihak Rumah Sakit untuk memberikan informasi tentang diagnosis, hasil pelayanan dan pengobatan bila diperlukan untuk memproses klaim asuransi/perusahaan seperti BPJS dan lainnya.
          </div>
        </div>
        <div class="row no-wrap">
          <div class="q-mr-sm">
            2.
          </div>
          <div>
            Saya <b>Menyetujui </b> kepada pihak Rumah Sakit untuk memberikan informasi tentang diagnosis, hasil pemeriksaan dan pengobatan untuk keperluan Pendidikan.
          </div>
        </div>
        <div class="row no-wrap">
          <div class="q-mr-sm">
            3.
          </div>
          <div>
            Saya <b>Menyetujui </b> kepada pihak Rumah Sakit untuk memberi informasi tentang diagnosis Hasil Pemeriksaan Kepada Anggota Keluarga saya yang saya beri kuasa ( Orangtua kandung/suami istri/ kakak / adik saya).
          </div>
        </div>
        <div class="row no-wrap">
          <div class="q-mr-sm">
            4.
          </div>
          <div>
            Saya <b>Menyetujui </b> kepada pihak Rumah Sakit untuk memberi informasi tentang diagnosis Hasil Pemeriksaan Kepada FASYANKES tertentu dalam rangka rujukan , sebagai bahan pertimbangan kelanjutan pengobatan medis saya.
          </div>
        </div>
        <!-- </div> -->
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>

const emits = defineEmits(['close'])
</script>

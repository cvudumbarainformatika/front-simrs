<template>
  <div id="printMe" class="f-12 row justify-center q-pt-md">
    <div class="row">
      <div class="col-1 q-pl-md">
        <q-img
          src="~assets/images/Pemkot.svg"
          style="height: 2.6cm; width: 2cm"
        />
      </div>
      <div class="col-10 q-pt-md">
        <div class="row justify-center text-h8">
          BADAN LAYANAN UMUM DAERAH (BLUD) UOBK RSUD DOKTER MOHAMAD SALEH
        </div>
        <div class="row justify-center text-h6 text-weight-bold">
          LAPORAN PERUBAHAN SALDO ANGGARAN LEBIH
        </div>
        <div class="row justify-center text-h8 text-weight-bold">
          UNTUK TAHUN YANG BERAKHIR SAMPAI DENGAN 31 DESEMBER TAHUN ....
        </div>
      </div>
      <div class="col-1 logo_kanan">
        <q-img
          src="~assets/logos/logo-rsud.png"
          style="height: 2.6cm; width: 2.6cm"
        />
      </div>

      <div class="ttd-kanan">
        <div class="q-py-xs">
          Probolinggo, tanggal
        </div>
        <div class="text-bold">
          Bendahara Pengeluaran
        </div>
        <div style="padding-bottom: 40px" />
        <div class="underline text-bold q-py-xs">
          {{ pegawai.pegawais[0]?.nama }}
          <div class="garis-bawah" style="text-decoration-line: underline;" />
        </div>
        <div>
          NIP. {{ pegawai.pegawais[0]?.nip }}
        </div>
      </div>
      <div class="ttd-kiri">
        <div class="invisible">
          .
        </div>
        <div class="text-bold q-py-xs q-pt-sm">
          Pejabat Teknis Kegiatan
        </div>
        <div style="padding-bottom: 40px" />
        <div class="underline text-bold q-py-xs">
          PPTK
          <div class="garis-bawah" style="text-decoration-line: underline;" />
        </div>
        <div>
          NIP.
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useLaporanBkuPengeluaranStore } from 'src/stores/siasik/laporan/bku/bkupengeluaran'
import { onMounted } from 'vue'
const pegawai = useLaporanBkuPengeluaranStore()
onMounted(() => {
  pegawai.getDataTable()
})
</script>
<style lang="scss" scoped>

.kop{
  border-bottom: 1px solid grey;
  width: fit-content;
}
.logo_kanan{
  right: 5%;
  position: relative;
}

.ttd-kanan{
  position: relative;
  top: 50px;
  text-align: center;
  justify-content: center;
  width: 60%;
  height: 100px;
  left: 40%;
}
.ttd-kiri{
  position: relative;
  bottom: 50px;
  text-align: center;
  justify-content: center;
  width: 50%;
  height: 100px;
}
.underline {
  text-decoration-line: underline;

}
</style>

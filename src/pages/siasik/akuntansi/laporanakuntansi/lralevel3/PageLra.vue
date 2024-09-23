<template>
  <q-page>
    <ListDataLra />

    <!-- <div class="ttd-kanan">
      <div class="q-py-xs">
        Probolinggo, tanggal
      </div>
      <div class="text-bold">
        Direktur UOBK RSUD Dokter Mohamad Saleh
      </div>
      <div class="text-bold">
        Kota Probolinggo
      </div>
      <div style="padding-bottom: 40px" />
      <div class="underline text-bold q-py-xs">
        {{ pegawai.pegawais[1]?.nama }}
        <div class="garis-bawah" style="text-decoration-line: underline;" />
      </div>
      <div>
        NIP. {{ pegawai.pegawais[1]?.nip }}
      </div>
    </div> -->
  </q-page>
</template>
<script setup>
import { useLaporanBkuPengeluaranStore } from 'src/stores/siasik/laporan/bku/bkupengeluaran'
import ListDataLra from './inpage/ListDataLRA.vue'
// eslint-disable-next-line no-unused-vars
import { useLaporanLraLaprealisasianggaranStore } from 'src/stores/siasik/laporan/lra/laprealisasianggaran'
import { onMounted } from 'vue'
// const store = useLaporanLraLaprealisasianggaranStore()
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

.underline {
  text-decoration-line: underline;

}
</style>

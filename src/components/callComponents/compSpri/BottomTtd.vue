<template>
  <div class="row q-mt-md">
    <div class="col text-center">
      <div>Mengetahui,</div>
      <div class="q-mt-xs">
        Petugas Tpp Rawat Jalan
      </div>
      <div class="row full-width text-center justify-center">
        <div style="width: 100px;">
          <vue-qrcode
            :value="qrUrl"
            tag="svg"
            :options="{
              errorCorrectionLevel: 'Q',
              color: {
                dark: '#000000',
                light: '#ffffff',
              },
              margin:2
            }"
          />
        </div>
        <!-- {{ pasien?.ttdpasien }} -->
      </div>
      <div>{{ app?.user?.pegawai?.nama || 'Nama' }}</div>
    </div>
    <div class="col text-center">
      <div>Probolinggo, pasien</div>
      <div class="q-mt-xs">
        Pasien / Keluarga
      </div>
      <div
        style="min-height: 50px;"
        class="column flex-center"
      >
        <!-- <div v-if="!store?.form?.ttdpasien">
          Ttd
        </div>
        <div v-else>
          <img
            :src="store?.form?.ttdpasien"
            alt="ttd-pasien-rsudmohsaleh"
            width="150"
          >
        </div> -->

        ttdx
      </div>
      <div> {{ pasien?.name ?? 'Nama' }} </div>
    </div>
  </div>
</template>

<script setup>
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { computed } from 'vue'

defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const app = useAplikasiStore()

const qrUrl = computed(() => {
  const noreg = 'pasien?.norm'// noreg
  const dok = 'GENERAL-CONSENT.png'
  const asal = 'GENERAL-CONSENT'
  const enc = btoa(`${noreg}|${dok}|${asal}`)
  return `https://rsud.probolinggokota.go.id/dokumen-simrs/legalitas/${enc}`
  // return `https://xenter.my.id/qr-document?noreg=${noreg}&dokumen=${dok}&asal=${asal}`
})

</script>

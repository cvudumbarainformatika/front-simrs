<template>
  <q-page
    class=""
    :class="style.componentfull?'container-no-header':'container--q-header q-pa-xs'"
  >
    <div class="header bg-primary text-white">
      <header-page />
    </div>

    <q-card
      flat
      no-shadow
      square
      class="my-flex-1"
      style="overflow: hidden;"
    >
      <q-scroll-area style="height: calc(100% - 1px);">
        <list-loading v-if="store.loading" />
        <list-pengunjung v-else />
      </q-scroll-area>
      <div class="absolute-bottom bg-primary text-white z-top">
        <footer-page
          v-if="store.pasiens.length"
          :meta="store.meta"
          @go-to="(val)=> store.goToPage(val)"
        />
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import ListLoading from './ListLoading.vue'
import ListPengunjung from './ListPengunjung.vue'
import HeaderPage from './HeaderPage.vue'
import FooterPage from './FooterPage.vue'
import { useStyledStore } from 'src/stores/app/styled'
import { usePengunjungRanapStore } from 'src/stores/simrs/ranap/pengunjung'
import { onMounted } from 'vue'
import { usePenilaianRanapStore } from 'src/stores/simrs/ranap/penilaian'
import { useDiagnosaStore } from 'src/stores/simrs/ranap/diagnosa'
import { useTindakanRanapStore } from 'src/stores/simrs/ranap/tindakan'
import { useDiagnosaKeperawatan } from 'src/stores/simrs/pelayanan/poli/diagnosakeperawatan'
import { useLaboratPoli } from 'src/stores/simrs/pelayanan/poli/laborat'
import { useRadiologiPoli } from 'src/stores/simrs/pelayanan/poli/radiologi'
import { usePermintaanBankDarahStore } from 'src/stores/simrs/ranap/bankdarah'
import { usePermintaanApheresisStore } from 'src/stores/simrs/ranap/apheresis'
import { usePermintaanAmbulanStore } from 'src/stores/simrs/ranap/ambulance'
const style = useStyledStore()
const store = usePengunjungRanapStore()

const penilaian = usePenilaianRanapStore()
const diagnosa = useDiagnosaStore()
const diagnosakeperawatan = useDiagnosaKeperawatan()
const tindakan = useTindakanRanapStore()
const lab = useLaboratPoli()
const radiologi = useRadiologiPoli()
const bankdarah = usePermintaanBankDarahStore()
const apheresis = usePermintaanApheresisStore()
const ambulan = usePermintaanAmbulanStore()

onMounted(() => {
  Promise.all([
    penilaian.getMaster(),
    diagnosa.getDiagnosaDropdown(),
    diagnosakeperawatan.getData(),
    tindakan.getTindakanDropdown(),
    tindakan.getAllPetugas(),

    // penunjang

    lab.getMasterLaborat(),
    radiologi.getRadiologi(),
    radiologi.getJenisRadiologi(),
    bankdarah.getMaster(),
    apheresis.getMaster(),
    ambulan.getTujuanAmbulance(),

    store.getNakes()

  ])
})
</script>

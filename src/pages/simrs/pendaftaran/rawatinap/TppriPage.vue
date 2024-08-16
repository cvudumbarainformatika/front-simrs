<template>
  <q-page class="fit q-pa-sm absolute" style="overflow: hidden;">
    <q-card class="bg-transparent fit">
      <div class="column fit q-pa-md">
        <div class="col-auto">
          <header-comp :menus="lists" :tab="tab" @go-to="pilihMenu" />
          <q-separator class="q-my-sm" />
        </div>
        <div class="col full-height scroll">
          <menu-comp v-if="tab?.name === 'tppri-page'" :lists="lists" @on-select="pilihMenu" />

          <component
            :is="tab?.comp"
            v-else
          />
        </div>
      </div>
    </q-card>

    <page-kamar
      v-model="store.openDialogShowKamar"
      @close="store.openDialogShowKamar = false"
    />
  </q-page>
</template>

<script setup>
import { useFormPendaftaranRanapStore } from 'src/stores/simrs/pendaftaran/ranap/formpendaftaran'
import { defineAsyncComponent, ref, onMounted, shallowRef } from 'vue'
const HeaderComp = defineAsyncComponent(() => import('./compTppri/HeaderComp.vue'))
const MenuComp = defineAsyncComponent(() => import('./compTppri/MenuComp.vue'))
const PageKamar = defineAsyncComponent(() => import('./pagemenus/PageKamar.vue'))

const lists = ref([
  {
    name: 'tppri-page', // yg ini jangan diganti yaaa kalo diganti harus ganti computed di menuComp
    icon: 'icon-mat-dashboard',
    title: 'TPPRI PAGE',
    subtitle: 'Halaman Menu Pendaftaran Rawat Inap',
    color: 'indigo'
  },
  {
    name: 'form-pendaftaran',
    icon: 'icon-mat-assignment_ind',
    title: 'Form Pendaftaran',
    subtitle: 'Pendaftaran Pasien Rawat Inap',
    color: 'green',
    comp: shallowRef(defineAsyncComponent(() => import('./pagemenus/FormPendaftaran.vue')))
  },
  {
    name: 'list-igd',
    icon: 'icon-fa-laptop-medical-solid',
    title: 'List IGD',
    subtitle: 'Pasien tunggu Rawat Inap dari IGD',
    color: 'cyan',
    comp: shallowRef(defineAsyncComponent(() => import('./pagemenus/PageIgd.vue')))
  },
  {
    name: 'list-spri',
    icon: 'icon-mat-medical_information',
    title: 'List RAJAL SPRI',
    subtitle: 'Pasien tunggu SPRI dari Rawat Jalan',
    color: 'deep-orange',
    comp: shallowRef(defineAsyncComponent(() => import('./pagemenus/PageRajal.vue')))
  },
  {
    name: 'history',
    icon: 'icon-mat-dvr',
    title: 'History',
    subtitle: 'Riwayat Pendaftaran Rawat Inap',
    color: 'blue-grey',
    comp: shallowRef(defineAsyncComponent(() => import('./pagemenus/PageHistory.vue')))
  },
  {
    name: 'status-kamar',
    icon: 'icon-mat-bedroom_parent',
    title: 'Status Kamar',
    subtitle: 'Daftar Kamar / BED Rawat Inap',
    color: 'amber'
  }
])

const tab = ref(null)

const store = useFormPendaftaranRanapStore()

onMounted(() => {
  tab.value = lists.value[0]

  Promise.all([
    store.getKelamin(), // sudah di cache
    store.getSapaan(), // sudah di cache
    store.getPendidikan(), // sudah di cache
    store.getAgama(), // sudah di cache
    store.getBahasa(), // sudah di cache
    store.getStatusPernikahan(), // sudah di cache
    store.getPekerjaan(), // sudah di cache
    store.getAsalRujukan(), // sudah di cache
    // store.getHakRuang(),
    store.getSistemBayar(), // sudah di cache
    store.getKamar(), // sudah di cache
    store.getDokter(), // sudah di cache
    store.getJenisKasus()
  ])
})

const pilihMenu = (val) => {
  if (val.name === 'status-kamar') {
    store.openDialogShowKamar = true
  }
  else {
    tab.value = val
    console.log('menu', val)
  }
}

</script>

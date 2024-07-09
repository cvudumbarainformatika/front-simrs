<template>
  <div class="fit row q-pa-xs">
    <div class="col-4 form full-height">
      <q-card class="fit">
        <div class="fit column">
          <div class="col-auto">
            <q-tabs
              v-model="tab"
              dense
              class="bg-primary text-grey-5 shadow-2"
              active-color="yellow-3"
              indicator-color="yellow-3"
              narrow-indicator
              switch-indicator
              align="justify"
              :breakpoint="0"
            >
              <q-tab name="nonracikan" label="Non Racik" />
              <q-tab name="racikan" label="Racikan" />
              <q-tab name="template" label="Template" />
            </q-tabs>
          </div>

          <div class="col full-height relative-position">
            <q-tab-panels v-model="tab" animated class="fit absolute">
              <q-tab-panel name="nonracikan" class="fit overflow-hidden q-pa-none">
                <q-form ref="formRef" @submit="simpanNonRacikan" class="full-height column">
                  <div class="col fit">
                    <FormNonRacik :pasien="pasien" :depo="depo" :is-reset="isReset" @reset-done="isReset = false" />
                  </div>
                  <div class="absolute-bottom full-width row justify-between q-pa-sm bg-primary">
                    <div class="q-gutter-xs">
                      <q-btn
                        label="<-"
                        type="button"
                        color="dark"
                        class="q-px-md"
                        dense
                        @click="emits('back')"
                      >
                        <q-tooltip>Kembali Ke Halaman Resep</q-tooltip>
                      </q-btn>
                      <q-btn
                        label="Reset"
                        type="button"
                        color="dark"
                        class="q-px-md"
                        dense
                        @click="resetChild"
                      />
                    </div>
                    <q-btn
                      label="simpan ke list"
                      type="submit"
                      color="white"
                      text-color="primary"
                      class="q-px-md"
                      dense
                    />
                  </div>
                </q-form>
              </q-tab-panel>

              <q-tab-panel name="racikan" class="fit overflow-hidden q-pa-none">
                <q-form ref="formRefRacikan" class="fit column" @submit="simpanRacikan">
                  <div class="col fit scroll">
                    <FormRacikan :pasien="pasien" :depo="depo" :is-reset="isReset" @reset-done="isReset = false" />
                  </div>
                  <div class="absolute-bottom full-width row justify-between q-pa-sm bg-teal">
                    <div class="q-gutter-xs">
                      <q-btn
                        label="<-"
                        type="button"
                        color="dark"
                        class="q-px-md"
                        dense
                        @click="emits('back')"
                      >
                        <q-tooltip>Kembali Ke Halaman Resep</q-tooltip>
                      </q-btn>
                      <q-btn
                        label="Reset"
                        type="button"
                        color="dark"
                        class="q-px-md"
                        dense
                        @click="resetChildRacikan"
                      />
                    </div>
                    <q-btn
                      label="simpan ke list"
                      type="submit"
                      color="white"
                      text-color="teal"
                      class="q-px-md"
                      dense
                    />
                  </div>
                </q-form>
              </q-tab-panel>

              <q-tab-panel name="template" class="fit overflow-hidden q-pa-none">
                <ListTemplate v-if="store.templates.length" :items="store.templates" @select="store.selectTemplate" @delete="store.deleteTemplate" />
                <div class="fit column flex-center bg-grey-4">
                  <div class="text-dark">
                    Belum ada template
                  </div>
                </div>
                <div class="absolute-bottom bg-yellow-3 q-pa-sm row full-width items-center justify-between">
                  <div>
                    <q-btn
                      label="<-"
                      type="button"
                      color="dark"
                      class="q-px-md"
                      dense
                      @click="emits('back')"
                    />
                  </div>
                  <div>
                    <q-btn
                      label="Template Baru"
                      type="button"
                      color="dark"
                      class="q-px-md"
                      dense
                      @click="templateBaru"
                    />
                  </div>
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>
      </q-card>
    </div>
    <q-card class="col fit q-ml-xs">
      <div class="column fit">
        <ListDetilObatTemplate @back="emits('back')" @row-click="onRowClick" @kirim-order="kirimOrder" />
      </div>
    </q-card>
  </div>
</template>

<script setup>
import { notifErrVue } from 'src/modules/utils'
import { useTemplateEResepStore } from 'src/stores/simrs/farmasi/permintaanresep/templateeresep'
import { defineAsyncComponent, onMounted, ref, watch } from 'vue'

const FormNonRacik = defineAsyncComponent(() => import('./compTemplate/FormNonRacik.vue'))
const FormRacikan = defineAsyncComponent(() => import('./compTemplate/FormRacikan.vue'))
const ListDetilObatTemplate = defineAsyncComponent(() => import('./compTemplate/ListDetilObatTemplate.vue'))
const ListTemplate = defineAsyncComponent(() => import('./compTemplate/ListTemplate.vue'))

const store = useTemplateEResepStore()
const formRef = ref(null)
const formRefRacikan = ref(null)
const isReset = ref(false)

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  depo: {
    type: String,
    default: ''
  },
  isCari: {
    type: Boolean,
    default: false
  }
})

// eslint-disable-next-line no-unused-vars
const emits = defineEmits(['back'])

const tab = ref('template')

onMounted(() => {
  // store.initItems()
  // console.log('dpPar', store.dpPar)
  awal()
})

const onRowClick = (val) => {
  // console.log('onRowClick', val)
  if (val?.racikan) {
    tab.value = 'racikan'
  }
  else {
    tab.value = 'nonracikan'
  }
}

const simpanNonRacikan = () => {
  // console.log('simpan non racikan', store.form)
  // store.form.racikan = false
  store.saveListItems()
    .then(() => {
      resetChild()
    })

  // resetChild()
}

function resetChild () {
  formRef.value.reset()
  formRef.value.resetValidation()
  setTimeout(() => {
    isReset.value = true
  }, 100)
}

function resetChildRacikan () {
  formRefRacikan.value.reset()
  formRefRacikan.value.resetValidation()
  setTimeout(() => {
    isReset.value = true
  }, 100)
}

function simpanRacikan () {
  // console.log('simpan racikan', store.form)
  // store.form.racikan = true
  if (store.form?.rincian?.length === 0) {
    return notifErrVue('Pilih Bahan Obat terlebih dahulu')
  }
  store.saveListItems()
    .then(() => {
      resetChildRacikan()
    })
}

function templateBaru () {
  store.templateSelected = null
  store.items = []
  store.updateListItems()
  store.errorsOrder = []
  tab.value = 'nonracikan'
}

// eslint-disable-next-line no-unused-vars
function awal () {
  if (!props.isCari) {
    store.templateSelected = null
    store.items = []
    store.updateListItems()
  }
  store.errorsOrder = []
  tab.value = 'template'
}

function kirimOrder () {
  // console.log('kirim order', props.pasien)
  if (!props.pasien) return notifErrVue('Pasien Belum Terdaftar')
  if (store.dpPar === '' || store.dpPar === null) return notifErrVue('tidak ada depo tujuan')
  // if (store.selectTemplate === null) return notifErrVue('pilih template terlebih dahulu')
  if (props?.pasien?.groups === '' || props?.pasien?.groups === null) return notifErrVue('Sistem Bayar Pasien Belum Jelas')
  if (props?.pasien?.noreg === '' || props?.pasien?.noreg === null) return notifErrVue('NOREG PASIEN BELUM TERDAFTAR')
  if (props?.pasien?.norm === '' || props?.pasien?.norm === null) return notifErrVue('NORM PASIEN BELUM TERDAFTAR')
  if (store.items.length === 0) return notifErrVue('Tidak Ada obat terpilih')

  const non = store.items?.filter(item => !item.racikan)
  // console.log('non', non)
  // eslint-disable-next-line no-unused-vars
  const nonObat = non?.length
    ? non.map(x => {
      return {
        kodeobat: x?.kodeobat,
        jumlah_diminta: x?.jumlah_diminta,
        konsumsi: x?.konsumsi,
        racikan: false,
        tiperacikan: false,
        namaracikan: false,
        keteranganx: false,
        kemasan: false,
        tiperesep: x?.tiperesep,
        signa: x?.signa,
        keterangan: x?.keterangan,
        dosis: 0
      }
    })
    : []
  const racikan = store.items?.filter(item => item.racikan)
  const obatRacikan = []
  for (let i = 0; i < racikan.length; i++) {
    const el = racikan[i]
    const rincian = el?.rincian
    for (let n = 0; n < rincian.length; n++) {
      const sub = rincian[n]
      obatRacikan.push({
        kodeobat: sub?.kodeobat,
        jumlah_diminta: sub?.jumlah_diminta,
        konsumsi: el?.konsumsi,
        racikan: el?.kodeobat,
        tiperacikan: el?.tiperacikan,
        namaracikan: el?.namaobat,
        keteranganx: sub?.keterangan,
        kemasan: el?.satuan_kcl,
        tiperesep: el?.tiperesep,
        dosis: el.tiperacikan === 'non-DTD' ? 0 : sub?.dosis,
        signa: el?.signa,
        keterangan: el?.keterangan
      })
    }
  }

  // console.log('racikan', store.items)

  const merged = nonObat.concat(obatRacikan)

  // jika ada obat yangsama
  const array = merged.map(obj => {
    return { kodeobat: obj.kodeobat, jumlah_diminta: obj.jumlah_diminta }
  })

  const sumMap = {}

  array.forEach(obj => {
    if (sumMap[obj?.kodeobat]) {
      sumMap[obj?.kodeobat] += obj?.jumlah_diminta
    }
    else {
      sumMap[obj?.kodeobat] = obj?.jumlah_diminta
    }
  })

  const thumb = []
  for (let i = 0; i < Object.entries(sumMap).length; i++) {
    const el = Object.entries(sumMap)[i]
    const obj = {
      kodeobat: el[0],
      jumlah_diminta: el[1]
    }
    // console.log('el', el[0])
    thumb.push(obj)
  }

  // console.log('kirim order', props?.pasien)
  // console.log('kirim order racikan', obatRacikan)
  // console.log('kirim order', merged)

  const diagnosa = props?.pasien?.diagnosa?.length ? props?.pasien?.diagnosa[0].masterdiagnosa?.rs1 : ''
  const diagnosaisi = props?.pasien?.diagnosa?.length ? props?.pasien?.diagnosa[0].masterdiagnosa?.rs4 : ''

  const payload = {
    template_id: store?.templateSelected?.id,
    kodedepo: store?.dpPar,
    groupsistembayar: props?.pasien?.groups,
    noreg: props?.pasien?.noreg,
    norm: props?.pasien?.norm,
    kdruangan: props?.pasien?.kodepoli,
    diagnosa: diagnosa + ' - ' + diagnosaisi,
    kodeincbg: '',
    uraianinacbg: '',
    tarifina: '',
    tiperesep: store?.items[0]?.tiperesep,
    tagihanrs: '',
    sistembayar: props?.pasien?.kodesistembayar,

    items: merged,
    merged: thumb
  }
  store.kirimOrder(payload)
    .then(() => {
      emits('back')
    })

  // console.log('pasian', props.pasien)

  // try {
  //   console.log('payload', payload)
  // }
  // catch (error) {
  //   console.log('error', error)
  // }
}

watch(() => props.depo, (old, val) => {
  // console.log('watch old', old)
  // console.log('watch new', val)
  if (old !== val) {
    // store.getTemplates(old)
    const cariDepo = store.depos?.find(x => x.jenis === old)?.value
    store.dpPar = cariDepo
    store.getTemplates(cariDepo)
  }
}, { immediate: true })
</script>

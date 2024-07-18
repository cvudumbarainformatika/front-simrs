<template>
  <q-page
    class=""
    :class="style.componentfull?'container-no-header':'container--q-header q-pa-xs'"
  >
    <div class="header">
      <HeaderComp
        ada-per-page
        ada-refresh
        use-full
        :ruang="kdruangansim"
        :search="store.params.q"
        :flag="store.params.flag"
        :tipe="store.params.tipe"
        :per-page="store.params.per_page"
        @cari="store.setSearch"
        @refresh="store.refresh"
        @set-per-page="store.setPerPage"
        @set-flag="store.setFlag"
        @set-tipe="store.setTipe"
        @set-periode="(val)=>store.setPeriodik(val)"
        @set-sistembayar="store.setSistembayar"
        @set-list-sistembayar="store.setListSistembayar"
      />
    </div>
    <q-card
      flat
      no-shadow
      square
      class="my-flex-1 scroll"
    >
      <q-scroll-area
        style="height:calc( 100% - 40px)"
      >
        <ListPage
          :loading-call="speech.isLoading"
          :ruangan="kdruangansim"
          @panggilan="panggil"
        />
      </q-scroll-area>
      <div
        v-if="Object.keys(store.meta).length"
        class="absolute-bottom bg-primary text-white"
      >
        <BottomComp
          :meta="store.meta"
          @go-to="store.setPage"
        />
      </div>
    </q-card>

    <!-- dialogPage -->
    <app-fullscreen-blue
      v-model="store.isOpen"
      @close="store.setClose"
    >
      <template #default>
        <DialogPage />
      </template>
    </app-fullscreen-blue>

    <!-- InfoPage -->
    <app-fullscreen-blue
      v-model="store.isInfo"
      @close="store.closeInfo"
    >
      <template #default>
        <InfoPage />
      </template>
    </app-fullscreen-blue>
    <DialogAlasan v-model="store.isAlasan" @close="alasanClose" />
  </q-page>
</template>

<script setup>
import { useStyledStore } from 'src/stores/app/styled'
import { defineAsyncComponent, watch, onMounted, computed, ref } from 'vue'
import { useEResepDepoFarmasiStore } from 'src/stores/simrs/farmasi/eresep/eresep'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { laravelEcho } from 'src/modules/newsockets'
import { useSpeechStore } from 'src/stores/antrian/speech'
import { useSettingsAplikasi } from 'src/stores/simrs/settings'

const HeaderComp = defineAsyncComponent(() => import('./comp/HeaderComp.vue'))
const BottomComp = defineAsyncComponent(() => import('./comp/BottomComp.vue'))
const ListPage = defineAsyncComponent(() => import('./comp/ListPage.vue'))
const DialogPage = defineAsyncComponent(() => import('./comp/DialogPage.vue'))
const InfoPage = defineAsyncComponent(() => import('./comp/InfoPage.vue'))
const DialogAlasan = defineAsyncComponent(() => import('./comp/DialogAlasan.vue'))

const style = useStyledStore()
const store = useEResepDepoFarmasiStore()
const apps = useAplikasiStore()
function alasanClose () {
  store.isAlasan = false
  store.isTolak = false
}
function subscribedChannel () {
  const channel = laravelEcho.private('private.notif.depo-farmasi')
  channel.subscribed(() => {
    console.log('subscribed private.notif.depo-farmasi channel !!!')
  }).listen('.notif-message', (e) => {
    console.log('listen notif', e)
    if (apps?.user?.kdruangansim === e?.message?.data?.depo && e?.message?.data?.status === '1') {
      if (store.params.page === 1 && store.items.length < store.params.per_page && store.meta?.last_page === 1) store.getSatuResep(e?.message?.data)
      else store.getDataTable(true)
    }
  })
}
const kdruangansim = computed(() => {
  return apps?.user?.kdruangansim
})

// panggilan

const setting = useSettingsAplikasi()
const speech = useSpeechStore()

const indexVoices = ref(0)
function setSpeech (txt) {
  console.log(speech.voiceList)
  const voice = speech.utterance
  voice.text = txt
  voice.voice = speech.voiceList[indexVoices.value]

  voice.volume = 1
  voice.pitch = 1
  voice.rate = 1

  return voice
}
const kdDisplay = computed(() => {
  const poli = setting.penunjangs
  const kdpoli = 'APT001'

  const target = poli.filter(x => x.kodepoli === kdpoli)
  if (target.length) {
    return target[0].displaykode
  }
  return null
})
function panggil (row) {
  // console.log('row', row)
  const nama = (row?.datapasien?.nama_panggil) ? (row?.datapasien?.nama_panggil)?.toLowerCase() : ''
  const unit = 'Apotek  Rawat  Jalan'
  const noAntrean = row?.antrian?.nomor ? row?.antrian?.nomor.toUpperCase() : ''
  // eslint-disable-next-line no-unused-vars
  const txt1 = 'pasien ? . ' + nama + '? ...Harap menujuu  ' + unit
  // eslint-disable-next-line no-unused-vars
  const txt2 = 'Nomor Antrian ... ' + noAntrean + '? ...Harap menujuu' + unit

  const txt3 = 'Nomor Antrian ... ' + noAntrean + '... nama!  ' + nama + '! ...Harap menujuu  ' + unit
  // const txt = jns === 'nama' ? txt1 : txt2
  speech.synth.speak(setSpeech(txt3))
  // console.log(row)
  // store.sendPanggil(row, `display${kdDisplay.value}`)
  store.sendPanggil(row, `display${kdDisplay.value}`)
}
function getListVoices () {
  return new Promise(
    function (resolve, reject) {
      const synth = speech.synth
      let id = 0

      id = setInterval(() => {
        if (synth.getVoices().length !== 0) {
          speech.voiceList = synth.getVoices()
          resolve(synth.getVoices())
          clearInterval(id)
        }
      }, 10)
    }
  )
}
function settingsVoice () {
  const voices = speech.voiceList
  if (voices.length) {
    const lang = voices?.map(x => x.lang)
    const ind = lang.findIndex(x => x === 'id-ID') ?? 0
    indexVoices.value = ind
  }

  // const synth = window.speechSynthesis
  speech.synth.onvoiceschanged = () => {
    speech.synth.setVoiceList(voices)
  }
  // console.log('voices', voices)
  // console.log('speech', speech)
  listenForSpeechEvents()
}
function listenForSpeechEvents () {
  speech.utterance.onstart = () => {
    console.log('start...')
    speech.isLoading = true
  }
  speech.utterance.onend = () => {
    console.log('end...')
    speech.isLoading = false
  }
}
onMounted(() => {
  setting.getPenunjang()
  store.getApoteker()
  const depo = store.depos.filter(a => a.value === apps?.user?.kdruangansim)
  if (depo.length) {
    store.setParams('kddepo', apps?.user?.kdruangansim)
    store.getDataTable()
  }
  subscribedChannel()
  getListVoices().then((x) => {
    settingsVoice()
  })
})
watch(() => apps?.user?.kdruangansim, (obj) => {
  store.setParams('kddepo', obj)
  store.setParams('tipe', 'normal')
  const depo = store.depos.filter(a => a.value === obj)
  if (depo.length) store.getDataTable()
  else {
    store.items = []
    store.meta = {}
  }
})
</script>

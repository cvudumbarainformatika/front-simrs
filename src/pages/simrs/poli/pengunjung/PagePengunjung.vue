<template>
  <q-page
    class=""
    :class="style.componentfull?'container-no-header':'container--q-header q-pa-xs'"
  >
    <div class="header bg-primary text-white">
      <HeaderComp
        class="q-pa-xs"
        :tanggal="store.params.tgl"
        :search="store.params.q"
        :per-page="store.params.per_page"
        :full="style.componentfull"
        :custom="store.custom"
        @fullscreen="style.setComponentFull"
        @set-tanggal="(val)=>store.setDate(val)"
        @set-search="store.setQ"
        @set-row="store.setPerPage"
        @refresh="store.getData"
        @set-periode="(val)=>store.setPeriodik(val)"
        @filter="store.setFilters"
        @normal="store.notCustom"
        @set-poli="(val)=> store.setPolis(val)"
      />
    </div>
    <div class="footer absolute-bottom bg-primary text-white z-top">
      <!-- <FooterComp :items="store.items" /> -->
      <BottomComp
        v-if="store.meta !==null"
        :key="store.meta"
        :meta="store.meta"
        @go-to="store.setPage"
      />
    </div>
    <q-card
      flat
      no-shadow
      class="my-flex-1 scroll"
    >
      <list-pengunjung
        :key="store.items"
        :items="store.items"
        :loading="store.loading"
        :loading-terima="store.loadingTerima"
        @tindakan="bukaTindakan"
        @panggilan="panggil"
        @tidakdatang="tidakdatangs"
      />
    </q-card>

    <FilterPage
      v-model="store.filters"
      @close="store.setFilters"
      @filter-data="store.filterData"
    />

    <page-tindakan
      :key="pasien"
      v-model="store.pageTindakan"
      :pasien="pasien"
    />
    <!-- <CetakRekapBilling
      v-model="printRekap"
      :pasien="pasien"
      @tutup="actPrintRekap"
    /> -->
  </q-page>
</template>

<script setup>
import { useStyledStore } from 'src/stores/app/styled'
import { usePengunjungPoliStore } from 'src/stores/simrs/pelayanan/poli/pengunjung'
import { useLayananPoli } from 'src/stores/simrs/pelayanan/poli/layanan'
import { computed, onMounted, ref, watch } from 'vue'
import HeaderComp from './comp/HeaderComp.vue'
// import FooterComp from './comp/FooterComp.vue'
import FilterPage from './comp/FilterPage.vue'
import BottomComp from './comp/BottomComp.vue'
import ListPengunjung from './comp/ListPengunjung.vue'
// import PageTindakan from './comp/PageTindakan.vue'
import PageTindakan from '../tindakan/IndexPage.vue'

import { laravelEcho } from 'src/modules/newsockets'

// import CetakRekapBilling from 'src/pages/simrs/kasir/rajal/listkunjungan/comp/CetakRekapBilling.vue'
import { useQuasar } from 'quasar'
import { useSpeechStore } from 'src/stores/antrian/speech'
import { useSettingsAplikasi } from 'src/stores/simrs/settings'

const style = useStyledStore()
const speech = useSpeechStore()
const store = usePengunjungPoliStore()
const diagnosa = useLayananPoli()
const pasien = ref(null)
const indexVoices = ref(11)
const listVoices = ref([])

const setting = useSettingsAplikasi()

const kdDisplay = computed(() => {
  const poli = setting.polis
  const kdpoli = store.params.kodepoli[0] ?? 'POL'

  const target = poli.filter(x => x.kodepoli === kdpoli)
  if (target.length) {
    return target[0].displaykode
  }
  return null
})

// const printRekap = ref(false)

// const txt = ref('SEMUA')
// const txts = ref(['SEMUA', 'TERLAYANI', 'BELUM TERLAYANI'])

const $q = useQuasar()
onMounted(() => {
  let voices = []
  setTimeout(() => {
    voices = speech.synth.getVoices()
    listVoices.value = voices

    if (listVoices.value.length) {
      speech.setLoading(false)
      const ada = listVoices.value?.map(x => x.lang)
      const ind = ada.findIndex(x => x === 'id-ID') ?? 0
      indexVoices.value = ind
      console.log('onMounted :', ind)
    }

    speech.synth.onvoiceschanged = () => {
      speech.setVoiceList(speech.synth.getVoices())
      // give a bit of delay to show loading screen
      // just for the sake of it, I suppose. Not the best reason dsfa
      speech.setLoading(false)
      // setTimeout(() => {
      //   speech.setLoading(false)
      // }, 500)
    }
  }, 500)
  // console.log(voices)

  // store.init()
  diagnosa.getDiagnosaDropdown()
  diagnosa.getTindakanDropdown()

  subscribedChannel()
  // console.log('setting', kdDisplay.value)
})

// function setSpeech(txt) {
//   // console.log(speech.voiceList[11])
//   const voice = speech.utterance
//   voice.text = txt
//   voice.voice = speech.voiceList[indexVoices.value]

//   voice.volume = 1
//   voice.pitch = 1
//   voice.rate = 1

//   return voice
// }

function panggil(row) {
  // console.log('voiceIndex', listVoices.value[indexVoices.value])
  // console.log('voiceList', listVoices.value)
  // const txt1 = 'paasieen . ' + (row?.nama_panggil).toLowerCase() + '? ...Harap menujuu  ' + row?.panggil_antrian
  // const txt2 = 'Nomor Antrean ... ' + (row.nomorantrean.toUpperCase()) + '...Harap menuju... ke...' + row.namapoli
  // const txt = jns === 'nama' ? txt1 : txt2
  // speech.synth.speak(setSpeech(txt1))
  // console.log(row)
  store.sendPanggil(row)
}
function bukaTindakan(val) {
  // console.log('buka tindakan', val)
  if (val?.groups === '1') {
    if (!val?.sep) {
      $q.notify({
        type: 'negative',
        title: 'Peringatan',
        message: 'INFO WARNING <b/> MAAF, <em><b>Pasien Ini Belum terbit SEP</b></em>',
        // color: 'primary',
        html: true,
        // multiLine: true,
        // avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
        // position: 'center',
        timeout: 1000
        // actions: [
        //   { label: 'Reply', color: 'yellow', handler: () => { /* ... */ } }

      // ]
      })

      return
    }
  }
  pasien.value = val
  store.setTerima(val)
}

function tidakdatangs(val) {
  if (val?.groups === '1') {
    if (!val?.sep) {
      $q.notify({
        type: 'negative',
        title: 'Peringatan',
        message: 'INFO WARNING <b/> MAAF,<em><b>Pasien Ini Belum terbit SEP</b></em>',
        html: true,
        timeout: 1000
      })
      return
    }
  }
  store.settidakdatang(val)
}

function subscribedChannel() {
  if (kdDisplay.value) {
    // const channel = laravelEcho.join('presence.chat.display' + kdDisplay.value)
    // socket.value = channel
    // channel.here((users) => {
    //   usersOnline.value = [...users]
    //   console.log(`subscribed display${kdDisplay.value} channel`)
    // })
    //   .joining((user) => {
    //     // console.log({ user }, 'joined')
    //     usersOnline.value.push(user)
    //   })
    //   .leaving((user) => {
    //     // console.log({ user }, 'leaving')
    //     usersOnline.value = usersOnline.value.filter(x => x.id !== user.id)
    //     // console.log('usersOnline', usersOnline.value)
    //   })
    //   .listen('.chat-message', (e) => {
    //     console.log('listen', e)
    //   // const thumb = [...chatMessages.value]
    //   // if (e.message !== null || e.message !== '') { thumb.push(e.message) }
    //   // chatMessages.value = thumb
    //   })
    const channel = laravelEcho.private('private.notif.display' + kdDisplay.value)
    channel.subscribed(() => {
      console.log(`subscribed private.notif.display${kdDisplay.value} channel !!!`)
    }).listen('.notif-message', (e) => {
      console.log(`listen notif${kdDisplay.value}`, e)
    })
  }
}

// function actPrintRekap() {
//   printRekap.value = false
// }

watch(() => kdDisplay.value, (obj, old) => {
  // console.log('new', obj)
  // console.log('old', old)
  subscribedChannel()
}, { deep: true })
</script>

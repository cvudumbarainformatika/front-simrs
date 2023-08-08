<template>
  <q-page
    ref="pageRef"
    class="column full-height full-width"
    :class="!style.componentfull?'q-pa-md':'q-pa-xs'"
  >
    <div class="col-auto ">
      <PageHead
        v-if="!style.componentfull"
        :title="title"
        :subtitle="subtitle"
        :path="page.path"
        @togle-draw="toggleDraw()"
      />
    </div>
    <q-card
      flat
      class="col full-width full-height"
      :style="`max-height: ${!style.componentfull? h-60:h+40}px; overflow:hidden`"
    >
      <q-scroll-area
        :style="`height: ${!style.componentfull? h-95:h+40}px; max-width: 100%;`"
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
      >
        <router-view v-slot="{ Component, route }">
          <!-- {{ route.meta }} -->
          <transition :name="route.meta.transition || 'fade'">
            <component :is="Component" />
          </transition>
        </router-view>
      </q-scroll-area>
    </q-card>

    <q-dialog
      v-model="drawerRight"
      position="right"
    >
      <q-card style="width: 300px">
        <q-linear-progress
          :value="0.6"
          color="pink"
        />

        <q-card-section class="row items-center no-wrap">
          <div>
            <div class="text-weight-bold">
              Panggil Antrian
            </div>
            <div class="text-grey">
              Call || Recall
            </div>
          </div>

          <q-space />

          <q-btn
            flat
            round
            icon="icon-mat-volume_up"
            class="q-mr-md"
            :loading="loading==='call'"
            @click="panggil('call')"
          >
            <q-tooltip>
              <strong>Call</strong>
            </q-tooltip>
          </q-btn>

          <q-btn
            flat
            round
            icon="icon-mat-refresh"
            :loading="loading==='recall'"
            @click="panggil('recall')"
          >
            <q-tooltip>
              <strong>Recall</strong>
            </q-tooltip>
          </q-btn>
        </q-card-section>

        <q-card-section class="row items-center no-wrap">
          <div>
            <div class="text-weight-bold">
              Antrian Lansia
            </div>
            <div class="text-grey">
              Call || Recall
            </div>
          </div>

          <q-space />

          <q-btn
            flat
            round
            icon="icon-mat-elderly"
            class="q-mr-md"
            :loading="loading==='call lansia'"
            @click="panggil('call lansia')"
          >
            <q-tooltip>
              <strong>Call Lansia</strong>
            </q-tooltip>
          </q-btn>
          <q-btn
            flat
            round
            icon="icon-mat-spatial_audio"
            :loading="loading==='recall lansia'"
            @click="panggil('recall lansia')"
          >
            <q-tooltip>
              <strong>Recall Lansia</strong>
            </q-tooltip>
          </q-btn>
        </q-card-section>

        <q-card-section
          v-if="!!nomor && !loading"
        >
          <div class="row items-center no-wrap">
            <div class="q-mr-sm">
              Anda telah memanggil nomor antrian
            </div>
            <div class="text-weight-bold">
              {{ nomor }}
            </div>
          </div>
        </q-card-section>

        <q-card-section
          v-if="!!loading"
          class="row items-center no-wrap"
        >
          <div class="q-mr-sm">
            Mengirim Permintaan Panggilan
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- app-pasein -->
    <!-- <app-pasien-rajal v-model="pasien" /> -->
  </q-page>
</template>

<script setup>
import { useRoute } from 'vue-router'
import PageHead from './PageHead.vue'
import { computed, onMounted, ref } from 'vue'
import { useStyledStore } from 'src/stores/app/styled'
import { api } from 'src/boot/axios'
import { usePendaftaranPasienStore } from 'src/stores/simrs/pendaftaran/form/pasien/pasien'

const drawerRight = ref(false)
const style = useStyledStore()
const pageRef = ref()
const h = ref(0)
const thumbStyle = ref({
  right: '0px',
  borderRadius: '5px',
  backgroundColor: '#027be3',
  width: '2px',
  opacity: 0.75
})
const barStyle = ref({
  right: '0px',
  borderRadius: '9px',
  backgroundColor: '#027be3',
  width: '5px',
  opacity: 0.2
})

const page = useRoute()
const title = computed(() => {
  if (page.path === '/pendaftaran/bpjs/form') {
    return 'RAJAL BPJS || JKN'
  } else if (page.path === '/pendaftaran/bpjs/kunjungan') {
    return 'LIST KUNJUNGAN'
  } else if (page.path === '/pendaftaran/bpjs/listmjkn') {
    return 'LIST MOBILE JKN'
  } else {
    return 'MASTER PASIEN'
  }
})
const subtitle = computed(() => {
  if (page.path === '/pendaftaran/bpjs/form') {
    return 'Pendaftaran Pasien Baru Rajal BPJS || JKN'
  } else if (page.path === '/pendaftaran/bpjs/kunjungan') {
    return 'List Kunjungan Pasien BPJS || JKN'
  } else if (page.path === '/pendaftaran/bpjs/listmjkn') {
    return 'List Kunjungan dari m-JKN'
  } else {
    return 'Daftar Pasien'
  }
})

const pasien = usePendaftaranPasienStore()
const loading = ref('')
const nomor = ref('')
const sisaAntrian = ref('')
function toggleDraw() {
  drawerRight.value = !drawerRight.value
  // panggil('Call')
}
function panggil(val) {
  const param = {
    params: {
      jenis: val
    }
  }
  loading.value = val
  return new Promise((resolve, reject) => {
    api.get('v1/simrs/pendaftaran/antrian/call_layanan_ruang', param)
      .then(resp => {
        loading.value = ''
        nomor.value = resp.data.data.nomor
        sisaAntrian.value = resp.data.data.sisa_antrian
        pasien.setForm('noantrian', resp.data.data.nomor)
        pasien.noantrian = resp.data.data.nomor
        const temp = parseInt(val.slice(1, resp.data.data.nomor.length))
        pasien.setForm('angkaantrean', temp)
        console.log(resp.data)
        resolve(resp)
      })
      .catch(err => {
        loading.value = ''
        console.log(err)
        reject(err)
      })
  })
}

onMounted(() => {
  console.log('page ', page.path)
  h.value = pageRef.value.$el.clientHeight
})

</script>

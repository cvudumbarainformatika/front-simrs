<template>
  <q-dialog persistent backdrop-filter="blur(4px)" @show="init">
    <q-card style="min-width:50vw; max-width: 50vw;">
      <q-bar class="bg-dark text-white">
        <div>Input Sep Pasien</div>

        <q-space />

        <q-btn dense flat icon="icon-mat-close" v-close-popup>
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section class="bg-grey-4">
        <div class="row q-col-gutter-x-sm">
          <div class="col-auto">
            <app-avatar-pasien :pasien="pasien" width="70px" />
          </div>
          <div class="col full-width">
            <div class="row justify-between">
              <div>
                <div class="text-weight-bold">
                  {{ pasien?.nama }}
                </div>
                <div>
                  NORM : {{ pasien?.norm }}
                </div>
                <div>
                  NIK : {{ pasien?.nktp ?? '-' }}
                </div>
                <div>
                  NOREG : {{ pasien?.noreg }}
                </div>
              </div>

              <div class="column">
                <q-btn
                  :label="pasien.sistembayar"
                  color="primary"
                  outline
                  disabled
                />
                <div class="text-right q-py-sm f-14 text-weight-bold">
                  {{ store.cekPeserta?.hakKelas?.keterangan }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-form @submit="onSubmit">
        <q-card-section class="">
          <div class="row q-col-gutter-md">
            <div class="col-auto">
              Input Sep dr vKlaim:
            </div>
            <app-input-simrs
              v-model="noSep" label="No Sep" :autofocus="true"
              :valid="{required: true}"
              :lazy-rules="false"
              class="col"
            />
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pa-none bg-dark text-white">
          <div class="q-pa-md row justify-between items-center">
            <div><q-btn label="Tutup" color="dark" text-color="white" @click="store.dialogSepManual=false" /></div>
            <div>
              <q-btn :loading="wait" :disabled="wait" type="submit" label="Cek n Save" color="yellow-3" text-color="dark" />
            </div>
          </div>
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { notifErrVue } from 'src/modules/utils'
import { useListHistoryPendaftaranRanapStore } from 'src/stores/simrs/pendaftaran/ranap/history.js'
import { ref } from 'vue'
const store = useListHistoryPendaftaranRanapStore()

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const noSep = ref(null)
const wait = ref(false)

const init = () => {
  console.log('init', props.pasien)
}

const onSubmit = async () => {
  // console.log('noSep submit', noSep.value)
  wait.value = true
  const payload = { noSep: noSep.value, pasien: props.pasien }
  await api.post('v1/simrs/pendaftaran/ranap/insert-sep-manual', payload)
    .then((resp) => {
      console.log('resp', resp.data)
      if (resp.data?.metadata?.code === '200') {
        const items = store.items
        const pas = items?.find((v) => v.noreg === props.pasien.noreg)
        pas.sep = resp?.data?.result?.noSep
      }
      else {
        notifErrVue(resp.data?.metadata?.message)
      }
      wait.value = false
      store.dialogSepManual = false
    })
    .catch((err) => {
      console.log('err', err)
      wait.value = false
    })
}

</script>

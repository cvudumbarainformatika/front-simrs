<template>
  <q-toolbar>
    <q-btn
      flat
      dense
      icon="icon-mat-sort"
      @click="emits('toggleLeftDrawer')"
    />
    <q-toolbar-title class="f-14">
      <div class="row items-center q-gutter-md">
        <div class="col-3">
          <q-btn
            color="primary"
            class="q-pl-xs"
            flat
          >
            <div class="row items-center no-wrap q-gutter-sm text-white">
              <q-avatar size="30px">
                <img :src="getImageDokter(pasien?.datasimpeg?.kelamin, pasien?.datasimpeg)">
              </q-avatar>
              <div class="column f-12">
                <div>
                  DPJP | {{ pasien?.kodedokter === null || pasien?.kodedokter==='' ? '----': pasien?.dokter }}
                </div>
              </div>
            </div>
            <q-menu style="max-width: 460px;">
              <div class="row no-wrap q-pa-md">
                <div class="column items-center">
                  <q-avatar size="72px">
                    <img :src="getImageDokter(pasien?.datasimpeg?.kelamin, pasien?.datasimpeg)">
                  </q-avatar>

                  <div class="f12 q-mt-md q-mb-xs">
                    {{ pasien?.kodedokter === null || pasien?.kodedokter==='' ? '----': pasien?.dokter }}
                  </div>
                </div>
                <q-separator
                  vertical
                  inset
                  class="q-mx-lg"
                />
                <div class="column">
                  <div class="f-14 text-weight-bold ">
                    Ganti DPJP ?
                  </div>
                  <q-separator class="q-my-sm" />
                  <q-form @submit="gantiDpjp">
                    <q-select
                      v-model="search"
                      dense
                      outlined
                      standout="bg-yellow-3"
                      label="Cari Dpjp"
                      use-input
                      clearable
                      option-value="kddpjp"
                      option-label="nama"
                      :options="options"
                      behavior="menu"
                      hide-dropdown-icon
                      @filter="filterOptions"
                      @update:model-value="(val)=> updateKodeDpjp(val)"
                    >
                      <!-- @update:model-value="(val)=>$emit('updated', val)" -->
                      <template #prepend>
                        <q-icon name="icon-mat-search" />
                      </template>
                      <template #no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            No results
                          </q-item-section>
                        </q-item>
                      </template>
                      <template #option="scope">
                        <q-item v-bind="scope.itemProps">
                          <q-item-section avatar>
                            <q-avatar size="60px">
                              <img :src="getImage(scope?.opt?.kelamin,scope.opt)">
                            </q-avatar>
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>{{ scope.opt.nama }}</q-item-label>
                            <q-item-label caption>
                              <strong>Nip : </strong> {{ scope.opt.nip }}
                            </q-item-label>
                            <q-item-label caption>
                              <strong>KODE DPJP : </strong> {{ scope?.opt?.kddpjp??'-' }}
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                    <q-input
                      v-model="kodedpjp"
                      label="KODE DPJP (Automatis)"
                      outlined
                      standout="bg-yellow-3"
                      dense
                      class="q-my-sm"
                      :rules="[
                        val => ((!!val && pasien?.groups!=='2') || ( pasien?.groups==='2' && !!kdpegsimrs && (!val||!!val) ))|| 'HARAP Hubungi bidang YANMED ...',

                      ]"
                      readonly
                    />
                    <!-- val => ( pasien?.groups==='2' && !!kdpegsimrs && !val ) || 'Tidak Boleh kosong', -->
                    <q-separator class="q-my-sm" />
                    <div class="text-right">
                      <q-btn
                        color="primary"
                        label="Simpan"
                        push
                        size="sm"
                        type="submit"
                        :loading="loadingSaveDpjp"
                        :disable="loadingSaveDpjp"
                      />
                    </div>
                  </q-form>
                </div>
              </div>
            </q-menu>
          </q-btn>
        </div>
        <q-separator vertical color="orange" class="q-ml-sm" />
        <div class="col-3">
          <q-btn
            color="primary"
            class="q-pl-xs"
            flat
          >
            <div class="row items-center no-wrap q-gutter-sm text-white">
              <div class="column f-12">
                <div>
                  <q-badge color="lime-12" text-color="dark" class="text-bold">
                    Sistem Bayar : {{ pasien?.sistembayar }}
                  </q-badge>
                </div>
              </div>
            </div>
            <q-menu style="max-width: 460px;">
              <div class="row no-wrap q-pa-md">
                <div class="column">
                  <div class="f-14 text-weight-bold ">
                    Ganti Sistem Bayar ?
                  </div>
                  <q-separator class="q-my-sm" />
                  <q-form @submit="gantiSistemBayar()">
                    <q-select
                      v-model="search"
                      dense
                      outlined
                      style="width: 200px;"
                      class="q-mb-sm"
                      standout="bg-yellow-3"
                      label="Cari Group Sistem Bayar"
                      clearable
                      option-value="kode"
                      option-label="groupsistembayar"
                      :options="storePengunjung.sistembayar"
                      @update:model-value="(val)=> caririnci(val)"
                      :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                    >
                      <!-- @update:model-value="(val)=>$emit('updated', val)" -->
                    </q-select>
                    <q-select
                      v-model="storePengunjung.form.namasistembayar"
                      dense
                      outlined
                      style="width: 300px;"
                      standout="bg-yellow-3"
                      label="Cari Sistem Bayar"
                      clearable
                      option-value="kode"
                      option-label="sistembayar"
                      :options="storePengunjung.sistembayarhasil"
                      :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                      @update:model-value="(val)=> selectsistembayar(val)"
                    />
                    <q-separator class="q-my-sm" />
                    <div class="text-right">
                      <q-btn
                        color="primary"
                        label="Simpan"
                        push
                        size="sm"
                        type="submit"
                        :loading="storePengunjung.loadingSaveSistembayar"
                        :disable="storePengunjung.loadingSaveSistembayar"
                      />
                    </div>
                  </q-form>
                </div>
              </div>
            </q-menu>
          </q-btn>
        </div>
      </div>
    </q-toolbar-title>
    <div v-if="pasien?.dokter !== '' ">
      <q-btn
        v-if="pasien?.flagpelayanan==='' || pasien?.flagpelayanan==='2'"
        label="selesaikan layanan"
        color="negative"
        class="q-mr-lg q-px-lg"
        dense
        :loading="loadingFinish"
        :disable="loadingFinish"
        @click="selesaikanLayanan"
      />
      <q-btn
        v-else-if="pasien?.status==='3'"
        label="LAYANAN TELAH BATAL"
        color="negative"
        class="q-mr-lg q-px-lg"
        dense
      />
      <q-btn
        v-else
        label="SUDAH DILAYANI"
        color="white"
        class="q-mr-lg q-px-lg"
        dense
        outline
        disable
      />
    </div>
    <q-btn
      v-close-popup
      dense
      flat
      icon="icon-mat-close"
      :disable="store.loading || store.loadingObat"
    >
      <q-tooltip class="bg-white text-primary">
        Close
      </q-tooltip>
    </q-btn>
  </q-toolbar>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { ref } from 'vue'
import { usePermintaanEResepStore } from 'src/stores/simrs/farmasi/permintaanresep/eresep'
import { usePengunjungIgdStore } from 'src/stores/simrs/igd/pengunjung'

const store = usePermintaanEResepStore()
const storePengunjung = usePengunjungIgdStore()

const emits = defineEmits(['toggleLeftDrawer', 'gantidpjp', 'layananSelesai'])

const search = ref('')
const kodedpjp = ref(null)
const kdpegsimrs = ref(null)
const options = ref([])
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  loadingSaveDpjp: {
    type: Boolean,
    default: false
  },
  loadingFinish: {
    type: Boolean,
    default: false
  }
})

function updateKodeDpjp (val) {
  // console.log(props?.pasien?.groups)
  kodedpjp.value = val?.kddpjp ?? ''
  kdpegsimrs.value = val?.kdpegsimrs
}

function caririnci (val) {
  console.log('val', val)
  storePengunjung.form.kodesistembayar = []
  const allsistembayar = storePengunjung?.sistembayarrinci
  storePengunjung.sistembayarhasil = allsistembayar.filter(ft => ft.groups === val?.kode)
  //  console.log('xxxxxxxxxxxxxx', storePengunjung.sistembayarhasil)
}

function selectsistembayar (val) {
  console.log('val', val)
  storePengunjung.form.kodesistembayar = val?.kode
  storePengunjung.form.namasistembayar = val?.sistembayar
}

function gantiDpjp () {
  // console.log('ok')
  const form = {
    kodedpjp: kodedpjp.value ?? '',
    kdpegsimrs: kdpegsimrs.value,
    noreg: props?.pasien?.noreg
  }

  emits('gantidpjp', form)
}

function getImage (kelamin, row) {
  if (row?.foto === null || row?.foto === '' || row?.foto === 'undefined' || row?.foto === undefined) {
    return kelamin === 'Perempuan'
      ? new URL('../../../../../assets/images/actress.svg', import.meta.url).href
      : new URL('../../../../../assets/images/user-avatar.svg', import.meta.url).href
  }
  else {
    return 'http://192.168.100.100/simpeg/foto/' + row.nip + '/' + row.foto
  }
}
function getImageDokter (kelamin, row) {
  if (row?.foto === null || row?.foto === '' || row?.foto === 'undefined' || row?.foto === undefined || row.kddpjp === null) {
    return kelamin === 'Perempuan'
      ? new URL('../../../../../assets/images/actress.svg', import.meta.url).href
      : new URL('../../../../../assets/images/user-avatar.svg', import.meta.url).href
  }
  else {
    return 'http://192.168.100.100/simpeg/foto/' + row.nip + '/' + row.foto
  }
}

async function filterOptions (val, update) {
  if (!val) {
    update(() => {
      options.value = []
    })
    return
  }
  const params = {
    params: {
      q: val
    }
  }
  // console.log('q :', val)
  const resp = await api.get('/v1/settings/appmenu/cari_dokter', params)
  console.log('cari', resp)
  update(
    () => (options.value = resp.data),
    ref => {
      if (val !== '' && ref.options.length) {
        ref.setOptionIndex(-1)
        ref.moveOptionSelection(1, true)
      }
    }
  )
}

function selesaikanLayanan () {
  // console.log('ok')
  emits('layananSelesai')
}

function gantiSistemBayar () {
  storePengunjung.gantiSistemBayar(props.pasien)
}
</script>

<template>
  <div class="bg-white">
    <div class="bg-primary text-white text-weight-bold">
      <div class="q-pa-sm">
        Form E-Resep
      </div>
    </div>
    <q-separator class="q-my-sm" />
    <div
      class="row q-col-gutter-sm items-start bg-grey-8 text-white q-pr-sm"
      :style=" `height: ${tinggiDetailPas}px;`"
    >
      <div
        class="col-3 cursor-pointer"
        @click="store.isOpen=true"
      >
        <div class="row">
          <div
            class="absolute-top bg-dark text-white col-3"
            :style=" `height: ${tinggiDetailPas}px; margin-top:43px`"
          >
            <div class="absolute-top-right">
              <div class="row">
                <div class="q-pa-sm">
                  <q-btn
                    outline
                    round
                    style="color: goldenrod;"
                    label="id"
                  />
                </div>
                <!-- <div v-if="Object.keys( store.pasien).length">
                  <q-btn
                    flat
                    outline
                    round
                    icon="icon-mat-cancel"
                    style="color: rgb(208, 5, 5);"
                  >
                    <q-tooltip
                      class="primary"
                      :offset="[10, 10]"
                    >
                      Tutup Pasien
                    </q-tooltip>
                  </q-btn>
                </div> -->
              </div>
            </div>
            <div class="absolute-top">
              <div class="q-pa-sm">
                <q-badge
                  outline
                  color="orange"
                  :label="`${store.pasien?.sistembayar?? '-'}`"
                />
              </div>
            </div>
            <div class="absolute-bottom">
              <div class="q-pa-md">
                <app-avatar-pasien
                  :key="store.pasien"
                  :pasien="store.pasien"
                  width="50px"
                />
                <div class="text-weight-bold f-12 q-mt-sm">
                  {{ store.pasien ? store.pasien.nama : '-' }}
                </div>
                <div class="text-teal">
                  {{ store.pasien ? store.pasien.noreg : '-' }} || {{ store.pasien?.norm??'-' }}
                </div>
                <div class="text-yellow text-italic f-10">
                  {{ store.pasien?.usia?? '-' }}
                </div>
              </div>
              <q-bar>
                <q-space />
                <!-- <q-btn
              dense
              flat
              icon="icon-mat-attach_money"
              class="gt-xs"
              @click="bukaBill"
            >
              <q-tooltip class="bg-dark text-white">
                Billing Pasien
              </q-tooltip>
            </q-btn>
            <q-btn
              dense
              flat
              icon="icon-mat-menu_book"
              class="gt-xs"
              @click="emits('icare')"
            >
              <q-tooltip class="bg-dark text-white">
                i-care
              </q-tooltip>
            </q-btn>
            <q-btn
              dense
              flat
              icon="icon-mat-history"
              class="gt-xs"
              @click="emits('historyPasien')"
            >
              <q-tooltip class="bg-dark text-white">
                History Pasien
              </q-tooltip>
            </q-btn> -->
              </q-bar>
            </div>
          </div>
        </div>
      </div>
      <div class="col-9">
        <div class="row q-col-gutter-sm">
          <div class="col-4">
            <div class="row q-pl-sm q-my-sm text-teal-4 text-weight-bold">
              {{ store?.pasien?.noka }}
            </div>
            <div class="row q-pl-sm q-my-sm text-italic text-yellow">
              {{ store?.pasien?.sep }}
            </div>
            <div class="row q-pl-sm q-my-sm text-weight-bold text-orange">
              {{ store?.pasien?.poli }}
            </div>
            <div class="row q-pl-sm q-my-sm text-weight-bold text-orange">
              {{ store?.pasien?.ruangan }}
            </div>
            <div
              v-if="store.jenispasien!=='rnp'"
              class="row q-pl-sm q-my-sm text-weight-bold"
            >
              {{ store?.pasien?.dokter }}
            </div>
            <div
              v-if="store.jenispasien==='rnp'"
              class="row q-pl-sm q-my-sm text-weight-bold"
            >
              <app-autocomplete-new
                ref="refObat"
                :model="store.form.dokter"
                autocomplete="nama"
                option-label="nama"
                option-value="kdpegsimrs"
                label="Cari Dokter"
                outlined
                bg-color="white"
                :source="store.filtDokters"
                :loading="store.loadingDokter"
                @on-select="store.setForm('dokter',$event)"
                @clear="store.setForm('dokter',null)"
                @buang="cariDokter"
              />
            </div>
          </div>
          <div class="col-4">
            <div class="row">
              <div class="col-12">
                <app-input-date
                  :model="store.form.tanggal"
                  label="Tanggal"
                  outlined
                  bg-color="white"
                  @set-model="store.setForm('tanggal',$event)"
                />
              </div>
            </div>
            <div class="row q-mt-sm">
              <div class="col-12">
                <app-input-date
                  :model="store.form.resep_masuk"
                  label="Resep Masuk"
                  :type-date="false"
                  outlined
                  bg-color="white"
                  @set-model="store.setForm('resep_masuk',$event)"
                />
              </div>
            </div>
            <div class="row q-mt-sm">
              <div class="col-12">
                <app-input-date
                  :model="store.form.resep_keluar"
                  label="Resep Keluar"
                  :type-date="false"
                  bg-color="white"
                  outlined
                  @set-model="store.setForm('resep_keluar',$event)"
                />
              </div>
            </div>
            <div class="row q-mt-sm">
              <div class="col-12">
                <app-input
                  v-model="store.form.noresep"
                  label="Nomor Resep"
                  bg-color="white"
                  outlined
                />
              </div>
            </div>
          </div>
          <div class="col-4">
            <div class="row">
              <div class="col-12">
                <q-select
                  v-model="store.nota"
                  outlined
                  standout="bg-yellow-3"
                  bg-color="white"
                  dense
                  :options="store.notas"
                  :display-value="`NOTA: ${store.nota === null || store.nota === '' || store.nota === 'BARU' ? 'BARU' : store.nota}`"
                  style="min-width: 200px;"
                />
              </div>
            </div>
            <div class="row q-mt-sm">
              <div
                class="col-12 bg-white text-black"
              >
                {{ store.form?.diagnosa !=='' ? store.form?.diagnosa : 'Tidak ada diagnosa' }}
              </div>
            </div>
          </div>
        </div>
        <!-- {{ store.pasien }} -->
      </div>
    </div>
    <q-separator class="q-my-sm" />
    <div>
      <div class="row">
        <div class="col-auto bg-red">
          <q-tabs
            v-model="tab"
            no-caps
            inline-label
            class="bg-primary text-white shadow-2"
            align="left"
            dense
            active-color="yellow"
            active-bg-color="dark"
            @update:model-value="cekPanel"
          >
            <q-tab
              v-for="(item, i) in tabs"
              :key="i"
              :name="item.page"
              :label="item.name"
            />
          </q-tabs>
        </div>
      </div>
      <div class="row">
        <div class="col-grow bg-yellow">
          <q-tab-panels
            v-model="tab"
            animated
            class="full-height"
          >
            <q-tab-panel
              v-for="(panel, n) in tabs"
              :key="n"
              :name="panel.page"
              class="full-height q-pa-none"
            >
              <!-- <q-tab-panel
            name="Laborat"
            class="full-height q-pa-none"
          > -->
              <component
                :is="cekPanel()"
              />
            <!-- :key="props.pasien"
              :pasien="props.pasien" -->
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </div>
  </div>
  <DialogCari
    v-model="store.isOpen"
    @updated="(val)=>store.setPasien(val)"
    @jenis="(val)=>store.jenispasien=val"
  />
</template>

<script setup>
import { date } from 'quasar'
import { findWithAttr } from 'src/modules/utils'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useResepDepoFarmasiStore } from 'src/stores/simrs/farmasi/resepdepo/formresepdepo'
import { defineAsyncComponent, ref, onBeforeUnmount, onMounted } from 'vue'
const store = useResepDepoFarmasiStore()
const apps = useAplikasiStore()

const DialogCari = defineAsyncComponent(() => import('./comp/DialogCari.vue'))
const tinggiDetailPas = ref(180)
const tab = ref('Resep')
const tabs = ref([
  { page: 'Resep', name: 'Obat Keluar' },
  { page: 'Racikan', name: 'Racikan' },
  { page: 'List', name: 'List Resep' }
])

const comp = [
  { nama: 'List', page: defineAsyncComponent(() => import('./comp/ListPage.vue')) },
  { nama: 'Racikan', page: defineAsyncComponent(() => import('./comp/RacikanPage.vue')) },
  { nama: 'Resep', page: defineAsyncComponent(() => import('./comp/ResepPage.vue')) }
]

const cekPanel = () => {
  const val = tab.value
  const ganti = val.replace(/ /g, '')
  const arr = findWithAttr(comp, 'nama', ganti)
  return arr >= 0 ? comp[arr].page : ''
}

function cariDokter(val) {
  const opt = store.dokters.filter(dok => dok.nama.toLowerCase().includes(val.toLowerCase()))
  if (opt.length) store.filtDokters = opt
  else {
    store.cariDokter(val)
  }
}
// ----- timer start -----

function timer() {
  store.setForm('resep_keluar', date.formatDate(Date.now(), 'HH:mm'))
}
const setTimer = setInterval(timer, 10000)
onBeforeUnmount(() => {
  clearInterval(setTimer)
})
// ----- timer end -----

onMounted(() => {
  store.setForm('kodedepo', apps?.user?.kdruangansim)
  store.getSigna()
})
</script>

<style></style>

<template>
  <q-dialog
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-left"
    transition-hide="slide-right"
    class="fullscreen"
  >
    <q-card
      class="bg-grey-4"
      flat
    >
      <!-- HEADER BAR -->
      <q-bar class="bg-dark text-white full-width fixed-top">
        <q-space />

        <!-- <q-btn
          dense
          flat
          icon="icon-mat-minimize"
          :disable="!maximizedToggle"
          @click="maximizedToggle = false"
        >
          <q-tooltip
            v-if="maximizedToggle"
            class="bg-white text-primary"
          >
            Minimize
          </q-tooltip>
        </q-btn>
        <q-btn
          dense
          flat
          icon="icon-mat-crop_square"
          :disable="maximizedToggle"
          @click="maximizedToggle = true"
        >
          <q-tooltip
            v-if="!maximizedToggle"
            class="bg-white text-primary"
          >
            Maximize
          </q-tooltip>
        </q-btn> -->
        <q-btn
          dense
          flat
          icon="icon-mat-close"
          @click="emits('closeDialog')"
        >
          <q-tooltip class="bg-white text-primary">
            Close
          </q-tooltip>
        </q-btn>
      </q-bar>
      <q-scroll-area
        class="bg-grey-3 full-height"
      >
        <div
          class="q-pa-md"
          style="margin-top:30px"
        >
          <div class="row q-col-gutter-md">
            <div class="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12">
              <q-card
                flat
                class="full-width"
              >
                <q-card-section>
                  <div class="row flex-wrap">
                    <div
                      class="foto bg-grey-4 col-3"
                    >
                      <q-img
                        :src="foto"
                        :ratio="1"
                      />
                      <div class="text-center">
                        <q-item-label class="f-16 text-weight-bold">
                          {{ pasien? pasien.norm:'-' }}
                        </q-item-label>
                      </div>
                    </div>
                    <div class="col-9">
                      <q-list
                        dense
                        separator
                      >
                        <q-item>
                          <q-item-label class="text-weight-bold">
                            {{ pasien? pasien.nama: '-' }}
                          </q-item-label>
                        </q-item>
                        <q-item>
                          <q-item-label class="">
                            {{ pasien? pasien.templahir: '-' }}, {{ pasien? dateFullFormat(pasien.tgllahir) : '-' }}
                          </q-item-label>
                        </q-item>
                        <q-item>
                          <q-item-label class="">
                            💳 {{ pasien? pasien.nik:'-' }}
                          </q-item-label>
                        </q-item>
                        <q-item>
                          <q-item-label class="">
                            ⚥ {{ pasien? pasien.kelamin:'-' }} / ✒️ {{ pasien? pasien.usia:'-' }}
                          </q-item-label>
                        </q-item>
                        <q-item>
                          <q-item-label class="">
                            🏠 {{ pasien? pasien.alamat: '-' }}
                          </q-item-label>
                        </q-item>
                        <q-item>
                          <q-item-label class="">
                            ♡ ♥💕 {{ pasien? pasien.statuspernikahan:'-' }}
                          </q-item-label>
                        </q-item>
                      </q-list>
                    </div>
                    <!-- <div class=" absolute-top-right text-right q-pa-md">
                      <div class="f-12">
                        NO. REKAM MEDIS
                      </div>
                      <div class="f-16 text-weight-bold">
                        {{ pasien? pasien.norm:'-' }}
                      </div>
                    </div> -->
                  </div>
                </q-card-section>
                <q-separator />
                <q-list separator>
                  <q-item>
                    <q-item-section>
                      <q-item-label>
                        🃏 Noka JKN / BPJS
                      </q-item-label>
                      <q-item-label class="text-weight-bold">
                        {{ pasien? pasien.nokabpjs:'-' }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label>
                        🆔 SATU SEHAT
                      </q-item-label>
                      <q-item-label class="text-weight-bold">
                        -
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>

              <!-- KUNJUNGAN RANAP -->
              <q-card
                flat
                class="q-mt-md"
              >
                <div class="bg-dark text-white q-pa-sm">
                  <div class="row items-center justify-between">
                    <div class="text-subtitle1">
                      📜 Riwayat Kunjungan RAWAT INAP Pasien
                    </div>
                  </div>
                </div>
                <div v-if="!store.loading">
                  <q-scroll-area
                    style="height: 49vh; width:100%;"
                  >
                    <div
                      v-if="store.kunjunganRanap.length > 0"
                      style="padding-bottom: 40px;"
                      class="q-px-xl"
                    >
                      <q-timeline color="primary">
                        <q-timeline-entry
                          v-for="(data, n) in store.ranap.data"
                          :key="n"
                          :subtitle="`${dateFullFormat(data.rs3)}, jam ${formatJam(data.rs3)}`"
                          icon="icon-mat-event"
                        >
                          <div
                            class="row justify-between f-14"
                            style="margin-top:-10px"
                          >
                            <div class="flex items-center">
                              <div>
                                <div>Tujuan </div>
                                <div>DPJP </div>
                              </div>
                              <div class="q-ml-md text-weight-bold">
                                <div> : {{ data.relmasterruangranap?data.relmasterruangranap.namaruang:'-' }}</div>
                                <div> : {{ data.reldokter?data.reldokter.dokter:'-' }}</div>
                              </div>
                            </div>
                          </div>
                          <template #title>
                            <div>
                              <q-badge
                                outline
                                align="middle"
                                color="primary"
                              >
                                {{ data.relsistembayar?data.relsistembayar.sistembayar:'-' }}
                              </q-badge>
                            </div>
                          </template>
                        </q-timeline-entry>
                      </q-timeline>
                    </div>
                    <div v-else>
                      <div
                        class="column flex-center"
                        style="min-height: 45vh;"
                      >
                        <div class="text-h3">
                          👨🏽‍🍼
                        </div>
                        <div class="f-14">
                          Belum Ada Data
                        </div>
                      </div>
                    </div>
                  </q-scroll-area>
                </div>
                <div
                  v-else
                  style="min-height: 45vh;"
                >
                  <app-loading />
                </div>

                <div
                  v-if="store.ranap.data.length > 0"
                  class="absolute-bottom full-width bg-white"
                  style="z-index:1"
                >
                  <div class="q-pa-sm shadow-2">
                    <div class="row justify-between items-center">
                      <div>
                        Hal. <strong>{{ store.ranap.current_page }}</strong> dari <strong>{{ store.ranap.total_page }}</strong>
                        halaman dan <strong>{{ store.kunjunganRanap.length }}</strong> data keseluruhan
                      </div>
                      <div>
                        <div class="flex items-center justify-end">
                          <q-btn
                            :disable="store.ranap.current_page===1"
                            flat
                            round
                            color="primary"
                            icon="icon-mat-skip_previous"
                            size="xs"
                            @click="store.setPageRajal(1)"
                          />
                          <q-btn
                            :disable="store.ranap.current_page === 1"
                            flat
                            round
                            color="primary"
                            icon="icon-mat-chevron_left"
                            size="xs"
                            @click="store.setPageRajal(store.ranap.current_page - 1)"
                          />
                          <div class="bold q-pa-xs">
                            {{ store.ranap.current_page }}
                          </div>
                          <q-btn
                            :disable="store.ranap.current_page === store.ranap.total_page"
                            flat
                            round
                            color="primary"
                            icon="icon-mat-chevron_right"
                            size="xs"
                            @click="store.setPageRajal(store.ranap.current_page + 1)"
                          />
                          <q-btn
                            :disable="store.ranap.current_page === store.ranap.total_page"
                            flat
                            round
                            color="primary"
                            icon="icon-mat-skip_next"
                            size="xs"
                            @click="store.setPageRajal(store.ranap.total_page)"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </q-card>
            </div>

            <!-- KUNJUNGAN RAJAL -->
            <div class="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12">
              <q-card flat>
                <div class="bg-secondary text-white q-pa-sm">
                  <div class="row items-center justify-between">
                    <div class="text-subtitle1">
                      📜 Riwayat Kunjungan RAWAT JALAN Pasien
                    </div>
                  </div>
                </div>
                <div v-if="!store.loading">
                  <q-scroll-area
                    style="height: 85vh; width:100%;"
                  >
                    <div
                      v-if="store.kunjunganPoli.length > 0"
                      style="padding-bottom: 40px;"
                      class="q-px-xl"
                    >
                      <q-timeline color="deep-orange">
                        <q-timeline-entry
                          v-for="(data, i) in store.rajal.data"
                          :key="i"
                          :subtitle="`${dateFullFormat(data.tglkunjungan)}, jam ${formatJam(data.tglkunjungan)}`"
                          icon="icon-mat-event"
                        >
                          <div
                            class="row justify-between f-14"
                            style="margin-top:-10px"
                          >
                            <div class="flex items-center">
                              <div>
                                <div>Tujuan </div>
                                <div>DPJP </div>
                              </div>
                              <div class="q-ml-md text-weight-bold">
                                <div> : {{ data.relmpoli?data.relmpoli.poli:'-' }}</div>
                                <div> : {{ data.dokter?data.dokter.namadokter:'-' }}</div>
                              </div>
                            </div>
                          </div>
                          <template #title>
                            <div
                              v-if="data.rs14==='UMUM'|| data.rs14===''"
                            >
                              <q-badge
                                outline
                                align="middle"
                                color="primary"
                              >
                                TANPA ASURANSI / UMUM
                              </q-badge>
                            </div>
                            <div
                              v-else
                            >
                              <q-badge
                                outline
                                align="middle"
                                color="primary"
                              >
                                {{ data.msistembayar? data.msistembayar.sistembayar:'-' }}
                              </q-badge>
                            </div>
                          </template>
                        </q-timeline-entry>
                      </q-timeline>
                    </div>
                    <div v-else>
                      <div
                        class="column flex-center"
                        style="min-height: 80vh;"
                      >
                        <div class="text-h3">
                          👨🏽‍🍼
                        </div>
                        <div class="f-14">
                          Belum Ada Data
                        </div>
                      </div>
                    </div>
                  </q-scroll-area>
                </div>
                <div
                  v-else
                  style="min-height: 80vh;"
                >
                  <app-loading />
                </div>

                <div
                  v-if="store.rajal.data.length > 0"
                  class="absolute-bottom full-width bg-white"
                  style="z-index:1"
                >
                  <div class="q-pa-sm shadow-2">
                    <div class="row justify-between items-center">
                      <div>
                        Hal. <strong>{{ store.rajal.current_page }}</strong> dari <strong>{{ store.rajal.total_page }}</strong>
                        halaman dan <strong>{{ store.kunjunganPoli.length }}</strong> data keseluruhan
                      </div>
                      <div>
                        <div class="flex items-center justify-end">
                          <q-btn
                            :disable="store.rajal.current_page===1"
                            flat
                            round
                            color="primary"
                            icon="icon-mat-skip_previous"
                            size="xs"
                            @click="store.setPageRajal(1)"
                          />
                          <q-btn
                            :disable="store.rajal.current_page === 1"
                            flat
                            round
                            color="primary"
                            icon="icon-mat-chevron_left"
                            size="xs"
                            @click="store.setPageRajal(store.rajal.current_page - 1)"
                          />
                          <div class="bold q-pa-xs">
                            {{ store.rajal.current_page }}
                          </div>
                          <q-btn
                            :disable="store.rajal.current_page === store.rajal.total_page"
                            flat
                            round
                            color="primary"
                            icon="icon-mat-chevron_right"
                            size="xs"
                            @click="store.setPageRajal(store.rajal.current_page + 1)"
                          />
                          <q-btn
                            :disable="store.rajal.current_page === store.rajal.total_page"
                            flat
                            round
                            color="primary"
                            icon="icon-mat-skip_next"
                            size="xs"
                            @click="store.setPageRajal(store.rajal.total_page)"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </q-card>
            </div>
          </div>
        </div>
      </q-scroll-area>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useDetailPasien } from 'src/stores/simrs/pendaftaran/table/details'
import { dateFullFormat, formatJam } from 'src/modules/formatter'
import { computed, ref } from 'vue'

const maximizedToggle = ref(true)
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const emits = defineEmits(['closeDialog'])

const foto = computed(() => {
  const perempuan = props.pasien.kelamin === 'Perempuan'
  const usia = props.pasien.usia
  const usiath = usia !== '' || usia !== null ? parseInt(usia.substring(0, 2)) : 25
  if (perempuan) {
    if (usiath <= 99 && usiath > 59) {
      return new URL('../../assets/images/grandma.png', import.meta.url).href
    } else if (usiath <= 59 && usiath > 25) {
      return new URL('../../assets/images/user-girl.svg', import.meta.url).href
    } else if (usiath <= 25 && usiath > 15) {
      return new URL('../../assets/images/user-girl2.svg', import.meta.url).href
    } else if (usiath <= 15) {
      return new URL('../../assets/images/young-girl.svg', import.meta.url).href
    } else {
      return new URL('../../assets/images/user-girl3.svg', import.meta.url).href
    }
  } else {
    if (usiath <= 99 && usiath > 59) {
      return new URL('../../assets/images/grandpa.svg', import.meta.url).href
    } else if (usiath <= 59 && usiath > 25) {
      return new URL('../../assets/images/user-man2.svg', import.meta.url).href
    } else if (usiath <= 25 && usiath > 15) {
      return new URL('../../assets/images/user-man.svg', import.meta.url).href
    } else if (usiath <= 15) {
      return new URL('../../assets/images/young-man.svg', import.meta.url).href
    } else {
      return new URL('../../assets/images/actor.svg', import.meta.url).href
    }
  }
})

const store = useDetailPasien()
</script>

<style scoped lang="scss">
.q-bar {
  z-index: 1;
}
</style>

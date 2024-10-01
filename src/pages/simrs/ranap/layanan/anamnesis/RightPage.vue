<script setup>
import { defineAsyncComponent, ref } from 'vue'
import useRightPanel from './use/useRightPanel'
import gsap from 'gsap'

const BarComp = defineAsyncComponent(() => import('../components/BarComp.vue'))
const ListIgd = defineAsyncComponent(() => import('../components/ListIgd.vue'))
const InfoInputRanap = defineAsyncComponent(() => import('../components/InfoInputRanap.vue'))

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  kasus: {
    type: Object,
    default: null
  }
})

// eslint-disable-next-line no-unused-vars
const min = ref(false)

// eslint-disable-next-line no-unused-vars
const { store, settings, fields } = useRightPanel(props.pasien)

const beforeEnter = (el) => {
  el.style.opacity = 0
  el.style.transform = 'translateX(200px)'
}
const enter = (el, done) => {
  gsap.to(el, {
    opacity: 1,
    x: 0,
    duration: 0.2,
    onComplete: done
  })
}

</script>

<template>
  <q-splitter
    v-model="settings.splitMin"
    horizontal
    :limits="[5, 94]"

    style="height: 100%"
    separator-class="bg-grey-9"
    separator-style="height: 3px"
  >
    <template #before>
      <div class="bg-transparent q-pa-sm">
        <info-input-ranap :items="store.items.ranap">
          <transition-group appear tag="div" @before-enter="beforeEnter" @enter="enter">
            <div v-for="(item, i) in pasien?.anamnesis" :key="i" v-ripple class="q-card q-pa-md q-mb-sm cursor-pointer">
              <q-item-section>
                <q-item-label class="text-bold">
                  ASESMENT AWAL KEPERAWATAN
                </q-item-label>
                <q-item-label>Data Anamnesis Tersimpan</q-item-label>
                <q-item-label caption>
                  Oleh : {{ item?.petugas?.nama }}
                </q-item-label>
                <q-item-label caption>
                  <div class="flex q-gutter-sm items-center">
                    <div><q-icon name="icon-ion-timer" size="sm" /></div>
                    <div>{{ item?.tgl }}</div>
                  </div>
                </q-item-label>
              </q-item-section>
              <q-item-section side bottom>
                <q-icon :name="item?.id ? 'icon-mat-done_all':'icon-mat-done'" color="teal" />
              </q-item-section>
            </div>
          </transition-group>
          <div style="margin-bottom:100px;" />
        </info-input-ranap>
      </div>
    </template>

    <template #after>
      <div
        class="column fit bg-grey-7 text-white"
      >
        <div class="col-auto full-width">
          <bar-comp
            :btn-full="false" title="Pemeriksaan Umum IGD" bg-color="grey-10"
            btn-min="icon-mat-expand_more"
            :minimize="settings.splitMin > 50"
            @min="()=> {
              settings.splitMin === 94 ? settings.splitMin = 50 : settings.splitMin = 95
            }"
          />
        </div>
        <div class="col full-height q-pa-sm scroll content">
          <list-igd :items="store.items.igd">
            <q-list v-for="dataIgd in store.items?.igd" :key="dataIgd" dark bordered separator>
              <q-item v-for="list in fields.igd" :key="list">
                <q-item-section>
                  <q-item-label>{{ list.label }}</q-item-label>
                  <q-item-label caption>
                    <em class="text-weight-bold">{{ dataIgd[list.row] }}</em>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </list-igd>
        </div>
      </div>
    </template>
  </q-splitter>
  <!-- <div class="fit column bg-grey-4 relative-position"> -->
  <!-- <div class="" :class="min? 'col full-height':'col-6'">
      <div v-if="pasien?.anamnesis?.length" class="full-height q-pa-sm scroll">
        <transition-group appear tag="div" @before-enter="beforeEnter" @enter="enter">
          <div v-for="(item, i) in pasien?.anamnesis" :key="i" v-ripple class="q-card q-pa-md q-mb-sm cursor-pointer">
            <q-item-section>
              <q-item-label class="text-bold">
                ASESMENT AWAL KEPERAWATAN
              </q-item-label>
              <q-item-label>Data Anamnesis Tersimpan</q-item-label>
              <q-item-label caption>
                Oleh : {{ item?.petugas?.nama }}
              </q-item-label>
              <q-item-label caption>
                <div class="flex q-gutter-sm items-center">
                  <div><q-icon name="icon-ion-timer" size="sm" /></div>
                  <div>{{ item?.tgl }}</div>
                </div>
              </q-item-label>
            </q-item-section>
            <q-item-section side bottom>
              <q-icon :name="item?.id ? 'icon-mat-done_all':'icon-mat-done'" color="teal" />
            </q-item-section>
          </div>
        </transition-group>
        <div style="margin-bottom:100px;" />
      </div>
      <div v-else class="column full-height flex-center">
        <div>Belum Ada Data Tersimpan</div>
      </div>
    </div> -->
  <!-- INI LIST IGD -->
  <!-- <div class="bg-grey-8" :class="min?'absolute-bottom full-width': 'col full-height'">
      <div class="column full-height">
        <div class="col-auto">
          <bar-comp :btn-full="false" title="ANAMNESIS IGD" bg-color="grey-10" btn-min="icon-mat-expand_more" :minimize="min" @min="min = !min" />
        </div>
        <div v-if="!min" class="col full-height text-white">
          <div v-if="store.items.igd.length" class="full-height q-pa-sm scroll">
            <q-list v-for="dataIgd in store.items?.igd" :key="dataIgd" dark bordered separator>
              <q-item>
                <q-item-section>
                  <q-item-label>Keluhan Utama</q-item-label>
                  <q-item-label caption>
                    <em>{{ dataIgd?.keluhanUtama }}</em>
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>Riwayat Penyakit Sekarang</q-item-label>
                  <q-item-label caption>
                    <em>{{ dataIgd?.riwayatpenyakitsekarang }}</em>
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>Riwayat Penyakit Dahulu</q-item-label>
                  <q-item-label caption>
                    <em>{{ dataIgd?.riwayatpenyakit }}</em>
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>Riwayat Penyakit Keluarga</q-item-label>
                  <q-item-label caption>
                    <em>{{ dataIgd?.riwayatpenyakitkeluarga }}</em>
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>Riwayat Penyakit Pengobatan</q-item-label>
                  <q-item-label caption>
                    <em>{{ dataIgd?.riwayatpengobatan }}</em>
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>Riwayat Pekerjaan yg berhubungan dgn Zat berbahaya</q-item-label>
                  <q-item-label caption>
                    <em>{{ dataIgd?.riwayat_pekerjaan_yang_berhubungan_dengan_zat_berbahaya }}</em>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div v-else class="column full-height flex-center">
            <div>Tidak Ada Anamnesse Dari IGD Sebelumnya</div>
          </div>
        </div>
      </div>
    </div> -->
  <!-- </div> -->
</template>

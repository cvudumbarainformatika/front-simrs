<script setup>
import { defineAsyncComponent, ref } from 'vue'
import useRightPanel from '../use/useRightPanel'
import gsap from 'gsap'
import { dateFullFormat } from 'src/modules/formatter'

// eslint-disable-next-line no-unused-vars
const BarComp = defineAsyncComponent(() => import('../../../components/BarComp.vue'))
const ListIgd = defineAsyncComponent(() => import('../../../components/ListIgd.vue'))
const InfoInputRanap = defineAsyncComponent(() => import('../../../components/InfoInputRanap.vue'))

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
const { store, settings, hapusItem } = useRightPanel(props.pasien)

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
  <div class="fit column bg-grey-4 relative-position">
    <q-splitter
      v-model="settings.splitMin"
      horizontal
      :limits="[5, 94]"

      style="height: 100%"
      separator-class="bg-grey-9"
      separator-style="height: 3px"
    >
      <template #before>
        <div class="bg-grey-4 q-pa-sm">
          <info-input-ranap :items="pasien?.diagnosamedis">
            <transition-group appear tag="div" @before-enter="beforeEnter" @enter="enter">
              <div v-for="(item, i) in pasien?.diagnosamedis" :key="i" v-ripple class="q-card q-pa-sm q-mb-sm cursor-pointer">
                <q-item
                  :key="i"
                  class="list-move q-pa-none"
                >
                  <q-item-section class="q-px-md q-py-sm">
                    <q-item-label
                      lines="2"
                      class="f-12"
                    >
                      <em class="text-bold">ICD Kode</em> : <span class="text-weight-bold">{{ item.rs3 }}</span>
                    </q-item-label>
                    <q-item-label
                      lines="3"
                    >
                      <em class="text-bold">diagnosa</em> : <span class="">{{ item.masterdiagnosa?.rs4 }}</span>
                    </q-item-label>
                    <q-item-label
                      lines="3"
                    >
                      <em class="">keterangan</em> : <span
                        v-if="item?.rs6 && item?.rs6?.length > 0 "
                        class="text-weight-bold"
                      >{{ item?.rs6 }}</span>
                      <span
                        v-else
                        class="text-weight-bold"
                      >{{ '-' }}</span>
                    </q-item-label>
                    <q-item-label
                      lines="2"
                    >
                      <!-- <em class="">Kasus</em>  <span class="text-weight-bold">{{ item.rs7 }}</span> -->
                      <div class="row q-gutter-sm">
                        <q-badge
                          outline
                          :label="`Kasus ${item?.rs7}`"
                          color="accent"
                        />
                        <q-badge
                          outline
                          :label="`Tipe ${item?.rs4}`"
                          :color="item?.rs4==='Primer'? 'primary':'negative'"
                        />
                      </div>
                    </q-item-label>
                  </q-item-section>

                  <q-item-section
                    side
                    top
                    class="text-right q-py-sm"
                  >
                    <q-btn
                      flat
                      round
                      size="sm"
                      icon="icon-mat-edit"
                      @click="store.editFormDiagnosa(item)"
                      class="q-my-md"
                    />
                    <q-btn
                      flat
                      round
                      size="sm"
                      icon="icon-mat-delete"
                      color="negative"
                      class="q-mb-md"
                      @click="hapusItem(item.id)"
                    />

                    <q-item-label class="absolute-top-right q-pa-xs q-pr-md">
                      <div class="row q-gutter-sm">
                        <div class="col-auto text-italic f-10 text-weight-bold">
                          Tgl :
                        </div>
                        <div class="col-auto text-italic f-10 text-weight-bold">
                          {{ dateFullFormat( item?.rs12) }}
                        </div>
                      </div>
                    </q-item-label>
                  </q-item-section>
                </q-item>
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
              :btn-full="false" title="Diagnosa IGD" bg-color="grey-10"
              btn-min="icon-mat-expand_more"
              :minimize="settings.splitMin > 50"
              @min="()=> {
                settings.splitMin === 94 ? settings.splitMin = 50 : settings.splitMin = 95
              }"
            />
          </div>
          <div class="col full-height q-pa-sm scroll content">
            <list-igd :items="store.items?.igd">
              <q-list dark bordered separator class="">
                <q-item v-for="item in store.items?.igd" :key="item">
                  <q-item-section class="q-px-md q-py-sm">
                    <q-item-label
                      lines="2"
                      class="f-12"
                    >
                      <em class="text-bold">ICD Kode</em> : <span class="text-weight-bold">{{ item.rs3 }}</span>
                    </q-item-label>
                    <q-item-label
                      lines="3"
                    >
                      <em class="text-bold">diagnosa</em> : <span class="">{{ item.masterdiagnosa?.rs4 }}</span>
                    </q-item-label>
                    <q-item-label
                      lines="3"
                    >
                      <em class="">keterangan</em> : <span
                        v-if="item?.rs6 && item?.rs6?.length > 0 "
                        class="text-weight-bold"
                      >{{ item?.rs6 }}</span>
                      <span
                        v-else
                        class="text-weight-bold"
                      >{{ '-' }}</span>
                    </q-item-label>
                    <q-item-label
                      lines="2"
                    >
                      <!-- <em class="">Kasus</em>  <span class="text-weight-bold">{{ item.rs7 }}</span> -->
                      <div class="row q-gutter-sm">
                        <q-badge

                          :label="`Kasus ${item?.rs7}`"
                          color="accent"
                        />
                        <q-badge

                          :label="`Tipe ${item?.rs4}`"
                          :color="item?.rs4==='Primer'? 'primary':'negative'"
                        />
                      </div>
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side class="absolute-bottom-right q-ma-md">
                    <q-item-label
                      lines="2"
                    >
                      <div class="row q-gutter-sm">
                        <div class="col-auto text-italic f-10 text-weight-bold">
                          Tanggal Input :
                        </div>
                        <div class="col-auto text-italic f-10 text-weight-bold">
                          {{ dateFullFormat( item?.rs12) }}
                        </div>
                      </div>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </list-igd>
          </div>
        </div>
      </template>
    </q-splitter>
  </div>
</template>

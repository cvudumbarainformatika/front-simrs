<template>
  <q-page class="fit absolute column">
    <div class="fit">
      <q-splitter
        v-model="splitterModel"
        :limits="[0, 100]"
        before-class="overflow-hidden"
        after-class="overflow-hidden"
        class="fit"
      >
        <template #before>
          <div class="column fit bg-indigo-1">
            <div class="col-auto q-pa-md">
              <div class="text-h5 text-bold text-center">
                RKD
              </div>
            </div>
            <div class="col full-height scroll">
              <q-tabs
                v-model="innerTab"
                vertical
                class="text-primary bg-indigo-1"
                active-color="orange-10"
                no-caps
              >
                <q-tab name="innerMails" icon="icon-mat-email" label="Permintaan" />
                <q-tab name="outerMails" icon="icon-mat-mark_email_read" label="Sudah Dijawab" />
              </q-tabs>
            </div>
          </div>
        </template>

        <template #after>
          <div class="column fit">
            <div class="col-auto full-width">
              <q-card class="row justify-between items-center q-pa-sm shadow-2 bg-indigo-1">
                <div><b>LEMBAR KONSUL</b></div>
                <q-btn icon="icon-mat-close" flat dense size="sm" color="dark" @click="router.back()" />
              </q-card>
            </div>
            <div class="col fit">
              <q-tab-panels
                v-model="innerTab"
                animated
                swipeable
                vertical
                transition-prev="jump-up"
                transition-next="jump-up"
                class="bg-indigo-1 fit"
              >
                <q-tab-panel name="innerMails" class="fit q-pa-none">
                  <ListMail
                    v-if="store.items?.length"
                    :items="store.items"
                    @details="(val)=>{
                      store.item = val
                      innerTab = 'outerMails'
                    }"
                    @refresh="store.getRuangKonsulDokter"
                  />
                  <app-loader v-else-if="store.loading" />
                  <div v-else class="col full-height">
                    <div class="column full-height flex-center">
                      <div>Belum Ada Konsulan</div>
                      <q-btn
                        color="dark"
                        label="Kembali Ke Menu Utama"
                        no-caps
                        class="q-mt-md"
                        @click="router.back()"
                      />
                    </div>
                  </div>
                </q-tab-panel>

                <q-tab-panel name="outerMails" class="fit q-pa-none">
                  <DetailForm :item="store?.item" @to-list="innerTab = 'innerMails'" />
                </q-tab-panel>
              </q-tab-panels>
            </div>
          </div>
        </template>
      </q-splitter>
    </div>
  </q-page>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
// import { usePengunjungRanapStore } from 'src/stores/simrs/ranap/pengunjung'
import { useRuangKonsulDokterStore } from 'src/stores/simrs/ranap/ruangkonsuldokter'
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const ListMail = defineAsyncComponent(() => import('./comp/ListMail.vue'))
const DetailForm = defineAsyncComponent(() => import('./comp/DetailForm.vue'))

const splitterModel = ref(0)

const innerTab = ref('innerMails')

const router = useRouter()

const store = useRuangKonsulDokterStore()
// const pengunjungRanap = usePengunjungRanapStore()

// console.log('router', router)

onMounted(() => {
  Promise.all([
    // pengunjungRanap.getNakes(),
    store.getRuangKonsulDokter()
    // store.initReset()
  ])
})

</script>

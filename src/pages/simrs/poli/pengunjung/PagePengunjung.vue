<template>
  <q-page
    ref="pageRef"
    class="column full-height q-pa-xs"
  >
    <div
      class="col-auto"
      :style="`z-index:1000; ${!style.componentfull?'':''}`"
    >
      <header-comp
        :tanggal="store.params.tgl"
        :search="store.params.q"
        :per-page="store.params.per_page"
        @fullscreen="style.setComponentFull"
        @set-tanggal="(val)=>store.setDate(val)"
        @set-search="store.setQ"
        @set-row="store.setPerPage"
      />
      <!-- <div class="">
        <q-toolbar class="bg-primary text-white">
          <q-btn
            flat
            round
            dense
            icon="icon-mat-personal_injury"
            class="q-mr-sm"
          />

          <q-toolbar-title>
            <div class="f-14 ">
              My Pasien
            </div>
            <div class="f-10">
              Daftar Pengunjung di Ruangan Ini
            </div>
          </q-toolbar-title>

          <q-btn
            flat
            color="white"
            icon-right="icon-mat-event"
            :label="tanggal"
            size="sm"
            padding="xs"
            class="q-mr-sm"
          >
            <q-popup-proxy ref="popup">
              <q-date

                v-model="date"
                minimal
                mask="YYYY-MM-DD"
                @update:model-value="lihatRef"
              />
            </q-popup-proxy>
          </q-btn>
          <q-btn
            flat
            color="white"
            icon-right="icon-mat-dataset"
            :label="txt"
            size="sm"
            padding="xs"
            class="q-mr-sm"
          >
            <q-menu
              transition-show="flip-left"
              transition-hide="flip-right"
              :offset="[0,10]"
            >
              <q-list style="min-width: 150px">
                <q-item
                  v-for="(item, i) in txts"
                  :key="i"
                  v-close-popup
                  clickable
                  :class="item===txt?'bg-secondary text-white':''"
                  @click="txt=item"
                >
                  <q-item-section>{{ item }}</q-item-section>
                </q-item>
                <q-separator />
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn
            flat
            round
            dense
            :icon="style.componentfull?'icon-mat-close_fullscreen':'icon-mat-open_in_full'"
            size="sm"
            @click="style.setComponentFull"
          />
        </q-toolbar>
      </div> -->
    </div>
    <q-card
      square
      class="col-grow scroll"
      :style="`height: ${!style.componentfull? h-100:h-20}px;`"
    >
      <list-pengunjung
        :key="store.items"
        :items="store.items"
        @tindakan="bukaTindakan"
      />
    </q-card>

    <page-tindakan
      v-model="store.pageTindakan"
      :pasien="pasien"
    />
  </q-page>
</template>

<script setup>
import { useStyledStore } from 'src/stores/app/styled'
import { usePengunjungPoliStore } from 'src/stores/simrs/pelayanan/poli/pengunjung'
import { onMounted, ref } from 'vue'
import HeaderComp from './comp/HeaderComp.vue'
import ListPengunjung from './comp/ListPengunjung.vue'
import PageTindakan from './comp/PageTindakan.vue'

const style = useStyledStore()
const store = usePengunjungPoliStore()
const pageRef = ref()
const h = ref(0)
const pasien = ref(null)

// const txt = ref('SEMUA')
// const txts = ref(['SEMUA', 'TERLAYANI', 'BELUM TERLAYANI'])
onMounted(() => {
  store.getData()
  h.value = pageRef.value.$el.clientHeight
})

function bukaTindakan(val) {
  const pasien = val
  pasien.value = val
  store.togglePageTindakan()
  console.log(pasien)
}
</script>

<template>
  <q-page
    ref="pageRef"
    class="column full-height q-pa-md"
  >
    <div class="col-auto">
      <PageHead
        :title="title"
        :subtitle="subtitle"
        @togle-draw="toggleDraw()"
      />
    </div>
    <q-card
      flat
      class="col bg-white full-width full-height"
      :style="`max-height: ${h-60}px; overflow:hidden`"
    >
      <q-scroll-area
        :style="`height: ${h-100}px; max-width: 100%;`"
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
          >
            <q-tooltip>
              <strong>Call</strong>
            </q-tooltip>
          </q-btn>
          <q-btn
            flat
            round
            icon="icon-mat-refresh"
          >
            <q-tooltip>
              <strong>Recall</strong>
            </q-tooltip>
          </q-btn>
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

const drawerRight = ref(false)

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
  }
  return 'MASTER PASIEN'
})
const subtitle = computed(() => {
  if (page.path === '/pendaftaran/bpjs/form') {
    return 'Pendaftaran Pasien Baru Rajal BPJS || JKN'
  }
  return 'Daftar Pasien'
})
onMounted(() => {
  console.log('page ', page.path)
  h.value = pageRef.value.$el.clientHeight
})

function toggleDraw() {
  drawerRight.value = !drawerRight.value
}

</script>

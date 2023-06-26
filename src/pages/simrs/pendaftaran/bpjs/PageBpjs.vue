<template>
  <q-page
    ref="pageRef"
    class="column full-height q-pa-md"
  >
    <div class="col-auto">
      <PageHead />
    </div>
    <div
      class="col bg-white full-width full-height"
      :style="`max-height: ${h-60}px; overflow:hidden`"
    >
      <q-scroll-area
        :style="`height: ${h-100}px; max-width: 100%;`"
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
      >
        <!-- <router-view
          v-slot="{ Component }"
          class="transition"
        >
          <transition
            :name="transition.pageTransition.name"
            :mode="transition.pageTransition.mode"
          >
            <component :is="Component" />
          </transition>
        </router-view> -->
        <router-view />
      </q-scroll-area>
      <!-- <q-tab-panels
        v-model="tab"
        animated
        vertical
        class="col-grow"
        style="max-height: 100%;"
      >
        <q-tab-panel
          name="form"
          class="full-height full-width"
          style="padding:0px !important"
        >
          <q-scroll-area
            :style="`height: ${h-120}px; max-width: 100%;`"
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
          >
            <FormBpjs />
          </q-scroll-area>
        </q-tab-panel>

        <q-tab-panel name="daftar-pasien">
          <div class="text-h6">
            Alarms
          </div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>

        <q-tab-panel name="movies">
          <div class="text-h6">
            Movies
          </div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels> -->
    </div>
  </q-page>
</template>

<script setup>
import PageHead from './PageHead.vue'
import { onMounted, ref } from 'vue'

// const tab = ref('form')
// const tabs = ref([
//   { nama: 'form', label: 'Pasien Baru', icon: '' },
//   { nama: 'daftar-pasien', label: 'Daftar Pasien', icon: '' }
// ])

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
onMounted(() => {
  console.log('page ', pageRef.value.$el.clientHeight)
  h.value = pageRef.value.$el.clientHeight
})
</script>

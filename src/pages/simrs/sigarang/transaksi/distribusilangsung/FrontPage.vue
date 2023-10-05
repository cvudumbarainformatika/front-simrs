<template>
  <q-page
    ref="pageRef"
    class="column full-height full-width"
    :class="!style.componentfull ? 'q-pa-md' : 'q-pa-xs'"
  >
    <div class="col-auto ">
      <PageHead
        v-if="!style.componentfull"
        :title="title"
        :subtitle="subtitle"
        :path="tab"
        @ganti="setTab"
      />
    </div>
    <q-card
      flat
      class="col full-width full-height"
      :style="`max-height: ${!style.componentfull ? h - 60 : h + 40}px; overflow:hidden`"
    >
      <q-scroll-area
        :style="`height: ${!style.componentfull ? h - 95 : h + 40}px; max-width: 100%;`"
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
      >
        <!-- <router-view v-slot="{ Component, route }">
          <transition :name="route.meta.transition || 'fade'">
            <component :is="Component" />
          </transition>
        </router-view> -->
        <q-tab-panels
          v-model="tab"
          animated
        >
          <q-tab-panel name="dist">
            <DistribusiLangsungPage />
          </q-tab-panel>
          <q-tab-panel name="list">
            <ListDistribusiLangsungPage />
          </q-tab-panel>
        </q-tab-panels>
      </q-scroll-area>
    </q-card>
  </q-page>
</template>
<script setup>
import PageHead from './PageHead.vue'
import ListDistribusiLangsungPage from './ListDistribusiLangsungPage.vue'
import DistribusiLangsungPage from './DistribusiLangsungPage.vue'
import { computed, onMounted, ref } from 'vue'
import { useStyledStore } from 'src/stores/app/styled'

const tab = ref('dist')
const style = useStyledStore()

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
function setTab(val) {
  tab.value = val
}
const title = computed(() => {
  if (tab.value === 'list') {
    return 'LIST DISTRIBUSI LANGSUNG'
  } else if (tab.value === 'dist') {
    return 'DISTRIBUSI LANGSUNG'
  } else {
    return ' '
  }
})
const subtitle = computed(() => {
  if (tab.value === 'list') {
    return 'List Distribusi Langsung'
  } else if (tab.value === 'dist') {
    return 'Distribusi langsung'
  } else {
    return ' '
  }
})
onMounted(() => {
  console.log('page ', tab.value)
  h.value = pageRef.value.$el.clientHeight
})

</script>

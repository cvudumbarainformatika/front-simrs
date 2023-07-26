<template>
  <q-page
    ref="pageRef"
    class="column full-height full-width"
    :class="!style.componentfull?'q-pa-md':'q-pa-xs'"
  >
    <div class="col-auto ">
      <PageHead
        v-if="!style.componentfull"
        title="Master General Consent"
        subtitle="Pengaturan Master General Consent Rawat Jalan & IRD"
      />
    </div>
    <q-card
      flat
      class="col full-width full-height"
      :style="`max-height: ${!style.componentfull? h-60:h+40}px; overflow:hidden`"
    >
      <q-scroll-area
        :style="`height: ${!style.componentfull? h-95:h+40}px; max-width: 100%;`"
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
      >
        <!-- <ContentPage :editable-master="true" /> -->
        <master-general-consent :editable-master="true" />
      </q-scroll-area>
    </q-card>
  </q-page>
</template>

<script setup>
import { useStyledStore } from 'src/stores/app/styled'
import { onMounted, ref } from 'vue'
import PageHead from './comp/PageHead.vue'
// import ContentPage from './comp/ContentPage.vue'
// import ContentP from './ContentP.vue'
// const editor = ref('')
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
onMounted(() => {
  h.value = pageRef.value.$el.clientHeight
})
</script>

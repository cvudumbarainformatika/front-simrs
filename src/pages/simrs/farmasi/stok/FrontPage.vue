<template>
  <q-page
    ref="pageRef"
    class="column full-height full-width"
    :class="!style.componentfull?'q-pa-xs':'q-pa-xs'"
  >
    <q-card
      flat
      class="col full-width full-height"
      :style="`max-height: ${!style.componentfull? h:h+40}px;`"
    >
      <q-scroll-area
        :style="`height: ${!style.componentfull? h-10:h+40}px; max-width: 100%;`"
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
      >
        <FrontComp />
      </q-scroll-area>
    </q-card>
  </q-page>
</template>
<script setup>
import { defineAsyncComponent, onMounted, ref } from 'vue'
// import { useRoute } from 'vue-router'
import { useStyledStore } from 'src/stores/app/styled'

const style = useStyledStore()
const FrontComp = defineAsyncComponent(() =>
  import('./StokPage.vue')
)
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
// const page = useRoute()
onMounted(() => {
  console.log('height ', pageRef.value.$el.clientHeight)
  h.value = pageRef.value.$el.clientHeight
})

</script>

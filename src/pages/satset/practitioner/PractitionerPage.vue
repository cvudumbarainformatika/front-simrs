<template>
  <q-page
    class=""
    :class="style.componentfull?'container-no-header':'container--q-header q-pa-xs'"
  >
    <div class="header">
      <HeaderCompPage />
    </div>
    <q-card
      flat
      no-shadow
      square
      class="my-flex-1 scroll"
    >
      <q-scroll-area
        style="height:calc( 100% - 40px)"
      >
        <ListsNakes />
      </q-scroll-area>
      <div
        v-if="store.meta"
        class="absolute-bottom bg-primary text-white"
      >
        <BottomComp
          :meta="store.meta"
          @go-to="store.goToPage"
        />
      </div>
    </q-card>

    <!-- dialogPage -->
  </q-page>
</template>

<script setup>
import HeaderCompPage from './comp/HeaderCompPage.vue'
import ListsNakes from './comp/ListsNakes.vue'
import BottomComp from './comp/BottomComp.vue'
import { useStyledStore } from 'src/stores/app/styled'
import { useSatsetStore } from 'src/stores/satset/index'
import { usePractitionerStore } from 'src/stores/satset/practitioner'
import { computed, onMounted } from 'vue'
const style = useStyledStore()

const satset = useSatsetStore()
const store = usePractitionerStore()

const auth = computed(() => {
  return satset.auth
})

onMounted(() => {
  if (auth.value === null) {
    satset.getAuth()
  }

  store.getData()
})

// onBeforeUnmount(() => {
//   satset.DELETE_TOKEN_SATSET()
// })
</script>

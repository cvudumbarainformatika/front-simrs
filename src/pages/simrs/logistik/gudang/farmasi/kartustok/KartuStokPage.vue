<template>
  <q-page
    :class="style.componentfull?'container-no-header':'container--q-header q-pa-xs relative-position'"
  >
    <div class="header">
      <HeaderComp />
    </div>
    <q-card
      flat
      no-shadow
      square
      class="my-flex-1 scroll"
    >
      <q-scroll-area style="height:calc( 100% - 40px)">
        <ListObat />
        <div style="margin-bottom: 100px;" />
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

    <KartuStokRinci
      v-model="store.dialogRinci"
      :item="store.item"
      :params="store.params"
      :key="store.item"
    />
  </q-page>
</template>

<script setup>
import HeaderComp from './comp/HeaderComp.vue'
import ListObat from './comp/ListObat.vue'
import BottomComp from './comp/BottomCompPage.vue'
import KartuStokRinci from './comp/KartuStokRinci.vue'
import { useStyledStore } from 'src/stores/app/styled'
import { useKartuStokFarmasiStore } from '../../../../../../stores/simrs/farmasi/katustok'

const style = useStyledStore()
const store = useKartuStokFarmasiStore()

</script>

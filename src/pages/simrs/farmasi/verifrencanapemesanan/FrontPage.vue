<template>
  <div class="column">
    <!-- <Header
      v-if="!style.componentfull"
      ref="pageRef"
      class="col-auto"
      :head="head"
      :heads="heads"
      title="Verif Perencanaan Pemesanan"
      subtitle="Halaman Verifikasi Perencanaan Pemesanan"
      @ganti="gantiHead"
    /> -->

    <!-- <div
      class="relative col-auto"
      style="height:calc( 100% - 46px);"
    >
      <q-tab-panels
        v-model="head"
        animated
        class="full-height full-width absolute"
      >
        <q-tab-panel
          v-for="(panel, n) in heads"
          :key="n"
          :name="panel.page"
          class="q-pa-none"
        >
          <component
            :is="cekPanel()"
          />
        </q-tab-panel>
      </q-tab-panels>
    </div> -->
    <verif />
  </div>
</template>
<script setup>
import { defineAsyncComponent } from 'vue'
// import { findWithAttr } from 'src/modules/utils'
// import { useStyledStore } from 'src/stores/app/styled'

// const style = useStyledStore()

const verif = defineAsyncComponent(() => import('./verif/MainComp.vue'))
// const Header = defineAsyncComponent(() => import('./comp/PageHead.vue'))
// const head = ref('verif')
// const heads = ref([
//   { page: 'verif', label: 'Verif Perencanaan Pemesanan', color: 'deep-orange' },
//   { page: 'list', label: 'List Perencaan Pemesanan', color: 'green' }
// ])
// function gantiHead(val) {
//   head.value = val
// }

// const comp = [
//   { nama: 'verif', page: defineAsyncComponent(() => import('./verif/MainComp.vue')) },
//   { nama: 'list', page: defineAsyncComponent(() => import('./list/MainComp.vue')) }
// ]

// const cekPanel = () => {
//   const val = head.value
//   const ganti = val.replace(/ /g, '')
//   const arr = findWithAttr(comp, 'nama', ganti)
//   return arr >= 0 ? comp[arr].page : ''
// }
</script>

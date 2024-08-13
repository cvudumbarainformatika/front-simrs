<template>
  <q-page
    class=""
    :class="style.componentfull?'container-no-header':'container--q-header q-pa-xs'"
  >
    <div class="header">
      <div class="row items-center q-pa-md">
        <div>
          <q-icon
            name="icon-my-personal_injury"
            size="sm"
          />
        </div>
        <div class="f-14 text-weight-bold q-ml-sm">
          Data Kunjungan Pasien
        </div>
      </div>
    </div>
    <q-card
      flat
      no-shadow
      square
      class="my-flex-1 scroll"
    >
      <q-scroll-area
        style="height:calc( 100% - 1px)"
        class="q-pa-lg"
      >
        <ListPages
          :items="items"
          @on-connect="(val)=> setItem(val)"
        />
      </q-scroll-area>
    </q-card>

    <!-- dialogPage -->
    <DialogPage
      v-model="dialogOpen"
      :item="item"
    />
  </q-page>
</template>

<script setup>
import DialogPage from './comp/DialogPage.vue'
import ListPages from './comp/ListPages.vue'
import { useStyledStore } from 'src/stores/app/styled'
import { useSatsetStore } from 'src/stores/satset/index'
// import { useOrganisasiStore } from 'src/stores/satset/organisasi'
import { computed, onMounted, ref } from 'vue'
const style = useStyledStore()

const satset = useSatsetStore()

const auth = computed(() => {
  return satset.auth
})

const items = ref([
  { nama: 'Pasien Rajal', icon: 'icon-mat-personal_injury', desc: 'Kunjungan Pasien Rawat Jalan', content: 'rajal', comp: 'BlockPage' },
  { nama: 'Pasien Ranap', icon: 'icon-mat-bedroom_parent', desc: 'Kunjungan Pasien Rawat Inap', content: 'rajal', comp: 'BlockPage' }
])

const item = ref(null)
const dialogOpen = ref(false)

onMounted(() => {
  if (auth.value === null) {
    satset.getAuth()
  }
})

function setItem (val) {
  item.value = val
  dialogOpen.value = true
}
</script>

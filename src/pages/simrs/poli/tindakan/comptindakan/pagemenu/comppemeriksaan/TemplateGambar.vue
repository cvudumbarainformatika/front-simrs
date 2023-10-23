<template>
  <div class="full-height text-white">
    <div
      class="column full-height"
      style="overflow: hidden;"
    >
      <div class="col-auto bg-teal">
        <q-bar>
          <div class="f-12">
            Template Gambar
          </div>
          <q-space />
          <q-btn
            flat
            size="sm"
            icon="icon-mat-close"
            padding="xs"
            @click="store.setDialogTemplate"
          />
        </q-bar>
      </div>
      <div class="col">
        <div class="column full-height">
          <div
            class="col-6"
            style="overflow: hidden;"
          >
            <q-scroll-area style="height: 100%;">
              <div class="row q-col-gutter-md q-pa-md flex-center">
                <div
                  v-for="(item, i) in fileGambars"
                  :key="i"
                  class="col-4"
                >
                  <q-card
                    class="text-dark cursor-pointer"
                    :class="gambarActive===i?'gambar-active':''"
                    @click="store.setGambarActive(i, item.url)"
                  >
                    <q-img
                      :src="`${pathImg + item.url}`"
                    />
                  </q-card>
                  <!-- {{ item }} -->
                </div>
              </div>
            </q-scroll-area>
          </div>
          <div class="col-6">
            <q-separator dark />
            <div class="q-pa-md">
              <q-input
                v-model="search"
                color="teal"
                outlined
                label="cari template"
                dense
                dark
                @update:model-value="filterredMenu()"
              >
                <template #prepend>
                  <q-icon
                    name="icon-mat-search"
                    size="sm"
                  />
                </template>
              </q-input>
            </div>
            <div class="row q-col-gutter-xs items-start q-py-sm q-pl-xs">
              <div
                v-for="(item, n) in filterredMenu()"
                :key="n"
                class="col-auto"
              >
                <div class="">
                  <q-btn
                    :icon="item.icon"
                    dense
                    :text-color="active === item.nama ? 'black' : 'white'"
                    :glossy="active === item.nama"
                    :color="active === item.nama ? 'amber' : 'dark'"
                    size="xl"
                    @click="store.setTemplateActive(item.nama)"
                  >
                    <q-tooltip
                      anchor="top middle"
                      self="top middle"
                      class="bg-orange text-dark"
                    >
                      <strong>{{ item.nama }}</strong>
                    </q-tooltip>
                  </q-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePemeriksaanFisik } from 'src/stores/simrs/pelayanan/poli/pemeriksaanfisik'
import { useMenuPemeriksaan } from '../../forjs/menupemeriksaan'
import { computed, onMounted } from 'vue'
import { pathImg } from 'src/boot/axios'

const store = usePemeriksaanFisik()
const { search, filterredMenu } = useMenuPemeriksaan()
const props = defineProps({
  active: {
    type: String,
    default: 'Body'
  },
  gambarActive: {
    type: Number,
    default: 0
  }
})
// const lorem = ref('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.')
const fileGambars = computed(() => {
  // const arr = filterredMenu()
  // const men = arr.filter(x => x.nama.indexOf(props.active) > -1)
  // const menu = men.length ? men[0].url : ''
  // const modules = import.meta.glob('/src/assets/human/anatomys/*.{png,svg,jpg,jpeg}', { eager: true })
  // const arr2 = Object.keys(modules)
  // const res = arr2.filter(x => x.indexOf(menu) > -1)
  // return res
  const arr = filterredMenu()
  const men = arr.filter(x => x.nama.indexOf(props.active) > -1)
  const menu = men.length ? men[0] : ''
  // const modules = import.meta.glob('/src/assets/human/anatomys/*.{png,svg,jpg,jpeg}', { eager: true })
  const arr2 = menu?.gambars
  // const res = arr2.filter(x => x.indexOf(menu) > -1)
  return arr2
})

onMounted(() => {
  console.log('fileGambars', fileGambars.value)
})
</script>

<style lang="scss" scoped>
.gambar-active{
  border:3px solid $negative;
}
</style>

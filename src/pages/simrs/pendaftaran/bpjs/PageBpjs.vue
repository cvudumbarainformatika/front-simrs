<template>
  <q-page
    ref="pageRef"
    class="column full-height q-pa-xs"
  >
    <div class="col-auto">
      <q-toolbar class="bg-grey-9 text-white shadow-2">
        <!-- <div class="row items-center q-mr-md">
          <q-icon
            name="icon-mat-verified_user"
            size="sm"
          />
          <div class="q-ml-sm text-h6">
            BPJS / JKN
          </div>
        </div> -->
        <!-- <q-separator
          dark
          vertical
          inset
        /> -->
        <q-tabs
          v-model="tab"
          shrink
        >
          <q-tab
            v-for="(item, i) in tabs"
            :key="i"
            :name="item.nama"
            :label="item.label"
            no-caps
          />
        </q-tabs>

        <q-space />

        <q-btn
          flat
          round
          dense
          icon="icon-mat-menu"
          class="q-mr-xs"
          size="sm"
        />
      </q-toolbar>
    </div>
    <div
      class="col bg-white full-width full-height"
      :style="`max-height: ${h-60}px; overflow:hidden`"
    >
      <q-tab-panels
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
      </q-tab-panels>
    </div>
    <!-- <div class="q-pa-xs col-grow full-height"> -->
    <!-- <div
        class="bg-white"
        style="height: 100%;"
      > -->

    <!-- </div> -->
    <!-- </div> -->
  </q-page>
</template>

<script setup>
import FormBpjs from './form/bpjs/FormBpjs.vue'
import { onMounted, ref } from 'vue'

const tab = ref('form')
const tabs = ref([
  { nama: 'form', label: 'Pasien Baru', icon: '' },
  { nama: 'daftar-pasien', label: 'Daftar Pasien', icon: '' }
])

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

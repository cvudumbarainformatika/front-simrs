<template>
  <div
    class="column full-height q-ma-sm"
    style="overflow: hidden;"
  >
    <div class="column full-height">
      <div class="col-auto bg-red">
        <q-tabs
          v-model="store.tab"
          no-caps
          inline-label
          class="bg-primary text-white shadow-2"
          align="left"
          dense
          active-color="yellow"
        >
          <q-tab
            v-for="(item, i) in store.tabs"
            :key="i"
            :name="item"
            :label="item"
          />
        </q-tabs>
      </div>
      <div class="col-grow bg-yellow">
        <q-tab-panels
          v-model="store.tab"
          animated
          class="full-height"
        >
          <q-tab-panel
            name="Diagnosa"
            class="full-height"
          >
            <div class="text-h6">
              Diagnosa
            </div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
          <q-tab-panel
            name="Tindakan"
            class="full-height"
          >
            <div class="text-h6">
              Tindakan
            </div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
    <!-- <q-tabs
      v-model="store.tab"
      no-caps
      inline-label
      class="bg-primary text-white shadow-2"
      align="left"
      dense
      active-color="yellow"
    >
      <q-tab
        v-for="(item, i) in store.tabs"
        :key="i"
        :name="item"
        :label="item"
      />
    </q-tabs>
    <q-tab-panels
      v-model="store.tab"
      animated
    >
      <q-tab-panel
        name="Diagnosa"
        class="full-height"
      >
        <div class="text-h6">
          Mails
        </div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
    </q-tab-panels> -->
  </div>
</template>

<script setup>
import { useLayananPoli } from 'src/stores/simrs/pelayanan/poli/layanan'

const store = useLayananPoli()
</script>

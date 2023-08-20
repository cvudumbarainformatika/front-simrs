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
                  v-for="n in 1"
                  :key="n"
                  class="col-4"
                >
                  <q-card class="text-dark">
                    <q-card-section>
                      {{ lorem }}
                    </q-card-section>
                  </q-card>
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
                    :text-color="active === n ? 'black' : 'white'"
                    :glossy="active === n"
                    :color="active === n ? 'amber' : 'dark'"
                    size="xl"
                    @click="active = n"
                  >
                    <q-tooltip
                      anchor="top middle"
                      self="top middle"
                      class="bg-orange text-dark"
                    >
                      <strong>{{ item.name }}</strong>
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
import { ref } from 'vue'

const store = usePemeriksaanFisik()
const { search, filterredMenu } = useMenuPemeriksaan()
const active = ref(0)
const lorem = ref('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.')
</script>

<template>
  <div class="full-height q-pa-sm">
    <q-card
      flat
      bordered
      class="full-height"
    >
      <div class="absolute right-menu z-top invisible">
        {{ filterredMenu()[active].name }}
      </div>
      <div class="row full-height">
        <!-- <div class="col full-height">
          <div
            v-if="store.dialogTemplate"
            class="column full-height bg-grey q-pa-xs"
          >
            <div class="col">
              <div class="f-14 text-weight-bold q-py-sm">
                Template Gambar <span class="text-weight-light">({{ filterredMenu()[active].name }})</span>
              </div>
              <q-separator />
            </div>
            <div class="col-auto bg-white q-pa-md">
              <q-input
                v-model="search"
                color="teal"
                outlined
                label="cari"
                dense
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
            <q-separator />
            <div class="col-5 bg-white scroll">
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
                      :color="active===n?'amber':'dark'"
                      size="xl"
                      @click="active=n"
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
        </div> -->
        <div class="col-auto">
          <div class="column full-height">
            <canvas-page />
          </div>
        </div>
        <div
          class="col scroll"
          style="border-left: 1px solid gray;"
        >
          <div class="column full-height">
            <div class="col-4">
              <div class="q-pa-md">
                <div class="text-h6">
                  Vital Sign
                </div>
              </div>
              <q-separator />
              <div class="row q-col-gutter-sm q-pa-md">
                <div class="">
                  <q-input
                    v-model="store.formVital.denyutjantung"
                    dense
                    standout="bg-yellow-3 text-black"
                    outlined
                    label="Denyut Jantung"
                  />
                </div>
                <div class="">
                  <q-input
                    v-model="store.formVital.pernapasan"
                    dense
                    standout="bg-yellow-3 text-black"
                    outlined
                    label="Pernapasan"
                  />
                </div>
                <div class="">
                  <q-input
                    v-model="store.formVital.sistole"
                    dense
                    standout="bg-yellow-3 text-black"
                    outlined
                    label="Sistole per mmHg"
                  />
                </div>
                <div class="">
                  <q-input
                    v-model="store.formVital.diastole"
                    dense
                    standout="bg-yellow-3 text-black"
                    outlined
                    label="Diastole per mmHg"
                  />
                </div>
                <div class="">
                  <q-input
                    v-model="store.formVital.suhutubuh"
                    dense
                    standout="bg-yellow-3 text-black"
                    outlined
                    label="Suhu Tubuh"
                  />
                </div>
              </div>
            </div>
            <div class="col-8">
              <div class="full-height">
                <div class="column full-height">
                  <div class="col-auto">
                    <q-bar
                      dense
                      class="bg-teal text-white"
                    >
                      <div>Detail Penandaan Gambar</div>
                    </q-bar>
                  </div>
                  <div class="col">
                    <q-card
                      flat
                      dark
                      square
                      class="column-break full-height"
                    >
                      <q-scroll-area
                        v-if="store.shapes.length"
                        style="height: calc(100% - 52px);"
                      >
                        <q-list
                          dark
                          separator
                        >
                          <q-item
                            v-for="(item, i) in store.shapes"
                            :key="i"
                          >
                            <q-item-section avatar>
                              <q-avatar
                                size="24px"
                                color="orange"
                              >
                                {{ i+1 }}
                              </q-avatar>
                            </q-item-section>
                            <q-item-section>
                              <q-item-label>{{ item.anatomy ? item.anatomy : '...' }}</q-item-label>
                              <q-item-label
                                caption
                                lines="2"
                              >
                                {{ item.ket ? item.ket : '...' }}
                              </q-item-label>
                            </q-item-section>

                            <q-item-section
                              side
                              style="padding: 0;"
                            >
                              <q-btn
                                flat
                                icon="icon-mat-delete"
                                size="xs"
                                padding="xs"
                                color="negative"
                                @click="store.deleteObjShapes(i)"
                              />
                            </q-item-section>
                          </q-item>
                          <q-separator dark />
                        </q-list>
                      </q-scroll-area>
                      <div
                        v-else
                        class="column flex-center items-center"
                        style="height: calc(100% - 52px);"
                      >
                        Data Belum Ada
                      </div>
                      <div
                        class="
                        text-right
                        bg-yellow-3
                        q-pa-sm"
                      >
                        <q-btn
                          label="Simpan Pemeriksaan"
                          color="primary"
                          @click="store.savePemeriksaan(pasien)"
                        />
                      </div>
                    </q-card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script setup>
// import BodyPage from './comppemeriksaan/Bodypage.vue'
import CanvasPage from './comppemeriksaan/CanvasPage.vue'
import { onMounted, ref } from 'vue'
import { usePemeriksaanFisik } from 'src/stores/simrs/pelayanan/poli/pemeriksaanfisik'
import { useMenuPemeriksaan } from '../forjs/menupemeriksaan'

const store = usePemeriksaanFisik()
// eslint-disable-next-line no-unused-vars
const { search, filterredMenu } = useMenuPemeriksaan()

const active = ref(0)

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

onMounted(() => {
  console.log('props', props.pasien)
})
</script>
<style lang="scss" scoped>
.left-menu{
  background-color: rgba($color: $primary, $alpha: 0.9);
  width:40px;
  height:100%;
}

.card-left {
    background-color: rgba($color: rgb(57, 56, 56), $alpha: 0.3);
  }
.right-menu{
  background-color: rgba($color: $grey, $alpha: 0.8);
  width:350px;
  right: 0;
  // height: calc(100% - 30px) !important;
  height:100%;
}
.my-menu-link{
  color: white;
  background: linear-gradient(90deg, rgb(255, 171, 45) 0%, rgba(255, 145, 0, 0.076) 100%);

}

.hoverred {
  transition: all .2s ease-in-out;
    transform: scale(1.1);
  }

</style>

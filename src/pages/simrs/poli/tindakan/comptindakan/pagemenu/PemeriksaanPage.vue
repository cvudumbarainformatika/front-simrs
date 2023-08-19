<template>
  <div class="full-height q-pa-sm">
    <q-card
      flat
      bordered
      class="full-height"
    >
      <div class="absolute right-menu invisible">
        {{ anats[active].name }}
      </div>
      <div class="row full-height">
        <div class="col full-height">
          <div class="column full-height bg-grey q-pa-xs">
            <div class="col">
              <div class="f-14 text-weight-bold q-py-sm">
                Template Gambar <span class="text-weight-light">({{ anats[active].name }})</span>
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
                  v-for="(item, n) in anats"
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
        </div>
        <div class="col-auto">
          <div class="column full-height">
            <canvas-page />
          </div>
        </div>
        <div class="col">
          <q-card
            flat
            bordered
            square
            dark
            class="full-height"
          >
            <q-list
              v-if="store.shapes.length"
              dark
              separator
            >
              <q-item
                v-for="(item, i) in store.shapes"
                :key="i"
              >
                <q-item-section>
                  <q-item-label>{{ item.anatomy?item.anatomy:'...' }}</q-item-label>
                  <q-item-label
                    caption
                    lines="2"
                  >
                    {{ item.ket?item.ket:'...' }}
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
            <div
              v-else
              class="column full-height flex-center items-center"
            >
              Data Belum Ada
            </div>
          </q-card>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script setup>
// import BodyPage from './comppemeriksaan/Bodypage.vue'
import CanvasPage from './comppemeriksaan/CanvasPage.vue'
import { ref } from 'vue'
import { usePemeriksaanFisik } from 'src/stores/simrs/pelayanan/poli/pemeriksaanfisik'

const store = usePemeriksaanFisik()

const search = ref(null)
const anats = ref([
  { name: 'Body', icon: 'icon-my-human-body-silhouette-with-focus-on-respiratory-system-svgrepo-com' },
  { name: 'Kepala', icon: 'icon-my-human-skull-side-view-svgrepo-com' },
  { name: 'Mata', icon: 'icon-my-eyebrow-svgrepo-com' },
  { name: 'Telinga', icon: 'icon-my-ear-outline-svgrepo-com' },
  { name: 'Hidung', icon: 'icon-my-nose-svgrepo-com' },
  { name: 'Rambut', icon: 'icon-my-male-black-short-hair-shape-silhouette-svgrepo-com' },
  { name: 'Bibir', icon: 'icon-my-thin-lips-outline-svgrepo-com' },
  { name: 'Gigi Geligi', icon: 'icon-my-tooth-outline-svgrepo-com' },
  { name: 'Lidah', icon: 'icon-my-tongue-and-mouth-svgrepo-com' },
  { name: 'Leher', icon: 'icon-my-human-neck-svgrepo-com' },
  { name: 'Tenggorokan', icon: 'icon-my-human-trachea-svgrepo-com' },
  { name: 'Tonsil', icon: 'icon-my-tonsil-svgrepo-com' },
  { name: 'Dada', icon: 'icon-my-female-torso-svgrepo-com' },
  { name: 'Payudara', icon: 'icon-my-upper-torso-of-a-woman-svgrepo-com' },
  { name: 'Punggung', icon: 'icon-my-human-back-svgrepo-com' },
  { name: 'Perut', icon: 'icon-my-stomach-svgrepo-com' },
  { name: 'Genital', icon: 'icon-my-penis-svgrepo-com' },
  { name: 'Anus/Dubur', icon: 'icon-my-nose-outline-svgrepo-com' },
  { name: 'Lengan Atas', icon: 'icon-my-men-elbow-svgrepo-com' },
  { name: 'Lengan Bawah', icon: 'icon-my-arm-svgrepo-com' },
  { name: 'Jari Tangan', icon: 'icon-my-human-hand-bones-svgrepo-com' },
  { name: 'Kuku Tangan', icon: 'icon-my-finger-svgrepo-com' },
  { name: 'Persendian Tangan', icon: 'icon-mat-report' },
  { name: 'Tungkai Atas', icon: 'icon-my-men-leg-svgrepo-com' },
  { name: 'Tungkai Bawah', icon: 'icon-my-foot-side-view-outline-svgrepo-com' },
  { name: 'Jari Kaki', icon: 'icon-my-footprints-outline-variant-svgrepo-com' },
  { name: 'Kuku Kaki', icon: 'icon-my-finger-svgrepo-com' },
  { name: 'Persendian Kaki', icon: 'icon-my-articulation-bones-svgrepo-com' }
])

const active = ref(0)
// const hoverred = ref(null)
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

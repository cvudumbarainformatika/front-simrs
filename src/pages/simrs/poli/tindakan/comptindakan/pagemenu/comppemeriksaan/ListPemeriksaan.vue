<template>
  <q-card
    flat
    square
    class="full-height"
    dark
  >
    <div class="column full-height">
      <div class="col-auto bg-teal text-white">
        <div class="q-px-sm q-py-xs">
          Data Pemeriksaan Fisik
        </div>
      </div>
      <div class="col-grow">
        <q-scroll-area
          v-if="pasien?.pemeriksaanfisik.length"
          style="height:calc(100% - 1px)"
        >
          <q-list
            separator
          >
            <template
              v-for="(item, i) in pasien?.pemeriksaanfisik"
              :key="i"
            >
              <q-item
                class="q-pa-xs"
                dark
              >
                <q-item-section class="q-pa-xs">
                  <q-item-label
                    class=""
                    lines="2"
                  >
                    Denyut Jantung : {{ item?.rs4 }}
                  </q-item-label>

                  <q-item-label
                    class=""
                    lines="2"
                  >
                    Pernapasan : {{ item?.pernapasan }}
                  </q-item-label>

                  <q-item-label>
                    Sosial Ekonomi
                  </q-item-label>
                  <q-item-label
                    caption
                    lines="2"
                  >
                    {{ item?.sosialekonomi ? item.sosialekonomi : '-' }}
                  </q-item-label>
                  <q-item-label>
                    Spiritual
                  </q-item-label>
                  <q-item-label
                    caption
                    lines="2"
                  >
                    {{ item?.spiritual ? item.spiritual : '-' }}
                  </q-item-label>
                </q-item-section>
                <q-item-section
                  side
                >
                  <q-item-label class="text-right">
                    <div class="q-mb-xs">
                      <q-badge
                        outline
                        color="orange"
                      >
                        Sistole : {{ item?.sistole }}
                      </q-badge>
                    </div>
                    <div class="q-mb-xs">
                      <q-badge
                        outline
                        color="orange"
                      >
                        Diastole : {{ item?.diastole }}
                      </q-badge>
                    </div>
                    <div>
                      <q-badge
                        outline
                        color="yellow"
                      >
                        Suhu Tubuh : {{ item?.sistole }}
                      </q-badge>
                    </div>
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-separator dark />
              <div class="q-pa-sm flex items-center">
                <q-btn
                  color="grey"
                  round
                  flat
                  dense
                  :icon="expanded===i+1 ? 'icon-mat-keyboard_arrow_up' : 'icon-mat-keyboard_arrow_down'"
                  @click="expand(i)"
                />
                <q-space />
                <div class="q-gutter-sm">
                  <q-btn
                    flat
                    round
                    size="sm"
                    icon="icon-mat-edit"
                  />
                  <q-btn
                    flat
                    round
                    size="sm"
                    icon="icon-mat-delete"
                    color="negative"
                  />
                </div>
              </div>
              <q-card
                flat
                dark
                square
              >
                <q-slide-transition>
                  <div v-show="expanded===i+1">
                    <q-separator dark />
                    <q-card-section class="text-subtitle2">
                      fdsfdsf
                    </q-card-section>
                  </div>
                </q-slide-transition>
              </q-card>
              <q-separator
                color="grey"
                size="5px"
              />
            </template>
          </q-list>
        </q-scroll-area>
        <div
          v-else
          class="column flex-center full-height"
        >
          Data Pemeriksaan Belum Ada
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'

// import { usePemeriksaanFisik } from 'src/stores/simrs/pelayanan/poli/pemeriksaanfisik';

// const store = usePemeriksaanFisik()

const expanded = ref(0)
function expand(i) {
  expanded.value === i + 1 ? expanded.value === 0 ? expanded.value = i + 1 : expanded.value = 0 : expanded.value = i + 1
}
defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
</script>

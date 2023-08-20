<template>
  <div class="full-height q-pa-sm">
    <q-card
      flat
      bordered
      class="full-height"
    >
      <transition
        appear
        @enter="enter"
        @leave="leave"
      >
        <div
          v-if="store.dialogTemplate"
          class="absolute left-menu"
        >
          <template-gambar style="border-right:2px solid gray;" />
        </div>
      </transition>

      <div class="row full-height">
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
            <div class="col-5">
              <div class="q-pa-md">
                <div class="text-h6">
                  Vital Sign
                </div>
              </div>
              <q-separator />
              <q-form
                ref="formRef"
                class="row q-col-gutter-sm q-pa-md"
                @submit.prevent.stop="onSubmit"
              >
                <div class="">
                  <q-input
                    v-model="store.formVital.denyutjantung"
                    dense
                    standout="bg-yellow-3 text-black"
                    outlined
                    label="Denyut Jantung"
                    :rules="[val => !!val || 'Harap diisi Terlebih dahulu']"
                  />
                </div>
                <div class="">
                  <q-input
                    v-model="store.formVital.pernapasan"
                    dense
                    standout="bg-yellow-3 text-black"
                    outlined
                    label="Pernapasan"
                    :rules="[val => !!val || 'Harap diisi Terlebih dahulu']"
                  />
                </div>
                <div class="">
                  <q-input
                    v-model="store.formVital.sistole"
                    dense
                    standout="bg-yellow-3 text-black"
                    outlined
                    label="Sistole per mmHg"
                    :rules="[
                      val => !!val || 'Harap diisi Terlebih dahulu',
                      val => !isNaN(val) || 'Harus pakai Nomor',
                    ]"
                  />
                </div>
                <div class="">
                  <q-input
                    v-model="store.formVital.diastole"
                    dense
                    standout="bg-yellow-3 text-black"
                    outlined
                    label="Diastole per mmHg"
                    :rules="[
                      val => !!val || 'Harap diisi Terlebih dahulu',
                      val => !isNaN(val) || 'Harus pakai Nomor',
                    ]"
                  />
                </div>
                <div class="">
                  <q-input
                    v-model="store.formVital.suhutubuh"
                    dense
                    standout="bg-yellow-3 text-black"
                    outlined
                    label="Suhu Tubuh"
                    :rules="[
                      val => !!val || 'Harap diisi Terlebih dahulu',
                      val => !isNaN(val) || 'Harus pakai Nomor',
                    ]"
                  />
                </div>
                <div class="invisible">
                  <q-btn
                    ref="btnSubmit"
                    label="Submit"
                    type="submit"
                    color="primary"
                  />
                  <q-btn
                    label="Reset"
                    type="reset"
                    color="primary"
                    flat
                    class="q-ml-sm"
                  />
                </div>
              </q-form>
            </div>
            <div class="col-7">
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
                          @click="onSubmit"
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
import TemplateGambar from './comppemeriksaan/TemplateGambar.vue'
import { onMounted, ref } from 'vue'
import { usePemeriksaanFisik } from 'src/stores/simrs/pelayanan/poli/pemeriksaanfisik'
import { useMenuPemeriksaan } from '../forjs/menupemeriksaan'
import { useSlideFromLeft } from 'src/composable/gsap/slidefromleft'

const store = usePemeriksaanFisik()
// eslint-disable-next-line no-unused-vars
const { search, filterredMenu } = useMenuPemeriksaan()
const { enter, leave } = useSlideFromLeft()
// const active = ref(0)
const formRef = ref()

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

onMounted(() => {
  console.log('props', props.pasien)
})

async function onSubmit() {
  const valid = await formRef.value?.validate()
  if (valid) {
    store.savePemeriksaan(props.pasien)
  }
}
</script>
<style lang="scss" scoped>

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
.left-menu{
  background-color: rgba($color: $dark, $alpha: 0.98);
  width:600px;
  left: 0;
  // height: calc(100% - 30px) !important;
  height:100%;
  z-index:120000;
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

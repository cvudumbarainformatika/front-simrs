<template>
  <div class="row q-col-gutter-xs full-width">
    <div class="col">
      <!-- humpty untuk usia < 18 tahun -->
      <q-card v-if="store?.usia < 18 " flat bordered class="col-12">
        <q-card-section class="q-pa-sm bg-primary text-white">
          <strong>{{ store?.humptys?.desc }}</strong>
        </q-card-section>
        <q-separator />
        <q-card-section v-if="store.formHumpty" class="q-pa-sm row q-col-gutter-xs ">
          <div v-for="obj in store.humptys.form" :key="obj" class="col-12">
            <div class="row ">
              <div class="col-3 ">
                {{ obj?.label }}
              </div>
              <div class="col-9 q-gutter-sm">
                <q-radio
                  v-for="(item, i) in obj?.categories" :key="i" dense size="sm" v-model="store.formHumpty[obj.kode]" :val="item" :label="`${item?.label}`"
                  @update:model-value="store.hitungSkorHumpty"
                />
                <!-- <div v-for="(item, i) in obj?.categories" :key="i">
                  {{ item }} {{ store.formHumpty[obj.kode] === item ? 'sama' : 'tidak' }} {{ store.formHumpty[obj.kode].skor }}
                </div> -->
              </div>
            </div>
            <q-separator class="q-my-sm" />
          </div>
          <div v-if="store.formHumpty.skorHumpty" class="full-width flex justify-end q-gutter-sm f-14 text-accent">
            <div>NILAI SKOR : {{ store.formHumpty.skorHumpty?.skor }} </div>
            <div>KET : {{ store.formHumpty.skorHumpty?.label }}</div>
          </div>
          <div v-if="store.formHumpty.skorHumpty.kuning === true" class="full-width flex justify-end q-gutter-sm f-14 text-yellow-8 q-mt-xs">
            PASIEN DIHARAP PAKAI STICKER KUNING
          </div>
          <div class="col-12">
            <div
              class="text-right"
              style="margin-bottom: 50px;"
            >
              <app-btn
                color="primary"
                label="Simpan Penilaian"
                tooltip="Simpan Data"
                type="submit"
                tip
                @click="store.saveData(props.pasien)"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- Resiko Jatuh Morse Fall Scale (18 - 59 tahun) -->
      <q-card v-if="store.usia >= 18 && store.usia < 60" flat bordered class="col-12">
        <q-card-section class="q-pa-sm bg-primary text-white">
          <strong>{{ store?.morses?.desc }}</strong>
        </q-card-section>
        <q-separator />
        <q-card-section v-if="store.formMorse" class="q-pa-sm row q-col-gutter-xs">
          <div v-for="obj in store.morses.form" :key="obj.kode" class="col-12">
            <div class="row">
              <div class="col-3">
                {{ obj?.label }} :
              </div>
              <div class="col-9 q-gutter-sm">
                <q-radio
                  v-for="(item, i) in obj?.categories" :key="i" dense size="sm" v-model="store.formMorse[obj.kode]" :val="item" :label="`${item?.label}`"
                  @update:model-value="store.hitungSkorMorse"
                />
              </div>
            </div>
            <q-separator class="q-my-sm" />
          </div>
          <div v-if="store.formMorse?.skorMorse" class="full-width flex justify-end q-gutter-sm f-14 text-accent">
            <div>NILAI SKOR : {{ store.formMorse?.skorMorse?.skor }} </div>
            <div>KET : {{ store.formMorse.skorMorse?.label }}</div>
          </div>
          <div v-if="store.formMorse?.skorMorse?.kuning === true" class="full-width flex justify-end q-gutter-sm f-14 text-yellow-8 q-mt-xs">
            PASIEN DIHARAP PAKAI STICKER KUNING
          </div>
          <div class="col-12">
            <div
              class="text-right"
              style="margin-bottom: 50px;"
            >
              <app-btn
                color="primary"
                label="Simpan Penilaian"
                tooltip="Simpan Data"
                type="submit"
                tip
                @click="store.saveData(props.pasien)"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- Resiko Jatuh Ontario / Sidney Scoring (geriatric dg usia >=60 tahun) -->
      <q-card v-if="store.usia >= 60" flat bordered class="col-12">
        <q-card-section class="q-pa-sm bg-primary text-white">
          <strong>{{ store?.ontarios?.desc }}</strong>
        </q-card-section>
        <q-separator />
        <q-card-section v-if="store.formOntario" class="q-pa-sm row q-col-gutter-xs">
          <div v-for="obj in store.ontarios.form" :key="obj.kode" class="col-12">
            <div v-if="obj.submenu.length" class="row">
              <div class="col-12 q-pb-xs">
                <strong>{{ obj?.label }} :</strong>
              </div>
              <q-separator />
              <div class="col-12">
                <q-list bordered separator>
                  <q-item v-for="item in obj.submenu" :key="item">
                    <q-item-section>
                      <q-item-label>{{ item?.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <div class="flex q-gutter-sm">
                        <q-radio
                          dense size="sm" v-for="n in item.categories" :key="n" v-model="store.formOntario[item.kode]" :val="n" :label="n?.label"
                          @update:model-value="store.hitungSkorOntario()"
                        />
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
            <div v-else>
              <div class="row q-pa-none">
                <div class="col-6">
                  <q-item-label>{{ obj?.label }}</q-item-label>
                </div>
                <div class="col-6">
                  <div class="column q-gutter-y-sm">
                    <q-radio
                      dense size="sm" v-for="n in obj.categories" :key="n" v-model="store.formOntario[obj.kode]" :val="n" :label="n?.label"
                      @update:model-value="store.hitungSkorOntario()"
                    />
                  </div>
                </div>
              </div>
              <q-separator class="q-my-sm" />
            </div>
          </div>
        </q-card-section>

        <div class="full-width flex justify-end q-px-md q-pb-md">
          <div v-if="store.formOntario?.skorOntario" class="full-width flex justify-end q-gutter-sm f-14 text-accent">
            <div>NILAI SKOR : {{ store.formOntario?.skorOntario?.skor }} </div>
            <div>KET : {{ store.formOntario?.skorOntario?.label }}</div>
          </div>
          <div v-if="store.formOntario?.skorOntario?.kuning === true" class="full-width flex justify-end q-gutter-sm f-14 text-yellow-9 q-mt-xs">
            PASIEN DIHARAP PAKAI STICKER KUNING
          </div>
        </div>
        <div class="col-12">
          <div
            class="text-right"
            style="margin-bottom: 50px;"
          >
            <app-btn
              color="primary"
              label="Simpan Penilaian"
              tooltip="Simpan Data"
              type="submit"
              tip
              @click="store.saveData(props.pasien)"
            />
          </div>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { usePenilaianAnamnesisIgd } from 'src/stores/simrs/igd/penilaiananamnesis.js'
import { onMounted } from 'vue'
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  kasus: {
    type: Object,
    default: null
  },
  ulang: {
    type: Boolean,
    default: false
  }
})

// const jnsKasusKep = computed(() => {
//   if (props.kasus) {
//     return props.kasus?.gruping
//   }
//   return null
// })

onMounted(async () => {
  const usiaarr = props?.pasien?.usia.split(' ')
  const usiatahun = usiaarr[0]
  store.usia = usiatahun
  store.initReset(props?.pasien)
})

// eslint-disable-next-line no-unused-vars
const store = usePenilaianAnamnesisIgd()

</script>

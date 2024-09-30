<template>
  <div class="row q-col-gutter-xs full-width">
    <!-- barthel -->
    <q-card v-if="store?.barthels?.grupings?.includes(jnsKasusKep)" flat bordered class="col-12">
      <q-card-section class="q-pa-sm bg-grey-4">
        <strong>{{ store?.barthels?.desc }}</strong>
      </q-card-section>
      <q-separator />
      <q-card-section v-if="store.formBarthel" class="q-pa-sm row q-col-gutter-xs">
        <div v-for="obj in store.barthels.form" :key="obj.kode" class="col-12">
          <div class="row">
            <div class="col-3">
              {{ obj?.label }} :
            </div>
            <div class="col-9 q-gutter-sm">
              <q-radio
                v-for="(item, i) in obj?.categories" :key="i" dense size="sm" v-model="store.formBarthel[obj.kode]" :val="item" :label="item?.label"
                @update:model-value="store.hitungSkorBarthel"
              />
            </div>
          </div>
          <q-separator class="q-my-sm" />
        </div>
        <div v-if="store.formBarthel.skorBarthel" class="full-width flex justify-end q-gutter-sm f-14 text-accent">
          <div>NILAI SKOR : {{ store.formBarthel?.skorBarthel?.skor }} </div>
          <div>KET : {{ store.formBarthel?.skorBarthel?.label }}</div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Resiko Ulkus Dekubitus Skala Norton -->
    <q-card v-if="store?.nortons?.grupings?.includes(jnsKasusKep)" flat bordered class="col-12">
      <q-card-section class="q-pa-sm bg-grey-4">
        <strong>{{ store?.nortons?.desc }}</strong>
      </q-card-section>
      <q-separator />
      <q-card-section v-if="store.formNorton" class="q-pa-sm row q-col-gutter-xs">
        <div v-for="obj in store.nortons.form" :key="obj.kode" class="col-12">
          <div class="row">
            <div class="col-3">
              {{ obj?.label }} :
            </div>
            <div class="col-9 q-gutter-sm">
              <q-radio
                v-for="(item, i) in obj?.categories" :key="i" dense size="sm" v-model="store.formNorton[obj.kode]" :val="item" :label="item?.label"
                @update:model-value="store.hitungSkorNorton"
              />
            </div>
          </div>
          <q-separator class="q-my-sm" />
        </div>
        <div v-if="store.formNorton.skorNorton" class="full-width flex justify-end q-gutter-sm f-14 text-accent">
          <div>NILAI SKOR : {{ store.formNorton.skorNorton?.skor }} </div>
          <div>KET : {{ store.formNorton.skorNorton?.label }}</div>
        </div>
      </q-card-section>
    </q-card>

    <!-- <q-card flat bordered class="col-12">
      <q-card-section class="q-pa-sm bg-grey-4">
        <strong>Resiko Ulkus Dekubitus Skala Norton</strong>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pa-sm row q-col-gutter-xs">
        <div class="col-12">
          <div class="row">
            <div class="col-2">
              Kond. Fisik Umum :
            </div>
            <div class="col-10 q-gutter-sm">
              <q-radio
                v-for="n in store.norton?.fisikUmum" :key="n.value" dense size="sm" v-model="store.formNorton.fisikUmum" :val="n" :label="n.label"
                @update:model-value="store.hitungSkorNorton()"
              />
            </div>
          </div>
          <q-separator class="q-my-sm" />
          <div class="row">
            <div class="col-2">
              Kesadaran :
            </div>
            <div class="col-10 q-gutter-sm">
              <q-radio
                v-for="n in store.norton?.kesadaran" :key="n.value" dense size="sm" v-model="store.formNorton.kesadaran" :val="n" :label="n.label"
                @update:model-value="store.hitungSkorNorton()"
              />
            </div>
          </div>
          <q-separator class="q-my-sm" />
          <div class="row">
            <div class="col-2">
              Aktivitas :
            </div>
            <div class="col-10 q-gutter-sm">
              <q-radio
                v-for="n in store.norton?.aktivitas" :key="n.value" dense size="sm" v-model="store.formNorton.aktivitas" :val="n" :label="n.label"
                @update:model-value="store.hitungSkorNorton()"
              />
            </div>
          </div>
          <q-separator class="q-my-sm" />
          <div class="row">
            <div class="col-2">
              Mobilitas :
            </div>
            <div class="col-10 q-gutter-sm">
              <q-radio
                v-for="n in store.norton?.mobilitas" :key="n.value" dense size="sm" v-model="store.formNorton.mobilitas" :val="n" :label="n.label"
                @update:model-value="store.hitungSkorNorton()"
              />
            </div>
          </div>
          <q-separator class="q-my-sm" />
          <div class="row">
            <div class="col-2">
              Inkontinensia :
            </div>
            <div class="col-10 q-gutter-sm">
              <q-radio
                v-for="n in store.norton?.inkontinensia" :key="n.value" dense size="sm" v-model="store.formNorton.inkontinensia" :val="n" :label="n.label"
                @update:model-value="store.hitungSkorNorton()"
              />
            </div>
          </div>
          <q-separator class="q-my-sm" />
          <div class="full-width flex justify-end q-gutter-sm f-14 text-accent">
            <div>NILAI SKOR : {{ store.formNorton.skorNorton?.skor }} </div>
            <div>KET : {{ store.formNorton.skorNorton?.label }}</div>
          </div>
        </div>
      </q-card-section>
    </q-card> -->

    <!-- humpty untuk usia < 14 tahun -->
    <q-card v-if="store?.humptys?.grupings?.includes(jnsKasusKep)" flat bordered class="col-12">
      <q-card-section class="q-pa-sm bg-grey-4">
        <strong>{{ store?.humptys?.desc }}</strong>
      </q-card-section>
      <q-separator />
      <q-card-section v-if="store.formHumpty" class="q-pa-sm row q-col-gutter-xs">
        <div v-for="obj in store.humptys.form" :key="obj.kode" class="col-12">
          <div class="row">
            <div class="col-3">
              {{ obj?.label }} :
            </div>
            <div class="col-9 q-gutter-sm">
              <q-radio
                v-for="(item, i) in obj?.categories" :key="i" dense size="sm" v-model="store.formHumpty[obj.kode]" :val="item" :label="`${item?.label}`"
                @update:model-value="store.hitungSkorHumpty"
              />
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
      </q-card-section>
    </q-card>

    <!-- <q-card flat bordered class="col-12">
      <q-card-section class="q-pa-sm bg-grey-4">
        <strong> {{ 'Resiko Jatuh Humpty Dumpty Fall Scale ( < 14 tahun) ' }}</strong>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pa-sm row q-col-gutter-xs">
        <div class="col-12">
          <div class="row">
            <div class="col-2">
              Usia :
            </div>
            <div class="col-10 q-gutter-sm">
              <q-radio
                v-for="n in store.humpty?.usia" :key="n.value" dense size="sm" v-model="store.formHumpty.usia" :val="n" :label="n.label"
                @update:model-value="store.hitungSkorHumpty()"
              />
            </div>
          </div>
          <q-separator class="q-my-sm" />
          <div class="row">
            <div class="col-2">
              Kelamin :
            </div>
            <div class="col-10 q-gutter-sm">
              <q-radio
                v-for="n in store.humpty?.kelamin" :key="n.value" dense size="sm" v-model="store.formHumpty.kelamin" :val="n" :label="n.label"
                @update:model-value="store.hitungSkorHumpty()"
              />
            </div>
          </div>
          <q-separator class="q-my-sm" />
          <div class="row">
            <div class="col-2">
              Diagnosis :
            </div>
            <div class="col-10 q-gutter-sm">
              <q-radio
                v-for="n in store.humpty?.diagnosis" :key="n.value" dense size="sm" v-model="store.formHumpty.diagnosis" :val="n" :label="n.label"
                @update:model-value="store.hitungSkorHumpty()"
              />
            </div>
          </div>
          <q-separator class="q-my-sm" />
          <div class="row">
            <div class="col-3">
              Gangguan Kognitif :
            </div>
            <div class="col-9 q-gutter-sm">
              <q-radio
                v-for="n in store.humpty?.kognitif" :key="n.value" dense size="sm" v-model="store.formHumpty.kognitif" :val="n" :label="n.label"
                @update:model-value="store.hitungSkorHumpty()"
              />
            </div>
          </div>
          <q-separator class="q-my-sm" />
          <div class="row">
            <div class="col-3">
              Faktor Lingkungan :
            </div>
            <div class="col-9 q-gutter-sm">
              <q-radio
                v-for="n in store.humpty?.lingkungan" :key="n.value" dense size="sm" v-model="store.formHumpty.lingkungan" :val="n" :label="n.label"
                @update:model-value="store.hitungSkorHumpty()"
              />
            </div>
          </div>
          <q-separator class="q-my-sm" />
          <div class="row">
            <div class="col-3">
              Respon Pada Pembedahan/ Sedasi/Anastesi :
            </div>
            <div class="col-9 q-gutter-sm">
              <q-radio
                v-for="n in store.humpty?.responBedah" :key="n.value" dense size="sm" v-model="store.formHumpty.responBedah" :val="n" :label="n.label"
                @update:model-value="store.hitungSkorHumpty()"
              />
            </div>
          </div>
          <q-separator class="q-my-sm" />
          <div class="row">
            <div class="col-2">
              Pengobatan :
            </div>
            <div class="col-10 q-gutter-sm">
              <q-radio
                v-for="n in store.humpty?.pengobatan" :key="n.value" dense size="sm" v-model="store.formHumpty.pengobatan" :val="n" :label="n.label"
                @update:model-value="store.hitungSkorHumpty()"
              />
            </div>
          </div>
          <q-separator class="q-my-sm" />
          <div class="full-width flex justify-end q-gutter-sm f-14 text-accent">
            <div>NILAI SKOR : {{ store.formHumpty.skorHumpty?.skor }} </div>
            <div>KET : {{ store.formHumpty.skorHumpty?.label }}</div>
          </div>
        </div>
      </q-card-section>
    </q-card> -->

    <!-- Resiko Jatuh Morse Fall Scale (14 - 59 tahun) -->
    <q-card v-if="store?.morses?.grupings?.includes(jnsKasusKep)" flat bordered class="col-12">
      <q-card-section class="q-pa-sm bg-grey-4">
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
      </q-card-section>
    </q-card>

    <!-- Resiko Jatuh Ontario / Sidney Scoring (geriatric dg usia >=60 tahun) -->
    <q-card v-if="store?.ontarios?.grupings?.includes(jnsKasusKep)" flat bordered class="col-12">
      <q-card-section class="q-pa-sm bg-grey-4">
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
    </q-card>
  </div>
</template>

<script setup>
import { usePenilaianRanapStore } from 'src/stores/simrs/ranap/penilaian.js'
import { computed, onMounted } from 'vue'
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  kasus: {
    type: Object,
    default: null
  }
})

const jnsKasusKep = computed(() => {
  if (props.kasus) {
    return props.kasus?.gruping
  }
  return null
})

onMounted(async () => {
  const ageInMonths = store.calculateAgeInMonths(props?.pasien?.tgllahir ?? null)

  console.log('usia', ageInMonths / 12)
  console.log('store', store.barthels)
  console.log('kasus', jnsKasusKep.value)

  // console.log('pasien', props?.pasien)
  await store.getMaster()
    .then(() => {
      store.initReset(props?.pasien)
    })
  // console.log('form', store.form)
})

// eslint-disable-next-line no-unused-vars
const store = usePenilaianRanapStore()

</script>

<template>
  <div class="row q-col-gutter-xs full-width">
    <q-card flat bordered class="col-12">
      <q-card-section class="q-pa-sm bg-grey-4">
        <strong>Pemeriksaan Umum</strong>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pa-sm row q-col-gutter-xs">
        <q-select
          v-model="store.form.keadaanUmum"
          dense
          standout="bg-yellow-3 text-black"
          outlined
          label="Tingkat Kesadaran"
          :options="store.keadaanUmums"
          class="col-4"
          input-class="ellipsis"
          fill-input
          hide-dropdown-icon
          :rules="[val => !!val || 'Harap diisi']"
          hide-bottom-space
        />
        <app-input-simrs label="BB (kg)" class-tambahan="col-2" v-model="store.form.bb" :valid="{ number: true }" :lazy-rules="false" />
        <app-input-simrs label="TB (cm)" class="col-2" v-model="store.form.tb" :valid="{ number: true }" />
        <app-input-simrs label="N (x/mnt)" class="col-2" v-model="store.form.nadi" :valid="{ number: true }" :lazy-rules="true" />
        <app-input-simrs label="Sis (mmHg)" class="col-2" v-model="store.form.sistole" :valid="{ number: true }" :lazy-rules="true" />
        <app-input-simrs label="Dia (mmHg)" class="col-2" v-model="store.form.diastole" :valid="{ number: true }" :lazy-rules="true" />
        <app-input-simrs label="RR (x/mnt)" class="col-2" v-model="store.form.pernapasan" :valid="{ number: true }" :lazy-rules="true" />
        <q-select
          v-model="store.form.tkKesadaran"
          dense
          standout="bg-yellow-3 text-black"
          outlined
          label="Tingkat Kesadaran"
          :options="store.optionsTingkatkesadaran"
          emit-value
          map-options
          input-class="ellipsis"
          fill-input
          hide-bottom-space
          class="col-8"
        />
      </q-card-section>
    </q-card>

    <!-- psikologis , ekonomi, spiritual -->
    <q-card flat bordered class="col-12">
      <q-card-section class="q-pa-sm bg-grey-4">
        <strong>Pemeriksaan Psikologis, Sosial Ekonomi, Spiritual</strong>
      </q-card-section>
      <q-card-section class="row q-pa-sm q-col-gutter-xs">
        <q-input
          v-model="store.form.sosial"
          outlined
          autogrow
          stack-label
          standout="bg-yellow-3"
          label="Sosial"
          hide-bottom-space
          style="width:50%"
        />
        <q-input
          v-model="store.form.spiritual"
          outlined
          autogrow
          stack-label
          standout="bg-yellow-3"
          label="Spiritual"
          hide-bottom-space
          style="width:50%"
        />
        <q-select
          v-model="store.form.statusPsikologis"
          dense
          standout="bg-yellow-3 text-black"
          outlined
          label="Status Psikologis"
          :options="store.statusPsikologis"
          stack-label
          emit-value
          map-options
          input-class="ellipsis"
          fill-input
          hide-bottom-space
          class="col-6"
        />
        <q-select
          v-model="store.form.ansuransi"
          dense
          standout="bg-yellow-3 text-black"
          outlined
          label="Ekonomi, Punya Ansuransi ?"
          :options="store.adaTidaks"
          emit-value
          map-options
          input-class="ellipsis"
          fill-input
          hide-bottom-space
          class="col-6"
        />
        <q-list dense flat bordered separator class="col-12 q-mt-xs">
          <q-item v-for="item in store.form.edukasi" :key="item">
            <q-item-section>
              <q-item-label>{{ item?.label }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <div class="flex q-gutter-sm">
                <q-radio dense v-for="n in store.yaTidaks" :key="n" v-model="item.value" :val="n" :label="n" />
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <!-- kultural -->
    <q-card flat bordered class="col-12">
      <q-card-section class="q-pa-sm bg-grey-4">
        <strong>Kultural</strong>
      </q-card-section>
      <q-card-section class="row q-pa-sm q-col-gutter-xs">
        <q-select
          v-model="store.form.penyebabSakit"
          dense
          standout="bg-yellow-3 text-black"
          outlined
          label="Penyebab Penyakit"
          :options="store.penyebabs"
          emit-value
          map-options
          input-class="ellipsis"
          fill-input
          hide-bottom-space
          class="col-6"
        />
        <q-select
          v-model="store.form.komunikasi"
          dense
          standout="bg-yellow-3 text-black"
          outlined
          label="Pola Komunikasi"
          :options="store.komunikasi"
          stack-label
          emit-value
          map-options
          input-class="ellipsis"
          fill-input
          hide-bottom-space
          class="col-6"
        />
        <div class="col-6">
          <div class="col-6 flex q-gutter-sm q-my-xs">
            <div>Makanan Pokok : </div>
            <q-radio dense v-for="m in store.makanans" :val="m" :label="m" v-model="store.form.makananPokok" />
          </div>
          <app-input-simrs v-if="store.form.makananPokok==='Selain Nasi'" label="Selain Nasi" class="full-width" v-model="store.form.makananPokokLain" />
        </div>
        <app-input-simrs class="col-6" label="Pantangan Makanan" v-model="store.form.pantanganMkanan" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { usePemeriksaanUmumRanapStore } from 'src/stores/simrs/ranap/pemeriksaanumum'
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const store = usePemeriksaanUmumRanapStore()
</script>

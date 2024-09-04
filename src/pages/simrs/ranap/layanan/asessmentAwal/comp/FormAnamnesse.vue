<template>
  <div class="row q-col-gutter-md">
    <q-input
      v-model="store.form.keluhanUtama"
      outlined
      autogrow
      stack-label
      standout="bg-yellow-3"
      label="Keluhan Utama"
      :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
      hide-bottom-space
      style="width:50%"
    />
    <q-input
      v-model="store.form.rwPenySkr"
      outlined
      autogrow
      stack-label
      standout="bg-yellow-3"
      label="Riwayat Penyakit Sekarang"
      hide-bottom-space
      style="width:50%"
    />
    <q-input
      v-model="store.form.rwPenyDhl"
      outlined
      autogrow
      stack-label
      standout="bg-yellow-3"
      label="Riwayat Penyakit Dahulu"
      hide-bottom-space
      style="width:50%"
    />
    <q-input
      v-model="store.form.rwPenyKlrg"
      outlined
      autogrow
      stack-label
      standout="bg-yellow-3"
      label="Riwayat Penyakit Keluarga"
      hide-bottom-space
      style="width:50%"
    />
    <q-input
      v-model="store.form.rwPengobatan"
      outlined
      autogrow
      stack-label
      standout="bg-yellow-3"
      label="Riwayat Pengobatan"
      hide-bottom-space
      style="width:50%"
    />
    <q-input
      v-model="store.form.rwPkrjDgZatBahaya"
      outlined
      autogrow
      stack-label
      standout="bg-yellow-3"
      label="Riwayat Pekerjaan yg berhubung dg Zat berbahaya"
      hide-bottom-space
      style="width:50%"
    />

    <div class="col-6">
      <div class="text-weight-bold">
        Riwayat Alergi
      </div>
      <div class="text-grey-8 f-10">
        Riwayat alergi yang pernah dialami
        oleh pasien
      </div>
      <q-separator class="q-my-sm" />
      <q-checkbox
        v-for="(al, i) in store.alergis"
        :key="i"
        v-model="store.form.rwAlergi"
        :val="al"
        :label="al"
        color="primary"
      />
      <q-input
        v-model="store.form.ketRwAlergi"
        outlined
        label="Keterangan Alergi"
        standout="bg-yellow-3"
        autogrow
      />
      <q-separator class="q-my-xs" />
      <div class="col-6">
        <div class="text-weight-bold">
          Keluhan Nyeri  :
          <span class="q-ml-sm">
            <q-icon
              size="lg"
              color="teal"
              :name="iconNyeri"
            />
          </span>
          <em class="text-primary q-ml-sm">{{ store.form.keluhanNyeri }}</em>
        </div>
        <q-separator class="q-my-xs" />
        <q-slider
          v-model="store.form.skorNyeri"
          color="primary"
          thumb-color="primary"
          label-color="primary"
          label-text-color="yellow"
          markers
          :marker-labels="(val)=> fnMarkerLabel"
          marker-labels-class="text-primary"
          label-always
          switch-label-side
          :min="0"
          :max="10"
          @update:model-value="store.setKeteranganSkornyeri"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAsesmentAwalKeperawatanRanapStore } from 'src/stores/simrs/ranap/asesmentAwalKeperawatan'
import { computed } from 'vue'
const store = useAsesmentAwalKeperawatanRanapStore()

const iconNyeri = computed(() => {
  const val = store?.form.skorNyeri
  let icon = 'icon-my-emoticon-excited-outline'
  if (val < 2) {
    icon = 'icon-my-emoticon-excited-outline'
  }
  else if (val >= 2 && val < 4) {
    icon = 'icon-my-emoticon-outline'
  }
  else if (val >= 4 && val < 6) {
    icon = 'icon-my-emoticon-neutral-outline'
  }
  else if (val >= 6 && val < 8) {
    icon = 'icon-my-emoticon-confused-outline'
  }
  else if (val >= 8 && val < 10) {
    icon = 'icon-my-emoticon-angry-outline'
  }
  else if (val === 10) {
    icon = 'icon-my-emoticon-cry-outline'
  }

  return icon
})
</script>

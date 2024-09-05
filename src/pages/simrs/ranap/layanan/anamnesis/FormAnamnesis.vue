<template>
  <div class="row q-col-gutter-md">
    <q-input
      ref="refInputKu"
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

    <div class="col-12">
      <!-- RIWAYAT ALERGI -->
      <q-card flat bordered class="q-mb-sm">
        <q-card-section>
          <div class="text-weight-bold">
            Riwayat Alergi
          </div>
          <div class="text-grey-8 f-10">
            Riwayat alergi yang pernah dialami
            oleh pasien
          </div>
          <q-separator class="q-my-sm" />
          <div class="flex q-gutter-sm q-mb-sm">
            <q-checkbox
              dense
              v-for="(al, i) in store.alergis"
              :key="i"
              v-model="store.form.rwAlergi"
              :val="al"
              :label="al"
              color="primary"
            />
          </div>
          <q-input
            v-model="store.form.ketRwAlergi"
            outlined
            label="Keterangan Alergi"
            standout="bg-yellow-3"
            autogrow
            style="width: 70%;"
          />
        </q-card-section>
      </q-card>

      <!-- KAJIAN NYERI -->
      <q-card flat bordered class="q-mb-sm">
        <q-card-section class="q-py-xs q-px-md">
          <div class="flex q-gutter-xs items-center">
            <div class="text-weight-bold">
              Kajian Nyeri
            </div>
            <q-radio v-model="store.form.kajianNyeri" v-for="dd in store.pilihanNyeris" :key="dd" :label="dd?.text" :val="dd.text" />
          </div>
          <!-- <div class="text-grey-8 f-10">
            Pilih Kajian Nyeri Pasien diatas
          </div> -->
          <q-separator />
        </q-card-section>
        <q-card-section>
          <div v-if="store.form.kajianNyeri==='Wong Baker Face Scale'">
            <div class="">
              Keluhan Nyeri (Wong Baker Face Scale) :
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
              style="width: 70%;"
            />
          </div>
          <div v-else>
            <div class="">
              Behavioral Pain Scale (BPS)
            </div>
            <q-separator class="q-my-xs" />
            <div class="text-weight-bold">
              Ekspresi Wajah :
            </div>
            <q-separator class="q-my-xs" />
            <div class="flex q-gutter-sm items-center">
              <q-radio dense size="sm" v-model="store.form.ekspresiWajah" v-for="aa in store.ekspresiWajah" :key="aa" :label="aa?.text" :val="aa?.value" @update:model-value="(val)=> store.form.ekspresiWajahKet = aa?.text" />
            </div>
            <q-separator class="q-my-xs" />
            <div class="text-weight-bold">
              Gerakan Tangan :
            </div>
            <q-separator class="q-my-xs" />
            <div class="flex q-gutter-sm items-center">
              <q-radio dense size="sm" v-model="store.form.gerakanTangan" v-for="aa in store.gerakanTangan" :key="aa" :label="aa?.text" :val="aa?.value" @update:model-value="(val)=> store.form.gerakanTanganKet = aa?.text" />
            </div>
            <q-separator class="q-my-xs" />
            <div class="text-weight-bold">
              Kepatuhan terhadap ventilasi mekanik :
            </div>
            <q-separator class="q-my-xs" />
            <div class="flex q-gutter-sm items-center">
              <q-radio dense size="sm" v-model="store.form.kebutuhanVentilasi" v-for="aa in store.kebutuhanVentilasi" :key="aa" :label="aa?.text" :val="aa?.value" @update:model-value="(val)=> store.form.kebutuhanVentilasiKet = aa?.text" />
            </div>
          </div>
        </q-card-section>
      </q-card>

      <div class="skreening-gizi-dewasa">
        <q-card flat bordered>
          <q-card-section class="q-py-sm q-px-md">
            <div>
              <strong>Skreening Gizi (Dewasa)</strong>
            </div>
            <q-separator />
          </q-card-section>
          <q-card-section class="row">
            <div class="col-9">
              Apakah Ada Penurunan Berat badan yang tidak diinginkan selama 6 Bulan terakhir ?
            </div>
            <div class="col-3 flex q-gutter-sm">
              <q-radio dense v-model="store.form.sgd.bb" :val="2" label="Iya" @update:model-value="hitungSkorGizi" />
              <q-radio dense v-model="store.form.sgd.bb" :val="0" label="Tidak" @update:model-value="hitungSkorGizi" />
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section class="row">
            <div class="col-9">
              Apakah Asupan Makan berkurang karena tidak nafsu makan ?
            </div>
            <div class="col-3 flex q-gutter-sm">
              <q-radio dense v-model="store.form.sgd.am" :val="1" label="Iya" @update:model-value="hitungSkorGizi" />
              <q-radio dense v-model="store.form.sgd.am" :val="0" label="Tidak" @update:model-value="hitungSkorGizi" />
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section class="row">
            <div class="col-9">
              Apakah pasien memiliki diagnosa khusus / kondisi khusus ?
            </div>
            <div class="col-3 flex q-gutter-sm">
              <q-radio dense v-model="store.form.sgd.kk" :val="2" label="Iya" @update:model-value="hitungSkorGizi" />
              <q-radio dense v-model="store.form.sgd.kk" :val="0" label="Tidak" @update:model-value="hitungSkorGizi" />
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="flex items-center q-gutter-sm justify-end text-primary">
              <div><strong>SKOR : {{ store.form.sgdSkor }}</strong> => </div>
              <div><strong>{{ store.form.sgdKet }}</strong></div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- {{ store.form.ekspresiWajahKet }} -->
    </div>
  </div>
</template>

<script setup>
import { useAnamnesisRanapStore } from 'src/stores/simrs/ranap/anamnesis'
import { computed, onMounted, ref } from 'vue'

const store = useAnamnesisRanapStore()
const refInputKu = ref(null)
defineExpose({
  refInputKu
})

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

onMounted(() => {
  store.initReset()
})

const hitungSkorGizi = () => {
  store.hitungSkorSgd()
}
</script>

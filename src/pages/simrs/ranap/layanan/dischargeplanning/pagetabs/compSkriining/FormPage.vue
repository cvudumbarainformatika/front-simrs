<template>
  <q-form @submit="onSubmit" class="column fit">
    <div class="col-auto q-pa-lg">
      <div class="f-14 text-bold">
        SKRINING FAKTOR RESIKO PASIEN PULANG
      </div>
      <div>diisi mulai pasien MRS sampai dengan pasien akan KRS</div>
      <q-separator class="q-mt-md" />
    </div>
    <div class="col full-height q-px-lg scroll">
      <div class="row">
        <div class="col-7">
          Apakah pasien tinggal sendiri
        </div>
        <div class="col-5">
          <div class="flex items-center q-gutter-sm">
            <q-radio v-for="(item, i) in store.yaTidaks" :key="i" v-model="store.form.rs4" :val="item" :label="item" size="sm" dense />
          </div>
        </div>
      </div>
      <q-separator class="q-my-xs" />
      <div class="row">
        <div class="col-7">
          Apakah pasien tinggal bersama keluarga
        </div>
        <div class="col-5">
          <div class="flex items-center q-gutter-sm">
            <q-radio v-for="(item, i) in store.yaTidaks" :key="i" v-model="store.form.rs5" :val="item" :label="item" size="sm" dense />
          </div>
          <app-input-simrs v-if="store.form.rs5 === 'Ya'" v-model="store.form.rs5ket" label="Sebutkan Jika Ya " class="q-mt-sm" />
        </div>
      </div>
      <q-separator class="q-my-xs" />

      <div class="row ">
        <div class="col-7">
          Apakah pasien khawatir jika pulang ke rumah
        </div>
        <div class="col-5">
          <div class="flex items-center q-gutter-sm">
            <q-radio v-for="(item, i) in store.yaTidaks" :key="i" v-model="store.form.rs6" :val="item" :label="item" size="sm" dense />
          </div>
        <!-- <app-input-simrs v-if="store.form.rs5 === 'Ya'" v-model="store.form.rs5ket" label="Sebutkan Jika Ya " class="q-mt-sm" /> -->
        </div>
      </div>
      <q-separator class="q-my-xs" />

      <div class="row">
        <div class="col-7">
          Apakah saat di rumah pasien ada yang merawat
        </div>
        <div class="col-5">
          <div class="flex items-center q-gutter-sm">
            <q-radio v-for="(item, i) in store.yaTidaks" :key="i" v-model="store.form.rs7" :val="item" :label="item" size="sm" dense />
          </div>
        <!-- <app-input-simrs v-if="store.form.rs5 === 'Ya'" v-model="store.form.rs5ket" label="Sebutkan Jika Ya " class="q-mt-sm" /> -->
        </div>
      </div>
      <q-separator class="q-my-xs" />
      <div class="row">
        <div class="col-7">
          Bagaimana jenis tempat tinggal pasien
        </div>
        <div class="col-5">
          <q-select
            v-model="store.form.rs8"
            dense
            standout="bg-yellow-3 text-black"
            outlined
            label="Tempat Tinggal"
            :options="['Rumah milik sendiri', 'Menumpang', 'Kost/Kontrakan']"
            emit-value
            map-options
            input-class="ellipsis"
            fill-input
            hide-bottom-space
          />
        </div>
      </div>
      <q-separator class="q-my-xs" />

      <div class="row">
        <div class="col-7">
          Apakah tempat tinggal pasien ada tetangga
        </div>
        <div class="col-5">
          <div class="flex items-center q-gutter-sm">
            <q-radio v-for="(item, i) in store.yaTidaks" :key="i" v-model="store.form.rs9" :val="item" :label="item" size="sm" dense />
          </div>
        <!-- <app-input-simrs v-if="store.form.rs5 === 'Ya'" v-model="store.form.rs5ket" label="Sebutkan Jika Ya " class="q-mt-sm" /> -->
        </div>
      </div>
      <q-separator class="q-my-xs" />

      <div class="row">
        <div class="col-7">
          Apakah pasien mempunyai tanggung jawab menafkahi keluarga/saudara
        </div>
        <div class="col-5">
          <div class="flex items-center q-gutter-sm">
            <q-radio v-for="(item, i) in store.yaTidaks" :key="i" v-model="store.form.rs10" :val="item" :label="item" size="sm" dense />
          </div>
        <!-- <app-input-simrs v-if="store.form.rs5 === 'Ya'" v-model="store.form.rs5ket" label="Sebutkan Jika Ya " class="q-mt-sm" /> -->
        </div>
      </div>
      <q-separator class="q-my-xs" />

      <div class="row">
        <div class="col-7">
          Apakah pasien mempunyai tanggung jawab memelihara hewan peliharaan
        </div>
        <div class="col-5">
          <div class="flex items-center q-gutter-sm">
            <q-radio v-for="(item, i) in store.yaTidaks" :key="i" v-model="store.form.rs11" :val="item" :label="item" size="sm" dense />
          </div>
        <!-- <app-input-simrs v-if="store.form.rs5 === 'Ya'" v-model="store.form.rs5ket" label="Sebutkan Jika Ya " class="q-mt-sm" /> -->
        </div>
      </div>
      <q-separator class="q-my-xs" />

      <div class="row">
        <div class="col-7">
          Apakah ketika pulang, masih ada perawatan lanjutan yang harus dilakukan
        </div>
        <div class="col-5">
          <div class="flex items-center q-gutter-sm">
            <q-radio v-for="(item, i) in store.yaTidaks" :key="i" v-model="store.form.rs12" :val="item" :label="item" size="sm" dense />
          </div>
        <!-- <app-input-simrs v-if="store.form.rs5 === 'Ya'" v-model="store.form.rs5ket" label="Sebutkan Jika Ya " class="q-mt-sm" /> -->
        </div>
      </div>
      <q-separator class="q-my-xs" />

      <div class="row">
        <div class="col-7">
          Apakah ketika pulang, pasien harus kontrol ke lebih dari 2 dokter
        </div>
        <div class="col-5">
          <div class="flex items-center q-gutter-sm">
            <q-radio v-for="(item, i) in store.yaTidaks" :key="i" v-model="store.form.rs13" :val="item" :label="item" size="sm" dense />
          </div>
        <!-- <app-input-simrs v-if="store.form.rs5 === 'Ya'" v-model="store.form.rs5ket" label="Sebutkan Jika Ya " class="q-mt-sm" /> -->
        </div>
      </div>
      <q-separator class="q-my-xs" />

      <div class="row">
        <div class="col-7">
          Apakah pasien pulang dengan membawa obat lebih dari 6 jenis obat
        </div>
        <div class="col-5">
          <div class="flex items-center q-gutter-sm">
            <q-radio v-for="(item, i) in store.yaTidaks" :key="i" v-model="store.form.rs14" :val="item" :label="item" size="sm" dense />
          </div>
        <!-- <app-input-simrs v-if="store.form.rs5 === 'Ya'" v-model="store.form.rs5ket" label="Sebutkan Jika Ya " class="q-mt-sm" /> -->
        </div>
      </div>
      <q-separator class="q-my-xs" />

      <div class="row">
        <div class="col-7">
          Apakah pasien mengajukan permohonan untuk pendamping (care giver) dari rumah sakit
        </div>
        <div class="col-5">
          <div class="flex items-center q-gutter-sm">
            <q-radio v-for="(item, i) in store.yaTidaks" :key="i" v-model="store.form.rs15" :val="item" :label="item" size="sm" dense />
          </div>
        <!-- <app-input-simrs v-if="store.form.rs5 === 'Ya'" v-model="store.form.rs5ket" label="Sebutkan Jika Ya " class="q-mt-sm" /> -->
        </div>
      </div>
      <q-separator class="q-my-xs" />

      <div class="row">
        <div class="col-7">
          Apakah pasien memiliki transportasi untuk pulang
        </div>
        <div class="col-5">
          <div class="flex items-center q-gutter-sm">
            <q-radio v-for="(item, i) in store.yaTidaks" :key="i" v-model="store.form.rs22" :val="item" :label="item" size="sm" dense />
          </div>
        <!-- <app-input-simrs v-if="store.form.rs5 === 'Ya'" v-model="store.form.rs5ket" label="Sebutkan Jika Ya " class="q-mt-sm" /> -->
        </div>
      </div>
      <q-separator class="q-my-xs" />

      <div class="row">
        <div class="col-7">
          Apakah pasien memerlukan alat bantu
        </div>
        <div class="col-5">
          <div class="flex items-center q-gutter-sm">
            <q-radio v-for="(item, i) in store.yaTidaks" :key="i" v-model="store.form.rs16" :val="item" :label="item" size="sm" dense />
          </div>
          <app-input-simrs v-if="store.form.rs16 === 'Ya'" v-model="store.form.rs16Ket" label="Sebutkan Jika Ya " class="q-mt-sm" />
        </div>
      </div>
      <q-separator class="q-my-xs" />

      <div class="row ">
        <div class="col-7">
          Apakah pasien memerlukan pemantauan minum obat
        </div>
        <div class="col-5">
          <div class="flex items-center q-gutter-sm">
            <q-radio v-for="(item, i) in store.yaTidaks" :key="i" v-model="store.form.rs17" :val="item" :label="item" size="sm" dense />
          </div>
        <!-- <app-input-simrs v-if="store.form.rs16 === 'Ya'" v-model="store.form.rs16ket" label="Sebutkan Jika Ya " class="q-mt-sm" /> -->
        </div>
      </div>
      <q-separator class="q-my-xs" />

      <div class="row">
        <div class="col-7">
          Apakah pasien memerlukan pemantauan diet/makanan
        </div>
        <div class="col-5">
          <div class="flex items-center q-gutter-sm">
            <q-radio v-for="(item, i) in store.yaTidaks" :key="i" v-model="store.form.rs18" :val="item" :label="item" size="sm" dense />
          </div>
          <app-input-simrs v-if="store.form.rs18 === 'Ya'" v-model="store.form.rs18Ket" label="Sebutkan Jika Ya " class="q-mt-sm" />
        </div>
      </div>
      <q-separator class="q-my-xs" />

      <div class="row ">
        <div class="col-7">
          Apakah pasien memerlukan latihan fisik
        </div>
        <div class="col-5">
          <div class="flex items-center q-gutter-sm">
            <q-radio v-for="(item, i) in store.yaTidaks" :key="i" v-model="store.form.rs19" :val="item" :label="item" size="sm" dense />
          </div>
        <!-- <app-input-simrs v-if="store.form.rs18 === 'Ya'" v-model="store.form.rs18ket" label="Sebutkan Jika Ya " class="q-mt-sm" /> -->
        </div>
      </div>
      <q-separator class="q-my-xs" />
      <div class="text-bold">
        Perkiraan lama rawat
      </div>
      <q-separator class="q-my-xs" />
      <div class="row items-center q-col-gutter-sm">
        <div class="col-4">
          Bisa dipastikan
        </div>
        <div class="col-4">
          <app-input-date
            :model="store.form.tglRencanaPulang"
            label=""
            outlined
            valid
            @set-model="val=>store.form.tglRencanaPulang=val"
          />
        </div>
        <div class="col-4">
          <app-input-simrs v-model="store.form.rs20" label="Berapa hari Rawat " class="q-mt-sm" :valid="{ required: true}" />
        </div>
      </div>
      <q-separator class="q-my-xs" />
      <div class="row items-center q-col-gutter-sm">
        <div class="col-4">
          Belum Bisa dipastikan
        </div>

        <div class="col-8">
          <app-input-simrs v-model="store.form.rs21" label="Alasan" class="q-mt-sm" />
        </div>
      </div>

      <q-separator class="q-my-lg" />
    </div>

    <div class="col-auto row q-pa-md flex justify-end bg-dark">
      <q-btn :loading="store.loadingOrder" :disable="store.loadingOrder" label="Simpan" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script setup>
import { useSkriiningDischargePlanningRanapStore } from 'src/stores/simrs/ranap/skriingdischargeplanning'
import { onMounted } from 'vue'

const store = useSkriiningDischargePlanningRanapStore()

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  menu: {
    type: Object,
    default: null
  }
})

onMounted(() => {
  Promise.all([
    // store.getmasterprognosis(),
    store.initReset()
  ])
})

const onSubmit = () => {
  // console.log('simpan')
  store.simpandata(props?.pasien)
}
</script>

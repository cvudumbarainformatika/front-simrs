<template>
  <div class="q-pa-sm">
    <div class="row items-center q-col-gutter-sm">
      <div class="col-3">
        <app-autocomplete-new
          :model="store.formPeg.id_kategory"
          label="kategori "
          autocomplete="nama"
          option-label="nama"
          option-value="id"
          outlined
          :source="store.filteredKatogories"
          @on-select="store.setFormPeg('id_kategory',$event)"
          @clear="store.setFormPeg('id_kategory',1)"
        />
      </div>
      <div class="col-4">
        <app-autocomplete-new
          :model="store.formPeg.id_peg"
          label="Pegawai"
          autocomplete="nama"
          option-label="nama"
          option-value="id"
          outlined
          valid
          :source="store.pegawaies"
          :loading="store.loadingPeg"
          @on-select="store.setFormPeg('id_peg',$event)"
          @on-enter="store.cariPeg($event)"
          @clear="store.setFormPeg('id_peg','')"
        />
      </div>
    </div>
    <div class="row q-my-sm">
      <q-option-group
        v-model="store.formPeg.hari"
        :options="store.haries"
        color="primary"
        class="q-ml-sm"
        dense
        type="checkbox"
        inline
      />
    </div>
    <div class="row q-my-sm q-col-gutter-sm">
      <app-input-date
        :model="store.formPeg.masuk"
        label="Masuk"
        :type-date="false"
        outlined
        @set-model="store.setFormPeg('masuk',$event)"
      />
      <app-input-date
        :model="store.formPeg.pulang"
        label="Pulang"
        :type-date="false"
        outlined
        @set-model="store.setFormPeg('pulang',$event)"
      />
      <div>
        <q-btn
          class="q-mr-md"
          dense
          label="Simpan"
          color="primary"
          no-caps
          :loading="store.loadingSimpan"
          :disable="store.loadingSimpan"
          @click="store.simpanPerubahanJadwal"
        >
          <q-tooltip
            class="primary"
            :offset="[10, 10]"
          >
            Simpan
          </q-tooltip>
        </q-btn>
      </div>
    </div>
    <q-separator />
    <div class="row justify-end q-mr-sm q-my-sm">
      <q-btn
        unelevated
        round
        color="deep-orange"
        size="sm"
        icon="icon-mat-refresh"
        @click="store.getDataJadwal()"
      >
        <q-tooltip
          class="primary"
          :offset="[10, 10]"
        >
          Ambil data jadwal pegawai
        </q-tooltip>
      </q-btn>
    </div>
    <q-card flat>
      <q-card-section v-if="store.loadingJadwal">
        <app-loading />
      </q-card-section>
      <q-card-section v-if="!store.loadingJadwal && !store.jadwalPegawaies?.length">
        <app-no-data />
      </q-card-section>
      <q-card-section v-if="!store.loadingJadwal && store.jadwalPegawaies?.length">
        <div class="row text-weight-bold">
          <div
            class="col-auto"
            style="width: 5%;"
          >
            No
          </div>
          <div
            class="col-3"
          >
            Nama
          </div>
          <div
            class="col-2"
          >
            Hari
          </div>
          <div
            class="col-2"
          >
            Masuk
          </div>
          <div
            class="col-2"
          >
            Pulang
          </div>
        </div>
        <div
          v-for="(item,i) in store.jadwalPegawaies"
          :key="i"
          class="row"
        >
          <div
            class="col-auto"
            style="width: 5%;"
          >
            {{ i+1 }}
          </div>
          <div
            class="col-3"
          >
            {{ item?.pegawai?.nama??'-' }}
          </div>
          <div
            class="col-2"
          >
            {{ item?.hari??'-' }}
          </div>
          <div
            class="col-2"
          >
            {{ item?.masuk??'-' }}
          </div>
          <div
            class="col-2"
          >
            {{ item?.pulang??'-' }}
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>

import { onMounted, onUnmounted } from 'vue'
import { useKategoriJadwalStore } from 'src/stores/simrs/pegawai/master/kategori/kategori'

const store = useKategoriJadwalStore()
onMounted(() => {
  store.getDataPegawai()
  store.getDataKetegory()
  store.getDataHari()
  store.getDataJadwal()
})
onUnmounted(() => {
  store.resetFormPeg()
})
</script>

<template>
  <!-- head -->
  <div
    class="fixed-top row no-wrap items-center justify-between q-mx-sm bg-white"
    style="z-index: 10;"
  >
    <div>
      <div class="row items-center">
        <div class="q-mr-md">
          No Permintaan:
        </div>
        <app-input
          v-model="store.form.nopermintaan"
          label="Nomor Permintaan"
          outlined
          readonly
          valid
          :loading="store.loading"
        />
        <div class="q-ml-md">
          <q-btn
            v-if="store.form.nopermintaan"
            flat
            icon="icon-mat-done"
            dense
            color="primary"
            :loading="store.loadingKunci"
            @click="store.selesaiDanKunci()"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Selesai dan Kunci Penerimaan
            </q-tooltip>
          </q-btn>
        </div>
      </div>
    </div>
    <div>
      <q-btn
        flat
        :icon="!style.componentfull ? 'icon-mat-open_in_full' : 'icon-mat-close_fullscreen'"
        round
        :color="style.componentfull ? 'green' : 'primary'"
        size="12px"
        class="q-ml-md"
        @click="style.setComponentFull"
      />
    </div>
  </div>
  <!-- Permintaan -->
  <div class="q-mt-lg q-py-md q-px-sm">
    <div class="row q-col-gutter-md items-center">
      <div class="col-6">
        <div class="row q-mb-xs">
          <div class="col-12">
            <app-input-date-human
              :model="store.disp.tanggal"
              label="Tanggal Transaksi"
              outlined
              @set-display="dispTanggal"
              @db-model="setTanggal"
            />
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="row no-wrap q-mb-xs">
          <div class="col-4">
            Penanggung Jawab
          </div>
          <div class="col-8 text-weight-bold">
            {{ user.nama }}
          </div>
        </div>
        <div class="row no-wrap q-mb-xs">
          <div class="col-4">
            Gudang Asal :
          </div>
          <div class="col-4 text-weight-bold">
            {{ store.disp.depo? store.disp.depo :'-' }}
          </div>
          <div class="col-4 text-cyan">
            ({{ store.form.depo ? store.form.depo :'-' }})
          </div>
        </div>
        <div class="row no-wrap q-mb-xs">
          <div class="col-4 ">
            Depo Tujuan :
          </div>
          <div class="col-4 text-weight-bold">
            {{ store.disp.depo? store.disp.depo :'-' }}
          </div>
          <div class="col-4 text-cyan">
            ({{ store.form.depo ? store.form.depo :'-' }})
          </div>
        </div>
      </div>
    </div>
    <div class="bg-grey-2">
      <!-- <div
        class="row bg-grey q-pa-sm"
      >
        <div class="f-14 text-weight-bold">
          Rincian Permintaan
        </div>
      </div> -->
      <div
        class="row bg-grey q-pa-xs q-mt-sm"
      >
        <div class="f-12 text-weight-bold">
          Rincian Permintaan Obat
        </div>
      </div>
      <div class="row q-my-sm q-col-gutter-md">
        <div class="col-6">
          <div class="row q-mb-xs">
            <div
              class="col-12"
            >
              <CompSelect
                ref="refGudang"
                :model="store.form.kdobat"
                autocomplete="nama_obat"
                option-label="nama_obat"
                option-value="kd_obat"
                label="Cari Obat"
                outlined
                :debounce="700"
                :source="store.obats"
                :loading="store.loadingObat"
                @on-select="store.obatSelected"
                @clear="store.clearObat"
                @buang="store.cariObat"
              />
            </div>
          </div>
          <div class="row q-mb-xs">
            <div class="col-12">
              <app-input
                ref="JumlahMinta"
                v-model="store.form.jumlahminta"
                label="Jumlah Minta"
                outlined
                :rules="[
                  val => !isNaN(val) || 'Harus pakai Nomor'
                ]"
              />
            </div>
          </div>
          <div class="row q-mb-xs q-ml-xs items-center">
            <div class="q-mr-sm">
              Status :
            </div>
            <div class="q-mr-sm">
              <q-radio
                v-model="store.form.konsinyasi"
                checked-icon="icon-mat-task_alt"
                unchecked-icon="icon-mat-panorama_fish_eye"
                val="non-konsinyasi"
                label="Non-Konsinyasi"
              />
            </div>
            <div class="q-mr-sm">
              <q-radio
                v-model="store.form.konsinyasi"
                checked-icon="icon-mat-task_alt"
                unchecked-icon="icon-mat-panorama_fish_eye"
                val="konsinyasi"
                label="Konsinyasi"
              />
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="row q-mb-xs">
            <div>Kode Barang</div>
            <div class="q-ml-sm">
              {{ store.form.kdobat ? store.form.kdobat:'-' }}
            </div>
          </div>
          <div class="row q-mb-xs">
            gudang asal
          </div>
          <div class="row q-mb-xs">
            Stok user
          </div>
          <div class="row q-mb-xs">
            Stok alokasi
          </div>
          <div class="row q-mb-xs">
            Max Stok
          </div>
        </div>
      </div>
      <div class="row q-my-sm q-mr-lg justify-end">
        <app-btn
          label="Simpan Rincian"
        />
      </div>
      <div
        class="row bg-grey q-pa-xs"
      >
        <div class="f-12 text-weight-bold">
          Rincian Permintaan Tersimpan
        </div>
      </div>
      <div class="row">
        anu
      </div>
    </div>
  </div>
</template>
<script setup>
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useStyledStore } from 'src/stores/app/styled'
import { useFarmasiPermintaanDepoStore } from 'src/stores/simrs/farmasi/permintaandepo/permintaandepo'
import { computed } from 'vue'

import CompSelect from './comp/CompSelect.vue'

const style = useStyledStore()
const store = useFarmasiPermintaanDepoStore()

function setTanggal (val) {
  store.setForm('tanggal', val)
}
function dispTanggal (val) {
  store.setDisp('tanggal', val)
}

const apps = useAplikasiStore()
const user = computed(() => {
  if (apps.user.pegawai) {
    if (apps.user.pegawai.depo) {
      store.setForm('depo', apps.user.pegawai.depo.kode)
      store.setDisp('depo', apps.user.pegawai.depo.nama)
    }
  }
  return apps.user
})
</script>

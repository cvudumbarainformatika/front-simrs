<template>
  <template v-if="store.datarka.length > 0">
    <q-card-section class="full-width">
      <div class="row q-py-md">
        <div class="full-width">
          <table class="full-width">
            <thead style="height: 35px;">
              <tr>
                <th style="width: 20%;">
                  Indikator
                </th>
                <th>
                  Tolak Ukur Kerja
                </th>
                <th style="width: 20%;">
                  Target Kinerja
                </th>
              </tr>
            </thead>
            <tbody style="height: 30px;">
              <tr>
                <td>
                  Capaian Kegiatan
                </td>
                <td>
                  {{ store.capaiankegiatan }}
                  <q-popup-edit
                    v-model="store.capaiankegiatan" v-slot="scope" @update:model-value="(val) => {
                      store.capaiankegiatan = val
                    }"
                  >
                    <q-input label="Silahkan di isi" v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                  </q-popup-edit>
                </td>
                <td class="text-right">
                  {{ store.targetcapaian }}
                  <q-popup-edit
                    v-model="store.targetcapaian" v-slot="scope" @update:model-value="(val) => {
                      store.targetcapaian = val
                    }"
                  >
                    <q-input label="Silahkan di isi" v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                  </q-popup-edit>
                </td>
              </tr>
              <tr>
                <td>
                  Masukan
                </td>
                <td>
                  {{ store.masukan }}
                  <q-popup-edit
                    v-model="store.masukan" v-slot="scope" @update:model-value="(val) => {
                      store.masukan = val
                    }"
                  >
                    <q-input label="Silahkan di isi" v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                  </q-popup-edit>
                </td>
                <td class="text-right">
                  {{ formatRpDouble(store.totalPagukegiatan[0].pagu) }}
                </td>
              </tr>
              <tr>
                <td>
                  Keluaran
                </td>
                <td>
                  {{ store.keluaran }}
                  <q-popup-edit
                    v-model="store.keluaran" v-slot="scope" @update:model-value="(val) => {
                      store.keluaran = val
                    }"
                  >
                    <q-input label="Silahkan di isi" v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                  </q-popup-edit>
                </td>
                <td class="text-right">
                  {{ store.targetkeluaran }}
                  <q-popup-edit
                    v-model="store.targetkeluaran" v-slot="scope" @update:model-value="(val) => {
                      store.targetkeluaran = val
                    }"
                  >
                    <q-input label="Silahkan di isi" v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                  </q-popup-edit>
                </td>
              </tr>
              <tr>
                <td>
                  Hasil
                </td>
                <td>
                  {{ store.hasil }}
                  <q-popup-edit
                    v-model="store.hasil" v-slot="scope" @update:model-value="(val) => {
                      store.hasil = val
                    }"
                  >
                    <q-input label="Silahkan di isi" v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                  </q-popup-edit>
                </td>
                <td class="text-right">
                  {{ store.targethasil }}
                  <q-popup-edit
                    v-model="store.targethasil" v-slot="scope" @update:model-value="(val) => {
                      store.targethasil = val
                    }"
                  >
                    <q-input label="Silahkan di isi" v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                  </q-popup-edit>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="row">
        <div class="full-width">
          <q-markup-table
            class="my-sticky-table"
            flat-bordered
            wrap-cells
            :separator="separator"
          >
            <thead>
              <tr class="bg-grey text-white max-width">
                <th>KODE REKENING</th>
                <th>URAIAN</th>
                <th>VOLUME</th>
                <th>SATUAN</th>
                <th>HARGA</th>
                <th>PAGU</th>
              </tr>
            </thead>
            <tbody>
              <tr class="vertical-top" v-for="it in store.datarka" :key="it">
                <td>
                  <div class="text-bold">
                    {{ it.kode }}
                  </div>
                  <div class="q-pl-md q-py-md" v-for="rinci in it?.rincian" :key="rinci">
                    {{ rinci.kode108 }}
                  </div>
                </td>
                <td>
                  <div class="text-bold">
                    {{ it.uraian }}
                  </div>
                  <div class="q-pl-md q-py-md" v-for="rinci in it?.rincian" :key="rinci">
                    - {{ rinci.usulan }}
                  </div>
                </td>
                <td class="text-right">
                  <div class="q-py-sm" />
                  <div class="q-pl-md q-py-md" v-for="rinci in it?.rincian" :key="rinci">
                    {{ rinci.volume }}
                  </div>
                </td>
                <td>
                  <div class="q-py-sm" />
                  <div class="q-pl-md q-py-md" v-for="rinci in it?.rincian" :key="rinci">
                    {{ rinci.satuan }}
                  </div>
                </td>
                <td class="text-right">
                  <div class="q-py-sm" />
                  <div class="q-pl-md q-py-md" v-for="rinci in it?.rincian" :key="rinci">
                    {{ formattanpaRp(rinci.harga) }}
                  </div>
                </td>
                <td class="text-right">
                  <div class="text-bold">
                    {{ formattanpaRp(it.pagu) }}
                  </div>
                  <div class="q-pl-md q-py-md" v-for="rinci in it?.rincian" :key="rinci">
                    {{ formattanpaRp(rinci.pagu) }}
                  </div>
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
    </q-card-section>
  </template>
</template>
<script setup>
import { formatRpDouble, formattanpaRp } from 'src/modules/formatter'
import { useRkaStore } from 'src/stores/siasik/anggaran/storerka'
import { ref } from 'vue'

const store = useRkaStore()
const separator = ref('cell')

</script>

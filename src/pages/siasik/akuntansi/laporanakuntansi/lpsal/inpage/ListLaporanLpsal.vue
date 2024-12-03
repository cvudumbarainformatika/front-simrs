<template>
  <template v-if="store.belanja.length > 0 && store.pendapatan.length > 0 && store.silpaskg.length > 0">
    <q-card-section class="full-width">
      <div class="row justify-center">
        <div class="width: 80%">
          <q-markup-table
            class="my-sticky-table width:90%"
            flat-bordered
            wrap-cells
            :separator="separator"
          >
            <thead>
              <tr class="bg-dark text-white max-width">
                <th>URAIAN</th>
                <th>NILAI (Rp.)</th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-bold">
                <td>
                  {{ store.nilaisilpa.uraian }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(isNaN(store.nilaisilpa?.nilai) ? 0 : store.nilaisilpa?.nilai) }}
                </td>
              </tr>
              <tr>
                <td> - {{ store.penggunaansal?.uraian }} </td>
                <td class="text-right">
                  {{ formattanpaRp(isNaN(store.penggunaansal?.nilai) ? 0 : store.penggunaansal?.nilai) }}
                </td>
              </tr>
              <tr>
                <td> - {{ store.biayatahunjln?.uraian }} </td>
                <td class="text-right">
                  {{ formattanpaRp(isNaN(store.biayatahunjln?.nilai) ? 0 : store.biayatahunjln?.nilai) }}
                  <q-popup-edit
                    v-model="store.biayatahunjln.nilai" v-slot="scope" @update:model-value="(val) => {
                      store.biayatahunjln.nilai = parseFloat(val)
                    }"
                  >
                    <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                  </q-popup-edit>
                </td>
              </tr>
              <tr class="text-bold">
                <td class="text-center">
                  Sub Jumlah
                </td>
                <td class="text-right">
                  {{ formattanpaRp(isNaN(subJumlahPertama()) ? 0 : subJumlahPertama()) }}
                </td>
              </tr>
              <tr>
                <td> - {{ store.silpasikpa?.uraian }} </td>
                <td class="text-right">
                  {{ formattanpaRp(isNaN(store.silpasikpa?.nilai) ? 0 : store.silpasikpa?.nilai) }}
                  <q-popup-edit
                    v-model="store.silpasikpa.nilai" v-slot="scope" @update:model-value="(val) => {
                      store.silpasikpa.nilai = parseFloat(val)
                    }"
                  >
                    <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                  </q-popup-edit>
                </td>
              </tr>
              <tr class="text-bold">
                <td class="text-center">
                  Sub Jumlah
                </td>
                <td class="text-right">
                  {{ formattanpaRp(isNaN(subJumlahKedua()) ? 0 : subJumlahKedua()) }}
                </td>
              </tr>
              <tr>
                <td> - {{ store.koreksithnsblm?.uraian }} </td>
                <td class="text-right">
                  {{ formattanpaRp(isNaN(store.koreksithnsblm?.nilai) ? 0 : store.koreksithnsblm?.nilai) }}
                  <q-popup-edit
                    v-model="store.koreksithnsblm.nilai" v-slot="scope" @update:model-value="(val) => {
                      store.koreksithnsblm.nilai = parseFloat(val)
                    }"
                  >
                    <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                  </q-popup-edit>
                </td>
              </tr>
              <tr>
                <td> - {{ store.lainlain?.uraian }} </td>
                <td class="text-right">
                  {{ formattanpaRp(isNaN(store.lainlain?.nilai) ? 0 : store.lainlain?.nilai) }}
                  <q-popup-edit
                    v-model="store.lainlain.nilai" v-slot="scope" @update:model-value="(val) => {
                      store.lainlain.nilai = parseFloat(val)
                    }"
                  >
                    <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                  </q-popup-edit>
                </td>
              </tr>
              <tr class="text-bold">
                <td class="text-center">
                  Sub Jumlah
                </td>
                <td class="text-right">
                  {{ formattanpaRp(isNaN(subJumlahKetiga()) ? 0 : subJumlahKetiga()) }}
                </td>
              </tr>
              <tr class="text-bold">
                <td>
                  Saldo Anggaran Lebih Akhir
                </td>
                <td class="text-right">
                  {{ formattanpaRp(isNaN(nilaiAkhir()) ? 0 : nilaiAkhir()) }}
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
import { formattanpaRp } from 'src/modules/formatter'
import { useLPSALStore } from 'src/stores/siasik/laporan/lpsal/lpsal'
import { ref } from 'vue'

const separator = ref('cell')
const store = useLPSALStore()

// function biayaBerjalan (val) {
//   store.setBiaya().then(() => {
//     store.inputbiaya = null
//   })
// }
// function koreksi () {
//   store.setKoreksi().then(() => {
//     store.inputkoreksi = 0
//   })
// }
// function lainlain () {
//   store.setLainlain().then(() => {
//     store.inputlainlain = 0
//   })
// }
function subJumlahPertama () {
  const penggunaansal = store.penggunaansal?.nilai
  const thnberjalan = store.biayatahunjln?.nilai
  return penggunaansal + thnberjalan
}

function subJumlahKedua () {
  const silpa = store.silpasikpa?.nilai
  return silpa
}

function subJumlahKetiga () {
  const koreksi = store.koreksithnsblm?.nilai
  const lainlain = store.lainlain?.nilai
  return koreksi + lainlain
}

function nilaiAkhir () {
  const a = parseFloat(subJumlahPertama())
  const b = parseFloat(subJumlahKedua())
  const c = parseFloat(subJumlahKetiga())
  return a + b + c
}

</script>

<template>
  <template
    v-if="store.objsetarakas.length > 0 || store.objretribusi.length > 0 ||
      store.objpiutang.length > 0 || store.objpenyisihan.length > 0 ||
      store.objpersediaan.length > 0 || store.objinvestasi.length > 0 ||
      store.objasettetap.length > 0 || store.objasetlainnya.length > 0 ||
      store.objutang.length > 0 || store.objutangjkpanjang.length > 0 ||
      store.objekuitas.length > 0"
  >
    <q-card-section class="full-width">
      <div class="row justify-center">
        <div class="full-width">
          <q-markup-table
            class="my-sticky-table"
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
                <td colspan="2">
                  ASET
                </td>
              </tr>
              <tr class="text-bold">
                <td colspan="2">
                  <div class="q-pl-sm">
                    ASET LANCAR
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <div class="q-pl-md">
                    Kas dan Setara Kas
                  </div>
                </td>
              </tr>
              <tr v-for="it in store.objsetarakas" :key="it">
                <td>
                  <div class="q-pl-lg">
                    - {{ it.uraian }}
                  </div>
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilai) }}
                </td>
              </tr>
              <tr>
                <td>
                  <div class="q-pl-md">
                    {{ store.objretribusi?.uraian }}
                  </div>
                </td>
                <td class="text-right">
                  {{ formattanpaRp(store.objretribusi?.nilai) }}
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <div class="q-pl-md">
                    Piutang
                  </div>
                </td>
              </tr>
              <tr v-for="it in store.objpiutang" :key="it">
                <td>
                  <div class="q-pl-lg">
                    - {{ it.uraian }}
                  </div>
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilai) }}
                </td>
              </tr>
              <tr v-for="it in store.objpersediaan" :key="it">
                <td>
                  <div class="q-pl-md">
                    {{ it?.uraian }}
                  </div>
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it?.nilai) }}
                </td>
              </tr>
              <tr>
                <td>
                  <div class="q-pl-md">
                    {{ store.objinvestasi?.uraian }}
                  </div>
                </td>
                <td class="text-right">
                  {{ formattanpaRp(store.objinvestasi?.nilai) }}
                </td>
              </tr>
              <tr class="text-bold">
                <td class="text-center">
                  JUMLAH ASET LANCAR
                </td>
                <td class="text-right">
                  {{ formattanpaRp(totalAsetlancar()) }}
                </td>
              </tr>
              <tr class="text-bold">
                <td colspan="2">
                  <div class="q-pl-sm">
                    ASET TIDAK LANCAR
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <div class="q-pl-md">
                    ASET TETAP
                  </div>
                </td>
              </tr>
              <tr v-for="it in store.objasettetap" :key="it">
                <td>
                  <div class="q-pl-lg">
                    - {{ it.uraian }}
                  </div>
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilai) }}
                </td>
              </tr>
              <tr class="text-bold">
                <td class="text-center">
                  JUMLAH ASET TETAP
                </td>
                <td class="text-right">
                  {{ formattanpaRp(totalAsettetap()) }}
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <div class="q-pl-md">
                    ASET LAINNYA
                  </div>
                </td>
              </tr>
              <tr v-for="it in store.objasetlainnya" :key="it">
                <td>
                  <div class="q-pl-lg">
                    - {{ it.uraian }}
                  </div>
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilai) }}
                </td>
              </tr>
              <tr class="text-bold">
                <td class="text-center">
                  JUMLAH ASET LAINNYA
                </td>
                <td class="text-right">
                  {{ formattanpaRp(totalAsetlainnya()) }}
                </td>
              </tr>
              <tr class="text-bold">
                <td>
                  <div class="text-right q-pl-sm">
                    JUMLAH ASET
                  </div>
                </td>
                <td class="text-right">
                  {{ formattanpaRp(jumlahAset()) }}
                </td>
              </tr>
              <tr v-for="it in store.objutang" :key="it">
                <td>
                  <div class="q-pl-md">
                    {{ it.uraian }}
                  </div>
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilai) }}
                </td>
              </tr>
              <tr class="text-bold">
                <td>
                  <div class="text-center q-pl-sm">
                    JUMLAH KEWAJIBAN JANGKA PENDEK
                  </div>
                </td>
                <td class="text-right">
                  {{ formattanpaRp(totalKewajiban().kewajibanjgkpendek) }}
                </td>
              </tr>
              <tr class="text-bold">
                <td colspan="2">
                  <div class="q-pl-sm">
                    KEWAJIBAN JANGKA PANJANG
                  </div>
                </td>
              </tr>
              <tr v-for="it in store.objutangjkpanjang" :key="it">
                <td>
                  <div class="q-pl-md">
                    {{ it.uraian }}
                  </div>
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilai) }}
                </td>
              </tr>
              <tr class="text-bold">
                <td>
                  <div class="text-center q-pl-sm">
                    JUMLAH KEWAJIBAN JANGKA PANJANG
                  </div>
                </td>
                <td class="text-right">
                  {{ formattanpaRp(totalKewajiban().kewajibanjgkpanjang) }}
                </td>
              </tr>
              <tr class="text-bold">
                <td>
                  <div class="text-right q-pl-sm">
                    JUMLAH KEWAJIBAN
                  </div>
                </td>
                <td class="text-right">
                  {{ formattanpaRp(totalKewajiban().jumlahkewajiban) }}
                </td>
              </tr>
              <tr class="text-bold">
                <td colspan="2">
                  <div class="q-pl-sm">
                    EKUITAS
                  </div>
                </td>
              </tr>
              <tr v-for="it in store.objekuitas" :key="it">
                <td>
                  <div class="q-pl-md">
                    {{ it.uraian }}
                  </div>
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilai) }}
                </td>
              </tr>
              <tr class="text-bold">
                <td>
                  <div class="text-right q-pl-sm">
                    JUMLAH EKUITAS
                  </div>
                </td>
                <td class="text-right">
                  {{ formattanpaRp(totalEkuitas()) }}
                </td>
              </tr>
              <tr class="text-bold">
                <td>
                  <div class="text-center q-pl-sm">
                    JUMLAH KEWAJIBAN DAN EKUITAS DANA
                  </div>
                </td>
                <td class="text-right">
                  {{ formattanpaRp(jumlahKewajibanDanEkuitas()) }}
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
import { useNeracaStore } from 'src/stores/siasik/laporan/neraca/neraca'
import { ref } from 'vue'
// import { onMounted } from 'vue'
const separator = ref('cell')
const store = useNeracaStore()

function totalAsetlancar () {
  const setarakas = store.objsetarakas.map((x) => parseFloat(x.nilai)).reduce((a, b) => a + b, 0)
  const retribusi = store.objretribusi.nilai
  const piutang = store.objpiutang.map((x) => parseFloat(x.nilai)).reduce((a, b) => a + b, 0)
  const persediaan = store.objpersediaan.map((x) => parseFloat(x.nilai)).reduce((a, b) => a + b, 0)
  const investasi = store.objinvestasi.nilai
  return setarakas + retribusi + piutang + persediaan + investasi
}

function totalAsettetap () {
  const asettetap = store.objasettetap.map((x) => parseFloat(x.nilai)).reduce((a, b) => a + b, 0)
  return asettetap
}
function totalAsetlainnya () {
  const asetlainnya = store.objasetlainnya.map((x) => parseFloat(x.nilai)).reduce((a, b) => a + b, 0)
  return asetlainnya
}

function jumlahAset () {
  const asetlancar = parseFloat(totalAsetlancar())
  const asettetap = parseFloat(totalAsettetap())
  const asetlainnya = parseFloat(totalAsetlainnya())
  return asetlancar + asettetap + asetlainnya
}

function totalKewajiban () {
  const kewajibanjgkpendek = store.objutang.map((x) => parseFloat(x.nilai)).reduce((a, b) => a + b, 0)
  const kewajibanjgkpanjang = store.objutangjkpanjang.map((x) => parseFloat(x.nilai)).reduce((a, b) => a + b, 0)
  const jumlahkewajiban = parseFloat(kewajibanjgkpendek) + parseFloat(kewajibanjgkpanjang)
  return {
    kewajibanjgkpendek,
    kewajibanjgkpanjang,
    jumlahkewajiban
  }
}

function totalEkuitas () {
  const ekuitas = store.objekuitas.map((x) => parseFloat(x.nilai)).reduce((a, b) => a + b, 0)
  return ekuitas
}

function jumlahKewajibanDanEkuitas () {
  const kewajiban = parseFloat(totalKewajiban().jumlahkewajiban)
  const ekuitas = parseFloat(totalEkuitas())
  return kewajiban + ekuitas
}

</script>

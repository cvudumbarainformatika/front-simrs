<!-- eslint-disable no-unused-vars -->
<template>
  <KopSurat />
  <IdentitasPage :pasien="props.pasien" />
  <div
    class="row justify-end text-weight-bold"
    style="margin-right: 20px;"
  >
    RM IRJA-2
  </div>
  <div
    class="row justify-center f-20 text-weight-bold q-mb-md"
  >
    PENGKAJIAN AWAL MEDIS RAWAT JALAN
  </div>
  <q-separator />
  <q-markup-table
    separator="vertical"
    flat
    bordered
    dense
    wrap-cells
  >
    <thead>
      <tr>
        <th class="text-center">
          TGL JAM
        </th>
        <th class="text-center">
          PROFESI
        </th>
        <th class="text-center">
          SUBYEKTIF
        </th>
        <th class="text-center">
          OBYEKTIF
        </th>
        <th class="text-center">
          ASESMEN
        </th>
        <th class="text-center">
          PLANING
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(lasoapb, s) in store?.items"
        :key="s"
      >
        <td
          class="text-left f-12"
          width="7%"
        >
          <div
            v-for="(diagnosa, diag) in lasoapb?.diagnosa"
            :key="diag"
          >
            <div>{{ diagnosa?.rs12 }} </div>
          </div>
        </td>
        <td
          class="text-left f-12 ellipsis"
          width="7%"
        >
          <div
            v-for="(diagnosa, diag1) in lasoapb?.diagnosa"
            :key="diag1"
          >
            <div>Dokter</div>
          </div>
        </td>
        <td
          class="text-left f-12 "
          width="16%"
        >
          <div
            v-for="(anamnese, anam) in lasoapb?.anamnesis"
            :key="anam"
          >
            <div
              v-if="anamnese?.rs4 !== ''"
            >
              *)  {{ anamnese?.rs4 }}
            </div>
            <div v-if="anamnese?.riwayatpenyakit !== ''">
              *) {{ anamnese?.riwayatpenyakit }}
            </div>
            <div v-if="anamnese?.riwayatalergi !== ''">
              *) {{ anamnese?.riwayatalergi }}
            </div>
            <div v-if="anamnese?.keteranganalergi !== ''">
              *){{ anamnese?.keteranganalergi }}
            </div>
            <div v-if="anamnese?.riwayatpengobatan !== ''">
              *) {{ anamnese?.riwayatpengobatan }}
            </div>
            <div
              v-if="anamnese?.riwayatpenyakitsekarang !== ''"
            >
              *) {{ anamnese?.riwayatpenyakitsekarang }}
            </div>
            <div v-if="anamnese?.riwayatpenyakitkeluarga !== ''">
              *){{ anamnese?.riwayatpenyakitkeluarga }}
            </div>
            <div v-if="anamnese?.kondisikhusus !== ''">
              *) {{ anamnese?.kondisikhusus }}
            </div>
            <div v-if="anamnese?.keteranganscorenyeri !== ''">
              *) {{ anamnese?.keteranganscorenyeri }}
            </div>
          </div>
        </td>
        <td
          class="text-left f-12"
          width="25%"
        >
          <div
            v-for="(pemeriksaanfisik, fisik) in lasoapb?.pemeriksaanfisik"
            :key="fisik"
          >
            <div>*) Nadi: {{ pemeriksaanfisik?.rs4 }}, Pernapasan: {{ pemeriksaanfisik?.pernapasan }}, Sistole: {{ pemeriksaanfisik?.sistole }}, Diastole: {{ pemeriksaanfisik?.diastole }}</div>
            <div>*) Suhu Tubuh: {{ pemeriksaanfisik?.suhutubuh }}, Tinggi Badan: {{ pemeriksaanfisik?.tinggibadan }}, Berat badan: {{ pemeriksaanfisik?.beratbadan }},Vas: {{ pemeriksaanfisik?.vas }}</div>
            <div>*) Status Psikologi: {{ pemeriksaanfisik?.statuspsikologis }}, Sosial Ekonomi: {{ pemeriksaanfisik?.sosialekonomi }}</div>
            <div>*) Spiritual: {{ pemeriksaanfisik?.spiritual }},Kesadaran {{ pemeriksaanfisik?.kesadaran }}</div>
            <div>*) Status Neurologis: {{ pemeriksaanfisik?.statusneurologis }}</div>
            <div>*) Muakuloskeletal: {{ pemeriksaanfisik?.muakuloskeletal }}   </div>
          </div>
        </td>
        <td
          class="text-left f-12"
          width="20%"
        >
          <div
            v-for="(diagnosa, diagx) in lasoapb?.diagnosa"
            :key="diagx"
          >
            <div>*) {{ diagnosa?.masterdiagnosa?.rs1 }} {{ diagnosa?.masterdiagnosa?.diagnosa }}</div>
          </div>
        </td>
        <td
          class="text-left f-12"
          width="25%"
        >
          <div>
            <u><b> Laborat </b></u>
            <div
              v-for="(laborat, lab) in lasoapb?.laborat"
              :key="lab"
            >
              <div>*) {{ laborat?.pemeriksaanlab?.rs2 }} : {{ laborat?.rs21 }}</div>
            </div>
          </div>
          <div>
            <u><b> Radiologi </b></u>
            <div
              v-for="(pembacaanradiologi, w) in lasoapb?.pembacaanradiologi"
              :key="w"
            >
              <div>*) {{ pembacaanradiologi?.rs3 ? pembacaanradiologi?.rs3 : '-' }}</div>
            </div>
          </div>
          <div>
            <u><b> Obat </b></u>
            <div
              v-for="(obatlalu, o) in lasoapb?.apotekrajalpolilalu"
              :key="o"
            >
              <div>*) {{ obatlalu?.rs3 ? obatlalu?.rs3 : '-' }}</div>
            </div>
          </div>
        </td>
      </tr>
      <tr
        v-for="(lasoapb, s) in store?.items"
        :key="s"
      >
        <td
          class="text-left f-12"
          width="7%"
        >
          <div
            v-for="(diagnosa, diag) in lasoapb?.diagnosa"
            :key="diag"
          >
            <div>{{ diagnosa?.rs12 }} </div>
          </div>
        </td>
        <td
          class="text-left f-12 ellipsis"
          width="7%"
        >
          <div
            v-for="(diagnosa, diag1) in lasoapb?.diagnosa"
            :key="diag1"
          >
            <div>Perawat</div>
          </div>
        </td>
        <td
          class="text-left f-12 "
          width="16%"
        />
        <td
          class="text-left f-12"
          width="25%"
        />
        <td
          class="text-left f-12"
          width="20%"
        >
          <div
            v-for="(diagnosakeperawatan, diagp) in lasoapb?.diagnosakeperawatan"
            :key="diagp"
          >
            <div>*) Diagnosa Keperawatan: {{ diagnosakeperawatan?.nama }}</div>
            <q-separator />
            <div
              v-for="(intervensi, int) in diagnosakeperawatan?.intervensi"
              :key="int"
            >
              <div>-) Intervensi: {{ intervensi?.masterintervensi?.nama }}</div>
            </div>
          </div>
        </td>
        <td
          class="text-left f-12"
          width="25%"
        />
      </tr>
    </tbody>
  </q-markup-table>
</template>
<script setup>
import KopSurat from '../../comppoli/KopSurat.vue'
import IdentitasPage from '../../comppoli/IdentitasPage.vue'
import { defineProps } from 'vue'
import { useDokumenResumeStore } from 'src/stores/simrs/dokumen/resume/resume.js'

// eslint-disable-next-line no-unused-vars
const store = useDokumenResumeStore()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

store.setParams('noreg', props.pasien?.noreg)
store.getData()
</script>

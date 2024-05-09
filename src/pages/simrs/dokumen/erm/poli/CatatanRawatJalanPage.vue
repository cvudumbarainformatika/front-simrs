<!-- eslint-disable no-unused-vars -->
<template>
  <div
    class="row justify-end text-weight-bold q-gutter-sm"
    style="margin-right: 20px;margin-top: 10px;"
  >
    <div class="col-1">
      <q-select
        v-model="store.params.tahunawal"
        label="Tahun"
        :options="options"
        outlined
        option-label="nama"
        emit-value
        map-options=""
      />
    </div>
    <div class="col-1">
      <q-select
        v-model="store.params.tahunakhir"
        label="Tahun"
        outlined
        :options="options"
        option-label="nama"
        emit-value
        map-options=""
      />
    </div>
    <div class="col-1">
      <q-btn
        unelevated
        color="dark"
        round
        size="sm"
        icon="icon-mat-search"
        @click="carikunjungan"
      >
        <q-tooltip
          class="primary"
          :offset="[10, 10]"
        >
          Cari
        </q-tooltip>
      </q-btn>
      <br>
      <q-btn
        ref="refPrint"
        v-print="printObj"
        unelevated
        color="dark"
        round
        size="sm"
        icon="icon-mat-print"
      >
        <q-tooltip
          class="primary"
          :offset="[10, 10]"
        >
          Print
        </q-tooltip>
      </q-btn>
    </div>
  </div>

  <div
    id="printMe"
    style="width: 17cm;"
    class="q-pa-xs full-width"
  >
    <KopSurat />
    <IdentitasPage :pasien="props.pasien" />
    <div
      class="row justify-end text-weight-bold q-gutter-sm"
      style="margin-right: 20px;"
    >
      <div class="col-1">
        RM IRJA-2
      </div>
    </div>
    <div
      class="row justify-center f-20 text-weight-bold q-mb-md"
    >
      CATATAN RAWAT JALAN
    </div>

    <q-separator />
    <div v-if="store?.loading === false">
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
              <div>
                <div>{{ lasoapb?.jampulangtaskid[0]?.created_at }} </div>
              </div>
            </td>
            <td
              class="text-left f-12"
              width="7%"
            >
              <div>
                <div>{{ lasoapb?.pegawai?.nama }} </div>
                <br>
                <div>
                  {{ lasoapb?.diagnosakeperawatan[0]?.masterperawat?.nama }}
                </div>
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
                <div>*) {{ diagnosa?.masterdiagnosa?.rs1 }} {{ diagnosa?.masterdiagnosa?.rs4 }}</div>
              </div>
              <q-separator />
              <br>
              <div
                v-for="(diagnosakeperawatan, kep) in lasoapb?.diagnosakeperawatan"
                :key="kep"
              >
                <div>*) {{ diagnosakeperawatan?.kode }} {{ diagnosakeperawatan?.nama }}</div>
              </div>
            </td>
            <td
              class="text-left f-12"
              width="25%"
            >
              <div v-if="lasoapb?.laborat?.length">
                <u><b> Laborat </b></u>
                <div
                  v-for="(laborat, lab) in lasoapb?.laborat"
                  :key="lab"
                >
                  <div>*) {{ laborat?.pemeriksaanlab?.rs2 }} : {{ laborat?.rs21 }}</div>
                </div>
              </div>
              <div v-if="lasoapb?.pembacaanradiologi?.length">
                <u><b> Radiologi </b></u>
                <div
                  v-for="(pembacaanradiologi, w) in lasoapb?.pembacaanradiologi"
                  :key="w"
                >
                  <div>*) {{ pembacaanradiologi?.rs3 ? pembacaanradiologi?.rs3 : '-' }}</div>
                </div>
              </div>
              <br>
              <div
                v-if="lasoapb?.apotekrajal?.length || lasoapb?.apotekrajalpolilalu?.length
                  || lasoapb?.apotekracikanrajal?.length || lasoapb?.apotekracikanrajallalu?.length"
              >
                <u><b> Obat </b></u>
                <div
                  v-for="(obatlalu, o) in lasoapb?.apotekrajalpolilalu"
                  :key="o"
                >
                  <div>*) {{ obatlalu?.obat }}</div>
                </div>
                <div
                  v-for="(obat, o) in lasoapb?.apotekrajal"
                  :key="o"
                >
                  <div>*) {{ obat?.obat }}</div>
                </div>
                <div
                  v-for="(obatracikan, o) in lasoapb?.apotekracikanrajal"
                  :key="o"
                >
                  <div>*) {{ obatracikan?.obat }}</div>
                </div>
                <div
                  v-for="(obatracikanlalu, o) in lasoapb?.apotekracikanrajallalu"
                  :key="o"
                >
                  <div>*) {{ obatracikanlalu?.obat }}</div>
                </div>
              </div>
              <br>
              <div v-if="lasoapb?.tindakan?.length">
                <u><b> Tindakan </b></u>
                <div
                  v-for="(tindakan, o) in lasoapb?.tindakan"
                  :key="o"
                >
                  <div>*) {{ tindakan?.tindakan }} {{ tindakan?.keterangan ?? '' }}</div>
                </div>
              </div>
              <div v-if="lasoapb?.kamaroperasi?.length">
                <u><b> Operasi </b></u>
                <div
                  v-for="(kamaroperasi, ok) in lasoapb?.kamaroperasi"
                  :key="ok"
                >
                  <div>*) {{ kamaroperasi?.mastertindakanoperasi?.rs2 }}</div>
                </div>
              </div>
              <br>
              <div v-if="lasoapb?.usg?.length || lasoapb?.ecg?.length || lasoapb?.eeg">
                <u><b> ParaKlinik </b></u>
                <div
                  v-for="(usg, ok) in lasoapb?.usg"
                  :key="ok"
                >
                  <div>*) {{ usg?.nama }} {{ usg?.hasil }}</div>
                </div>
                <br>
                <div
                  v-for="(ecg, ec) in lasoapb?.ecg"
                  :key="ec"
                >
                  <div>*) {{ ecg?.mastertindakan?.rs2 }} {{ ecg?.hasil }}</div>
                </div>
                <br>
                <div
                  v-for="(eeg, ec) in lasoapb?.eeg"
                  :key="ec"
                >
                  <div>*) {{ eeg?.klasifikasi }} {{ eeg?.impresi }}</div>
                </div>
              </div>
            </td>
          </tr>
          <q-separator />
        </tbody>
      </q-markup-table>
    </div>
    <div v-else>
      <app-loading />
    </div>
  </div>
</template>
<script setup>
import KopSurat from '../../comppoli/KopSurat.vue'
import IdentitasPage from '../../comppoli/IdentitasPage.vue'
import { defineProps, ref } from 'vue'
import { useCatatanRawatJalanStore } from 'src/stores/simrs/dokumen/erm/catatanrawatjalan'

// eslint-disable-next-line no-unused-vars
const store = useCatatanRawatJalanStore()
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

// eslint-disable-next-line no-use-before-define, no-undef
const options = ref([])
// eslint-disable-next-line no-unused-vars
const tahun = new Date().getFullYear()
store.params.tahunawal = new Date().getFullYear()
store.params.tahunakhir = new Date().getFullYear()
for (let i = tahun - 4; i <= tahun; i++) {
  options.value.push(i)
}

function carikunjungan() {
  store.init(props?.pasien?.norm)
  // store.getDataCatatan()
  // store.params.norm = props?.pasien?.norm
}

store.init(props?.pasien?.norm)

const printObj = {
  id: 'printMe',
  popTitle: ' '
}
// eslint-disable-next-line no-undef
// options.value = i
// console.log('adsad', options)

// console.log('adsad', tahun)
// return Array.from({ length: tahun - 1900 }, (value, index) => 1901 + index)

// store.setParams('noreg', props.pasien?.noreg)
// store.getData()

</script>

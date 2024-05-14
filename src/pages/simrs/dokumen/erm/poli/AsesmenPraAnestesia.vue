<template>
  <div class="fit bg-grey-4 column q-pa-lg q-pb-xl scroll">
    <div
      id="pdfDoc"
      ref="rePdfDoc"
      class="page-legal f-12 bg-white"
    >
      <div class="contentx">
        <my-kop-surat
          title1="ASSESMEN"
          title2="PRA - ANESTESIA"
        />
        <div class="biodata-pasien q-my-md">
          <div class="flex justify-between">
            <div class="flex q-gutter-md kiri">
              <div
                style="width: 58px;"
                class="text-weight-bold"
              >
                NO. RM
              </div>
              <div style="width: 70px;">
                : {{ pasien.norm }}
              </div>
              <div class="text-weight-bold">
                NAMA PASIEN
              </div>
              <div>
                : {{ pasien.nama_panggil }}
              </div>
            </div>
            <div class="flex q-gutter-md kanan">
              <div class="text-weight-bold">
                TGL. LAHIR
              </div>
              <div>
                : {{ pasien.tgllahir }}
              </div>
            </div>
          </div>
          <div class="flex">
            <div class="column full-width">
              <div>
                <span class="q-mr-lg text-weight-bold">ALAMAT</span> : {{ pasien.alamat ?? '-' }}
              </div>
              <div class="flex justify-between full-width">
                <div class="flex">
                  <div
                    style="width:72px;"
                    class="text-weight-bold"
                  >
                    J.Kelamin
                  </div>
                  <div> : {{ pasien.kelamin }}</div>
                </div>
                <div class="text-right justify-end">
                  <span class="text-weight-bold">Dokter Anestesi : </span> {{ pasien.dokter }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="diisi-dokter q-mb-md">
          <div>
            <b>Diisi oleh Dokter</b>
          </div>
          <div
            class="text-weight-bold f-14"
            style="text-decoration: underline; margin-bottom: 5px;"
          >
            KAJIAN SISTEM
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-6">
              <template
                v-for="(item, i) in store.masterKajian"
                :key="i"
              >
                <q-checkbox
                  v-model="item.check"
                  size="xs"
                  :label="item.kajian"
                  class="full-width"
                  dense
                  disable
                  color="black"
                />
              </template>
            </div>
            <div class="col-6">
              <template
                v-for="(item, i) in store.masterKajian2"
                :key="i"
              >
                <q-checkbox
                  v-model="item.check"
                  size="xs"
                  :label="item.kajian"
                  class="full-width"
                  dense
                  disable
                  color="black"
                />
              </template>
            </div>
          </div>
          <div class="row full-width q-mt-xs">
            <div class="col-auto">
              Keterangan :
            </div>
            <div class="col q-ml-sm">
              {{ store.form.keteranganKajianSistem }}
            </div>
          </div>
          <div
            class="text-weight-bold f-14 q-my-sm"
            style="text-decoration: underline; margin-bottom: 5px;"
          >
            PEMERIKSAAN FISIK
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-auto flex">
              <div>Tinggi : </div>
              <div> {{ pasien?.pemeriksaanfisik?.length? pasien?.pemeriksaanfisik[0]?.tinggibadan : '..........' }} cm</div>
            </div>
            <div class="col-auto flex">
              <div>Berat : </div>
              <div> {{ pasien?.pemeriksaanfisik?.length? pasien?.pemeriksaanfisik[0]?.beratbadan : '..........' }} kg</div>
            </div>
            <div class="col-auto flex">
              <div>Tekanan Darah : </div>
              <div> {{ pasien?.pemeriksaanfisik?.length? pasien?.pemeriksaanfisik[0]?.sistole + '/' + pasien?.pemeriksaanfisik[0]?.diastole : '..........' }}</div>
            </div>
            <div class="col-auto flex">
              <div>Nadi : </div>
              <div> {{ pasien?.pemeriksaanfisik?.length? pasien?.pemeriksaanfisik[0]?.rs4 : '..........' }}</div>
            </div>
            <div class="col-auto flex">
              <div>Suhu : </div>
              <div> {{ pasien?.pemeriksaanfisik?.length? pasien?.pemeriksaanfisik[0]?.suhutubuh : '..........' }} <span>&#8451;</span>C</div>
            </div>
          </div>

          <div class="q-my-sm">
            <div
              class="text-weight-bold f-14"
              style="text-decoration: underline; margin-bottom: 5px;"
            >
              KEADAAN UMUM
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-2">
                <div>Skor Mallampati </div>
              </div>
              <div class="col-10">
                <div>: {{ store?.resultPraAnastesi?.length? store.resultPraAnastesi[0]?.skorMallampati ?? '..................................................' : '..................................................' }}</div>
              </div>
            </div>
            <div class="row q-col-gutter-md">
              <div class="col-2">
                <div>Jantung </div>
              </div>
              <div class="col-10">
                <div>: {{ store?.resultPraAnastesi?.length? store.resultPraAnastesi[0]?.jantung ?? '..................................................' : '..................................................' }}</div>
              </div>
            </div>
            <div class="row q-col-gutter-md">
              <div class="col-2">
                <div>Paru-paru </div>
              </div>
              <div class="col-10">
                <div>: {{ store?.resultPraAnastesi?.length? store.resultPraAnastesi[0]?.paruparu ?? '..................................................' : '..................................................' }}</div>
              </div>
            </div>
            <div class="row q-col-gutter-md">
              <div class="col-2">
                <div>Abdomen </div>
              </div>
              <div class="col-10">
                <div>: {{ store?.resultPraAnastesi?.length? store.resultPraAnastesi[0]?.abdomen ?? '..................................................' : '..................................................' }}</div>
              </div>
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-2">
                <div>Tulang Belakang </div>
              </div>
              <div class="col-10">
                <div>: {{ store?.resultPraAnastesi?.length? store.resultPraAnastesi[0]?.tulangbelakang ?? '..................................................' : '..................................................' }}</div>
              </div>
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-2">
                <div>Extremitas </div>
              </div>
              <div class="col-10">
                <div>: {{ store?.resultPraAnastesi?.length? store.resultPraAnastesi[0]?.extremitas ?? '..................................................' : '..................................................' }}</div>
              </div>
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-2">
                <div>Neurologi (Bila dapat diperiksa) </div>
              </div>
              <div class="col-10">
                <div>: {{ store?.resultPraAnastesi?.length? store.resultPraAnastesi[0]?.neurologi ?? '..................................................' : '..................................................' }}</div>
              </div>
            </div>
            <div class="row q-col-gutter-md">
              <div class="col-2">
                <div>Keterangan </div>
              </div>
              <div class="col-10">
                <div>: {{ store?.resultPraAnastesi?.length? store.resultPraAnastesi[0]?.kondisi ?? '..................................................' : '..................................................' }}</div>
              </div>
            </div>
          </div>

          <div class="q-my-sm">
            <div
              class="text-weight-bold f-14"
              style="text-decoration: underline; margin-bottom: 5px;"
            >
              LABORATORIUM (bila tersedia)
            </div>

            <div class="row q-col-gutter-sm">
              <div class="col-6">
                <template
                  v-for="(item, n) in store.masterLab2"
                  :key="n"
                >
                  <div class="row full-width">
                    <div class="col-12">
                      <div>{{ item?.nama }} : {{ item?.model ?? '..................................................' }}</div>
                    </div>
                  </div>
                </template>
              </div>
              <div class="col-6">
                <template
                  v-for="(item, n) in store.masterLab"
                  :key="n"
                >
                  <div class="row full-width">
                    <div class="col-12">
                      <div>{{ item?.nama }} : {{ item?.model ?? '..................................................' }}</div>
                    </div>
                  </div>
                </template>
              </div>
              <div class="row full-width">
                <div class="col-auto">
                  Keterangan :
                </div>
                <div class="col q-ml-sm">
                  {{ store.resultPraAnastesi?.length? store.resultPraAnastesi[0]?.keteranganLaborat : '..................................................' }}
                </div>
              </div>
            </div>
          </div>

          <div class="q-my-sm">
            <div
              class="text-weight-bold f-14"
              style="text-decoration: underline; margin-bottom: 5px;"
            >
              DIAGNOSIS (ICD X)
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-6">
                <div
                  v-for="(item, i) in pasien?.diagnosa"
                  :key="i"
                  class="row q-col-gutter-md"
                >
                  <div class="col-auto">
                    {{ i + 1 }} .
                  </div>
                  <div class="col no-wrap">
                    <span class="text-weight-bold">{{ item?.masterdiagnosa?.rs2 }}</span> {{ item?.masterdiagnosa?.rs4 }}
                    ( <b>{{ item?.masterdiagnosa?.rs5 }}</b> )
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div
                  class="text-weight-bold f-14"
                  style="text-decoration: underline; margin-bottom: 5px;"
                >
                  ASA CLASSIFICATION
                </div>
                <div
                  v-for="(item, i) in store.asaClass"
                  :key="i"
                >
                  <q-checkbox
                    v-model="item.check"
                    size="xs"
                    :label="item.nama"
                    color="black"
                    dense
                    disable
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="q-my-sm">
            <div
              class="text-weight-bold f-14"
              style="text-decoration: underline; margin-bottom: 5px;"
            >
              PENYULIT ANESTESI LAIN
            </div>
            <template v-if="store.resultPraAnastesi.length && store.resultPraAnastesi[0]?.penyulitAnastesi.length">
              <div
                v-for="(item, i) in store.resultPraAnastesi[0]?.penyulitAnastesi"
                :key="i"
                class="row"
              >
                <div class="col-auto">
                  {{ i+1 }} .
                </div>
                <div class="col q-ml-sm">
                  {{ item }}
                </div>
              </div>
            </template>
            <template v-else>
              <div
                v-for="i in 2"
                :key="i"
                class="row"
              >
                <div class="col-auto">
                  {{ i+1 }} .
                </div>
                <div class="col q-ml-sm dotted-line" />
              </div>
            </template>
          </div>

          <div class="q-my-sm">
            <div
              class="text-weight-bold f-14"
              style="text-decoration: underline; margin-bottom: 5px;"
            >
              CATATAN TINDAK LANJUT
            </div>

            <div class="row">
              <div
                class="col"
                :class="!store.resultPraAnastesi[0]?.catatan ? 'dotted-line' : ''"
              >
                {{ store.resultPraAnastesi[0]?.catatan ?? '.' }}
              </div>
            </div>
          </div>

          <div class="q-my-sm">
            <div
              class="text-weight-bold f-14"
              style="text-decoration: underline; margin-bottom: 5px;"
            >
              PERENCANAAN ANESTESIA
            </div>

            <div class="row">
              <div
                class="col"
                :class="!store.resultPraAnastesi[0]?.perencanaan ? 'dotted-line' : ''"
              >
                {{ store.resultPraAnastesi[0]?.perencanaan ?? '.' }}
              </div>
            </div>
          </div>

          <div class="q-my-sm">
            <div
              class="text-weight-bold f-14"
              style="text-decoration: underline; margin-bottom: 5px;"
            >
              TEKNIK ANESTESIS
            </div>

            <div
              v-for="(item, i) in store.teknikAnestesia"
              :key="i"
              class="flex"
            >
              <q-checkbox
                v-model="item.check"
                :label="item.nama"
                size="sm"
                dense
                disable
                color="black"
              />
              <div
                v-if="item.check"
                class="flex f-12 q-ml-sm text-italic"
              >
                <div>
                  : {{ item.keterangan ?? '.' }}
                </div>
              </div>
            </div>
          </div>
          <div class="q-my-sm">
            <div
              class="text-weight-bold f-14"
              style="text-decoration: underline; margin-bottom: 5px;"
            >
              TEKNIK KHUSUS
            </div>

            <div
              v-for="(item, i) in store.teknikKhusus"
              :key="i"
              class="flex"
            >
              <q-checkbox
                v-model="item.check"
                :label="item.nama"
                size="sm"
                dense
                disable
                color="black"
              />
              <div
                v-if="item.check"
                class="flex f-12 q-ml-sm text-italic"
              >
                <div v-show="item.nama !== 'Regional'">
                  : {{ item.keterangan ?? '.' }}
                </div>
                <div v-show="item.nama === 'Regional'">
                  : <q-option-group
                    v-model="store.regional"
                    :options="store.regionals"
                    color="primary"
                    inline
                    size="xs"
                    type="checkbox"
                    dense
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="q-my-sm">
            <div
              class="text-weight-bold f-14"
              style="text-decoration: underline; margin-bottom: 5px;"
            >
              Perawatan Pasca Anestesia
            </div>

            <div
              v-for="(item, i) in store.pascaAnastesi"
              :key="i"
            >
              <q-checkbox
                v-model="item.check"
                :label="item.nama"
                size="sm"
                dense
                color="black"
                disable
              />
              <div
                v-if="item?.check && item?.nama==='Rawat Khusus'"
                class="q-pl-md q-py-xs rounded-borders row items-center"
                style="border: 1px solid grey;"
              >
                <q-option-group
                  v-model="store.modelRawatKhusus"
                  :options="store.rawatKhusus"
                  color="black"
                  inline
                  size="xs"
                  type="checkbox"
                  dense
                  class="col-auto"
                />
                <div v-if="rawatkhususLainlain">
                  {{ keteranganLainlainRawatKhusus }}
                </div>
              </div>
              <div v-else-if="item?.check && item?.nama==='APS'">
                {{ item.keterangan }}
              </div>
            </div>
          </div>

          <div class="q-my-sm">
            <div
              class="text-weight-bold f-14"
              style="text-decoration: underline; margin-bottom: 5px;"
            >
              PERSIAPAN PRA ANESTESIA
            </div>
            <div class="row ">
              <div class="col-auto flex q-gutter-lg">
                <div>Puasa Mulai : </div>
                <div class="">
                  Jam : {{ store.resultPraAnastesi.length? store.resultPraAnastesi[0]?.mulaiPuasajam ?? '...............' : '..................................................' }}
                </div>
                <div class="">
                  Tanggal : {{ store.resultPraAnastesi.length? store.resultPraAnastesi[0]?.mulaiPuasaTgl ?? '...............' : '..................................................' }}
                </div>
              </div>
            </div>
            <div class="row ">
              <div class="col-auto flex q-gutter-lg">
                <div>Pre medikasi : </div>
                <div class="">
                  Jam : {{ store.resultPraAnastesi.length? store.resultPraAnastesi[0]?.preMedikasiJam ?? '...............' : '..................................................' }}
                </div>
                <div class="">
                  Tanggal : {{ store.resultPraAnastesi.length? store.resultPraAnastesi[0]?.preMedikasiTgl ?? '...............' : '..................................................' }}
                </div>
              </div>
            </div>
            <div class="row ">
              <div class="col-auto flex q-gutter-lg">
                <div>Transportasi ke kamar bedah : </div>
                <div class="">
                  Jam : {{ store.resultPraAnastesi.length? store.resultPraAnastesi[0]?.transKeKamarBedahJam ?? '...............' : '..................................................' }}
                </div>
                <div class="">
                  Tanggal : {{ store.resultPraAnastesi.length? store.resultPraAnastesi[0]?.transKeKamarBedahTgl ?? '...............' : '..................................................' }}
                </div>
              </div>
            </div>
            <div class="row ">
              <div class="col-auto flex q-gutter-lg">
                <div>Rencana Operasi : </div>
                <div class="">
                  Jam : {{ store.resultPraAnastesi.length? store.resultPraAnastesi[0]?.rencanaOperasiJam ?? '...............' : '..................................................' }}
                </div>
                <div class="">
                  Tanggal : {{ store.resultPraAnastesi.length? store.resultPraAnastesi[0]?.rencanaOperasiTgl ?? '...............' : '..................................................' }}
                </div>
              </div>
            </div>
          </div>

          <div class="q-my-sm">
            <div
              class="text-weight-bold f-14"
              style="margin-bottom: 5px;"
            >
              CATATAN PERSIAPAN PRA ANESTESIA
            </div>
            <!-- <div class="row full-width"> -->
            <q-input
              v-model="store.form.catatanPersiapanPraAnastesi"
              type="textarea"
              outlined
              standout="bg-yellow-3"
              rows="2"
              class="q-mb-xs"
              readonly
            />
            <!-- </div> -->
          </div>

          <div class="q-my-md">
            <div class="f-12">
              Tanda tangan Dokter Anestesia
            </div>

            <div
              style="height: 150px; width: 150px;"
              class="column flex-center"
            >
              <figure
                v-if="pasien?.rs19==='1'"
                class="qrcode full-width"
              >
                <vue-qrcode
                  :value="qrUrl"
                  tag="svg"
                  :options="{
                    errorCorrectionLevel: 'Q',
                    color: {
                      dark: '#000000',
                      light: '#ffffff',
                    },
                    margin:2
                  }"
                />
                <!-- <img
                  class="qrcode__image"
                  src="~assets/logos/logo-rsud.png"
                  alt="RSUD MOHAMAD SALEH"
                > -->
              </figure>
              <div v-else>
                ttd
              </div>
            </div>
            <div>({{ pasien?.dokter }})</div>
          </div>

          <div class="q-my-sm">
            <div
              class="text-weight-bold f-14"
              style="margin-bottom: 5px;"
            >
              KOLOM TINDAK LANJUT
            </div>
            <!-- <div class="row full-width"> -->
            <q-input
              v-model="store.form.kolomTindakLanjut"
              type="textarea"
              outlined
              standout="bg-yellow-3"
              rows="2"
              class="q-mb-xs"
              readonly
            />
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePraAnastesiStore } from 'src/stores/simrs/pelayanan/poli/praanastesi'
import { computed, onMounted, ref } from 'vue'

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const store = usePraAnastesiStore()
// const rawatkhusus = ref([])
const rawatkhususLainlain = ref(false)

onMounted(async() => {
  await store.getMaster()
  await store.getData(props.pasien)
    .then(() => store.initForm(store.resultPraAnastesi.length ? store.resultPraAnastesi[0] : null))
})

const qrUrl = computed(() => {
  const noreg = props?.pasien?.noreg
  const dok = 'DOKUMEN PRA-ANESTESI.png'
  return `https://xenter.my.id/qr-document?noreg=${noreg}&dokumen=${dok}`
})

console.log(props.pasien)
</script>

<style lang="scss" scoped>
.page-A4{
  // background: white;
  display: block;
  margin-left: auto;
  margin-right: auto;

  //width: 21cm;
  width: 21.59cm;
  height: 33cm;
  // margin: 30mm 45mm
  .contentx{
    padding: 5mm 5mm
  }

  .b-a{
    border: 1px solid black;
  }
  .b-l{
    border-left: 1px solid black;
  }
  .b-r{
    border-right: 1px solid black;
  }
}

// .pt12 {
//   font-size: 12pt !important;
// }

.page-legal {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 21.59cm; // lebar kertas Legal
  // height: 35.56cm; // tinggi kertas Legal
  // overflow: hidden;
  // page-break-after: always; // Membuat halaman baru jika konten tidak muat

  .contentx {
    padding: 5mm 5mm;
  }

  .b-a {
    border: 1px solid black;
  }
  .b-l {
    border-left: 1px solid black;
  }
  .b-r {
    border-right: 1px solid black;
  }
}

table {
  width: 100%;
  td {
    vertical-align: top;
  }
}

.dotted-line {
  border-bottom: 1px dotted black;
  width: 100%;
}
</style>

<template>
  <q-dialog position="right">
    <q-card style="width: 80vw; height: 100vh">
      <q-card-section class="column full-height q-pa-none">
        <div class="col-auto q-pa-md">
          <div class="text-weight-bold">
            History Pra Anastesi (Rajal)
          </div>
          <div class="text-grey">
            Diambil dari Poli Anestesi Kunjungan Terakhir
          </div>
        </div>
        <div v-if="!data" class="col full-height bg-grey-4 q-pa-md">
          <div class="column full-height flex-center">
            <div>Belum Ada History Pra Anestesi Rajal</div>
          </div>
        </div>
        <div v-else class="col full-height scroll bg-grey-4 q-pa-md">
          <div class="diisi-dokter q-mb-md">
            <div
              class="text-weight-bold f-14"
              style="text-decoration: underline; margin-bottom: 5px;"
            >
              KAJIAN SISTEM
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-6">
                <template
                  v-for="(item, i) in masterKajian"
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
                  v-for="(item, i) in masterKajian2"
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
                {{ data?.keteranganKajianSistem }}
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
                <div> {{ data?.pemeriksaanfisik?.length? data?.pemeriksaanfisik[0]?.tinggibadan : '..........' }} cm</div>
              </div>
              <div class="col-auto flex">
                <div>Berat : </div>
                <div> {{ data?.pemeriksaanfisik?.length? data?.pemeriksaanfisik[0]?.beratbadan : '..........' }} kg</div>
              </div>
              <div class="col-auto flex">
                <div>Tekanan Darah : </div>
                <div> {{ data?.pemeriksaanfisik?.length? data?.pemeriksaanfisik[0]?.sistole + '/' + data?.pemeriksaanfisik[0]?.diastole : '..........' }}</div>
              </div>
              <div class="col-auto flex">
                <div>Nadi : </div>
                <div> {{ data?.pemeriksaanfisik?.length? data?.pemeriksaanfisik[0]?.rs4 : '..........' }}</div>
              </div>
              <div class="col-auto flex">
                <div>Suhu : </div>
                <div> {{ data?.pemeriksaanfisik?.length? data?.pemeriksaanfisik[0]?.suhutubuh : '..........' }} <span>&#8451;</span>C</div>
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
                <div class="col-4">
                  <div>Skor Mallampati </div>
                </div>
                <div class="col-8">
                  <div>: {{ data?.skorMallampati ?? '..................................................' }}</div>
                </div>
              </div>
              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <div>Jantung </div>
                </div>
                <div class="col-8">
                  <div>: {{ data?.jantung ?? '..................................................' }}</div>
                </div>
              </div>
              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <div>Paru-paru </div>
                </div>
                <div class="col-8">
                  <div>: {{ data?.paruparu ?? '..................................................' }}</div>
                </div>
              </div>
              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <div>Abdomen </div>
                </div>
                <div class="col-8">
                  <div>: {{ data?.abdomen ?? '..................................................' }}</div>
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <div>Tulang Belakang </div>
                </div>
                <div class="col-8">
                  <div>: {{ data?.tulangbelakang ?? '..................................................' }}</div>
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <div>Extremitas </div>
                </div>
                <div class="col-8">
                  <div>: {{ data?.extremitas ?? '..................................................' }}</div>
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <div>Neurologi (Bila dapat diperiksa) </div>
                </div>
                <div class="col-8">
                  <div>: {{ data?.neurologi ?? '..................................................' }}</div>
                </div>
              </div>
              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <div>Keterangan </div>
                </div>
                <div class="col-8">
                  <div>: {{ data?.kondisi ?? '..................................................' }}</div>
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
                    v-for="(item, n) in masterLab2"
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
                    v-for="(item, n) in masterLab"
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
                    {{ data?.keteranganLaborat }}
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
                    v-for="(item, i) in data?.diagnosa"
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
                    v-for="(item, i) in asaClass"
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
              <template v-if="data?.penyulitAnastesi?.length">
                <div
                  v-for="(item, i) in data?.penyulitAnastesi"
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
                  :class="!data?.catatan ? 'dotted-line' : ''"
                >
                  {{ data?.catatan ?? '.' }}
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
                  :class="!data?.perencanaan ? 'dotted-line' : ''"
                >
                  {{ data?.perencanaan ?? '.' }}
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
                v-for="(item, i) in teknikAnestesia"
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
                v-for="(item, i) in teknikKhusus"
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
                      v-model="regional"
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
                v-for="(item, i) in pascaAnastesi"
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
                    v-model="modelRawatKhusus"
                    :options="rawatKhusus"
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
                    Jam : {{ data?.mulaiPuasajam ?? '...............' }}
                  </div>
                  <div class="">
                    Tanggal : {{ data?.mulaiPuasaTgl ?? '...............' }}
                  </div>
                </div>
              </div>
              <div class="row ">
                <div class="col-auto flex q-gutter-lg">
                  <div>Pre medikasi : </div>
                  <div class="">
                    Jam : {{ data?.preMedikasiJam ?? '...............' }}
                  </div>
                  <div class="">
                    Tanggal : {{ data?.preMedikasiTgl ?? '...............' }}
                  </div>
                </div>
              </div>
              <div class="row ">
                <div class="col-auto flex q-gutter-lg">
                  <div>Transportasi ke kamar bedah : </div>
                  <div class="">
                    Jam : {{ data?.transKeKamarBedahJam ?? '...............' }}
                  </div>
                  <div class="">
                    Tanggal : {{ data?.transKeKamarBedahTgl ?? '...............' }}
                  </div>
                </div>
              </div>
              <div class="row ">
                <div class="col-auto flex q-gutter-lg">
                  <div>Rencana Operasi : </div>
                  <div class="">
                    Jam : {{ data?.rencanaOperasiJam ?? '...............' }}
                  </div>
                  <div class="">
                    Tanggal : {{ data?.rencanaOperasiTgl ?? '...............' }}
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
              <!-- <q-input
                v-model="store.form.catatanPersiapanPraAnastesi"
                type="textarea"
                outlined
                standout="bg-yellow-3"
                rows="2"
                class="q-mb-xs"
                readonly
              /> -->
              <div v-html="getNewLine(data?.catatanPersiapanPraAnastesi)" />
            </div>

            <div class="q-my-sm">
              <div
                class="text-weight-bold f-14"
                style="margin-bottom: 5px;"
              >
                KOLOM TINDAK LANJUT
              </div>
              <!-- <q-input
                v-model="store.form.kolomTindakLanjut"
                type="textarea"
                outlined
                standout="bg-yellow-3"
                rows="2"
                class="q-mb-xs"
                readonly
              /> -->
              <div v-html="getNewLine(data?.kolomTindakLanjut)" />
            </div>
          </div>

          <div style="margin-bottom: 100px;" />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { getNewLine } from 'src/modules/formatter'
import { usePraAnastesiStore } from 'src/stores/simrs/pelayanan/poli/praanastesi'
import { computed, onMounted, ref } from 'vue'

const store = usePraAnastesiStore()

const kajianSistem = ref([])
const regional = ref([])

const pascaAnastesi = ref([])
const keteranganLainlainRawatKhusus = ref(null)
const modelRawatKhusus = ref([])

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  data: {
    type: Object,
    default: null
  }
})

onMounted(() => {
  console.log(props.pasien)
  kajianSistem.value = props.data?.kajianSistem

  setPascaAnastesi(props.data?.pascaAnastesi)
})

const masterKajian = computed(() => {
  const a = store.masterKajian
  const isi = props?.data.kajianSistem
  for (let i = 0; i < isi?.length; i++) {
    const el = isi[i]
    const d = a.find(x => x.kajian === el)
    if (d) {
      d.check = true
    }
  }
  return a
})
const masterKajian2 = computed(() => {
  const a = store.masterKajian2
  const isi = props?.data.kajianSistem
  for (let i = 0; i < isi?.length; i++) {
    const el = isi[i]
    const d = a.find(x => x.kajian === el)
    if (d) {
      d.check = true
    }
  }
  return a
})
const masterLab = computed(() => {
  const a = store.masterLab
  const isi = props?.data.laboratorium
  for (let i = 0; i < isi?.length; i++) {
    const el = isi[i]
    const d = a.find(x => x.nama === el?.nama)
    if (d) {
      d.model = el?.model
    }
  }
  return a
})
const masterLab2 = computed(() => {
  const a = store.masterLab2
  const isi = props?.data.laboratorium
  for (let i = 0; i < isi?.length; i++) {
    const el = isi[i]
    const d = a.find(x => x.nama === el?.nama)
    if (d) {
      d.model = el?.model
    }
  }
  return a
})
const asaClass = computed(() => {
  const a = store.asaClass
  const isi = props?.data.asaClasification
  for (let i = 0; i < isi?.length; i++) {
    const el = isi[i]
    const d = a.find(x => x.nama === el)
    if (d) {
      d.check = true
    }
  }
  return a
})

const teknikAnestesia = computed(() => {
  const a = props?.data?.teknikAnestesia
  for (let i = 0; i < a?.length; i++) {
    const el = a[i]
    const d = a.filter(x => x.nama === el?.nama)
    if (d.length) {
      return d.map(x => {
        x.nama = el.nama
        x.check = el.check
        x.keterangan = el.keterangan
        return x // Return the updated object
      })
    }

    // if (el.nama === 'Regional' && el.keterangan !== null) {
    //   const ket = el.keterangan
    //   const arr = ket.split('||')
    //   regional.value = arr
    // }
  }
  return a
})
const teknikKhusus = computed(() => {
  const a = props?.data?.teknikKhusus
  for (let i = 0; i < a?.length; i++) {
    const el = a[i]
    const d = a.filter(x => x.nama === el?.nama)
    if (d.length) {
      return d.map(x => {
        x.nama = el.nama
        x.check = el.check
        x.keterangan = el.keterangan
        return x // Return the updated object
      })
    }
  }
  return a
})

function setPascaAnastesi (arr) {
  pascaAnastesi.value = store.pascaAnastesi
  for (let i = 0; i < arr?.length; i++) {
    const el = arr[i]
    // eslint-disable-next-line array-callback-return
    pascaAnastesi.value.filter(x => x.nama === el.nama).map(x => {
      x.nama = el.nama
      x.check = el.check
      x.keterangan = el.keterangan
    })
    if (el.nama === 'Rawat Khusus' && el.keterangan !== null) {
      const ket = el.keterangan
      const arr = ket.split('||')
      modelRawatKhusus.value = arr
    }
    keteranganLainlainRawatKhusus.value = props?.data?.keteranganLainlainRawatKhusus
  }
}

</script>

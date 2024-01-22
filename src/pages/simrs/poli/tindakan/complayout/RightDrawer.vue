<template>
  <div class="column full-height">
    <div class="col-auto">
      <q-bar>
        <q-btn
          flat
          rounded
          padding="xs"
          size="xs"
          icon="icon-mat-close"
          @click="emits('close')"
        />
        <q-space />
        <div>History Pasien</div>
      </q-bar>
    </div>
    <div class="col full-height">
      <q-scroll-area style="height:calc(100% - 50px)">
        <q-list
          v-if="store?.items?.length"
          bordered
          separator
        >
          <q-expansion-item
            v-for="(item, i) in store?.items"
            :key="i"
            expand-separator
            :label="item?.ruangan + ' | '+ item?.rs1 "
            :caption="tanggal(item?.tanggal)"
          >
            <q-card dark>
              <q-separator />
              <q-card-section class="q-pa-none">
                <div v-if="item?.anamnesis.length">
                  <q-bar class="bg-accent">
                    <div>ANAMNESIS</div>
                  </q-bar>
                  <q-list dark>
                    <q-item
                      v-for="(anamnesis, a) in item?.anamnesis"
                      :key="a"
                    >
                      <q-item-section>
                        <q-item-label>Keluhan Utama</q-item-label>
                        <q-item-label
                          caption
                          lines="2"
                        >
                          {{ anamnesis?.rs4 }}
                        </q-item-label>
                        <q-item-label>Riwayat Penyakit (Sekarang)</q-item-label>
                        <q-item-label
                          caption
                          lines="2"
                        >
                          {{ anamnesis?.riwayatpenyakitsekarang }}
                        </q-item-label>
                        <q-item-label>Riwayat Penyakit</q-item-label>
                        <q-item-label
                          caption
                          lines="2"
                        >
                          {{ anamnesis?.riwayatpenyakit }}
                        </q-item-label>
                        <q-item-label>Riwayat Alergi</q-item-label>
                        <q-item-label
                          caption
                          lines="2"
                        >
                          {{ anamnesis?.riwayatalergi }}
                        </q-item-label>
                        <q-item-label>Reaksi berupa</q-item-label>
                        <q-item-label
                          caption
                          lines="2"
                        >
                          {{ anamnesis?.keteranganalergi }}
                        </q-item-label>
                        <q-item-label>Riwayat Pengobatan</q-item-label>
                        <q-item-label
                          caption
                          lines="2"
                        >
                          {{ anamnesis?.riwayatpengobatan }}
                        </q-item-label>
                        <q-item-label>Penurunan Berat Badan</q-item-label>
                        <q-item-label
                          caption
                          lines="2"
                        >
                          {{ anamnesis?.skreeninggizi == 0? "Tidak":"Ya" }}
                        </q-item-label>
                        <q-item-label>Asupan Makan Berkurang</q-item-label>
                        <q-item-label
                          caption
                          lines="2"
                        >
                          {{ anamnesis?.asupanmakan == 0? "Tidak":"Ya" }}
                        </q-item-label>
                        <q-item-label>Kondisi Khusus</q-item-label>
                        <q-item-label
                          caption
                          lines="2"
                        >
                          {{ anamnesis?.kondisikhusus }}
                        </q-item-label>
                        <q-item-label>Score Nyeri</q-item-label>
                        <q-item-label
                          caption
                          lines="2"
                        >
                          {{ anamnesis?.scorenyeri }} ( {{ anamnesis?.keteranganscorenyeri }} )
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
                <div v-else>
                  <q-bar class="bg-primary">
                    <div>ANAMNESA tidak ada</div>
                  </q-bar>
                </div>
              </q-card-section>
              <q-card-section
                v-if="item?.pemeriksaanfisik?.length"
                flat
                bordered
                square
                dark
              />
              <q-list
                separator
              >
                <q-bar class="bg-accent">
                  <div>PEMERIKSAAN FISIK</div>
                </q-bar>
                <transition-group name="list">
                  <template
                    v-for="(pemeriksaanfisik, f) in pasien?.pemeriksaanfisik"
                    :key="f"
                  >
                    <!-- NADI-->
                    <q-item
                      class="q-pa-xs list-move"
                      dark
                    >
                      <q-item-section avatar>
                        <q-icon
                          :color="nadi(pemeriksaanfisik?.rs4).color"
                          name="icon-my-monitor_heart"
                          size="lg"
                        />
                      </q-item-section>
                      <q-item-section class="q-pa-xs">
                        <q-item-label
                          :class="`text-h4 text-${nadi(pemeriksaanfisik?.rs4).color}`"
                        >
                          {{ pemeriksaanfisik?.rs4 }}
                        </q-item-label>
                      </q-item-section>
                      <q-item-section
                        side
                      >
                        <q-item-label class="text-right f-10">
                          N (HR)
                        </q-item-label>
                        <q-item-label class="text-right f-10">
                          {{ nadi(pemeriksaanfisik?.rs4).res }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-separator
                      dark
                      inset
                    />
                    <q-item
                      class="q-pa-xs list-move"
                      dark
                    >
                      <q-item-section avatar>
                        <q-icon
                          color="white"
                          name="icon-my-local_hospital"
                          size="lg"
                        />
                      </q-item-section>
                      <q-item-section class="q-pa-xs">
                        <q-item-label
                          :class="`text-h4 text-white`"
                        >
                          {{ pemeriksaanfisik?.pernapasan }}
                        </q-item-label>
                      </q-item-section>
                      <q-item-section
                        side
                      >
                        <q-item-label class="text-right f-10">
                          RR
                        </q-item-label>
                        <q-item-label class="text-right f-10">
                          -
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-separator
                      dark
                      inset
                    />
                    <q-item
                      class="q-pa-xs list-move"
                      dark
                    >
                      <q-item-section avatar>
                        <q-icon
                          :color="suhu(pemeriksaanfisik?.suhutubuh).color"
                          name="icon-my-standing-human-body-silhouette-svgrepo-com"
                          size="lg"
                        />
                      </q-item-section>
                      <q-item-section class="q-pa-xs">
                        <q-item-label
                          :class="`text-h4 text-${suhu(item?.suhutubuh).color}`"
                        >
                          {{ pemeriksaanfisik?.suhutubuh }}
                        </q-item-label>
                      </q-item-section>
                      <q-item-section
                        side
                      >
                        <q-item-label class="text-right f-10">
                          SUHU TUBUH
                        </q-item-label>
                        <q-item-label class="text-right f-10">
                          {{ suhu(pemeriksaanfisik?.suhutubuh).res }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-separator
                      dark
                      inset
                    />
                    <q-item
                      class="q-pa-xs list-move"
                      dark
                    >
                      <q-item-section class="q-pa-xs">
                        <q-item-label
                          :class="`text-h5 `"
                        >
                          <span :class="`${tekananDarah(pemeriksaanfisik?.sistole).color}`">{{ pemeriksaanfisik?.sistole }}</span> /
                          <span :class="`${tekananDarahDias(pemeriksaanfisik?.diatole).color}`">{{ pemeriksaanfisik?.diastole }}</span>
                        </q-item-label>
                        <q-item-label class="f-10">
                          <span :class="`${tekananDarah(itpemeriksaanfisikem?.sistole).color}`">{{ tekananDarah(pemeriksaanfisik?.sistole).res }}</span> /
                          <span :class="`${tekananDarahDias(pemeriksaanfisik?.diastole).color}`">{{ tekananDarahDias(pemeriksaanfisik?.diastole).res }}</span>
                        </q-item-label>
                      </q-item-section>
                      <q-item-section
                        side
                      >
                        <q-item-label class="text-right f-10">
                          TD sys / dias
                        </q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-separator inset="item" />
                    <q-card-section
                      v-if="item?.diagnosa?.length"
                      class="q-pa-none"
                    >
                      <q-bar class="bg-accent">
                        <div>DIAGNOSA</div>
                      </q-bar>
                      <q-list dark>
                        <q-item
                          v-for="(diagnosa, d) in item?.diagnosa"
                          :key="d"
                        >
                          <q-item-section>
                            <q-item-label>Kasus</q-item-label>
                            <q-item-label
                              caption
                              lines="2"
                            >
                              {{ diagnosa?.rs7 }}
                            </q-item-label>
                            <q-item-section>
                              <q-item-label>Jenis Diagnosa</q-item-label>
                              <q-item-label
                                caption
                                lines="2"
                              >
                                {{ diagnosa?.rs4 }}
                              </q-item-label>
                              <q-item-section>
                                <q-item-label>Diagnosa</q-item-label>
                                <q-item-label
                                  caption
                                  lines="2"
                                >
                                  {{ diagnosa?.masterdiagnosa?.rs4 }} ( {{ diagnosa?.rs3 }})
                                </q-item-label>
                                <q-item-section>
                                  <q-item-label>Keterangan</q-item-label>
                                  <q-item-label
                                    caption
                                    lines="2"
                                  >
                                    {{ diagnosa?.rs6 }}
                                  </q-item-label>
                                </q-item-section>
                              </q-item-section>
                            </q-item-section>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-card-section>

                    <q-separator />
                    <q-card-section
                      v-if="item?.laborat?.length || item?.laborats?.length"
                      class="q-pa-none"
                    >
                      <q-bar class="bg-accent">
                        PEMERIKSAAN LABORAT
                      </q-bar>
                      <q-markup-table
                        separator="vertical"
                        flat
                        bordered
                        dense
                        dark
                      >
                        <thead>
                          <tr>
                            <th class="text-left">
                              Nama Pemeriksaan
                            </th>
                            <th class="text-left">
                              Kelompok Pemeriksaan
                            </th>
                            <th class="text-left">
                              Satuan Normal
                            </th>
                            <th class="text-right">
                              Hasil
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(lab, l) in item?.laborat"
                            :key="l"
                          >
                            <td
                              class="text-left ellipsis"
                              style="max-width: 250px;"
                            >
                              {{ lab?.pemeriksaanlab?.rs2 }}
                            </td>
                            <td
                              class="text-right"
                              style="max-width: 150px;"
                            >
                              {{ lab?.pemeriksaanlab?.rs21 }}
                            </td>
                            <td
                              class="text-right"
                              style="max-width: 150px;"
                            >
                              {{ lab?.pemeriksaanlab?.rs22 }}
                            </td>
                            <td
                              class="text-right"
                              style="max-width: 150px;"
                            >
                              {{ lab?.rs21 }} {{ lab?.rs27 }}
                            </td>
                          </tr>
                        </tbody>
                      </q-markup-table>
                      <q-separator />
                      <!-- <q-item
                        v-for="(laborats, ls) in item?.laborats"
                        :key="ls"
                      >
                        <q-item-label>{{ laborats }}</q-item-label>
                      </q-item> -->
                    </q-card-section>

                    <q-separator />
                    <q-card-section
                      v-if="item?.apotekrajal?.length
                        || item?.apotekrajalpolilalu?.length
                        || item?.apotekracikanrajal?.length
                        || item?.apotekracikanrajallalu?.length
                        || item?.apotekranap?.length
                        || item?.apotekranaplalu?.length
                        || item?.apotekranapracikanheder?.length
                        || item?.apotekranapracikanhederlalu?.length"
                      class="q-pa-none"
                    >
                      <q-bar class="bg-accent">
                        PEMBERIAN OBAT
                      </q-bar>
                      <q-markup-table
                        separator="vertical"
                        flat
                        bordered
                        dense
                        dark
                      >
                        <thead>
                          <tr>
                            <th class="text-left">
                              Tanggal
                            </th>
                            <th class="text-right">
                              Obat
                            </th>
                            <th class="text-right">
                              Jumlah
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(apotekrajal, wew) in item?.apotekrajal"
                            :key="wew"
                          >
                            <td
                              class="text-left ellipsis"
                              style="max-width: 250px;"
                            >
                              {{ apotekrajal?.rs3 }}
                            </td>
                            <td
                              class="text-right"
                              style="max-width: 150px;"
                            >
                              {{ apotekrajal.masterobat?.rs2 }}
                            </td>
                            <td
                              class="text-right"
                              style="max-width: 150px;"
                            >
                              {{ apotekrajal?.rs8 }}
                            </td>
                          </tr>
                          <tr
                            v-for="(apotekrajalpolilalu, lll) in item?.apotekrajalpolilalu"
                            :key="lll"
                          >
                            <td
                              class="text-left ellipsis"
                              style="max-width: 250px;"
                            >
                              {{ apotekrajalpolilalu?.rs3 }}
                            </td>
                            <td
                              class="text-right"
                              style="max-width: 150px;"
                            >
                              {{ apotekrajalpolilalu.masterobat?.rs2 }}
                            </td>
                            <td
                              class="text-right"
                              style="max-width: 150px;"
                            >
                              {{ apotekrajalpolilalu?.rs8 }}
                            </td>
                          </tr>
                          <tr
                            v-for="(apotekracikanrajal, llll) in item?.apotekracikanrajal"
                            :key="llll"
                          >
                            <td
                              class="text-left ellipsis"
                              style="max-width: 250px;"
                            >
                              {{ apotekracikanrajal?.rs3 }}
                            </td>
                            <td
                              class="text-right"
                              style="max-width: 150px;"
                            >
                              {{ apotekracikanrajal.masterobat?.rs2 }}
                            </td>
                            <td
                              class="text-right"
                              style="max-width: 150px;"
                            >
                              {{ apotekracikanrajal?.rs8 }}
                            </td>
                          </tr>
                          <tr
                            v-for="(apotekracikanrajallalu, llll) in item?.apotekracikanrajallalu"
                            :key="llll"
                          >
                            <td
                              class="text-left ellipsis"
                              style="max-width: 250px;"
                            >
                              {{ apotekracikanrajallalu?.rs3 }}
                            </td>
                            <td
                              class="text-right"
                              style="max-width: 150px;"
                            >
                              {{ apotekracikanrajallalu.masterobat?.rs2 }}
                            </td>
                            <td
                              class="text-right"
                              style="max-width: 150px;"
                            >
                              {{ apotekracikanrajallalu?.rs8 }}
                            </td>
                          </tr>
                          <tr
                            v-for="(apotekranap, lxx) in item?.apotekranap"
                            :key="lxx"
                          >
                            <td
                              class="text-left ellipsis"
                              style="max-width: 250px;"
                            >
                              {{ apotekranap?.rs3 }}
                            </td>
                            <td
                              class="text-right"
                              style="max-width: 150px;"
                            >
                              {{ apotekranap.masterobat?.rs2 }}
                            </td>
                            <td
                              class="text-right"
                              style="max-width: 150px;"
                            >
                              {{ apotekranap?.rs8 }}
                            </td>
                          </tr>
                          <tr
                            v-for="(apotekranaplalu, lx) in item?.apotekranaplalu"
                            :key="lx"
                          >
                            <td
                              class="text-left ellipsis"
                              style="max-width: 250px;"
                            >
                              {{ apotekranaplalu?.rs3 }}
                            </td>
                            <td
                              class="text-right"
                              style="max-width: 150px;"
                            >
                              {{ apotekranaplalu.masterobat?.rs2 }}
                            </td>
                            <td
                              class="text-right"
                              style="max-width: 150px;"
                            >
                              {{ apotekranaplalu?.rs8 }}
                            </td>
                          </tr>
                          <tr
                            v-for="(apotekranapracikanheder, lxx) in item?.apotekranapracikanheder"
                            :key="lxx"
                          >
                            <td
                              class="text-left ellipsis"
                              style="max-width: 250px;"
                            >
                              {{ apotekranapracikanheder?.rs3 }}
                            </td>
                            <td
                              class="text-right"
                              style="max-width: 150px;"
                            >
                              {{ apotekranapracikanheder.apotekranapracikanrinci.masterobat?.rs2 }}
                            </td>
                            <td
                              class="text-right"
                              style="max-width: 150px;"
                            >
                              {{ apotekranapracikanheder.apotekranapracikanrinci.masterobat?.rs8 }}
                            </td>
                          </tr>
                          <tr
                            v-for="(apotekranapracikanhederlalu, lxxx) in item?.apotekranapracikanhederlalu"
                            :key="lxxx"
                          >
                            <td
                              class="text-left ellipsis"
                              style="max-width: 250px;"
                            >
                              {{ apotekranapracikanhederlalu?.rs3 }}
                            </td>
                            <td
                              class="text-right"
                              style="max-width: 150px;"
                            >
                              {{ apotekranapracikanhederlalu.apotekranapracikanrincilalu.masterobat?.rs2 }}
                            </td>
                            <td
                              class="text-right"
                              style="max-width: 150px;"
                            >
                              {{ apotekranapracikanhederlalu.apotekranapracikanrincilalu.masterobat?.rs8 }}
                            </td>
                          </tr>
                        </tbody>
                      </q-markup-table>
                    </q-card-section>
                  </template>
                </transition-group>
              </q-list>
            </q-card>
          </q-expansion-item>
        </q-list>
        <div
          v-else
          class="full-height column flex-center "
        >
          <div>History Pasien Belum Ada</div>
        </div>
      </q-scroll-area>
      <div
        class="absolute-bottom bg-primary"
        style="height: 50px;"
      >
        adasda
      </div>
    </div>
  </div>
</template>

<script setup>
import { dateFullFormat, formatJam } from 'src/modules/formatter'
import { useHistoryPasien } from 'src/stores/simrs/pelayanan/poli/historypasien'
import { onMounted } from 'vue'

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const emits = defineEmits(['close'])

const tanggal = (val) => {
  return dateFullFormat(val) + ' ~ ' + formatJam(val)
}

const store = useHistoryPasien()
onMounted(() => {
  store.getData(props.pasien)
})

function nadi(val) {
  const bradikardi = val < 60
  const normal = val >= 61 && val <= 100
  const takikardi = val > 100

  let obj = {
    color: 'teal',
    res: 'Normal'
  }
  if (bradikardi) {
    obj = { color: 'red', res: 'Brakikardi' }
  } else if (normal) {
    obj = { color: 'teal', res: 'Normal' }
  } else if (takikardi) {
    obj = { color: 'red', res: 'Takikardi' }
  }

  return obj
}

function suhu(val) {
  const hipotermia = val < 35
  const normal = val >= 35 && val < 37
  const pireksia = val >= 37 && val <= 41.1
  const hipertermia = val > 41.1

  let obj = {
    color: 'teal',
    res: 'normal'
  }
  if (hipotermia) {
    obj = { color: 'red', res: 'Hipotermia' }
  } else if (normal) {
    obj = { color: 'teal', res: 'Normal' }
  } else if (pireksia) {
    obj = { color: 'red', res: 'Pireksia/febris' }
  } else if (hipertermia) {
    obj = { color: 'red', res: 'Hipertermia' }
  }

  return obj
}

// function getKesadaran(val) {
//   const temp = store.optionsTingkatkesadaran.filter(a => a.value === val)
//   if (temp.length) {
//     return temp[0].label
//   } else {
//     return '-'
//   }
// }
// eslint-disable-next-line no-unused-vars
function tekananDarah(val) {
  const normal = val >= 100 && val <= 120
  const prahipertensi = val >= 121 && val <= 139
  const hipertensiderajat1 = val >= 140 && val <= 159
  const hipertensiderajat2 = val >= 160

  let obj = {
    color: 'text-teal',
    res: 'normal'
  }
  if (normal) {
    obj = { color: 'text-teal', res: 'Normal' }
  } else if (prahipertensi) {
    obj = { color: 'text-red', res: 'Prahipertensi' }
  } else if (hipertensiderajat1) {
    obj = { color: 'text-red', res: 'Hipertensi Derajat 1' }
  } else if (hipertensiderajat2) {
    obj = { color: 'text-red', res: 'Hipertensi Derajat 2' }
  } else {
    obj = { color: 'text-red', res: 'Not Valid' }
  }

  return obj
}

function tekananDarahDias(val) {
  const normal = val >= 60 && val <= 79
  const prahipertensi = val >= 80 && val <= 89
  const hipertensiderajat1 = val >= 90 && val <= 99
  const hipertensiderajat2 = val >= 100

  let obj = {
    color: 'text-teal',
    res: 'normal'
  }
  if (normal) {
    obj = { color: 'text-teal', res: 'Normal' }
  } else if (prahipertensi) {
    obj = { color: 'text-red', res: 'Prahipertensi' }
  } else if (hipertensiderajat1) {
    obj = { color: 'text-red', res: 'Hipertensi Derajat 1' }
  } else if (hipertensiderajat2) {
    obj = { color: 'text-red', res: 'Hipertensi Derajat 2' }
  } else {
    obj = { color: 'text-red', res: 'LOW' }
  }

  return obj
}

</script>

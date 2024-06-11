<template>
  <table>
    <thead>
      <tr>
        <th width="5%">
          No
        </th>
        <th>
          Resep
        </th>
        <th>
          Pasien
        </th>
        <th>
          Dokter
        </th>
        <th>
          Ruangan
        </th>
        <th>
          Status
        </th>
      </tr>
    </thead>
    <tbody>
      <template v-if="store.loading">
        <tr
          v-for="n in store.params.per_page"
          :key="n"
        >
          <td width="5%">
            <q-skeleton
              type="text"
              width="20px"
              height="14px"
            />
          </td>
          <td>
            <q-skeleton
              type="text"
              width="50px"
              height="14px"
            />
            <q-skeleton
              type="text"
              width="40px"
              height="10px"
            />
          </td>
          <td>
            <div class="row q-mb-xs q-col-gutter-sm">
              <q-skeleton
                type="text"
                width="100px"
                height="14px"
              />
            </div>
            <div class="row q-col-gutter-sm items-center">
              <q-skeleton
                type="text"
                width="40px"
                height="14px"
              />
              <div class="text-grey q-pt-none">
                ||
              </div>
              <q-skeleton
                type="text"
                width="40px"
                height="14px"
                class="q-ml-xs"
              />
            </div>
          </td>
          <td>
            <q-skeleton
              type="text"
              width="100px"
              height="14px"
            />
          </td>
          <td>
            <q-skeleton
              type="text"
              width="100px"
              height="14px"
            />
          </td>
        </tr>
      </template>
      <template v-else-if="!store.items.length">
        <tr>
          <td colspan="6">
            <app-no-data />
          </td>
        </tr>
      </template>
      <template v-else>
        <template
          v-for="(item, n) in store.items"
          :key="n"
        >
          <tr
            :class="item?.flag===''?'bg-red-2 cursor-pointer':(item?.flag==='1'?'bg-light-blue-2 cursor-pointer':'cursor-pointer')"
            @click="expand(item)"
          >
            <td width="5%">
              {{ n+1 }}
            </td>
            <td>
              <div class="row ">
                {{ item?.noresep }} ({{ item?.sistembayar?.rs2?? '-' }})
              </div>
              <div class="row text-grey f-10">
                <div>
                  {{ dateFullFormat(item?.tgl_permintaan) }}
                </div>
                <div
                  v-if="item?.tiperesep==='iter' && item?.noresep_asal!==''"
                  class="q-ml-sm"
                >
                  (copy - {{ dateFullFormat(item?.tgl) }}  )
                </div>
              </div>
              <div
                v-if="item?.tiperesep==='iter'"
                class="row text-purple text-weight-bold f-10"
              >
                iter s/d {{ dateFullFormat(item?.iter_expired) }}
              </div>
              <div
                v-if="item?.tiperesep==='prb'"
                class="row text-blue text-weight-bold f-10"
              >
                PRB
              </div>
              <div
                v-if="item?.adaKronis"
                class="row text-negative text-weight-bold f-10"
              >
                {{ item?.adaKronis }}
              </div>
              <div
                v-if="item?.adaKronisR"
                class="row text-negative text-weight-bold f-10"
              >
                {{ item?.adaKronisR }}
              </div>
              <div
                v-if="item?.flag==='5'"
                class="row  text-weight-bold f-10"
              >
                Diolak karena : {{ item?.alasan }}
              </div>
              <div
                v-if="(parseInt(item?.flag) === 3 && (!item?.semuaracik || !item?.semuaresep))"
                class="row text-weight-bold f-10"
              >
                Tidak diberikan semua karena : {{ item?.alasan }}
              </div>
            </td>
            <td>
              <div class="row text-weight-bold">
                {{ item?.datapasien?.nama }}
              </div>
              <div class="row">
                {{ item?.noreg }} || {{ item?.norm }}
              </div>
              <div class="row text-italic f-10">
                {{ item?.datapasien?.noka }}
              </div>
            </td>
            <td>
              {{ item?.dokter?.nama }}
            </td>
            <td>
              <div v-if="item?.poli">
                {{ item?.poli?.rs2 }}
              </div>
              <div v-if="item?.ruanganranap">
                {{ item?.ruanganranap?.rs2 }}
              </div>
            </td>
            <td>
              <q-chip
                square
                class="f-10"
                :color="color(item?.flag)"
                text-color="white"
              >
                {{ status(item?.flag) }}
              </q-chip>
            </td>
          </tr>
          <tr v-if="item.expand">
            <td colspan="6">
              <div v-if="item?.permintaanresep?.length">
                <div v-for="(rinc,j) in item?.permintaanresep " :key="rinc">
                  <div class="row" style="border-bottom: 1px solid black;">
                    <div style="width: 30%;">
                      <div class="row">
                        <div class="col-1">
                          {{ j+1 }}
                        </div>
                        <div class="col-11">
                          <div class="row text-weight-bold text-deep-orange">
                            {{ rinc?.mobat?.nama_obat }}
                          </div>
                          <div v-if="rinc?.kandungan" class="row f-10">
                            ( {{ rinc?.kandungan }} )
                          </div>
                          <div class="row text-italic f-10">
                            {{ rinc?.kdobat }}
                          </div>
                          <div v-if="rinc?.mobat?.satuan_k" class="row text-weight-bold f-10">
                            ( {{ rinc?.mobat?.satuan_k }} )
                          </div>
                          <div class="row q-col-gutter-sm text-weight-bold f-10">
                            <div
                              class="col-shrink"
                              :class="rinc?.fornas==='1'?'text-green':'text-red'"
                            >
                              {{ rinc?.fornas==='1'?'Fornas':'' }}
                            </div>
                            <div
                              class="col-shrink"
                              :class="rinc?.forkit==='1'?'text-green':'text-red'"
                            >
                              {{ rinc?.forkit==='1'?'Forkit':'' }}
                            </div>
                            <div
                              class="col-shrink"
                              :class="rinc?.generik==='1'?'text-green':'text-red'"
                            >
                              {{ rinc?.generik==='1'?'Generik':'' }}
                            </div>
                            <div
                              class="col-shrink"
                              :class="rinc?.mobat?.status_kronis==='1'?'text-red':'text-green'"
                            >
                              {{ rinc?.mobat?.status_kronis==='1'?'Kronis':'' }}
                            </div>
                            <div
                              class="col-shrink"
                              :class="rinc?.mobat?.kelompok_psikotropika==='1'?'text-red':'text-green'"
                            >
                              {{ rinc?.mobat?.kelompok_psikotropika==='1'?'Psikotropika':'' }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style="width: 70%;">
                      <div class="row items-center full-width">
                        <div class="col-6">
                          <div class="row">
                            <div class="col-4">
                              Aturan
                            </div>
                            <div class="col-8">
                              {{ rinc?.aturan }}
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-4">
                              Jumlah Obat
                            </div>
                            <div class="col-8">
                              {{ rinc?.jumlah }}
                            </div>
                          </div>
                          <!-- <div class="row">
                            <div class="col-4">
                              Obat Keluar Depo
                            </div>
                            <div class="col-8">
                              {{ rinc?.obatkeluar }}
                            </div>
                          </div> -->
                          <div class="row items-center">
                            <div class="col-4">
                              Konsumsi
                            </div>
                            <div class="col-8">
                              {{ formatDouble( parseFloat(rinc?.konsumsi),1) }} hari
                            </div>
                          </div>
                        </div>
                        <div class="col-5">
                          <div class="row">
                            <div class="col-4">
                              Harga
                            </div>
                            <div class="col-8">
                              {{ formatDouble( parseFloat(rinc?.hargajual),2) }}
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-4">
                              Subtotal
                            </div>
                            <div class="col-8">
                              {{ formatDouble( parseFloat(rinc?.harga),2) }}
                            </div>
                          </div>
                          <div class="row items-center">
                            <div class="col-4">
                              Keterangan
                            </div>
                            <div class="col-8">
                              {{ rinc?.keterangan }}
                              <!-- <app-input
                                v-model="rinc.keterangan"
                                outlined
                                valid
                                label="Keterangan"
                              /> -->
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="item?.listRacikan?.length">
                <div v-for="(rinc,k) in item?.listRacikan " :key="rinc">
                  <div class="row items-center now-rap">
                    <div class="col-shrink q-mr-sm">
                      {{ item?.permintaanresep?.length + k +1 }}
                    </div>
                    <div class="col-shrink q-mr-sm">
                      {{ rinc?.namaracikan }}
                    </div>
                    <div class="col-shrink q-mr-sm">
                      <q-chip
                        square
                        class="f-10"
                        color="primary"
                        text-color="white"
                        outline
                      >
                        {{ rinc?.tiperacikan }}
                      </q-chip>
                    </div>
                    <div class="col-shrink q-mr-sm text-purple text-weight-bold">
                      {{ rinc?.jumlahdibutuhkan }}
                      <!-- <app-input
                        v-model="rinc.jumlahdibutuhkan"
                        outlined
                        valid
                        label="Jumlah"
                        @update:model-value="setJumlahRacik($event,rinc,'jumlahdibutuhkan')"
                      /> -->
                    </div>
                    <div class="col-shrink q-mr-sm">
                      ({{ rinc?.satuan_racik }})
                    </div>
                    <div class="col-shrink q-mr-sm text-italic">
                      {{ rinc?.aturan }}
                    </div>

                    <div class="col-shrink q-mr-sm">
                      {{ rinc?.keterangan }}
                      <!-- <app-input
                        v-model="rinc.keterangan"
                        outlined
                        valid
                        label="Keterangan"
                      /> -->
                    </div>
                    <div class="col-shrink q-ml-md q-mr-xs text-weight-bold">
                      Rp. {{ formatDouble(parseFloat(rinc?.harga),2) }}
                    </div>
                    <div class="col-grow">
                      <q-separator
                        size="1px"
                        color="deep-orange"
                        inset
                      />
                    </div>
                  </div>
                  <div
                    v-for="(rac) in rinc?.rincian"
                    :key="rac"
                  >
                    <div style="border-bottom: 1px solid black;">
                      <div class="row q-ml-lg">
                        <div style="width: 30%;">
                          <div class="row text-weight-bold text-deep-orange">
                            {{ rac?.mobat?.nama_obat }}
                          </div>
                          <div v-if=" rac?.kandungan" class="row f-10">
                            ( {{ rac?.kandungan }} )
                          </div>
                          <div class="row text-italic f-10">
                            {{ rac?.kdobat }}
                          </div>
                          <div class="row text-weight-bold f-10">
                            ( {{ rac?.mobat?.satuan_k }} )
                          </div>
                          <div class="row q-col-gutter-sm text-weight-bold f-10">
                            <div
                              class="col-shrink"
                              :class="rac?.fornas==='1'?'text-green':'text-red'"
                            >
                              {{ rac?.fornas==='1'?'Fornas':'' }}
                            </div>
                            <div
                              class="col-shrink"
                              :class="rac?.forkit==='1'?'text-green':'text-red'"
                            >
                              {{ rac?.forkit==='1'?'Forkit':'' }}
                            </div>
                            <div
                              class="col-shrink"
                              :class="rac?.generik==='1'?'text-green':'text-red'"
                            >
                              {{ rac?.generik==='1'?'Generik':'' }}
                            </div>

                            <div
                              class="col-shrink"
                              :class="rac?.mobat?.status_kronis==='1'?'text-red':'text-green'"
                            >
                              {{ rac?.mobat?.status_kronis==='1'?'Kronis':'' }}
                            </div>
                            <div
                              class="col-shrink"
                              :class="rac?.mobat?.kelompok_psikotropika==='1'?'text-red':'text-green'"
                            >
                              {{ rac?.mobat?.kelompok_psikotropika==='1'?'Psikotropika':'' }}
                            </div>
                          </div>
                        </div>
                        <div style="width: 65%;">
                          <div class="row full-width ">
                            <!-- {{ item?.tiperacikan }} -->
                            <div class="col-6">
                              <div
                                v-if="rinc?.tiperacikan==='DTD'"
                                class="row text-purple text-weight-bold"
                              >
                                <div class="col-4">
                                  Dosis Resep
                                </div>
                                <div class="col-8">
                                  {{ rac?.dosismaksimum }}
                                </div>
                              </div>
                              <div
                                v-if="rinc?.tiperacikan==='DTD'"
                                class="row text-black"
                              >
                                <div class="col-4">
                                  Dosis Obat
                                </div>
                                <div class="col-8 ">
                                  <span class="text-weight-bold text-deep-orange">{{ rac?.dosisobat }}</span> <span
                                    v-if="rac?.mobat?.kekuatan_dosis"
                                    class="text-italic text-deep-orange f-10"
                                  >({{ rac?.mobat?.kekuatan_dosis }})</span>
                                </div>
                              </div>

                              <div class="row text-purple text-weight-bold">
                                <div class="col-4">
                                  Jumlah Resep
                                </div>
                                <div class="col-8">
                                  {{ rac?.jumlahresep }}
                                </div>
                              </div>
                              <!-- <div class="row text-purple text-weight-bold">
                              <div class="col-4">
                                Jumlah Resep
                              </div>
                              <div class="col-8">
                                {{ rac?.jumlahresep }}
                              </div>
                            </div> -->
                              <div class="row items-center text-black">
                                <!--
                              <div class="col-10">
                                {{ rac.jumlahobat }}
                                <q-input
                            ref="inputJumlahObat"
                            v-model="rac.jumlahobat"
                            label="jumlah obat (Keluar dari depo)"
                            dense
                            standout="bg-yellow-3"
                            outlined
                            @update:model-value="updateJumlahObat($event,rac,item)"
                          />
                          </div>
                           -->
                                <div class="col-4">
                                  Jumlah Obat
                                </div>
                                <div class="col-6">
                                  {{ rac?.jumlahobat }}
                                </div>
                                <div class="col-2">
                                  <span class="text-italic f-10">( {{ rac?.mobat?.satuan_k }} )</span>
                                </div>
                              </div>
                              <!-- <div class="row ">
                                <div class="col-4">
                                  Obat keluar Depo
                                </div>
                                <div class="col-8">
                                  {{ rac?.obatkeluar }}
                                </div>
                              </div> -->
                            </div>
                            <div class="col-5">
                              <div class="row">
                                <div class="col-4">
                                  Harga
                                </div>
                                <div class="col-8">
                                  {{ formatDouble(parseFloat(rac?.harga_jual),2) }}
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-4">
                                  Subtotal
                                </div>
                                <div class="col-8">
                                  {{ formatDouble(parseFloat(rac?.harga),2) }}
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-4">
                                  Keterangan
                                </div>
                                <div class="col-8">
                                  {{ rac?.keteranganx }}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div>{{ item }}</div> -->
            </td>
          </tr>
        </template>
      </template>
    </tbody>
  </table>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import { dateFullFormat, dateFull, formatDouble, formatRpDouble } from 'src/modules/formatter'
import { useListResepDokterToDepoStore } from 'src/stores/simrs/pelayanan/resep/listresep'

const store = useListResepDokterToDepoStore()

// function toPrint (val) {
//   store.dataToPrint = val
//   val.expand = !val.expand
//   val.highlight = !val.highlight
//   store.isOpen = true
//   // console.log('val', val, dialogPrint.value)
// }
function expand (item) {
  item.expand = !item.expand
}

// const indexId = ref(0)
function status (val) {
  let balik = ' Belum ada status'
  switch (val) {
    case '':
      balik = ' Belum Dikirim ke Depo (Draft)'
      break
    case '1':
      balik = 'Dikirimkan'
      break
    case '2':
      balik = 'Proses'
      break
    case '3':
      balik = 'Selesai'
      break
    case '4':
      balik = 'Ada Retur'
      break
    case '5':
      balik = 'Ditolak'
      break

    default:
      break
  }
  return balik
}
function color (val) {
  let balik = 'grey'
  switch (val) {
    case '':
      balik = 'grey'
      break
    case '1':
      balik = 'primary'
      break
    case '2':
      balik = 'green'
      break
    case '3':
      balik = 'dark'
      break
    case '4':
      balik = 'orange'
      break
    case '5':
      balik = 'negative'
      break

    default:
      break
  }
  return balik
}

</script>

<style lang="scss" scoped>
.head{
  border: 1px solid rgb(44, 43, 43);
  padding-left: 10px;
  background-color:  rgba(0, 0, 0, 0.9);
  color: white;
}
.child{
  border-bottom: 1px solid rgb(44, 43, 43);
  border-left: 1px solid rgb(44, 43, 43);
  border-right: 1px solid rgb(44, 43, 43);
  padding-left: 10px;
}
.text-end{
  text-align: end;
}
/* Standard Tables */

table {
  // margin: 1em 0;
  border-collapse: collapse;
  border: 1px solid #d6d6d6;
  width: 100%;
  margin-bottom: 50px;
}

th,
td {

  vertical-align: text-top;
  text-align: left;
  text-indent: -0.5em;
}
td {
  padding: 0.5em 0.5em 0.5em 1.5em;
}
th {
  padding: 0.5em 0.5em 0.5em 1em;
  vertical-align: bottom;
  background-color: $dark;
  color: $white;
}

tr:nth-child(even) th[scope=row] {
  background-color: #f2f2f2;
}

tr:nth-child(odd) th[scope=row] {
  background-color: #fff;
}

tr:nth-child(even) {
  background-color: rgba(0, 0, 0, 0.05);
}

tr:nth-child(odd) {
  background-color: rgba(255, 255, 255, 0.05);
}

td:nth-of-type(2) {
  font-style: italic;
}

// th:nth-of-type(3),
// td:nth-of-type(3) {
//   text-align: right;
// }
/* Fixed Headers */

th {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 2;
}

th[scope=row] {
  position: -webkit-sticky;
  position: sticky;
  left: 0;
  z-index: 1;
}

th[scope=row] {
  vertical-align: top;
  color: inherit;
  background-color: inherit;
  background: linear-gradient(90deg, transparent 0%, transparent calc(100% - .05em), #d6d6d6 calc(100% - .05em), #d6d6d6 100%);
}

table:nth-of-type(2) th:not([scope=row]):first-child {
  left: 0;
  z-index: 3;
  background: linear-gradient(90deg, #666 0%, #666 calc(100% - .05em), #ccc calc(100% - .05em), #ccc 100%);
}

/* Strictly for making the scrolling happen. */

th[scope=row] + td {
  min-width: 24em;
}

th[scope=row] {
  min-width: 20em;
}

</style>

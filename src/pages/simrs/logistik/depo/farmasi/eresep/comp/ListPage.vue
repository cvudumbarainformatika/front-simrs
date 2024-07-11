<template>
  <table>
    <thead>
      <tr>
        <th width="5%">
          No.
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
        <th class="text-end">
          Aksi
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
          <td class="text-end">
            <div class="row justify-end">
              <q-skeleton
                type="text"
                width="100px"
                height="14px"
              />
            </div>
          </td>
        </tr>
      </template>
      <template v-else-if="!store.items.length">
        <tr>
          <td colspan="7">
            <app-no-data />
          </td>
        </tr>
      </template>
      <template v-else>
        <template
          v-for="(item, n) in store.items"
          :key="n"
        >
          <tr :class="item?.flag===''?'bg-red-2':(item?.flag==='1'?'bg-light-blue-2':'')">
            <td width="5%">
              {{ n+1 }}
            </td>
            <td>
              <div class="row ">
                {{ item?.noresep }} ({{ item?.sistembayar?.rs2?? '-' }})
              </div>
              <div class="row text-grey f-10">
                <div v-if="parseFloat(item?.flag)>0">
                  {{ dateFull(item?.tgl_kirim) }}
                </div>
                <div v-if="item?.flag===''">
                  {{ dateFull(item?.tgl_permintaan) }}
                </div>
                <div
                  v-if="item?.tiperesep==='iter' && item?.noresep_asal!==''"
                  class="q-ml-sm"
                >
                  (copy - {{ dateFullFormat(item?.tgl) }}  )
                </div>
              </div>
              <div class="row text-green f-12 text-weight-bold">
                <div>
                  {{ item?.antrian?.nomor }}
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
              <!-- tgl pelayanan obat -->
              <div v-if="item?.addTglPelayanan" class="row items-center q-col-gutter-xs">
                <div class="col-10">
                  <app-input-date 
                  :model="item.tgl_pelayanan_obat"
                  label="Tgl Pelayanan Obat"
                  outlined
                  valid
                  :loading="item?.loading"
                  :disable="item?.loading"
                  @set-model="setTgl($event,item,'tgl_pelayanan_obat')"
                  />
                </div>
                <div class="col-2">
                  <q-btn 
                  flat
                  dense
                  color="green"
                  size="sm"
                  icon="icon-mat-save"
                  :loading="item?.loading"
                  :disable="item?.loading"
                  @click="saveTglPelayanan(item)"
                  >
                  <q-tooltip
                    class="primary"
                    :offset="[10, 10]"
                  >
                    Simpan Tanggal Pelayanan Obat
                  </q-tooltip>
                </q-btn>
                </div>
              </div> 
              <div v-if="!item?.addTglPelayanan && parseFloat(item?.flag)>=1" class="row items-center q-col-gutter-xs">
                <div  class="col-10 f-10 text-negative">
                  <div v-if="item?.tgl_pelayanan_obat">
                    Tgl Pelayanan Obat : <span class="f-12">{{dateFullFormat(item?.tgl_pelayanan_obat)}}</span> 
                  </div>
                  <q-tooltip
                    v-if="item?.tgl_pelayanan_obat"
                    class="primary"
                    :offset="[10, 10]"
                    >
                    Tanggal Pelayanan Obat
                    </q-tooltip>
                </div>
                <div class="col-2">
                    <q-btn 
                    flat
                    dense
                    color="primary"
                    size="sm"
                    icon="icon-mat-add_circle"
                    @click="addTglPelayanan(item)"
                    >
                    <q-tooltip
                      class="primary"
                      :offset="[10, 10]"
                    >
                      Tambah Tanggal Pelayanan Obat
                    </q-tooltip>
                  </q-btn>
                </div>
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
                <div v-if!="item?.kunjunganranap?.ruangtitipan?.rs1" class="text-negative">
                  Di Titipkan Di  {{ item?.kunjunganranap?.ruangtitipan?.rs2 }}
                </div>
              </div>
            </td>
            <td>
              <div class="row">
                <q-chip
                square
                class="f-10"
                :color="color(item?.flag)"
                text-color="white"
                >
                {{ status(item?.flag) }}
                </q-chip>
              </div>
              <!-- <div class="row f-10">
                <div class="col-5">Dikirim : </div>
                <div class="col-7">{{ dateFull(item?.tgl_kirim) }}</div>
              </div> -->
              <div class="row f-10">
                {{ dateFull(item?.tgl_selesai) }}
                <!-- <div class="col-5">Selesai : </div>
                <div class="col-7"></div> -->
              </div>
              <div v-if="item?.flag==='3' || item?.flag==='4'" class="row f-10 text-italic">
                <div >
                  {{ responTime(item) }}
                </div>
              </div>
            </td>
            <td class="text-end q-mr-sm">
              <div class="row no-wrap">
                <!-- terima -->
                <q-btn
                  v-if="item?.flag==='1'"
                  round
                  class="f-10 q-mr-sm"
                  :color="color(item?.flag)"
                  text-color="white"
                  icon="icon-mat-move_to_inbox"
                  :disable="store.loadingTerima && item?.loading"
                  :loading="store.loadingTerima && item?.loading"
                  @click="terimaResep(item)"
                >
                  <q-tooltip
                    class="primary"
                    :offset="[10, 10]"
                  >
                    Terima
                  </q-tooltip>
                </q-btn>
                <!-- print id resep-->
                <q-btn
                  v-if="parseInt(item?.flag)<= 4"
                  round
                  class="f-10 q-mr-sm"
                  color="green"
                  text-color="white"
                  icon="icon-mat-print"
                  @click="printHeadResep(item)"
                >
                  <q-tooltip
                    class="primary"
                    :offset="[10, 10]"
                  >
                    Print Id Resep
                  </q-tooltip>
                </q-btn>
                <!-- print  resep besar-->
                <q-btn
                  v-if="parseInt(item?.flag)<= 4"
                  round
                  class="f-10 q-mr-sm"
                  color="yellow"
                  text-color="white"
                  icon="icon-mat-print"
                  @click="printIdResep(item)"
                >
                  <q-tooltip
                    class="primary"
                    :offset="[10, 10]"
                  >
                    Print Resep Besar
                  </q-tooltip>
                </q-btn>
                <!-- print resep-->
                <q-btn
                  v-if="parseInt(item?.flag)<= 4"
                  round
                  class="f-10 q-mr-sm"
                  color="dark"
                  text-color="white"
                  icon="icon-mat-print"
                  @click="toPrint(item)"
                >
                  <q-tooltip
                    class="primary"
                    :offset="[10, 10]"
                  >
                    Print resep
                  </q-tooltip>
                </q-btn>

                <!-- selesai -->
                <q-btn
                  v-if="item?.flag==='2' && (item?.semuaresep && item?.semuaracik)"
                  round
                  class="f-10 q-mr-sm"
                  :color="color(item?.flag)"
                  text-color="white"
                  icon="icon-mat-done_all"
                  :disable="store.loadingSelesai && item?.loading"
                  :loading="store.loadingSelesai && item?.loading"
                  @click="store.resepSelesai(item)"
                >
                  <q-tooltip
                    class="primary"
                    :offset="[10, 10]"
                  >
                    Selesai
                  </q-tooltip>
                </q-btn>

                <!-- alasan -->
                <q-btn
                  v-if="((parseInt(item?.flag) === 3 && (!item?.semuaracik || !item?.semuaresep)) || parseInt(item?.flag) === 5 ) "
                  round
                  class="f-10 q-mr-sm"
                  color="primary"
                  text-color="white"
                  icon="icon-mat-edit"
                  :disable="store.loadingTolak && item?.loading"
                  :loading="store.loadingTolak && item?.loading"
                  @click="alasan(item)"
                >
                  <q-tooltip
                    v-if="parseInt(item?.flag) === 3"
                    class="primary"
                    :offset="[10, 10]"
                  >
                    Alasan Resep tidak diberikan semua
                  </q-tooltip>
                  <q-tooltip
                    v-if="parseInt(item?.flag) === 5"
                    class="primary"
                    :offset="[10, 10]"
                  >
                    Alasan Resep Ditolak
                  </q-tooltip>
                </q-btn>
                <!-- buka -->
                <q-btn
                  square
                  class="f-10"
                  color="primary"
                  text-color="white"
                  label="Buka"
                  no-caps
                  @click="buka(item)"
                >
                  <q-tooltip
                    class="primary"
                    :offset="[10, 10]"
                  >
                    Buka Resep Pasien
                  </q-tooltip>
                </q-btn>
                <!-- info -->
                <q-btn
                  square
                  class="f-10"
                  color="yellow"
                  text-color="green"
                  label="Info"
                  no-caps
                  @click="info(item)"
                >
                  <q-tooltip
                    class="primary"
                    :offset="[10, 10]"
                  >
                    Pelayanan Informasi Obat
                  </q-tooltip>
                </q-btn>
                <!-- tolak -->

                <q-btn
                  v-if="(parseInt(item?.flag)<= 2 && (!item?.doneresep && !item?.doneracik)) || item?.flag===''"
                  round
                  class="f-10 q-mx-sm"
                  color="negative"
                  text-color="white"
                  icon="icon-mat-hand-front-left"
                  :disable="store.loadingTolak && item?.loading"
                  :loading="store.loadingTolak && item?.loading"
                  @click="tolakResep(item)"
                >
                  <q-tooltip
                    class="primary"
                    :offset="[10, 10]"
                  >
                    Tolak Resep
                  </q-tooltip>
                </q-btn>
              </div>
              <div v-if="ruangan==='Gd-05010101'" class="row no-wrap q-mt-sm">
                <q-btn
                  dense
                  size="sm"
                  no-caps
                  color="accent"
                  label="PANGGIL"
                  class="q-mb-lg"
                  icon-right="icon-mat-volume_up"
                  style="min-width: 120px;"
                  :loading="loadingCall && store.noreg === item?.noreg"
                  :disable="loadingCall && store.noreg === item?.noreg"
                  @click="panggil( item)"
                />
              </div>
            </td>
            <!-- <td class="text-end">
            <div>
              <q-btn
                icon="icon-mat-send"
                flat
                dense
                size="sm"
                round
                color="primary"
                :loading="store.loadingSend && indexId===item?.id"
                :disable="store.loadingSend && indexId === item?.id"
                @click="send(item?.id)"
              />
            </div>
          </td> -->
          </tr>
          <!-- <tr v-if="item.expand">
            <td colspan="6">
              <div>{{ item }}</div>
            </td>
          </tr> -->
        </template>
      </template>
    </tbody>
  </table>
  <commpIdResep
    ref="idResp"
    v-model="openIdPrint"
    :item="itemPrintId"
    :head="printHeadOnly"
    @close="openIdPrint=false"
  />
</template>

<script setup>
// import { ref } from 'vue'
import { dateFullFormat,dateFull } from 'src/modules/formatter'
import { useEResepDepoFarmasiStore } from 'src/stores/simrs/farmasi/eresep/eresep'
import { usePrintEresepStore } from 'src/stores/simrs/farmasi/eresep/printesep'
import { useRouter } from 'vue-router'
import { defineAsyncComponent, ref } from 'vue'
import { date } from 'quasar'

const store = useEResepDepoFarmasiStore()
const router = useRouter()
defineProps({
  ruangan: {
    type: String,
    default: ''
  },
  loadingCall: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['panggilan'])
function responTime(item){
  const mulai= new Date(item?.tgl_kirim)
  const selesai=new Date(item?.tgl_selesai)  
  let jam=date.getDateDiff(selesai,mulai, 'hours')
  let menit=0
  let detik=0
  const dispJam=jam <= 9 ? '0'+jam:jam
  if(jam>0){
    const setelahJam=date.subtractFromDate(selesai,{hours:jam})    
    menit=date.getDateDiff(setelahJam,mulai, 'minutes')
    // console.log('menit', menit);
    if(menit>0){
    let setelahMinute=date.subtractFromDate(setelahJam,{minutes:menit})      
    detik=date.getDateDiff(setelahMinute,mulai, 'seconds')
    if(detik<0){
      const det=detik
      detik = 60+det
      menit-=1
    }
   }else if(menit<0){
    let setelahMinute=date.subtractFromDate(setelahJam,{minutes:menit})    
      const men=menit
      menit=60+men
      jam-=1
    detik=date.getDateDiff(setelahMinute,mulai, 'seconds')
    if(detik<0){
      const det=detik
      detik = 60+det
      menit-=1
    }
   }else{
    detik=date.getDateDiff(selesai,mulai, 'seconds')
   }
  }else{    
    menit=date.getDateDiff(selesai,mulai, 'minutes')
   if(menit>0){
    const setelahMinute=date.subtractFromDate(selesai,{minutes:menit})
    detik=date.getDateDiff(setelahMinute,mulai, 'seconds')
    if(detik<0){
      const det=detik
      detik = 60+det
      menit-=1
    }
   }else{
    detik=date.getDateDiff(selesai,mulai, 'seconds')
   }
  }
  const dispMen=menit <= 9 ? '0'+menit:menit
  const dispDet=detik <= 9 ? '0'+detik:detik
  // const respon=date.getDateDiff(selesai,mulai, 'minutes')
  // const second=date.getDateDiff(selesai,mulai, 'seconds')
  // console.log('resp time', dispJam);
  return 'Respon Time ' + dispJam + ':' + dispMen+':' + dispDet
}
function panggil (item) {
  emits('panggilan', item)
  store.noreg = item?.noreg
}
// tanggal pelayanan obat start
function setTgl(evt,item,key){
  item[key]=evt
}
function addTglPelayanan(item){
  item.addTglPelayanan=true
}

function saveTglPelayanan(item){
  console.log('item', item);
  store.simpanTglPelayananObat(item).then(()=>{
    item.addTglPelayanan=false  
  })
  
}
// tanggal pelayanan obat end
// const indexId = ref(0)
function status (val) {
  let balik = ' Belum ada status'
  switch (val) {
    case '':
      balik = ' draft (belum dikirimkan)'
      break
    case '1':
      balik = 'Belum diterima'
      break
    case '2':
      balik = 'Siap di kerjakan'
      break
    case '3':
      balik = 'Selesai'
      break
    case '4':
      balik = 'Returned'
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
      balik = 'grey'
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

function buka (val) {
  store.setOpen()
  store.setResep(val)
  // console.log('buka', val)
  // if (val?.expand === undefined) val.expand = true
  // else val.expand = !val.expand
}
function info (val) {
  store.openInfo()
  store.setInfo(val)
}
function alasan (val) {
  store.isAlasan = true
  if (val.flag === '5')store.isTolak = true
  store.toAlasan = val
  console.log(val)
}
function tolakResep (val) {
  store.isAlasan = true
  store.isTolak = true
  store.toAlasan = val
  // store.tolakResep(val)
}
// function send(id) {
//   indexId.value = id
//   store.sendToSatset(id)
// }
const print = usePrintEresepStore()
function toPrint (row) {
  print.setResep(row)
  // console.log('row', row)
  const noresep = row?.noresep
  const routeData = router.resolve({
    path: '/print/eresep',
    query: {
      noresep
    }
  })
  window.open(routeData.href, '_blank')
}
const commpIdResep = defineAsyncComponent(() => import('./PrintIdResep.vue'))
const itemPrintId = ref(null)
const idResp = ref(null)
const openIdPrint = ref(false)
const printHeadOnly = ref(false)

function terimaResep(item){
  store.terimaResep(item)
  printIdResep(item)
}
function printIdResep (val) {
  console.log(val)
  print.setResep(val)
  printHeadOnly.value = false
  itemPrintId.value = print.resep
  openIdPrint.value = true
  setTimeout(() => {
    idResp.value.printPage()
  }, 200)
}
function printHeadResep (val) {
  console.log(val)
  print.setResep(val)
  printHeadOnly.value = true
  itemPrintId.value = print.resep
  openIdPrint.value = true
  setTimeout(() => {
    idResp.value.printPage()
  }, 200)
}
// function closePrintId () {
//   console.log('print id close')
//   openIdPrint.value = false
// }
</script>

<style lang="scss" scoped>

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

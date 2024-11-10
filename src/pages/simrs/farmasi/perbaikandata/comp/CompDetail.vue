<template>
  <q-dialog maximized persistent @show="show()" @hide="hide()">
    <q-card>
      <q-bar class="bg-primary">
        <q-space />

        <q-btn
          v-close-popup
          dense
          flat
          color="white"
          icon="icon-mat-close"
          @click="emits('close')"
        >
          <q-tooltip class="bg-white text-primary">
            Close
          </q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <div class="row justify-end q-pb-sm" style="border-bottom: 1px solid #ccc;">
          <q-btn label="Ambil ulang data" no-caps dense color="primary" @click="store.ambilUlangData(data?.kd_obat)" :loading="store.loadingGetData" :disable="store.loadingGetData" />
        </div>
        <div class="row text-weight-bold q-mb-md f-16" style="border-bottom: 1px solid #ccc;">
          <div class="col-2">
            {{ data.kd_obat }}
          </div>
          <div class="col-2">
            {{ data.nama_obat }}
          </div>
          <div class="col-2">
            Masuk : <span class="text-green">{{ data?.data?.data?.masuk }}</span>
          </div>
          <div class="col-2">
            Keluar : <span class="text-negative">{{ data?.data?.data?.keluar }}</span>
          </div>
          <div class="col-2">
            Sisa : <span :class="parseFloat(data?.data?.data?.sisa).toFixed(2)!==parseFloat(data?.data?.data?.tts).toFixed(2)?'text-negative':'text-green'">{{ data?.data?.data?.sisa }}</span>
          </div>
          <div class="col-2">
            Opname : <span :class="parseFloat(data?.data?.data?.sisa).toFixed(2)!==parseFloat(data?.data?.data?.tts).toFixed(2)?'text-negative':'text-green'">{{ data?.data?.data?.tts }}</span>
          </div>
        </div>
        <div class="row q-py-sm " style="border-bottom: 1px solid #ccc;">
          <div class="col-4 f-16">
            Saldo Awal
          </div>
          <div class="col-8">
            <div class="row bg-dark text-white">
              <div class="col-1">
                No
              </div>
              <div class="col-2">
                Jumlah
              </div>
              <div class="col-2">
                Harga
              </div>
              <div class="col-3">
                Nomor Penerimaaan
              </div>
              <div class="col-2">
                Tgl Penerimaaan
              </div>
              <div class="col-1">
                Nobatch
              </div>
            </div>
            <div v-for="(rinc,i) in data?.data?.data?.saldoAwalRinci" :key="i">
              <div class="row" :class="i%2==0?'bg-grey-2':'bg-grey-4'">
                <div class="col-1">
                  {{ i+1 }}.
                </div>
                <div class="col-2">
                  {{ rinc?.total }}
                </div>
                <div class="col-2">
                  {{ rinc?.harga }}
                </div>
                <div class="col-3">
                  {{ rinc?.nopenerimaan }}
                </div>

                <div class="col-2">
                  {{ dateFull( rinc?.tglpenerimaan) }}
                </div>
                <div class="col-1">
                  {{ rinc?.nobatch }}
                </div>
              </div>
            </div>
            <!-- {{ data?.data?.data?.saldoAwalRinci }} -->
          </div>
        </div>
        <!-- Opnmae -->
        <div class="row q-py-sm items-center" style="border-bottom: 1px solid #ccc;">
          <div class="col-2 text-weight-bold f-16" :class="data?.opnameJml&&data?.opnameTrx?'text-green':'text-negative'">
            Opname :
          </div>
          <div class="col-2">
            <q-btn
              v-if="!editOpname"
              no-caps
              dense
              label="Edit Opname"
              color="primary"
              @click="editOpname=true"
            />
            <q-btn
              v-if="editOpname"
              no-caps
              dense
              label="Simpan Opname"
              color="green"
              :loading="store.loadingFixOpname"
              :disable="store.loadingFixOpname"
              @click="simpanOpname()"
            />
          </div>
          <div v-if="editOpname" class="col-8">
            <div class="row bg-dark text-white">
              <div class="col-1">
                Opname
              </div>
              <div class="col-2">
                Jumlah Sekarang
              </div>
              <div class="col-2">
                Selisih
              </div>
              <div class="col-2">
                #
              </div>
            </div>
            <div class="row items-center">
              <div class="col-1">
                {{ data?.data?.data?.tts }}
              </div>
              <div class="col-2">
                {{ data?.data?.data?.cekOpname?.opname.reduce((total, item) => total + parseFloat(item.jumlah), 0) }}
              </div>
              <div class="col-2">
                {{ parseFloat(data?.data?.data?.tts) - data?.data?.data?.cekOpname?.opname.reduce((total, item) => total + parseFloat(item.jumlah), 0) }}
              </div>
              <div class="col-2">
                <q-btn
                  class="q-pa-none"
                  no-caps
                  dense
                  label="Auto Fix"
                  color="orange"
                  :loading="store.loadingFixOpname"
                  :disable="store.loadingFixOpname"
                  @click="autoFix()"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row q-py-sm" style="border-bottom: 1px solid #ccc;">
          <div class="col-auto per-dua">
            <div class="text-weight-bold">
              Data Opname
            </div>
            <div class="row bg-dark text-white">
              <div class="col-auto" style="width: 5%;">
                No
              </div>
              <div class="col-2">
                Jumlah
              </div>
              <div class="col-1">
                Harga
              </div>
              <div class="col-4">
                Nomor Penerimaaan
              </div>
              <div class="col-3">
                Tgl Penerimaaan
              </div>
              <div class="col-1">
                Nobatch
              </div>
            </div>
            <div v-for="(opnm,i) in data?.data?.data?.cekOpname.opname" :key="i">
              <div class="row items-center" :class="i%2==0?'bg-grey-2':'bg-grey-4'">
                <div class="col-auto" style="width: 5%;">
                  {{ i+1 }}.
                </div>
                <div class="col-2">
                  <div v-if="!editOpname">
                    {{ opnm?.jumlah }}
                  </div>
                  <div v-if="editOpname">
                    <app-input v-model="opnm.jumlah" label="Jumlah" outlined valid />
                  </div>
                </div>
                <div class="col-1">
                  {{ opnm?.harga }}
                </div>
                <div class="col-4">
                  {{ opnm?.nopenerimaan }}
                </div>
                <div class="col-3">
                  {{ dateFull( opnm?.tglpenerimaan) }}
                </div>
                <div class="col-1">
                  {{ opnm?.nobatch }}
                </div>
              </div>
            </div>
            <!-- <div v-if="editOpname" class="row justify-center">
              <q-btn icon="icon-mat-add_circle" color="primary" dense flat @click="addRow()">
                <q-tooltip>Tambah Row</q-tooltip>
              </q-btn>
            </div> -->
          </div>
          <div class="col-auto per-dua">
            <div class="text-weight-bold">
              Data Penerimaan
            </div>
            <div class="row bg-dark text-white">
              <div class="col-auto" style="width: 5%;">
                No
              </div>
              <div class="col-1">
                Jumlah
              </div>
              <div class="col-2">
                Harga
              </div>
              <div class="col-4">
                Nomor Penerimaaan
              </div>
              <div class="col-3">
                Tgl Penerimaaan
              </div>
              <div class="col-1">
                Nobatch
              </div>
            </div>
            <div v-for="(perbaikan,i) in data?.data?.data?.cekOpname.penerimaan" :key="i">
              <div class="row items-center" :class="i%2==0?'bg-grey-2':'bg-grey-4'">
                <div class="col-auto" style="width: 5%;">
                  {{ i+1 }}.
                </div>
                <div class="col-1">
                  {{ perbaikan?.jml_terima_k }}
                </div>
                <div class="col-2">
                  {{ perbaikan?.harga_netto_kecil }}
                </div>
                <div class="col-4">
                  {{ perbaikan?.nopenerimaan }}
                </div>
                <div class="col-3">
                  {{ dateFull( perbaikan?.tglpenerimaan) }}
                </div>
                <div class="col-1">
                  {{ perbaikan?.no_batch }}
                </div>
              </div>
            </div>
          </div>
          <!-- {{ data?.data?.data?.cekOpname }} -->
        </div>
        <!-- Transaksi -->
        <div class="row q-py-sm items-center" style="border-bottom: 1px solid #ccc;">
          <div class="col-2 text-weight-bold f-16" :class="data?.trxKurang&&data?.trxLebih&&data?.trxSesuai?'text-green':'text-negative'">
            Transaksi :
          </div>
          <div v-if="mutSaja.includes(store.params.kdruang)" class="col-2">
            <q-btn
              no-caps
              dense
              label="Auto Fix Mutasi"
              color="orange"
              :loading="store.loadingFixMutasi"
              :disable="store.loadingMutasi || store.loadingFixMutasi"
              @click="autofixMutasi()"
            />
          </div>
          <div v-if="mutSaja.includes(store.params.kdruang)" class="col-2">
            <q-btn
              no-caps
              dense
              label="List Mutasi"
              color="primary"
              :loading="store.loadingMutasi"
              :disable="store.loadingMutasi || store.loadingFixMutasi"
              @click="listMutasi()"
            />
          </div>
          <div v-if="!mutSaja.includes(store.params.kdruang)" class="col-2">
            <q-btn
              no-caps
              dense
              label="Autofix Resep"
              color="orange"
              :loading="store.loadingFixOpname"
              :disable="store.loadingFixOpname"
              @click="autoFixResep()"
            />
          </div>
        </div>
        <!-- mutasi saja, gudang, depo FS -->
        <div v-if="mutSaja.includes(store.params.kdruang)" class="row q-py-sm" style="border-bottom: 1px solid #ccc;">
          <div class="col-auto per-tiga">
            <div class="text-weight-bold">
              Transaksi Kurang
            </div>
            <div class="row bg-dark text-white">
              <div class="col-auto" style="width: 7%;">
                No
              </div>
              <div class="col-6" style="width: 45%;">
                Nomor Penerimaaan
              </div>
              <div class="col-auto" style="width: calc(48% / 4)">
                Masuk
              </div>
              <div class="col-auto" style="width: calc(48% / 4)">
                Keluar
              </div>
              <div class="col-auto" style="width: calc(48% / 4)">
                Diff
              </div>
              <div class="col-auto" style="width: calc(48% / 4)">
                Op
              </div>
            </div>
            <div v-for="(mut,i) in data?.data?.data?.penLeb" :key="i">
              <div class="row items-center" :class="i%2==0?'bg-grey-2':'bg-grey-4'">
                <div class="col-auto" style="width: 7%;">
                  {{ i+1 }}
                </div>
                <div class="col-auto" style="width: 45%;">
                  {{ mut?.noper }}
                </div>
                <div class="col-auto" style="width: calc(48% / 4)">
                  {{ mut?.maSuk }}
                </div>
                <div class="col-auto" style="width: calc(48% / 4)">
                  {{ mut?.keLuar }}
                </div>
                <div class="col-auto" style="width: calc(48% / 4)">
                  {{ mut?.sts }}
                </div>
                <div class="col-auto" style="width: calc(48% / 4)">
                  {{ mut?.stOpnya }}
                </div>
              </div>
            </div>
          </div>
          <div class="col-auto per-tiga">
            <div class="text-weight-bold">
              Transaksi Lebih
            </div>
            <div class="row bg-dark text-white">
              <div class="col-auto" style="width: 7%;">
                No
              </div>
              <div class="col-6" style="width: 45%;">
                Nomor Penerimaaan
              </div>
              <div class="col-auto" style="width: calc(48% / 4)">
                Masuk
              </div>
              <div class="col-auto" style="width: calc(48% / 4)">
                Keluar
              </div>
              <div class="col-auto" style="width: calc(48% / 4)">
                Diff
              </div><div class="col-auto" style="width: calc(48% / 4)">
                Op
              </div>
            </div>
            <div v-for="(mut,i) in data?.data?.data?.penKur" :key="i">
              <div class="row items-center" :class="i%2==0?'bg-grey-2':'bg-grey-4'">
                <div class="col-auto" style="width: 7%;">
                  {{ i+1 }}
                </div>
                <div class="col-auto" style="width: 45%;">
                  {{ mut?.noper }}
                </div>
                <div class="col-auto" style="width: calc(48% / 4)">
                  {{ mut?.maSuk }}
                </div>
                <div class="col-auto" style="width: calc(48% / 4)">
                  {{ mut?.keLuar }}
                </div>
                <div class="col-auto" style="width: calc(48% / 4)">
                  {{ mut?.sts }}
                </div>
                <div class="col-auto" style="width: calc(48% / 4)">
                  {{ mut?.stOpnya }}
                </div>
              </div>
            </div>
          </div>
          <div class="col-auto per-tiga">
            <div class="text-weight-bold">
              Transaksi Pas
            </div>
            <div class="row bg-dark text-white">
              <div class="col-auto" style="width: 7%;">
                No
              </div>
              <div class="col-6" style="width: 45%;">
                Nomor Penerimaaan
              </div>
              <div class="col-auto" style="width: calc(48% / 4)">
                Masuk
              </div>
              <div class="col-auto" style="width: calc(48% / 4)">
                Keluar
              </div>
              <div class="col-auto" style="width: calc(48% / 4)">
                Diff
              </div><div class="col-auto" style="width: calc(48% / 4)">
                Op
              </div>
            </div>
            <div v-for="(mut,i) in data?.data?.data?.penPas" :key="i">
              <div class="row items-center" :class="i%2==0?'bg-grey-2':'bg-grey-4'">
                <div class="col-auto" style="width: 7%;">
                  {{ i+1 }}
                </div>
                <div class="col-auto" style="width: 45%;">
                  {{ mut?.noper }}
                </div>
                <div class="col-auto" style="width: calc(48% / 4)">
                  {{ mut?.maSuk }}
                </div>
                <div class="col-auto" style="width: calc(48% / 4)">
                  {{ mut?.keLuar }}
                </div>
                <div class="col-auto" style="width: calc(48% / 4)">
                  {{ mut?.sts }}
                </div>
                <div class="col-auto" style="width: calc(48% / 4)">
                  {{ mut?.stOpnya }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!mutSaja.includes(store.params.kdruang)" class="row q-py-sm" style="border-bottom: 1px solid #ccc;">
          Ada resep
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { dateFull } from 'src/modules/formatter'
import { usePerbaikanDataFarmasiStore } from 'src/stores/simrs/farmasi/perbaikandata/perbaikandata'
import { ref } from 'vue'
const store = usePerbaikanDataFarmasiStore()
const emits = defineEmits(['close', 'fixMutasi'])
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  data: { type: Object, default: () => {} }
})

/**
 * opname section
 */

const editOpname = ref(false)
function simpanOpname () {
  editOpname.value = false
  store.perbaikanDataOpname(props.data.kd_obat)
}
function autoFix () {
  const cekOpname = props?.data?.data?.data?.cekOpname
  const salAw = props.data?.data?.data?.saldoAwalRinci
  const jmlPenerimaan = cekOpname?.penerimaan.reduce((prev, curr) => prev + parseFloat(curr.jml_terima_k), 0)
  const jmlSalAwal = salAw.reduce((prev, curr) => prev + parseFloat(curr.total), 0)
  const sisaSaldoAwal = cekOpname?.jmlOp - jmlPenerimaan
  console.log('autofix', jmlPenerimaan, sisaSaldoAwal, jmlSalAwal, props?.data?.data?.data?.cekOpname, salAw)

  let opname = sisaSaldoAwal > 0 ? jmlPenerimaan : cekOpname?.jmlOp
  // nol kan semua opname

  cekOpname.opname.forEach((item) => {
    item.jumlah = 0
  })
  let indexTambahan = 0
  const jumsalAw = sisaSaldoAwal
  if (sisaSaldoAwal > 0) {
    salAw?.forEach((item, i) => {
      if (jumsalAw > 0) {
        const jumlah = jumsalAw > item?.total ? item?.total : jumsalAw
        cekOpname.opname[i].nopenerimaan = item?.nopenerimaan
        cekOpname.opname[i].jumlah = jumlah
        cekOpname.opname[i].tglexp = item?.tglexp
        cekOpname.opname[i].nobatch = item?.nobatch
        cekOpname.opname[i].tglpenerimaan = item?.tglpenerimaan
        cekOpname.opname[i].harga = item?.harga
        indexTambahan = i + 1
      }
    })
  }
  const tglopname = cekOpname?.opname[0]?.tglopname
  const kdobat = cekOpname?.opname[0]?.kdobat
  const kdruang = store.params.kdruang
  cekOpname?.penerimaan?.forEach((item, i) => {
    const index = sisaSaldoAwal > 0 ? i + indexTambahan : i
    if (opname > 0) {
      const jumlah = opname > item?.jml_terima_k ? item?.jml_terima_k : opname
      if (cekOpname.opname[index] !== undefined) {
        cekOpname.opname[index].nopenerimaan = item?.nopenerimaan
        cekOpname.opname[index].jumlah = jumlah
        cekOpname.opname[index].tglexp = item?.tgl_exp
        cekOpname.opname[index].nobatch = item?.no_batch
        cekOpname.opname[index].tglpenerimaan = item?.tglpenerimaan
        cekOpname.opname[index].harga = item?.harga_netto_kecil
        console.log('if', cekOpname.opname[index])
      }
      else {
        const cari = store.items.find(x => x.kdobat === item?.kdobat)
        if (cari?.data?.data?.cekOpname?.opname) {
          const temp = {
            id: null,
            nopenerimaan: item?.nopenerimaan,
            jumlah,
            tglexp: item?.tgl_exp,
            nobatch: item?.no_batch,
            tglpenerimaan: item?.tglpenerimaan,
            tglopname,
            kdobat,
            kdruang,
            harga: item?.harga_netto_kecil
          }
          cari.data.data.cekOpname.opname.push(temp)
        }
        // console.log('else', cari?.data?.data?.cekOpname)

        // props.data.data.data.cekOpname.opname.push(temp)
      }

      opname = opname - jumlah
    }
    console.log('item', item, cekOpname?.opname[index], opname)
  })
}
/**
 * opname section end
 */

/**
 * transaction section
 */
const mutSaja = ref(['Gd-05010100', 'Gd-03010100', 'Gd-03010101'])
function listMutasi () {
  store.openMutasi = true
  store.getDetailMutasi(props.data.kd_obat)
}
function autofixMutasi () {
  // editTransaction.value = false

  emits('fixMutasi', props.data?.kd_obat)
}
function autoFixResep () {
  // editTransaction.value = false
}

/**
 * transaction section end
 */

function show () {
  editOpname.value = false
}
function hide () {
  editOpname.value = false
}
</script>
<style lang="scss" scoped>
.per-empat{
  width: 24%;
  margin-left: 5px;
}
.per-tiga{
  width: 32.7%;
  margin-left: 5px;
}
.per-dua{
  width: 49%;
  margin-left: 5px;
}
</style>

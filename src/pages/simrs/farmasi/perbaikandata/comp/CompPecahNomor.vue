<template>
  <q-dialog persistent @show="show()" @hide="hide()">
    <q-card style="width: 700px; height: 90vh; max-width: 90vw;" ref="refListRes">
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
        <div class="row text-weight-bold f-16 q-mb-md">
          Form Pecah Nomor
        </div>
        <div class="row text-weight-bold f-14 q-mb-xs">
          Nomor Penerimaan Kurang Transaksi
        </div>
        <div class="row items-center bg-dark text-white">
          <div class="col-auto" style="width: 5%;">
            No
          </div>
          <div class="col-3">
            Nopenerimaan
          </div>
          <div class="col-1">
            Masuk
          </div>
          <div class="col-1">
            Keluar
          </div>
          <div class="col-1">
            Diff
          </div>
          <div class="col-1">
            Opname
          </div>
          <div class="col-1">
            Kurang
          </div>
          <div class="col-2">
            Rinc Keluar
          </div>
        </div>

        <div v-for="(ku,i) in kur" :key="i">
          <div class="row items-center " :class="(i%2==0?'bg-grey-2':'bg-grey-4') + ' '+ (i==0)?'bg-light-blue-2':''">
            <div class="col-auto" style="width: 5%;">
              {{ i+1 }}
            </div>
            <div class="col-3">
              {{ ku?.noper }}
            </div>
            <div class="col-1">
              {{ ku?.maSuk }}
            </div>
            <div class="col-1">
              {{ ku?.keLuar }}
            </div>
            <div class="col-1">
              {{ ku?.sts }}
            </div>
            <div class="col-1">
              {{ ku?.stOpnya }}
            </div>
            <div class="col-1">
              {{ ku?.sisanyaPeng }}
            </div>
            <div class="col-2">
              <div class="row">
                Mutasi : {{ ku?.keluarnya?.mutKel }}
              </div>
              <div class="row">
                Resep : {{ ku?.keluarnya?.resepNRac }}
              </div>
              <div class="row">
                Resep Rac : {{ ku?.keluarnya?.resepRac }}
              </div>
              <div class="row">
                Retur : {{ ku?.keluarnya?.retGud }}
              </div>
            </div>
          </div>
        </div>

        <div v-if="tipe != 'mutasi'">
          <div
            class="row q-mt-md q-mb-xs text-weight-bold f-14"
            :class="parseFloat(newData?.reduce((a, b) => a + parseFloat(b.jumlah), 0)) != parseFloat(data?.jumlah) ? 'bg-negative text-white' : ''"
          >
            <div class="col-3">
              Data Resep
            </div>
            <div class="col-3">
              Maksimal jumlah : {{ data?.jumlah }}
            </div>
            <div class="col-3">
              Jumlah Sekarang: {{ newData?.reduce((a, b) => a + parseFloat(b.jumlah), 0) }}
            </div>
          </div>
          <div class="row items-center bg-dark text-white">
            <div class="col-auto" style="width: 5%;">
              No
            </div>
            <div class="col-3">
              Noresep
            </div>
            <div class="col-3">
              Nopenerimaan
            </div>
            <div class="col-2">
              Jumlah
            </div>
            <div class="col-2">
              Harga Beli
            </div>
          </div>
          <div v-for="(ku,i) in newData" :key="i">
            <div class="row items-center q-my-xs" :class="(i%2==0?'bg-grey-2':'bg-grey-4')">
              <div class="col-auto" style="width: 5%;">
                {{ i+1 }}
              </div>
              <div class="col-3">
                {{ ku?.noresep }}
              </div>
              <div class="col-3">
                {{ ku?.nopenerimaan }}
              </div>
              <div class="col-2">
                <app-input v-model="ku.jumlah" label="Jumlah" outlined />
              </div>
              <div class="col-2">
                {{ ku?.harga_beli }}
              </div>
            </div>
          </div>
        </div>
        <div v-if="tipe == 'mutasi'">
          <div
            class="row q-mt-md q-mb-xs text-weight-bold f-14"
            :class="parseFloat(newData?.reduce((a, b) => a + parseFloat(b.jumlah), 0)) != parseFloat(data?.jumlah) ? 'bg-negative text-white' : ''"
          >
            <div class="col-3">
              Mutasi
            </div>
            <div class="col-3">
              Maksimal jumlah : {{ data?.jml }}
            </div>
            <div class="col-3">
              Jumlah Sekarang: {{ newData?.reduce((a, b) => a + parseFloat(b.jml), 0) }}
            </div>
          </div>
          <div class="row items-center bg-dark text-white">
            <div class="col-auto" style="width: 5%;">
              No
            </div>
            <div class="col-3">
              Nopermintaan
            </div>
            <div class="col-3">
              Nopenerimaan
            </div>
            <div class="col-2">
              Jumlah
            </div>
            <div class="col-2">
              Harga
            </div>
            <div class="col-2">
              Nobatch
            </div>
          </div>
          <div v-for="(ku,i) in newData" :key="i">
            <div class="row items-center q-my-xs" :class="(i%2==0?'bg-grey-2':'bg-grey-4')">
              <div class="col-auto" style="width: 5%;">
                {{ i+1 }}
              </div>
              <div class="col-3">
                {{ ku?.no_permintaan }}
              </div>
              <div class="col-3">
                {{ ku?.nopenerimaan }}
              </div>
              <div class="col-2">
                <app-input v-model="ku.jml" label="Jumlah" outlined />
              </div>
              <div class="col-2">
                {{ ku?.harga }}
              </div>
              <div class="col-2">
                {{ ku?.no_batch }}
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-end q-mr-md q-mt-md">
          <q-btn label="Simpan Pecah Nomor" no-caps color="primary" @click="emits('simpan',{data:newData,tipe:tipe,kdobat:kdobat})" v-close-popup />
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row q-mt-md q-mb-xs text-weight-bold f-16">
          Form Ganti Nomor Penerimaan
        </div>
        <div class="row q-mt-md q-mb-xs text-weight-bold f-14">
          Target Nomor Penerimaan
        </div>
        <div class="row items-center bg-dark text-white">
          <div class="col-auto" style="width: 5%;">
            No
          </div>
          <div class="col-4">
            Nopenerimaan
          </div>
          <div class="col-2">
            Bisa diubah
          </div>
          <div class="col-2">
            #
          </div>
        </div>
        <div v-for="(tar) in targetData" :key="tar">
          <div v-for="(ku,i) in tar.targets" :key="i">
            <div class="row items-center q-my-xs" :class="(i%2==0?'bg-grey-2':'bg-grey-4')">
              <div class="col-auto" style="width: 5%;">
                {{ i+1 }}
              </div>
              <div class="col-4">
                {{ ku?.noper }}
              </div>
              <div class="col-2">
                {{ ku?.boleh }}
              </div>
              <div class="col-2">
                <q-radio v-model="targetNoper" :val="ku?.noper" dense />
              </div>
            </div>
          </div>
        </div>
        <div v-if="tipe != 'mutasi'">
          <div
            class="row q-mt-md q-mb-xs text-weight-bold f-14"
          >
            <div class="col-3">
              Data Resep
            </div>
          </div>
          <div class="row items-center bg-dark text-white">
            <div class="col-3">
              Noresep
            </div>
            <div class="col-4">
              Nopenerimaan
            </div>
            <div class="col-2">
              Jumlah
            </div>
            <div class="col-2">
              Harga Beli
            </div>
          </div>

          <div class="row items-center q-my-xs">
            <div class="col-3">
              {{ gantiData?.noresep }}
            </div>
            <div class="col-4">
              {{ gantiData?.nopenerimaan }}
            </div>
            <div class="col-2">
              {{ gantiData.jumlah }}
            </div>
            <div class="col-2">
              {{ gantiData?.harga_beli }}
            </div>
          </div>
        </div>
        <div v-if="tipe == 'mutasi'">
          <div
            class="row q-mt-md q-mb-xs text-weight-bold f-14"
          >
            <div class="col-3">
              Mutasi
            </div>
          </div>
          <div class="row items-center bg-dark text-white">
            <div class="col-3">
              Nopermintaan
            </div>
            <div class="col-4">
              Nopenerimaan
            </div>
            <div class="col-2">
              Jumlah
            </div>
            <div class="col-2">
              Harga
            </div>
            <div class="col-2">
              Nobatch
            </div>
          </div>
          <div class="row items-center q-my-xs">
            <div class="col-3">
              {{ gantiData?.no_permintaan }}
            </div>
            <div class="col-4">
              {{ gantiData?.nopenerimaan }}
            </div>
            <div class="col-2">
              {{ gantiData.jml }}
            </div>
            <div class="col-2">
              {{ gantiData?.harga }}
            </div>
            <div class="col-2">
              {{ gantiData?.no_batch }}
            </div>
          </div>
        </div>
        <div class="row justify-end q-mr-md q-my-md">
          <q-btn label="Ganti Nomor Penerimaan" no-caps color="primary" @click="emits('ganti',{id:gantiData?.id,data:gantiData,tipe:tipe,kdobat:kdobat,targetNoper:targetNoper})" v-close-popup />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'

const emits = defineEmits(['close', 'simpan', 'ganti'])
const props = defineProps({
  data: { type: Object, default: () => {} },
  kur: { type: Object, default: () => {} },
  eksekusi: { type: Object, default: () => {} },
  tipe: { type: String, default: '' },
  kdobat: { type: String, default: '' }
})
const newData = ref([])
const gantiData = ref({})
const targetData = ref([])
const targetNoper = ref('')
function show () {
  console.log('eksekusi', props.eksekusi)
  let ret = []
  if (props.tipe === 'mutasi') {
    if (props.eksekusi?.retResep) ret = props.eksekusi?.retResep
    else ret = props.eksekusi?.retMutasi
  }
  else ret = props.eksekusi?.retResep
  targetData.value = ret
  const target = ret[0]?.targetJumlah ?? 0
  const jumlahBaru = props.data.jumlah - target
  const jmlBaru = props.data.jml - target
  const maxJumlah = props.data.jumlah - jumlahBaru
  const maxJml = props.data.jml - jmlBaru
  console.log('target', targetData.value)

  gantiData.value = props.data
  if (props.tipe === 'racikan') {
    newData.value.push({
      id: props.data.id, // id nya untuk data lama jangan lupa dibawa
      harga_beli: props.data.harga_beli,
      harga_jual: props.data.harga_jual,
      hpp: props.data.hpp,
      jumlah: jumlahBaru, // jumlah nya diganti
      jumlahdibutuhkan: props.data.jumlahdibutuhkan,
      kdobat: props.data.kdobat,
      keterangan_bypass: props.data.keterangan_bypass,
      namaracikan: props.data.namaracikan,
      nilai_r: props.data.nilai_r,
      nopenerimaan: props.data.nopenerimaan,
      noreg: props.data.noreg,
      noresep: props.data.noresep,
      satuan_racik: props.data.satuan_racik,
      tiperacikan: props.data.tiperacikan,
      user: props.data.user
    })
    newData.value.push({
      id: null,
      harga_beli: props.data.harga_beli,
      harga_jual: props.data.harga_jual,
      hpp: props.data.hpp,
      jumlah: maxJumlah, // jumlah nya diganti
      jumlahdibutuhkan: props.data.jumlahdibutuhkan,
      kdobat: props.data.kdobat,
      keterangan_bypass: props.data.keterangan_bypass,
      namaracikan: props.data.namaracikan,
      nilai_r: props.data.nilai_r,
      nopenerimaan: props.data.nopenerimaan,
      noreg: props.data.noreg,
      noresep: props.data.noresep,
      satuan_racik: props.data.satuan_racik,
      tiperacikan: props.data.tiperacikan,
      user: props.data.user
    })
  }
  else if (props.tipe === 'resep') {
    newData.value.push({
      id: props.data.id, // id nya untuk data lama jangan lupa dibawa
      jumlah: jumlahBaru, // jumlah nya diganti
      noreg: props.data.noreg,
      noresep: props.data.noresep,
      kdobat: props.data.kdobat,
      kandungan: props.data.kandungan,
      fornas: props.data.fornas,
      forkit: props.data.forkit,
      generik: props.data.generik,
      kode108: props.data.kode108,
      uraian108: props.data.uraian108,
      kode50: props.data.kode50,
      uraian50: props.data.uraian50,
      nopenerimaan: props.data.nopenerimaan,
      harga_beli: props.data.harga_beli,
      hpp: props.data.hpp,
      harga_jual: props.data.harga_jual,
      nilai_r: props.data.nilai_r,
      aturan: props.data.aturan,
      konsumsi: props.data.konsumsi,
      keterangan: props.data.keterangan,
      user: props.data.user,
      keterangan_bypass: props.data.keterangan_bypass
    })
    newData.value.push({
      id: null,
      jumlah: maxJumlah, // jumlah nya diganti
      noreg: props.data.noreg,
      noresep: props.data.noresep,
      kdobat: props.data.kdobat,
      kandungan: props.data.kandungan,
      fornas: props.data.fornas,
      forkit: props.data.forkit,
      generik: props.data.generik,
      kode108: props.data.kode108,
      uraian108: props.data.uraian108,
      kode50: props.data.kode50,
      uraian50: props.data.uraian50,
      nopenerimaan: props.data.nopenerimaan,
      harga_beli: props.data.harga_beli,
      hpp: props.data.hpp,
      harga_jual: props.data.harga_jual,
      nilai_r: props.data.nilai_r,
      aturan: props.data.aturan,
      konsumsi: props.data.konsumsi,
      keterangan: props.data.keterangan,
      user: props.data.user,
      keterangan_bypass: props.data.keterangan_bypass
    })
  }
  else if (props.tipe === 'mutasi') {
    newData.value.push({
      id: props.data.id, // id nya untuk data lama jangan lupa dibawa
      jml: jmlBaru, // jumlah nya diganti
      no_permintaan: props.data.no_permintaan,
      nopenerimaan: props.data.nopenerimaan,
      kd_obat: props.data.kd_obat,
      tglpenerimaan: props.data.tglpenerimaan,
      harga: props.data.harga,
      tglexp: props.data.tglexp,
      nobatch: props.data.nobatch
    })
    newData.value.push({
      id: null,
      jml: maxJml, // jumlah nya diganti
      no_permintaan: props.data.no_permintaan,
      nopenerimaan: props.data.nopenerimaan,
      kd_obat: props.data.kd_obat,
      tglpenerimaan: props.data.tglpenerimaan,
      harga: props.data.harga,
      tglexp: props.data.tglexp,
      nobatch: props.data.nobatch
    })
  }
}

function hide () {
  newData.value = []
  gantiData.value = {}
  targetData.value = []
  targetNoper.value = ''
}
</script>

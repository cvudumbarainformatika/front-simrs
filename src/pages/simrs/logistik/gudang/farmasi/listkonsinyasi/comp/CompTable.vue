<template>
  <div class="bg-white q-mt-md q-pa-sm">
    <div class="row text-weight-bold f-14 q-py-sm">
      Daftar Barang Terpakai
    </div>
    <div class="row items-center no-wrap text-weight-bold" style="border: 1px solid black;">
      <div class="col-shrink" style="width: 5%;">
        No
      </div>
      <div class="col-auto" :style="`width: calc(90% / 5);`">
        Resep
      </div>
      <div class="col-auto" :style="`width: calc(90% / 5);`">
        Barang
      </div>
      <div class="col-auto" :style="`width: calc(90% / 5);`">
        Penerimaan
      </div>
      <div class="col-auto" :style="`width: calc(90% / 5);`">
        Pemakaian
      </div>
      <div class="col-auto" :style="`width: calc(90% / 5);`">
        Subtotal
      </div>
      <div class="col-auto text-right" style="width: 5%;">
        <div class="q-mr-sm">
          <q-checkbox
            v-model="allChecked"
            size="xs"
          >
            <q-tooltip
              anchor="top middle"
              self="center middle"
            >
              {{ allChecked===true?'Tidak Pilih Semua':'Pilih Semua' }}
            </q-tooltip>
          </q-checkbox>
        </div>
      </div>
    </div>
    <div v-for="(item,i) in store.items" :key="item">
      <div class="row items-center no-wrap tlr">
        <div class="col-shrink" style="width: 5%;">
          <div class="q-pl-xs">
            {{ i+1 }}
          </div>
        </div>
        <div class="col-auto" :style="`width: calc(90% / 5);`">
          <div class="row">
            {{ item?.header?.resep?.noresep }}
          </div>
          <div class="row text-italic f-10">
            {{ item?.header?.resep?.dokter?.nama }}
          </div>
        </div>
        <div class="col-auto" :style="`width: calc(90% / 5);`">
          <div class="row">
            {{ item?.obat?.nama_obat }}
          </div>
          <!-- <div class="row text-italic f-10">
            ({{ item?.obat?.satuan_k }})
          </div> -->
        </div>
        <div class="col-auto" :style="`width: calc(90% / 5);`">
          <div class="row">
            {{ item?.nopenerimaan }}
          </div>
          <div class="row text-italic f-10">
            {{ dateFullFormat( item?.penerimaan?.header?.tglpenerimaan)??'-' }}
          </div>
          <div class="row ">
            PPN : {{ item?.penerimaan?.ppn??0 }} %
          </div>
          <div class="row ">
            Diskon : {{ item?.penerimaan?.diskon??0 }} %
          </div>
        </div>
        <div class="col-auto" :style="`width: calc(90% / 5);`">
          <div class="row">
            {{ item?.header?.resep?.datapasien?.rs2 }}
          </div>
          <div class="row justify-end">
            {{ item?.jumlah_resep }} ({{ item?.obat?.satuan_k }})
          </div>
          <div class="row justify-end">
            {{ formatDouble( item?.reseprinci?.harga_beli,2) }}
          </div>
        </div>
        <div class="col-auto" :style="`width: calc(90% / 5);`">
          <div class="row justify-end">
            {{ formatDouble(item?.subtotal,2) }}
          </div>
        </div>
        <div class="col-auto" style="width: 5%;">
          <div class="row justify-end">
            <div class="q-pr-xs">
              <q-checkbox
                v-model="item.checked"
                size="xs"
                @update:model-value="setCheck($event, item)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-end q-mr-md q-mt-md q-mb-xl">
      <q-btn label="Simpan" no-caps dense color="primary" @click="simpan" />
    </div>
  </div>
</template>
<script setup>
import { date } from 'quasar'
import { computed } from 'vue'
import { dateFullFormat, formatDouble } from 'src/modules/formatter'
import { useListPemakaianObatKonsinyasiStore } from 'src/stores/simrs/farmasi/konsinyasi/listkonsinyasi'
// eslint-disable-next-line no-unused-vars
import { notifErrVue } from 'src/modules/utils'
const store = useListPemakaianObatKonsinyasiStore()
const allChecked = computed({
  get () {
    const check = store.items.filter(it => it.checked)
    // console.log(check.length)
    if (check.length === store.items.length) return true
    else if (check.length <= 0) return false
    else return null
  },
  set (val) {
    if (val === true) {
      store.items.forEach(it => {
        it.checked = true
        setCheck(true, it)
      })
    }
    else {
      store.items.forEach(it => {
        it.checked = false
        setCheck(false, it)
      })
    }
    // console.log('set', val)
  }
})
function setCheck (evt, item) {
  // console.log('ref')
  // console.log('evt', evt)
  // console.log('item', item)
  if (item.checked) {
    // item.dipakai = item.dipakai ?? 0
    const temp = {
      nopermintaan: item?.nopermintaan,
      nopenerimaan: item?.nopenerimaan,
      kdobat: item?.kd_obat,
      tgl_pakai: item?.header?.resep?.tgl_permintaan,
      tgl_penerimaan: item?.penerimaan?.header?.tglpenerimaan,
      noresep: item?.noresep,
      dokter: item?.header?.resep?.dokter?.kdpegsimrs,
      noreg: item?.header?.noreg,
      norm: item?.header?.norm,
      jumlah: item?.reseprinci?.jumlah,
      harga: item?.penerimaan?.harga_kcl,
      diskon: item?.penerimaan?.diskon,
      ppn: item?.penerimaan?.ppn,
      diskon_rp: item?.penerimaan?.diskon_rp_kecil,
      ppn_rp: item?.penerimaan?.ppn_rp_kecil,
      harga_net: item?.penerimaan?.harga_netto_kecil,
      subtotal: item?.subtotal

    }

    store.form.items.push(temp)
  }
  else {
    // console.log('not checked', store.form)
    const index = store.form.items.findIndex(a => a.kdobat === item.kdobat && a.noresep === item.noresep)
    // console.log('not checked', index)
    if (index >= 0) store.form.items.splice(index, 1)
  }
}
function simpan () {
  if (store.form.items.length <= 0) return notifErrVue('Belum Ada Barang yang dipilih')
  const tlg = store.form.tgl
  const hrs = date.formatDate(Date.now(), ' HH:mm:ss')
  const jumlahKonsi = store.form?.items?.map(m => m.subtotal)?.reduce((a, b) => a + b, 0)
  store.setForm('tgl_trans', tlg + hrs)
  store.setForm('jumlah_konsi', jumlahKonsi)
  console.log('simpan', store.form)
  store.simpanList()
}
</script>
<style lang="scss" scoped>
.tlr{
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
}
</style>

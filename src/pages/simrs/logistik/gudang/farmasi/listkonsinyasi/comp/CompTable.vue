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
          #
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
          <div class="row text-italic f-10">
            ({{ item?.obat?.satuan_k }})
          </div>
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
            {{ item?.jumlah_resep }}
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
    <div class="row justify-end q-mr-md q-mt-md">
      <q-btn label="Simpan" no-caps dense color="primary" @click="simpan" />
    </div>
  </div>
</template>
<script setup>
import { dateFullFormat, formatDouble } from 'src/modules/formatter'
import { useListPemakaianObatKonsinyasiStore } from 'src/stores/simrs/farmasi/konsinyasi/listkonsinyasi'
const store = useListPemakaianObatKonsinyasiStore()
function setCheck (evt, item) {
  // console.log('ref')
  // console.log('evt', evt)
  // console.log('item', item)
  if (item.checked) {
    // item.dipakai = item.dipakai ?? 0
    store.form.items.push(item)
  }
  else {
    console.log('not checked', store.form)
    const index = store.form.items.findIndex(a => a.id === item.id)
    if (index >= 0) store.form.items.splice(index, 1)
  }
}
function simpan () {
  console.log('simpan', store.form)
}
</script>
<style lang="scss" scoped>
.tlr{
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
}
</style>

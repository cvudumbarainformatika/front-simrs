<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="f-14 text-weight-bold">
          Distribusi Depo
        </div>
        <div class="title-desc">
          Halaman Distribusi ke Depo
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="row items-center">
          <div class="col-2 q-mr-sm">
            Nomor Distribusi
          </div>
          <div class="col">
            {{ store.form.no_distribusi?store.form.no_distribusi:'-' }}
          </div>
        </div>
        <div class="row items-center">
          <div class="col-2 q-mr-sm">
            Depo Tujuan
          </div>
          <div class="col">
            <app-autocomplete-new
              label="pilih depo"
              :model="store.form.kode_depo"
              autocomplete="nama"
              option-label="nama"
              option-value="kode"
              :loading="store.loading"
              :source="store.depos"
              @on-select="depoSelected"
              @clear="depoCleared"
            />
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <!-- header -->
        <div class="fit row no-wrap justify-evenly items-center content-center q-my-xs text-weight-bold">
          <div class="anak text-center">
            Kode Barang
          </div>
          <div class="anak text-center">
            Nama Barang RS
          </div>
          <div class="anak text-center">
            Kode 108
          </div>
          <div class="anak text-center">
            Uraian 108
          </div>
          <div class="anak text-center">
            Stok Gudang
          </div>
          <div class="anak text-center">
            Stok Alokasi Gudang
          </div>
          <div class="anak text-center">
            Stok Minimum Depo
          </div>
          <div class="anak text-center">
            Stok Maksimum Depo
          </div>
          <div class="anak text-center">
            Jumlah Distribusi
          </div>
          <div class="anak text-center">
            act
          </div>
        </div>
        <q-separator />
        <!-- input -->
        <div class="fit row no-wrap justify-evenly items-center content-center q-my-xs">
          <div class="anak text-center">
            {{ store.input.kode_barang?store.input.kode_barang:'-' }}
          </div>
          <div class="anak text-center">
            <app-autocomplete-new
              ref="refBarang"
              label="pilih barang"
              :model="store.input.kode_barang"
              autocomplete="nama"
              option-label="nama"
              option-value="kode"
              :loading="store.loading"
              :source="store.barangrHasStoks"
              :disable="edit"
              @on-select="barangSelected"
              @clear="barangCleared"
            />
          </div>
          <div class="anak text-center">
            {{ store.input.kode_108?store.input.kode_108:'-' }}
          </div>
          <div class="anak text-center">
            {{ store.input.uraian?store.input.uraian:'-' }}
          </div>
          <div class="anak text-center">
            {{ store.input.stok_gudang?store.input.stok_gudang:'-' }}
          </div>
          <div class="anak text-center">
            {{ store.input.stok_alokasi_depo?store.input.stok_alokasi_depo:'-' }}
          </div>
          <div class="anak text-center">
            {{ store.input.stok_min_depo?store.input.stok_min_depo:'-' }}
          </div>
          <div class="anak text-center">
            {{ store.input.stok_max_depo?store.input.stok_max_depo:'-' }}
          </div>
          <div class="anak text-center">
            <q-input
              ref="refInput"
              v-model="store.input.jumlah"
              label="Jumlah"
              type="number"
              dense
              borderless
              :loading="store.loading"
              @keyup.prevent.enter="addInput"
            />
            <!-- hint="tekan enter untuk input" -->
          </div>
          <div class="anak text-center">
            <q-btn
              :disable="parseInt(store.input.jumlah)<=0"
              class="q-mr-lg"
              flat
              color="primary"
              no-caps
              icon="icon-mat-save"
              :loading="store.loading"
              @click="addInput"
            />
          </div>
        </div>
        <q-separator />
        <!-- display -->
        <div v-if="store.displays.length">
          <div
            v-for="(data,i) in store.displays"
            :key="i"
            class="fit row no-wrap justify-evenly items-center content-center q-my-xs"
          >
            <div class="disp text-center">
              {{ data.kode_barang }}
            </div>
            <div class="disp text-center">
              {{ data.nama }}
            </div>
            <div class="disp text-center">
              {{ data.kode_108 }}
            </div>
            <div class="disp text-center">
              {{ data.uraian }}
            </div>
            <div class="disp text-center">
              {{ data.stok_gudang }}
            </div>
            <div class="disp text-center">
              {{ data.stok_alokasi_depo }}
            </div>
            <div class="disp text-center">
              {{ data.stok_min_depo }}
            </div>
            <div class="disp text-center">
              {{ data.stok_max_depo }}
            </div>
            <div class="disp text-center">
              {{ data.jumlah }}
            </div>
            <div class="disp text-center">
              <div class="fit row no-wrap justify-evenly items-center content-center">
                <q-btn
                  size="sm"
                  flat
                  color="grey"
                  no-caps
                  icon="icon-mat-edit"
                  round
                  @click="editData(i)"
                >
                  <q-tooltip
                    anchor="top middle"
                    self="center middle"
                  >
                    Edit
                  </q-tooltip>
                </q-btn>
                <q-btn
                  size="sm"
                  flat
                  color="negative"
                  no-caps
                  icon="icon-mat-delete_sweep"
                  round
                  @click="deleteData(i)"
                >
                  <q-tooltip
                    anchor="top middle"
                    self="center middle"
                  >
                    Delete
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <app-no-data />
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          class="q-mr-lg"
          flat
          color="primary"
          label="Simpan"
          no-caps
          icon="icon-mat-save"
          @click="store.saveForm"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>
<script setup>
import { Dialog } from 'quasar'
import { notifErrVue } from 'src/modules/utils'
import { useDistribusiDepoStore } from 'src/stores/simrs/logistik/sigarang/transaksi/distribusiDepo/distribusiDepo'
import { ref } from 'vue'

const store = useDistribusiDepoStore()
store.getInitialData()
const depoSelected = val => {
  store.setForm('kode_depo', val)
  store.filterBarangHasStok()
  // const minmax = store.minMaxDepos.filter(data => {
  //   return data.kode_depo === val
  // })
  // console.log('min max', minmax)
}
const depoCleared = () => {
  store.setForm('kode_depo', null)
}
const barangSelected = val => {
  store.resetInput()
  store.setInput('kode_barang', val)
  const barang = store.mappingBarangs.filter(sel => {
    return sel.kode_rs === val
  })
  if (!store.minMaxDepos.length) store.filterBarangHasStok()

  const minmax = store.minMaxDepos.filter(data => {
    return data.kode_depo === store.form.kode_depo
  })
  const minMaxBarang = minmax.filter(data => {
    return data.kode_rs === val
  })
  const stok = Object.keys(store.stoks).filter(data => {
    return store.stoks[data].kode_rs === val
  })

  const toDistribute = store.distribusies.filter(data => {
    return data.kode_rs === val
  })
  console.log('stok', stok)
  if (stok.length) {
    store.setInput('stok_gudang', store.stoks[stok[0]].stok)
    store.setForm('no_penerimaan', store.stoks[stok[0]].no_penerimaan)
    if (toDistribute.length) {
      let alokasi = 0
      if (toDistribute[0].jml > 0) {
        alokasi = store.input.stok_gudang - toDistribute[0].jml
      } else {
        alokasi = store.input.stok_gudang
      }
      //   if (store.input.stok_gudang > 0) {
      // }
      store.setInput('stok_alokasi_depo', alokasi)
    } else {
      store.setInput('stok_alokasi_depo', store.input.stok_gudang)
    }
  }
  if (barang.length) {
    store.setInput('kode_108', barang[0].kode_108)
    store.setInput('uraian', barang[0].barang108.uraian)
    store.setInput('nama', barang[0].barangrs.nama)
    store.setDetail('kode_108', barang[0].kode_108)
    store.setDetail('kode_satuan', barang[0].kode_satuan)
  }
  if (minMaxBarang.length) {
    store.setInput('stok_min_depo', minMaxBarang[0].min_stok)
    store.setInput('stok_max_depo', minMaxBarang[0].max_stok)
  }
  store.setDetail('kode_rs', val)

  // console.log('min max', minMaxBarang)
  // console.log('barang', barang)
  // console.log('stok', stok)
}
const barangCleared = () => {
  store.resetInput()
  store.setInput('kode_barang', null)
}
const edit = ref(false)
const index = ref(null)
// input jumlah
const refInput = ref(null)
const refBarang = ref(null)
const addInput = () => {
  // console.log('ref barang', refBarang.value.$refs.refAuto)
  if (store.input.stok_alokasi_depo > 0) {
    if (parseInt(store.input.jumlah) <= parseInt(store.input.stok_alokasi_depo) && parseInt(store.input.jumlah) > 0) {
      store.setDetail('jumlah', store.input.jumlah)
      store.setInput('jumlah', store.input.jumlah)
      if (!edit.value) {
        store.form.details.push(store.detail)
        store.displays.push(store.input)
      } else {
        store.form.details[index.value].jumlah = store.input.jumlah
        store.displays[index.value].jumlah = store.input.jumlah
      }
      store.resetInput()
      store.resetDetail()
      refBarang.value.$refs.refAuto.resetValidation()
      refBarang.value.$refs.refAuto.focus()
      // console.log('add input', store.form)
    } else if (parseInt(store.input.jumlah) <= 0) {
      notifErrVue('jumlah distribusi tidak valid')
    } else {
      notifErrVue('jumlah distribusi tidak boleh melebihi alokasi')
    }
  } else {
    notifErrVue('Tidak ada stok di gudang')
  }
}

// edit
const editData = apem => {
  // console.log('index', apem, index)
  // console.log('display', store.displays[index.value])
  // console.log('form', store.form.details[index.value])
  edit.value = true
  index.value = apem
  store.input = store.displays[index.value]
}
// delete
const deleteData = index => {
  Dialog.create({
    title: 'konfirmasi',
    ok: {
      flat: true,
      'no-caps': true,
      color: 'negative'
    },
    cancel: {
      flat: true,
      color: 'dark'
    }
  }).onOk(() => {
    // apem
    store.displays.splice(index, 1)
    store.form.details.splice(index, 1)
    // console.log('form', store.form)
  })
  // console.log('display', store.displays[index])
  // console.log('form', store.form.details[index])
}
</script>
<style lang="scss" scoped>
.anak{
  width:calc(100vw/9);
}
.disp{
  width:calc(100vw/9);
}

// .q-field__control-container {
//   .q-field__native{
//     span {
//       color: red;
//     }
//   }
// }

</style>

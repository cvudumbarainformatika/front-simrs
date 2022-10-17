<template>
  <q-dialog>
    <app-card class="my-card" title="Form Pemesanan Barang" desc="From Pemesanan barang kepada Supplier terkontrak "
      style="min-width: 800px;">
      <template #content>
        <q-form ref="formReff" @submit="onSubmit" @reset="onReset">
          <div class="row q-col-gutter-md q-mb-sm">
            <div class="col-5">
              <div class="row q-col-gutter-md q-mb-sm">
                <div class="col-12">
                  <app-autocomplete :model="store.form.kontrak" outlined label="Nomor Kontrak" autocomplete="nokontrak"
                    option-value="nokontrak" :option-label="['nokontrak','namaperusahaan']"
                    :source="store.kontrakPekerjaans" @clear="clearkontrak" @on-select="store.kontrakSelected" />
                </div>
              </div>
              <div class="row q-col-gutter-md q-mb-sm">
                <div class="col-12">
                  <app-autocomplete :model="store.form.kode_rs" outlined label="Nama Barang RS" autocomplete="nama"
                    option-value="kode" option-label="nama" :source="mappingBarang.barangrses"
                    @on-select="store.barangSelected" @clear="clearBarangRs" @set-model="modelSet" />
                </div>
              </div>
              <div class="row q-col-gutter-md q-mb-sm">
                <div class="col-12 ">
                  <app-input input-class="text-right" v-model="store.form.qty" valid
                    @update:model-value="store.updateHarga" label="Jumlah Pemesanan*" outlined />
                </div>
              </div>
              <div class="row q-col-gutter-md q-mb-sm">
                <div class="col-12">
                  <app-input v-model="store.form.harga" valid @update:model-value="store.updateHarga" prefix="Rp "
                    label="Harga Pembelian*" currency outlined />
                </div>
              </div>
            </div>
            <div class="col-7">
              <div class="row q-mb-sm">
                <div class="col col-5">Tanggal Pemesanan</div>
                <div class="col text-right">{{store.tanggalTampil}} </div>
              </div>
              <div class="row q-mb-sm">
                <div class="col col-5">Nomor Pemesanan</div>
                <div class="col text-right">{{store.form.nomor}} </div>
              </div>
              <div class="row q-mb-sm">
                <div class="col col-5">Perusahaan</div>
                <div class="col text-right">{{store.namaPerusahaan ? store.namaPerusahaan : '-'}}</div>
              </div>
              <div class="row q-mb-sm">
                <div class="col col-5">Kode RS</div>
                <div class="col text-right">{{store.barangrs.length ? store.barangrs[0].kode : '-'}}</div>
              </div>
              <div class="row q-mb-sm">
                <div class="col col-5">Nama Barang</div>
                <div class="col text-right">{{store.barangrs.length ? store.barangrs[0].nama : '-'}}</div>
              </div>
              <div class="row q-mb-sm">
                <div class="col col-5">Kode 108</div>
                <div class="col text-right">{{store.barang108.length ? store.barang108[0].kode : '-'}}</div>
              </div>
              <div class="row q-mb-sm">
                <div class="col col-5">Uraian 108</div>
                <div class="col text-right">{{store.barang108.length ? store.barang108[0].uraian : '-'}}</div>
              </div>
              <div class="row q-mb-sm">
                <div class="col col-5">Satuan</div>
                <div class="col text-right">{{store.satuan.length ? store.satuan[0].nama : '-'}}</div>
              </div>
              <div class="row q-mb-sm">
                <div class="col col-5">Stok Gudang</div>
                <div class="col text-right">value</div>
              </div>
              <div class="row q-mb-sm">
                <div class="col col-5">Stok Minmum Gudang</div>
                <div class="col text-right">value</div>
              </div>
              <div class="row q-mb-sm">
                <div class="col-5 col-5">Jumlah yang Harus dibeli</div>
                <div class="col text-right">{{store.form.qty ? store.form.qty : 0}}</div>
              </div>
              <div class="row q-mb-sm ">
                <div class="col col-5"><strong>Sub Total</strong></div>
                <div class="col text-right"><strong>{{store.form.sub_total ? formatRp(store.form.sub_total) :
                0}}</strong></div>
              </div>
            </div>
          </div>

          <q-separator class="q-my-md" />
          <div class="text-right">
            <app-btn type="reset" color="dark" label="Cancel" class="q-mr-md" />
            <app-btn label="Simpan" :loading="store.loading" />
          </div>
        </q-form>
      </template>
    </app-card>
  </q-dialog>
</template>

<script setup>
import { useMasterMapingBarangForm } from 'src/stores/master/mapingbarang/form'
import { useTransaksiPemensananForm } from 'src/stores/transaksi/pemesanan/form'
import { ref } from 'vue'
import { formatRp, olahUang } from 'src/modules/formatter'
// import SelectMenu from './SelectMenu.vue'
const store = useTransaksiPemensananForm()
const mappingBarang = useMasterMapingBarangForm()
const formReff = ref(null)
store.setToday()

const modelSet = val => {
  console.log('model barang RS', val)
}
const clearBarangRs = () => {
  store.setForm('kode_rs', null)
  store.setClose()
  console.log('clear to close', store.isOpen)
  console.log('clear', store.form)
}

const clearkontrak = () => {
  store.setForm('kontrak', null)
}

// const pilihBarangRS = val => {
//   store.form.kode_rs = val.kode
// }
// const pilihBarang108 = val => {
//   store.form.kode_108 = val.kode
// }
// const pilihSatuan = val => {
//   store.form.kode_satuan = val.kode
// }

const onSubmit = () => {
  const apem = Object.keys(store.form)
  apem.forEach(data => {
    if (store.form[data] === null) {
      delete store.form[data]
    }
  })
  const harga = olahUang(store.form.harga)
  store.form.harga = harga
  const jumlah = olahUang(store.form.qty)
  store.form.qty = jumlah
  // console.log('form ', store.form)
  store.saveForm().then(() => {
    if (formReff.value != null) { formReff.value.resetValidation() }
    store.resetFORM()
  })
}
const onReset = () => {
  store.resetFORM()
  formReff.value.resetValidation()
  store.setClose()
}
</script>

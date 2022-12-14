<template>
  <q-page class="q-pt-sm">
    <div>
      <app-card :is-header="false">
        <template #content>
          <app-table-input
            title="Input Pemesanan"
            :columns="table.columns"
            :column-hide="table.columnHide"
            :items="table.items"
            :meta="table.meta"
            :per-page="table.params.per_page"
            :order-by="table.params.order_by"
            ada-input
            :input-col="10"
            :sort="table.params.sort"
            :loading="table.loading"
            :to-search="table.params.q"
            :add-input="store.isOpen"
            @goto="table.setPage"
            @set-row="table.setPerPage"
            @refresh="table.refreshTable"
            @find="table.setSearch"
            @set-order="table.setOder"
            @new-data="store.newData"
            @edit-data="store.editData"
            @delete="table.deletesData"
          >
            <template #col-nomor>
              <div>Nomor Pemesanan</div>
            </template>
            <template #col-kode_108>
              <div>Kode 108</div>
            </template>
            <template #col-kontrak>
              <div>Nomor Kontrak</div>
            </template>
            <template #col-barang108>
              <div>Uraian 108</div>
            </template>
            <template #cell-barang108="{row}">
              <div>{{ row.barang108?row.barang108.uraian:'-' }}</div>
            </template>
            <template #col-kode_rs>
              <div>Kode RS</div>
            </template>
            <template #col-barangrs>
              <div>Nama Barang RS</div>
            </template>
            <template #cell-barangrs="{row}">
              <div>{{ row.barangrs?row.barangrs.nama:'-' }}</div>
            </template>
            <template #col-satuan>
              <div>Satuan</div>
            </template>
            <template #cell-satuan="{row}">
              <div>{{ row.satuan?row.satuan.nama:'-' }}</div>
            </template>
            <template #col-perusahaan>
              <div>Nama Perusahaan</div>
            </template>
            <template #cell-perusahaan="{row}">
              <div>{{ row.perusahaan?row.perusahaan.nama:'-' }}</div>
            </template>
            <template #col-tanggal>
              <div>Tanggal Pemesanan</div>
            </template>
            <template #cell-tanggal="{row}">
              <div>{{ dateFullFormat(row.tanggal) }}</div>
            </template>
            <template #col-qty>
              <div>Jumlah Pesanan</div>
            </template>
            <template #col-harga>
              <div>Harga Pesanan</div>
            </template>
            <template #cell-harga="{row}">
              <div>{{ formatRp(row.harga) }}</div>
            </template>
            <template #col-sub_total>
              <div>Sub Total Pesanan</div>
            </template>
            <template #cell-sub_total="{row}">
              <div> {{ formatRp(row.sub_total) }}</div>
            </template>
            <template #col-kode_perusahaan>
              <div>Kode Perusahaan</div>
            </template>
            <template #cell-kode_perusahaan="{row}">
              <div> {{ row.kode_perusahaan }}</div>
            </template>

            <template #top>
              <div class="row q-col-gutter-md q-my-sm">
                <div class="col-5">
                  <div class="row q-col-gutter-md q-mb-sm">
                    <div class="col-12">
                      <app-autocomplete-new
                        :model="store.form.kontrak"
                        :valid="kontrak"
                        outlined
                        label="Nomor Kontrak"
                        autocomplete="nokontrak"
                        option-value="nokontrak"
                        :option-label="['nokontrak','namaperusahaan']"
                        :source="store.kontrakPekerjaans"
                        :disable="table.items.length ? true : false"
                        :loading="store.loadingKontrak"
                        @on-select="store.kontrakSelected"
                        @clear="clearkontrak"
                      />
                    </div>
                  </div>
                  <div class="row q-col-gutter-md q-mb-sm">
                    <div class="col-12">
                      <app-autocomplete-new
                        :model="store.form.kode_rs"
                        :valid="kodeRs"
                        outlined
                        label="Nama Barang RS"
                        autocomplete="nama"
                        option-value="kode"
                        option-label="nama"
                        :source="mappingBarang.barangrses"
                        @on-select="store.barangSelected"
                        @clear="clearBarangRs"
                        @set-model="modelSet"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-7">
                  <div class="row q-mb-sm">
                    <div class="col col-5">
                      Tanggal Pemesanan
                    </div>
                    <div class="col text-right">
                      {{ store.tanggalTampil }}
                    </div>
                  </div>
                  <div class="row q-mb-sm">
                    <div class="col col-5">
                      Nomor Pemesanan
                    </div>
                    <div class="col text-right">
                      {{ store.form.nomor }}
                    </div>
                  </div>
                  <div class="row q-mb-sm">
                    <div class="col col-5">
                      Perusahaan
                    </div>
                    <div class="col text-right">
                      {{ store.namaPerusahaan ? store.namaPerusahaan : '-' }}
                    </div>
                  </div>
                  <div class="row q-mb-sm">
                    <div class="col-12 text-right">
                      <app-btn
                        label="Tutup Pemesanan"
                        :loading="store.loadingFinish"
                        :disable="store.isOpen"
                        @click="onFisnish"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <template #top-row>
              <tr>
                <th>
                  <div class="bold">
                    <strong>Jumlah pesanan</strong>
                  </div>
                </th>
                <th>
                  <div class="bold">
                    <strong>Harga</strong>
                  </div>
                </th>
                <th>
                  <div class="bold">
                    <strong>kode</strong>
                  </div>
                </th>
                <th>
                  <div class="bold">
                    <strong>108</strong>
                  </div>
                </th>
                <th>
                  <div class="bold">
                    <strong>Uraian 108</strong>
                  </div>
                </th>
                <th>
                  <div class="bold">
                    <strong>Satuan</strong>
                  </div>
                </th>
                <th>
                  <div class="bold">
                    <strong>Stok Gudang</strong>
                  </div>
                </th>
                <th>
                  <div class="bold">
                    <strong>Stok Maks Gudang</strong>
                  </div>
                </th>
                <th>
                  <div class="bold">
                    <strong>Jml Maks dibeli</strong>
                  </div>
                </th>
                <th>
                  <div class="bold">
                    <strong>Sub Total</strong>
                  </div>
                </th>
              </tr>
              <tr>
                <td>
                  <div class="bold">
                    <app-input
                      v-model="store.form.qty"
                      input-class="text-right"
                      :valid="jumlah"
                      label="Jumlah Pemesanan*"
                      outlined
                      @update:model-value="store.updateHarga"
                    />
                  </div>
                </td>
                <td>
                  <div class="bold">
                    <app-input
                      v-model="store.form.harga"
                      :valid="harga"
                      prefix="Rp "
                      label="Harga Pembelian*"
                      currency
                      outlined
                      @update:model-value="store.updateHarga"
                      @keyup.enter="onSubmit"
                    />
                  </div>
                </td>
                <td>
                  <div class="bold">
                    {{ store.barangrs.length ? store.barangrs[0].kode : '-' }}
                  </div>
                </td>
                <!-- <td>
                  <div class="bold">{{store.barangrs.length ? store.barangrs[0].nama : '-'}}</div>
                </td> -->
                <td>
                  <div class="bold">
                    {{ store.barang108.length ? store.barang108[0].kode : '-' }}
                  </div>
                </td>
                <td>
                  <div class="bold">
                    {{ store.barang108.length ? store.barang108[0].uraian : '-' }}
                  </div>
                </td>
                <td>
                  <div class="bold">
                    {{ store.satuan.length ? store.satuan[0].nama : '-' }}
                  </div>
                </td>
                <td>
                  <div class="bold">
                    {{ store.stok.sisaStok?store.stok.sisaStok:0 }}
                  </div>
                </td>
                <td>
                  <div class="bold">
                    {{ store.stok.max_stok?store.stok.max_stok:0 }}
                  </div>
                </td>
                <td>
                  <div class="bold">
                    {{ store.stok.maxBeli?store.stok.maxBeli:0 }}
                  </div>
                </td>

                <td>
                  <div class="bold">
                    <strong>{{ store.form.sub_total ? formatRp(store.form.sub_total) :
                      0 }}</strong>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <app-btn
                    class="q-mx-sm"
                    label="Batal"
                    color="dark"
                    :disable="store.loading"
                    @click="onCancel"
                  />
                  <app-btn
                    label="Tambah"
                    :loading="store.loadingTambah"
                    @click="onSubmit"
                  />
                </td>
              </tr>
            </template>
          </app-table-input>
          <!--
            row-image="image"
            @delete-ids="table.deletesData"
            -->
        </template>
      </app-card>
    </div>
    <!-- dialog -->
    <!-- <formDialog /> -->
    <!-- <q-btn label="coba" @click="onFisnish"></q-btn> -->
  </q-page>
</template>
<script setup>
import { routerInstance } from 'src/boot/router'
import { dateFullFormat, formatRp, olahUang } from 'src/modules/formatter'
import { notifNegativeCenterVue, uniqueId } from 'src/modules/utils'
import { useMasterMapingBarangForm } from 'src/stores/simrs/logistik/sigarang/master/mapingbarang/form'
import { useTransaksiPemensananForm } from 'src/stores/simrs/logistik/sigarang/transaksi/pemesanan/form'
import { useTransaksiPemesananTable } from 'src/stores/simrs/logistik/sigarang/transaksi/pemesanan/table'
import { ref } from 'vue'
const table = useTransaksiPemesananTable()
const store = useTransaksiPemensananForm()
const mappingBarang = useMasterMapingBarangForm()
store.setToday()
table.getDataTable()
store.getCurrentStok()
store.getMinMaxDepo()
// store.getKontrakPekerjaan()
const kontrak = ref(false)
const kodeRs = ref(false)
const jumlah = ref(false)
const harga = ref(false)
const kode108 = ref(false)
// const inputRow = ref(10)

const modelSet = val => {
  console.log('model barang RS', val)
}
const clearBarangRs = () => {
  store.setForm('kode_rs', null)
  store.setClose()
  // console.log('clear to close', store.isOpen)
  // console.log('clear', store.form)
}

const clearkontrak = () => {
  store.setForm('kontrak', null)
  store.setForm('kode_perusahaan', null)
  store.namaPerusahaan = null
}

const onFisnish = () => {
  if (table.items.length) {
    const jumlah = table.items.map(data => {
      return data.sub_total
    }).reduce((x, y) => { return x + y })
    console.log('jumlag', jumlah)

    store.setForm('status', 2)
    store.setForm('total', jumlah)

    const slug = 'TRP-' + uniqueId()
    store.loadingFinish = true
    store.saveForm().then(() => {
      table.setParam('reff', slug)
      console.log('onFinish ', slug)
      table.resetData()
      store.resetFORM()
      store.setForm('reff', slug)
      routerInstance.replace({ name: 'sigarang.transaksi.pemesanan', params: { slug } })
      table.getDataTable(slug)
    })
  } else {
    notifNegativeCenterVue('data Masih kosong, tidak ada pemesanan yang perlu ditutup')
  }
}
const validation = () => {
  kontrak.value = !!store.form.kontrak
  kodeRs.value = !!store.form.kode_rs
  kode108.value = !!store.form.kode_108
  jumlah.value = !!store.form.qty
  harga.value = !!store.form.harga
}
const onSubmit = () => {
  validation()
  if (kontrak.value && kodeRs.value && kode108.value && jumlah.value && harga.value) {
    const apem = Object.keys(store.form)
    apem.forEach(data => {
      if (store.form[data] === null) {
        delete store.form[data]
      }
    })
    const harga = olahUang(store.form.harga)
    store.setForm('harga', harga)
    // store.form.harga = harga
    const jumlah = olahUang(store.form.qty)
    store.setForm('qty', jumlah)
    // store.setForm('status', 1)
    // store.form.qty = jumlah
    // console.log('form ', store.form)
    store.loadingTambah = true
    store.saveForm().then(() => {
      // if (formReff.value != null) { formReff.value.resetValidation() }
      table.getDataTable()
      store.resetInput()
      store.isOpen = false
    })
  } else {
    notifNegativeCenterVue('cek data input, ada yang kurang')
  }
}
const onCancel = () => {
  clearBarangRs()
}
</script>

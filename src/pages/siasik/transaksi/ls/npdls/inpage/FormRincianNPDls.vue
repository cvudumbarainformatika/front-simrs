<template>
  <template v-if="store.reqs.bast">
    <div>
      <q-table
        :rows="carisrt.itembelanja"
        :columns="columns"
        row-key="name"
        hide-header
        hide-bottom
      >
        <template #body="props">
          <q-tr :props="props">
            <q-td key="rek50" :props="props">
              {{ props.row.rek50 }}
            </q-td>
            <q-td key="uraian50" :props="props">
              {{ props.row.uraian50 }}
            </q-td>
            <q-td key="rek108" :props="props">
              {{ props.row.rek108 }}
            </q-td>
            <q-td key="itembelanja" :props="props">
              {{ props.row.itembelanja }}
            </q-td>
            <q-td key="subtotal" :props="props">
              {{ props.row.subtotal }}
            </q-td>
            <q-td>
              <div class="row justify-end">
                <q-btn
                  outline
                  size="sm"
                  class="q-px-md"
                  label="Pilih"
                  @click="simpanRinciBast(props?.row)"
                />
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </template>
  <template v-else>
    <q-form class="fit" ref="rincianNpd" @submit="onSubmit" @reset="onReset">
      <div class="row">
        <div class="q-pa-sm q-gutter-y-md" style="width: 50%">
          <app-autocomplete
            v-model="store.rinci.koderek50"
            label="Rekening Belanja"
            autocomplete="rincianbelanja"
            option-value="rek50"
            outlined
            :option-label="opt => Object(opt) === opt && 'rincianbelanja' in opt ? opt.rek50 + ' - ' + opt.rincianbelanja : 'Silahkan Dipilih'"
            :source="store.rekening50"
            :key="store.reqs.kodekegiatan"
            @selected="(val)=>pilihRekening50(val)"
            :valid="{required:true}"
          />
        </div>
        <div class="q-pa-sm q-gutter-y-md" style="width: 50%">
          <app-autocomplete
            v-model="store.rinci.koderek108"
            label="Item Belanja"
            autocomplete="item"
            option-label="item"
            option-value="item"
            outlined
            :key="store.reqs"
            :source="store.itembelanja"
            :valid="{required:true}"
            @selected="(val)=>{
              const arr = store.itembelanja
              const cari = arr.find(x => x.item === val)
              console.log('rincian item', cari)
              store.rinci.idserahterima_rinci = cari.id_bast
              store.rinci.itembelanja = cari.item
              store.rinci.uraian108 = cari.uraian108
              store.rinci.volume = cari.volume
              store.rinci.satuan = cari.satuan
              store.rinci.harga = cari.harga
              store.rinci.total = cari.pagu
              store.rinci.volumels = cari.volumebast
              store.rinci.hargals = cari.hargabast
              store.rinci.totalls = cari.subtotal
              store.rinci.nominalpembayaran = cari.subtotal

            }"
          />
        </div>
        <app-input-simrs
          v-model="store.rinci.volume"
          class="q-pa-sm q-gutter-y-md"
          style="width: 25%"
          label="Volume Item"
          outlined
          readonly
        />
        <app-input-simrs
          v-model="store.rinci.satuan"
          class="q-pa-sm q-gutter-y-md"
          style="width: 25%"
          label="Satuan Item"
          outlined
          readonly
        />
        <app-input-simrs
          v-model="store.rinci.harga"
          class="q-pa-sm q-gutter-y-md"
          style="width: 25%"
          label="Harga Item"
          outlined
          readonly
        />
        <app-input-simrs
          v-model="store.rinci.total"
          class="q-pa-sm q-gutter-y-md"
          style="width: 25%"
          label="Total Pagu"
          outlined
          readonly
        />

        <app-input-simrs
          v-model="store.rinci.volumels"
          class="q-pa-sm q-gutter-y-md"
          style="width: 25%"
          label="Volume Permintaan"
          outlined
          :autofocus="false"
          :valid="{required:true, number:true}"
        />
        <app-input-simrs
          v-model="store.rinci.hargals"
          class="q-pa-sm q-gutter-y-md"
          style="width: 25%"
          label="Harga Permintaan"
          outlined
          :autofocus="false"
          :valid="{required:true, number:true}"
        />
        <app-input-simrs
          v-model="store.rinci.totalls"
          class="q-pa-sm q-gutter-y-md"
          style="width: 25%"
          label="Total Permintaan"
          outlined
          readonly
        />
        <app-input-simrs
          v-model="store.rinci.nominalpembayaran"
          class="q-pa-sm q-gutter-y-md"
          style="width: 25%"
          label="Nominal Pembayaran"
          outlined
        />
      </div>
      <div class="q-pa-xs q-gutter-y-xs">
        <app-btn
          type="button"
          label="Simpan Rincian"
          :disable="store.loading"
          :loading="store.loading"
          @click="simpanRinci()"
        />
      </div>
    </q-form>
  </template>
</template>

<script setup>
import { dataBastFarmasi } from 'src/stores/siasik/transaksi/ls/npdls/databast'
import { formNotaPermintaanDanaLS } from 'src/stores/siasik/transaksi/ls/npdls/formnpdls'
import { onMounted, ref } from 'vue'

const carisrt = dataBastFarmasi()
const rincianNpd = ref()
const store = formNotaPermintaanDanaLS()
onMounted(() => {
  store.getRincianBelanja()
})
const tablebast = [
  {
    name: 'rek50',
    align: 'left',
    field: 'rek50'
  },
  {
    name: 'uraian50',
    align: 'left',
    field: 'uraian50'
  },
  {
    name: 'rek108',
    align: 'left',
    field: 'rek108'
  },
  {
    name: 'itembelanja',
    align: 'left',
    field: 'itembelanja'
  },
  {
    name: 'subtotal',
    align: 'left',
    field: 'subtotal'
  },
  {
    name: 'Opsi',
    label: 'Opsi',
    align: 'center'
  }
]
const columns = ref(tablebast)

// function pilihRItemBelanja (val) {
//   const arr = carisrt.itembelanja
//   const cari = arr.find(x => x.rek108 === val)
//   console.log('olene select', cari)
//   store.rinci.idserahterima_rinci = cari.id_bast
//   store.rinci.itembelanja = cari.itembelanja
//   store.rinci.uraian108 = cari.item
//   store.rinci.volume = cari.volume
//   store.rinci.satuan = cari.satuan
//   store.rinci.harga = cari.harga
//   store.rinci.total = cari.pagu
//   store.rinci.volumels = cari.volumebast
//   store.rinci.hargals = cari.hargabast
//   store.rinci.totalls = cari.subtotal
//   store.rinci.nominalpembayaran = cari.subtotal
// }

function simpanRinci () {
  store.form.rincians.push(store.rinci)

  console.log('rincian', store.form)
}
function simpanRinciBast (val) {
  carisrt.reqs.rincianbast = val
  // console.log('rincidariBAST', carisrt.reqs.rincianbast)

  store.rinci.koderek50 = carisrt.reqs.rincianbast.rek50
  store.rinci.rincianbelanja = carisrt.reqs.rincianbast.uraian50

  store.rinci.koderek108 = carisrt.reqs.rincianbast.rek108
  store.rinci.uraian108 = carisrt.reqs.rincianbast.item
  store.rinci.itembelanja = carisrt.reqs.rincianbast.itembelanja

  // store.rinci.kodepenerima =

  store.rinci.idserahterima_rinci = carisrt.reqs.rincianbast.id_bast

  store.rinci.volume = carisrt.reqs.rincianbast.volume
  store.rinci.satuan = carisrt.reqs.rincianbast.satuan
  store.rinci.harga = carisrt.reqs.rincianbast.harga
  store.rinci.total = carisrt.reqs.rincianbast.pagu

  store.rinci.volumels = carisrt.reqs.rincianbast.volumebast
  store.rinci.hargals = carisrt.reqs.rincianbast.hargabast
  store.rinci.totalls = carisrt.reqs.rincianbast.subtotal
  store.rinci.nominalpembayaran = carisrt.reqs.rincianbast.subtotal
  store.form.rincians.push(store.rinci)
  console.log('simpan rincianBAST', store.form)
}
// function onSimpan () {
//   store.simpanNpdls()
//   // .then(() => {
//   //   store.emptyForm()
//   // })
// }
function pilihRekening50 (val) {
  const arr = store.rekening50
  const obj = arr.length ? arr.find(x => x.rek50 === val) : null
  // Mengosongkan form rincian Belanja ketika request kegiatan blud
  // store.reqs.kodekegiatan = val ?? ''
  // store.rinci.koderek50 = ''
  store.rinci.koderek50 = obj?.rek50 ?? ''
  store.rinci.rincianbelanja = obj?.rincianbelanja ?? ''
  store.reqs.kodekegiatan = obj?.kodekegiatan ?? ''
  carisrt.filterRekening50()

  store.rinci.koderek108 = ''
  store.reqs.rekening50 = obj?.rek50 ?? ''
  // console.log('rek50', store.reqs.rekening50)
  store.filterItemBelanja()
}
const onSubmit = () => {
  store.simpanNpdls()
    .then(() => {
      if (rincianNpd.value != null) {
        rincianNpd.value.resetValidation()
      }
    })
}
</script>

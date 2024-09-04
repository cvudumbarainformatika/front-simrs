<template>
  <template v-if="store.reqs.bast">
    <div class="flex">
      <q-table
        :rows="carisrt.itembelanja"
        :columns="columns"
        row-key="name"
        hide-bottom
        ref="rincianNpd"
      >
        <template #body="props">
          <q-tr :props="props">
            <q-td key="nopenerimaan" :props="props" class="text-left">
              {{ props.row.nopenerimaan }}
            </q-td>
            <q-td key="koderek50" :props="props">
              {{ props.row.koderek50 }}
            </q-td>
            <q-td key="rincianbelanja" :props="props">
              {{ props.row.rincianbelanja }}
            </q-td>
            <q-td key="koderek108" :props="props">
              {{ props.row.koderek108 }}
            </q-td>
            <q-td key="itembelanja" :props="props">
              {{ props.row.itembelanja }}
            </q-td>
            <q-td key="totalls" :props="props" class="text-right">
              {{ formattanpaRp(props.row.totalls) }}
            </q-td>
            <q-td key="nominalpembayaran" :props="props" class="text-right">
              {{ formattanpaRp(props.row.nominalpembayaran) }}
              <q-popup-edit v-model="props.row.nominalpembayaran" auto-save v-slot="scope">
                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
              </q-popup-edit>
            </q-td>
            <q-td>
              <div class="row justify-end">
                <q-btn
                  outline
                  size="sm"
                  class="q-px-md"
                  label="Pilih"
                  @click="simpanRinciBast(props?.row)"
                  onclick="disabled='true'"
                />
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </template>
  <template v-else>
    <q-form ref="rincianNpd" class="fit" @submit="simpanRinci">
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
          />
        </div>

        <div class="q-pa-sm q-gutter-y-md" style="width: 50%">
          <app-autocomplete
            v-model="store.rinci.itembelanja"
            label="Item Belanja"
            autocomplete="item"
            option-label="item"
            option-value="item"
            outlined
            :key="store.reqs"
            :source="store.itembelanja"
            @selected="(val)=>{
              const arr = store.itembelanja
              const cari = arr.find(x => x.item === val)
              store.rinci.idserahterima_rinci = cari.idpp
              store.rinci.koderek108 = cari.koderek108
              store.rinci.uraian108 = cari.uraian108
              store.rinci.volume = cari.volume
              store.rinci.satuan = cari.satuan
              store.rinci.harga = cari.harga
              store.rinci.total = cari.pagu
              store.rinci.volumels = 0
              store.rinci.hargals = 0
              store.rinci.totalls = 0
              store.rinci.nominalpembayaran = 0
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
          @update:model-value="(val) => {
            store.rinci.totalls = parseFloat(store.rinci.hargals) * parseFloat(val)
            store.rinci.nominalpembayaran = parseFloat(store.rinci.hargals) * parseFloat(val)
          }"
        />
        <app-input-simrs
          v-model="store.rinci.hargals"
          class="q-pa-sm q-gutter-y-md"
          style="width: 25%"
          label="Harga Permintaan"
          outlined
          :autofocus="false"
          :valid="{required:true, number:true}"
          @update:model-value="(val) => {
            store.rinci.totalls = parseFloat(store.rinci.volumels) * parseFloat(val)
            store.rinci.nominalpembayaran = parseFloat(store.rinci.volumels) * parseFloat(val)
          }"
        />
        <app-input-simrs
          v-model="store.rinci.totalls"
          class="q-pa-sm q-gutter-y-md"
          style="width: 25%"
          label="Total Permintaan"
          outlined
          readonly
        />
        <div class="row items-center q-pb-md q-pa-sm q-gutter-y-md">
          <app-btn
            type="submit"
            label="Pilih Rincian"
            class="bg-black"
            :disable="store.loading"
            :loading="store.loading"
          />
        </div>
      </div>
    </q-form>
  </template>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { dataBastFarmasi } from 'src/stores/siasik/transaksi/ls/npdls/databast'
import { formNotaPermintaanDanaLS } from 'src/stores/siasik/transaksi/ls/npdls/formnpdls'
import { onMounted, ref } from 'vue'
// eslint-disable-next-line no-unused-vars
import { formattanpaRp } from 'src/modules/formatter'

const $q = useQuasar()

const carisrt = dataBastFarmasi()
const rincianNpd = ref([])
// const rincians = ref([])
const store = formNotaPermintaanDanaLS()
// const onReset = () => {
//   rincianNpd.value.resetValidation()
// }
onMounted(() => {
  // carisrt.resetFORM()
  // onReset()
  store.getRincianBelanja()
  $q.localStorage.set('rincian_npd', [])
})

const tablebast = [
  {
    label: 'No BAST',
    name: 'nopenerimaan',
    align: 'center',
    field: 'nopenerimaan'
  },
  {
    label: 'Rekening 50',
    name: 'koderek50',
    align: 'center',
    field: 'koderek50'
  },
  {
    label: 'Uraian',
    name: 'rincianbelanja',
    align: 'center',
    field: 'rincianbelanja'
  },
  {
    label: 'Rekening 108',
    name: 'koderek108',
    align: 'center',
    field: 'koderek108'
  },
  {
    label: 'Item Belanja',
    name: 'itembelanja',
    align: 'center',
    field: 'itembelanja'
  },
  {
    label: 'Subtotal',
    name: 'totalls',
    align: 'center',
    field: 'totalls'
  },
  {
    label: 'Nominal Pembayaran',
    name: 'nominalpembayaran',
    align: 'center',
    field: 'nominalpembayaran'
  },
  {
    name: 'Opsi',
    label: 'Opsi',
    align: 'center'
  }
]

// eslint-disable-next-line no-unused-vars
const columns = ref(tablebast)
// const form = ref({
//   koderek50: null,
//   itembelanja: null
// })
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

// eslint-disable-next-line no-unused-vars
function simpanRinci (val) {
  store.reqs.rincianmanual = val
  // SIMPAN RINCIAN PAKAI LOCALSTORAGE JIKA OBJ RINCI KE REPLACE
  // eslint-disable-next-line no-unused-vars
  // const obj = form.value
  const obj = store.rinci
  const rinci = $q.localStorage.getItem('rincian_npd')
  // console.log('rincian sblm push', rinci)

  rinci.push(obj)
  $q.localStorage.set('rincian_npd', rinci)
  store.form.rincians = rinci
  // rincians.value = rinci
  // form.value.koderek50 = null
  // form.value.koderek50 = null
  // console.log('rincian', obj)
  // store.form.rincians.push(obj)

  const jml = store.form.rincians.map((x) => x.nominalpembayaran)
  const subtotal = jml.reduce((x, y) => x + y, 0)

  store.reqs.subtotal = subtotal
  console.log('rincian stlh push', store.form.rincians)
}
// eslint-disable-next-line no-unused-vars
function simpanRinciBast (val) {
  // const obj = store.rinci = val
  // const obj = carisrt.reqs.rincianbast = val
  const rinci = store.rinci = val
  const data = $q.localStorage.getItem('rincian_npd')
  console.log('sebelum push', rinci)
  data.push(rinci)
  // store.rinci.koderek50 = data?.koderek50 ?? ''
  // store.rinci.rincianbelanja = data?.rincianbelanja ?? ''

  // store.rinci.koderek108 = data?.koderek108 ?? ''
  // store.rinci.uraian108 = data?.uraian108 ?? ''
  // store.rinci.itembelanja = data?.itembelanja ?? ''

  // store.rinci.nopenerimaan = data?.nopenerimaan ?? ''

  // store.rinci.idserahterima_rinci = data?.idserahterima_rinci ?? ''

  // store.rinci.volume = data?.volume ?? ''
  // store.rinci.satuan = data?.satuan ?? ''
  // store.rinci.harga = data?.harga ?? ''
  // store.rinci.total = data?.pagu ?? ''

  // store.rinci.volumels = data?.volumels ?? ''
  // store.rinci.hargals = data?.hargals ?? ''
  // store.rinci.totalls = data?.totalls ?? ''
  // store.rinci.nominalpembayaran = data?.nominalpembayaran ?? ''

  $q.localStorage.set('rincian_npd', data)

  store.form.rincians = data
  console.log('simpan setelah Push', store.form.rincians)
}
// function onSimpan () {
//   store.simpanNpdls()
//   // .then(() => {
//   //   store.emptyForm()
//   // })
// }
// eslint-disable-next-line no-unused-vars
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

  store.rinci.itembelanja = ''
  store.rinci.volume = ''
  store.rinci.satuan = ''
  store.rinci.harga = ''
  store.rinci.total = ''
  store.rinci.volumels = ''
  store.rinci.hargals = ''
  store.rinci.totalls = ''
  store.rinci.nominalpembayaran = ''
  store.reqs.rekening50 = obj?.rek50 ?? ''
  // console.log('rek50', store.reqs.rekening50)
  store.filterItemBelanja()
}
// const onSubmit = () => {
//   // store.simpanNpdls()
//   //   .then(() => {
//   //     if (rincianNpd.value != null) {
//   //       rincianNpd.value.resetValidation()
//   //     }
//   //   })
// }
</script>

<template>
  <div class="q-pa-sm">
    <div class="row items-center q-py-xs">
      <div class="col-2">
        Nomor Retur
      </div>
      <div class="col-1">
        :
      </div>
      <div class="col-9">
        {{ store.form.no_retur }}
      </div>
    </div>
    <div class="row items-center q-py-xs">
      <div class="col-2">
        Tanggal retur
      </div>
      <div class="col-1">
        :
      </div>
      <div class="col-9">
        <app-input-date
          ref="refTanggal"
          :model="store.form.tgl_retur"
          label="Tanggal Retur"
          outlined
          @set-model="store.setForm('tgl_retur',$event)"
        />
      </div>
    </div>
    <div class="row items-center q-py-xs">
      <div class="col-2">
        Dari Depo
      </div>
      <div class="col-1">
        :
      </div>
      <div class="col-9">
        <app-autocomplete-new
          ref="refDepo"
          :model="store.form.depo"
          label="Depo"
          outlined
          option-label="nama"
          option-value="value"
          :source="apps?.depos"
          @on-select="store.setForm('depo',$event)"
          @clear="store.setForm('depo',null)"
        />
      </div>
    </div>
    <div class="row items-center q-py-xs">
      <div class="col-2">
        ke Gudang
      </div>
      <div class="col-1">
        :
      </div>
      <div class="col-9">
        <app-autocomplete-new
          ref="refGudang"
          :model="store.form.gudang"
          label="Gudang"
          outlined
          option-label="nama"
          option-value="kode"
          :source="store?.gudangs"
          @on-select="store.setForm('gudang',$event)"
          @clear="store.setForm('gudang',null)"
        />
      </div>
    </div>
    <div class="row items-center q-py-xs">
      <div class="col-2">
        Item obat
      </div>
      <div class="col-1">
        :
      </div>
      <div class="col-9">
        <q-select
          ref="refObat"
          v-model="store.model"
          outlined
          dense
          use-input
          fill-input
          input-debounce="200"
          label="Cari Obat"
          option-label="nama_obat"
          option-value="kd_obat"
          :options="options"
          :rules="[val=>!!val||'Harus di isi']"
          hide-dropdown-icon
          hide-selected
          hide-bottom-space
          @filter="filterFn"
          @update:model-value="modelSelected"
          @clear="clearModel"
        >
          <template v-if="store.model" #append>
            <q-icon name="icon-mat-cancel" @click.stop.prevent="store.model = null" class="cursor-pointer" @click="clearModel" />
          </template>
          <template #option="scope">
            <q-item v-bind="scope.itemProps" class="row items-end">
              <div class="text-weight-bold">
                {{ scope.opt?.nama_obat }}
              </div>
              <div class="q-ml-xs">
                || <span class="text-primary">Stok</span> => <span class="text-primary text-weight-bold">{{ scope.opt?.total }}</span>
              </div>
              <div class="q-ml-xs">
                || <span :class="scope.opt?.total!==scope.opt?.stokalokasi?'text-deep-orange':'text-green'">Alokasi</span> => <span :class="scope.opt?.total!==scope.opt?.stokalokasi?'text-deep-orange text-weight-bold':'text-green text-weight-bold'">{{ scope.opt?.stokalokasi }}</span>
              </div>
            </q-item>
          </template>
        </q-select>
      </div>
    </div>
    <div class="row items-center q-py-xs">
      <div class="col-2">
        jumlah Retur
      </div>
      <div class="col-1">
        :
      </div>
      <div class="col-9">
        <app-input
          ref="refJumlah"
          v-model="store.dispForm.jumlah_retur"
          label="Jumlah Retur"
          outlined
          @update:model-value="setJumlah('jumlah_retur',$event)"
        />
      </div>
    </div>
    <div class="row items-center q-py-xs">
      <div class="col-2">
        Alasan retur
      </div>
      <div class="col-1">
        :
      </div>
      <div class="col-9">
        <app-input
          ref="refAlasan"
          v-model="store.dispForm.alasan"
          label="Alasan Retur"
          outlined
          :rules="[
            val=>val.length<=255 || 'maksimal 255 karakter',
            val=>!!val||'Tidak boleh kosong'
          ]"
          :hint="store.dispForm.alasan?.length + '/ 255'"
          @update:model-value="potongKarakter('alasan',$event)"
          @keyup.enter="tambah"
        />
      </div>
    </div>
    <div class="row items-center q-pa-xs justify-end">
      <app-btn label="Tambah Item" @click="tambah" />
    </div>
    <!-- details -->
    <div class="q-mt-md">
      <div v-if="!store.form.details.length">
        <app-no-data />
      </div>
      <div v-else>
        <div class="row no-wrap q-py-xs bg-dark text-white text-weight-bold items-center">
          <div class="col-1">
            <div class="q-ml-sm">
              No
            </div>
          </div>
          <div class="col-5">
            <div class="q-ml-sm">
              Nama Obat
            </div>
          </div>
          <div class="col-3">
            <div class="q-ml-sm">
              Alasan
            </div>
          </div>
          <div class="col-2 text-right">
            <div class="q-mr-sm">
              Jumlah Retur
            </div>
          </div>
          <div class="col-1 text-right">
            <div class="q-mr-sm">
              #
            </div>
          </div>
        </div>
        <div
          v-for="(item,i) in store.form.details" :key="i"
          class="row no-wrap q-py-xs items-center"
          :class="i%2===1?'bg-grey-3':''"
          style="max-width: 100%;"
        >
          <div class="col-1">
            <div class="q-ml-sm">
              {{ i+1 }}
            </div>
          </div>
          <div class="col-5">
            <div class="q-ml-sm">
              {{ item?.nama_obat }}
            </div>
          </div>
          <div class="col-3">
            <div class="q-ml-sm " style="word-wrap: break-word;">
              {{ item?.alasan }}
            </div>
          </div>
          <div class="col-2 text-right">
            <div class="q-mr-sm">
              {{ item?.jumlah_retur }}
            </div>
          </div>
          <div class="col-1 text-right">
            <div class="q-mr-sm">
              <q-btn icon="icon-mat-delete_sweep" color="negative" flat size="sm" @click="hapusItem(item)">
                <q-tooltip>Hapus item</q-tooltip>
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { notifErrVue } from 'src/modules/utils'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useReturGudangFormStore } from 'src/stores/simrs/farmasi/returgudang/form'
import { onMounted, ref, watch } from 'vue'

const store = useReturGudangFormStore()
const apps = useAplikasiStore()

// untuk option obat

// const model = ref(null)
const options = ref([])
function filterFn (val, update) {
  store.getObat(val).then(() => {
    options.value = store.obats
    update(() => {
      options.value = store.obats
    })
  })
}

function modelSelected (val) {
  // console.log('selected', val, store.model)
  store.setDispForm('kd_obat', val.kd_obat)
  store.setDispForm('jumlah_retur', 0)
  refObat.value.blur()
  refJumlah.value?.refInput.focus()
  refJumlah.value?.refInput.select()
}
function clearModel (val) {
  console.log('clear', val)
  store.setDispForm('kd_obat', null)
  store.setDispForm('jumlah_retur', 0)
}

function setJumlah (key, evt) {
  if (!store.model) {
    store.setDispForm('jumlah_retur', 0)
    return notifErrVue('Pilih dulu item obat untuk mengambil data alokasi')
  }
  const inc = evt.includes('.')
  const ind = evt.indexOf('.')
  const panj = evt.length
  const nilai = isNaN(parseFloat(evt)) ? 0 : (inc && (ind === (panj - 2)) ? evt : parseFloat(evt))
  console.log('set jumlah', key, evt, nilai, store.model?.stokalokasi)
  if (parseFloat(store.model?.stokalokasi) < nilai) {
    store.setDispForm(key, store.model?.stokalokasi)
    notifErrVue('jumlah retur tidak boleh melebihi jumlah alokasi')
  }
  else store.setDispForm(key, nilai)
}
function potongKarakter (key, evt) {
  if (evt?.length > 255) {
    notifErrVue('Maksimal 255 karakter')
    store.setDispForm(key, evt?.substring(0, 255))
  }
  else store.setDispForm(key, evt)
}
function hapusItem (item) {
  const index = store.form.details.findIndex(f => f.kd_obat === item.kd_obat)
  if (index < 0) return notifErrVue('data tidak ditemukan')
  store.form.details.splice(index, 1)
}
// validasi
const refAlasan = ref(null)
const refJumlah = ref(null)
const refObat = ref(null)
const refGudang = ref(null)
const refDepo = ref(null)
const refTanggal = ref(null)
function validasi () {
  const alasan = refAlasan.value?.refInput?.validate()
  const jumlah = refJumlah.value?.refInput?.validate()
  const obat = refObat.value.validate()
  const gudang = refGudang.value?.refAuto?.validate()
  const depo = refDepo.value?.refAuto?.validate()
  const tanggal = refTanggal.value?.refInputDate?.validate()
  console.log('validasi', tanggal)
  if (alasan && jumlah && obat && gudang && depo && tanggal) return true
  else return false
}
// tambah item
function tambah () {
  if (!validasi()) return
  const temp = {
    nama_obat: store.model?.nama_obat,
    kd_obat: store.dispForm.kd_obat,
    alasan: store.dispForm.alasan,
    jumlah_retur: store.dispForm.jumlah_retur
  }
  const ada = store.form.details.findIndex(f => f.kd_obat === temp.kd_obat)
  if (ada >= 0) store.form.details[ada] = temp
  else store.form.details.push(temp)
  store.resetObat()
  refAlasan.value?.refInput.blur()
  refObat.value.focus()
  // console.log('tambah item', temp)
}
function init (kd) {
  const kdru = kd ?? apps?.user?.kdruangansim
  const kdgud = store?.gudangs.map(m => m.kode)
  // console.log(apps?.depos)
  store.setForm('depo', '')
  store.setForm('gudang', '')
  if (kdgud?.includes(kdru)) return notifErrVue('Anda menggunakan akun gudang, depo dan gudang tidak terisi otomatis')

  if (kdru === 'Gd-03010101') {
    store.setForm('depo', kdru)
    store.setForm('gudang', 'Gd-03010100')
  }
  else {
    store.setForm('depo', kdru)
    store.setForm('gudang', 'Gd-05010100')
  }
}
watch(() => apps?.user?.kdruangansim, (obj) => {
  init(obj)
})
onMounted(() => {
  init()
})
</script>

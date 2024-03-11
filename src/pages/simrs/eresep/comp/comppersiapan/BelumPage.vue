<template>
  <div
    v-for="(item,i) in store.belums"
    :key="i"
  >
    <div
      v-if="item?.flag==='1'"
      class="row items-center"
    >
      <div class="col-4 text-weight-bold">
        <div
          class="q-ml-sm"
          style="overflow-wrap: anywhere"
        >
          {{ item?.nopermintaan }}
        </div>
      </div>
      <div class="col-2 text-italic">
        {{ dateFullFormat( item?.tgl_permintaan) }}
      </div>
      <div class="col-2">
        {{ item?.userminta?.nama }}
      </div>
      <div class="col-2">
        proses oleh depo
      </div>
      <div class="col-grow">
        <q-separator
          size="1px"
          color="blue-grey-6"
        />
      </div>
    </div>
    <div
      v-if="item?.flag==='2'"
      class="row items-center"
    >
      <div class="col-3 text-weight-bold">
        <div
          class="q-ml-sm"
          style="overflow-wrap: anywhere"
        >
          {{ item?.nopermintaan }}
        </div>
      </div>
      <div class="col-2 text-italic">
        {{ dateFullFormat( item?.tgl_permintaan) }}
      </div>
      <div class="col-2">
        {{ item?.userminta?.nama }}
      </div>
      <div
        v-if="adaResep(item)"
        class="col-2"
      >
        <q-btn
          label="Selesai"
          no-caps
          dense
          push
          color="green"
          :loading="store.loadingSelesai && item.loading"
          :disable="store.loadingSelesai && item.loading"
          @click="openDialog(item)"
        >
          <q-tooltip
            class="primary"
            :offset="[10, 10]"
          >
            Tidak dibuatkan resep
          </q-tooltip>
        </q-btn>
      </div>
      <div class="col-grow">
        <q-separator
          size="1px"
          color="blue-grey-6"
        />
      </div>
    </div>
    <div
      v-if="item?.rinci?.length && item?.flag==='2'"
      class="q-my-sm"
    >
      <div
        v-for="(rin, r) in item?.rinci"
        :key="r"
      >
        <div
          v-if="rin?.noresep===''"
          class="row items-center q-my-xs"
        >
          <div
            class="col-auto q-mr-sm"
            style="width:2%;"
          >
            {{ nomor(item,rin) }}
          </div>
          <div class="col-5">
            <div class="row items-center">
              {{ rin?.obat?.nama_obat }}
            </div>
            <div class="row">
              <div class="f-10 text-italic">
                {{ rin?.kd_obat }}
              </div>
              <div class="f-10 text-weight-bold q-ml-sm">
                ({{ rin?.obat?.satuan_k }})
              </div>
            </div>
          </div>
          <div class="col-2">
            <div class="row justify-between">
              <div class="col">
                Disiapkan:
              </div>
              <div class="col text-weight-bold">
                {{ rin?.jumlah_distribusi }}
              </div>
            </div>
          </div>
          <div class="col-2">
            <q-input
              ref="refInput"
              v-model="rin.jumlah_resep"
              label="Jumlah Diresepkan"
              dense
              outlined
              standout="bg-yellow-3"
              @update:model-value="setNumber($event,rin,'jumlah_resep')"
              @blur="addToForm(rin)"
            />
          </div>
          <div
            class="col-auto q-mx-sm"
            style="width:3%;"
          >
            <q-checkbox
              v-model="rin.checked"
              size="xs"
              @update:model-value="setCheck($event, rin, r)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <q-dialog
    v-model="isOpen"
    persistent
  >
    <q-card style="min-width: 500px;">
      <q-bar class="bg-primary">
        <q-space />

        <q-btn
          v-close-popup
          dense
          flat
          color="white"
          icon="icon-mat-close"
          @click="isOpen=false"
        >
          <q-tooltip class="bg-white text-primary">
            Close
          </q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <div class="row text-weight-bold">
          Obat :
        </div>
        <div
          v-for="(obat,o) in noresepObats"
          :key="o"
          class="row items-center"
        >
          <div
            class="col-auto"
            style="width:3%"
          >
            {{ o+1 }}
          </div>
          <div
            class="col-auto text-weight-bold text-negative"
            style="width: 80%"
          >
            {{ obat?.obat?.nama_obat }}
          </div>
        </div>
        <div class="row text-weight-bold">
          Belum dibuatkan resep. Apakah {{ noresepObats?.length >1?'obat-obat':'obat' }} tersebut memang tidak akan dibuatkan resep?
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          label="tidak"
          color="negative"
          dense
          push
          @click="isOpen=false"
        />
        <q-btn
          label="ya"
          color="primary"
          dense
          push
          @click="selesai()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { dateFullFormat } from 'src/modules/formatter'
import { notifErrVue } from 'src/modules/utils'
import { ref } from 'vue'
import { useResepPermintaanOperasiStore } from 'src/stores/simrs/farmasi/permintaanresep/permintaanoperasi'

const store = useResepPermintaanOperasiStore()
const refInput = ref(null)
const isOpen = ref(false)
// functions in here
function nomor(item, val) {
  const filtered = item?.rinci.filter(a => a.noresep === '')
  const index = filtered.findIndex(a => val?.id === a.id)
  return index + 1 ?? '-'
}
function adaResep(item) {
  const filtered = item?.rinci.filter(a => a.noresep !== '')
  console.log('adaresep', filtered?.length >= 1, item?.rinci?.length === 1)
  return filtered?.length >= 1 || item?.rinci?.length === 1
}
function setNumber(evt, det, key) {
  const inc = evt.includes('.')
  const ind = evt.indexOf('.')
  const panj = evt.length
  const nilai = isNaN(parseFloat(evt)) ? 0 : (inc && (ind === (panj - 1)) ? evt : parseFloat(evt))
  det[key] = nilai
  if (key === 'jumlah_resep') {
    if (nilai > det.jumlah_distribusi) {
      notifErrVue('jumlah diresepkan tidak boleh lebih dari jumlah yang sudah disiapkan')
      det.jumlah_resep = det.jumlah_distribusi
    }
  }
}
function setCheck(evt, item, n) {
  if (item.checked) {
    const ind = store.rincBelId.findIndex(a => a === item?.id)
    console.log('index', ind, store.rincBelId)
    item.jumlah_resep = item.jumlah_resep ?? 0
    if (ind >= 0) {
      refInput.value[ind]?.focus()
      refInput.value[ind]?.select()
    }
  } else {
    const index = store.form.obats.findIndex(a => a.id === item.id)
    if (index >= 0) store.form.obats.splice(index, 1)
  }
}
function addToForm(item) {
  if (item.checked) {
    const ada = store.form.obats.find(a => a.id === item.id)
    if (!ada && item.jumlah_resep > 0) store.form.obats.push(item)
  }
}

const noresepObats = ref([])
let itemnya = null
function openDialog(item) {
  itemnya = item
  noresepObats.value = item?.rinci?.filter(a => a.noresep === '')
  console.log('obat', noresepObats.value)
  if (noresepObats.value?.length) isOpen.value = true
}
function selesai() {
  // cek ada yang belum di buatkan resep atau tidak, popup tanyakan apakah obat2 tsb tidak akan dibuatkan resep
  // console.log('item', item)

  store.selesai(itemnya)
  isOpen.value = false
}
</script>

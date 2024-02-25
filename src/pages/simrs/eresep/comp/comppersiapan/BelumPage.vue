<template>
  <div
    v-for="(item,i) in store.belums"
    :key="i"
  >
    <div class="row items-center">
      <div class="col-2 text-weight-bold">
        <div class="q-ml-sm">
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
          :loading="store.loadingSelesai"
          :disable="store.loadingSelesai"
          @click="selesai()"
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
      v-if="item?.rinci?.length"
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
</template>
<script setup>
import { dateFullFormat } from 'src/modules/formatter'
import { notifErrVue } from 'src/modules/utils'
import { ref } from 'vue'
import { useResepPermintaanOperasiStore } from 'src/stores/simrs/farmasi/permintaanresep/permintaanoperasi'

const store = useResepPermintaanOperasiStore()
const refInput = ref(null)
// functions in here
function nomor(item, val) {
  const filtered = item?.rinci.filter(a => a.noresep === '')
  const index = filtered.findIndex(a => val?.id === a.id)
  return index + 1 ?? '-'
}
function adaResep(item) {
  const filtered = item?.rinci.filter(a => a.noresep !== '')
  console.log(filtered?.length >= 1)
  return filtered?.length >= 1
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
</script>

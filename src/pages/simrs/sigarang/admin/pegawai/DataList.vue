<template>
  <div>
    <q-card>
      <q-card-section>
        <q-select
          v-model="model"
          outlined
          use-input
          option-value="id"
          option-label="nama"
          label="Cari Data Pegawai"
          :options="options"
          behavior="menu"
          hide-dropdown-icon
          clear-icon="icon-mat-close"
          @filter="filterOptions"
        >
          <template #prepend>
            <q-icon name="icon-mat-search" />
          </template>
          <template #no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
          <template #option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section>
                <q-item-label>{{ scope.opt.nama }}</q-item-label>
                <q-item-label caption>
                  <strong>NiP : </strong> {{ scope.opt.nip }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </q-card-section>
      <q-separator />
      <transition
        enter-active-class="animated flip-right"
        leave-active-class="animated flip-left"
      >
        <!-- Wrapping only one DOM element, defined by QBtn -->
        <!-- tambah kondisi jika ada dokter, customer, dan umum retur berlaku untuk pembelian dan penjualan -->
        <q-card-section v-if="model">
          <div class="flex">
            <div class="right__side column">
              <div><strong>Nama : </strong> {{ model.nama }} </div>
              <div><strong>NIP : </strong> {{ model.nip }} </div>
              <div><strong>Email : </strong> {{ model.email === "" ? 'tidak ada' : model.email }} </div>
              <div>
                <strong>Status : </strong>
                <span v-if="model.aktif.toUpperCase() === 'AKTIF'">
                  <q-chip
                    color="primary"
                    label="Aktif"
                    text-color="white"
                    rounded
                    no-caps
                    dense
                  />
                </span>
                <span v-else>
                  <q-chip
                    dense
                    color="negative"
                    text-color="white"
                    label="Non Aktif"
                    rounded
                    no-caps
                  />
                </span>
              </div>
            </div>
          </div>
          <q-separator class="q-my-md" />
          <q-form
            @submit="onSubmit"
            @reset="onReset"
          >
            <div class="row">
              <div class="text-right col">
                <app-btn
                  dense
                  type="reset"
                  color="black"
                  label="Batal"
                />
              </div>
              <div class="text-right col">
                <app-btn
                  dense
                  type="submit"
                  color="primary"
                  label="Buka"
                />
              </div>
            </div>
          </q-form>
        </q-card-section>
      </transition>
    </q-card>
  </div>
</template>
<script setup>
import { api } from 'src/boot/axios'
import { notifNegativeCenterVue } from 'src/modules/utils'
import { useAdminPegawaiStore } from 'src/stores/simrs/logistik/sigarang/admin/pegawai/pegawai'
import { ref } from 'vue'
const store = useAdminPegawaiStore()
const options = ref(null)
const model = ref(null)
async function filterOptions (val, update) {
  if (!val) {
    update(() => {
      options.value = []
    })
    return
  }
  const params = {
    params: {
      q: val,
      per_page: 10
    }
  }
  const resp = await api.get('v1/pegawai/find', params)
  console.log('retur ', resp.data.data)
  update(
    () => (options.value = resp.data.data),
    ref => {
      if (val !== '' && ref.options.length) {
        ref.setOptionIndex(-1)
        ref.moveOptionSelection(1, true)
      }
    }
  )
}
function onSubmit () {
  if (model.value.aktif.toUpperCase() === 'AKTIF') {
    store.pegawai = model.value
  } else {
    notifNegativeCenterVue('Pegawai Tidak aktif, tidak di ijinkan untuk membuat akun')
  }
  console.log(model.value)
}
function onReset () {
  store.pegawai = null
  model.value = null
  console.log(model.value)
}
</script>

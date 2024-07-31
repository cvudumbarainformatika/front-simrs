<template>
  <q-dialog
    position="top"
    class="q-mt-xl"
    @hide="hiddenDialog()"
    backdrop-filter="blur(4px)"
    persistent
  >
    <q-card style="min-width:50vw;">
      <q-card-section class="row items-center">
        <div class="column">
          <div class="f-14 text-weight-bold">
            CARI DATA PASIEN
          </div>
          <div class="f-10">
            Pencarian Pasien Berdasarkan NIK, NORM, NOKA, NAMA & NO. TELP
          </div>
        </div>
        <q-space />
        <q-btn
          v-close-popup
          icon="icon-mat-clear"
          flat
          round
          dense
        />
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-select
          ref="refAutocomplete"
          label="Cari Pasien"
          v-model="search"
          outlined
          dense
          use-input
          hide-selected
          fill-input
          input-debounce="500"
          :options="options"
          @filter="filterFn"
          placeholder="Min 3 character untuk pencarian pasien"
          option-label="nama"
          option-value="norm"
          autofocus
          class="full-width"
          hide-bottom-space
          hide-dropdown-icon
          no-error-icon
          @update:model-value="dataSelected"
        >
          <template #prepend>
            <q-icon name="icon-mat-search" />
          </template>
          <template #option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section avatar>
                <app-avatar-pasien
                  :pasien="scope.opt"
                  width="70px"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-bold">
                  {{ scope.opt.nama }} | <span class="text-primary"> {{ scope.opt.norm }}</span>
                </q-item-label>
                <q-item-label caption>
                  🏡 {{ scope.opt.alamat?scope.opt.alamat:'-' }}
                </q-item-label>
                <q-item-label
                  caption
                  class="text-weight-bold"
                >
                  <span class="text-primary">💳 NIK :  <strong>{{ scope.opt.nik? scope.opt.nik:'-' }}</strong> </span> |  <span>💳 NOKA :  <strong>{{ scope.opt.nokabpjs?? '-' }}</strong></span>
                </q-item-label>
                <q-item-label caption>
                  USIA : <strong>{{ scope.opt.usia? scope.opt.usia : '-' }} | {{ scope.opt.kelamin?scope.opt.kelamin:'-' }}</strong>
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>
          <template #no-option>
            <q-item>
              <q-item-section class="text-grey">
                Data tidak ditemukan
              </q-item-section>
            </q-item>
          </template>
          <template v-if="search" #append>
            <q-icon name="icon-mat-cancel" @click.stop.prevent="clearAble" class="cursor-pointer" />
          </template>
        </q-select>
      </q-card-section>
      <!-- <q-separator />
      <q-card-section v-if="pasien">
        <div class="row q-col-gutter-x-sm">
          <div class="col-3">
            <app-avatar-pasien
              :pasien="pasien"
              width="100%"
            />
          </div>
          <div class="col-9">
            <table>
              <tr>
                <td class="text-weight-bold">
                  NAMA
                </td>
                <td>: {{ pasien?.nama }}</td>
              </tr>
              <tr>
                <td class="text-weight-bold">
                  USIA
                </td>
                <td>: {{ pasien?.usia }}</td>
              </tr>
              <tr>
                <td class="text-weight-bold">
                  ALAMAT
                </td>
                <td>: {{ pasien?.alamat }}</td>
              </tr>
              <tr>
                <td class="text-weight-bold">
                  NIK
                </td>
                <td>: {{ pasien?.nik ?? '-' }}</td>
              </tr>
              <tr>
                <td class="text-weight-bold">
                  NOKA
                </td>
                <td>: {{ pasien?.nokabpjs ?? '-' }}</td>
              </tr>
              <tr>
                <td class="text-weight-bold">
                  ID SATUSEHAT
                </td>
                <td>: {{ pasien?.idsatset ? 'AKTIF' : 'BELUM AKTIF' }}</td>
              </tr>
            </table>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" @click="hiddenDialog" />
      </q-card-actions> -->
    </q-card>
  </q-dialog>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { ref } from 'vue'

const search = ref(null)
const options = ref([])
const pasien = ref(null)
const refAutocomplete = ref(null)

const emits = defineEmits(['selected', 'close'])

function hiddenDialog () {
  console.log('hidden dialog')
}

async function filterFn (val, update) {
  if (val.length < 3) {
    pasien.value = null
    update(() => {
      options.value = []
      pasien.value = null
    })
    return
  }

  const params = {
    params: {
      q: val
    }
  }

  let data = []
  const resp = await api.get('v1/simrs/master/cari-pasien', params)
  console.log('filter', resp)
  if (resp.status === 200) {
    data = resp.data
  }

  update(() => {
    // const needle = val
    // options.value = search.value
    //   ? options.value.filter(v => v.keterangan.toLowerCase().indexOf(needle.toLowerCase()) > -1)
    //   : options.value
    options.value = data
  })
}

const dataSelected = (val) => {
  console.log('selected', val)
  pasien.value = val
  if (val) {
    emits('selected', val)
  }
}

const clearAble = () => {
  search.value = null
  options.value = []
  pasien.value = null
  refAutocomplete.value.focus()
}
</script>

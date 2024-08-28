<template>
  <q-list bordered separator class="rounded-borders bg-grey-3">
    <q-item v-for="item in store.items" clickable v-ripple class="bg-white" @click="editItem(item)">
      <q-item-section>
        <q-item-label><strong>{{ item?.kategory }} : </strong>{{ item?.kode }} - {{ item?.nama }}</q-item-label>
        <q-item-label caption :class="item?.icd9?'text-primary':'text-negative'">
          <strong>ICD-9 : {{ item?.icd9 ?? '-' }}</strong>
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        <div v-if="item?.snowmed?.length" class="flex q-gutter-sm">
          <q-badge v-for="sn in item?.snowmed" :key="item?.kdSnowmed" outline color="primary" :label="sn?.kdSnowmed" />
        </div>
        <div v-else>
          Belum Ada Mapping Snowmed
        </div>
      </q-item-section>
    </q-item>
    <q-separator />
    <div style="margin-bottom: 100px;" />
  </q-list>

  <!-- dialog -->

  <q-dialog v-model="openDialog" persistent backdrop-filter="blur(4px)">
    <q-card style="width: 50vw;">
      <q-bar>
        <div>Input Data ICD & SNOWMED CT</div>

        <q-space />

        <q-btn dense flat icon="icon-mat-close" v-close-popup>
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        <div class="text-weight-bold">
          KODE TINDAKAN : {{ tindakan?.kode }}
        </div>
        <div class="text-weight-bold">
          URAIAN : {{ tindakan?.nama }}
        </div>
      </q-card-section>
      <q-separator />

      <q-card-section>
        <q-bar class="bg-grey-9 text-white">
          <div>ICD-9</div>
          <q-space />
          <q-btn icon="icon-mat-add" dense size="sm" round color="primary" @click="openFromIcd9 = true">
            <q-tooltip>Input / Edit ICD-(9)</q-tooltip>
          </q-btn>
        </q-bar>
        <q-item v-if="tindakan?.icd9">
          <q-item-section>
            <q-item-label lines="2">
              <strong>{{ tindakan?.icd9 ?? '-' }} - {{ tindakan?.icd?.prosedur ?? '-' }}</strong>
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn :loading="wait" :disable="wait" icon="icon-mat-delete" dense size="sm" round color="negative" @click="deleteIcd9(tindakan)">
              <q-tooltip>Hapus ICD-(9)</q-tooltip>
            </q-btn>
          </q-item-section>
        </q-item>
        <div v-else class="q-py-sm text-center">
          DATA ICD-9 Belum ADA
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-bar class="bg-grey-9 text-white">
          <div>SNOWMED-CT</div>
          <q-space />
          <q-btn icon="icon-mat-add" dense size="sm" round color="primary" @click="openFormSnowmed=true">
            <q-tooltip>Tambah Data Snowmed-CT</q-tooltip>
          </q-btn>
        </q-bar>
        <q-list v-if="tindakan?.snowmed?.length">
          <q-item v-for="item in tindakan?.snowmed" :key="item?.kdSnowmed">
            <q-item-section>
              <q-item-label lines="2">
                <strong>{{ item?.kdSnowmed }} - {{ item?.display ?? '-' }}</strong>
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn :loading="wait" :disable="wait" icon="icon-mat-delete" dense size="sm" round color="negative" @click="deleteSnowmed(item)">
                <q-tooltip>Hapus Snowmed</q-tooltip>
              </q-btn>
            </q-item-section>
          </q-item>
        </q-list>
        <div v-else class="q-py-sm text-center">
          DATA Snowmed-CT Belum ADA
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <!-- dialog form icd9-->

  <q-dialog v-model="openFromIcd9" persistent backdrop-filter="blur(4px)">
    <q-card style="min-width: 60vw; width:80vw">
      <q-bar class="bg-primary text-white">
        <div>Input Data ICD (9) </div>

        <q-space />

        <q-btn dense flat icon="icon-mat-close" v-close-popup>
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-form @submit="simpanIcd">
        <q-card-section>
          <q-select
            ref="refSelectIcd9"
            v-model="formIcd.icd9"
            label="Cari Icd 9"
            outlined
            dense
            use-input
            hide-selected
            fill-input
            input-debounce="200"
            :options="optionsIcd9"
            @filter="icdFn"
            placeholder="Min 2 character untuk pencarian"
            :option-label="opt => Object(opt) === opt && 'kd_prosedur' in opt ? opt.kd_prosedur + ' - ' + opt.prosedur : '- Null -'"
            autofocus
            hide-bottom-space
            hide-dropdown-icon
            no-error-icon
            @update:model-value="(val) => {
              formIcd.kode = val?.kd_prosedur
              formIcd.nama = val?.prosedur
              formIcd.kd_master = tindakan?.kode
              formIcd.tbl_master = tindakan?.table
              console.log('val', formIcd);
            }"
          >
            <template v-if="formIcd.icd9" #append>
              <q-icon
                name="icon-mat-cancel" @click.stop.prevent="()=> {
                  formIcd.icd9 = null
                  formIcd.kode = ''
                  formIcd.nama = ''
                  formIcd.kd_master = ''
                  formIcd.tbl_master = ''
                }" class="cursor-pointer"
              />
            </template>
          </q-select>
        </q-card-section>
        <q-separator />
        <q-card-section v-if="formIcd.icd9">
          <q-btn :loading="wait" :disable="wait" type="submit" label="Simpan" color="primary" />
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>

  <!-- dialog form snowmed -->
  <q-dialog v-model="openFormSnowmed" persistent backdrop-filter="blur(4px)">
    <q-card style="min-width: 30vw; width:30vw">
      <q-bar class="bg-primary text-white">
        <div>Input Data SNOWMED-CT</div>

        <q-space />

        <q-btn dense flat icon="icon-mat-close" v-close-popup>
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-form @submit="simpanSnowmed">
        <q-card-section>
          <app-input-simrs label="Kode" v-model="formSnowmed.kode" :valid="{ required: true }" />
          <app-input-simrs label="Display" v-model="formSnowmed.display" :valid="{ required: true }" />
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-btn :loading="wait" :disable="wait" type="submit" label="Simpan" color="primary" />
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { api } from 'src/boot/axios'
import { useMappingTindakanStore } from 'src/stores/simrs/rekammedik/mapping'
import { onMounted, ref } from 'vue'

const store = useMappingTindakanStore()

const tindakan = ref(null)
const openDialog = ref(false)
const openFormSnowmed = ref(false)
const openFromIcd9 = ref(false)
const optionsIcd9 = ref([])
const wait = ref(false)

const $q = useQuasar()

const formIcd = ref({
  icd9: null,
  kode: '',
  nama: '',
  kd_master: '',
  tbl_master: ''
})

const formSnowmed = ref({
  kode: '',
  display: ''
})

onMounted(() => {
  tindakan.value = null
  openDialog.value = false
})

function editItem (item) {
  console.log('edit', item)
  tindakan.value = item
  openDialog.value = true
}

async function icdFn (val, update, abort) {
  if (val.length < 2) {
    abort()
    return
  }

  const params = {
    icdx: val
  }

  const resp = await api.post('v1/simrs/rekammedik/mapping/get-icd9', params)
  console.log('resp', resp.data)
  let data = []
  if (resp.status === 200) {
    const result = resp?.data
    if (result) {
      data = result
    }
  }

  update(() => {
    optionsIcd9.value = data
  })
}

async function simpanIcd () {
  wait.value = true
  const resp = await api.post('v1/simrs/rekammedik/mapping/save-icd9', formIcd.value)
  console.log('resp save', resp.data)
  if (resp.status === 200) {
    tindakan.value.icd9 = resp.data?.icd9
    tindakan.value.icd = {
      kd_prosedur: resp.data?.prosedur?.kd_prosedur,
      prosedur: resp.data?.prosedur?.prosedur
    }
    openFromIcd9.value = false
    resetFormIcd()
  }
  wait.value = false
}

function resetFormIcd () {
  formIcd.value.icd9 = null
  formIcd.value.kode = ''
  formIcd.value.nama = ''
  formIcd.value.kd_master = ''
  formIcd.value.tbl_master = ''
}

function deleteIcd9 (item) {
  $q.dialog({
    title: 'Confirm',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    // console.log('>>>> OK')
    deleteIcd(item)
  }).onOk(() => {
    // console.log('>>>> second OK catcher')
  }).onCancel(() => {
    // console.log('>>>> Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}
async function deleteIcd (item) {
  // console.log('delete', item)
  const payload = item
  wait.value = true
  await api.post('v1/simrs/rekammedik/mapping/delete-icd9', payload)
    .then((resp) => {
      console.log('resp dele icd', resp.data)
      if (resp.status === 200) {
        tindakan.value.icd9 = null
        tindakan.value.icd = null
      }
      wait.value = false
    })
    .catch((err) => {
      console.log('err', err)
      wait.value = false
    })
}

async function simpanSnowmed () {
  const payload = {
    kode: formSnowmed.value.kode,
    display: formSnowmed.value.display,
    kd_master: tindakan.value.kode,
    tbl_master: tindakan.value.table
  }
  console.log('simpan snowmed', payload)

  const resp = await api.post('v1/simrs/rekammedik/mapping/save-snowmed', payload)
  console.log('resp save snowmed', resp.data)
  if (resp.status === 200) {
    tindakan.value.snowmed.push(resp.data)
    formSnowmed.value.kode = ''
    formSnowmed.value.display = ''

    openFormSnowmed.value = false
  }
  wait.value = false
}

function deleteSnowmed (item) {
  $q.dialog({
    title: 'Confirm',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    // console.log('>>>> OK')
    deleteSnowmedx(item)
  }).onOk(() => {
    // console.log('>>>> second OK catcher')
  }).onCancel(() => {
    // console.log('>>>> Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

async function deleteSnowmedx (item) {
  console.log('delete', item)
  const payload = item
  wait.value = true
  await api.post('v1/simrs/rekammedik/mapping/delete-snowmed', payload)
    .then((resp) => {
      console.log('resp dele snowmed', resp.data)
      if (resp.status === 200) {
        const items = tindakan.value.snowmed
        const idx = items.findIndex((x) => x.kdSnowmed === payload.kode)
        items.splice(idx, 1)
      }
      wait.value = false
    })
    .catch((err) => {
      console.log('err', err)
      wait.value = false
    })
}

</script>

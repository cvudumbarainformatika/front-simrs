<template>
  <q-dialog persistent @show="onShow">
    <q-card style="min-width: 40vw">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">
          {{ formSpri ? (form.noSuratKontrol===null?'Create SPRI':'Edit SPRI') : 'List SPRI' }}
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section v-if="!formSpri" style="max-height: 50vh" class="q-pa-none scroll">
        <div v-if="lists.length === 0">
          <div class="column flex-center" style="min-height: 300px;">
            <div>Maaf data tidak ditemukan</div>
            <q-btn
              label="Create SPRI" color="dark" class="q-mt-md" @click="()=> {
                form.noSuratKontrol = null
                formSpri = true
              }"
            />
          </div>
        </div>

        <q-list v-else separator bordered style="min-height: 300px;">
          <q-item v-for="item in props.lists" :key="item">
            <q-item-section>
              <q-item-label> No. Surat Kontrol : <b>{{ item?.noSuratKontrol }}</b></q-item-label>
              <q-item-label caption>
                Tgl Rencana Kontrol : <b>{{ item?.tglRencanaKontrol }}</b>
              </q-item-label>
              <q-item-label caption>
                Dokter : <b>{{ item?.namaDokter }}</b>
              </q-item-label>
              <q-item-label caption v-if="item?.noSuratKontrol === terpilih">
                <q-badge color="negative">
                  Rujukan yg Terpilih Sekarang
                </q-badge>
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <div class="q-gutter-sm">
                <q-btn
                  dense
                  color="primary"
                  label="Pilih"
                  class="q-px-md"
                  @click="emits('pilih', item)"
                />
                <q-btn
                  dense
                  color="info"
                  outline
                  label="Edit"
                  class="q-px-md"
                  @click="editSpri(item)"
                />
              </div>
              <div class="q-mt-sm">
                <q-btn
                  dense
                  color="negative"
                  outline
                  label="Hapus SPRI"
                  class="q-px-md"
                  @click="hapusSpri(item)"
                />
              </div>
            </q-item-section>
          </q-item>
          <q-separator />
        </q-list>
        <q-separator />
      </q-card-section>

      <q-card-section v-else style="max-height: 50vh;">
        <q-form @submit="onSubmit" class="row q-col-gutter-sm">
          <app-input-date
            :model="form.tglRawatInap"
            label="Tanggal Rawat Inap"
            outlined
            @set-model="setTglRawatInap"
            class="col-5"
          />
          <template v-if="spesialistiks.length > 0 && form.tglRawatInap !== null">
            <q-select
              ref="refSpesialis"
              v-model="form.spesialis"
              label="Spesialis"
              outlined
              dense
              use-input
              hide-selected
              fill-input
              input-debounce="200"
              :rules="[(val) => (!!val) || 'Harap diisi']"
              :options="options"
              @filter="spesialisFn"
              placeholder="Min 2 character untuk pencarian"
              option-label="namaPoli"
              autofocus
              hide-bottom-space
              hide-dropdown-icon
              no-error-icon
              class="col-7"
              @update:model-value="(val)=>{
                console.log('val', val);

                form.spesialis = val
                cariDataDokter()
              }"
            >
              <template v-if="form.spesialis" #append>
                <q-icon
                  name="icon-mat-cancel" @click.stop.prevent="()=> {
                    form.spesialis = null
                    form.dokter = null
                  }" class="cursor-pointer"
                />
              </template>
            </q-select>
            <q-select
              v-if="dokters.length > 0 && form.spesialis !== null"
              ref="refDokter"
              v-model="form.dokter"
              label="Dokter"
              outlined
              dense
              use-input
              hide-selected
              fill-input
              input-debounce="200"
              :rules="[(val) => (!!val) || 'Harap diisi']"
              :options="optionsDokters"
              @filter="dokterFn"
              placeholder="cari dokter"
              option-label="namaDokter"
              autofocus
              hide-bottom-space
              hide-dropdown-icon
              no-error-icon
              class="col-7"
              @update:model-value="(val)=>{
                console.log('val', val);

                form.dokter = val
              }"
            >
              <template v-if="form.dokter" #append>
                <q-icon name="icon-mat-cancel" @click.stop.prevent="form.dokter = null" class="cursor-pointer" />
              </template>
            </q-select>
          </template>

          <div class="flex q-mt-lg full-width justify-between" style="border-top: 1px solid grey;">
            <q-btn :loading="wait" :disabled="wait" label="kembali" color="dark" class="" @click="formSpri=false" />
            <q-btn :loading="wait" :disabled="wait" type="submit" :label="form.noSuratKontrol===null? 'Buat Spri' : 'Update Spri'" color="primary" class="" />
          </div>
        </q-form>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right" class="bg-yellow-3">
        <q-btn flat label="Tutup" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { api } from 'src/boot/axios'
import { notifErrVue } from 'src/modules/utils'
import { ref } from 'vue'

// import { ref } from 'vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  lists: {
    type: Array,
    default: () => []
  },
  terpilih: {
    type: String,
    default: null
  },
  pasien: {
    type: Object,
    default: null
  }
})

const formSpri = ref(false)
const wait = ref(false)
const form = ref({
  pasien: null,
  tglRawatInap: null,
  spesialis: null,
  dokter: null,
  noSuratKontrol: null
})

const options = ref([])
const optionsDokters = ref([])

const spesialistiks = ref([])
const dokters = ref([])

const emits = defineEmits(['pilih', 'getSpri', 'edit'])

const setTglRawatInap = async (val) => {
  form.value.tglRawatInap = val
  if (val === null) {
    form.value.spesialis = null
    form.value.dokter = null
  }

  // console.log('pasien', props.pasien)
  if (props.pasien?.noka === null || props.pasien?.noka === '') {
    return notifErrVue('Noka Pasien Belum Ada ... Silahkan Daftarkan pada BPJS Terlebih dahulu')
  }
  if (form.value?.tglRawatInap === null || form.value?.tglRawatInap === '') {
    return notifErrVue('silahkan pilih tanggal rawat inap')
  }

  if (form.value.tglRawatInap !== null) {
    const params = {
      jnsKontrol: 1,
      nomor: props?.pasien?.noka,
      tglRencanaKontrol: form.value?.tglRawatInap
    }

    const resp = await api.post('v1/simrs/pendaftaran/ranap/get-list-spesialistik', params)
    console.log('resp spesialistik', resp.data)
    let data = []
    if (resp.data?.metadata?.code === '200') {
      const result = resp?.data?.result?.list
      if (result) {
        data = result
      }
    }

    spesialistiks.value = data
  }
}

function spesialisFn (val, update, abort) {
  if (val.length < 2) {
    abort()
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    options.value = spesialistiks.value.filter(v => v?.namaPoli?.toLowerCase().indexOf(needle) > -1)
  })
}

const cariDataDokter = async () => {
  if (form.value.spesialis.value) {
    return notifErrVue('Mohon Memilih Spesialis Terlebih dahulu')
  }

  if (form.value?.tglRawatInap === null || form.value?.tglRawatInap === '') {
    return notifErrVue('silahkan pilih tanggal rawat inap')
  }
  // console.log('form', form.value)

  const params = {
    jnsKontrol: 1,
    kodePoli: form.value?.spesialis?.kodePoli,
    tglRencanaKontrol: form.value?.tglRawatInap
  }
  const resp = await api.post('v1/simrs/pendaftaran/ranap/get-list-dokter-bpjs', params)
  console.log('resp spesialistik', resp.data)
  let data = []
  if (resp.data?.metadata?.code === '200') {
    const result = resp?.data?.result?.list
    if (result) {
      data = result
    }
  }

  dokters.value = data
}

function dokterFn (val, update, abort) {
  if (val === null || val.length < 1) {
    update(() => {
      optionsDokters.value = dokters.value
    })
  }

  update(() => {
    const needle = val.toLowerCase()
    optionsDokters.value = dokters.value.filter(v => v?.namaDokter?.toLowerCase().indexOf(needle) > -1)
  })
}

const onShow = () => {
  formSpri.value = false

  form.value = {
    tglRawatInap: null,
    spesialis: null,
    dokter: null,
    pasien: props.pasien,
    noSuratKontrol: null
  }
}
const onSubmit = async () => {
  wait.value = true
  form.value.pasien = props.pasien

  if (form.value.spesialis.value) {
    return notifErrVue('Mohon Memilih Spesialis Terlebih dahulu')
  }

  if (form.value?.tglRawatInap === null || form.value?.tglRawatInap === '') {
    return notifErrVue('silahkan pilih tanggal rawat inap')
  }
  if (form.value?.dokter === null || form.value?.dokter === '') {
    return notifErrVue('silahkan pilih Dokter Terlebih dahulu')
  }
  // console.log('form', form.value)
  await api.post('v1/simrs/pendaftaran/ranap/create-spri-ranap', form.value)
    .then(resp => {
      console.log('resp create ', resp)
      wait.value = false
      if (resp.data.metadata.code === '200') {
        formSpri.value = false
        emits('getSpri', props.pasien)
      }
      else {
        notifErrVue(resp.data.metadata.message)
      }
    })
    .catch(err => {
      console.log('err create spri', err)
      wait.value = false
    })
}

function editSpri (item) {
  console.log('edit spri', item)
  // form.value.tglRawatInap = item.tglRencanaKontrol
  setTglRawatInap(item.tglRencanaKontrol)
  form.value.dokter = item.kodeDokter
  form.value.noSuratKontrol = item?.noSuratKontrol

  formSpri.value = true
}

const $q = useQuasar()

function hapusSpri (item) {
  $q.dialog({
    title: 'Peringatan<em>!</em>',
    message: '<em>Apakah Benar akan Hapus</em> <span class="text-red">use</span> <strong>SPRI ini ?</strong>',
    html: true,
    cancel: true
  }).onOk(() => {
    // console.log('OK')
    hapusBenar(item)
  }).onCancel(() => {
    // console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

async function hapusBenar (item) {
  wait.value = true
  form.value.noSuratKontrol = null
  form.value.pasien = props.pasien
  form.value.noSuratKontrol = item?.noSuratKontrol

  await api.post('v1/simrs/pendaftaran/ranap/delete-spri-ranap', form.value)
    .then(resp => {
      console.log('resp delete ', resp)
      wait.value = false
      if (resp.data.metadata.code === '200') {
        formSpri.value = false
        emits('getSpri', props.pasien)
      }
      else {
        notifErrVue(resp.data.metadata.message)
      }
    })
    .catch(err => {
      console.log('err delete spri', err)
      wait.value = false
    })
}
</script>

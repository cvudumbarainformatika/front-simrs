<template>
  <div class="fit column scroll">
    <div class="col-auto header">
      <div class=" row justify-between items-center q-pa-sm bg-white">
        <div class="kiri">
          <q-btn icon="icon-mat-arrow_back" flat dense size="md" color="dark" @click="emits('toList')">
            <q-tooltip>
              Kembali Ke List
            </q-tooltip>
          </q-btn>
        </div>
        <div class="kanan text-right text-bold">
          <div>{{ pasien?.nama }}</div>
          <div>{{ pasien?.norm }}</div>
        </div>
      </div>
    </div>

    <div class="col full-height bg-grey-1 scroll">
      <div class="q-pa-lg">
        <div class="text-h6 text-weight-light">
          [Konsultasi Dokter] Kunjungan No. <span class="text-primary">{{ pasien?.rs1 }}</span>
        </div>
        <div class="f-20 text-weight-light">
          {{ item?.ketuntuk }}
        </div>

        <div class="q-mt-lg">
          <div>Dengan Hormat,</div>
          <div>Mohon Bantuan Dokter <b>{{ namaPetugas(item?.kddokterkonsul) }}</b>, untuk konsultasi Masalah medik saat ini</div>
          <div>{{ item?.permintaan }}</div>

          <div class="q-mt-lg">
            Terimakasih Atas Kerjasamanya
          </div>

          <q-form v-if="item?.kddokterkonsul === auth" ref="formRef" class="q-mt-lg" @submit="onSubmit">
            <q-input
              outlined standout="bg-yellow-3"
              v-model="form.jawaban"
              label="" type="textarea" rows="10"
            />

            <div class="text-right q-mt-lg q-gutter-md">
              <q-btn color="dark" label="Kembali" @click="emits('toList')" />
              <q-btn :loading="loadingSave" :disable="loadingSave" color="primary" label="Simpan Jawaban" type="submit" />
            </div>
          </q-form>

          <div v-else class="q-mt-lg">
            <div class="text-weight-bold">
              Jawaban :
            </div>
            <span v-html="getNewLine(item?.jawaban) || 'Belum Ada Jawaban'" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useKonsulRanapStore } from 'src/stores/simrs/ranap/konsul'
import { usePengunjungRanapStore } from 'src/stores/simrs/ranap/pengunjung'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  item: {
    type: Object,
    default: null
  },
  auth: {
    type: String,
    default: null
  }
})

const emits = defineEmits(['toList'])

const store = useKonsulRanapStore()
const kunjunganRanap = usePengunjungRanapStore()
const formRef = ref(null)
const form = ref({
  jawaban: 'Dengan Hormat, ' + '\n' + 'Sesuai Permintaan konsultasi pada Pemeriksaan pasien, kami dapati saat ini' + '\n' + '\n' + '\n' + 'Saran Tindakan medik / Pengobatan : ' + '\n'
})
const loadingSave = ref(false)

function namaPetugas (item) {
  // console.log('item', item)
  const petugas = store.dokters?.find(x => x.kdpegsimrs === item)?.nama ?? null
  return petugas
}

onMounted(() => {
  console.log('item', props?.item)

  if (props?.auth === props?.item?.kddokterkonsul) {
    Promise.all([
      updateFlagRanap(props?.item)
    ])
  }
})

async function updateFlagRanap (item) {
  const findPasien = kunjunganRanap.pasiens?.find(x => x?.noreg === props?.pasien?.noreg) ?? null
  const konsultasis = findPasien?.konsultasi ?? []
  const target = konsultasis?.find(x => x?.id === item?.id) ?? null
  const targetIndex = konsultasis?.findIndex(x => x?.id === item?.id)

  console.log('find pasien', targetIndex, target)
  if (target) {
    if (target.flag === null || target.flag === '' || target.flag === undefined) {
      target.flag = '1'
      const payload = { id: target?.id }
      try {
        await api.post('v1/simrs/ranap/layanan/konsultasi/updateFlag', payload)
      }
      catch (error) {
        target.flag = null
      }
    }
  }

  if (item?.jawaban) {
    form.value.jawaban = item?.jawaban
  }
}

function getNewLine (text) {
  return text?.replace(/\n/g, '<br/>')
}

function onSubmit () {
  // eslint-disable-next-line prefer-const
  const { item, pasien } = props
  form.value.id = item?.id
  form.value.noreg = item?.noreg
  form.value.kelas_ruangan = pasien?.kelas_ruangan
  form.value.kdgroup_ruangan = pasien?.kdgroup_ruangan
  form.value.kdruang = pasien?.kodepoli
  form.value.kodesistembayar = pasien?.kodesistembayar

  // console.log('data', form.value)

  loadingSave.value = true
  return new Promise((resolve, reject) => {
    api.post('v1/simrs/ranap/layanan/konsultasi/updateJawaban', form.value)
      .then(resp => {
        if (resp.status === 200) {
          kunjunganRanap.injectUpdatean(pasien?.noreg, item?.id, resp.data.result, 'konsultasi')
          loadingSave.value = false
          notifSuccess(resp)
        }
        resolve(resp)
      })
      .catch(err => {
        loadingSave.value = false
        reject(err)
      })
  })
}

</script>

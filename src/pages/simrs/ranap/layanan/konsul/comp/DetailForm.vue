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

          <q-form ref="formRef" class="q-mt-lg" @submit="onSubmit">
            <q-input
              outlined standout="bg-yellow-3"
              v-model="rkd.form.jawaban"
              label="" type="textarea" rows="10"
            />

            <div class="text-right q-mt-lg q-gutter-md">
              <q-btn color="dark" label="Kembali" @click="emits('toList')" />
              <q-btn :loading="rkd.loadingSave" :disable="rkd.loadingSave" color="primary" label="Simpan Jawaban" type="submit" />
            </div>
          </q-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useKonsulRanapStore } from 'src/stores/simrs/ranap/konsul'
import { useRuangKonsulDokterStore } from 'src/stores/simrs/ranap/ruangkonsuldokter'
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  item: {
    type: Object,
    default: null
  }
})

const emits = defineEmits(['toList'])

const store = useKonsulRanapStore()
const rkd = useRuangKonsulDokterStore()
const formRef = ref(null)

function namaPetugas (item) {
  // console.log('item', item)
  const petugas = store.dokters?.find(x => x.kdpegsimrs === item)?.nama ?? null
  return petugas
}

onMounted(() => {
  rkd.updateFlag(props?.item)
})

function onSubmit () {
  const data = { ...props.item }
  data.kunjunganranap.kelas_ruangan = props?.pasien?.kelas_ruangan
  data.kunjunganranap.kdgroup_ruangan = props?.pasien?.kdgroup_ruangan
  data.kunjunganranap.rs5 = props?.item?.kdruang

  console.log('data', data)

  // rkd.saveJawaban(props?.item)
  //   .then(() => {
  //     emits('toList')
  //   })
}

</script>

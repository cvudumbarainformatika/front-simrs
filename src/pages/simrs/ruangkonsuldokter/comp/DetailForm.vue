<template>
  <div class="fit column">
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
          <div>{{ item?.kunjunganranap?.nama }}</div>
          <div>{{ item?.kunjunganranap?.rs2 }} || <span v-if="item?.kdruang === 'POL014'">{{ item?.kunjunganigd?.ruangan ?? '-' }}</span><span v-if="item?.kdruang !== 'POL014'">{{ item?.kunjunganranap?.ruangan ?? '-' }}</span></div>
        </div>
      </div>
    </div>

    <div class="col full-height bg-grey-1 scroll">
      <div class="q-pa-lg">
        <div class="text-h6 text-weight-light">
          [Konsultasi Dokter] Kunjungan Pasien <span class="text-primary">{{ item?.kunjunganranap?.rs1 }}</span>
        </div>
        <div class="f-20 text-weight-light">
          {{ item?.ketuntuk }}
        </div>

        <div class="q-mt-lg">
          <div>Dengan Hormat,</div>
          <div>Mohon Bantuan Dokter <b>{{ item?.dokterkonsul?.nama }}</b>, untuk konsultasi Masalah medik saat ini</div>
          <div>{{ item?.permintaan }}</div>

          <div class="q-mt-lg">
            Terimakasih Atas Kerjasamanya
          </div>

          <q-form class="q-mt-lg" @submit="onSubmit">
            <q-input
              outlined standout="bg-yellow-3"
              v-model="store.form.jawaban"
              label="" type="textarea" rows="10"
            />

            <div class="text-right q-mt-lg q-gutter-md">
              <q-btn color="dark" label="Kembali" @click="emits('toList')" />
              <q-btn :loading="store.loadingSave" :disable="store.loadingSave" color="primary" label="Simpan Jawaban" type="submit" />
            </div>
          </q-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRuangKonsulDokterStore } from 'src/stores/simrs/ranap/ruangkonsuldokter'
import { onMounted } from 'vue'

const store = useRuangKonsulDokterStore()

const props = defineProps({
  item: {
    type: Object,
    default: null
  }
})

onMounted(() => {
  console.log('item', props?.item)
  store.updateFlag(props?.item)
})

const emits = defineEmits(['toList'])

const onSubmit = () => {
  store.saveJawaban(props?.item)
    .then(() => {
      emits('toList')
    })
}

</script>

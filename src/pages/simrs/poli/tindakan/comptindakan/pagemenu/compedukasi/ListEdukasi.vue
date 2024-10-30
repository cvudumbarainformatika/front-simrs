<template>
  <div class="fit">
    <q-scroll-area v-if="pasien?.edukasi?.length" style="height:calc(100% - 1px);">
      <q-card
        v-for="(item, i) in pasien?.edukasi"
        :key="i"
        flat
        bordered
        class="q-mb-sm q-mr-sm"
      >
        <q-card-section>
          <div class="column">
            <div>{{ item?.perlupenerjemah==='Iya'? 'Pasien Perlu Penerjemah' : 'Pasien Tidak Perlu Penerjemah' }}</div>
            <div>{{ item?.bahasaisyarat==='Iya'? 'Pasien Memakai Bahasa Isyarat' : 'Pasien Tidak Memakai Bahasa Isyarat' }}</div>
            <div>{{ item?.caraedukasi==='Lisan'? 'Edukasi Memakai Lisan' : 'Edukasi Memakai Tulisan' }}</div>
            <div>{{ item?.kesediaan==='Iya'? 'Pasien Bersedia' : 'Pasien Tidak Bersedia' }}</div>
            <div> Kebutuhan : <b><em>{{ item?.kebutuhanedukasi }}</em></b>  </div>
            <div> Penerima Edukasi : <b><em>{{ item?.rs9 }}</em></b>  </div>
          </div>
        </q-card-section>
        <q-card-section align="right">
          <q-btn
            flat
            round
            size="sm"
            icon="icon-mat-delete"
            color="negative"
            @click="hapusItem(item.id)"
          />
        </q-card-section>
      </q-card>
    </q-scroll-area>

    <div v-else class="column full-height flex-center">
      <div>Belum Ada Data Tersimpan</div>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { useEdukasiPoliStore } from 'src/stores/simrs/pelayanan/poli/edukasi'

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const $q = useQuasar()
const store = useEdukasiPoliStore()

function hapusItem (id) {
  $q.dialog({
    dark: true,
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    store.hapusItem(props?.pasien, id)
  }).onCancel(() => {
    // console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}
</script>

<template>
  <div class="column full-height">
    <div class="col-auto bg-teal q-pa-sm text-white">
      List Diagnosa Kebidanan Tersimpan
    </div>
    <div class="col full-height">
      <q-scroll-area
        v-if="props?.pasien?.diagnosakebidanan?.length"
        style="height:calc(100% - 1px)"
      >
        <q-card
          flat
          bordered
          v-for="item in props.pasien?.diagnosakebidanan"
          :key="item.id"
          class="q-ma-sm"
        >
          <q-item
            v-ripple
            clickable
          >
            <q-item-section>
              <q-item-label> <b>{{ item.kode }} - {{ item.nama }}</b> </q-item-label>
              <q-item-label caption>
                Intervensi Kebidanan
              </q-item-label>
              <q-item-label
                v-for="sub in item.intervensi"
                :key="sub.id"
              >
                - {{ sub?.masterintervensi?.nama }}
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn
                icon="icon-mat-delete"
                size="xs"
                round
                padding="sm"
                flat
                color="negative"
                @click="hapusItem(item.id)"
              />
            </q-item-section>
          </q-item>
        </q-card>
      </q-scroll-area>

      <div
        v-else
        class="column full-height flex-center"
      >
        DATA TERSIMPAN BELUM ADA
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { useDiagnosaKebidananStore } from 'src/stores/simrs/pelayanan/poli/diagnosakebidanan'

const store = useDiagnosaKebidananStore()
const $q = useQuasar()

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

function hapusItem (id) {
  $q.dialog({
    dark: true,
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    // console.log('OK')
    store.deleteDiagnosa(props.pasien, id)
  }).onCancel(() => {
    // console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

</script>

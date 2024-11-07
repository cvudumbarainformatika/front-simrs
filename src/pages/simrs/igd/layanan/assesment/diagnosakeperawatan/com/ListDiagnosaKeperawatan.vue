<template>
  <div class="column full-height">
    <div class="col-auto bg-teal q-pa-sm text-white">
      List Diagnosa Keperawatan Tersimpan
    </div>
    <div class="col full-height">
      <q-scroll-area
        v-if="props?.pasien?.diagnosakeperawatan?.length"
        style="height:calc(100% - 1px)"
      >
        <q-list
          bordered
          separator
        >
          <q-item
            v-for="item in props.pasien?.diagnosakeperawatan"
            :key="item.id"
            v-ripple
            clickable
          >
            <q-item-section>
              <q-item-label> <b>{{ item.kode }} - {{ item.nama }}</b> </q-item-label>
              <q-item-label caption>
                Intervensi Keperawatan
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
        </q-list>
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
import { useDiagnosaKeperawatanIgd } from 'src/stores/simrs/igd/diagnosakeperawatan'

const store = useDiagnosaKeperawatanIgd()
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

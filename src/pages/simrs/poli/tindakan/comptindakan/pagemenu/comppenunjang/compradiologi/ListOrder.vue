<template>
  <div class="column full-height">
    <q-bar class="col-auto bg-teal text-white">
      <div class="q-py-sm f-14 ">
        List Order Radiologi
      </div>
      <q-space />
      <div class="q-py-xs">
        <q-select
          v-model="store.form.nota"
          outlined
          standout="bg-yellow-3"
          bg-color="white"
          dense
          :options="store.notas"
          :display-value="`NOTA: ${store.form.nota === null || store.form.nota === '' || store.form.nota === 'BARU' ? 'SEMUA' : store.form.nota}`"
          style="min-width: 200px;"
        />
      </div>
    </q-bar>
    <div class="col full-height bg-grey-5">
      <div
        v-if="pasien?.radiologi?.length === 0"
        class="column full-height flex-center text-white"
      >
        Belum Ada Permintaan Order
      </div>
      <q-scroll-area
        style="height: calc(100% - 1px);"
        v-else
        class="q-pa-sm"
      >
        <transition-group name="list">
          <template
            v-for="(item, i) in filterredTable"
            :key="i"
          >
            <q-list
              separator
              class="q-mb-sm list-move"
            >
              <q-item class="bg-white">
                <q-item-section>
                  <q-item-label caption>
                    NOMOR : <span class="text-primary">{{ item?.rs2 }}</span>
                  </q-item-label>
                  <q-item-label caption>
                    PERMINTAAN
                  </q-item-label>
                  <q-item-label lines="6">
                    {{ item?.rs4 }}
                  </q-item-label>
                  <q-item-label caption>
                    KETERANGAN
                  </q-item-label>
                  <q-item-label lines="6">
                    {{ item?.rs7 }}
                  </q-item-label>
                </q-item-section>
                <q-item-section
                  side
                >
                  <q-btn
                    flat
                    dense
                    icon="icon-mat-delete"
                    color="negative"
                    size="sm"
                    rounded
                    @click="hapusItem(item?.id)"
                  />
                  <q-badge
                    outline
                    :color="item?.cito==='Cito'?'orange':'primary'"
                    :label="item?.cito==='Cito'? item?.cito:'Normal'"
                    class="q-my-sm"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </template>
        </transition-group>
      </q-scroll-area>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { useRadiologiPoli } from 'src/stores/simrs/pelayanan/poli/radiologi'
import { computed } from 'vue'

const $q = useQuasar()
const store = useRadiologiPoli()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const filterredTable = computed(() => {
  const val = store?.form?.nota
  const arr = props?.pasien?.radiologi
  return (val === 'SEMUA' || val === null || val === '') ? arr : arr?.filter(x => x?.rs2 === val)
})

function hapusItem (id) {
  $q.dialog({
    dark: true,
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    // console.log('HAPUS', id)
    store.hapusRadiologi(props.pasien, id)
  }).onCancel(() => {
    // console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}
</script>

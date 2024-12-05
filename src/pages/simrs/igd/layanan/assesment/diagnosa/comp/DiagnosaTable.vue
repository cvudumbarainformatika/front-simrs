<template>
  <q-card
    flat
    square
    bordered
    class="column full-height"
  >
    <div class="col-auto">
      <q-bar
        class="bg-teal text-white"
      >
        <div class="f-12 q-pa-xs">
          Table Diagnosa
        </div>
      </q-bar>
    </div>
    <div class="col-grow">
      <div class="full-height">
        <q-scroll-area
          v-if="pasien?.diagnosa?.length"
          style="height:calc(100% - 1px)"
          class="bg-grey"
        >
          <q-list
            separator
            class="bg-white"
          >
            <transition-group name="list">
              <q-item
                v-for="(item , n) in pasien?.diagnosa"
                :key="n"
                class="list-move q-pa-none"
              >
                <q-item-section class="q-px-md q-py-sm">
                  <q-item-label
                    lines="2"
                    class="f-12"
                  >
                    <em class="">ICD Kode</em> : <span class="text-weight-bold">{{ item.rs3 }}</span>
                  </q-item-label>
                  <q-item-label
                    lines="2"
                    class="f-12"
                    v-if="item?.rs11 !== ''"
                  >
                    <em class="">Jenis Khasus</em> : <q-badge color="cyan">
                      {{ item.rs11 }}
                    </q-badge>
                  </q-item-label>
                  <q-item-label
                    lines="3"
                  >
                    <em class="">diagnosa</em> : <span class="text-weight-bold">{{ item.masterdiagnosa?.rs4 }}</span>
                  </q-item-label>
                  <q-item-label
                    lines="2"
                  >
                    <!-- <em class="">Kasus</em>  <span class="text-weight-bold">{{ item.rs7 }}</span> -->
                    <div class="row q-gutter-sm">
                      <q-badge
                        outline
                        :label="`Kasus ${item?.rs7}`"
                        color="accent"
                      />
                      <q-badge
                        outline
                        :label="`Tipe ${item?.rs4}`"
                        :color="item?.rs4==='Primer'? 'primary':'negative'"
                      />
                    </div>
                  </q-item-label>
                  <q-item-label
                    lines="2"
                  >
                    <div class="row q-gutter-sm">
                      <div class="col-auto text-italic f-10 text-weight-bold">
                        Tanggal Input :
                      </div>
                      <div class="col-auto text-italic f-10 text-weight-bold">
                        {{ dateFullFormat( item?.rs12) }}
                      </div>
                    </div>
                  </q-item-label>
                </q-item-section>

                <q-item-section
                  side
                  top
                  class="text-right q-py-sm"
                  v-if="bisaEditHapus"
                >
                  <q-btn
                    flat
                    round
                    size="sm"
                    icon="icon-mat-edit"
                    @click="store.editFormDiagnosa(item)"
                  />
                  <q-btn
                    flat
                    round
                    size="sm"
                    icon="icon-mat-delete"
                    color="negative"
                    @click="hapusItem(item.id)"
                  />
                </q-item-section>
              </q-item>
            </transition-group>
            <q-separator />
          </q-list>
        </q-scroll-area>
        <div class="column full-height bg-grey text-white flex-center">
          <div>Belum Ada Data Diagnosa</div>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { dateFullFormat } from 'src/modules/formatter'
import { useDiagnosaDokter } from 'src/stores/simrs/igd/diagnosadokter'

const store = useDiagnosaDokter()
const $q = useQuasar()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  bisaEditHapus: {
    type: Boolean,
    default: true
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

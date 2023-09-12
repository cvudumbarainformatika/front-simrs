<template>
  <q-card
    flat
    square
    bordered
    class="column full-height"
  >
    <div class="col-auto">
      <q-bar
        class="bg-teal text-white q-pa-sm"
        style="min-height: 45px;"
      >
        <div class="f-12">
          Table Tindakan
        </div>
        <q-space />
        <div class="q-py-xs">
          <q-select
            v-model="store.notaTindakan"
            outlined
            standout="bg-yellow-3"
            bg-color="white"
            dense
            :options="store.notaTindakans"
            :display-value="`NOTA: ${store.notaTindakan==='' || store.notaTindakan === 'BARU'? 'BARU': store.notaTindakan}`"
            style="min-width: 200px;"
          />
        </div>
      </q-bar>
    </div>
    <div class="col-grow">
      <div class="full-height bg-grey">
        <q-scroll-area
          v-if="filterredTable.length"
          style="height:calc(100% - 1px)"
        >
          <q-list
            separator
            class="bg-white"
          >
            <transition-group name="list">
              <template
                v-for="(item, i) in filterredTable"
                :key="i"
              >
                <q-item class="list-move">
                  <q-item-section>
                    <q-item-label
                      lines="2"
                      class="f-12"
                    >
                      <span class="">Nota</span> : <span class="text-weight-bold text-accent">{{ item?.rs2 }} </span>
                    </q-item-label>
                    <q-item-label
                      lines="2"
                      class="f-12"
                    >
                      <span class="">Tindakan x Jml</span> : <span class="text-weight-bold">{{ item.mastertindakan?.rs2 }} </span> x <span class="text-weight-bold text-negative">{{ item.rs5?item.rs5:0 }}</span>
                    </q-item-label>
                    <q-item-label
                      lines="2"
                      class="f-12"
                    >
                      <em class="text-accent">{{ dateFullFormat(item.rs3) }} </em>
                    </q-item-label>
                  </q-item-section>

                  <q-item-section
                    side
                    top
                  >
                    <div class="row q-my-xs">
                      <q-btn
                        flat
                        round
                        size="sm"
                        icon="icon-mat-edit"
                      />
                      <q-btn
                        flat
                        round
                        size="sm"
                        icon="icon-mat-delete"
                        color="negative"
                        @click="hapusItem(item.id)"
                      />
                    </div>
                    <q-item-label>
                      <!-- <span
                    class="text-primary f-14 text-weight-bold"
                    style="border:1px solid blue;
                      margin-bottom:10px; padding: 5px;
                    "
                  >{{ item.subtotal }}</span> -->
                      <q-badge
                        outline
                        color="primary"
                        :label="`Rp. ${formatRp(item.subtotal)}`"
                      />
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator size="2px" />
              </template>
            </transition-group>
          </q-list>
        </q-scroll-area>
        <div
          v-else
          class="column full-height flex-center"
        >
          <div class=" text-white">
            Data Belum Ada
          </div>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { dateFullFormat, formatRp } from 'src/modules/formatter'
import { useLayananPoli } from 'src/stores/simrs/pelayanan/poli/layanan'
import { computed } from 'vue'

const store = useLayananPoli()
const $q = useQuasar()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const filterredTable = computed(() => {
  const val = store.notaTindakan
  const arr = props?.pasien?.tindakan
  return arr.filter(x => x.rs2 === val)
})

function hapusItem(id) {
  $q.dialog({
    dark: true,
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    // console.log('HAPUS', id)
    store.hapusTindakan(props.pasien, id)
  }).onCancel(() => {
    // console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}
</script>

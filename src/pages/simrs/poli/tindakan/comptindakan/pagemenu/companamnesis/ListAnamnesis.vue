<template>
  <q-card
    flat
    bordered
    square
    class="full-height bg-teal-2"
    style="overflow: hidden;"
  >
    <q-bar
      class="bg-teal text-white z-top"
      style="width: inherit;"
    >
      <div class="f-12">
        Data Anamnesis
      </div>
      <q-space />
      <q-btn
        dense
        size="sm"
        icon="icon-mat-close"
        flat
      />
    </q-bar>
    <q-card-section
      style="padding:0"
      class="full-height bg-grey"
    >
      <div
        v-if="pasien.anamnesis.length <= 0"
        class="column full-height flex-center"
      >
        <div class="text-white">
          Belum Ada data tersimpan
        </div>
      </div>
      <q-scroll-area
        v-else
        style="height:calc(100% - 32px);"
      >
        <q-list
          class="bg-white"
          separator
        >
          <transition-group name="list">
            <q-item
              v-for="(item , n) in lists"
              :key="n"
              class="list-move"
            >
              <q-item-section>
                <q-item-label
                  lines="2"
                  class="f-12"
                >
                  <span class="">Keluhan Utama</span> : <span class="text-weight-bold">{{ item?.rs4 }}</span>
                </q-item-label>
                <q-item-label
                  lines="2"
                >
                  <span class="">Riwayat Penyakit</span> : <span class="text-weight-bold">{{ item?.riwayatpenyakit }}</span>
                </q-item-label>
                <q-item-label
                  lines="2"
                >
                  <span class="">Riwayat Alergi</span> : <span class="text-weight-bold">{{ item?.riwayatalergi }}, {{ item?.keteranganalergi }}</span>
                </q-item-label>
                <q-item-label
                  lines="2"
                >
                  <span class="">Riwayat Pengobatan</span> : <span class="text-weight-bold">{{ item?.riwayatpengobatan }}</span>
                </q-item-label>
              </q-item-section>

              <q-item-section
                side
              >
                <div class="q-gutter-sm">
                  <q-btn
                    flat
                    round
                    size="sm"
                    icon="icon-mat-edit"
                    @click="store.editForm(item)"
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
              </q-item-section>
            </q-item>
          </transition-group>
          <q-separator />
        </q-list>
      </q-scroll-area>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { useAnamnesis } from 'src/stores/simrs/pelayanan/poli/anamnesis'
import { computed } from 'vue'
const store = useAnamnesis()
const $q = useQuasar()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const lists = computed(() => {
  const arr = props.pasien?.anamnesis
  return arr.sort((a, b) => { return b.id - a.id })
})

function hapusItem(id) {
  $q.dialog({
    dark: true,
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    // console.log('OK')
    store.deleteData(props.pasien, id)
  }).onCancel(() => {
    // console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}
</script>

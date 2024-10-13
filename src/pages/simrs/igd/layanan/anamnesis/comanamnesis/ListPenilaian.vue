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
        Data Triage
      </div>
      <q-space />
    </q-bar>
    <q-card-section
      style="padding:0"
      class="full-height bg-grey"
    >
      <div
        v-if="loadingaja"
        class="column full-height flex-center"
      >
        <div class="text-white">
          Harap Tunggu .....
        </div>
        <div class="text-white">
          Sinkron Data Ke DATABASE
        </div>
      </div>
      <div
        v-if="pasien?.penilaiananamnesis?.length <= 0"
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
            <div
              v-for="(item , n) in pasien?.penilaiananamnesis"
              :key="n"
            >
              <!-- {{ item.humpty_dumpty }} -->
              <div
                v-for="(sub , x) in item?.humpty_dumpty"
                :key="x"
              >
                {{ x }} : {{ sub?.label }}
              </div>

              <!-- <div v-if="item?.morse_fall !== null">
                <div></div>
              </div>
              <div v-if="item?.humpty_dumpty !== null">
                <q-item
                  v-for="(humpty_dumpty , a) in item?.humpty_dumpty"
                  :key="a"
                  class="list-move"
                >
                  {{ humpty_dumpty?.usia }}
                </q-item>
              </div>
              <div v-if="item?.ontario !== null">
                ontario
              </div>
            </div> -->

              <q-item-section
                side
              >
                <div class="q-gutter-sm">
                  <!-- <q-btn
                    flat
                    round
                    size="sm"
                    icon="icon-mat-edit"
                    @click="store.editForm(item)"
                  /> -->
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
            </div>
          </transition-group>
          <q-separator />
        </q-list>
      </q-scroll-area>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { usePenilaianAnamnesisIgd } from 'src/stores/simrs/igd/penilaiananamnesis'
// import { computed } from 'vue'
const store = usePenilaianAnamnesisIgd()
const $q = useQuasar()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  loadingaja: {
    type: Boolean,
    default: false
  }
})

// const lists = computed(() => {
//   const arr = props.pasien?.penilaiananamnesis
//   return arr?.sort((a, b) => { return b.id - a.id })
// })

function hapusItem (id) {
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

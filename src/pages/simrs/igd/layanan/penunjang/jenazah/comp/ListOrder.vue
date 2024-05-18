<template>
  <div class="column full-height">
    <q-bar class="col-auto bg-teal text-white">
      <div class="q-py-sm f-14 ">
        List Permintaan
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
          :display-value="`NOTA: ${store.form.nota === null || store.form.nota === '' || store.form.nota === 'BARU' ? 'BARU' : store.form.nota}`"
          style="min-width: 200px;"
        />
      </div>
    </q-bar>
    <div class="col-grow bg-grey">
      <div
        v-if="filterredTable.length === 0"
        class="column full-height flex-center text-white"
      >
        Belum Ada Permintaan Perawatan Jenazah
      </div>
      <q-scroll-area
        v-else
        style="height:calc(100% - 1px)"
      >
        <q-list
          separator
        >
          <transition-group>
            <template
              v-for="(item, i) in filterredTable"
              :key="i"
            >
              <q-item class="bg-white list-move">
                <q-item-section>
                  <q-item-label
                    lines="2"
                    class="f-12"
                  >
                    <span class="">NOMOR</span> : <span class="text-weight-bold text-accent">{{ item?.rs10 }} </span>
                  </q-item-label>
                  <!-- <q-item-label
                    lines="2"
                    class="f-12"
                  >
                    <span class=""> Tujuan : </span> <span class="text-weight-bold"> {{ item?.masterpenunjang?.rs2 }} </span>
                  </q-item-label> -->
                  <q-item-label
                    lines="2"
                    class="f-12"
                  >
                    <span>Keterangan : </span> <em class="text-accent">{{ item?.rs6 }} </em>
                  </q-item-label>
                </q-item-section>

                <q-item-section
                  side
                  top
                >
                  <div class="row q-my-xs">
                    <!-- <q-btn
                      flat
                      round
                      size="sm"
                      icon="icon-mat-edit"
                    /> -->
                    <q-btn
                      flat
                      round
                      size="sm"
                      icon="icon-mat-delete"
                      color="negative"
                      :loading="store.loadingHapus"
                      :disable="store.loadingHapus"
                      @click="hapusItem(item?.id)"
                    />
                  </div>
                </q-item-section>
              </q-item>
            </template>
          </transition-group>
        </q-list>
      </q-scroll-area>
    </div>
  </div>
</template>
<script setup>
import { useQuasar } from 'quasar'
import { useJenazahIgd } from 'src/stores/simrs/igd/jenazah'
import { computed } from 'vue'

const $q = useQuasar()
const store = useJenazahIgd()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const filterredTable = computed(() => {
  const val = store?.form?.nota
  const arr = props?.pasien?.permintaanperawatanjenazah
  console.log('pasien ', props?.pasien)
  console.log('pasien fisio', arr)
  return arr?.length ? arr?.filter(x => x?.rs10 === val) : []
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
    store.hapusPermintaan(props.pasien, id)
  }).onCancel(() => {
    // console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}
</script>

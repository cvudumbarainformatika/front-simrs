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
          :display-value="`NOTA: ${store.form.notaambulan === null || store.form.notaambulan === '' || store.form.notaambulan === 'BARU' ? 'BARU' : store.form.notaambulan}`"
          style="min-width: 200px;"
        />
      </div>
    </q-bar>
    <div class="col-grow bg-grey">
      <div
        v-if="filterredTable.length === 0"
        class="column full-height flex-center text-white"
      >
        Belum Ada Permintaan Fisio Terapi
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
                    <span class="">Tujuan Pasien</span> : <span class="text-weight-bold text-accent">{{ item?.tujuan?.rs2 }} </span>
                  </q-item-label>
                  <q-item-label
                    lines="2"
                    class="f-12"
                  >
                    <span class=""> Pelayanan Supir : </span> <span class="text-weight-bold"> {{ item?.rs12 }} </span>
                  </q-item-label>
                  <q-item-label
                    lines="2"
                    class="f-12"
                  >
                    <span class=""> Pelayanan Perawat : </span> <span class="text-weight-bold"> {{ item?.rs15 }} </span>
                  </q-item-label>
                  <q-item-label
                    lines="2"
                    class="f-12"
                  >
                    <span class=""> Nama Perawat : </span> <span class="text-weight-bold"> {{ item?.perawat?.rs2 }}, {{ item?.perawat2?.rs2 ? item?.perawat2?.rs2 : '-' }} </span>
                  </q-item-label>
                  <q-item-label
                    lines="2"
                    class="f-12"
                  >
                    <span>Keterangan : </span> <em class="text-accent">{{ item?.rs11 ? item?.rs11 : '-' }} </em>
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
// import { useQuasar } from 'quasar'
import { useAmbulanStore } from 'src/stores/simrs/igd/ambulan'
import { computed } from 'vue'

// const $q = useQuasar()
const store = useAmbulanStore()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const filterredTable = computed(() => {
  const val = store?.form?.notaambulan
  const arr = props?.pasien?.ambulan
  console.log('val ', val)
  console.log('pasien ambulan', arr)
  return arr?.length ? arr?.filter(x => x?.nota === val) : []
})

// function hapusItem(id) {
//   $q.dialog({
//     dark: true,
//     title: 'Peringatan',
//     message: 'Apakah Data ini akan dihapus?',
//     cancel: true,
//     persistent: true
//   }).onOk(() => {
//     // console.log('HAPUS', id)
//     store.hapusPermintaan(props.pasien, id)
//   }).onCancel(() => {
//     // console.log('Cancel')
//   }).onDismiss(() => {
//     // console.log('I am triggered on both OK and Cancel')
//   })
// }
</script>

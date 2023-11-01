<template>
  <div
    class="full-height q-pa-sm"
  >
    <div class="row q-col-gutter-x-xs full-height">
      <div class="col-8 full-height">
        <PlanningPage
          :key="props.pasien"
          :pasien="props.pasien"
        />
      </div>
      <div class="col-4 full-height">
        <div v-if="pasien?.planning?.length">
          <q-card
            v-for="(item, i) in pasien?.planning"
            :key="i"
            flat
            bordered
          >
            <div class="q-pa-md">
              <app-avatar-pasien
                :key="pasien"
                :pasien="pasien"
              />
            </div>

            <q-card-section>
              <q-btn

                v-print="printObj"
                fab
                color="dark"
                icon="icon-mat-print"
                class="absolute"
                flat
                dense
                size="sm"
                style="top: 0; right: 50px; transform: translateY(-100%);"
              />
              <q-btn
                fab
                color="negative"
                icon="icon-mat-delete"
                class="absolute"
                flat
                dense
                size="sm"
                style="top: 0; right: 12px; transform: translateY(-100%);"
                @click="hapusItem(item?.id)"
              />
              <div
                class="row no-wrap items-center"
                style="margin-top: -20px;"
              >
                <div class="col text-h6 ellipsis">
                  {{ item?.rs4 }}
                </div>
                <q-badge
                  outline
                  color="accent"
                >
                  ke {{ item?.masterpoli?.rs2 }}
                </q-badge>
              </div>
            </q-card-section>

            <q-separator />
            <div id="printMe">
              <div class="row items-center">
                <div>
                  <q-img
                    src="~assets/logos/logobpjs.svg"
                    spinner-color="white"
                    style="height: 3.56cm; max-width: 2.86cm"
                  />
                </div>
                <div>nama</div>
                <div>nomor</div>
              </div>
            </div>
          </q-card>
        </div>
        <div
          v-else
          class="full-height flex-center column"
        >
          Tidak Ada Planning Pasien
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePerencanaanPoliStore } from 'src/stores/simrs/pelayanan/poli/perencanaan'
import PlanningPage from './compperencanaan/PlanningPage.vue'
import { onMounted } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const store = usePerencanaanPoliStore()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

onMounted(() => {
  store.getMasterPlanning()
  store.getMasterPoli()
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
    store.hapusItem(props.pasien, id)
  }).onCancel(() => {
    // console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}
const printObj = {
  id: 'printMe',
  popTitle: 'Rencana Pasien'
  // extraCss: 'https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css',
  // extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',

}
</script>

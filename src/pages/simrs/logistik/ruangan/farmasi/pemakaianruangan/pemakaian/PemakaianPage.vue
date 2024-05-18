<template>
  <div
    ref="refPage"
    :style="`height: calc(100% - ${!style.componentfull? headHigh + 60 :headHigh}px)`"
  >
    <!-- class="full-height" -->
    <!-- {{ headHigh }} -->
    <div
      :class="style.componentfull?'':'q-pa-xs'"
      :style="`min-height: ${!style.componentfull ? h-15 : h + 105}px; overflow:hidden`"
    >
      <div class="header">
        <HeaderComp
          ada-per-page
          ada-refresh
          use-full
          label-cari="cari obat ..."
          :search="store.params.q"
          :flag="store.params.flag"
          :per-page="store.params.per_page"
          :items="store.items"
          :nomor="store?.form?.nopemakaian"
          @cari="store.setSearch"
          @refresh="store.refresh"
          @set-per-page="store.setPerPage"
          @set-flag="store.setFlag"
          @set-periode="(val)=>store.setPeriodik(val)"
          @simpan="simpan"
          @selesai="selesai"
        />
      </div>
      <q-card
        flat
        no-shadow
        square
        class="my-flex-1 scroll"
        :style="`height: calc( 100vh - ${ style.componentfull ? 61 : 172}px);`"
      >
        <!-- style="`height:{props.tinggi}px`" -->
        <q-scroll-area
          style="height: calc(100%);"
        >
          <ListPage :style="`margin-bottom:  ${ pakai ? 95 : 55}px;`" />
        </q-scroll-area>

        <div

          class="absolute-bottom "
        >
          <div
            v-if="checked || !!store.form.nopemakaian"
            class="row q-py-xs items-center bg-white"
          >
            <div class="col-6">
              <div
                v-if="!!store.form.nopemakaian"
                class="row items-center"
              >
                <div class="col">
                  Nomor pemakaian : {{ store.form.nopemakaian }}
                </div>
                <div class="col q-ml-sm">
                  <q-btn
                    push
                    label="Kunci "
                    no-caps
                    dense
                    color="green"
                    icon="icon-mat-done_all"
                    @click="selesai"
                  >
                    <q-tooltip
                      class="primary"
                      :offset="[10, 10]"
                    >
                      Kunci Pemakaian
                    </q-tooltip>
                  </q-btn>
                </div>
              </div>
            </div>
            <div class="col-6 text-right">
              <div
                v-if="checked "
                class="row justify-end"
              >
                <app-input-date
                  :model="store.form.tgl"
                  label="tanggal"
                  outlined
                  @set-model="store.setForm('tgl', $event)"
                />
                <q-btn
                  push
                  label="Simpan "
                  no-caps
                  dense
                  color="primary"
                  icon="icon-mat-save"
                  class="q-mx-md"
                  @click="simpan"
                >
                  <q-tooltip
                    class="primary"
                    :offset="[10, 10]"
                  >
                    Simpan
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
          </div>
          <BottomComp
            v-if="Object.keys(store.meta).length"
            class="bg-primary text-white"
            :meta="store.meta"
            @go-to="store.setPage"
          />
        </div>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { notifCenterVue } from 'src/modules/utils'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useStyledStore } from 'src/stores/app/styled'
import { useFarmasiPemakaianRuanganStore } from 'src/stores/simrs/farmasi/pemakaianruangan/pemakaianruangan'
import { computed, defineAsyncComponent, onMounted, ref, onUnmounted } from 'vue'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  headHigh: { type: Number, default: 40 }
})
const refPage = ref(null)
const h = ref(0)
const style = useStyledStore()
const store = useFarmasiPemakaianRuanganStore()
const apps = useAplikasiStore()

const HeaderComp = defineAsyncComponent(() => import('./comp/HeaderComp.vue'))
const BottomComp = defineAsyncComponent(() => import('./comp/BottomComp.vue'))
const ListPage = defineAsyncComponent(() => import('./comp/TableComp.vue'))

const pakai = computed(() => {
  const ada = store.items.filter(a => a.checked === true)
  if (ada.length || !!store.form.nopemakaian) return true
  else return false
})
function simpan() {
  console.log('simpan')

  store.simpanPemakaian()
}
function selesai() {
  console.log('selesai')
  store.selesaiPemakaian()
}
const checked = computed(() => {
  const ada = store.items.filter(a => a.checked === true)
  if (ada.length) return true
  else return false
})
onMounted(() => {
  console.log('refPage', refPage.value.clientHeight)
  h.value = refPage.value.clientHeight
  if (apps?.user?.kdruangansim) {
    store.setParam('kdruang', apps?.user?.kdruangansim)
    store.setForm('kdruang', apps?.user?.kdruangansim)
  } else {
    const adaRu = apps?.user?.pegawai?.kdruangansim.split('|')
    const ruNya = adaRu.filter(x => x.includes('R-'))
    if (ruNya.length > 1) notifCenterVue('ada lebih dari satu akses ruangan')
    else {
      store.setParam('kdruang', ruNya[0])
      store.setForm('kdruang', ruNya[0])
    }
  }
  store.getInitialData()
})
onUnmounted(() => {
  store.resetForm()
})
</script>

<style></style>

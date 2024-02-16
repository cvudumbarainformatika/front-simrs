<template>
  <div
    class=""
    :class="style.componentfull?'':'q-pa-xs'"
    :style="`max-height: ${!style.componentfull ? h : h + 40}px; overflow:hidden`"
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
      :style="`height: calc( 100vh - ${ pakai ? 172 : 172}px);`"
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
          v-if="checked"
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
                  label="Selesai "
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
                    Selesai
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
          </div>
          <div class="col-6 text-right">
            <q-btn
              push
              label="Simpan "
              no-caps
              dense
              color="primary"
              icon="icon-mat-save"
              class="q-mr-md"
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
        <BottomComp
          v-if="Object.keys(store.meta).length"
          class="bg-primary text-white"
          :meta="store.meta"
          @go-to="store.setPage"
        />
      </div>
    </q-card>
  </div>
</template>

<script setup>
import { notifCenterVue } from 'src/modules/utils'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useStyledStore } from 'src/stores/app/styled'
import { useFarmasiPemakaianRuanganStore } from 'src/stores/simrs/farmasi/pemakaianruangan/pemakaianruangan'
import { computed, defineAsyncComponent, onMounted, ref } from 'vue'

const h = ref(516)
const style = useStyledStore()
const store = useFarmasiPemakaianRuanganStore()
const apps = useAplikasiStore()

const HeaderComp = defineAsyncComponent(() => import('./comp/HeaderComp.vue'))
const BottomComp = defineAsyncComponent(() => import('./comp/BottomComp.vue'))
const ListPage = defineAsyncComponent(() => import('./comp/TableComp.vue'))

const pakai = computed(() => {
  const ada = store.items.filter(a => a.checked === true)
  if (ada.length) return true
  else return false
})
function simpan() {
  console.log('simpan')
  if (!store.form.nopemakaian) store.setForm('nopemakaian', 'asdasdasdas')
  else store.setForm('nopemakaian', '')

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
  // console.log('ref', pageRef.value.$el.clientHeight);
  if (apps?.user?.kdruangansim) store.setParam('kdruang', apps?.user?.kdruangansim)
  else {
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
</script>

<style></style>

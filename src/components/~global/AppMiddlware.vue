<template>
  <q-card
    class="bg-primary text-white"
    flat
  >
    <q-card-section>
      <div class="row">
        <div class="col-4">
          <div class="q-pa-lg">
            <q-img
              :src="gambar"
            />
          </div>
        </div>
        <div class="col-8 q-pa-lg">
          <div
            v-for="(x, y) in info"
            :key="y"
            class="row items-center q-mt-md no-wrap"
          >
            <div class="column">
              <div
                class="kotak column flex-center"
                :class="y+1 === info.length?'bg-secondary text-white':'bg-white text-primary'"
              >
                {{ y + 1 }}
              </div>
            </div>
            <div class="text-subtitle2 q-ml-lg">
              {{ x }}
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
    <q-btn
      ref="btnPrint"
      target="_blank"
      label="With href - open in new window"
      color="purple"
      style="display: none;"
      @click="linkClick"
    />
  </q-card>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
// import madsaleh from 'src/assets/images/mad_saleh_minum.png'
const gambar = computed(() => {
  return new URL('../../assets/images/mad_saleh_minum.png', import.meta.url).href
})
const router = useRouter()

const btnPrint = ref()

const info = ref([
  'Selamat Datang di Aplikasi Xenter UOBK RSUD MOHamad SALEH',
  'Silahkan Pilih Menu dikiri Aplikasi .... Menu yang tampil Adalah menu yang sesuai dengan hak Akses User Anda',
  'Jika Menu Aplikasi berisi content yang tidak sesuai dengan harapan anda... silahkan mengajukan pembenahan content kepada pihak yang berwenang',
  'Jangan Lupa Tersenyum ... Selamat Bekerja'

])

onMounted(() => {
  // btnPrint.value.click()
})

function linkClick () {
  const routeData = router.resolve({ path: '/print/antrian', query: { nomor: 'B-006', poli: 'poli MATA', norm: '789609' } })
  window.open(routeData.href, '_blank')
}
</script>

<style lang="scss" scoped>
.kotak {
  // background-color: #fff;
  border-radius: 5px;
  width:50px !important;
  height: 50px !important;
}

.txt-underline {
  text-decoration: underline;
}
</style>

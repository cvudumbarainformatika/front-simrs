<template>
  <div
    class="full-height"
  >
    <div
      class="row items-start bg-grey-8 text-white q-pr-sm"
      :style=" `height: ${tinggiDetailPas}px;`"
    >
      <div
        class="col-3"
      >
        <div class="row">
          <div
            class="absolute-top bg-dark text-white col-3"
            :style=" `height: ${tinggiDetailPas}px; margin-top: ${h}px`"
          >
            <div class="absolute-top-right">
              <div class="q-pa-sm">
                <q-btn
                  outline
                  round
                  style="color: goldenrod;"
                  :icon="icon(store?.rencana?.flag)"
                />
              </div>
            </div>
            <div class="absolute-top">
              {{ store?.rencana?.no_rencbeliobat }}
            </div>
            <div class="absolute-bottom">
              <!-- {{ store?.rencana?.no_rencbeliobat }} -->
              nomor verif
            </div>
          </div>
        </div>
      </div>
      <div
        class="col-9"
        :style=" `height: ${tinggiDetailPas}px;`"
      >
        <div class="row q-ml-sm">
          col kanan
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useVerifikasiRencanaPesanStore } from 'src/stores/simrs/farmasi/verifikasiperencanaanpemesanan/verifrencana'
import { ref } from 'vue'

// eslint-disable-next-line no-unused-vars
const store = useVerifikasiRencanaPesanStore()

const tinggiDetailPas = ref(60)
const h = ref(0)

function icon(val) {
  let balik = ' Belum ada status'
  switch (val) {
    case '':
      balik = ' draft'
      break
    case '1':
      balik = 'icon-fa-check-to-slot-solid'
      break
    case '2':
      balik = 'icon-fa-check-double-solid'
      break
    case '3':
      balik = 'Selesai'
      break
    case '4':
      balik = 'Returned'
      break

    default:
      break
  }
  return balik
}
</script>

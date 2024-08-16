<template>
  <q-dialog maximized>
    <div>
      <div class="print print-hide absolute-top-right">
        <q-btn
          ref="refPrint"
          v-print="printObj"
          unelevated
          color="dark"
          round
          size="sm"
          icon="icon-mat-print"
        >
          <q-tooltip
            class="primary"
            :offset="[10, 10]"
          >
            Print
          </q-tooltip>
        </q-btn>
        <q-btn
          color="primary"
          round
          size="sm"
          icon="icon-my-print_setting"
          @click="tandatangan.setOpen"
        >
          <q-tooltip
            class="primary"
            :offset="[10, 10]"
          >
            Pilih tanda tangan
          </q-tooltip>
        </q-btn>
        <q-btn
          color="primary"
          round
          size="sm"
          icon="icon-mat-close"
          @click="emits('close')"
        >
          <q-tooltip
            class="primary"
            :offset="[10, 10]"
          >
            Tutup
          </q-tooltip>
        </q-btn>
      </div>
      <q-card
        id="printMe"
        flat
      >
        <!-- style="width:210mm; height:310mm; margin:10mm; " -->
        <!-- heder -->
        <q-card-section>
          <app-kop-surat />
          <slot name="isi" />
        </q-card-section>
        <!-- tanda tangan -->
        <q-card-section>
          <div class="row justify-between q-col-gutter-sm ">
            <div class="col-6 text-center" />
            <div class="col-6 text-center">
              Probolinggo, {{ dateFullFormat(tanggal) }}
            </div>
          </div>
          <!-- kanan kiri -->
          <div>
            <!-- options -->
            <div class="row justify-between q-col-gutter-sm print-hide">
              <div class="col-6 text-center">
                <app-autocomplete-new
                  v-model="tandatangan.tt.kiri"
                  label="pilih yang berdanda tangan"
                  autocomplete="nama"
                  option-label="nama"
                  option-value="value"
                  outlined
                  valid
                  :source="tandatangan?.optionTT"
                  @on-select="tandatangan?.kiriSelected"
                />
              </div>
              <div class="col-6 text-center">
                <app-autocomplete-new
                  v-model="tandatangan.tt.kanan"
                  label="pilih yang berdanda tangan"
                  autocomplete="nama"
                  option-label="nama"
                  option-value="value"
                  outlined
                  valid
                  :source="tandatangan?.optionTT"
                  @on-select="tandatangan?.kananSelected"
                />
              </div>
            </div>
            <!-- Input -->
            <div class="row justify-between q-col-gutter-sm print-hide">
              <div class="col-6 text-center">
                <app-input
                  v-model="tandatangan.kiri"
                  outlined
                  valid
                  label="Text kiri"
                />
              </div>
              <div class="col-6 text-center">
                <app-input
                  v-model="tandatangan.kanan"
                  outlined
                  valid
                  label="Text kanan"
                />
              </div>
            </div>
            <div class="row justify-between q-col-gutter-sm">
              <div class="col-6 text-center">
                {{ tandatangan?.kiri }}
              </div>
              <div class="col-6 text-center">
                {{ tandatangan?.kanan }}
              </div>
            </div>
            <div class="row justify-between q-col-gutter-sm q-mb-xl">
              <div class="col-6 text-center">
                {{ tandatangan?.onKiri?.acr }}
              </div>
              <div class="col-6 text-center">
                {{ tandatangan?.onKanan?.acr }}
              </div>
            </div>
            <div class="row justify-between q-col-gutter-sm">
              <div class="col-6 text-center">
                <div v-if="!tandatangan?.onKiri?.ada">
                  <div v-if="tandatangan?.tt?.kiri!==null">
                    <div class="print-hide">
                      <app-input
                        v-model="freeTextKiri"
                        label="Nama"
                        :filled="false"
                      />
                    </div>
                    <div class="print-only">
                      {{ freeTextKiri===''?'(.......................................)':freeTextKiri }}
                    </div>
                  </div>
                </div>
                <div v-if="tandatangan?.onKiri?.ada">
                  <div class="row justify-center">
                    {{ tandatangan?.onKiri?.nama }}
                  </div>
                  <div class="row justify-center">
                    {{ tandatangan?.onKiri?.nip }}
                  </div>
                </div>
              </div>
              <div class="col-6 text-center">
                <div v-if="!tandatangan?.onKanan?.ada">
                  <div v-if="tandatangan?.tt?.kanan!==null">
                    <div class="print-hide">
                      <app-input
                        v-model="freeTextKanan"
                        label="Nama"
                        :filled="false"
                      />
                    </div>
                    <div class="print-only">
                      {{ freeTextKanan===''?'(.......................................)':freeTextKanan }}
                    </div>
                  </div>
                </div>
                <div v-if="tandatangan.onKanan.ada">
                  <div class="row justify-center">
                    {{ tandatangan.onKanan.nama }}
                  </div>
                  <div class="row justify-center">
                    {{ tandatangan.onKanan.nip }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- kanan1 kiri1 -->
          <div class="q-mt-md">
            <!-- options -->
            <div class="row justify-between q-col-gutter-sm print-hide">
              <div class="col-6 text-center">
                <app-autocomplete-new
                  v-model="tandatangan.tt.kiri1"
                  label="pilih yang berdanda tangan"
                  autocomplete="nama"
                  option-label="nama"
                  option-value="value"
                  outlined
                  valid
                  :source="tandatangan?.optionTT"
                  @on-select="tandatangan?.kiri1Selected"
                />
              </div>
              <div class="col-6 text-center">
                <app-autocomplete-new
                  v-model="tandatangan.tt.kanan1"
                  label="pilih yang berdanda tangan"
                  autocomplete="nama"
                  option-label="nama"
                  option-value="value"
                  outlined
                  valid
                  :source="tandatangan?.optionTT"
                  @on-select="tandatangan?.kanan1Selected"
                />
              </div>
            </div>
            <!-- Input -->
            <div class="row justify-between q-col-gutter-sm print-hide">
              <div class="col-6 text-center">
                <app-input
                  v-model="tandatangan.kiri1"
                  outlined
                  valid
                  label="Text kiri"
                />
              </div>
              <div class="col-6 text-center">
                <app-input
                  v-model="tandatangan.kanan1"
                  outlined
                  valid
                  label="Text kanan"
                />
              </div>
            </div>
            <div class="row justify-between q-col-gutter-sm">
              <div class="col-6 text-center">
                {{ tandatangan?.kiri1 }}
              </div>
              <div class="col-6 text-center">
                {{ tandatangan?.kanan1 }}
              </div>
            </div>
            <div class="row justify-between q-col-gutter-sm q-mb-xl">
              <div class="col-6 text-center">
                {{ tandatangan?.onKiri1?.acr }}
              </div>
              <div class="col-6 text-center">
                {{ tandatangan?.onKanan1?.acr }}
              </div>
            </div>
            <div class="row justify-between q-col-gutter-sm">
              <div class="col-6 text-center">
                <div v-if="!tandatangan?.onKiri1?.ada">
                  <div v-if="tandatangan?.tt?.kiri1!==null">
                    <div class="print-hide">
                      <app-input
                        v-model="freeTextKiri1"
                        label="Nama"
                        :filled="false"
                      />
                    </div>
                    <div class="print-only">
                      {{ freeTextKiri1===''?'(.......................................)':freeTextKiri1 }}
                    </div>
                  </div>
                </div>
                <div v-if="tandatangan?.onKiri1?.ada">
                  <div class="row justify-center">
                    {{ tandatangan?.onKiri1?.nama }}
                  </div>
                  <div class="row justify-center">
                    {{ tandatangan?.onKiri1?.nip }}
                  </div>
                </div>
              </div>
              <div class="col-6 text-center">
                <div v-if="!tandatangan?.onKanan1?.ada">
                  <div v-if="tandatangan?.tt?.kanan1!==null">
                    <div class="print-hide">
                      <app-input
                        v-model="freeTextKanan1"
                        label="Nama"
                        :filled="false"
                      />
                    </div>
                    <div class="print-only">
                      {{ freeTextKanan1===''?'(.......................................)':freeTextKanan1 }}
                    </div>
                  </div>
                </div>
                <div v-if="tandatangan.onKanan1.ada">
                  <div class="row justify-center">
                    {{ tandatangan.onKanan1.nama }}
                  </div>
                  <div class="row justify-center">
                    {{ tandatangan.onKanan1.nip }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- option -->
          <div class="row justify-center q-col-gutter-sm print-hide">
            <div>
              <app-autocomplete-new
                v-model="tandatangan.tt.tengah"
                label="pilih yang berdanda tangan"
                autocomplete="nama"
                option-label="nama"
                option-value="value"
                outlined
                valid
                :source="tandatangan.optionTT"
                @on-select="tandatangan.tengahSelected"
              />
            </div>
          </div>
          <!-- input -->
          <div class="row justify-center q-col-gutter-sm print-hide">
            <div>
              <app-input
                v-model="tandatangan.tengah"
                outlined
                valid
                label="Text Tengah"
              />
            </div>
          </div>
          <div class="row justify-center q-col-gutter-sm">
            <div>{{ tandatangan.tengah }}</div>
          </div>
          <div class="row justify-center q-col-gutter-sm q-mb-xl">
            <div>{{ tandatangan.onTengah.acr }}</div>
          </div>
          <div v-if="!tandatangan.onTengah.ada">
            <div
              v-if="tandatangan.tt.tengah!==null"
              class="row justify-center"
            >
              <div class="print-hide">
                <app-input
                  v-model="freeTextBawah"
                  label="Nama"
                  :filled="false"
                />
              </div>
              <div class="print-only">
                {{ freeTextBawah===''?'(.......................................)':freeTextBawah }}
              </div>
            </div>
          </div>
          <div v-if="tandatangan.onTengah.ada">
            <div class="row justify-center">
              {{ tandatangan.onTengah.nama }}
            </div>
            <div class="row justify-center">
              {{ tandatangan.onTengah.nip }}
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <TandaTanganPage v-model="tandatangan.isOpen" />
  </q-dialog>
</template>
<script setup>
import { useTandaTanganStore } from 'src/stores/simrs/logistik/sigarang/tantatangan/tandatangan'
import { ref, defineAsyncComponent } from 'vue'
import { date } from 'quasar'
import { dateFullFormat } from 'src/modules/formatter'

defineProps({
  // item: { type: Object, default: () => {} },
  tanggal: { type: String, default: date.formatDate(Date.now(), 'YYYY-MM-DD') }
})
const emits = defineEmits(['close'])

const tandatangan = useTandaTanganStore()
tandatangan.getInitialData()

const TandaTanganPage = defineAsyncComponent(() => import('src/pages/simrs/sigarang/tandatangan/TandaTanganPage.vue'))

const freeTextKiri = ref('')
const freeTextKanan = ref('')
const freeTextKiri1 = ref('')
const freeTextKanan1 = ref('')
const freeTextBawah = ref('')
// const keterangan = ref('')

const printObj = {
  id: 'printMe'
  // popTitle: title,
  // extraCss: 'https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css',
  // extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',

}

function printPage () {
  console.log('print ')
  window.print()
  setTimeout(function () {
    afterPrint()
  }, 100)
}
function afterPrint () {
  window.close()
  emits('close')
}

defineExpose({ printPage })
</script>
<style lang="scss" scoped>
.print{
  position: absolute;
    right: 30px;
    top: 5px;
    z-index: 10;

}
.garis-bawah{
  border-bottom: 6px solid black;
  border-bottom-style: double;
}
.border-box{
  border: 1px solid black;
}
.border-tb{
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}
.border-left{
  border-left: 1px solid black;
}
.border-right{
  border-right: 1px solid black;
}
.border-bottom{
  border-bottom: 1px solid black;
}
</style>

<template>
  <div class="column full-height">
    <q-bar class="col-auto bg-teal text-white">
      <div class="q-py-sm f-14 ">
        List Permintaan Laborat
      </div>
      <q-space />
      <div class="q-py-xs">
        <q-select
          v-model="store.notalaborat"
          outlined
          standout="bg-yellow-3"
          bg-color="white"
          dense
          :options="store.notalaborats"
          :display-value="`NOTA: ${store.notalaborat === null || store.notalaborat === '' || store.notalaborat === 'BARU' ? 'BARU' : store.notalaborat}`"
          style="min-width: 200px;"
        />
      </div>
    </q-bar>
    <div class="col-grow bg-grey">
      <!-- jika belum ada pemeriksaan -->
      <div
        v-if="pasien?.laborats.length === 0"
        class="column full-height flex-center text-white"
      >
        Belum Ada Permintaan Order ke Laborat
      </div>
      <q-scroll-area
        v-else
        style="height:calc(100% - 1px)"
      >
        <q-list
          separator
        >
          <transition-group name="list">
            <template
              v-for="(item, i) in props.pasien?.laborats"
              :key="i"
            >
              <q-item
                class="q-pa-sm list-move bg-white"
                style="margin-bottom:.2em"
              >
                <q-item-section>
                  <q-item-label
                    lines="2"
                    class="f-12"
                  >
                    <span class="">Nota</span> : <span class="text-weight-bold text-accent">{{ item?.nota }} </span>
                  </q-item-label>
                  <q-item-label
                    lines="2"
                    class="f-12"
                  >
                    Tanggal <span class="text-primary">{{ item?.tgl_order }} </span>
                  </q-item-label>
                  <q-item-label
                    lines="2"
                    class="f-12"
                  >
                    <span
                      class="text-weight-bold"
                      :class="item?.details.length === 1?'text-orange':'text-primary'"
                    >{{ item?.details.length ===1? 'NON-PAKET':'PAKET' }}</span>
                  </q-item-label>
                </q-item-section>
                <q-item-section
                  side
                  top
                >
                  <div class="row q-my-xs">
                    <q-btn
                      flat
                      round
                      size="sm"
                      icon="icon-mat-edit"
                    />
                    <q-btn
                      flat
                      round
                      size="sm"
                      icon="icon-mat-delete"
                      color="negative"
                    />
                  </div>
                  <q-item-label>
                    <q-badge
                      outline
                      color="primary"
                      :label="`Rp. ${formatRp(parseInt(item?.details[0]?.rs6) + parseInt(item?.details[0]?.rs13))}`"
                    />
                  </q-item-label>
                </q-item-section>
              </q-item>
              <!-- <q-separator /> -->
            </template>
          </transition-group>
        </q-list>
      </q-scroll-area>
    <!-- <div class="col-4">
      <div class="column q-pa-md">
        <div class="flex items-center">
          <div style="width:150px">
            Pasien Puasa ?
          </div>
          <div class="q-gutter-sm">
            <q-radio
              v-model="store.form.pasienpuasa"
              val="Tidak"
              label="Tidak"
              size="sm"
              dense
            />
            <q-radio
              v-model="store.form.pasienpuasa"
              val="Iya"
              label="Iya"
              size="sm"
              dense
            />
          </div>
        </div>
        <q-separator class="q-my-sm" />
        <div class="flex items-center q-mt-sm">
          <div style="width:150px">
            Cito ?
          </div>
          <div class="q-gutter-sm">
            <q-radio
              v-model="store.form.cito"
              val="Tidak"
              label="Tidak"
              size="sm"
              dense
            />
            <q-radio
              v-model="store.form.cito"
              val="Iya"
              label="Iya"
              size="sm"
              dense
            />
          </div>
        </div>
      </div>
      <div class="absolute-bottom bg-yellow-3 text-right q-pa-sm">
        <q-btn
          label="Simpan & Kirim Order"
          color="primary"
          @click="saveOrder"
        />
      </div>
    </div> -->
    </div>
  </div>
</template>
<script setup>
import { formatRp } from 'src/modules/formatter'
import { usePenunjangPoli } from 'src/stores/simrs/pelayanan/poli/penunjang'

const store = usePenunjangPoli()

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
</script>

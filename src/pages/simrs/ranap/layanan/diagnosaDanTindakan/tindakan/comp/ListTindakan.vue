<script setup>
import { dateFullFormat, formatRp } from 'src/modules/formatter'
import { useTindakanRanapStore } from 'src/stores/simrs/ranap/tindakan'
import { computed, onMounted } from 'vue'

const store = useTindakanRanapStore()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  kasus: {
    type: Object,
    default: null
  },
  nakes: {
    type: String,
    default: null
  }
})

const filterredTable = computed(() => {
  // const val = store.notaTindakan
  const arr = props?.pasien?.tindakan
  return arr
  // return arr?.filter(x => x.rs2 === val)
})

onMounted(() => {
  Promise.all([
    store.getNota(props.pasien),
    store.getTindakan(props.pasien)
  ])
})
</script>

<template>
  <div class="fit">
    <q-list
      separator
      class="bg-white"
    >
      <transition-group name="list">
        <template
          v-for="(item, i) in filterredTable"
          :key="i"
        >
          <q-item class="list-move">
            <q-item-section>
              <q-item-label
                lines="2"
                class="f-12"
              >
                <span class="">Nota</span> : <span class="text-weight-bold text-accent">{{ item?.rs2 }} </span>
              </q-item-label>
              <q-item-label
                lines="2"
                class="f-12"
              >
                <span class="">Tindakan x Jml</span> : <span class="text-weight-bold">{{ item.mastertindakan?.rs2 }} </span> x <span class="text-weight-bold text-negative">{{ item.rs5?item.rs5:0 }}</span>
              </q-item-label>

              <q-item-label
                lines="2"
                class="f-12"
              >
                <em class="text-accent">{{ dateFullFormat(item.rs3) }} </em>
              </q-item-label>
              <q-item-label
                lines="2"
                class="f-10 text-italic"
              >
                <span class="">Keterangan</span> : <span class="">{{ item?.rs20 }} </span>
              </q-item-label>
              <q-item-label
                lines="2"
                class="f-10 text-italic"
              >
                <span class="">oleh</span> :
                <!-- <span class="">{{ setPelaksana(item) }} </span> -->
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
                  icon="icon-mat-cloud_upload"
                  @click="bukaUploadan(item?.id)"
                >
                  <q-tooltip>Upload Gambar Dokumen</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  round
                  size="sm"
                  icon="icon-mat-delete"
                  color="negative"
                  @click="hapusItem(item.id)"
                >
                  <q-tooltip>Hapus </q-tooltip>
                </q-btn>
              </div>
              <q-item-label>
                <!-- <span
                    class="text-primary f-14 text-weight-bold"
                    style="border:1px solid blue;
                      margin-bottom:10px; padding: 5px;
                    "
                  >{{ item.subtotal }}</span> -->
                <q-badge
                  outline
                  color="primary"
                  :label="`Rp. ${formatRp(item.subtotal)}`"
                />
              </q-item-label>
              <q-item-label v-if="item.gambardokumens?.length">
                <q-btn
                  label="lihat dokumen"
                  class="q-px-md"
                  dense
                  color="info"
                  size="sm"
                  @click="lihatDokumen(item)"
                />
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator size="2px" />
        </template>
      </transition-group>
    </q-list>
  </div>
</template>

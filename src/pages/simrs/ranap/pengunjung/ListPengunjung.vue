<template>
  <div>
    <div style="margin-bottom: 100px;">
      <q-list
        square
        separator
      >
        <q-item
          v-for="item in store.pasiens"
          :key="item"
          v-ripple
          clickable
        >
          <q-item-section avatar>
            <app-avatar-pasien
              :pasien="item"
              width="50px"
            />
          </q-item-section>

          <q-item-section class="q-col-gutter-xs">
            <div><b>{{ item?.nama }}</b></div>
            <div>Norm|Reg : <span class="text-primary">{{ item?.norm }}</span> | <span class="text-orange">{{ item.noreg }}</span></div>
            <div>Usia : {{ item?.usia }} | <em class="text-grey">{{ item.kelamin }}</em></div>
            <div class="f-10">
              {{ item?.alamat }}
            </div>
          </q-item-section>
          <q-item-section class="q-col-gutter-xs">
            <div class="text-pink">
              DPJP : <b>{{ item?.dokter ?? '-' }}</b>
            </div>
            <div><b>{{ item?.ruangan }}</b> | <b class="text-primary">{{ item?.ketruangan }}</b> | bed : <b>{{ item.nomorbed }}</b></div>
            <div>Penjamin : <span class="text-primary">{{ item?.sistembayar }}</span></div>
            <div>
              Tgl Masuk | Lama : <span class="text-accent">{{ item?.tglmasuk }}</span> | <b
                v-if="item.status===''"
                class="text-teal"
              >{{ rangeDate(item?.tglmasuk) }}</b>
            </div>
          </q-item-section>
          <q-item-section side>
            <q-btn
              dense
              outline
              size="sm"
              no-caps
              color="primary"
              label="LIHAT LAYANAN"
              class="q-mb-sm"
              icon-right="icon-mat-eye"
              style="min-width: 120px;"
              @click="bukaLayananPage(item)"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <!-- Layanan -->
    <page-layanan-ranap
      v-model="store.pageLayanan"
      :pasien="pasien"
      :loading="store.loadingLayanan"
    />
  </div>
</template>

<script setup>
import PageLayananRanap from '../layanan/PageLayananRanap.vue'
import { calcDate } from 'src/modules/formatter'
import { usePengunjungRanapStore } from 'src/stores/simrs/ranap/pengunjung'
import { onBeforeUnmount, ref } from 'vue'

const store = usePengunjungRanapStore()

const currTime = ref(new Date())
const pasien = ref(null)

function rangeDate (val) {
  // console.log('lama', val)
  const d1 = currTime.value

  const selisih = calcDate(val, d1, 'seconds')
  const res = selisih < 0 ? selisih * -1 : selisih

  return toHoursAndMinutes(res)
}

function toHoursAndMinutes (totalMinutes) {
  const secs = Math.floor(Math.abs(totalMinutes))
  const mins = Math.floor(secs / 60)
  const hours = Math.floor(mins / 60)
  const days = Math.floor(hours / 24)
  const multiple = (term, n) => n !== 1 ? `${n} ${term}` : `1 ${term}`
  const hari = days > 0 ? multiple('hr', days) + ',' : ''
  const jam = hours % 24 > 9 ? multiple(':', hours % 24) : '0' + multiple(':', hours % 24)
  const mnt = mins % 60 > 9 ? multiple(':', mins % 60) : '0' + multiple(':', mins % 60)
  const dtk = secs % 60 >= 10 ? multiple('', secs % 60) : '0' + multiple('', secs % 60)
  return `${hari} ${jam} ${mnt} ${dtk}`
}

const timerJam = setInterval(() => {
  currTime.value = new Date()
}, 1000)

function bukaLayananPage (item) {
  // console.log('item', item)
  pasien.value = item
  store.bukaLayanan(true, item)
    .then((val) => {
      pasien.value = val
      store.pasien = val
    })
}

onBeforeUnmount(() => {
  clearInterval(timerJam)
})

</script>

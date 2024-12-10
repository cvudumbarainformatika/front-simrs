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
        >
          <q-item-section avatar top>
            <app-avatar-pasien
              :pasien="item"
              width="80px"
            />
          </q-item-section>

          <q-item-section class="q-col-gutter-xs relative-position">
            <div><b>{{ item?.nama }}</b></div>
            <div><b>NIK : {{ item?.nktp }}</b></div>
            <div><b>NOKA : {{ item?.noka }}</b></div>
            <div>Norm|Reg : <span class="text-primary">{{ item?.norm }}</span> | <span class="text-orange">{{ item.noreg }}</span></div>
            <div>Usia : {{ item?.usia }} | <em class="text-grey">{{ item.kelamin }}</em></div>
            <div class="f-10">
              {{ item?.alamat }}
            </div>
            <div class="full-width row justify-between items-center">
              <!-- <div v-if="item?.groups !=='2'"> -->
              <q-badge v-if="item?.groups !=='2'" outline class="q-mt-sm q-px-sm" dense :color="!item?.sep ? 'red' : 'primary'">
                <div class="f-12">
                  {{ !item?.sep ? 'SEP RANAP BELUM TERBIT' : 'SEP RANAP : ' + item?.sep }}
                </div>
              </q-badge>
              <!-- </div> -->
              <!-- <div v-else> -->
              <q-badge v-else outline class="q-mt-sm q-px-sm" dense color="teal">
                <div class="f-12">
                  PASIEN UMUM
                </div>
              </q-badge>
              <!-- </div> -->

              <q-badge outline :color="item?.status === '2' || item?.status === '3' ? 'green' : 'orange'">
                {{ (item?.status === '2' || item?.status === '3') ? 'Pulang' : 'Belum Pulang' }}  <span class="text-dark q-mx-sm">{{ item?.prognosa }}</span>
              </q-badge>
            </div>

            <!-- <div class="absolute-bottom-right q-pa-sm">
              <q-badge outline :color="item?.status === '2' || item?.status === '3' ? 'green' : 'orange'">
                {{ (item?.status === '2' || item?.status === '3') ? 'Pulang' : 'Belum Pulang' }} : {{ item?.prognosis }}
              </q-badge>
            </div> -->
          </q-item-section>
          <q-item-section class="q-col-gutter-xs">
            <div class="text-pink">
              DPJP : <b>{{ item?.dokter ?? '-' }}</b>
            </div>
            <div><b>{{ item?.ruangan }}</b> | <b class="text-primary">{{ item?.ketruangan }}</b> | bed : <b>{{ item.nomorbed }}</b></div>
            <div>Penjamin : <span class="text-primary">{{ item?.sistembayar }}</span></div>
            <div>
              Tgl Masuk : <span class="text-accent">{{ item?.tglmasuk }}</span>
              <!-- <b v-else class="text-dark">Tgl Keluar : {{ item?.tglkeluar }}</b> -->
            </div>
            <div v-if="item.status===''">
              <b>Lama : {{ rangeDate(item?.tglmasuk) }}</b>
            </div>
            <div v-if="item?.status === '2' || item?.status === '3'">
              Tgl Keluar : <span class="text-primary">{{ item?.tglkeluar }}</span>
            </div>
            <div v-if="item?.dititipkanke !== null">
              <q-badge outline class="q-mt-sm q-px-sm" dense color="primary">
                <div class="f-12">
                  dititipkan ke {{ item?.dititipkanke }}
                </div>
              </q-badge>
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
import { useTriageIgd } from 'src/stores/simrs/igd/triage'
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

      // ambil data igd (triage)
      const dataIgd = useTriageIgd()
      Promise.all([
        dataIgd.getDataTriage(val?.noreg).then(() => {
          store.pasien.triageIgd = dataIgd?.items
        })
      ])
    })
}

onBeforeUnmount(() => {
  clearInterval(timerJam)
})

</script>

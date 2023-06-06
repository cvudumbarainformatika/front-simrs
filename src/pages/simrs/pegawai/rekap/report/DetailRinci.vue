<template>
  <q-card
    class="my-card"
    bordered
  >
    <q-item>
      <q-item-section avatar>
        <q-avatar :color="`${pegawai.kelamin==='Laki-Laki'? 'orange':'secondary'}`">
          <img :src="getImage(pegawai.kelamin,pegawai)">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ pegawai.nama }}</q-item-label>
        <q-item-label
          caption
          class="f-10"
        >
          {{ pegawai.jenis_pegawai? pegawai.jenis_pegawai.jenispegawai: '-' }} :
          {{ pegawai.ruangan? pegawai.ruangan.namaruang: '-' }}
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-separator />
    <div class="q-pa-sm column flex-center items-center">
      <div class="text-h6">
        Jadwal
      </div>
      <div class="f-12 text-primary">
        {{ dayName(item? item.created_at:null) }} TANGGAL {{ item? item.tanggal:'-' }}
      </div>
    </div>
    <q-separator />
    <q-card-section>
      <div class="row q-mt-sm">
        <div class="col-auto">
          <div>Nama Shift </div>
          <div>Jam Masuk </div>
          <div>Jam Pulang </div>
        </div>
        <div class="col-auto q-ml-sm">
          <div> : {{ item? item.kategory.nama:'-' }}</div>
          <q-badge
            outline
            color="primary"
            :label="item? frTanpaDetik(item, 'masuk'):'-'"
          />
          <div>
            <q-badge
              outline
              color="negative"
              :label="item? frTanpaDetik(item):'-'"
            />
          </div>
        </div>
        <!-- {{ item }} -->
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions align="around">
      <!-- <q-btn
        flat
        round
        icon="icon-mat-event"
        color="primary"
      /> -->
      <q-btn
        flat
        color="primary"
      >
        <div class="column">
          <div class="txt-kcl mbm">
            masuk
          </div>
          {{ jamTnpDetik(item.created_at) }}
          <div class="txt-kcl">
            {{ dateDbFormat(item.created_at) }}
          </div>
        </div>
      </q-btn>
      <q-btn
        flat
        color="negative"
      >
        <div class="column">
          <div class="txt-kcl mbm">
            pulang
          </div>
          {{ jamTnpDetik(item.updated_at) === jamTnpDetik(item.created_at) ? 'TAP' : jamTnpDetik(item.updated_at) }}
          <div class="txt-kcl">
            {{ dateDbFormat(item.updated_at) }}
          </div>
        </div>
      </q-btn>
    </q-card-actions>
    <q-separator />
    <q-card-actions
      align="center"
      :class="`${hitungTerlambat(item) > 0? 'bg-negative text-white':'bg-primary text-white'}`"
    >
      <div>{{ hitungTerlambat(item) > 0? `TERLAMBAT ${toHoursAndMinutes(hitungTerlambat(item))}` : 'ON TIME' }}</div>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { formatJam, dateDbFormat, jamTnpDetik, dayName, calcDate } from 'src/modules/formatter'

defineProps({
  item: {
    type: Object,
    default: null
  },
  pegawai: {
    type: Object,
    default: null
  }
})

const frTanpaDetik = (val, jns) => {
  const dt = val.tanggal
  const tm = jns === 'masuk' ? val.kategory.masuk : val.kategory.pulang
  const tgl = `${dt} ${tm}`
  return jamTnpDetik(tgl)
}

const hitungTerlambat = (x) => {
  const kategoryMasuk = x.kategory ? x.kategory.masuk : '00:00:00'
  const jamMasukServer = formatJam(x.created_at)
  const tglMasukServer = dateDbFormat(x.created_at)

  const terlambat = new Date(tglMasukServer + ' ' + jamMasukServer) > new Date(tglMasukServer + ' ' + kategoryMasuk)
  let hitung = 0

  if (terlambat) {
    hitung = calcDate(new Date(tglMasukServer + ' ' + jamMasukServer), new Date(tglMasukServer + ' ' + kategoryMasuk), 'minutes')
  }
  return hitung
}

function toHoursAndMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${hours > 0 ? ` ${hours} jam` : ''}
        ${minutes > 0 ? ` ${minutes.toFixed(0)} mnt` : ''}`
}

function getImage(kelamin, row) {
  if (row.foto === null || row.foto === '' || row.foto === 'undefined') {
    return kelamin === 'Perempuan'
      ? new URL('../../../../../assets/images/actress.svg', import.meta.url).href
      : new URL('../../../../../assets/images/user-avatar.svg', import.meta.url).href
  } else {
    return 'http://192.168.100.100/simpeg/foto/' + row.nip + '/' + row.foto
  }
}
</script>

<style lang="scss" scoped>
.my-card{
  max-width: 250px;
}
.txt-kcl{
  font-size: 9px !important;
}
.mbm{
  margin-bottom: -10px;
}

</style>

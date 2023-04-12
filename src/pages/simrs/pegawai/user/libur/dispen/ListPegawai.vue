<template>
  <q-list
    bordered
    separator
  >
    <q-item
      v-for="(row, i) in store.pegawais"
      :key="i"
      v-ripple
      clickable
    >
      <q-item-section avatar>
        <q-avatar>
          <img
            :src="image(row)"
            :ratio="1"
          >
        </q-avatar>
      </q-item-section>
      <q-item-section>
        {{ row.nama }}
        <div class="text-grey">
          {{ row.ruangan? row.ruangan.namaruang:'-' }}
        </div>
      </q-item-section>
      <q-item-section side>
        <!-- {{ coba(row) }} -->
        <q-btn
          v-if="coba(row)===false"
          round
          flat
          icon="icon-mat-send"
          color="primary"
          size="sm"
          @click="store.toList(row)"
        >
          <q-tooltip>
            <div>
              Masukkan Ke List
            </div>
          </q-tooltip>
        </q-btn>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>

import { useDispenStore } from 'src/stores/simrs/pegawai/user/libur/dispen'

const store = useDispenStore()

const image = (row) => {
  if (row.foto === null || row.foto === '' || row.foto === 'undefined') {
    return row.kelamin === 'Perempuan'
      ? new URL('../../../../../assets/images/actress.svg', import.meta.url).href
      : new URL('../../../../../assets/images/user-avatar.svg', import.meta.url).href
  } else {
    return 'http://192.168.100.100/simpeg/foto/' + row.nip + '/' + row.foto
  }
}

function coba(obj) {
  const id = obj.id
  const arr = store.list
  if (arr.length) {
    const matching = arr.filter(x => x.id === id).length

    if (matching === 1) {
      return true
    }

    return false
  }
  return false
}
</script>

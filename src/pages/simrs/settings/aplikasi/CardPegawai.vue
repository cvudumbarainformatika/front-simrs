<template>
  <q-card
    style="width:100%"
    class="bg-primary text-white"
  >
    <q-card-section>
      <div class="row items-center">
        <div class="">
          <q-avatar size="60px">
            <img :src="getImage(item)">
          </q-avatar>
        </div>
        <div class="q-ml-md">
          <div class="flex flex-nowrap">
            <strong>Nip : </strong> {{ item.nip }}
          </div>
          <div class="ellipsis">
            <strong>Nip : </strong> {{ item.nama }}
          </div>
          <div class="ellipsis">
            <strong>Ruangan : </strong> {{ item.ruangan? item.ruangan.namaruang: '-' }}
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    default: () => {}
  }
})

function getImage(row) {
  const kelamin = row.kelamin
  if (row.foto === null || row.foto === '' || row.foto === 'undefined') {
    return kelamin === 'Perempuan'
      ? new URL('../../../../assets/images/actress.svg', import.meta.url).href
      : new URL('../../../../assets/images/user-avatar.svg', import.meta.url).href
  } else {
    return 'http://192.168.100.100/simpeg/foto/' + row.nip + '/' + row.foto
  }
}
</script>

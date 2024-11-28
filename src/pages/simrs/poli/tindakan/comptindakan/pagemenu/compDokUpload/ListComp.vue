<template>
  <q-card
    v-for="(file, i) in items"
    :key="i"
    flat
    bordered
    class="q-mb-sm"
  >
    <q-card-section>
      <div>Diinput Oleh : {{ file?.pegawai?.nama }}</div>
      <div
        style="border: 1px solid grey;"
        class="q-mb-md"
      >
        <q-img
          :src="getImg(file?.url)" :key="file.url"
        >
          <div class="absolute-bottom">
            <div class="row items-center justify-between">
              <q-btn
                class="gt-xs"
                size="md"
                color="yellow"
                flat
                dense
                round
                icon="icon-mat-visibility"
                :href="pathImg + file.url"
                target="_blank"
              />
              <q-btn
                class="gt-xs"
                size="md"
                color="negative"
                flat
                dense
                round
                icon="icon-mat-delete"
                @click="emits('hapus', file)"
              />
            </div>
          </div>
        </q-img>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { pathImg } from 'src/boot/axios'
// import { get } from 'src/modules/wacom/newFile';

defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['hapus', 'edit', 'preview'])

const getImg = (file) => {
  const spl = file.split('.')
  const ext = spl[spl.length - 1]
  // console.log(ext)

  if (ext === 'pdf') {
    return new URL('../../../../../../../assets/images/PDF_file_icon.png', import.meta.url).href
  }
  else {
    return pathImg + file
  }
}

</script>

<style lang="scss" scoped>
table{
  width: 100%;
  border-collapse: collapse;
  th, td {
    border: 1px solid $grey;
    padding: 2px 5px;
    vertical-align: top;
  }
}
</style>

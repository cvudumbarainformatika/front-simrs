<template>
  <div class="fit q-pa-sm scroll bg-grey-4">
    <q-card
      v-ripple
      flat borderred v-for="(item, n) in items" :key="n"
      class="q-mb-sm cursor-pointer"
      :class="{ 'bg-yellow-3 text-dark': store.templateSelected?.nama === item?.nama, 'bg-grey-3 text-orange': classHover === n, 'bg-white text-black': classHover !== n }"
      @mouseover="onMouseOver(n)"
      @mouseleave="onMouseOver(-1)"
    >
      <!-- <q-card-section class="row items-center q-px-md q-py-sm">
        <div>{{ item?.nama }}</div>
        <q-space />
        <q-btn flat icon="icon-mat-keyboard_arrow_right" color="primary" round size="sm" />
      </q-card-section> -->
      <q-item clickable @click="emits('select', item)">
        <q-item-section>
          <q-item-label>{{ item?.nama }}</q-item-label>
        </q-item-section>
        <q-item-section side @click="hapusItem(item)">
          <q-btn flat icon="icon-mat-delete" color="negative" round size="sm" />
        </q-item-section>
      </q-item>
    </q-card>

    <div style="margin-bottom: 100px;" />
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { useTemplateEResepStore } from 'src/stores/simrs/farmasi/permintaanresep/templateeresep'
import { ref } from 'vue'
const store = useTemplateEResepStore()
const $q = useQuasar()

const classHover = ref(-1)

defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['select', 'delete'])

const onMouseOver = (val) => {
  classHover.value = val
}

function hapusItem (val) {
  $q.dialog({
    title: 'Pemberitahuan',
    message: `Apakah Template <strong>${val?.nama}</strong>  ini akan dihapus?`,
    cancel: true,
    html: true,
    persistent: true
  }).onOk(() => {
    emits('delete', val)
  }).onCancel(() => {
    console.log('Cancel')
    // selected.value = []
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

</script>

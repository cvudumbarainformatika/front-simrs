<template>
  <q-card
    flat
    bordered
  >
    <q-card-section class="q-pa-none">
      Headernya
      <q-separator />
      <q-list
        v-if="props?.lists?.length"
        dense
        separator
      >
        <q-item
          v-for="(item, i) in lists"
          :key="i"
          v-ripple
          clickable
          @click="kirimKeForm(item)"
        >
          <q-item-section avatar>
            <q-icon
              color="primary"
              name="icon-mat-person"
            />
          </q-item-section>

          <q-item-section>{{ item?.nama }}</q-item-section>
          <q-item-section side>
            aa
          </q-item-section>
        </q-item>
      </q-list>

      <div
        v-else
        class="column full-height flex-center"
        style="height:400px"
      >
        Data Belum Ada
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>

const props = defineProps({
  lists: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['select'])

function kirimKeForm(val) {
  // console.log(val)
  emits('select', val)
}
</script>

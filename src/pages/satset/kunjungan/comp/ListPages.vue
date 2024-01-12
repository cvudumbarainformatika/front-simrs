<template>
  <div>
    <q-card
      v-for="(item, i) in items"
      :key="i"
      class="q-mb-lg q-pa-sm shadow-4 bg-grey-2"
      bordered
    >
      <q-item>
        <q-item-section avatar>
          <q-icon
            color="primary"
            :name="item.icon"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item.nama }}</q-item-label>
          <q-item-label caption>
            {{ item.desc }}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label caption>
            <q-btn
              label="connect"
              flat
              dense
              class="q-px-md"
              size="md"
              color="primary"
              @click="emits('onConnect', item)"
            />
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card>
  </div>
</template>

<script setup>

defineProps({
  items: {
    type: Array,
    default: null
  }
})

const emits = defineEmits(['onConnect'])

</script>

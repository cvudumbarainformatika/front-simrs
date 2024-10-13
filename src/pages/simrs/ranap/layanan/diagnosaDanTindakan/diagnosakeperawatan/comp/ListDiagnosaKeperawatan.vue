<template>
  <div class="fit q-pa-sm scroll">
    <transition-group name="list">
      <q-card
        flat bordered class="q-mb-sm list-move"
        v-for="item in props.pasien?.diagnosakeperawatan"
        :key="item.id"
      >
        <q-item
          v-ripple
          clickable
        >
          <q-item-section>
            <q-item-label> <b>{{ item.kode }} - {{ item.nama }}</b> </q-item-label>
            <q-item-label caption>
              Intervensi Keperawatan
            </q-item-label>
            <q-item-label
              v-for="sub in item.intervensi"
              :key="sub.id"
            >
              <div class="flex">
                <div>-</div> <div class="flex-wrap">
                  {{ sub?.masterintervensi?.nama }}
                </div>
              </div>
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-btn
              icon="icon-mat-delete"
              size="xs"
              round
              padding="sm"
              flat
              color="negative"
              @click="emits('deleteItem', item.id)"
            />
          </q-item-section>
        </q-item>
      </q-card>
    </transition-group>
  </div>
</template>

<script setup>

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
const emits = defineEmits(['deleteItem'])
</script>

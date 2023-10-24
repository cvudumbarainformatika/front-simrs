<template>
  <div class="q-pa-xs">
    <div
      v-if="store.list.length === 0"
      class="full-height"
    >
      <div
        :style="`height: ${height};`"
        class="column flex-center items-center"
      >
        Belum Ada Data Terpilih
      </div>
    </div>
    <q-list
      v-else
      bordered
      separator
    >
      <transition-group name="list">
        <q-item
          v-for="(row, i) in store.list"
          :key="i"
          v-ripple
          clickable
          class="bg-white shadow-2"
        >
          <q-item-section>{{ row.nama }}</q-item-section>
          <q-item-section side>
            <q-btn
              round
              flat
              icon="icon-mat-delete"
              color="negative"
              size="xs"
              @click="store.hapusList(i)"
            >
              <q-tooltip>
                <div>
                  Hapus List
                </div>
              </q-tooltip>
            </q-btn>
          </q-item-section>
        </q-item>
      </transition-group>
    </q-list>
  </div>
</template>

<script setup>
import { useTroubleStore } from 'src/stores/simrs/pegawai/user/libur/trouble'

const store = useTroubleStore()

defineProps({
  height: {
    type: String,
    default: '480px'
  }
})
</script>

<style lang="scss" scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  opacity: 1;
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(60px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>

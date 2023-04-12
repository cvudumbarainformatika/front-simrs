<template>
  <div>
    <div v-if="store.list.length ===0">
      <div
        class="column flex-center items-center "
        style="min-height:400px"
      >
        Belum Ada LIST
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
import { useDispenStore } from 'src/stores/simrs/pegawai/user/libur/dispen'

const store = useDispenStore()
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

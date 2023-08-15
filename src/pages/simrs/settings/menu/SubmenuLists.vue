<template>
  <div>
    <div class="bg-white q-pa-lg">
      <div class="row items-center">
        <div class="text-h6 my-flex-1">
          Submenu  {{ title }}
        </div>
        <q-btn
          v-if="items.length > 0"
          round
          icon="icon-mat-add"
          size="sm"
          padding="sm"
          color="primary"
          @click="emits('addSubmenu', menuId)"
        />
      </div>
      <q-separator class="q-my-md" />
      <div class="submenus">
        <div
          v-if="submenus.length === 0"
          class="column flex-center"
        >
          SubMenu Belum Ada
        </div>
        <div v-else>
          <!-- {{ submenus }} -->

          <q-list
            bordered
            class="bg-white"
            separator
          >
            <q-item
              v-for="(sub, i) in submenus"
              :key="i"
              v-ripple
              class="q-my-sm"
              clickable
              :active="link === i"
              active-class="my-menu-link"
              @click="link = i"
            >
              <q-item-section avatar>
                <q-avatar
                  color="secondary"
                  text-color="white"
                >
                  {{ sub.nama.charAt(0) }}
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ sub.nama }}</q-item-label>
                <q-item-label
                  class="f-10"
                  lines="1"
                >
                  description
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <div>
                  <q-btn
                    flat
                    size="sm"
                    padding="xs"
                    round
                    icon="icon-mat-edit"
                    color="grey"
                    @click="emits('editSubmenu', (menuId))"
                  />
                  <q-btn
                    flat
                    size="sm"
                    padding="xs"
                    round
                    icon="icon-mat-delete_sweep"
                    color="negative"
                  />
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  menu: {
    type: [String, Number],
    default: 0
  },
  items: {
    type: Array,
    default: () => []
  }
})

const link = ref(0)

const emits = defineEmits(['addSubmenu', 'editSubmenu'])

const submenus = computed(() => {
  let arr = []
  // const id = props.items[props.menu].id
  if (props.menu.length === 0) return arr
  if (props.items.length > 0) arr = props.items[props.menu].submenu
  console.log('submenus', arr)
  return arr
})
const title = computed(() => {
  let txt = ''
  // const id = props.items[props.menu].id
  if (props.menu.length === 0) return txt
  if (props.items.length > 0) txt = props.items[props.menu].nama
  return txt
})
const menuId = computed(() => {
  let txt = 0
  // const id = props.items[props.menu].id
  if (props.menu.length === 0) return txt
  if (props.items.length > 0) txt = props.items[props.menu].id
  return txt
})

</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.my-menu-link{
  color: white;
  background: $primary;
}
</style>

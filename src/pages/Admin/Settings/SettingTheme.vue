<template>
  <div>
    <div class="row justify-center items-center q-col-gutter-md">
      <div
        v-for="(list, i) in lists"
        :key="i"
        class="col-12 col-md-3 col-xs-12"
      >
        <q-card
          flat
          class="text-white cursor-pointer"
          :class="`bg-${list.name}`"
        >
          <q-card-section class="text-center">
            {{ list.name }}
            <q-menu>
              <q-color
                :model-value="list.value"
                @change="val => changeColor(i,val)"
              />
              <!-- <q-input
                v-model="list.value"
                readonly
                dense
              /> -->
            </q-menu>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from 'src/stores/app'
import { computed } from 'vue'
import { setCssVar } from 'quasar'

const store = useAppStore()
const lists = computed(() => store.themes)

function changeColor(i, val) {
  store.setTheme(i, val)
  setCssVar(lists.value[i].name, lists.value[i].value)
}
</script>

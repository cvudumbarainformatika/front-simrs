<template>
  <q-list
    bordered
    separator
  >
    <q-item>
      <q-item-section>
        <div class="q-py-sm f-14 text-grey-8">
          Set Data Aplikasi
        </div>
      </q-item-section>
      <q-item-section side>
        <div class="row items-center">
          <q-btn
            class="q-ml-sm"
            unelevated
            round
            color="primary"
            size="xs"
            icon="icon-mat-add"
            @click="$emit('add')"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Data Baru
            </q-tooltip>
          </q-btn>
        </div>
      </q-item-section>
    </q-item>

    <template v-if="loading">
      <q-expansion-item
        v-for="i in 3"
        :key="i"
        expand-icon-toggle
      >
        <template #header>
          <q-item-section avatar>
            <q-skeleton size="25px" />
          </q-item-section>

          <q-item-section>
            <q-skeleton width="150px" />
          </q-item-section>

          <q-item-section side>
            <div class="row items-center">
              <q-skeleton size="20px" />
            </div>
          </q-item-section>
        </template>
      </q-expansion-item>
    </template>

    <template v-else>
      <q-expansion-item
        v-for="(item, i) in props.items"
        :key="i"
        expand-icon-toggle
      >
        <template
          #header
        >
          <q-item-section
            avatar
            :class="edited=== 'edited-'+item.icon? 'text-blue':'text-dark'"
            @click="$emit('iconAppChange',i)"
          >
            <q-skeleton
              v-if="item.icon===''|| item.icon===null"
              size="25px"
              class="cursor-pointer"
            />
            <q-icon
              v-else
              :name="item.icon"
              class="cursor-pointer"
            />
          </q-item-section>

          <q-item-section>
            <div
              :class="item.julukan==='kosong'|| item.julukan===''?'text-negative': edited=== 'edited-'+item.icon? 'text-blue': 'text-dark'"
              style="width: 100px"
            >
              {{ item.julukan===''?'...': item.julukan }}
              <q-popup-edit
                v-slot="scope"
                v-model="item.julukan"
              >
                <q-input
                  v-model="scope.value"
                  dense
                  autofocus
                  @keyup.enter="scope.set"
                />
              </q-popup-edit>
            </div>
          </q-item-section>

          <q-item-section side>
            <div class="row items-center">
              btn
            </div>
          </q-item-section>
        </template>

        <template
          v-for="(menu, n) in item.menus"
          :key="n"
        >
          <q-item
            v-if="menu.submenus.length===0"
            v-ripple
            clickable
            class="q-ml-lg"
          >
            <q-item-section avatar>
              <q-icon
                :name="menu.icon"
              />
            </q-item-section>

            <q-item-section>
              <div>{{ menu.nama }}</div>
            </q-item-section>
          </q-item>
          <q-expansion-item
            v-else
            :icon="menu.icon"
            :label="menu.nama"
            expand-separator
            class="q-pl-lg"
            dense-toggle
            hide-expand-icon
          >
            <q-list
              separator
              class="q-pl-lg"
            >
              <q-separator />
              <q-item
                v-for="(sub, x) in menu.submenus"
                :key="x"
                v-ripple
                clickable
              >
                <q-item-section>
                  <q-item-label>{{ sub.nama }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>
        </template>
      </q-expansion-item>
    </template>
  </q-list>
</template>

<script setup>
// import { dateFullFormat } from 'src/modules/formatter'
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  edited: {
    type: String,
    default: null
  }
})

defineEmits(['add', 'iconAppChange'])

</script>

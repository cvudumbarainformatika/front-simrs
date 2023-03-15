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
    <q-item class="bg-primary text-white">
      <q-item-section avatar>
        <div
          class=""
          style="width:22px"
        >
          icon
        </div>
      </q-item-section>
      <q-item-section>
        <div
          class="text-left"
        >
          <span>Julukan</span>
        </div>
      </q-item-section>
      <q-item-section>
        <div
          class="text-left"
        >
          AppName
        </div>
      </q-item-section>
      <q-item-section>
        <div
          class="text-left"
        >
          Url
        </div>
      </q-item-section>
      <q-item-section side>
        <div class="row items-center">
          <div>##</div>
          <div>###</div>
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
              class="text-left"
              :class="item.julukan==='kosong'|| item.julukan===''?'text-negative': edited=== 'edited-'+item.icon? 'text-blue': 'text-dark'"
            >
              <span>{{ item.julukan===''?'...': item.julukan }}</span>
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
          <q-item-section class="text-left">
            <div
              class="text-left"
              :class="item.julukan==='kosong'|| item.julukan===''?'text-negative': edited=== 'edited-'+item.icon? 'text-blue': 'text-dark'"
            >
              <span>{{ item.aplikasi===''?'...': item.aplikasi }}</span>
              <q-popup-edit
                v-slot="scope"
                v-model="item.aplikasi"
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
          <q-item-section>
            <div
              :class="item.julukan==='kosong'|| item.julukan===''?'text-negative': edited=== 'edited-'+item.icon? 'text-blue': 'text-dark'"
            >
              {{ item.url==='' || item.url===null?'...': item.url }}
              <q-popup-edit
                v-slot="scope"
                v-model="item.url"
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
              <q-btn
                v-if="item.id===0 && item.julukan!=='kosong'"
                flat
                icon="icon-mat-save"
                dense
                size="sm"
                color="primary"
                @click="$emit('saveNew', i)"
              />
              <div v-else>
                ##
              </div>
              <q-btn
                flat
                icon="icon-mat-add"
                dense
                size="sm"
                color="secondary"
                @click="$emit('addMenu', i)"
              />
              <q-btn
                v-if="item.id===0"
                flat
                icon="icon-mat-delete"
                dense
                size="sm"
                color="negative"
                @click="$emit('deleteNew', i)"
              />
              <div v-else>
                ##
              </div>
            </div>
          </q-item-section>
        </template>

        <template
          v-for="(menu, n) in item.menus"
          :key="n"
        >
          <q-separator />
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
            <q-item-section>
              <div> urlName : {{ menu.name }} </div>
            </q-item-section>
            <q-item-section>
              <div> urlLink : {{ menu.link }} </div>
            </q-item-section>
            <q-item-section side>
              <div>##</div>
            </q-item-section>
          </q-item>
          <q-expansion-item
            v-else
            :label="menu.nama"
            expand-separator
            class="q-pl-lg"
            dense-toggle
            hide-expand-icon
          >
            <template #header>
              <q-item-section
                avatar
                :class="edited=== 'edited-'+menu.icon? 'text-blue':'text-dark'"
              >
                <q-skeleton
                  v-if="menu.icon===''|| menu.icon===null"
                  size="25px"
                  class="cursor-pointer"
                />
                <q-icon
                  v-else
                  :name="menu.icon"
                  class="cursor-pointer"
                />
              </q-item-section>

              <q-item-section>
                <div
                  class="text-left"
                >
                  <span>{{ menu.nama===''?'...': menu.nama }}</span>
                  <q-popup-edit
                    v-slot="scope"
                    v-model="menu.nama"
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
              <q-item-section>
                <div
                  class="text-left"
                >
                  <span> urlName : {{ menu.name===''?'...': menu.name }}</span>
                  <q-popup-edit
                    v-slot="scope"
                    v-model="menu.name"
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
              <q-item-section>
                <div
                  class="text-left"
                >
                  <span> urlLink : {{ menu.link===''?'...': menu.link }}</span>
                  <q-popup-edit
                    v-slot="scope"
                    v-model="menu.link"
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
            </template>
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

defineEmits(['add', 'iconAppChange', 'deleteNew', 'saveNew', 'addMenu'])

</script>

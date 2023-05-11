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
      <q-item-section>
        <div
          class="text-left"
        >
          Background
        </div>
      </q-item-section>
      <q-item-section>
        <div
          class="text-left"
        >
          Singkatan
        </div>
      </q-item-section>
      <q-item-section>
        <div
          class="text-left"
        />
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
            <q-skeleton width="100px" />
          </q-item-section>
          <q-item-section>
            <q-skeleton width="100px" />
          </q-item-section>
          <q-item-section>
            <q-skeleton width="100px" />
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
        <template #header>
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
              class="text-left wrap"
              :class="item.julukan==='kosong'|| item.julukan===''?'text-negative': edited=== 'edited-'+item.icon? 'text-blue': 'text-dark'"
            >
              <span>{{ item.julukan===''?'...': item.julukan }}</span>
              <q-popup-edit
                v-slot="scope"
                v-model="item.julukan"
                @show="editApp(item, i,'julukan')"
                @hide="afterEditApp(item, i,'julukan')"
              >
                <q-input
                  v-model="scope.value"
                  label="julukan"
                  dense
                  autofocus
                  @keyup.enter="scope.set"
                  @blur="scope.set"
                />
              </q-popup-edit>
            </div>
          </q-item-section>
          <q-item-section class="text-left wrap">
            <div
              class="text-left"
              :class="item.aplikasi==='kosong'|| item.aplikasi===''?'text-negative': edited=== 'edited-'+item.icon? 'text-blue': 'text-dark'"
            >
              <span>{{ item.aplikasi===''?'...': item.aplikasi }}</span>
              <q-popup-edit
                v-slot="scope"
                v-model="item.aplikasi"
                @show="editApp(item, i,'aplikasi')"
                @hide="afterEditApp(item, i,'aplikasi')"
              >
                <q-input
                  v-model="scope.value"
                  label="aplikasi"
                  dense
                  autofocus
                  @keyup.enter="scope.set"
                  @blur="scope.set"
                />
              </q-popup-edit>
            </div>
          </q-item-section>
          <q-item-section class="wrap">
            <div
              :class="item.url==='kosong'|| item.url===''?'text-negative wrap': edited=== 'edited-'+item.icon? 'text-blue wrap': 'text-dark wrap'"
            >
              <span class="wrap">
                {{ item.url==='' || item.url===null?'...': item.url }}
              </span>
              <q-popup-edit
                v-slot="scope"
                v-model="item.url"
                @show="editApp(item, i,'url')"
                @hide="afterEditApp(item, i,'url')"
              >
                <q-input
                  v-model="scope.value"
                  label="url"
                  dense
                  autofocus
                  @keyup.enter="scope.set"
                  @blur="scope.set"
                />
              </q-popup-edit>
            </div>
          </q-item-section>
          <q-item-section class="wrap">
            <div
              :class="item.color==='kosong'|| item.color===''?'text-negative': edited=== 'edited-'+item.icon? 'text-blue': 'text-dark'"
            >
              {{ item.color==='' || item.color===null?'...': item.color }}
              <q-popup-edit
                v-slot="scope"
                v-model="item.color"
                @show="editApp(item, i,'color')"
                @hide="afterEditApp(item, i,'color')"
              >
                <q-input
                  v-model="scope.value"
                  label="backgroun sso color"
                  dense
                  autofocus
                  @keyup.enter="scope.set"
                  @blur="scope.set"
                />
              </q-popup-edit>
            </div>
          </q-item-section>
          <q-item-section class="wrap">
            <div
              :class="item.singkatan==='kosong'|| item.singkatan===''?'text-negative': edited=== 'edited-'+item.icon? 'text-blue': 'text-dark'"
            >
              {{ item.singkatan==='' || item.singkatan===null?'...': item.singkatan }}
              <q-popup-edit
                v-slot="scope"
                v-model="item.singkatan"
                @show="editApp(item, i,'singkatan')"
                @hide="afterEditApp(item, i,'singkatan')"
              >
                <q-input
                  v-model="scope.value"
                  label="singkatan"
                  dense
                  autofocus
                  @keyup.enter="scope.set"
                  @blur="scope.set"
                />
              </q-popup-edit>
            </div>
          </q-item-section>

          <q-item-section side>
            <div class="row items-center">
              <q-btn
                v-if="item.itemId===0 && item.julukan!=='kosong'"
                flat
                icon="icon-mat-save"
                dense
                size="sm"
                color="primary"
                @click="$emit('saveNew', i)"
              />
              <q-btn
                v-else-if="item.save"
                flat
                icon="icon-mat-save"
                dense
                size="sm"
                color="primary"
                @click="$emit('editApp', {'item':item,'index':i})"
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
                v-if="item.itemId===0"
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
            <q-item-section
              avatar
              :class="edited=== 'edited-'+menu.icon? 'text-blue':'text-dark'"
              @click="$emit('iconMenuChange',({app:i,menu:n}),)"
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
                    label="nama menu"
                    dense
                    autofocus
                    @keyup.enter="scope.set"
                    @blur="scope.set"
                  />
                </q-popup-edit>
              </div>
            </q-item-section>
            <q-item-section caption>
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
                    label="url name"
                    dense
                    autofocus
                    @keyup.enter="scope.set"
                    @blur="scope.set"
                  />
                </q-popup-edit>
              </div>
            </q-item-section>
            <q-item-section caption>
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
                    label="url link"
                    dense
                    autofocus
                    @keyup.enter="scope.set"
                    @blur="scope.set"
                  />
                </q-popup-edit>
              </div>
            </q-item-section>
            <q-item-section side>
              <div class="row items-center">
                <q-btn
                  v-if="menu.menuId===0"
                  flat
                  icon="icon-mat-save"
                  dense
                  size="sm"
                  color="primary"
                  @click="$emit('saveNewMenu', {'menu':menu,'i':i})"
                />
                <q-btn
                  flat
                  icon="icon-mat-add"
                  dense
                  size="sm"
                  color="secondary"
                  @click="$emit('addSubMenu', {'i':i,'n':n})"
                />
                <q-btn
                  v-if="menu.menuId===0"
                  flat
                  icon="icon-mat-delete"
                  dense
                  size="sm"
                  color="negative"
                  @click="$emit('deleteNewMenu', {'i':i,'n':n})"
                />
                <div v-else>
                  #
                </div>
              </div>
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
                @click="$emit('iconMenuChange',({app:i,menu:n}),)"
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
                    @show="editMenu(menu, i,'nama',n)"
                    @hide="afterEditMenu(menu, i,'nama',n)"
                  >
                    <q-input
                      v-model="scope.value"
                      label="nama"
                      dense
                      autofocus
                      @keyup.enter="scope.set"
                      @blur="scope.set"
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
                    @show="editMenu(menu, i,'name',n)"
                    @hide="afterEditMenu(menu, i,'name',n)"
                  >
                    <q-input
                      v-model="scope.value"
                      label="url name"
                      dense
                      autofocus
                      @keyup.enter="scope.set"
                      @blur="scope.set"
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
                    @show="editMenu(menu, i,'link',n)"
                    @hide="afterEditMenu(menu, i,'link',n)"
                  >
                    <q-input
                      v-model="scope.value"
                      label="link url"
                      dense
                      autofocus
                      @keyup.enter="scope.set"
                      @blur="scope.set"
                    />
                  </q-popup-edit>
                </div>
              </q-item-section>
              <q-item-section side>
                <div class="row items-center">
                  <q-btn
                    v-if="menu.save"
                    flat
                    icon="icon-mat-save"
                    dense
                    size="sm"
                    color="primary"
                    @click="$emit('saveEditMenu', {'menu':menu,'i':i})"
                  />
                  <div v-else>
                    #
                  </div>
                  <q-btn
                    flat
                    icon="icon-mat-add"
                    dense
                    size="sm"
                    color="secondary"
                    @click="$emit('addSubMenu', {'i':i,'n':n})"
                  />
                  <q-btn
                    v-if="menu.menuId===0"
                    flat
                    icon="icon-mat-delete"
                    dense
                    size="sm"
                    color="negative"
                    @click="$emit('deleteNewMenu', {'menu':menu,'i':i,'n':n})"
                  />
                  <div v-else>
                    #
                  </div>
                </div>
              </q-item-section>
            </template>
            <q-list
              separator
              class="q-pl-lg"
            >
              <q-separator />
              <q-item class="text-weight-bold">
                <q-item-section>
                  <q-item-label>Nama</q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Nama url</q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label>link url</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label>###</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                v-for="(sub, x) in menu.submenus"
                :key="x"
                v-ripple
                clickable
              >
                <q-item-section>
                  <div
                    class="text-left"
                  >
                    <span>{{ sub.nama===''?'...': sub.nama }}</span>
                    <q-popup-edit
                      v-slot="scope"
                      v-model="sub.nama"
                      @show="editSubMenu(sub, 'nama')"
                      @hide="afterEditSubMenu(sub, 'nama')"
                    >
                      <q-input
                        v-model="scope.value"
                        label="nama"
                        dense
                        autofocus
                        @keyup.enter="scope.set"
                        @blur="scope.set"
                      />
                    </q-popup-edit>
                  </div>
                </q-item-section>
                <q-item-section>
                  <div
                    class="text-left"
                  >
                    <span class="wrap">{{ sub.name===''?'...': sub.name }}</span>
                    <q-popup-edit
                      v-slot="scope"
                      v-model="sub.name"
                      @show="editSubMenu(sub, 'name')"
                      @hide="afterEditSubMenu(sub, 'name')"
                    >
                      <q-input
                        v-model="scope.value"
                        label="url name"
                        dense
                        autofocus
                        @keyup.enter="scope.set"
                        @blur="scope.set"
                      />
                    </q-popup-edit>
                  </div>
                </q-item-section>
                <q-item-section>
                  <div
                    class="text-left"
                  >
                    <span class="wrap">{{ sub.link===''?'...': sub.link }}</span>
                    <q-popup-edit
                      v-slot="scope"
                      v-model="sub.link"
                      @show="editSubMenu(sub, 'link')"
                      @hide="afterEditSubMenu(sub, 'link')"
                    >
                      <q-input
                        v-model="scope.value"
                        label="url link"
                        dense
                        autofocus
                        @keyup.enter="scope.set"
                        @blur="scope.set"
                      />
                    </q-popup-edit>
                  </div>
                </q-item-section>
                <q-item-section side>
                  <div class="row items-center">
                    <q-btn
                      v-if="sub.save"
                      flat
                      icon="icon-mat-save"
                      dense
                      size="sm"
                      color="primary"
                      @click="$emit('saveEditSubMenu', {'sub':sub,'i':i,'n':n,'x':x})"
                    />
                    <q-btn
                      v-else-if="sub.submenuId===0"
                      flat
                      icon="icon-mat-save"
                      dense
                      size="sm"
                      color="primary"
                      @click="$emit('saveNewSubMenu', {'sub':sub,'i':i,'n':n,'x':x})"
                    />
                    <div v-else>
                      #
                    </div>
                    <!-- <q-btn
                    flat
                    icon="icon-mat-add"
                    dense
                    size="sm"
                    color="secondary"
                    @click="$emit('addSubMenu', {'i':i,'n':n})"
                  /> -->
                    <q-btn
                      v-if="sub.submenuId===0"
                      flat
                      icon="icon-mat-delete"
                      dense
                      size="sm"
                      color="negative"
                      @click="$emit('deleteNewSubMenu', {'sub':sub,'i':i,'n':n,'x':x})"
                    />
                    <div v-else>
                      #
                    </div>
                  </div>
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

defineEmits([
  'add',
  'iconAppChange',
  'deleteNew',
  'saveNew',
  'editApp',
  'addMenu',
  'iconMenuChange',
  'deleteNewMenu',
  'saveNewMenu',
  'saveEditMenu',
  'addSubMenu',
  'saveEditSubMenu',
  'saveNewSubMenu',
  'deleteNewSubMenu'
])

let prevVal = ''
function editApp(val, i, key) {
  prevVal = val[key]
  // console.log('app edit', val, i, key)
}
function afterEditApp(val, i, key) {
  if (val[key] !== prevVal) {
    val.save = true
  }
  // console.log('app after edit', val, i, key)
}
function editMenu(val, i, key) {
  prevVal = val[key]
  // console.log('Menu edit', val, i, key)
}
function afterEditMenu(val, i, key) {
  if (val[key] !== prevVal) {
    val.save = true
  }
}
function editSubMenu(val, key) {
  prevVal = val[key]
  // console.log('Menu edit', val, i, key)
}
function afterEditSubMenu(val, key) {
  if (val[key] !== prevVal) {
    val.save = true
  }
}
</script>
<style lang="scss" scoped>
.wrap{
  overflow-wrap: anywhere;
}
</style>

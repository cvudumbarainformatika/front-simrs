<template>
  <div :class="admin?'q-px-md bg-grey-3':'container-padding bg-grey-3'">
    <div class="q-my-lg q-py-lg">
      <div class="row justify-center q-col-gutter-lg relative-position q-mt-lg">
        <div
          v-for="(item, i) in lists"
          :key="i"
          class="col-12 col-md-3"
          :class="admin?'cursor-pointer':''"
        >
          <div class="feature-item q-pa-lg c-p">
            <div class="icon-x text-primary">
              <q-icon
                v-if="!store.loading"
                :name="item.icon"
              />
              <q-skeleton
                v-else
                type="circle"
              />
            </div>
            <div class="text-h6 bold q-mb-lg">
              <span
                v-if="!store.loading"
                class="text-grey-9"
              >
                {{ item.name }}
                <q-popup-edit
                  v-if="admin"
                  v-slot="scope"
                  v-model="item.name"
                  :cover="true"
                  :offset="[0, 0]"
                  auto-save
                  :validate="val => val.length > 0"
                >
                  <q-input
                    v-model="scope.value"
                    dense
                    autofocus
                    counter
                    :rules="[
                      val => scope.validate(val) || 'Harap diisi'
                    ]"
                    @keyup.enter="scope.set"
                  />
                </q-popup-edit>
              </span>
              <q-skeleton
                v-else
                type="rect"
              />
            </div>
            <div
              v-if="!store.loading"
              class="text-grey-9"
            >
              {{ item.desc }}
              <q-popup-edit
                v-if="admin"
                v-slot="scope"
                v-model="item.desc"

                auto-save
                :validate="val => val.length > 0"
              >
                <q-input
                  v-model="scope.value"
                  type="textarea"
                  autofocus
                  counter
                  :rules="[
                    val => scope.validate(val) || 'Harap diisi'
                  ]"
                  @keyup.enter="scope.set"
                />
              </q-popup-edit>
            </div>
            <div v-else>
              <q-skeleton type="text" />
              <q-skeleton type="text" />
              <q-skeleton type="text" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- save btn -->
    <div
      v-if="admin"
      class="q-py-lg"
    >
      <q-separator class="q-my-md" />
      <app-btn
        label="Simpan Perubahan"
        type="button"
        @click="store.setSectionTwo()"
      />
    </div>
  </div>
</template>
<script setup>
import { useAppStore } from 'src/stores/app'
import { computed } from 'vue'

defineProps({
  admin: {
    type: Boolean,
    default: false
  }
})

const store = useAppStore()

const lists = computed(() => store.section_two)

</script>

<style lang="scss" scoped>
.feature-item {
    text-align: center;
    position: relative;
    overflow: hidden;
    z-index: 1;
    transition: all .5s ease;

    .icon-x {
        height: 60px;
        width: 60px;
        margin: 0 auto 30px;
        text-align: center;
        font-size: 50px;
        // background-color: $yellow;
        position: relative;
        z-index: 1;
        transition: all .5s ease;
        // i.q-icon {
        //     margin-top:-40px;
        //     transition: all .3s ease;
        // }

        &::before{
            content: "";
            position: absolute;
            left: 100%;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: $grey-7;
            transition: all .5s ease;
            z-index: -1;
            opacity: 0;
        }
    }

    // background-color: $green;
    &::before {
        content: "";
        position: absolute;
        z-index: -1;
        border-radius: 50%;
        background-color: $red;
        height: 20px;
        width: 20px;
        left: -10px;
        top: 40px;
        opacity: 0;
        transition: all .5s ease;
    }
    &::after {
        content: "";
        position: absolute;
        z-index: -1;
        border-radius: 50%;
        height: 20px;
        width: 20px;
        background-color: $grey;
        right: -30px;
        top: 80px;
        opacity: 0;
        transition: all .5s ease;
    }
    &:hover {
        box-shadow: 0 0 0px 0px rgb(0 0 0 / 20%), 0 2px 10px rgb(0 0 0 / 10%);
        &::after {
            transform: translateX(-20px);
            opacity:1
        }
        &::before {
            transform: translateX(20px);
            opacity:1
        }
        .icon-x {
            color:#fff !important;
            font-size: 35px;
            // i.q-icon {
            // // transform: scale(20);
            //     margin-top:0px;
            //     // transition: all .3s ease;
            // }
            &::before {
                left: 0;
                border-radius: 50%;
                opacity: 1;
            }
        }
    }

}

</style>

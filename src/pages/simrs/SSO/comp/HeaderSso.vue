<template>
  <div class="row justify-between q-pa-md">
    <div class="">
      <div class="row items-center">
        <div v-if="!isMobile">
          <q-avatar size="40px">
            <img src="~assets/logos/logo-rsud.png">
          </q-avatar>
        </div>
        <div
          v-if="!isMobile"
          class="q-ml-sm text-white"
        >
          <div class="text-h6">
            UOBK RSUD MOHAMAD SALEH
          </div>
          <!-- <div class="text-subtitle">
            KOTA PROBOLINGGO
          </div> -->
        </div>
      </div>
    </div>
    <div class="">
      <div class="row items-center text-white">
        <div
          class="q-mr-md text-subtitle"
        >
          <q-skeleton
            v-if="loading"
            type="text"
            width="100px"
          />
          <div
            v-else
          >
            {{ userLocal? userLocal?.nama:'-' }}
          </div>
        </div>
        <q-avatar
          size="40px"
          class="cursor-pointer bg-grey"
        >
          <img src="~assets/images/actor.svg">
          <q-menu
            transition-show="flip-left"
            transition-hide="flip-right"
            :offset="[0,10]"
          >
            <q-list style="min-width: 131px">
              <q-item
                v-close-popup
                clickable
              >
                <q-item-section avatar>
                  <q-icon
                    name="icon-mat-account_circle"
                    size="16px"
                  />
                </q-item-section>
                <q-item-section>Profile</q-item-section>
              </q-item>
              <q-item
                v-close-popup
                clickable
                @click="emits('setting')"
              >
                <q-item-section avatar>
                  <q-icon
                    name="icon-mat-settings"
                    size="16px"
                  />
                </q-item-section>
                <q-item-section>Settings</q-item-section>
              </q-item>
              <q-separator />
              <q-item
                v-close-popup
                clickable
                @click="emits('signOut')"
              >
                <q-item-section avatar>
                  <q-icon
                    name="icon-mat-exit_to_app"
                    size="16px"
                  />
                </q-item-section>
                <q-item-section>Logout </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-avatar>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { LocalStorage } from 'quasar'
// import { useAuthStore } from 'src/stores/auth'
import { useQuasar } from 'quasar'
import { ref, watch } from 'vue'

const emits = defineEmits(['signOut', 'setting'])
const props = defineProps({
  userLocal: {
    type: Object,
    default: () => {}
  },
  loading: {
    type: Boolean,
    default: false
  }
})

// const store = useAuthStore()

const user = ref({})
const $q = useQuasar()

const isMobile = ref($q.platform.is.mobile)

watch(() => props.userLocal, (obj) => {
  console.log('watch user', obj)
  user.value = obj
})
</script>

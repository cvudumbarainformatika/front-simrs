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
          @mouseover="()=>{
            showing = true
          }"
        >
          <img :src="PHOTO_USER">

          <q-menu
            transition-show="fade"
            transition-hide="fade"
            :offset="[0,10]"
            v-model="showing"
          >
            <q-card style="width:250px">
              <img :src="PHOTO_USER">
              <q-card-section class="bg-grey-2">
                <div class="row no-wrap items-center">
                  <div class="col text-h6 ellipsis">
                    {{ userLocal? userLocal?.nama:'-' }}
                  </div>
                </div>
              </q-card-section>
              <q-list>
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
            </q-card>
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
import { computed, onMounted, ref, watch } from 'vue'

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
const showing = ref(false)
const $q = useQuasar()

const isMobile = ref($q.platform.is.mobile)

onMounted(() => {
  // console.log('header sso mounted', props.userLocal)
})

watch(() => props.userLocal, (obj) => {
  console.log('watch user', obj)
  user.value = obj
})

const PHOTO_USER = computed(() => {
  const kelamin = props.userLocal?.pegawai?.kelamin
  const row = props.userLocal?.pegawai
  if (row?.foto === null || row?.foto === '' || row?.foto === 'undefined' || row?.foto === undefined || row.kddpjp === null) {
    return kelamin === 'Perempuan'
      ? new URL('../../../../assets/images/actress.svg', import.meta.url).href
      : new URL('../../../../assets/images/user-avatar.svg', import.meta.url).href
  }
  else {
    return 'http://192.168.100.100/simpeg/foto/' + row?.nip + '/' + row?.foto
  }
})
</script>

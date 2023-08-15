<template>
  <div>
    <div v-if="store.loading">
      <LoadingList />
    </div>
    <div v-else>
      <q-list
        separator
        no-padding
      >
        <q-item
          v-for="item in store.items"
          :key="item"
          v-ripple
          clickable
        >
          <q-item-section avatar>
            <q-avatar
              :color="responBpjsCode(item.respon)===200?'green':'negative'"
              text-color="white"
              size="md"
            >
              <q-icon :name="responBpjsCode(item.respon)===200?'icon-mat-done':'icon-mat-close'" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ matchUrl(item.url) }}</q-item-label>

            <q-item-label
              caption
              lines="3"
            >
              {{ responBpjsMsg(item.respon) }}
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-icon
              name="icon-mat-dvr"
              color="green"
            />
          </q-item-section>
        </q-item>
        <q-separator />
      </q-list>
    </div>
  </div>
</template>
<script setup>
import LoadingList from './LoadingList.vue'
import { onMounted } from 'vue'
import { useBpjsHttpResponseList } from '../../../../../stores/simrs/monitoring/bpjs/lists'

const store = useBpjsHttpResponseList()
onMounted(() => {
  store.getData()
})

function matchUrl(val) {
  let txt = 'Belum tahu'
  if (val.includes('antrean/add')) {
    txt = 'TAMBAH ANTREAN'
  } else if (val.includes('antrean/updatewaktu')) {
    txt = 'UPDATE ANTRIAN'
  } else if (val.includes('SEP/2.0/insert')) {
    txt = 'INSERT SEP'
  } else if (val.includes('tglSEP')) {
    txt = 'CEK SEP PESERTA'
  }

  return txt
}

function responBpjsCode(val) {
  const success = !!(val !== null || val !== '')
  const respon = success ? isJSON(val) : false
  const metadata = respon ? respon.metadata || respon.metaData : false
  const code = metadata ? metadata.code : 500
  console.log('sss', code)
  return parseInt(code)
}
function responBpjsMsg(val) {
  const success = !!(val !== null || val !== '')
  const respon = success ? isJSON(val) : false
  const metadata = respon ? respon.metadata || respon.metaData : false
  const msg = metadata ? metadata.message : '-'
  console.log('aaa', respon)
  return msg
}

function isJSON(str) {
  if (/^[\],:{}\s]*$/.test(str.replace(/\\["\\\\/bfnrtu]/g, '@')
    . replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\\-]?\d+)?/g, ']')
    . replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
    return JSON.parse(str)
  } else {
    return false
  }
}
</script>

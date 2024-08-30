<template>
  <q-btn
    outline
    color="white"
    class="bg-primary"
    no-caps
  >
    <div class="flex items-center q-mx-xs">
      <div class="f-12 q-mr-sm">
        {{ periode }}
      </div>
      <transition>
        <q-icon
          :name="`${showMenuPeriode?'icon-mat-keyboard_arrow_up':'icon-mat-keyboard_arrow_down'}`"
          size="16px"
        />
      </transition>
    </div>

    <q-menu
      @show="showMenuPeriode=true"
      @hide="showMenuPeriode=false"
    >
      <div class="row no-wrap q-pa-sms">
        <q-list style="min-width: 100px">
          <q-item
            v-for="item in periods"
            :key="item"
            clickable
            :active="item === periode"
            active-class="bg-primary text-white"
            :disable="item === 'Custom'"
            @click="setPeriode(item)"
          >
            <q-item-section>{{ item }}</q-item-section>
          </q-item>
        </q-list>
        <q-separator
          vertical
          inset
        />

        <div class="column">
          <div class="row q-pa-sm q-col-gutter-sm">
            <div class="col">
              <q-date
                v-model="from"
                minimal
                bordered
                flat
                mask="YYYY-MM-DD"
                @update:model-value="setPeriode('Custom')"
              />
              <div class="f-10 text-grey-8 q-mt-xs">
                DARI TANGGAL : <b>{{ from }}</b>
              </div>
            </div>
            <div class="col">
              <q-date
                v-model="to"
                minimal
                bordered
                flat
                mask="YYYY-MM-DD"
                @update:model-value="setPeriode('Custom')"
              />
              <div class="f-10 text-grey-8 q-mt-xs">
                SAMPAI TANGGAL : <b>{{ to }}</b>
              </div>
            </div>
          </div>
          <q-separator />
          <div class="row q-pa-sm justify-end">
            <q-btn
              v-close-popup
              color="primary"
              label="Terapkan"
              push
              size="sm"
              @click="emits('terapkan')"
            />
          </div>
        </div>
      </div>
    </q-menu>
  </q-btn>
</template>
<script setup>
import { dateDbFormat } from 'src/modules/formatter'
import { onMounted, ref } from 'vue'

// periode
const to = ref(dateDbFormat(new Date()))
const from = ref(dateDbFormat(new Date()))

const emits = defineEmits(['setPeriode', 'terapkan'])
const showMenuPeriode = ref(false)
const periods = ref(['Hari ini', 'Minggu ini', 'Bulan ini', 'Custom'])
const periode = ref('Hari ini')

function setPeriode (val) {
  console.log('set per', val)

  periode.value = val
  if (val === 'Hari ini') {
    hariIni()
  }
  else if (val === 'Minggu ini') {
    mingguIni()
  }
  else if (val === 'Bulan ini') {
    bulanIni()
  }
  const per = {
    to: to.value,
    from: from.value
  }
  emits('setPeriode', per)
}
function hariIni () {
  const cDate = new Date()
  to.value = dateDbFormat(cDate)
  from.value = dateDbFormat(cDate)
}
function bulanIni () {
  const curr = new Date(), y = curr.getFullYear(), m = curr.getMonth()

  const firstday = curr.setFullYear(y, m, 1)
  const lastday = curr.setFullYear(y, m + 1, 0)
  // params.from = dateDbFormat(firstday)
  // params.to = dateDbFormat(lastday)

  from.value = dateDbFormat(firstday)
  to.value = dateDbFormat(lastday)
}
function mingguIni () {
  const curr = new Date()
  const firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()))
  const lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6))
  // params.from = dateDbFormat(firstday)
  // params.to = dateDbFormat(lastday)

  from.value = dateDbFormat(firstday)
  to.value = dateDbFormat(lastday)
}
onMounted(() => {
  hariIni()
})
</script>

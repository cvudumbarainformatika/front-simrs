<template>
  <div>
    {{ totalDate }}<br>
    {{ day }}<br>
    {{ month }}<br>
    {{ year }}<br>
    {{ days }}<br>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const date = new Date()
const thisYear = date.getFullYear()
const thisMonth = date.getMonth() + 1
const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate()
}
const startDay = new Date(`${thisYear}-${thisMonth}-1`).getDay() - 1
// const startDay = new Date(`${thisYear}-12-1`).getDay()
const day = ref(startDay)
const month = ref(thisMonth)
const year = ref(thisYear)
const totalDate = ref(getDaysInMonth(thisYear, thisMonth))
const days = ref([])
for (let index = 0; index < totalDate.value; index++) {
  days.value[index + startDay] = index + 1
}

</script>

<template>
  <table class="q-mb-md bg-yellow-3">
    <thead>
      <tr>
        <th width="3%">
          No
        </th>
        <th width="3%">
          P/L
        </th>
        <th width="10%">
          Umur Anak
        </th>
        <th>K/U Anak</th>
        <th>BBL</th>
        <th>Riwayat Kehamilan</th>
        <th class="text-right">
          #
        </th>
      </tr>
    </thead>
    <tbody v-if="items.length">
      <tr v-for="(item, i) in items" :key="i">
        <td>{{ i+1 }}</td>
        <td>{{ item?.pl }}</td>
        <td>{{ item?.umurAnak }}</td>
        <td>{{ item?.kuAnak }}</td>
        <td>{{ item?.bbl }}</td>
        <td>{{ item?.riwayatKehamilan }}</td>
        <td class="text-right">
          <q-btn flat size="xs" icon="icon-mat-delete" round color="negative" @click="deleteData(item?.id)">
            <q-tooltip>Hapus Data</q-tooltip>
          </q-btn>
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <td colspan="7">
          <div class="flex flex-center">
            Belum ada riwayat obsetri
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['delete'])

const deleteData = (id) => {
  emits('delete', id)
}
</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
  width: 100%;
}
table, th, td {
  border: 1px solid $grey;
  padding: 2px 5px;
}
</style>

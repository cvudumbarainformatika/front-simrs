<template>
  <q-markup-table wrap-cells>
    <thead class="bg-primary text-white">
      <tr>
        <th
          class="text-left"
          width="5%"
        >
          No
        </th>
        <th
          class="text-left"
          width="8%"
        >
          Kode
        </th>
        <th class="text-left">
          Nama
        </th>
        <th
          class="text-right bg-teal"
          width="25%"
        >
          Opsi
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, i) in items"
        :key="i"
      >
        <td class="text-left">
          {{ i+1 }}.
        </td>
        <td class="text-left">
          {{ item?.kode }}
        </td>
        <td class="text-left">
          {{ item?.nama }}
        </td>

        <td class="text-right">
          <q-btn
            dense
            color="primary"
            class="q-px-md"
            no-caps
            @click="emits('addIntervensi', item)"
          >
            Add Interv
          </q-btn>
        </td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['addIntervensi'])
</script>

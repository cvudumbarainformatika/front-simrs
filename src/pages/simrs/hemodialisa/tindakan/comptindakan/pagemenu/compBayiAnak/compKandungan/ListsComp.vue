<template>
  <q-card
    v-for="item in items"
    :key="item"
    flat
    bordered
    class="q-mb-sm"
  >
    <q-card-section>
      <div class="q-my-sm">
        <div>Diinput Oleh : <b>{{ item?.pegawai?.nama }}</b></div>
        <div>NOREG : <b>{{ item?.noreg }} </b></div>
      </div>
      <table>
        <tr>
          <td
            width="40%"
            class="text-weight-bold"
          >
            Operasi yang pernah dialami
          </td>
          <td>{{ item?.operasi ?? '-' }}</td>
        </tr>
        <tr>
          <td
            width="40%"
            class="text-weight-bold"
          >
            Faktor keturunan Gemeli
          </td>
          <td>{{ item?.gemeli ?? '-' }}</td>
        </tr>
        <tr>
          <td
            width="40%"
            class="text-weight-bold"
          >
            Menarche
          </td>
          <td>{{ item?.menarche ?? '-' }}</td>
        </tr>
        <tr>
          <td
            width="40%"
            class="text-weight-bold"
          >
            Menstruasi
          </td>
          <td>{{ item?.menstruasi ?? '-' }}</td>
        </tr>
        <tr>
          <td
            width="40%"
            class="text-weight-bold"
          >
            menikah yg Ke
          </td>
          <td>{{ item?.menikahKe ?? '-' }}</td>
        </tr>
        <tr>
          <td
            width="40%"
            class="text-weight-bold"
          >
            Usia Pernikahan
          </td>
          <td>{{ item?.usiaPernikahan ?? '-' }}</td>
        </tr>
        <tr>
          <td
            width="40%"
            class="text-weight-bold"
          >
            Usia Awal Pernikahan
          </td>
          <td>{{ item?.usiaAwalPernikahan ?? '-' }}</td>
        </tr>
        <tr>
          <td
            width="40%"
            class="text-weight-bold"
          >
            Kontrasepsi yg prn dignakan
          </td>
          <td>{{ item?.kontrasepsi ?? '-' }}</td>
        </tr>
      </table>
      <table>
        <tr>
          <td
            width="5%"
            class="text-weight-bold"
          >
            G
          </td>
          <td>{{ item?.kandunganG ?? '-' }}</td>
        </tr>
        <tr>
          <td
            width="5%"
            class="text-weight-bold"
          >
            P
          </td>
          <td>{{ item?.kandunganP ?? '-' }}</td>
        </tr>
        <tr>
          <td
            width="5%"
            class="text-weight-bold"
          >
            A
          </td>
          <td>{{ item?.kandunganA ?? '-' }}</td>
        </tr>
      </table>
      <table>
        <tr>
          <td
            width="40%"
            class="text-weight-bold"
          >
            Keluhan selama kehamilan
          </td>
          <td>{{ item?.keluhan ?? '-' }}</td>
        </tr>
        <tr>
          <td
            width="40%"
            class="text-weight-bold"
          >
            Pemeriksaan Dalam
          </td>
          <td>{{ item?.pemeriksaanDalam ?? '-' }}</td>
        </tr>
      </table>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-pa-sm row justify-between">
      <div>
        <q-btn
          icon="icon-mat-edit"
          size="sm"
          flat
          color="primary"
          label="Copy & Edit Data"
          @click="emits('edit', item)"
        >
          <q-tooltip>Edit Data</q-tooltip>
        </q-btn>
      </div>
      <div>
        <q-btn
          icon="icon-mat-delete"
          size="sm"
          flat
          round
          color="negative"
          @click="emits('hapus', item)"
        >
          <q-tooltip>Hapus Data</q-tooltip>
        </q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>

defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['hapus', 'edit', 'preview'])

</script>

<style lang="scss" scoped>
table{
  width: 100%;
  border-collapse: collapse;
  th, td {
    border: 1px solid $grey;
    padding: 2px 5px;
    vertical-align: top;
  }
}
</style>

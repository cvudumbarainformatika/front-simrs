<template>
  <div class="column full-height">
    <div class="col-auto bg-teal q-pa-sm text-white">
      List Diagnosa Keperawatan
    </div>
    <div class="col full-height">
      <q-list
        bordered
        separator
      >
        <q-item
          v-for="item in props.pasien?.diagnosakeperawatan"
          :key="item.id"
          v-ripple
          clickable
        >
          <q-item-section>
            <q-item-label> <b>{{ item.kode }} - {{ item.nama }}</b> </q-item-label>
            <q-item-label caption>
              Intervensi Keperawatan
            </q-item-label>
            <q-item-label
              v-for="sub in item.intervensi"
              :key="sub.id"
            >
              - {{ sub?.masterintervensi?.nama }}
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-btn
              icon="icon-mat-delete"
              size="xs"
              round
              padding="sm"
              flat
              color="negative"
              @click="hapusItem(item.id)"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script setup>
// import { useQuasar } from 'quasar';

// import { useDiagnosaKeperawatan } from 'src/stores/simrs/pelayanan/poli/diagnosakeperawatan'

// const store = useDiagnosaKeperawatan()
// const $q = useQuasar()

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

// function hapusItem()

</script>

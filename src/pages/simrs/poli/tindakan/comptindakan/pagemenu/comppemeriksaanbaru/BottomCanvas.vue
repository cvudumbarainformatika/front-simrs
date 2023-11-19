<template>
  <div class="column">
    <div class="q-px-sm q-py-md flex flex-center full-width">
      <div
        class="bg-dark q-px-sm q-py-xs shadow-2"
        style="border-radius: 23px ;"
      >
        <div class="row items-center  ">
          <!-- <q-btn-group
            rounded
          > -->
          <q-btn
            color="negative"
            text-color="white"
            rounded
            icon="icon-mat-refresh"
            push
            size="sm"
            padding="sm"
            flat
            @click="resetTanda"
          >
            <q-tooltip>
              reset penandaan
            </q-tooltip>
          </q-btn>
          <q-separator
            vertical
            class="q-mx-sm"
            dark
          />
          <q-btn
            icon="icon-mat-save"
            text-color="white"
            size="sm"
            rounded
            :label="`simpan Gambar`"
            class="q-px-sm"
            @click="saveImage"
          />
          <q-separator
            vertical
            class="q-mx-sm"
            dark
          />
          <q-btn
            color="negative"
            text-color="white"
            rounded
            icon="icon-mat-insert_photo"
            push
            size="sm"
            padding="sm"
            flat
            @click="emits('isTemplate')"
          >
          <!-- </q-btn-group> -->
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

const emits = defineEmits(['reset', 'saveImage', 'isTemplate'])

function resetTanda() {
  emits('reset')
}

function saveImage() {
  emits('saveImage')
}

</script>

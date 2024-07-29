<template>
  <q-item
    v-ripple
    clickable
    class="q-my-lg bg-white shadow-q relative-position"
  >
    <q-card
      :class="`absolute text-grey-3`"
      style="top:-15px; left: 0;"
    >
      <div class="f-10">
        <!-- {{ item?.status_masuk === item.norm? 'COMPLETED' : 'ON PROGRESS ...' }} -->
        <q-skeleton
          type="rect"
          width="60px"
        />
      </div>
    </q-card>
    <div class="row items-center full-width">
      <div class="col-6">
        <div class="row fit q-pa-none items-center q-col-gutter-md">
          <div class="col-auto">
            <!-- <q-avatar size="40px">
              <img src="https://cdn.quasar.dev/img/avatar.png">
            </q-avatar> -->
            <q-skeleton
              type="circle"
              size="40px"
            />
          </div>
          <div class="col full-width flex wrap ellipsis">
            <div class="full-width ellipsis">
              <!-- {{ item?.nama }} -->
              <q-skeleton />
            </div>
            <div class="flex q-gutter-sm q-pt-xs">
              <!-- <div> <b>No. RM :</b> <span class="text-primary">{{ item?.norm }}</span></div> -->
              <!-- <div> <b>No. REG :</b> <span class="text-grey-8">{{ item?.noreg }}</span></div> -->
              <!-- <q-skeleton width="100%" /> -->
            </div>
            <div class="ellipsis text-grey-8 q-pt-xs column">
              <!-- Alamat : <i>{{ item?.alamat }}</i> -->
              <q-skeleton
                width="100px"
                height="10px"
              />
              <q-skeleton
                width="400px"
                class="q-mt-xs"
                height="10px"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="row items-center full-width q-col-gutter-md">
          <div class="col-3 ">
            <div class="text-grey-8 f-12">
              <!-- {{ date.formatDate(item?.tgl_kunjungan, 'MMM DD, YYYY') }} -->
              <q-skeleton />
            </div>
            <div class="q-pt-sm">
              <!-- {{ item?.sistembayar }} -->
              <q-skeleton />
            </div>
          </div>
          <div class="col-2">
            <div class="f-10 text-grey-8">
              <!-- dari -->
              <q-skeleton
                width="40px"
                height="10px"
              />
            </div>
            <div>
              <!-- <span class="text-primary">{{ item?.poli }}</span> -->
              <q-skeleton class="q-mt-xs" />
            </div>
          </div>
          <div class="col full-width flex wrap ellipsis">
            <div class="f-10 text-grey-8">
              <!-- Rencana ke .. -->
              <q-skeleton
                width="100px"
                height="10px"
              />
            </div>
            <div class="full-width ellipsis">
              <!-- <span class="text-primary">{{ item?.ruangan }}</span> -->
              <q-skeleton class="q-mt-xs" />
            </div>
          </div>
          <div class="col-2 flex justify-end">
            <div>
              <!-- <span class="text-primary">OPSI</span> -->
              <q-skeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-item>
</template>

<script setup>
</script>

<template>
  <q-card
    flat
    bordered
    square
    class="full-height bg-teal-2"
    style="overflow: hidden;"
  >
    <q-bar
      class="bg-teal text-white z-top"
      style="width: inherit;"
    >
      <div class="f-12">
        Data Penilaian Anamnesis
      </div>
      <q-space />
    </q-bar>

    <q-card-section
      style="padding:0"
      class="full-height bg-grey"
    >
      <div
        v-if="loadingaja"
        class="column full-height flex-center"
      >
        <div class="text-white">
          Harap Tunggu .....
        </div>
        <div class="text-white">
          Sinkron Data Ke DATABASE
        </div>
      </div>
      <div
        v-if="pasien?.penilaiananamnesis?.length <= 0"
        class="column full-height flex-center"
      >
        <div class="text-white">
          Belum Ada data tersimpan
        </div>
      </div>
      <q-scroll-area
        v-else
        style="height:calc(100% - 32px);"
      >
        <q-list
          class="bg-white"
          separator
        >
          <transition-group name="list">
            <q-item

              v-for="(item , n) in pasien?.penilaiananamnesis"
              :key="n"
            >
              <q-item-section>
                <div v-if="item?.humpty_dumpty !== ''">
                  <div
                    class="row f-12" v-for="(sub , x) in item.humpty_dumpty"
                    :key="x"
                  >
                    <div class="col-2 q-mb-md">
                      <q-item-label>
                        <span>{{ x.toUpperCase() }} </span>
                      </q-item-label>
                    </div>
                    <q-item-label class="col-9">
                      <span class="text-weight-bold"> : {{ sub?.label }} </span>
                      <span class="text-weight-bold"> => ( {{ sub?.skor }} )</span>
                    </q-item-label>
                  </div>
                </div>
                <div v-if="item.morse_fall !== ''">
                  <div
                    class="row f-12" v-for="(sub , xx) in item.morse_fall"
                    :key="xx"
                  >
                    <div class="col-2 q-mb-sm">
                      <q-item-label>
                        <span>{{ xx.toUpperCase() }} </span>
                      </q-item-label>
                    </div>
                    <q-item-label class="col-9">
                      <span class="text-weight-bold"> : {{ sub?.label }} </span>
                      <span class="text-weight-bold"> => ( {{ sub?.skor }} )</span>
                    </q-item-label>
                  </div>
                </div>
                <div v-if="item.hasil !== ''">
                  <div>
                    <div
                      v-for="(itemon , on) in item?.hasil"
                      :key="on"
                      class="row f-12 col-12 q-mb-sm"
                    >
                      <div class="col-12 q-mb-sm">
                        <q-item-label>
                          <span class="text-weight-bold">{{ itemon?.label }} : </span>
                        </q-item-label>
                        <div v-if="itemon?.submenu?.length > 0">
                          <div
                            class="row" v-for="(submenu , sa) in itemon?.submenu"
                            :key="sa"
                          >
                            <div class="col-8 q-ml-md q-mt-sm">
                              <q-item-label>{{ submenu?.label }} </q-item-label>
                            </div>

                            <div v-for="(categoris , ct) in submenu?.categories" :key="ct">
                              <div class="col-2 q-ml-md q-mt-sm">
                                <q-item-label>{{ categoris?.label }} || Skor: {{ categoris?.skor }}</q-item-label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div v-else>
                          <div v-for="(categorisx , xc) in itemon?.categories" :key="xc">
                            <div class="col-2 q-ml-md q-mt-sm">
                              <q-item-label>{{ categorisx?.label }} || Skor: {{ categorisx?.skor }}</q-item-label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- <div class="col-12 q-mb-md">
                      <q-item-label>
                        <span class="text-weight-bold">Status Mental : </span>
                      </q-item-label>
                      <div class="row">
                        <div class="col-7 q-ml-md q-mt-md">
                          <q-item-label>- Apakah pasien delirium? (tidak dapat membuat keputusan, pola pikir tidak terorganisir, gangguan daya ingat)? </q-item-label>
                        </div>
                        <div class="col-2 q-ml-md q-mt-md">
                          <q-item-label>{{ item?.ontario?.statusMental_a?.label }}</q-item-label>
                        </div>
                        <div class="col-2 q-ml-md q-mt-md">
                          <q-item-label>{{ item?.ontario?.statusMental_a?.skor }}</q-item-label>
                        </div>
                        <div class="col-7 q-ml-md ">
                          <q-item-label>- Apakah pasien disorientasi? (salah menyebutkan waktu, tempat atau orang) </q-item-label>
                        </div>
                        <div class="col-2 q-ml-md ">
                          <q-item-label>{{ item?.ontario?.statusMental_b?.label }}</q-item-label>
                        </div>
                        <div class="col-2 q-ml-md ">
                          <q-item-label>{{ item?.ontario?.statusMental_b?.skor }}</q-item-label>
                        </div>
                        <div class="col-7 q-ml-md ">
                          <q-item-label>- Apakah pasien agitasi? (ketakutan, gelisah dan cemas) </q-item-label>
                        </div>
                        <div class="col-2 q-ml-md ">
                          <q-item-label>{{ item?.ontario?.statusMental_c?.label }}</q-item-label>
                        </div>
                        <div class="col-2 q-ml-md ">
                          <q-item-label>{{ item?.ontario?.statusMental_c?.skor }}</q-item-label>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 q-mb-md">
                      <q-item-label>
                        <span class="text-weight-bold">Penglihatan : </span>
                      </q-item-label>
                      <div class="row">
                        <div class="col-7 q-ml-md q-mt-md">
                          <q-item-label>- Apakah pasien memakai kaca mata? </q-item-label>
                        </div>
                        <div class="col-2 q-ml-md q-mt-md">
                          <q-item-label>{{ item?.ontario?.penglihatan_a?.label }}</q-item-label>
                        </div>
                        <div class="col-2 q-ml-md q-mt-md">
                          <q-item-label>{{ item?.ontario?.penglihatan_a?.skor }}</q-item-label>
                        </div>
                        <div class="col-7 q-ml-md ">
                          <q-item-label>- Apakah pasien disorientasi? (salah menyebutkan waktu, tempat atau orang) </q-item-label>
                        </div>
                        <div class="col-2 q-ml-md ">
                          <q-item-label>{{ item?.ontario?.penglihatan_b?.label }}</q-item-label>
                        </div>
                        <div class="col-2 q-ml-md ">
                          <q-item-label>{{ item?.ontario?.penglihatan_b?.skor }}</q-item-label>
                        </div>
                        <div class="col-7 q-ml-md ">
                          <q-item-label>- Apakah pasien mengeluh adanya penglihatan buram? </q-item-label>
                        </div>
                        <div class="col-2 q-ml-md ">
                          <q-item-label>{{ item?.ontario?.penglihatan_c?.label }}</q-item-label>
                        </div>
                        <div class="col-2 q-ml-md ">
                          <q-item-label>{{ item?.ontario?.penglihatan_c?.skor }}</q-item-label>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 q-mb-md">
                      <q-item-label>
                        <span class="text-weight-bold">Kebiasaan Berkemih : </span>
                      </q-item-label>
                      <div class="row">
                        <div class="col-7 q-ml-md q-mt-md">
                          <q-item-label>- Apakah terdapat perubahan perilaku berkemih? (frekuensi, urgensi, inkontinensia, nokturia) </q-item-label>
                        </div>
                        <div class="col-2 q-ml-md q-mt-md">
                          <q-item-label>{{ item?.ontario?.berkemih_a?.label }}</q-item-label>
                        </div>
                        <div class="col-2 q-ml-md q-mt-md">
                          <q-item-label>{{ item?.ontario?.berkemih_a?.skor }}</q-item-label>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 q-mb-md">
                      <q-item-label>
                        <span class="text-weight-bold">Transfer (dr tempat tidur ke kursi dan sebaliknya) : </span>
                      </q-item-label>
                      <div class="row">
                        <div class="col-6 q-ml-md q-mt-md">
                          <q-item-label>{{ item?.ontario?.transfertk?.label }}</q-item-label>
                        </div>
                        <div class="col-2 q-ml-md q-mt-md">
                          <q-item-label>{{ item?.ontario?.transfertk?.skor }}</q-item-label>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 q-mb-md">
                      <q-item-label>
                        <span class="text-weight-bold">Mobilitas : </span>
                      </q-item-label>
                      <div class="row">
                        <div class="col-6 q-ml-md q-mt-md">
                          <q-item-label>{{ item?.ontario?.mobilitas?.label }}</q-item-label>
                        </div>
                        <div class="col-2 q-ml-md q-mt-md">
                          <q-item-label>{{ item?.ontario?.mobilitas?.skor }}</q-item-label>
                        </div>
                      </div>
                    </div> -->
                  </div>
                </div>
              </q-item-section>
              <q-item-section
                side
              >
                <div class="q-gutter-sm">
                  <!-- <q-btn
                    flat
                    round
                    size="sm"
                    icon="icon-mat-edit"
                    @click="store.editForm(item)"
                  /> -->
                  <q-btn
                    flat
                    round
                    size="sm"
                    icon="icon-mat-delete"
                    color="negative"
                    @click="hapusItem(item.id)"
                  />
                </div>
              </q-item-section>
            </q-item>
          </transition-group>
          <q-separator />
        </q-list>
      </q-scroll-area>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { usePenilaianAnamnesisIgd } from 'src/stores/simrs/igd/penilaiananamnesis'
import { watch } from 'vue'

// import { computed } from 'vue'
const store = usePenilaianAnamnesisIgd()
const $q = useQuasar()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  loadingaja: {
    type: Boolean,
    default: false
  }
})

// const lists = computed(() => {
//   const arr = props.pasien?.penilaiananamnesis
//   return arr?.sort((a, b) => { return b.id - a.id })
// })

function hapusItem (id) {
  $q.dialog({
    dark: true,
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    // console.log('OK')
    store.deleteData(props.pasien, id)
  }).onCancel(() => {
    // console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

store?.masterpenilaian()

watch(() => {
  // if(props?.pasien?.penilaiananamnesis?.on)
  console.log('asd')
  console.log('sasaxxx', store?.ontarios)
  const master = []
  store?.ontarios?.form.forEach(sa => {
    if (sa?.submenu?.length > 0) {
      sa?.submenu?.forEach(su => {
        master.push(su)
      })
    }
    else {
      master.push(sa)
    }
  })
  console.log('master', master)
  console.log('pasien', props.pasien)
  const awal = props?.pasien?.penilaiananamnesis
  console.log('asd', awal)
  props?.pasien?.penilaiananamnesis?.forEach(x => {
    if (x?.ontario) {
      x.hasil = store?.ontarios?.form
      x?.hasil?.forEach(ha => {
        console.log('ha', ha)
        if (ha?.submenu.length) {
          ha?.submenu.forEach(su => {
            su.skor = x.ontario[su.kode]
          })
        }
        else {
          ha.skor = x.ontario[ha.kode]
        }
      })
    }
    // const ontario = Object.keys(x?.ontario)
    // ontario?.forEach(key => {
    //   console.log('key', key)
    //   const mas = master.find(a => a.kode === key)
    //   x.ontario[key].master = mas?.label
    // })
    console.log('sasa', x)
  })
})

// onMounted(() => {
//   console.log('sasa', props?.pasien?.penilaiananamnesis)
//   const penilaians = props?.pasien?.penilaiananamnesis
//   penilaians.forEach(x => {
//     console.log('sasesesax', x)
//     //   if (x?.humpty_dumpty !== '') {
//     const wew = penilaians?.humpty_dumpty
//     wew?.forEach(xxx => {
//       console.log('sasax', xxx)
//     })
//   //  }
//   })
// })

</script>

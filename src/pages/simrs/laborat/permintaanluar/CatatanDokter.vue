<template>
  <q-page>
    <q-card>
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="photo">
            <div style="width:200px">
              <q-img
                :src="getImage()"
                class="bg-grey-2"
              />
            </div>
          </div>
          <div class="column f-14">
            <div class="row q-mb-xs">
              <div style="width:100px">
                Nama
              </div> <span>: {{ store.details.length > 0 ? store.details[0].nama : null }}</span>
            </div>
            <div class="row q-mb-xs">
              <div style="width:100px">
                No.KTP
              </div> <span>: {{ store.details.length > 0 ? store.details[0].noktp : null }}</span>
            </div>
            <div class="row q-mb-xs">
              <div style="width:100px">
                Alamat
              </div> <span>: {{ store.details.length > 0 ? store.details[0].alamat : null }}</span>
            </div>
            <div class="row q-mb-xs">
              <div style="width:100px">
                Kelamin
              </div> <span>: {{ kelamin }}</span>
            </div>
            <div class="row q-mb-xs">
              <div style="width:100px">
                Agama
              </div> <span>: {{ store.details.length > 0 ? store.details[0].agama : null }}</span>
            </div>
            <div class="row q-mb-xs">
              <div style="width:100px">
                Pekerjaan
              </div> <span>: {{ store.details.length > 0 ? store.details[0].nama_pekerjaan : null }}</span>
            </div>
            <q-separator class="q-my-md" />
            <div class="row q-mb-xs">
              <div style="width:100px">
                Nota
              </div> <span>: {{ store.details.length > 0 ? store.details[0].nota : null }}</span>
            </div>
            <div class="row q-mb-xs">
              <div style="width:100px">
                Pengirim
              </div> <span>: {{ store.details.length > 0 ? store.details[0].pengirim : null }}</span>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section v-if="store.loading">
        <q-markup-table>
          <thead>
            <tr>
              <th
                class="text-left"
                style="width: 150px"
              >
                <q-skeleton
                  animation="blink"
                  type="text"
                />
              </th>
              <th class="text-right">
                <q-skeleton
                  animation="blink"
                  type="text"
                />
              </th>
              <th class="text-right">
                <q-skeleton
                  animation="blink"
                  type="text"
                />
              </th>
              <th class="text-right">
                <q-skeleton
                  animation="blink"
                  type="text"
                />
              </th>
              <th class="text-right">
                <q-skeleton
                  animation="blink"
                  type="text"
                />
              </th>
              <th class="text-right">
                <q-skeleton
                  animation="blink"
                  type="text"
                />
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="n in 5"
              :key="n"
            >
              <td class="text-left">
                <q-skeleton
                  animation="blink"
                  type="text"
                  width="85px"
                />
              </td>
              <td class="text-right">
                <q-skeleton
                  animation="blink"
                  type="text"
                  width="50px"
                />
              </td>
              <td class="text-right">
                <q-skeleton
                  animation="blink"
                  type="text"
                  width="35px"
                />
              </td>
              <td class="text-right">
                <q-skeleton
                  animation="blink"
                  type="text"
                  width="65px"
                />
              </td>
              <td class="text-right">
                <q-skeleton
                  animation="blink"
                  type="text"
                  width="25px"
                />
              </td>
              <td class="text-right">
                <q-skeleton
                  animation="blink"
                  type="text"
                  width="85px"
                />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>

      <q-card-section
        v-else
      >
        <q-markup-table
          separator="cell"
          dense
        >
          <thead>
            <tr>
              <th
                class="text-left"
                width="5%"
              >
                No
              </th>
              <th class="text-left">
                Pemeriksaan
              </th>
              <th class="text-right">
                Hasil
              </th>
              <th class="text-right">
                Satuan
              </th>
              <th class="text-right">
                Biaya
              </th>
              <th class="text-right">
                Jml
              </th>
              <th class="text-right">
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody>
            <template
              v-for="(item, i) in store.groups"
            >
              <template v-if="item.name===''">
                <tr
                  v-for="(val, n) in item.value"
                  :key="n"
                >
                  <td
                    class="text-left"
                  >
                    {{ item.name === ""?
                      i + n + 1
                      : n!==0? ''
                        :store.details[i - 1].name === ""?i + store.details[i - 1].value.length
                          :i + n + 1
                    }}
                  </td>
                  <td
                    class="text-left"
                    :colspan="item.name==='' || (item.name!=='' && n===0)?1:0"
                  >
                    {{ val.pemeriksaan_laborat.rs2 }}
                  </td>
                  <td
                    class="text-right"
                  >
                    kosong
                  </td>
                  <td
                    class="text-right"
                  >
                    {{ val.pemeriksaan_laborat.rs22 }}
                  </td>
                  <td
                    class="text-right"
                  >
                    {{ formatRp(val.biaya) }}
                  </td>
                  <td
                    class="text-right"
                  >
                    {{ val.pemeriksaan_laborat.jumlah }}
                  </td>
                  <td
                    class="text-right"
                  >
                    {{ formatRp(val.subtotal) }}
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr
                  :key="i"
                  class="bg-grey-3"
                >
                  <td
                    colspan="4"
                  >
                    {{ item.name }}
                  </td>
                  <td
                    class="text-right"
                  >
                    {{ formatRp(item.value? item.value[0].biaya:0) }}
                  </td>
                  <td
                    class="text-right"
                  >
                    {{ item.value[0].pemeriksaan_laborat.jumlah }}
                  </td>
                  <td
                    class="text-right"
                  >
                    {{ formatRp(item.value? item.value[0].subtotal:0) }}
                  </td>
                </tr>
                <tr
                  v-for="(val, n) in item.value"
                  :key="n"
                >
                  <td>
                    {{ n+1 }}
                  </td>
                  <td>
                    {{ val.pemeriksaan_laborat.rs2 }}
                  </td>

                  <td
                    class="text-right"
                  >
                    kosong
                  </td>
                  <td
                    class="text-right"
                  >
                    {{ val.pemeriksaan_laborat.rs22 }}
                  </td>
                  <td
                    class="text-right"
                  />
                  <td
                    class="text-right"
                  />
                  <td
                    class="text-right"
                  />
                </tr>
              </template>
            </template>
            <tr class="bg-primary text-white">
              <td
                colspan="5"
                class="text-right"
              >
                TOTAL :
              </td>
              <td
                class="text-right"
                colspan="2"
              >
                {{ formatRp(store.total) }}
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>

      <q-separator />

      <q-form @submit="onSubmit">
        <q-card-section>
          <div class="f-16 text-weight-bold q-mb-md">
            Catatan Dokter
          </div>
          <q-input
            v-model="store.catatan"
            outlined
            type="textarea"
            label="Catatan Dokter"
            :rules="[val => !!val || 'Harap diisi']"
          />
        </q-card-section>
        <q-separator />
        <q-card-actions
          align="right"
          class="q-py-md"
        >
          <app-btn
            v-if="store.details.length > 0"
            label="Simpan Catatan"
            :loading="load"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { useDetailsLaboratLuar } from 'src/stores/simrs/penunjang/laborat/permintaanluar/details'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { formatRp } from 'src/modules/formatter'
import { api } from 'src/boot/axios'
import { notifErrVue, notifSuccessVue } from '../../../../modules/utils'

const store = useDetailsLaboratLuar()
const route = useRoute()

onMounted(() => {
  store.getDetails(route.query.nota)
})

const kelamin = computed(() => store.kelamin)
console.log(store.groups)

function getImage() {
  if (kelamin.value === null) {
    return new URL('../../../../assets/images/nouser.png', import.meta.url).href
  }
  return kelamin.value === 'Laki-laki'
    ? new URL('../../../../assets/images/actor.svg', import.meta.url).href
    : new URL('../../../../assets/images/actress.svg', import.meta.url).href
}

// const catatan = ref('')
const load = ref(false)

async function onSubmit() {
  if (store.details.length === 0) {
    notifErrVue('Data Masih Belum terload semua')
  }
  load.value = true
  const params = { nota: route.query.nota, catatan: store.catatan }
  try {
    await api.post('v1/interpretasi/store', params).then((resp) => {
      notifSuccessVue('Data Sukses Tersimpan')
      load.value = false
    })
  } catch (error) {
    load.value = false
  }
}
</script>

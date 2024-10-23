import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'
import { useAnamnesisRanapStore } from 'src/stores/simrs/ranap/anamnesis'
import { useAsessmentUlangRanapStore } from 'src/stores/simrs/ranap/asessmentulang'
import { usePemeriksaanUmumRanapStore } from 'src/stores/simrs/ranap/pemeriksaanumum'
import { usePenilaianRanapStore } from 'src/stores/simrs/ranap/penilaian'
import { reactive, watch, watchEffect } from 'vue'

export default function useForm (pasien) {
  const storeAnamnesis = useAnamnesisRanapStore()
  const storePemeriksaanUmum = usePemeriksaanUmumRanapStore()
  const storePenilaian = usePenilaianRanapStore()

  const store = useAsessmentUlangRanapStore()

  const settings = reactive({
    isForm: false,
    isChildForm: false,
    formOpen: null,
    isEdit: false,
    isLoadingSave: false
  })

  const editable = reactive({
    item: null
  })

  // UNTUK FORM DI LIST SOAP

  const editFormAnamnesis = (item) => {
    console.log('edit', item)
    const storeAnamnesis = useAnamnesisRanapStore()
    storeAnamnesis.initReset(item.anamnesis)
    settings.formOpen = 'anamnesis'
    settings.isChildForm = true
    settings.isEdit = true
    editable.item = item
  }
  const updateToServerAnamnesis = (jnsKasus) => {
    settings.isLoadingSave = true
    const storeAnamnesis = useAnamnesisRanapStore()

    const kasusKep = jnsKasus?.gruping
    let formDefault = storeAnamnesis.form
    if (kasusKep === '4.1') {
      formDefault = storeAnamnesis.form
    }
    if (kasusKep === '4.2' || kasusKep === '4.3' || kasusKep === '4.4') {
      formDefault.skreeninggizi = null
      formDefault.keluhannyeri = null
    }
    // eslint-disable-next-line no-unused-vars
    const payload = {

      id: storeAnamnesis.form.id,
      id_cppt: editable.item?.id,
      form: formDefault,
      formKebidanan: kasusKep === '4.2' ? storeAnamnesis.formKebidanan : null, // ini storeAnamnesis.formKebidanan,
      formNeoNatal: kasusKep === '4.3' ? storeAnamnesis.formNeoNatal : null,
      formPediatrik: kasusKep === '4.4' ? storeAnamnesis.formPediatrik : null // ini storeAnamnesis.formPediatrik
    }

    console.log('payload', payload)

    return new Promise((resolve, reject) => {
      api.post('v1/simrs/ranap/layanan/cppt/editcpptanamnesis', payload)
        .then(resp => {
          console.log('resp update', resp)

          if (resp.status === 200) {
            const res = resp.data?.result?.length ? resp.data?.result[0] : null
            const indx = store.items.findIndex(x => x?.id === res?.id)
            console.log('res', res)
            if (indx > -1) {
              console.log('indx', indx)
              store.items[indx].anamnesis = res?.anamnesis
              console.log('items wes d oprek', store.items)
            }
          }
          settings.isLoadingSave = false
          settings.isChildForm = false
          resolve(resp)
          notifSuccess(resp)
        })
        .catch(err => {
          settings.isLoadingSave = false
          reject(err)
        })
    })
  }

  const editFormPemeriksaan = (item) => {
    console.log('edit', item)
    const storePemeriksaan = usePemeriksaanUmumRanapStore()
    storePemeriksaan.initReset(item.pemeriksaan)
    settings.formOpen = 'pemeriksaan'
    settings.isChildForm = true
    settings.isEdit = true
    editable.item = item
  }

  const updateToServerPemeriksaan = (jnsKasus) => {
    settings.isLoadingSave = true
    const storePemeriksaan = usePemeriksaanUmumRanapStore()

    const kasusKep = jnsKasus?.gruping
    let formDefault = storePemeriksaan.form
    if (kasusKep === '4.1') {
      formDefault = storePemeriksaan.form
    }
    if (kasusKep === '4.2' || kasusKep === '4.3' || kasusKep === '4.4') {
      formDefault.skreeninggizi = null
      formDefault.keluhannyeri = null
    }

    const storePenilaian = usePenilaianRanapStore()
    const penilaian = {
      barthel: null,
      norton: (storePenilaian.nortons.grupings?.includes(kasusKep)) ? storePenilaian.formNorton : null,
      humpty_dumpty: (storePenilaian.humptys.grupings?.includes(kasusKep) && (storePenilaian.usia < 18)) ? storePenilaian.formHumpty : null,
      morse_fall: (storePenilaian.morses.grupings?.includes(kasusKep) && (storePenilaian.usia >= 18 && storePenilaian.usia < 60)) ? storePenilaian.formMorse : null,
      ontario: (storePenilaian.ontarios.grupings?.includes(kasusKep) && (storePenilaian.usia >= 60)) ? storePenilaian.formOntario : null,
      kdruang: pasien?.kdruangan ?? null,
      noreg: pasien?.noreg,
      norm: pasien?.norm,
      id: editable?.item?.penilaian_id
    }

    const payload = {

      id: editable?.item?.rs253_id,
      id_cppt: editable.item?.id,
      form: formDefault,
      // formKebidanan: kasusKep === '4.2' ? storePemeriksaan.formKebidanan : null, // ini storePemeriksaan.formKebidanan,
      // formNeoNatal: kasusKep === '4.3' ? storePemeriksaan.formNeoNatal : null,
      // formPediatrik: kasusKep === '4.4' ? storePemeriksaan.formPediatrik : null // ini storePemeriksaan.formPediatrik
      formKebidanan: null,
      formNeoNatal: null,
      formPediatrik: null,
      penilaian
    }

    // console.log('payload', payload)
    // console.log('item', editable.item)

    return new Promise((resolve, reject) => {
      api.post('v1/simrs/ranap/layanan/cppt/editcpptpemeriksaan', payload)
        .then(resp => {
          console.log('resp update', resp)

          if (resp.status === 200) {
            const res = resp.data?.result?.length ? resp.data?.result[0] : null
            const indx = store.items.findIndex(x => x?.id === res?.id)
            console.log('res', res)
            if (indx > -1) {
              console.log('indx', indx)
              store.items[indx].pemeriksaan = res?.pemeriksaan
              store.items[indx].penilaian = res?.penilaian
              console.log('items wes d oprek', store.items)
            }
          }
          settings.isLoadingSave = false
          settings.isChildForm = false
          resolve(resp)
          notifSuccess(resp)
        })
        .catch(err => {
          settings.isLoadingSave = false
          reject(err)
        })
    })
  }

  const updateAsPlanInst = (item, val, initial, kode) => {
    const target = store.items.find(x => x?.id === item.id)

    let payload = null
    if (target) {
      target[kode] = val
      payload = {
        id: item?.id,
        asessment: target?.asessment,
        plann: target?.plann,
        instruksi: target?.instruksi
      }
    }
    console.log('updateAsPlanInst', payload)
    console.log('target', target)

    return new Promise((resolve, reject) => {
      api.post('v1/simrs/ranap/layanan/cppt/updateasplaninst', payload)
        .then(resp => {
          console.log('resp update', resp)
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  watch(() => pasien?.cppt, (val, old) => {
    // console.log('watch cppt new', val)
    // console.log('watch cppt old', old)
    store.getCppt(val)
  }, { deep: true })

  watchEffect(() => {
    // console.log('watchEffect cppt', pasien?.cppt)
  })

  return {
    settings,
    store,
    storeAnamnesis,
    storePemeriksaanUmum,
    storePenilaian,

    editFormAnamnesis,
    updateToServerAnamnesis,

    editFormPemeriksaan,
    updateToServerPemeriksaan,

    updateAsPlanInst
  }
}

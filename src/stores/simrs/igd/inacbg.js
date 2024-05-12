/* eslint-disable no-unreachable */
import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { useKasirIgdStore } from '../kasir/igd/kasirigd'

export const useInacbgIgd = defineStore('inacbg-igd', {
  state: () => ({
    kodeIna: '',
    tarifIna: 0,
    tarifRs: 0,
    totalTindakan: 0,
    totalLaborat: 0,
    desc: '',

    loading: false,
    formSpecial: {},
    //= == special ina ===
    specialProcedureOpts: [],
    specialProsthesisOpts: [],
    specialInvestigationOpts: [],
    specialDrugOpts: []
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {
    async getDataIna(pasien) {
      const adaIcd = pasien?.diagnosa?.length
      const noreg = pasien?.noreg
      // console.log('wew', adaIcd)

      // this.kodeIna = 'maintenance'
      // return

      this.loading = true
      if (adaIcd) {
        const params = {
          params: { noreg }
        }
        try {
          const resp = await api.get('v1/simrs/pelayanan/carisimulasi', params)
          // console.log('inabro', resp)
          if (resp.status === 200) {
            const ok = resp.data?.metadata?.code === 200
            if (ok) {
              this.setIna(resp.data?.response)
              this.setSpecialOption(resp.data)
            }
            this.loading = false
          }
          this.loading = false
        } catch (error) {
          this.loading = false
        }
      } else {
        this.setIna()
        this.loading = false
      }
    },
    setIna(obj) {
      this.kodeIna = obj?.cbg?.code ?? '---'
      // this.tarifIna = obj?.cbg?.tariff ?? '0'
      this.tarifIna = obj?.cbg?.base_tariff ?? '0'
      this.desc = obj?.cbg?.description ?? ''
    },

    setSpecialOption(obj) {
      this.specialProcedureOpts = obj?.special_cmg_option?.filter(a => a.type === 'Special Procedure') ?? []
      this.specialProsthesisOpts = obj?.special_cmg_option?.filter(a => a.type === 'Special Prosthesis') ?? []
      this.specialInvestigationOpts = obj?.special_cmg_option?.filter(a => a.type === 'Special Investigation') ?? []
      this.specialDrugOpts = obj?.special_cmg_option?.filter(a => a.type === 'Special Drug') ?? []

      const specCmg = obj?.response?.special_cmg ?? []
      if (specCmg.length) {
        specCmg.forEach(cmg => {
          if (cmg.type === 'Special Procedure') {
            const posProce = this.specialProcedureOpts.findIndex(el => el.description === cmg.description)
            if (posProce >= 0) {
              this.specialProcedureOpts[posProce].code = cmg.code
              this.specialProcedureOpts[posProce].description = cmg.description
            }
          }
          if (cmg.type === 'Special Prosthesis') {
            const posPros = this.specialProsthesisOpts.findIndex(el => el.description === cmg.description)
            if (posPros >= 0) {
              this.specialProsthesisOpts[posPros].code = cmg.code
              this.specialProsthesisOpts[posPros].description = cmg.description
            }
          }
          if (cmg.type === 'Special Investigation') {
            const posInves = this.specialInvestigationOpts.findIndex(el => el.description === cmg.description)
            if (posInves >= 0) {
              this.specialInvestigationOpts[posInves].code = cmg.code
              this.specialInvestigationOpts[posInves].description = cmg.description
            }
          }
          if (cmg.type === 'Special Drug') {
            const posDrug = this.specialDrugOpts.findIndex(el => el.description === cmg.description)
            if (posDrug >= 0) {
              this.specialDrugOpts[posDrug].code = cmg.code
              this.specialDrugOpts[posDrug].description = cmg.description
            }
          }
        })

        if (this.specialProcedureOpts.length) {
          this.formSpecial.procedure_code = this.specialProcedureOpts[0].code
          this.specialProcedureOpts.splice(0, 0, { code: '', description: 'none' })
        }
        if (this.specialProsthesisOpts.length) {
          this.formSpecial.prosthesis_code = this.specialProsthesisOpts[0].code
          this.specialProsthesisOpts.splice(0, 0, { code: '', description: 'none' })
        }
        if (this.specialInvestigationOpts.length) {
          this.formSpecial.investigation_code = this.specialInvestigationOpts[0].code
          this.specialInvestigationOpts.splice(0, 0, { code: '', description: 'none' })
        }
        if (this.specialDrugOpts.length) {
          this.formSpecial.drug_code = this.specialDrugOpts[0].code
          this.specialDrugOpts.splice(0, 0, { code: '', description: 'none' })
        }
      }
      // console.log('obj da', obj)
      // console.log('procedure ', this.specialProcedureOpts)
      // console.log('Prosthesis ', this.specialProsthesisOpts)
      // console.log('Investigation ', this.specialInvestigationOpts)
      // console.log('Drug ', this.specialDrugOpts)
    },

    setTotalTindakan(pasien) {
      const kasir = useKasirIgdStore()
      const par = { noreg: pasien?.noreg }
      kasir.getBill(par).then(() => {
        // console.log('bill', kasir.rekapBill)
        this.tarifRs = kasir.rekapBill.totalall
      })
      // const arr = pasien?.tindakan
      // this.totalTindakan = arr?.length ? arr?.reduce((acc, cur) => acc + cur.subtotal, 0) : 0
      // this.tarifRs = parseInt(this.totalTindakan) + parseInt(this.totalLaborat)
    },
    setTotalLaborat(pasien) {
      const arr = pasien?.laborats
      const lab = arr?.map(x => {
        const obj = {
          biayaLayanan: x?.details[0]?.rs13,
          biayaSarana: x?.details[0]?.rs6
        }
        const subtotal = parseInt(obj?.biayaLayanan) + parseInt(obj?.biayaSarana)
        return subtotal
      })

      this.totalLaborat = lab?.length ? lab?.reduce((acc, cur) => acc + cur, 0) : 0
      // console.log('total lab', this.totalLaborat)
      this.tarifRs = parseInt(this.totalTindakan) + parseInt(this.totalLaborat)
    },
    setFormSpecial(key, val) {
      this.formSpecial[key] = val
    }
  }
})

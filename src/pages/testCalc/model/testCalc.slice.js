import { createSlice } from '@reduxjs/toolkit'

const testCalc = createSlice({
  name: 'testCalc',
  initialState: {
    objects: null,
    acts: null,
    settings: null,
    calculations: [],
    showCalc: null,
    start: null,
    end: null,
    viewStart: null,
    viewEnd: null,
    subject: {
      _id: '6492e9871e0d2d9f34746e62',
      set2bId: '1602',
      lastName: 'Тестировщик',
      initials: 'Тестировщик ',
      rolesId: '642e21a68c32bb735ab9e9ba',
      email: 'test@tt.tt',
      refreshToken: '',
      salaryConfig: {
        mode: 'НУ2',
        salaryFixed: 0,
        salaryTarget: 80000,
        areaHeadModelConfig: {
          workloadCoefActive: true,
          workloadCoefMultiplier2: 1.2,
          workloadCoefMultiplier3: 1.25,
          workloadCoefMultiplier4: 1.3,
          workloadCoefMultiplier5: 1.35,
          accumulationCoefActive: false,
          accumulationCoefMultiplier: 1.1,
          accumulationCoefThreshold: 10000000,
          salaryPremiumPercent: 30,
          deductionCoef: 1,
          premiumCoef: 1
        }
      },
      note: 'TEST SQL DB set2bId 1602',
      hasRefreshToken: false,
      roleName: 'Начальник участка'
    }
  },
  reducers: {
    // addPlans (state, action) {
    //   state.objects = ({ ...state.objects, ...action.payload })
    // },
    setCalcObjects (state, action) {
      state.objects = action.payload
    },
    setCalcActs (state, action) {
      state.acts = action.payload
    },
    setCalcSettings (state, action) {
      state.settings = action.payload
    },
    setCalcStart (state, action) {
      state.start = action.payload
    },
    setCalcEnd (state, action) {
      state.end = action.payload
    },
    setCalcViewStart (state, action) {
      state.viewStart = action.payload
    },
    setCalcViewEnd (state, action) {
      state.viewEnd = action.payload
    },
    getAllTestCalculations (state, action) {
      state.calculations = action.payload
    },
    addTestCalculation (state, action) {
      const res = [...state.calculations, action.payload]
      // setStorageValue('testCalculations', res)
      state.calculations = res
    },
    deleteTestCalculation (state, action) {
      const res = state.calculations.filter(item => item.created !== action.payload)
      // setStorageValue('testCalculations', res)
      state.calculations = res
      if (state.showCalc === action.payload) { state.showCalc = null }
    },
    // addCalculation (state, action) {
    //   // state.calculations = [...state.calculations, action.payload]
    //   state.calculations = action.payload
    // },
    // deleteCalculation (state, action) {
    //   state.calculations = state.calculations.filter((_, index) => index !== action.payload)
    // }
    setShowDaysByDateCreated (state, action) {
      state.showCalc = action.payload
    }
  }
})

export default testCalc.reducer
export const { setCalcObjects, setCalcActs, setCalcSettings, setCalcStart, setCalcEnd, setShowDaysByDateCreated, addTestCalculation, deleteTestCalculation, setCalcViewStart, setCalcViewEnd } = testCalc.actions

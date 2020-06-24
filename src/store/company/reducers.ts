import { setCurrentCompany, SET_CURRENT_COMPANY } from './types'

export const initialState: string = ''

export const companyReducer = (
  state: string = initialState,
  action: setCurrentCompany,
): string => {
  switch (action.type) {
    case SET_CURRENT_COMPANY:
      return action.payload
    default:
      return state
  }
}

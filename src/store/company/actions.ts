import { setCurrentCompany, SET_CURRENT_COMPANY } from './types'
import { Dispatch } from 'react'
import { AppThunk } from '..'

export const putCurrentCompany = (company: string): AppThunk => (
  dispatch: Dispatch<setCurrentCompany>,
) => {
  dispatch({ type: SET_CURRENT_COMPANY, payload: company })
}

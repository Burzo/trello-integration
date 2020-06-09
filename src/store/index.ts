import { createStore, combineReducers, Action, applyMiddleware } from 'redux'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import { boardsReducer } from './boards/reducers'

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

const rootReducer = combineReducers({
  boards: boardsReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default function configureStore() {
  return createStore(rootReducer, applyMiddleware(thunkMiddleware))
}

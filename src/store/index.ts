import { createStore, combineReducers, Action, applyMiddleware } from 'redux'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import { boardsReducer } from './boards/reducers'
import { cardsReducer } from './cards/reducers'
import { listsReducer } from './lists/reducers'

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

const rootReducer = combineReducers({
  boards: boardsReducer,
  cards: cardsReducer,
  lists: listsReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default function configureStore() {
  return createStore(rootReducer, applyMiddleware(thunkMiddleware))
}

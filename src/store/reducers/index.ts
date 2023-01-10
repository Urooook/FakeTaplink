import { Action, combineReducers } from 'redux'
import { ThunkAction } from 'redux-thunk'

export const rootReducer = combineReducers({})

export type RootStore = ReturnType<typeof rootReducer>

export type AppThunkAction<A extends Action> = ThunkAction<void, RootStore, unknown, A>

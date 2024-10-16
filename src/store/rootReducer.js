import { combineReducers } from 'redux'
import adminSlice from './features/adminSlice'

const rootReducer = combineReducers({ adminSlice })

export default rootReducer

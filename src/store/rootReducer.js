import { combineReducers } from 'redux'
import adminSlice from './features/adminSlice'

const rootReducer = combineReducers({
    admin: adminSlice,
})

export default rootReducer

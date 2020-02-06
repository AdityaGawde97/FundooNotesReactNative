import { combineReducers } from "redux"
import ViewReducer from "./ListGridView/ViewReducer"
import UidReducer from './UidStore/UidReducer'

const RootReducer = combineReducers({
    userID: UidReducer,
    view: ViewReducer,
})

export default RootReducer
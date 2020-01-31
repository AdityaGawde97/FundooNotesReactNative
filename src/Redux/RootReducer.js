import { combineReducers } from "redux"
import ViewReducer from "./ListGridView/ViewReducer"
import LabelsReducer from './LabelPages/LabelsReducer'
import UidReducer from './UidStore/UidReducer'

const RootReducer = combineReducers({
    userID: UidReducer,
    view: ViewReducer,
    label: LabelsReducer
})

export default RootReducer
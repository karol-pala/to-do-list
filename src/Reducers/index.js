import { combineReducers } from "redux"
import { list } from "./list"
import { task } from "./task"

export default combineReducers({
    list,
    task
})
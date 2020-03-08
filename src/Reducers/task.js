export const task = (state = [], action) => {
    switch(action.type) {
        case 'GET_TASK_NAME':
            return [
                ...action.taskName
            ]
        case 'GET_TASK_DESCRIPTION':
            return [
                ...action.taskDesc
            ]
        case 'GET_TASK_DATE':
            return [
                ...action.taskDate
            ]
        default: 
            return state
    }
}
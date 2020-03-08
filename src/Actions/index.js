export const getList = (list) => ({
    type: 'GET_LIST',
    list
})

export const makeList = () => ({
    type: 'MAKE_LIST',
    list: []
})

export const getTaskName = (taskName) => ({
    type: 'GET_TASK_NAME',
    taskName
})

export const getTaskDescription = (taskDesc) => ({
    type: 'GET_TASK_DESCRIPTION',
    taskDesc
})

export const getTaskDate = (taskDate) => ({
    type: 'GET_TASK_DATE',
    taskDate
})

export const list = (state = [], action) => {
    switch(action.type) {
        case 'GET_LIST':
            return [
                ...action.list
            ]
        case 'MAKE_LIST':
            return [
                ...action.list
            ]
        default:
            return state
    }
}
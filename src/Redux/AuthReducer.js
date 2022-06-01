
const InitialState = {
    userLogin: false
}

const authReducer = (state = InitialState, action) => {
    switch(action.type){
        case 'USER_LOGIN':
            return {...state , userLogin: action.payload}
        case 'USE_lOGOUT':
            return {...state, userLogin: action.payload}
        default:
            return state
}
}

export default authReducer
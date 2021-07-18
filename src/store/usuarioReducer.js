const INITIAL_STATE = {
    usuarioEmail:'',
    usuarioLogado:false
}

function usuarioReducer(state=INITIAL_STATE, action) {
    switch (action.type) {
        case 'LOG_IN':
            return {...state, usuarioLogado: true, usuarioEmail:action.usuarioEmail}
            break;
        case 'LOG_OUT':
            return {...state, usuarioLogado:false,usuarioEmail:null}
            break;
        default:
            return state
            break;
    }
}
export default usuarioReducer
export default(state, action) =>{
    switch(action.type) {
        case 'DELETE_TRANSACTION':
            return{
                ...state,
                transactions: state.transactions.filter(transaction => transaction.id !==
                    action.payload)
            }

        case 'ADD_TRANSACTION':
            return{
                ...state,
                transactions: [action.payload,...state.transactions]
            }

        case 'LOGIN':
            return{
                ...state,
                user: action.payload
            }

        case 'LOGOUT':
            return{
                ...state,
                user: action.payload
            }

        default:
            return state;
    }
}
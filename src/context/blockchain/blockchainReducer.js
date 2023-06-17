import { CONNECTION_FAILED, CONNECTION_REQUEST, CONNECTION_SUCCESS, UPDATE_ACCOUNT } from "types/reducerTypes";


export default function blockchainReducer( state, action ) {
    switch (action.type) {
        case CONNECTION_REQUEST:
            return {
                ...state, 
                loading: true
            }

        case CONNECTION_SUCCESS:
            return {
                ...state,
                loading: false,
                account: action.payload.account,
                lipToken: action.payload.lipToken,
                web3: action.payload.web3,
                errorMsg: action.payload.errorMsg
            }

        case CONNECTION_FAILED:
            return {
                ...state,
                loading: false,
                errorMsg: action.payload
            }

        case UPDATE_ACCOUNT:
            return {
                ...state,
                account: action.payload
            }

        default:
            return state
    }
}
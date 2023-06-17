import { CHECK_DATA_FAILED, CHECK_DATA_REQUEST, CHECK_DATA_SUCCESS } from "types/reducerTypes";


export default function blockchainReducer( state, action ) {
    switch (action.type) {
        case CHECK_DATA_REQUEST:
            return {
                ...state,
                loading: true
            }

        case CHECK_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                allLips: action.payload.allLips,
                allOwnerLips: action.payload.allOwnerLips,
                fee: action.payload.fee,
                feeUpValue: action.payload.feeUpValue
            }

        case CHECK_DATA_FAILED:
            return {
                ...state,
                loading: false,
                error: true,
                errorMsg: action.payload
            }

        default:
            return state
    }
}
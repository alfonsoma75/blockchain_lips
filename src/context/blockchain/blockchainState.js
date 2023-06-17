import { useReducer } from "react";

// Web3
import Web3 from 'web3';

// Smart Contract
import LipToken from 'contracts/LipToken.json'

// Context
import BlockchainContext from "./blockchainContext";

// Reducer
import BlockchainReducer from "./blockchainReducer";
import { CONNECTION_FAILED, CONNECTION_REQUEST, CONNECTION_SUCCESS, UPDATE_ACCOUNT } from "types/reducerTypes";


export default function BlockchainState({ children }) {

    const initialState = {
        loading: false,
        account: null,
        lipToken: null,
        web3: null,
        errorMsg: ""
    }

    const [ state, dispatch ] = useReducer( BlockchainReducer, initialState )

    const connect = async () => {
        dispatch({ type: CONNECTION_REQUEST })

        if ( window.ethereum ) {
            const web3 = new Web3(window.ethereum)

            try {
                const accounts = await window.ethereum.request({
                    method: "eth_accounts"
                })
                const networkId = await window.ethereum.request({
                    method: "net_version"
                })

                if ( !!networkId && parseInt(networkId) === 5777 ) {
                    const networkData = LipToken.networks[networkId]
                    const abi = LipToken.abi
                    const address = networkData.address
                    const lipToken = new web3.eth.Contract(abi, address)

                    dispatch({
                        type: CONNECTION_SUCCESS,
                        payload: {
                            account: accounts[0],
                            lipToken: lipToken,
                            web3: web3,
                            errorMsg: ''
                        }
                    })

                    window.ethereum.on("accountsChanged", () => {
                        dispatch({
                            type: UPDATE_ACCOUNT,
                            payload: accounts[0]
                        })
                    })

                    window.ethereum.on("chainChanged", () => {
                        window.location.reload()
                    })

                } else {

                    dispatch({
                        type: CONNECTION_FAILED,
                        payload: "Can't connect to the network"
                    })

                }

            } catch(err) {

                dispatch({
                    type: CONNECTION_FAILED,
                    payload: "Be sure you are connected and logged to Metamask"
                })

            }
        } else {
            dispatch({
                type: CONNECTION_FAILED,
                payload: "Please, install Metamask"
            })

        }
    }

    return (
        <BlockchainContext.Provider
            value={{
                account: state.account,
                lipToken: state.lipToken,
                errorMsg: state.errorMsg,
                bcLoading: state.loading,
                web3: state.web3,
                connect,
            }}
        >
            { children }
        </BlockchainContext.Provider>
    )
}
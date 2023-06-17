import { useContext, useReducer } from "react";

// Context
import DataContext from "./dataContext";
import Blockchaincontext from "context/blockchain/blockchainContext";

// Reducer
import DataReducer from "./dataReducer";

// Constants
import {
  CHECK_DATA_FAILED,
  CHECK_DATA_REQUEST,
  CHECK_DATA_SUCCESS,
} from "types/reducerTypes";
import { allnames } from "types/namesTypes";

export default function DataState({ children }) {
  const initialState = {
    loading: false,
    allLips: [],
    allOwnerLips: [],
    fee: null,
    feeUpValue: null,
    error: false,
    errorMsg: "",
  };

  const [state, dispatch] = useReducer(DataReducer, initialState);

  const blockchainContext = useContext(Blockchaincontext);
  const { lipToken, web3 } = blockchainContext;

  const fetchData = async (account) => {
    const allLips = await lipToken?.methods?.getLips().call();
    const allOwnerLips = await lipToken?.methods?.getOwnerLips(account).call();
    const fee = await lipToken?.methods?.getFeeValue().call();
    const feeUpValue = await lipToken?.methods?.getFeeLevelUpValue().call();

    dispatch({
      type: CHECK_DATA_SUCCESS,
      payload: {
        allLips,
        allOwnerLips,
        fee: web3.utils.fromWei(fee, "ether"),
        feeUpValue: web3.utils.fromWei(feeUpValue, "ether"),
      },
    });
  };

  const mintLip = (account) => {
    const rnd = Math.floor(Math.random() * 100);
    const name = allnames[rnd];

    if (!!web3) {
      dispatch({
        type: CHECK_DATA_REQUEST,
      });

      lipToken.methods
        .createRandomLip(name)
        .send({
          from: account,
          value: web3.utils.toWei(state.fee, "ether"),
        })
        .then((receipt) => {
          fetchData(account);
        })
        .catch((err) => {
          console.log(`Hay error ${err}`);
          dispatch({
            type: CHECK_DATA_FAILED,
            payload: "Error al crear token NFT",
          });
        });
    }
  };

  const levelUpLip = (account, id) => {
    dispatch({
      type: CHECK_DATA_REQUEST,
    });
    lipToken.methods
      .levelUp(id)
      .send({
        from: account,
        value: web3.utils.toWei(state.feeUpValue, "ether"),
      })
      .then((receipt) => {
        fetchData(account);
      })
      .catch((err) => {
        console.log(`Hay error ${err}`);
        dispatch({
          type: CHECK_DATA_FAILED,
          payload: "Error al crear token NFT",
        });
      });
  };

  const balanceSmartContract = async (account) => {
    dispatch({
      type: CHECK_DATA_REQUEST,
    });

    const moneyWei = await lipToken.methods.moneySmartContract().call();
    const money = web3.utils.fromWei(moneyWei, "ether");
    alert(`Balance => ${money} ETH`);
  };

  const etherOwner = (account) => {
    lipToken.methods
      .withdraw()
      .send({
        from: account,
      })
      .then((receipt) => {
        fetchData(account);
      })
      .catch((err) => {
        console.log(`Hay error ${err}`);
        dispatch({
          type: CHECK_DATA_FAILED,
          payload: "Error al crear token NFT",
        });
      });
  };

  return (
    <DataContext.Provider
      value={{
        dtLoading: state.loading,
        allLips: state.allLips,
        allOwnerLips: state.allOwnerLips,
        error: state.error,
        errorMsg: state.errorMsg,
        balanceSmartContract,
        fetchData,
        mintLip,
        levelUpLip,
        etherOwner,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

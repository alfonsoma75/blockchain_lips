import BlockchainState from "./blockchain/blockchainState";
import DataState from "./data/dataState";


export default function AllContext({ children }) {
    return (
        <BlockchainState>
            <DataState>
                { children }
            </DataState>
        </BlockchainState>
    )
}
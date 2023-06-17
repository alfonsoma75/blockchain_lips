import { useContext, useEffect } from 'react';

import BlockchainContext from 'context/blockchain/blockchainContext';
import DataContext from 'context/data/dataContext';

// Styles
import 'styles/theme.css';
import * as s from 'styles/globalStyles';

import _color from 'assets/images/bg/_color.png';
import LipRenderer from 'components/LipRenderer';


export default function RootApp() {

    const blockchainContext = useContext(BlockchainContext)
    const { account, errorMsg, bcLoading, lipToken, connect } = blockchainContext

    const dataContext = useContext(DataContext)
    const { dtLoading, allLips, fetchData, mintLip, levelUpLip, balanceSmartContract, etherOwner } = dataContext

    const handleConnect = () => {
        connect()
    }

    const handleNewLip = () => {
        mintLip(account)
    }

    const handleMoney = () => {
        balanceSmartContract()
    }

    const handleRetiraDinero = () => {
        etherOwner(account)
    }

    useEffect( () => {
        if (!!account) {
            fetchData(account)
        }
    }, [account])

    // if (!!bcLoading || !!dtLoading ) return <span> LOading ... </span>
    return (
        <s.Screen image={_color}>
             <s.Container flex={1} ai={'center'} jc={'center'}>
            {
                ( !account || lipToken === null ) 
                ? 
                   <>
                        <s.TextTitle>Bienvenido a BcLips</s.TextTitle>

                        <s.SpacerSmall />
                            
                        <s.Button1
                            onClick={handleConnect}
                        >
                            CONNECTAR
                        </s.Button1>

                        <s.SpacerSmall />

                        { !!errorMsg && <div style={{color: 'darkRed'}}>Error {errorMsg}</div>}
                        </>
          
                : 
                <>
                    <s.TextTitle> Comienza el juego</s.TextTitle>
                    <s.SpacerMedium />
                    <s.Button2
                        onClick={handleNewLip}
                    >
                        CREAR NUEVO NFT
                    </s.Button2>
                    <s.SpacerMedium />
                    <s.Container jc={'center'} fd={"row"} style={{flexWrap: "wrap"}}>
                        {
                            allLips.map( (item, idx) => (
                                <s.Container key={idx} style={{padding: "15px"}}>
                                    <LipRenderer lip={item} />
                                    <s.SpacerXSmall />
                                    <s.Container>
                                      <s.TextDescription>ID: {Number(item.id)}</s.TextDescription>
                                        <s.TextDescription>DNA: {Number(item.dna)}</s.TextDescription>
                                        <s.TextDescription>LEVEL: {Number(item.level)}</s.TextDescription>
                                        <s.TextDescription>NAME: {item.name}</s.TextDescription>
                                        <s.TextDescription>RARTY: {Number(item['rarity'])}</s.TextDescription>
                                        <s.SpacerXSmall />
                                        <s.Button3
                                            disabled={!!bcLoading || !!dtLoading}
                                            onClick={() => {
                                                levelUpLip(account, item.id)
                                            }}
                                        >
                                        SUBIR NIVEL
                                        </s.Button3>
                                    </s.Container>
                                </s.Container>

                            ) )
                        }
                        
                    </s.Container>
                    <s.Button4
                            onClick={handleMoney}
                            >
                            BALANCE DEL SMART CONTRACT
                        </s.Button4>
                        <s.Button4
                            onClick={handleRetiraDinero}
                            >
                            RETIRAR DINERO
                        </s.Button4>
                </>

            }

                </s.Container>
        </s.Screen>
        
    )
}
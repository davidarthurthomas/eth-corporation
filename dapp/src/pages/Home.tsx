import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { ABI } from "../utils/ABI";
import Summary from "../components/Summary";
import RoundsTable from "../components/RoundsTable";

export default function Home() {
    const { Moralis, isInitialized } = useMoralis();
    const [name, setName] = useState<any>("");
    const [symbol, setSymbol] = useState<any>("");
    const [description, setDescription] = useState<any>("");
    const [currentRound, setCurrentRound] = useState<any>({});
    const [rounds, setRounds] = useState<any>();

    function getReadOptions(functionName: string) {
        return {
            contractAddress: `${process.env.REACT_APP_CONTRACT_ADDRESS}`,
            functionName,
            abi: ABI,
        }
    }

    async function getWeb3() {
        const web3 = await Moralis.enableWeb3();
        return web3
    }

    async function getName() {
        const name = await Moralis.executeFunction(getReadOptions("name"));
        setName(name);
    }

    async function getSymbol() {
        const symbol = await Moralis.executeFunction(getReadOptions("symbol"));
        setSymbol(symbol);
    }

    async function getDescription() {
        const description = await Moralis.executeFunction(getReadOptions("description"));
        setDescription(description);
    }

    async function getRoundsCreated() {
        const RoundsCreated = Moralis.Object.extend("RoundsCreated");
        const createdQuery = new Moralis.Query(RoundsCreated);
        createdQuery.descending('uid_decimal');
        const createdResults = await createdQuery.find();
        const table: any[] = createdResults.map((round) => {
            return {
                id: round.attributes.round_id,
                name: round.attributes.name.toString(),
                description: round.attributes.description.toString(),
                funding: round.attributes.round_size_decimal.value.$numberDecimal,
                valuation: round.attributes.valuation_decimal.value.$numberDecimal,
                supply: round.attributes.token_supply_decimal.value.$numberDecimal,
                status: false,
                is_current: parseInt(round.attributes.round_id) + 1 === createdResults.length
            }
        });
        const RoundsClosed = Moralis.Object.extend("RoundsClosed");
        const closedQuery = new Moralis.Query(RoundsClosed);
        closedQuery.descending('uid_decimal');
        const closedRounds = await closedQuery.find();
        closedRounds.map((round) => {
            table[round.attributes.round_id_decimal.value.$numberDecimal].status = round.attributes.is_complete;
        });
        return table;
    }

    useEffect(() => {
        if (isInitialized) {
            getWeb3().then(() => {
                getName();
                getSymbol();
                getDescription();
                getRoundsCreated().then((rounds) => {
                    setCurrentRound(rounds[rounds.length - 1]);
                    setRounds(rounds);
                });
            });
        }
    }, [isInitialized]);

    return(
        <div className='w-screen pb-24'>
            <Summary name={name} symbol={symbol} description={description} currentRound={currentRound}/>
            <RoundsTable rounds={rounds} symbol={symbol}/>
        </div>
    )
}
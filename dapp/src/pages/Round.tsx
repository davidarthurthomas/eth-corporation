import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"
import { useMoralis } from "react-moralis"
import { ABI } from "../utils/ABI"
import Vote from "../components/Vote";
import Invest from "../components/Invest";

export default function Proposal() {
    const { state } = useLocation()
    const [round, setRound] = useState<any>()
    const [userVoteStatus, setUserVoteStatus] = useState<boolean>()

    let symbol: any;
    try {
        symbol = state;
    } catch (e) {
        if (e instanceof TypeError) {
            console.log("No round found");
        }
    }

    const { Moralis, isInitialized, user } = useMoralis();

    async function getWeb3() {
        const web3 = await Moralis.enableWeb3();
        return web3
    }

    async function getCurrentRound() {
        const chain: 'mumbai' = "mumbai";
        const options = {
            chain: chain,
            address: `${process.env.REACT_APP_CONTRACT_ADDRESS}`,
            function_name: "currentRound",
            abi: ABI
        }
        const currentRound = await Moralis.Web3API.native.runContractFunction(options);
        return currentRound;
    }

    async function getUserVoteStatus() {
        const address = user?.attributes.ethAddress;
        const VoteStatus = Moralis.Object.extend('Votes');
        const query = new Moralis.Query(VoteStatus);
        query.equalTo("voter", address);
        query.descending("createdAt");
        const results = await query.find();
        return results[0].attributes.is_for;
    }

    useEffect(() => {
        if (isInitialized) {
            getWeb3().then(() => {
                getCurrentRound().then((currentRound) => {
                    console.log(currentRound);
                    const current = {
                        id: currentRound.at(0),
                        name: currentRound.at(3),
                        description: currentRound.at(4),
                        funding: currentRound.at(7),
                        valuation: currentRound.at(5),
                        supply: currentRound.at(6),
                        left_to_raise: currentRound.at(8),
                        votes_for: currentRound.at(9),
                        is_active: currentRound.at(1)?.at(0),
                        is_approved: currentRound.at(1)?.at(1),
                        is_complete: currentRound.at(1)?.at(2),
                    }
                    setRound(current);
                    getUserVoteStatus().then((isFor) => setUserVoteStatus(isFor))
                })
            })
        }
    }, [isInitialized]);

    const getRoundStatus = () => {
        if (round?.is_complete) {
            return "Funded";
        } else if (round?.is_active && !round?.is_approved) {
            return "In Voting";
        } else if (round?.is_active && round?.is_approved) {
            return "Accepting Funds";
        } else {
            return "Failed";
        }
    }

    return (
        <div className='flex flex-row w-screen px-36 pt-12'>
            <div className='flex flex-col flex-grow border-black border rounded-xl px-8 py-12'>
                <h1 className='text-3xl font-bold font-mono mb-4'>
                    {round?.name}
                </h1>
                <h1 className='text-xl font-mono italic mb-4'>
                    {`${getRoundStatus()} (${round?.funding} MATIC)`}
                </h1>
                <h2 className='text-lg font-mono mb-4'>
                    {round?.description}
                </h2>
                <h2 className='text-lg font-mono'>
                    {`Valuation: ${round?.valuation} MATIC | Supply: ${round?.supply} ${symbol}`}
                </h2>
            </div>
            {round?.is_active && !round?.is_approved && <Vote round={round} voteStatus={userVoteStatus} />}
            {round?.is_active && round?.is_approved && <Invest round={round} />}
        </div>
    )
}
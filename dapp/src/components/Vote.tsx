import { useState } from 'react'
import { useMoralis } from "react-moralis"
import { ABI }  from "../utils/ABI"

export default function Vote({ round, voteStatus }: { round: any, voteStatus: boolean | undefined }) {
    const { Moralis } = useMoralis();
    const [isFor, setIsFor] = useState(voteStatus);

    const castVoteFor = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const options = {
            contractAddress: `${process.env.REACT_APP_CONTRACT_ADDRESS}`,
            functionName: "voteOnRound",
            abi: ABI,
            params: {
                vote: true
            }
        }
        Moralis.executeFunction(options)
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error)
        })
        setIsFor(true);
    }

    const castVoteAgainst = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const options = {
            contractAddress: `${process.env.REACT_APP_CONTRACT_ADDRESS}`,
            functionName: "voteOnRound",
            abi: ABI,
            params: {
                vote: false
            }
        }
        Moralis.executeFunction(options)
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error)
        })
        setIsFor(false);
    }

    return (
        <div className='border-black border w-6/12 rounded-xl px-8 py-12 ml-5'>
            <h1 className='text-3xl font-bold font-mono mb-4'>
                Vote
            </h1>
            <h1 className='text-xl font-mono italic mb-4'>
                {`${round?.votes_for} For`}
            </h1>
            <h2 className='text-lg font-mono mb-6'>
                Vote on the proposed funding round
            </h2>
            <form>
                <button onClick={(e) => castVoteFor(e)} className={`text-md font-mono border border-black rounded-lg px-3 py-1 ${isFor ? 'text-white bg-black' : ''}`}>
                    For
                </button>
                <button onClick={(e) => castVoteAgainst(e)} className={`text-md font-mono border border-black rounded-lg px-3 py-1 ml-2 ${!isFor ? 'text-white bg-black' : ''}`}>
                    Against
                </button>
            </form>
        </div>
    )
}
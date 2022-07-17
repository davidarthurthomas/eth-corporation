import { useState } from "react";
import { useMoralis } from "react-moralis"
import { ABI }  from "../utils/ABI"

export default function Invest() {
    const { Moralis } = useMoralis();
    const [amount, setAmount] = useState(0);

    const handleChange = (e: any) => {
        const amount = e.target.value;

        if (!amount || amount.match(/^\d{1,}(\.\d{0,4})?$/)) {
            setAmount(amount);
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const chain: 'mumbai' = "mumbai";
        const options = {
            chain: chain,
            address: `${process.env.REACT_APP_CONTRACT_ADDRESS}`,
            function_name: "invest",
            abi: ABI,
            params: amount, amount
        }
        const currentRound = await Moralis.Web3API.native.runContractFunction(options);
        console.log(amount);
    }

    return (
        <div className='border-black border w-6/12 rounded-xl px-8 py-12 ml-5'>
            <h1 className='text-3xl font-bold font-mono mb-4'>
                Invest
            </h1>
            <h1 className='text-xl font-mono italic mb-4'>
                0.1 / 0.9 MATIC
            </h1>
            <h2 className='text-lg font-mono mb-4'>
                Invest in the current funding round
            </h2>
            <div>
                <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
                    <input type="text" name="amount" value={amount} onChange={(e) => handleChange(e)} className='text-md font-mono border border-black rounded-lg px-3 py-1 mr-2 mt-2' />
                    <input type='submit' value='Invest' className='text-md font-mono border border-black rounded-lg px-3 py-1 mt-2' />
                </form>
            </div>
        </div>
    )
}
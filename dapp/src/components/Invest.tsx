import { useState } from "react";
import { useMoralis } from "react-moralis"
import { ABI }  from "../utils/ABI"

export default function Invest({ round }: {round: any}) {
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
        const options = {
            contractAddress: `${process.env.REACT_APP_CONTRACT_ADDRESS}`,
            functionName: "invest",
            abi: ABI,
            params: {
                payableAmount: amount,
                amount: amount
            }
        }
        Moralis.executeFunction(options)
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className='border-black border w-8/12 rounded-xl px-8 py-12 ml-5'>
            <h1 className='text-3xl font-bold font-mono mb-4'>
                Invest
            </h1>
            <h1 className='text-xl font-mono italic mb-4'>
                {`${round.funding - round.left_to_raise} / ${round.funding} MATIC`}
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
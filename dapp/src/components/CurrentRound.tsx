import { Link } from "react-router-dom"

export default function CurrentRound({round, symbol}: {round: any, symbol: string}) {
    return (
        <div className='border-black border w-5/12 rounded-xl px-8 py-12'>
            <h1 className='text-3xl font-bold font-mono mb-4'>
                {round.name}
            </h1>
            <h1 className='text-xl font-mono italic mb-4'>
                {(round?.status) ? "Funded" : "In Progress"}
                {` (${round?.funding} MATIC)`}
            </h1>
            <h2 className='text-lg font-mono mb-4'>
                {round.description}
            </h2>
            <Link to={`round/${round.id}`} state={symbol}>
                <p className='text-lg font-mono italic'>
                    {`Details >`}
                </p>
            </Link>
        </div>
    )
}
import RoundItem from "./RoundItem";

export default function RoundsTable({rounds, symbol}: {rounds: any[], symbol: string}) {
    return (
        <div className='border-black border rounded-xl px-8 py-12 mx-36 mt-5'>
            <h1 className='text-3xl font-bold font-mono mb-6'>
                Rounds
            </h1>
            <div className='flex'>
                <p className='w-4/12 font-mono'>
                    Name
                </p>
                <p className='w-2/12 font-mono'>
                    Funding
                </p>
                <p className='w-2/12 font-mono'>
                    Valuation
                </p>
                <p className='w-2/12 font-mono'>
                    Supply
                </p>
                <p className='w-2/12 font-mono'>
                    Status
                </p>
            </div>
            <hr
                className='border-black'
            />
            {rounds?.map((round) => {
                return(
                    <RoundItem key={round.id} round={round} symbol={symbol}/>
                )
                })
            }
        </div>
    )
}
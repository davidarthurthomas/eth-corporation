import CurrentRound from './CurrentRound';


export default function Summary({name, symbol, description, currentRound}: {name: string, symbol: string, description: string, currentRound: any}) {
    return (
        <div className='flex flex-row w-screen px-36 pt-12'>
            <div className='flex flex-col border-black border rounded-xl w-7/12 px-8 py-12 mr-5'>
                <h1 className='text-3xl font-bold font-mono mb-4'>
                    {name}
                </h1>
                <h1 className='text-3xl font-mono mb-4'>
                    {`$${symbol}`}
                </h1>
                <h2 className='text-lg font-mono'>
                    {description}
                </h2>
            </div>
            <CurrentRound round={currentRound} symbol={symbol}/>
        </div>
    )
}
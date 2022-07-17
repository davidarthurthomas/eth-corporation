import { Link } from 'react-router-dom';

export default function RoundItem({round, symbol}: {round: any, symbol: string}) {
    const getRoundStatus = () => {
        if (round.status) {
            return "Funded";
        } else if (!round.status && round.is_current) {
            return "In Progress";
        } else {
            return "Failed";
        }
    }

    return (
        <Link to={`/round/${round.id}`} state={symbol}>
            <div>
                <div className='flex items-center pt-5'>
                    <p className='text-lg font-bold font-mono w-4/12'>
                        {round.name}
                    </p>
                    <p className='w-2/12 font-mono'>
                        {`${round.funding} MATIC`}
                    </p>
                    <p className='w-2/12 font-mono'>
                        {`${round.valuation} MATIC`}
                    </p>
                    <p className='w-2/12 font-mono'>
                        {`${round.supply} ${symbol}`}
                    </p>
                    <p className='w-2/12 font-mono'>
                        {getRoundStatus()}
                    </p>
                </div>
                <hr
                    className='border-black mt-5'
                />
            </div>
        </Link>
    )
}
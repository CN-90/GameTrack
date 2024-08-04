import Link from "next/link";
import { Ladder } from '@/interfaces'

interface Props {
    games: Ladder[]
}

function GameList({ games }: Props) {
    return (
        <ul className="p-2">
            {games.length > 0 ? games.map((game) => (
                <Link key={game.id} href={`/ladder/${game.id}`}><li className="text-3xl font-semibold">{game.name}</li></Link>
            )) : <h1 className="text-3xl uppercase font-semibold">No Games Found</h1>}
        </ul>
    )
}


export default GameList;
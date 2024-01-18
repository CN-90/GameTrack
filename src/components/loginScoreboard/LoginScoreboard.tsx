import Image from 'next/image';
import smashCover from '../../../public/smash_cover.jpg';
import GandalFaceSVG from '@/components/svg/gandalfFaceSVG';
import { createRef, useEffect, useState } from 'react';
import AnimateLadder from '../ladder/animateLadder/AnimateLadder';
import GollumFaceSVG from '../svg/gollumFaceSVG';
import FrodoFaceSVG from '../svg/frodoFaceSVG';





function LoginScoreboard() {
    const [gamesPlayed, setGamesPlayed] = useState(0);
    const [gandalf, setGandalf] = useState({name: "Gandalf", wins: 0});
    const [gollum, setGollum] = useState({name: "Gollum", wins: 0});
    const [frodo, setFrodo] = useState({name: "Frodo", wins: 0});


    useEffect(() => {
        // Generate number between 0 and 2 every 5 seconds which will be used to determine which player wins that match. Increment their wins by 1
        const timer = setInterval(() => {
            setGamesPlayed(prevCount => prevCount + 1);
            const randomNumber = Math.floor(Math.random() * 3)
            console.log(randomNumber)
            switch (randomNumber) {
                case 0:
                    console.log("GANDALF")
                    setGandalf(prev => ({name: "Gandalf", wins: prev.wins + 1}))
                    break;
                case 1:
                    console.log("GOLLUM")
                    setGollum(prev => ({name: "Gollum", wins: prev.wins + 1}))
                    break;
                case 2:
                    console.log("FRODO")
                    setFrodo(prev => ({name: "Frodo", wins: prev.wins + 1}))
                    break;
                default:
                    break;
            }

        }, 5000)

        return () => clearInterval(timer);
    }, []);



    const scoreboard = [gandalf, gollum, frodo];

    return (
        <div>
            <div className="flex gap-5 border-b-8 border-zinc-700 pb-5">
                <Image
                    className='smash-cover'
                    alt={"Game cover of Super Smash Brothers: Ultimate for Nintendo Switch"}
                    src={smashCover}
                    style={{ width: "140px", height: "154px" }}

                />
                <div id="login_table-head" className="flex-col">
                    <h1 className="text-42 font-bold pb-1 uppercase md:text-small">Super Smash: Ultimate (FFA)</h1>
                    <div>
                        <p className="uppercase text-2xl font-semibold">3 Players</p>
                        <p className="uppercase text-2xl font-semibold leading-4 m-0">{gamesPlayed} Matches Played</p>
                    </div>
                </div>
            </div>
            <ul className="flex flex-col gap-2 pt-2 top-5 relative">
                <AnimateLadder>
                    {scoreboard.sort((a, b) => b.wins - a.wins).map((player, index) => (
                        <li key={player.name} ref={createRef()} className="flex gap-5 p-2">
                            <div>
                                {player.name === "Gandalf" && <GandalFaceSVG />}
                                {player.name === "Gollum" && <GollumFaceSVG  />}
                                {player.name === "Frodo" && <FrodoFaceSVG />}
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold">{player.name}</h1>
                                <p className="text-2xl leading-4 text-zinc-400">{player.wins} Wins {gamesPlayed - player.wins} Losses</p>
                            </div>
                        </li>
                    ))}

                </AnimateLadder>
            </ul>


        </div>
    )

}

export default LoginScoreboard;
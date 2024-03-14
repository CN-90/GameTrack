import { createRef, useEffect, useState } from 'react';
import { useAutoAnimate } from "@formkit/auto-animate/react";
import smashCover from '../../../public/smash_cover.jpg';
import FrodoFaceSVG from '../svg/frodoFaceSVG';
import GandalFaceSVG from '@/components/svg/gandalfFaceSVG';
import GollumFaceSVG from '../svg/gollumFaceSVG';
import Image from 'next/image';


function LoginScoreboard() {
    const [gamesPlayed, setGamesPlayed] = useState(0);
    const [gandalf, setGandalf] = useState({name: "Gandalf", wins: 0});
    const [gollum, setGollum] = useState({name: "Gollum", wins: 0});
    const [frodo, setFrodo] = useState({name: "Frodo", wins: 0});
    const [animationParent] = useAutoAnimate();



    useEffect(() => {
        const timer = setInterval(() => {
            setGamesPlayed(prevCount => prevCount + 1);
            const randomNumber = Math.floor(Math.random() * 3)
            switch (randomNumber) {
                case 0:
                    setGandalf(prev => ({name: "Gandalf", wins: prev.wins + 1}))
                    break;
                case 1:
                    setGollum(prev => ({name: "Gollum", wins: prev.wins + 1}))
                    break;
                case 2:
                    setFrodo(prev => ({name: "Frodo", wins: prev.wins + 1}))
                    break;
                default:
                    break;
            }

        }, 5000)

        return () => clearInterval(timer);
    }, []);



    const scoreboard = [gandalf, gollum, frodo].sort((a, b) => b.wins - a.wins);

    return (
        <div className="xl:w-1/2 mx-auto">
            <div id="login_table-head" className="flex bg-23 p-6 rounded-lg">
                <Image
                    className='smash-cover'
                    alt={"Game cover of Super Smash Brothers: Ultimate for Nintendo Switch"}
                    src={smashCover}

                />
                <div  className="flex-col p-2 ">
                    <h1 className="text-white text-42 font-bold pt-4 pb-1 uppercase ">Super Smash: Ultimate (FFA)</h1>
                    <div>
                        <p className="text-zinc-400 uppercase text-md font-semibold">3 Players</p>
                        <p className="text-zinc-400 uppercase text-md font-semibold leading-4 m-0">{gamesPlayed} Matches Played</p>
                    </div>
                </div>
            </div>

            <ol ref={animationParent} id="login_table-body" className="flex bg-23 flex-col gap-2 p-5 top-5 rounded-4xl relative rounded-2xl ">
                    {scoreboard.map((player, index) => (
                        <li key={player.name} ref={createRef()} className="flex gap-5 rounded-lg p-2 bg-18 min-h-80">
                            <div>
                                {player.name === "Gandalf" && <GandalFaceSVG />}
                                {player.name === "Gollum" && <GollumFaceSVG  />}
                                {player.name === "Frodo" && <FrodoFaceSVG />}
                            </div>
                            <div>
                                <h1 className="text-2xl text-white whitefont-bold">{player.name}</h1>
                                <p className="leading-4 text-white text-zinc-400">{player.wins} Wins {gamesPlayed - player.wins} Losses</p>
                            </div>
                        </li>
                    ))}
            </ol>


        </div>
    )

}

export default LoginScoreboard;
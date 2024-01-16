import Image from 'next/image';
import smashCover from '../../../public/smash_cover.jpg';
import GandalFaceSVG from '@/components/svg/gandalfFaceSVG';
import { useEffect, useState } from 'react';



function LoginScoreboard() {
    const [gamesPlayed, setGamesPlayed] = useState(0);

    useEffect(() => {
        // const timer = setInterval(() => {
        //     setGamesPlayed(prevCount => prevCount + 1);
        // }, 4000)

        // return () => clearInterval(timer); 
    }, []);



    return (
        <div id="table">
            <div className="flex gap-5 border-b-8 border-zinc-700 pb-5">
                <Image
                    className='smash-cover'
                    alt={"Game cover of Super Smash Brothers: Ultimate for Nintendo Switch"}
                    src={smashCover}
                    style={{ width: "140px", height: "154px" }}

                />
                <div className="flex-column">
                    <h1 className="text-42 font-bold pb-1 uppercase md:text-small">Super Smash: Ultimate (FFA)</h1>
                    <div>
                        <p className="uppercase text-2xl font-semibold">3 Players</p>
                        <p className="uppercase text-2xl font-semibold leading-4 m-0">{gamesPlayed} Matches Played</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2 pt-2">

                <div className='flex gap-5 p-2'>
                    <div>
                        <GandalFaceSVG />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold">Gandalf</h1>
                        <p className="text-2xl leading-4 text-zinc-400">0 Wins 0 Losses</p>
                    </div>
                </div>

                <div className='flex gap-5 p-2'>
                    <div>
                        <GandalFaceSVG />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold">Frodo</h1>
                        <p className="text-2xl leading-4 text-zinc-400">0 Wins 0 Losses</p>
                    </div>
                </div>
                <div className='flex gap-5 p-2'>
                    <div>
                        <GandalFaceSVG />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold">Gollum</h1>
                        <p className="text-2xl leading-4 text-zinc-400">0 Wins 0 Losses</p>
                    </div>
                </div>

            </div>


        </div>
    )

}

export default LoginScoreboard;
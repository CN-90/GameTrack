import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

function AddMatchModal({ user, ladder }) {

    const [winner, setWinner] = useState({ recordId: "", name: "", playerId: "" });
    const [loser, setLoser] = useState({ recordId: "", name: "", playerId : "" });
    const [error, setError]= useState("");
    const router = useRouter();


    const createMatch = async (e) => {
        e.preventDefault();
        if(!winner.recordId || !loser.recordId) {
            return;
        }

        if(winner.recordId === loser.recordId) {
            return;
        }

        try {
            let createdMatch = await axios.post(`/api/match`, { winner, loser, ladderId: ladder.id});
            router.replace(`/ladder/${ladder.id}`, undefined, { scroll: false });

        }   catch (error) {
            console.log(error);
        }
    }

    const winClickHandler = (record) => {
        setWinner({ recordId: record.id, name: record.playerName, playerId: record.playerId});
    }

    const loseClickHandler = (record) => {
        setLoser({ recordId: record.id, name: record.playerName, playerId: record.playerId});
    }

    const closeModal = (e) => {
        e.preventDefault();
        router.push(`/ladder/${ladder.id}`);
    }


    return (
        <aside className="absolute w-full bg-23 rounded-xl p-5 z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:w-1/2  2xl:top-1/2">
            <h1 className="text-2xl text-center font-bold text-white uppercase lg:text-4xl pb-10">Add New Match</h1>
            <div className="flex">
                <form className="w-full">
                    <fieldset className="flex flex-col gap-2 pb-8">
                        <div className="w-full pb-4">
                            <h1 className="text-2xl font-bold text-white uppercase lg:text-4xl">Winner</h1>
                            <ul className="py-4">
                                {ladder.records.map(record => <li onClick={() => winClickHandler(record)} className={`${winner.recordId === record.id ? "bg-blue-500 " : "bg-29 "}hover:bg-blue-500 cursor-pointer w-full h-16 text-white font-semibold text-2xl text-white text-lg flex pl-2 rounded-lg mb-1 relative bg-black items-center`} key={record.id}>{record.playerName}</li>)}
                            </ul>

                        </div>

                        <div className="w-full">
                            <h1 className="text-2xl font-bold text-white uppercase lg:text-4xl">Loser</h1>
                            <ul className="py-4">
                                {ladder.records.map(record => <li onClick={() => loseClickHandler(record)}  className={`${loser.recordId === record.id ? "bg-red-500 " : "bg-29 "}cursor-pointer hover:bg-red-500 w-full h-16 text-white font-semibold text-2xl text-white text-lg flex pl-2 rounded-lg mb-1 relative bg-black items-center`} key={record.id}>{record.playerName}</li>)}
                            </ul>
                        </div>
                    </fieldset>
                    <div className="flex pt-8 gap-4">
                        <button type='submit' onClick={(e) => createMatch(e)} className="bg-green-500 hover:bg-green-700 rounded-md w-1/2 font-bold uppercase  p-2">Create Match</button>
                        <button  onClick={(e) => closeModal(e)}className="bg-red-500 text-white font-bold uppercase rounded-md w-1/2 hover:bg-red-700 p-2">Cancel</button>
                    </div>
                    
                </form>

            </div>

        </aside>
    )
}

export default AddMatchModal;
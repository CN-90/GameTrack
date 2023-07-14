import { createPlayer } from "@/actions/players";
import axios from "axios";
import { useRouter } from "next/router";
import { useRef } from "react";

function TablePage(){
    const router = useRouter();
    const { ladderId } = router.query;
    const newPlayerName = useRef("");


    

    const deleteTable = async () => {
       let deletedTable =  await axios.delete(`/api/ladder/${ladderId}`, {ladderId});
       console.log("This table has been deleted homeboy...");
    }
    return (
        <div>
            <h1>LADDER WITH ALL THE PLAYERS GOES HERE.</h1>
            <label htmlFor="">New Player</label><br/>
            <input ref={newPlayerName} type="text" /><br/>
            <button onClick={() => createPlayer(newPlayerName.current.value, ladderId)}>Create Player</button><br/>
            <button onClick={deleteTable} className="">Delete Table</button>
        </div>
    )
}

export default TablePage;
import axios from "axios";


export async function deleteGroup(id) {
    try {
        let res = await axios.delete(`/api/group/${id}`);
        return res.data;

    } catch (error) {
        console.log(error);

    }
}

export async function getGroup(id) {
    try {
        let res = await axios.get(`http://localhost:3000/api/group/${id}`);
        console.log(res.data);
        return res.data;

    } catch (error) {
        console.log(error);

    }
}
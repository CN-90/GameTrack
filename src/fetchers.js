import axios from 'axios';


export async function registerUser(user) {
    try {
        let res = await axios.post('/api/user', { ...user });
        return res.data;

    } catch (error) {
        console.log(error);

    }

}
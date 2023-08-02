export async function getLadder(ladderId: number) {
    try {
        let data = await axios.get(`/api/ladder/${ladderId}`);
        console.log(data);

    } catch {

    }

}
import axios from 'axios';


export async function registerUser(user) {
    try {
        let res = await axios.post('/api/user', { ...user });
        return res.data;

    } catch (error) {
        console.log(error);

    }

}



  //   axios({
  //   url: "https://api.igdb.com/v4/age_ratings",
  //   method: 'POST',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Client-ID': 'z73ubf3x11blbxrhvzoja6e7sacw3z',
  //     'Authorization': `Bearer jqlydefd6q400w97onfzexm6d5k2um`
  //   },
  //   data: "fields category,checksum,content_descriptions,rating,rating_cover_url,synopsis;"
  // })
  //   .then(response => {
  //       console.log(response.data);
  //   })
  //   .catch(err => {
  //       console.error(err);
  //   });
import axios from 'axios'

const FAVMOVIE_BASE_REST_API_URL='http://localhost:8080/api/v1/ratings';

class UserFavService{
    
    getAllMovies(){
        return axios.get(FAVMOVIE_BASE_REST_API_URL+'/')
    }
    addmovierating(ratings){
        return axios.post(FAVMOVIE_BASE_REST_API_URL+'/newrating',ratings)
    }
    removeMoviefromFav(id){
        return axios.delete(FAVMOVIE_BASE_REST_API_URL+'/removeMoviefromfav/'+id) //delete method
    }

}
export default new UserFavService();
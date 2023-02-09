import axios from 'axios'

const FAVMOVIE_BASE_REST_API_URL='http://localhost:8080/api/v1/favmovies';

class UserFavService{
    
    getAllMovies(){
        return axios.get(FAVMOVIE_BASE_REST_API_URL+'/')
    }
    getMoviesByUserID(id){
        return axios.get(FAVMOVIE_BASE_REST_API_URL+'/'+id)
    }
    addmovietofav(favmovie){
        return axios.post(FAVMOVIE_BASE_REST_API_URL+'/addmovietofav',favmovie)
    }
    removeMoviefromFav(id){
        return axios.delete(FAVMOVIE_BASE_REST_API_URL+'/removeMoviefromfav/'+id) //delete method
    }
}
export default new UserFavService();
import axios from 'axios'

const MOVIE_BASE_REST_API_URL='http://localhost:8080/api/v1/movies';

const LINKS_BASE_REST_API_URL='http://localhost:8080/api/v1/links';

class MovieService{
    
    getAllMovies(){
        return axios.get(MOVIE_BASE_REST_API_URL+'/')
    }
    createMovie(movie){
        return axios.post(MOVIE_BASE_REST_API_URL+'/newmovie',movie)
    }
    getMoviebyID(id){
        return axios.get(MOVIE_BASE_REST_API_URL+'/'+id) //get method
    }
    updateMovie(id,movie){
        return axios.put(MOVIE_BASE_REST_API_URL+'/'+id,movie) //put method
    }
    deleteMovie(id){
        return axios.delete(MOVIE_BASE_REST_API_URL+'/'+id) //delete method
    }
    rateMovie(id,user,movie){
        return axios.put(MOVIE_BASE_REST_API_URL+'/'+id,user,movie) //rate method
    }
    getsimilarmovies(id){
        return axios.get(MOVIE_BASE_REST_API_URL+'/getsimilar/'+id)
    }
    getlinksfrommovie(id){
        return axios.post(LINKS_BASE_REST_API_URL+'/'+id)
    }

}

export default new MovieService();
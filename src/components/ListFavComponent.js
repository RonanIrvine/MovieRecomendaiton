import React, {useState,useEffect} from 'react'
import MovieService from '../services/MovieService'
import UserFavService from '../services/UserFavService'
import Pagination from './Pagination'
import { Link } from 'react-router-dom'

const FavListComponent = () => {
      const [movie, setMovie] = useState([]);
      const [currentPage, setCurrentPage] = useState (1);
      const [postsPerPage, setPostsPerPage] = useState (5);
      const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
   
            useEffect(() => {
                getmovies();
            }, [])
            const handleDelete = (movieid) => {
                if (window.confirm("Are you sure you want to remove this from favourites?")) {
                    {deletemovie(movieid)}
                }else{
                }
              };
            const getmovies=()=> {
                UserFavService.getAllMovies().then((response)=> { //call API to get all movies
                    setMovie(response.data)
                    console.log(response.data);
                }).catch(error=>{
                    console.log(error);
                })
            }
            const getmovieslist=()=> {
                MovieService.getAllMovies().then((response)=> {
                    setMovie(response.data)
                    console.log(response.data);
                }).catch(error=>{
                    console.log(error);
                })
            }
            const deletemovie=(favid)=> { //call api to delete movie
                UserFavService.removeMoviefromFav(favid).then((response)=> {
                    alert(response.data)     
                    getmovies();          //use get movies function
                }).catch(error=>{
                    console.log(error);
                })
            }
         const lastPostIndex = currentPage*postsPerPage;
        const firstPostIndex = lastPostIndex - postsPerPage;
        const curentPosts=movie.slice(firstPostIndex,lastPostIndex)
      return(
      <div className = "container">
           <h2 className = "text-center"> Favourites </h2>          
           <Link to = "/users"  style={{marginLeft:"10px"}} className="btn btn-primary mb-2"> View Users </Link>
           <Link to = "/movies"  style={{marginLeft:"10px"}} className="btn btn-primary mb-2"> View Movies </Link>
           <table className="table table-bordered table-striped">
               <thead>
                    <th> Fav Id </th>
                    <th> Movie Id </th>
                    <th>Posters</th>
                       <th> Title </th> 
                       <th> Genres </th> 
                       <th> Function </th>
                  </thead>
                  <tbody>
                    {
                        curentPosts.map(movie =>
                            <tr key = {movie.favid}> 
                            <td> {movie.favid} </td> 
                            <td> {movie.movieid} </td> 
                            <td> <img  style={{radius:"60px",flex: "1",  display:"block", margin: '0 auto', width:"75px"}}
                                    src={IMG_PATH + '/4UxSmrXCj6RQgzbtMIVfaT92eLq.jpg'}  /></td> 
                        <td> {movie.title} </td> 
                            <td> {movie.genres} </td>    
                            <td>
                                <Link className='btn btn-primary' style={{marginLeft:"10px"}} to={`/view-movie/${movie.movieid}`}>View</Link>
                                <button className='btn btn-danger' onClick={()=>handleDelete(movie.favid)} 
                                style={{marginLeft:"10px"}}>Remove</button>                                
                            </td>   
                            </tr>
                        )
                    }
                  </tbody>
           </table>
           <Pagination 
                    totalPosts={movie.length}
                    postsPerpage={postsPerPage}
                    setCurrentPage={setCurrentPage}>
                    </Pagination>
       </div>
               )
}
export default FavListComponent
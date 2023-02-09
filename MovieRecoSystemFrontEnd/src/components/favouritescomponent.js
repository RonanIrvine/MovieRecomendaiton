import React, {useState,useEffect} from 'react'
import MovieService from '../services/MovieService'
import Pagination from './Pagination'
import { Link } from 'react-router-dom'

const FavMovieComponent = () => {
      const [movie, setMovie] = useState([]);
      const [currentPage, setCurrentPage] = useState (1);
      const [postsPerPage, setPostsPerPage] = useState (10)
      const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
   
            useEffect(() => {
                getmovies();
            }, [])
            const getmovies=()=> {
                MovieService.getAllMovies().then((response)=> {
                    setMovie(response.data)
                    console.log(response.data);
                }).catch(error=>{
                    console.log(error);
                })
            }
            const deletemovie=(movieid)=> {
                MovieService.deleteMovie(movieid).then((response)=> {     
                    getmovies();          
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
           <Link to = "/add-Movie" className="btn btn-primary mb-2"> Add New Movie </Link>
           <Link to = "/users"  style={{marginLeft:"10px"}} className="btn btn-primary mb-2"> View Users </Link>
           <table className="table table-bordered table-striped">
               <thead>
                    <th> Movie Id </th>
                    <th>Posters</th>
                       <th> Title </th> 
                       <th> Genres </th> 
                       <th>Ratings</th> 
                       <th> Function </th>
                  </thead>
                  <tbody>
                    {
                        curentPosts.map(movie =>
                            <tr key = {movie.movieid}> 
                            <td> {movie.movieid} </td> 
                            <td> <img  style={{radius:"60px",flex: "1",  display:"block", margin: '0 auto', width:"75px"}}
                                    src={IMG_PATH + '/4UxSmrXCj6RQgzbtMIVfaT92eLq.jpg'}  /></td> 
                        <td> {movie.title} </td> 
                            <td> {movie.genres} </td>    
                            <td>
                                <Link className='btn btn-info' to={`/edit-movie/${movie.movieid}`}>Update</Link>
                                <Link className='btn btn-primary' style={{marginLeft:"10px"}} to={`/view-movie/${movie.movieid}`}>View</Link>
                                <button className='btn btn-danger' onClick={()=>deletemovie(movie.movieid)} 
                                style={{marginLeft:"10px"}}>Delete</button>
                                
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
export default FavMovieComponent
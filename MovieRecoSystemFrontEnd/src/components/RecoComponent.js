import React, {useState,useEffect} from 'react'
import MovieService from '../services/MovieService'
import Pagination from './Pagination'
import { Link,useParams } from 'react-router-dom'

const RecoComponent = () => {
      const [movie, setMovie] = useState([]);
      const [currentPage, setCurrentPage] = useState (1); 
      const [postsPerPage, setPostsPerPage] = useState (10) //Display only 10 movies perpage
      const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
      const {id}=useParams();
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
         
         const lastPostIndex = currentPage*postsPerPage;
        const firstPostIndex = lastPostIndex - postsPerPage;
        const currentPosts=movie.slice(firstPostIndex,lastPostIndex) //slice movies to 10 only
      return(
      <div className = "container">
           <h2 className = "text-center"> Reccomendations  </h2> 
           <table className="table table-bordered table-striped">
               <thead>
                    <th> Movie Id </th>
                    <th>Posters</th>
                       <th> Title </th> 
                       <th> Genres </th>       
                       <th> Function </th>
                  </thead>
                  <tbody>
                    {
                        currentPosts.map(movie =>
                            <tr key = {movie.movieid}> 
                            <td> {movie.movieid} </td> 
                            <td> <img  style={{radius:"60px",flex: "1",  display:"block", margin: '0 auto', width:"75px"}}
                                    src={IMG_PATH + '/4UxSmrXCj6RQgzbtMIVfaT92eLq.jpg'}  /></td> 
                        <td> {movie.title} </td> 
                            <td> {movie.genres} </td>    
                            <td>
                                <Link className='btn btn-primary' style={{marginLeft:"10px"}} to={`/view-movie/${movie.movieid}`}>View</Link>
                            </td>       
                            </tr>
                        )
                    }
                  </tbody>
           </table> 
           <Pagination  //Pagination 
                    totalPosts={movie.length}
                    postsPerpage={postsPerPage}
                    setCurrentPage={setCurrentPage}>
                    </Pagination>
       </div>
               )
}
export default RecoComponent
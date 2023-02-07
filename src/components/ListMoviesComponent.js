import React, {useState,useEffect} from 'react'
import MovieService from '../services/MovieService'
import Pagination from './Pagination'
import axios from "axios";
import { Link } from 'react-router-dom'
// import {useMoviePoster} from './components/useMoviePoster.js';
import MoviePoster from '../components/MoviePoster';
const ListMovieComponent = () => {
      const [movie, setMovie] = useState([]);
      const [currentPage, setCurrentPage] = useState (1);
      const [postsPerPage, setPostsPerPage] = useState (10)
      const [posterPath, setPosterPath] = useState("");
      const [tmdbid, settmdbid] = useState("");
            useEffect(() => {
                getmovies();
            }, [])
            const handleDelete = (movieid) => { //get alerts to confirm deletion of movie
                if (window.confirm("Are you sure you want to delete this movie?")) {
                    {deletemovie(movieid)}
                }else{
                }
              };
              const deletemovie=(movieid)=> { //calls API to delete movie
                MovieService.deleteMovie(movieid).then((response)=> {     
                    getmovies();          
                }).catch(error=>{
                    console.log(error);
                })
            }
            const getmovies=()=> { //calls API to get movies
                MovieService.getAllMovies().then((response)=> {
                    setMovie(response.data)
                    console.log(response.data);
                }).catch(error=>{
                    console.log(error);
                })
            }
            const getLink=(movieid)=> {
                MovieService.getlinksfrommovie(movieid).then((response)=> {
                    console.log(response.data.tmdbid);
                    settmdbid(response.data.tmdbid);
                }).catch(error=>{
                    console.log(error);
                })

          };
         const lastPostIndex = currentPage*postsPerPage;
        const firstPostIndex = lastPostIndex - postsPerPage;
        const curentPosts=movie.slice(firstPostIndex,lastPostIndex)
      return(
      <div className = "container">
           <h2 className = "text-center"> List Movies </h2> 
           <Link to = "/add-Movie" className="btn btn-primary mb-2"> Add New Movie </Link>
           <Link to = "/users"  style={{marginLeft:"10px"}} className="btn btn-primary mb-2"> View Users </Link>
           <Link to = "/favmovies"  style={{marginLeft:"10px"}} className="btn btn-primary mb-2"> Favourites </Link>

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
                        curentPosts.map(movie => //populate movies
                            <tr key = {movie.movieid}> 
                            <td> {movie.movieid} </td> 
                            <td><MoviePoster movieid={movie.movieid} /></td>                  
                                  
                        <td> {movie.title} </td> 
                            <td> {movie.genres} </td>   
                            <td>
                                <Link className='btn btn-primary' style={{marginLeft:"10px"}} to={`/view-movie/${movie.movieid}`}>View</Link>
                                <button className='btn btn-danger' onClick={()=>handleDelete(movie.movieid)} 
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
export default ListMovieComponent
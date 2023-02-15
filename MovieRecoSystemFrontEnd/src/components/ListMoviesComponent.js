import React, {useState,useEffect} from 'react'
import MovieService from '../services/MovieService'
import Pagination from './Pagination'
import axios from "axios";
import { Link } from 'react-router-dom'
import MoviePoster from '../components/MoviePoster';
import { Table } from 'react-bootstrap';
import BounceLoader from 'react-spinners/BounceLoader';
const ListMovieComponent = () => {
      const [movie, setMovie] = useState([]);
      var usertype=localStorage.getItem('usertype')   //get variables from local storage
      var userid=localStorage.getItem('userid') 
      var username=localStorage.getItem('username') 
      userid = JSON.parse(userid);  
      var isAdmin=false;   
      if (usertype === 'Admin') {     
        isAdmin=true
      }
      const [currentPage, setCurrentPage] = useState (1);//setting current page number      
      const [postsPerPage, setPostsPerPage] = useState (10);//setting maximum number of item in page
      const [loading, setLoading] = useState(false);
            useEffect(() => { //enable side process to be done 
                console.log(usertype+" ID:"+userid)
                setLoading(true);//to initiate loading screen
                const timer = setTimeout(() =>{
                getmovies();//Calling functions to get movies
                setLoading(false);//to disable loading screen after time period
            }, 5);   return () => clearTimeout(timer);
        }, []);
            const handleDelete = (movieid) => { //function to call alert confirmation 
                if (window.confirm("Are you sure you want to delete this movie?")) {
                    {deletemovie(movieid)} //call function to delete user based on ID passed
                }else{
                }
              };
              const deletemovie=(movieid)=> { 
                MovieService.deleteMovie(movieid).then((response)=> {     //calls API to delete movie based on ID 
                    getmovies();    //after deleting it will request back the movies      
                }).catch(error=>{
                    console.log(error);
                })
            }
            const getmovies=()=> { //calls API to get movies
                MovieService.getAllMovies().then((response)=> {
                    setMovie(response.data)//set movie objects based on received data
                    console.log(response.data);
                }).catch(error=>{
                    console.log(error);
                })
            }        
            const lastPostIndex = currentPage*postsPerPage;//getting last page index by calculating number of items per pages n current pages
            const firstPostIndex = lastPostIndex - postsPerPage;// used to determine the starting index of the movie data to display on a specific page
            const currentPosts=movie.slice(firstPostIndex,lastPostIndex)//Make object list by limiting number of objects
          return(
      <div className = "container">      
           <h2 className = "text-center"> List Movies </h2>
           {isAdmin ? (<Link to = "/add-Movie" className="btn btn-primary mb-2"> Add New Movie </Link>) : null}
           {/* Button leading user to go the add movie page */}
          
         
           
           <Link to={`/favmovie`}  style={{marginLeft:"10px"}} className="btn btn-primary mb-2"> Favourites </Link>
           {/* Button leading user to go the view favourite movies page */}
           <Link to = "/orimovies"  style={{marginLeft:"10px"}} className="btn btn-primary mb-2"> OriDB Movies </Link> 
           {isAdmin ? (<Link to = "/users"  style={{marginLeft:"10px"}} className="btn btn-primary mb-2"> View Users </Link>) 
           : null}  {/* Button leading user to go the view users page */}
          
           {loading?( //if loading state is true, display loading screen
           <div style={{display: 'flex', justifyContent: 'center'}}>
           <BounceLoader size={30} color={'#5636d6'} loading={loading} />
         </div>
            ) : ( //if loading state is false, displays the bottom code
           <>
             <Table  striped bordered hover variant="dark">
               <thead className="table table-bordered table-striped">
                 {/* tabled headers */}
                    <th> Movie Id </th>                   
                    <th>Posters</th>
                       <th> Title </th> 
                       <th> Genres </th>       
                       <th> Function </th>
                  </thead>
                  <tbody>
                    {   
                    currentPosts.map(movie => (
                        <tr key={movie.movieid}> 
                          <td> {movie.movieid} </td>
                          <td><MoviePoster movieid={movie.movieid} /></td>
                          <td> {movie.title} </td> 
                          <td> {movie.genres} </td>   
                          <td>
                            <Link className='btn btn-primary' style={{marginLeft:"10px"}} to={`/view-movie/${movie.movieid}`}>View</Link>
                            {isAdmin ? (
                              <>
                                <Link className='btn btn-primary' style={{marginLeft:"10px"}} to={`/edit-movie/${movie.movieid}`}>Update</Link> 
                                <button className='btn btn-danger' onClick={() => handleDelete(movie.movieid)} style={{marginLeft:"10px"}}>Delete</button>
                              </>
                            ) : null}
                          </td>            
                        </tr>
                      ))
                      
                    }
                  </tbody>
           </Table>
           <Pagination  //Creating pagination
                    totalPosts={movie.length}
                    postsPerpage={postsPerPage}
                    setCurrentPage={setCurrentPage}
                           />
      </>
    )}
  </div>
);}
export default ListMovieComponent;
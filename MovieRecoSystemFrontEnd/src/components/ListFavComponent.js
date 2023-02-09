import React, {useState,useEffect} from 'react'
import MovieService from '../services/MovieService'
import UserFavService from '../services/UserFavService'
import Pagination from './Pagination'
import { Link } from 'react-router-dom'
import BounceLoader from 'react-spinners/BounceLoader';

const FavListComponent = () => {
      const [movie, setMovie] = useState([]);
      const [currentPage, setCurrentPage] = useState (1);//setting current page number      
      const [postsPerPage, setPostsPerPage] = useState (5);//setting maximum number of item in page
      const [loading, setLoading] = useState(false);
      const [userid, setuserid] = useState(2)
      const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
   
      useEffect(() => {//enable side process to be done 
        setLoading(true);//to initiate loading screen
        const timer = setTimeout(() =>{
        getmovies(userid);//Calling functions to get movies
        setLoading(false);//to disable loading screen after time period
        }, 8000);   return () => clearTimeout(timer);
        }, []);
    const getmovies=(userid)=> {
        UserFavService.getMoviesByUserID(userid).then((response)=> { //call API to get all movies form favourites list
            setMovie(response.data)//set movie to retrieved movies
            console.log(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }
            const handleDelete = (movieid) => {//function to call alert confirmation 
                if (window.confirm("Are you sure you want to remove this from favourites?")) {
                    {deletemovie(movieid)}//call function to remove movie based on ID passed
                }else{
                }
              };
              const deletemovie=(favid)=> { //call api to delete movie
                UserFavService.removeMoviefromFav(favid).then((response)=> {
                    alert(response.data)     
                    getmovies();          //use get movies function
                }).catch(error=>{
                    console.log(error);
                })
            }
      
           
           const lastPostIndex = currentPage*postsPerPage;//getting last page index by calculating number of items per pages n current pages
            const firstPostIndex = lastPostIndex - postsPerPage;// used to determine the starting index of the movie data to display on a specific page
            const curentPosts=movie.slice(firstPostIndex,lastPostIndex)//Make object list by limiting number of objects
          return(
      <div className = "container">
           <h2 className = "text-center"> Favourites </h2>          
           <Link to = "/users"  style={{marginLeft:"10px"}} className="btn btn-primary mb-2"> View Users </Link>
           <Link to = "/movies"  style={{marginLeft:"10px"}} className="btn btn-primary mb-2"> View Movies </Link>
           {loading?( //if loading state is true, display loading screen
           <div style={{display: 'flex', justifyContent: 'center'}}>
           <BounceLoader size={30} color={'#5636d6'} loading={loading} />
         </div>
            ) : ( //if loading state is false, displays the bottom code
           <>
          
        
          
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
                        curentPosts.map(movie => //populate movies from each movie
                        // extract main key of movie object 
                            <tr key = {movie.favid}> 
                            <td> {movie.favid} </td> 
                            <td> {movie.movieid} </td> 
                            <td> <img  style={{radius:"60px",flex: "1",  display:"block", margin: '0 auto', width:"75px"}}
                                    src={IMG_PATH + '/4UxSmrXCj6RQgzbtMIVfaT92eLq.jpg'}  /></td> 
                         {/* Get Poster from movieID */}
                        <td> {movie.title} </td> 
                            <td> {movie.genres} </td>    
                            <td>
                                <Link className='btn btn-primary' style={{marginLeft:"10px"}} to={`/view-movie/${movie.movieid}`}>View</Link>
                                <button className='btn btn-danger' onClick={()=>handleDelete(movie.favid)} 
                                style={{marginLeft:"10px"}}>Remove</button>     
                                {/* button to call remove function */}                           
                            </td>   
                            </tr>
                        )
                    }
                  </tbody>
           </table>
           <Pagination //Creating pagination
                    totalPosts={movie.length}
                    postsPerpage={postsPerPage}
                    setCurrentPage={setCurrentPage}>
                    </Pagination>
                    </>
    )}
  </div>
);}
export default FavListComponent
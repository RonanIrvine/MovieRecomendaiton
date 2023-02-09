import React,{useState,useEffect} from 'react'
import MovieService from '../services/MovieService'
import UserFavService from '../services/UserFavService'
import Pagination from './Pagination'
import {Link, useNavigate,useParams }from 'react-router-dom'
import MoviePoster from '../components/MoviePoster';
import MovieOverview from './MovieOverview'
import RatingsSerive from '../services/RatingsSerive'
import { BounceLoader } from 'react-spinners'
const ViewMovieComponet=()=>{
    
    const min=1;
    const max=5;
    const [title, setTitle] = useState('')
    const [favtitle, setfavTitle] = useState('')
    const [movieid, setmovieid] = useState('')
    const [file, setfile] = useState('')
    const [loading, setLoading] = useState(false);
    const [genres, setGenres] = useState('')
    const [favgenres, setfavGenres] = useState('')   
    const [userid, setuserid] = useState(2)
    const [rating, setrating] = useState()
    const navigate=useNavigate();
    const {id}=useParams();
    console.log(id);
    //list component
    const [movie, setMovie] = useState([]);
    const [currentPage, setCurrentPage] = useState (1);//setting current page number      
      const [postsPerPage, setPostsPerPage] = useState (5);//setting maximum number of item in page
     useEffect(() => {//enable side process to be done 
            MovieService.getMoviebyID(id)//call function to pass id to API n retrieve the movie information
            .then((response)=>{
                setmovieid(id)       //set movie information accordingly based on ID passed
                setTitle(response.data.title)
                setfavTitle(response.data.title)
                setGenres(response.data.genres)
                setfavGenres(response.data.genres)                
                getmovies();
          }).catch(error=>{
           console.log(error)
        });  setLoading(true);
        const timer = setTimeout(() =>{
        getmovies();//Calling functions to get movies
        setLoading(false);//to disable loading screen after time period
    }, 8000);   return () => clearTimeout(timer);
        }, []) 
    const handleChange = event => {
        const value = Math.max(min, Math.min(max, Number(event.target.value)));//ensure highest and lowers number entered will be set at 5 and 0 respectively
        setrating(value);//store rating value
        console.log(rating)
      };
      const getmovies=()=> {//calls API to get movies
        MovieService.getsimilarmovies(id).then((response)=> {
            setMovie(response.data)//set movie objects based on received data
            console.log(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }
    function refreshPage() {
        window.location.reload(false);
      }
    const AddMovietoFav=(e)=>{// function to add favouritemovie
    e.preventDefault();//prevent refreshes
     const favmovie={genres,movieid,userid,title} //initiate the movierobject variable with its parameters
     console.log(favmovie.genres);
    //  console.log(favmovie.userid);
    //  console.log(favmovie.title);
     UserFavService.addmovietofav(favmovie) .then((response) => {//call API to pass fav movie data
      if (response.status === 200) {//if success 
        console.log(response.data);
        navigate("/movies"); //navigate page
      } else {//else
        console.log(response);
        alert(response.data); // display the response message
      }
    }).catch(error=>{ //if movie already added
         console.log(error===400)
         alert("Movie already in favourites") //alerts user that the movie  is already in favourites
     })
    }
    const Ratemovie=(e)=>{
        e.preventDefault();//prevent refresh
         const movierating={userid,movieid,rating} //initiate the movierating variable with its parameters
         console.log(movierating.userid);
         RatingsSerive.addmovierating(movierating).then((response)=>{ //calling api to pass rating object
             console.log(response.data)
             navigate('/movies') //navigate page
         }).catch(error=>{
             console.log(error)//print error
         })
        }
    const checkTextInput = (e) => {//ensures that the rating entered will be passed
        Ratemovie(e)
      };
    const lastPostIndex = currentPage*postsPerPage;//getting last page index by calculating number of items per pages n current pages
    const firstPostIndex = lastPostIndex - postsPerPage;// used to determine the starting index of the movie data to display on a specific page
    const curentPosts=movie.slice(firstPostIndex,lastPostIndex)//Make object list by limiting number of objects
    return(
        <div>
            <br></br>
            <div className = "container">
                <div className= "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                    <h2 className = "text-center"> Movie Info </h2>
                        <div className= "card-body">
                            <form>
                            <div className = "form-group mb-2">
                            <MoviePoster movieid={id} />
                             {/* Get Poster from movieID */}
                                </div>
                                <div className = "form-group mb-2">
                                    {/* Display Movie Title */}
                                    <label className = "form-label">Movie Title: {title} </label>                            
                        </div>  {/* Display Movie Genres */}
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Genres: {genres} </label>                        
                                </div>   {/* Display Movie ID */}
                                <div className = "form-group mb-2">
                                    <MovieOverview movieid={id}/>
                                </div>   {/* Display Movie Rating Score */}
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Rating Score : {rating}</label>                
                                </div>
                                <div className = "form-group mb-2">
                                    <input type="number" placeholder="Rate this movie?(1-5)"  name = "rating"  className="form-control"
                                            value = {rating}
                                             onChange={handleChange}>                                           
                            </input>
                                </div>
                             <button className="btn btn-success"  onClick={(e)=>{
                                checkTextInput(e); 
                               ;}}>Rate Movie</button> 
                               {/* button used to validate the rating */}
                               <button to="/movies" style={{marginLeft:"10px"}} 
                               onClick={(id)=>{AddMovietoFav(id)}}                                 
                               className='btn btn-primary'>Add to Favourite</button>
                               {/* button used to validate the rating */}
                             <Link to="/movies" style={{marginLeft:"10px"}} className='btn btn-danger'>Back</Link>
                        </form>
                    </div>
              </div>
          </div>
     </div> 
     <br></br>
     <div className = "container">
           <h2 className = "text-center"> Recommendation </h2> 
           {loading?( //if loading state is true, display loading screen
           <div style={{display: 'flex', justifyContent: 'center'}}>
           <BounceLoader size={30} color={'#5636d6'} loading={loading} />
         </div>
            ) : ( //if loading state is false, displays the bottom code
           <>
          <table className="table table-bordered table-striped">
                 <thead>
                    <th>Posters</th>
                       <th> Title </th> 
                       <th> Genres </th>       
                       <th> Function </th>
                  </thead>
                  <tbody>
                    {
                        curentPosts.map(movie =>//populate movies from each movie
                        // extract main key of movie object 
                            <tr key = {movie.movieid}> 
                            <td> <MoviePoster movieid={movie.movieid} /></td> 
                          {/* Get Poster from movieID */}
                        <td> {movie.title} </td> 
                            <td> {movie.genres} </td>    
                            <td>
                            <Link className='btn btn-primary' style={{marginLeft:"10px"}} onClick={MovieService.getMoviebyID(movie.movieid)} to={`/view-movie/${movie.movieid}`}>View</Link>
                             {/* Button that takes to selected movie based on id */}
                            </td>               
                            </tr>
                        )
                    }
                  </tbody>
           </table>
           <Pagination  //Creating pagination
                    totalPosts={movie.length}
                    postsPerpage={postsPerPage}
                    setCurrentPage={setCurrentPage}>
                    </Pagination>
           </>
           )}
         </div>
</div>
    )}
export default ViewMovieComponet
import React,{useState,useEffect} from 'react'
import MovieService from '../services/MovieService'
import UserFavService from '../services/UserFavService'
import Pagination from './Pagination'
import {Link, useNavigate,useParams }from 'react-router-dom'
import MoviePoster from '../components/MoviePoster';
import MovieOverview from './MovieOverview'

const ViewMovieComponet=()=>{
    
    const min=1;
    const max=5;
    const [title, setTitle] = useState('')
    const [favtitle, setfavTitle] = useState('')
    const [movieid, setmovieid] = useState('')
    const [file, setfile] = useState('')
    const [genres, setGenres] = useState('')
    const [favgenres, setfavGenres] = useState('')
    const [movierating, setmovierating] = useState()
    const [userid, setuserid] = useState(2)
    const [rating, setrating] = useState()
    const navigate=useNavigate();
    const {id}=useParams();
    console.log(id);
    //list component
    const [movie, setMovie] = useState([]);
    const [currentPage, setCurrentPage] = useState (1);
    const [postsPerPage, setPostsPerPage] = useState (10)
    useEffect(() => {
        
            MovieService.getMoviebyID(id)
            .then((response)=>{
                setmovieid(id)       
            setTitle(response.data.title)
             setfavTitle(response.data.title)
             setGenres(response.data.genres)
                setfavGenres(response.data.genres)
                getmovies()
          }).catch(error=>{
           console.log(error)
        })
        }, []) 
    const handleChange = event => {
        const value = Math.max(min, Math.min(max, Number(event.target.value)));
        setrating(value);
        console.log(rating)
      };
      const getmovies=()=> {
        MovieService.getsimilarmovies(id).then((response)=> {
            setMovie(response.data)
            console.log(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }
    function refreshPage() {
        window.location.reload(false);
      }
    const AddMovietoFav=(e)=>{
      
    e.preventDefault();
     const favmovie={genres,movieid,userid,title}
     console.log(favmovie.genres);
     console.log(favmovie.userid);
     console.log(favmovie.title);
     UserFavService.addmovietofav(favmovie) .then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        navigate("/movies"); //navigate page
      } else {
        console.log(response);
        alert(response.data); // display the response message
      }
    }).catch(error=>{
         console.log(error===400)
         alert("Movie already in favourites")
     })
    }
    const Ratemovie=(e)=>{
        e.preventDefault();
         const movierating={userid,movieid,rating}
         console.log(movierating.userid);
         console.log(movierating.movieid);
         console.log(movierating.rating);
         UserFavService.addmovietofav(movierating).then((response)=>{
             console.log(response.data)
             navigate('/movies') //navigate page
         }).catch(error=>{
             console.log(error)
         })
        }
    const checkTextInput = (e) => {
        Ratemovie(e)
      };
    const lastPostIndex = currentPage*postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const curentPosts=movie.slice(firstPostIndex,lastPostIndex)
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
                                </div>
                                <div className = "form-group mb-2">
                                    <label className = "form-label">Movie Title: {title} </label>                            
                        </div>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Genres: {genres} </label>                        
                                </div>
                                <div className = "form-group mb-2">
                                    <MovieOverview movieid={id}/>
                                </div>
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
                               <button to="/movies" style={{marginLeft:"10px"}} 
                               onClick={(id)=>{AddMovietoFav(id)}}  
                               className='btn btn-primary'>Add to Favourite</button>
                             <Link to="/movies" style={{marginLeft:"10px"}} className='btn btn-danger'>Back</Link>
                        </form>
                    </div>
              </div>
          </div>
     </div> <br></br>
     <div className = "container">
           <h2 className = "text-center"> Recommendation </h2> 
          <table className="table table-bordered table-striped">
               <thead>
                    <th>Posters</th>
                       <th> Title </th> 
                       <th> Genres </th>       
                       <th> Function </th>
                  </thead>
                  <tbody>
                    {
                        curentPosts.map(movie =>
                            <tr key = {movie.movieid}> 
                            <td> <MoviePoster movieid={movie.movieid} /></td> 
                        <td> {movie.title} </td> 
                            <td> {movie.genres} </td>    
                            <td>
                            <Link className='btn btn-primary' style={{marginLeft:"10px"}}  to={`/view-movie/${movie.movieid}`}>View</Link>
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
</div>
    )
}
export default ViewMovieComponet
import React,{useState,useEffect} from 'react'
import MovieService from '../services/MovieService'
import {Link, useNavigate,useParams }from 'react-router-dom'
import Select from 'react-select'
const AddMovieComponet=()=>{
    const [title, setTitle] = useState('') //initiate variables
    const [tmdbid, settmdbid] = useState('')
    const [imdbid, setimdbid] = useState('')
    const [genres, setGenres] = useState('')
    const [selectedOption, setSelectedoption] = useState('')
    const navigate=useNavigate();
    const {id}=useParams();
    


      const checkTextInput = (e) => {
        //Check for the tmdbid TextInput
        if (!tmdbid.trim()) {
          alert('Please Enter Movie tmdb id');
          return;
        }
        //Check for the imdb TextInput
        if (!imdbid.trim()) {
          alert('Please Enter imdb id');
          return;
        }
        //Checked Successfully       
          saveOrUpdateMovie(e)
      };
    const saveOrUpdateMovie=(e)=>{
       e.preventDefault();
        const movie={title,genres}
        console.log(movie);

        if(id){ //if ID is present, go to update
        MovieService.updateMovie(id,movie).then((response)=>{
            console.log(response.data)
            navigate('/movies') //navigate page
        }).catch(error=>{
            console.log(error)
        }) 
    }else{ //ID missing, go to create
        MovieService.createMovie(movie).then((response)=>{
            console.log(response.data)
            navigate('/movies')
        }).catch(error=>{
            console.log(error)
        })        
    }
}
    useEffect(() => {
        MovieService.getMoviebyID(id).then((response)=>{
         console.log(response.data.title)
         setTitle(response.data.title)        
      }).catch(error=>{
       console.log(error)
    })
    }, [])  
    const pagetitle= () => {
        if(id){ //if ID is present, title is changed
            return <h2 className = "text-center"> Update Movie</h2>
        }else{
            return <h2 className = "text-center"> Add Movie</h2>
        }
    }
    return(
        <div>
            <br></br>
            <div className = "container">
                <div className= "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                    <h2 className = "text-center"> Movie Links</h2>
                        <div className= "card-body">
                            <form>
                                <div className = "form-group mb-2">
                                    <label className = "form-label">Movie Title  :</label>
                                    <input
                                            type="text"
                                            placeholder="Enter Title"
                                            name = "title"
                                            className="form-control"
                                            value = {title}
                                            disabled="disabled"                                            
                                            >
                            </input>
                        </div>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> TMDBID :</label>
                                    <input
                                            type="tmdbid"
                                            placeholder="Enter TMDB ID"
                                            name = "tmdbid"
                                            className="form-control"
                                            value = {tmdbid}
                                            onChange ={(e) => settmdbid(e.target.value)}>
                            </input>
                                </div>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> IMDBID :</label>
                                    <input
                                            type="imdbid"
                                            placeholder="Enter IMDB ID"
                                            name = "imdbid"
                                            className="form-control"
                                            value = {imdbid}
                                            onChange ={(e) => setimdbid(e.target.value)}>
                            </input>
                                </div>
                             <button className="btn btn-success"  onClick={(e)=>{
                                checkTextInput(e); 
                               ;}}>Save Movie</button>
                             <Link to="/movies" className='btn btn-danger'>Cancel</Link>
                        </form>
                    </div>
              </div>
          </div>
     </div>
</div>
    )
}
export default AddMovieComponet
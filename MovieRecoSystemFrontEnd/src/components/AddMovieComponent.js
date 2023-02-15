import React,{useState,useEffect} from 'react'
import MovieService from '../services/MovieService'
import {Link, useNavigate,useParams }from 'react-router-dom'
import Select from 'react-select'
const AddMovieComponet=()=>{
    const [title, setTitle] = useState('') //initiate variables
    const [genres, setGenres] = useState('')
    const [selectedOption, setSelectedoption] = useState('')
    const navigate=useNavigate();
    const {id}=useParams();
    let result = '';
    const options = [     //genre options
          { value: 'Action', label: 'Action' },
          { value: 'Adventure', label: 'Adventure' }, 
         { value: 'Animation', label: 'Animation' },
         { value: 'Children', label: 'Children' },
         { value: 'Comedy', label: 'Comedy' },
         { value: 'Crime', label: 'Crime' },        
        { value: 'Fantasy', label: 'Fantasy' },
        { value: 'Documentary', label: 'Documentary'},
         { value: 'Drama', label: 'Drama' },
      { value: 'Film-Noir', label: 'Film-Noir' },
        { value: 'Horror', label: 'Horror' },
        { value: 'IMAX', label: 'IMAX' },
        { value: 'Musical', label: 'Musical' },
        { value: 'Mystery', label: 'Mystery' },
          { value: 'Thriller', label: 'Thriller' },
        { value: 'Sci-Fi', label: 'Sci-Fi' },
        { value: 'War', label: 'War' }
      ]
      const handleChange=(selectedOption)=>{//concatinate selected genre
        setSelectedoption(Array.isArray(selectedOption)? selectedOption.map(x=>x.value):[])
        for (let i = 0; i < selectedOption.length; i++) {
            result = result.concat(selectedOption[i].value);
            if (i < selectedOption.length - 1) {
                result = result.concat("|"); 
            } 
        }  
        setGenres(result)
        console.log( genres);
      };
      const checkTextInput = (e) => {
        //Check for the Name TextInput
        if (!title.trim()) {
          alert('Please Enter Movie Title');
          return;
        }
        //Check for the Email TextInput
        if (!genres.trim()) {
          alert('Please Enter genres');
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
    useEffect(() => {//run asyncronously 
        MovieService.getMoviebyID(id).then((response)=>{ //If ID is present
         console.log(response.data.title)
         setTitle(response.data.title) //Title is set
        setGenres(response.data.genres)//Genres is set
      }).catch(error=>{
       console.log(error)
    })
    }, [])  
    const pagetitle= () => {
        if(id){ //if ID is present, title is changed to Update
            return <h2 className = "text-center"> Update Movie</h2>
        }else{ //if no ID present, title is change to Add
            return <h2 className = "text-center"> Add Movie</h2>
        }
    }
    return(
        <div>
            <br></br>
            <div className = "container">
                <div className= "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                    {pagetitle()}
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
                                            onChange ={(e) => setTitle(e.target.value)
                                            }
                                            >
                            </input>
                        </div>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Genres :</label>
                                    <Select
                                       className="select"
                                       placeholder={genres}
                                       isMulti
                                       name = "genres"
                                       options={options}
                                       onChange={handleChange}
                                       value={options.filter(obj=>selectedOption.includes(obj.value))}
                                       selectionType="text"
                                       isClearable={true}
                                       isSearchable={true}
                                       isDisabled={false}
                                       isLoading={false}
                                       isrtl={false}
                                        >
                                    </Select>
                                    {/* <div><b>Selected Genre: </b> {JSON.stringify(selectedOption, null, 2)}</div> */}
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

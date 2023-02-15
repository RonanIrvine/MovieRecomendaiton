import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieService from '../services/MovieService'

const useOverview = (movieid) => {
    const [overview, setoverview] = useState("");
    const [tmdbid, settmdbid] = useState("");
  
    useEffect(() => {
        MovieService.getlinksfrommovie(movieid).then((response) => {
          // console.log(response.data.tmdbid);
          settmdbid(response.data.tmdbid);//getting tmdbid link from API
        }).catch(error => {
          console.log(error);
        });
      }, []);
  
    useEffect(() => { //getting movie overview from API
      const fetchData = async () => { 
        const result = await axios(`https://api.themoviedb.org/3/movie/${tmdbid}?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US`);
        setoverview(result.data.overview);
      };
      fetchData();
    }, [tmdbid]);
    //display description in label 
    return  <label className = "form-label"> Description: {overview}</label>;              
  };

  const MovieOverview = ({movieid}) => {
    return useOverview(movieid);
  };


  export default MovieOverview;
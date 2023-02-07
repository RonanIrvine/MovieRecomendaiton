import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieService from '../services/MovieService'

const useMoviePoster = (movieid) => {
  const [posterPath, setPosterPath] = useState("");
  const [tmdbid, settmdbid] = useState("");

  useEffect(() => {
    MovieService.getlinksfrommovie(movieid).then((response) => {
      // console.log(response.data.tmdbid);
      settmdbid(response.data.tmdbid);//getting tmdbid link from API
    }).catch(error => {
      console.log(error);
    });
  }, []);

  useEffect(() => {//getting poster path from API
    const fetchData = async () => {
      const result = await axios(`https://api.themoviedb.org/3/movie/${tmdbid}?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US`);
      setPosterPath(result.data.poster_path); 
    };
    fetchData();
  }, [tmdbid]);
  //output image
  return <img  style={{radius:"60px",flex: "1",  display:"block", margin: '0 auto', width:"75px"}}src={`https://image.tmdb.org/t/p/w500/${posterPath}`} />;
};


const MoviePoster = ({movieid}) => {
  return useMoviePoster(movieid);
};


export default MoviePoster;
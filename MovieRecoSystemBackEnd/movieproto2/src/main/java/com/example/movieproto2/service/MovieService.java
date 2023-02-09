package com.example.movieproto2.service;

import com.example.movieproto2.model.Movies;
import com.example.movieproto2.Repository.MoviesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {
    @Autowired
    private MoviesRepository repo; //creating ratingsrepository object

    public List<Movies> getallmovies()
    {
        return repo.findAll(); //call function to get all data from DB
    }
    public List<Movies> getallorimovies()
    {
        return repo.findAllorimovies();
    }


    public Boolean savemovie(Movies movie)
    {
        return repo.saveMovie(movie);
    }


    public String updateMovie(int id,Movies movie)
    {  String response;
        if(repo.updateMovie(id,movie))
            response="Movie Updated";
        else
            response="Update Failed";
        return response;
    }
    public String deleteMovie(int id)
    {  String response;
        if(repo.deleteMovie(id))
            response="Movie Deleted";
        else
            response="Deletion Failed";
        return response;

    }
    public List<Movies> getsimilarmoviesbyId(int id)
    {
        return repo.getsimilarmovies(id);
    }


    public Movies getmoviebyId(int id)
    {
        return repo.findMoviebyid(id);
    }


}
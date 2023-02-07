package com.example.movieproto2.service;

import com.example.movieproto2.Repository.MoviesRepository;
import com.example.movieproto2.Repository.RatingsRepository;
import com.example.movieproto2.Repository.UserFavRepository;
import com.example.movieproto2.model.Movies;
import com.example.movieproto2.model.Ratings;
import com.example.movieproto2.model.UserFav;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingsService {

    @Autowired
    private RatingsRepository repo;

    public List<Ratings> getallmovies()
    {
        return repo.findAll();
    }
    public Boolean saverating(Ratings Ratings)
    {
        return repo.insertrating(Ratings);
    }
    public Boolean checkrating(Ratings Ratings)
    {
        return repo.insertrating(Ratings);
    }

    public String removeMovie(int id)
    {  String response;
        if(repo.removeRating(id))
            response="Movie Removed";
        else
            response="Removal Failed";
        return response;
    }

}

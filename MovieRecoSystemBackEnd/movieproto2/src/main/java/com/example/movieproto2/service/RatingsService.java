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
    private RatingsRepository repo; //creating ratingsrepository object

    public List<Ratings> getallmovies()
    {
        return repo.findAll();
    }

    public Boolean saverating(Ratings Ratings) //receive rating object
    {
        return repo.insertrating(Ratings);//pass rating object
    }

    public Ratings getAverating(int id){
        List<Ratings>movies=repo.getallRatingformovie(id);
        double total=0.0;
        int count=0;
        for(int j = 0; j < movies.size(); j++) {
            total+=movies.get(j).getRating();
            count++;
        }
            double average=total/count;
        int result = (int) Math.round(average);
            Ratings rating=new Ratings();
            rating.setMovieid(id);
            rating.setRating(result);
            return rating;
//        return repo.getallRatingformovie(id)
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

package com.example.movieproto2.service;

import com.example.movieproto2.Repository.MoviesRepository;
import com.example.movieproto2.Repository.UserFavRepository;
import com.example.movieproto2.model.Movies;
import com.example.movieproto2.model.User;
import com.example.movieproto2.model.UserFav;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserfavService {

    @Autowired
    private UserFavRepository repo;

    public List<UserFav> getallmovies()
    {
        return repo.findAll();
    }

    public ResponseEntity<?> savemovie(UserFav UserFavmovie) {
        UserFav movie = repo.findByuseridmovieid(UserFavmovie);
        if (movie == null) {
            repo.saveFavMovie(UserFavmovie);
            return new ResponseEntity<UserFav>(UserFavmovie, HttpStatus.OK);
        }else{
        return new ResponseEntity<>(  "Movie Already in Favourites", HttpStatus.BAD_REQUEST);
        }
    };

    public String removeMovie(int id)
    {  String response;
        if(repo.removeUserFavMovie(id))
            response="Movie Removed";
        else
            response="Removal Failed";
        return response;
    }
    public UserFav getmoviebyId(int id)
    {
        return repo.findMoviebyid(id);
    }
}

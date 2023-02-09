package com.example.movieproto2.controller;

import com.example.movieproto2.Repository.MoviesRepository;
import com.example.movieproto2.model.Movies;
import com.example.movieproto2.model.Ratings;
import com.example.movieproto2.model.User;
import com.example.movieproto2.service.MovieService;
import com.example.movieproto2.service.RatingsService;
import com.example.movieproto2.service.UserService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/ratings")
public class RatingsController {

    @Autowired(required = true)
    private RatingsService ratingsservice;

//    @GetMapping("/")
//    public List<Movies> getAllmovies() throws Exception {
//        return ratingsservice.getallmovies();
//    }
    @PostMapping("/newrating")
    public boolean newmovie(@RequestBody Ratings ratings) throws Exception {
        return ratingsservice.saverating(ratings);
    }



}




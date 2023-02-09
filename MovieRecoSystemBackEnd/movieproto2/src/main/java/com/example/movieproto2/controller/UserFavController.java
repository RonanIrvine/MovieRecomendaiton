package com.example.movieproto2.controller;

import com.example.movieproto2.model.Movies;
import com.example.movieproto2.model.UserFav;
import com.example.movieproto2.service.MovieService;
import com.example.movieproto2.service.UserfavService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/favmovies")
public class UserFavController {
    @Autowired(required = true)
    private UserfavService movieservice;

    @GetMapping("/")
    public List<UserFav> getAllmovies() throws Exception {
        return movieservice.getallmovies();
    }
    @GetMapping("/{id}")
    public List<UserFav> getAllmovies(@PathVariable int id) throws Exception {
        return movieservice.getallmoviesuserfav(id);
    }

    @PostMapping("/addmovietofav")
    public ResponseEntity<?> addmovietofav(@RequestBody UserFav movie) throws Exception {
        return movieservice.savemovie(movie);
    }

    @DeleteMapping("/removeMoviefromfav/{id}")//gets  from user
    public String removeMoviefromfav(@PathVariable int id){
        return  movieservice.removeMovie(id);
    }
}

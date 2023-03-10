package com.example.movieproto2.controller;
import com.example.movieproto2.model.Movies;
import com.example.movieproto2.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/movies")
public class MovieController {

    @Autowired(required = true)
    private MovieService movieservice;

    @GetMapping("/")
    public List<Movies> getAllmovies() throws Exception {
        return movieservice.getallmovies();
    }
    @GetMapping("/ori")
    public List<Movies> getAllorimovies() throws Exception {
        return movieservice.getallorimovies();
    }

    @GetMapping("{id}")
    public ResponseEntity<Movies> getMoviebyID(@PathVariable int id) throws Exception {
        Movies movie=movieservice.getmoviebyId(id);
        return ResponseEntity.ok(movie);
    }
    @GetMapping("/getsimilar/{id}")
    public List<Movies> getsimilarMoviebyID(@PathVariable int id) throws Exception {
        return movieservice.getsimilarmoviesbyId(id);
    }

    @PostMapping("/newmovie")
    public boolean newmovie(@RequestBody Movies movie) throws Exception {
        return movieservice.savemovie(movie);
    }
    @PutMapping("{id}")
    public String updateMovie(@PathVariable int id,@RequestBody Movies movie) throws Exception {
        return movieservice.updateMovie(id, movie);
    }
    @DeleteMapping("/{id}")
    public String deleteMovie(@PathVariable int id){
        Movies Movie=movieservice.getmoviebyId(id);
        return  movieservice.deleteMovie(Movie.getMovieid());
    }
    @DeleteMapping("/delori/{id}")
    public String deleteOriMovie(@PathVariable int id){
//        Movies Movie=movieservice.getmovieoribyId(id);
        return  movieservice.deleteoriMovie(id);
    }
}
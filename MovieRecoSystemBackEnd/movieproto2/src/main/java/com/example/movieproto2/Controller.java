package com.example.movieproto2;
import com.example.movieproto2.Repository.UserRepository;
import com.example.movieproto2.model.Movies;
import com.example.movieproto2.model.User;
import com.example.movieproto2.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.ui.Model;
import org.springframework.web.bind. annotation.*;
import java.util.List;
import java.util.Map;
@RestController
@org.springframework.stereotype.Controller
public class Controller {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    private MovieService movieservice;
    @Autowired(required = true)
    private UserRepository userrepo;

    @GetMapping("/")
    public String index(Model model) {
        User user = new User();
        model.addAttribute("user", user);
        return "Login";
    }


    @GetMapping("viewUsers")
    public List<User> getallusers() throws Exception {
        return userrepo.findAll();
    }

    @GetMapping("/viewMovies")
    public String getmovies(Model model) throws Exception {
        List<Movies> movies = movieservice.getallmovies();
        model.addAttribute("movies", movies);
        return "Viewmovies";
    }

    @GetMapping("/findbyname/{name}")
    public void findpmoviebyName(@PathVariable String name) {
        List<Map<String, Object>> movies;
        movies = jdbcTemplate.queryForList("select * from movies WHERE title LIKE-%?");
    }

    @PostMapping("/viewMovies")
    public void viewmovies(String... args) throws Exception {
        List<Map<String, Object>> movies;
        movies = jdbcTemplate.queryForList("select * from movies");
        movies.forEach(System.out::println);

    }
}
package com.example.movieproto2.controller;

import com.example.movieproto2.model.Links;
import com.example.movieproto2.model.Movies;
import com.example.movieproto2.model.User;
import com.example.movieproto2.service.LinksService;
import com.example.movieproto2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/links")
public class LinksController {

    @Autowired(required = true)
    private LinksService Service;
    @PostMapping("/newlink")
    public boolean newlink(@RequestBody Links link) throws Exception {
        return Service.savelinks(link);
    }
    @PostMapping("/{id}") //get IDs Link based on movieID
    public Links getlinkbymovieID(@PathVariable int id) throws Exception {
       return Service.getLinkbymovieId(id);
    }

}

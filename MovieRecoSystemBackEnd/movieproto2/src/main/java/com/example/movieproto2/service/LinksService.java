package com.example.movieproto2.service;

import com.example.movieproto2.Repository.LinksRepository;

import com.example.movieproto2.model.Links;
import com.example.movieproto2.model.Movies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class LinksService {
    @Autowired
    private LinksRepository repo; //creating Linksrepository object

    public Boolean savelinks(Links link)
    {
        return repo.addLinks(link);
    }
    public Links getLinkbymovieId(int id)
    {
        return repo.findLinksbymovieid(id);
    }

}

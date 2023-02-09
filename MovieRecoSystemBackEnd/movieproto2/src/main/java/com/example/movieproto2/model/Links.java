package com.example.movieproto2.model;

import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


 @NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name="Links")
    public  class Links {
        private int movieid;
        private String imdbid;
        private int tmdbid;
}


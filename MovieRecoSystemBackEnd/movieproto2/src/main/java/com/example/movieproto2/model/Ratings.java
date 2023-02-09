package com.example.movieproto2.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="Ratings")
public class Ratings {
    private int userid ;
    private int movieid ;
    private int rating;
    private int timestamp ;
}

package com.example.movieproto2.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="Ronan_User_Fav")
@Entity
public class UserFav {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int favid;
    @Column(name="movieid")
    private int movieid;
    @Column(name="userid")
    private int userid;
    @Column(name="title")
    private String title;
    @Column(name="genres")
    private String genres;
}
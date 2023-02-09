package com.example.movieproto2.model;



import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Collection;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="Ronan_User")
@Entity
public class User  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userid;
    @Column(name="username")
    private String username;
    @Column(name="email")
    private String email;
    @Column(name="userpassword")
    private String userpassword;
    @Column(name="usertype")
    private String usertype;
    @Transient
    private String userpassword2;


}
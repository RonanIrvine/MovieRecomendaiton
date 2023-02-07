package com.example.movieproto2;

import com.example.movieproto2.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Movieproto2Application implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(Movieproto2Application.class, args);
	}
	@Autowired
	private UserRepository userrepo;
	@Override
	public void run(String... args) throws Exception {

	}
}

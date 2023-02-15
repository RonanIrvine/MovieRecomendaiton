package com.example.movieproto2.Repository;

import com.example.movieproto2.model.Movies;
import com.example.movieproto2.model.Ratings;
import com.example.movieproto2.model.User;
import com.example.movieproto2.model.UserFav;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.sql.ResultSet;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Repository
public  class RatingsRepository {
    @Autowired
    private JdbcOperations jdbcTemplate;

    private String InsertQuery="INSERT INTO Ratings (userid,movieid,rating,timestamp) VALUES (?,?,?,?)";
    private String DeleteQuery="DELETE  Ratings WHERE favid=?";
    private String findQuery = "SELECT * FROM ratings  WHERE movieid=? AND userid=?";
    private String getratingQuery = "SELECT AVG(RATING) FROM RATINGS WHERE MOVIEID=?";


    private RowMapper<Ratings> rowMapper=(ResultSet rs, int row)->{ //RowMapper used for formatting data properly
        Ratings ratings=new Ratings();
        ratings.setUserid(rs.getInt(1));
        ratings.setMovieid(rs.getInt(2));
        ratings.setRating(rs.getInt(3));
        ratings.setTimestamp(rs.getInt(4));

        return ratings;
    };
    public List<Ratings> findAll(){//function to get all ratings from DB
        return jdbcTemplate.query("SELECT * FROM Ratings ORDER BY TIMESTAMP DESC FETCH NEXT 10 ROWS ONLY\" ",rowMapper);
    }
    public Ratings findByuseridmovieid (Ratings rating)
    {
        return jdbcTemplate.queryForObject (findQuery, new Object[]{rating.getMovieid(), rating.getUserid()}, rowMapper);
    }
    int i = (int) (new Date().getTime()/1000);//get current timestamp
    public boolean insertrating(Ratings Ratings){ //function for inserting new ratings
        return jdbcTemplate.update(InsertQuery, Ratings.getUserid(),Ratings.getMovieid(),Ratings.getRating(), i) > 0;
    }

    public List<Ratings>  getallRatingformovie(int id){//function to get all ratings from DB
        return jdbcTemplate.query("SELECT * FROM RATINGS WHERE movieid="+id+"",rowMapper);
    }

    public boolean removeRating (int id){ //function for deleting ratings

        return jdbcTemplate.update(DeleteQuery, id) > 0;
    }
}
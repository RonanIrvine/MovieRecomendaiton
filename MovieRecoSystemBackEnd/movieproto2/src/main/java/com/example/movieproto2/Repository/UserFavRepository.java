package com.example.movieproto2.Repository;

import com.example.movieproto2.model.Movies;
import com.example.movieproto2.model.Ratings;
import com.example.movieproto2.model.User;
import com.example.movieproto2.model.UserFav;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.sql.ResultSet;
import java.util.List;

@Repository
public  class UserFavRepository {
    @Autowired
    private JdbcOperations jdbcTemplate;

    private String InsertQuery="INSERT INTO Ronan_User_Fav (genres,movieid,title,userid) VALUES (?,?,?,?)";

    private String findQuery = "SELECT * FROM Ronan_User_Fav  WHERE movieid=? AND userid=?";

    private RowMapper<UserFav> rowMapper=(ResultSet rs, int row)->{ //RowMapper used for formatting data properly
        UserFav userfavmovie=new UserFav();
        userfavmovie.setFavid(rs.getInt(1));
        userfavmovie.setGenres(rs.getString(2));
        userfavmovie.setMovieid(rs.getInt(3));
        userfavmovie.setTitle(rs.getString(4));
        userfavmovie.setUserid(rs.getInt(5));
        return userfavmovie;
    };
    public List<UserFav> findAll(){
        return jdbcTemplate.query("SELECT * FROM Ronan_User_Fav ",rowMapper);
    }
    public List<UserFav> findAllfromuser(int id){
        return jdbcTemplate.query("SELECT * FROM Ronan_User_Fav WHERE userid="+id,rowMapper);
    }
    public boolean saveFavMovie(UserFav UserFav){  //function for inserting new favourite movie
        return jdbcTemplate.update(InsertQuery, UserFav.getGenres(),UserFav.getMovieid(),UserFav.getTitle(),UserFav.getUserid() ) > 0;
    }

    public UserFav findByuseridmovieid (UserFav rating)
    {
        try {
            return jdbcTemplate.queryForObject(findQuery, new Object[]{rating.getMovieid(), rating.getUserid()}, rowMapper);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }
    public UserFav findMoviebyid(int id){
        return jdbcTemplate.queryForObject("SELECT * FROM Ronan_UserFav WHERE movieid = ?", new Object[]{id}, rowMapper);
    }
    private String DeleteQuery="DELETE  Ronan_User_Fav WHERE favid=?";
    public boolean removeUserFavMovie(int id){
        return jdbcTemplate.update(DeleteQuery, id) > 0;
    }
}
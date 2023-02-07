package com.example.movieproto2.Repository;

import com.example.movieproto2.model.Links;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
@Repository
public class LinksRepository {
    @Autowired
    private JdbcOperations jdbcTemplate;

    private RowMapper<Links> rowMapper=(ResultSet rs, int row)->{
        Links movie=new Links();
        movie.setMovieid(rs.getInt(1));
        movie.setImdbid(rs.getString(2));
        movie.setTmdbid(rs.getInt(3));
        return movie;
    };
    public Links findLinksbymovieid(int id){
        return jdbcTemplate.queryForObject("SELECT * FROM LINKS WHERE movieid = ?", new Object[]{id}, rowMapper);
    }


}

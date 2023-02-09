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

    private RowMapper<Links> rowMapper=(ResultSet rs, int row)->{ //RowMapper used for formatting data properly
        Links movie=new Links();
        movie.setMovieid(rs.getInt(1));
        movie.setImdbid(rs.getString(2));
        movie.setTmdbid(rs.getInt(3));
        return movie;
    };
    public Links findLinksbymovieid(int id){//function to get links data from DB based on ID
        return jdbcTemplate.queryForObject("SELECT * FROM LINKS WHERE movieid = ?", new Object[]{id}, rowMapper);
    }


}

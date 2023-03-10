package com.example.movieproto2.Repository;

import com.example.movieproto2.model.Movies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public  class MoviesRepository {
    @Autowired
    private JdbcOperations jdbcTemplate;



    private String InsertPoster="INSERT INTO Movies (email,username,userpassword) VALUES (?,?,?)";
        final String JDBC_DRIVER = "oracle.jdbc.driver.OracleDriver";
     final String DB_URL = "jdbc:oracle:thin:@database-2.cmxecweo1rn2.ap-southeast-1.rds.amazonaws.com:1521:ORCL";
     final String USER = "admin";
     final String PASS = "Password123";

    //change to get moviebyID only
    // do a search with a 50% similarity or more

    private RowMapper<Movies> rowMapper=(ResultSet rs, int row)->{
        Movies movie=new Movies();
        movie.setMovieid(rs.getInt(1));
        movie.setGenres(rs.getString(2));
        movie.setTitle(rs.getString(3));
        return movie;
    };
    private RowMapper<Movies> rowMapperfiltered=(ResultSet rs, int row)->{ //RowMapper used for formatting data properly
        Movies movie=new Movies();
        movie.setMovieid(rs.getInt(1));
        movie.setTitle(rs.getString(2));
        movie.setGenres(rs.getString(3));
        return movie;
    };
    private RowMapper<Movies> rowMapperRonan=(ResultSet rs, int row)->{ //RowMapper used for formatting data properly
        Movies movie=new Movies();
        movie.setMovieid(rs.getInt(3));
        movie.setTitle(rs.getString(1));
        movie.setGenres(rs.getString(2));
        return movie;
    };
    public List<Movies> findAll(){
//        return jdbcTemplate.query("SELECT M.movieid,M.genres, M.title ,L.IMDBID  FROM Movies M JOIN  LINKS L ON M.movieid=L.movieid  ORDER BY M.movieid DESC FETCH NEXT 100 ROWS ONLY",rowMapper);
//        return jdbcTemplate.query("SELECT * FROM Movies ORDER BY Movieid ASC FETCH NEXT 100 ROWS ONLY",rowMapper);
        return jdbcTemplate.query("SELECT * FROM FILTERED_Movies_MEDIUm ORDER BY Movieid ASC FETCH NEXT 200 ROWS ONLY",rowMapperfiltered);
    }
    public List<Movies> findAlllatest(){
//        return jdbcTemplate.query("SELECT M.movieid,M.genres, M.title ,L.IMDBID  FROM Movies M JOIN  LINKS L ON M.movieid=L.movieid  ORDER BY M.movieid DESC FETCH NEXT 100 ROWS ONLY",rowMapper);
//        return jdbcTemplate.query("SELECT * FROM Movies ORDER BY Movieid ASC FETCH NEXT 100 ROWS ONLY",rowMapper);
        return jdbcTemplate.query("SELECT * FROM FILTERED_Movies_MEDIUm ORDER BY Movieid DESC FETCH NEXT 100 ROWS ONLY",rowMapperfiltered);
    }
    public List<Movies> findAllronan(){
//        return jdbcTemplate.query("SELECT M.movieid,M.genres, M.title ,L.IMDBID  FROM Movies M JOIN  LINKS L ON M.movieid=L.movieid  ORDER BY M.movieid DESC FETCH NEXT 100 ROWS ONLY",rowMapper);
//        return jdbcTemplate.query("SELECT * FROM Movies ORDER BY Movieid ASC FETCH NEXT 100 ROWS ONLY",rowMapper);
        return jdbcTemplate.query("SELECT * FROM RonanMovies ORDER BY Movieid DESC FETCH NEXT 100 ROWS ONLY",rowMapperRonan);
    }
    public List<Movies> findAllorimovies(){//function to get all Movies from DB
    return jdbcTemplate.query("SELECT * FROM Movies ORDER BY Movieid DESC FETCH NEXT 200 ROWS ONLY",rowMapper);
    }
    private String InsertQuery="INSERT INTO RonanMovies (title,genres) VALUES (?,?)";
    public boolean saveMovie(Movies movie){ //function for inserting new movie
        return jdbcTemplate.update(InsertQuery, movie.getTitle(), movie.getGenres()) > 0;
    }
    private String UpdateoriQuery="UPDATE  RonanMovies SET title=?,genres=? WHERE movieid=?";
    public boolean updateoriMovie(int id,Movies movie){ //update movie title and genres based on ID given
        return jdbcTemplate.update(UpdateoriQuery, movie.getTitle(), movie.getGenres(),id) > 0;
    }
    private String UpdateQuery="UPDATE  FILTERED_Movies_MEDIUm SET title=?,genres=? WHERE movieid=?";
    public boolean updateMovie(int id,Movies movie){ //update movie title and genres based on ID given
        return jdbcTemplate.update(UpdateQuery, movie.getTitle(), movie.getGenres(),id) > 0;
    }
    public Movies findMoviebyid(int id){//function to get movie data based on movieID entered
        return jdbcTemplate.queryForObject("SELECT * FROM FILTERED_Movies_Medium WHERE movieid = ?", new Object[]{id}, rowMapperfiltered);
    }
    public Movies findMovieoribyid(int id){//function to get movie data based on movieID entered
        return jdbcTemplate.queryForObject("SELECT * FROM RonanMovies WHERE movieid = ?", new Object[]{id}, rowMapperfiltered);
    }
    public Movies findfilteredMoviebyid(int id){
        try {
        return jdbcTemplate.queryForObject("SELECT * FROM FILTERED_Movies_Medium WHERE movieid = ?", new Object[]{id}, rowMapperfiltered);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }
    //The RunQuery method takes in two parameters
    public List<String> RunQuery(String myQuery, String myColumn){//a SQL query (myQuery) and a column name (myColumn)
        Connection conn = null;// It establishes a database connection using the JDBC driver and connection details defined at the beginning of the class,
        // executes the query, and retrieves the results. //
        // The results are then added to a list of strings (result),
        // which is returned when the method finishes execution.
        // Finally, the method includes try-catch blocks to handle exceptions that may occur
        // during the execution of the SQL query and closing of the database connection.
        // The result that is returned in the end is a list of all the movies TMDB ID???s.
        // It is then used to fetch all of the movies details from
        Statement stmt = null;
        List<String> result = new ArrayList<>();
        try {
            Class.forName(JDBC_DRIVER);
            conn = DriverManager.getConnection(DB_URL, USER, PASS);//connect to DB to retrieve information
            stmt = conn.createStatement();

            String sql = myQuery;
            ResultSet rs = stmt.executeQuery(sql);

            while(rs.next()){
                result.add(rs.getString(myColumn));
            }
            rs.close();

            // in case shit hits the fan!
        } catch (SQLException se) {
            se.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (stmt != null)
                    conn.close();
            } catch (SQLException se) {
            }
            try {
                if (conn != null)
                    conn.close();
            } catch (SQLException se) {
                se.printStackTrace();
            }
        }
        return result;
    }

    public List<Movies> getsimilarmovies(int id) {//function to get similar movies based on correlation matrix
        try {
            List<String> similarIDs = new ArrayList<>(); //SIMILAR LIST ID
            List<Movies> similarMovies = new ArrayList<>();
            String query = "Select movie_id from pearsons_correlation_Medium where ID_" + id + "> 0.5";//QUERY TO GET SIMILAR IDs
            similarIDs = RunQuery(query, "movie_id");
            for (int j = 0; j < similarIDs.size(); j++) {
               Movies movie=findfilteredMoviebyid(j);//find movie based on ID entered
                if (movie == null) {
                    continue;
                } else {
                    similarMovies.add(movie);
                    }
                }
            return similarMovies;
        } catch (EmptyResultDataAccessException e) {//in case if empty
            e.printStackTrace();
            return null;
        }

    }


    private String DeleteQuery="DELETE  Movies WHERE movieid=?";
    public boolean deleteMovie(int id){//function to movie user data based on movieID entered
        return jdbcTemplate.update(DeleteQuery, id) > 0;
    }
    private String DeleteRonanQuery="DELETE  RonanMovies WHERE movieid=?";
    public boolean deleteoriMovie(int id){//function to movie user data based on movieID entered
//        return jdbcTemplate.update(DeleteRonanQuery, id) > 0;
        return jdbcTemplate.update(DeleteRonanQuery, id) > 0;
    }

    private String DeleteFilteredQuery="DELETE  RonanMovies WHERE movieid=?";
    public boolean deleteRonanMovie(int id){//function to movie user data based on movieID entered
        return jdbcTemplate.update(DeleteFilteredQuery, id) > 0;
    }
}
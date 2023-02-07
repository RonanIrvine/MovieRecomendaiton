package com.example.movieproto2.Repository;


import com.example.movieproto2.model.Movies;
import com.example.movieproto2.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.util.List;

@Repository
public  class UserRepository {
    @Autowired
    private JdbcOperations jdbcTemplate;
    private String SearchQuery="SELECT * Ronan_User where rownum<10";
    private String InsertQuery="INSERT INTO Ronan_User (email,username,userpassword,usertype) VALUES (?,?,?,'User')";
    private String UpdateQuery="UPDATE  Ronan_User SET email=?,username=?,userpassword=? WHERE userid=?";
    private String PromoteQuery="UPDATE  Ronan_User SET usertype='Admin' WHERE userid=?";
    private String DeleteQuery="DELETE  Ronan_User WHERE userid=?";
    private RowMapper<User> rowMapper=(ResultSet rs, int row)->{ //MAP USER OBJECTS FROM QUERY
        User users=new User();
        users.setUserid(rs.getInt(1));
        users.setEmail(rs.getString(2));
        users.setUsername(rs.getString(3));
        users.setUserpassword(rs.getString(4));
        users.setUsertype(rs.getString(5));
        return users;
        };
    public User findByUsername (String Username)
    {
        String sql = "SELECT * FROM Ronan_User  WHERE USERNAME LIKE '";
        return jdbcTemplate.queryForObject (sql+Username+"'", rowMapper);
    }
    public List<User> findAll(){
   return jdbcTemplate.query("SELECT * FROM Ronan_User",rowMapper);
    }
    public boolean saveUser(User user){
        return jdbcTemplate.update(InsertQuery, user.getEmail(),user.getUsername(), user.getUserpassword()) > 0;
    }
    public User finduserbyid(int id){
        return jdbcTemplate.queryForObject("SELECT * FROM Ronan_User WHERE userid = ?", new Object[]{id}, rowMapper);
    }
    public boolean PromoteUser(int id){
    return jdbcTemplate.update(PromoteQuery, id) > 0;
}
    public boolean updateUser(int id,User user){
        return jdbcTemplate.update(UpdateQuery, user.getEmail(),user.getUsername(), user.getUserpassword(),id) > 0;
    }
    public boolean deleteUser(int id){
        return jdbcTemplate.update(DeleteQuery, id) > 0;
    }
}

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


    private String PromoteQuery="UPDATE  Ronan_User SET usertype='Admin' WHERE userid=?";
    private String DeleteQuery="DELETE  Ronan_User WHERE userid=?";
    private RowMapper<User> rowMapper=(ResultSet rs, int row)->{  //RowMapper used for formatting data properly
        User users=new User();
        users.setUserid(rs.getInt(1));
        users.setEmail(rs.getString(2));
        users.setUsername(rs.getString(3));
        users.setUserpassword(rs.getString(4));
        users.setUsertype(rs.getString(5));
        return users;
        };
    public User findByUsername (String Username)
    {//function to get user based on username entered
        String sql = "SELECT * FROM Ronan_User  WHERE USERNAME LIKE '";
        return jdbcTemplate.queryForObject (sql+Username+"'", rowMapper);
    }
    public List<User> findAll(){//function to get all users from DB

        return jdbcTemplate.query("SELECT * FROM Ronan_User",rowMapper);
    }
    private String InsertQuery="INSERT INTO Ronan_User (email,username,userpassword,usertype) VALUES (?,?,?,'User')";
    public boolean saveUser(User user){  //function for inserting new user
        return jdbcTemplate.update(InsertQuery, user.getEmail(),user.getUsername(), user.getUserpassword()) > 0;
    }
    public User finduserbyid(int id){//function to get user data based on userID entered
        return jdbcTemplate.queryForObject("SELECT * FROM Ronan_User WHERE userid = ?", new Object[]{id}, rowMapper);
    }
    public boolean PromoteUser(int id){//function to promote user based on ID entered
    return jdbcTemplate.update(PromoteQuery, id) > 0;
}
    private String UpdateQuery="UPDATE  Ronan_User SET email=?,username=?,userpassword=? WHERE userid=?";
    public boolean updateUser(int id,User user){//function to update user based on new user object and id entered
        return jdbcTemplate.update(UpdateQuery, user.getEmail(),user.getUsername(), user.getUserpassword(),id) > 0;
    }
    public boolean deleteUser(int id){//function to delete user data based on userID entered
        return jdbcTemplate.update(DeleteQuery, id) > 0;
    }
}

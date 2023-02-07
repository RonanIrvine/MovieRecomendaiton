package com.example.movieproto2.service;

import com.example.movieproto2.Repository.UserRepository;
import com.example.movieproto2.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService  {
    @Autowired
    private UserRepository repo;


    public Boolean saveuser(User user)
    {
        return repo.saveUser(user);
    }
    public List<User> getallusers()
    {
        return repo.findAll();
    }

    public String updateUser(int id,User user)
    {  String response;
        if(repo.updateUser(id,user))
            response="User Updated";
        else
            response="Update Failed";
        return response;
    }
    public String deleteUser(int id)
    {  String response;
        if(repo.deleteUser(id))
            response="User Deleted";
        else
            response="Deletion Failed";
        return response;
    }
    public String PromoteUser(int id)
    {  String response;
        if(repo.PromoteUser(id))
            response="User Promoted";
        else
            response="Update Failed";
        return response;
    }
    public User getuserbyId(int id)
    {
        return repo.finduserbyid(id);
    }

    public ResponseEntity<?> loginUser (User user)
    {
        User userdata = repo.findByUsername (user.getUsername()); //VERIFY IS USER EXISTS
        if(userdata != null)
        {
            if(user.getUserpassword ().equals(userdata.getUserpassword ()))
            {
                return new ResponseEntity<User> (userdata, HttpStatus.OK);
            }
            else
            {
                return new ResponseEntity<> ("Wrong Password", HttpStatus.BAD_REQUEST);
            }
        }
        else
        {
            return new ResponseEntity<>(  "User does not exist!", HttpStatus.BAD_REQUEST);
        }
    }
}

package com.example.movieproto2.controller;

import com.example.movieproto2.model.User;
import com.example.movieproto2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired(required = true)
    private UserService userService; //OBJECT TO CALL USERSERVICE

    @GetMapping("/")
    public List<User> getAllUsers() throws Exception {
        return userService.getallusers();
    }
    @GetMapping("{id}")
    public ResponseEntity<User> getuserbyID(@PathVariable int id) throws Exception {
        User user=userService.getuserbyId(id);
        return ResponseEntity.ok(user);
    }
    @PostMapping("/newuser")
    public boolean newuser(@RequestBody User user) throws Exception {
        return userService.saveuser(user);
    }
    @PutMapping("{id}")
    public String updateUser(@PathVariable int id,@RequestBody User user) throws Exception {//get ID and user object from url link and body respectively
        return userService.updateUser(id, user); //pass ID and object to update function
    }
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable int id){
        User user=userService.getuserbyId(id);//creating user object based on ID given to check if exist
        return  userService.deleteUser(user.getUserid());
    }
    @PutMapping("/promote/{id}")
    public String promoteUser(@PathVariable int id){ //getting userid from url link
        //creating user object based on ID given
        return  userService.PromoteUser(id);
    }
    @PostMapping("/userLogin")
    public ResponseEntity<?> loginuser(@RequestBody User user) { //getting user  object from body
        return userService.loginUser(user);//passing user object for login function in service
    }
}




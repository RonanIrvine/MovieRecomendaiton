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
    private UserService userService;

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
    public String updateUser(@PathVariable int id,@RequestBody User user) throws Exception {
        return userService.updateUser(id, user);
    }
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable int id){
        User user=userService.getuserbyId(id);
        return  userService.deleteUser(user.getUserid());
    }
    @PutMapping("/promote/{id}")
    public String promoteUser(@PathVariable int id){
        User user=userService.getuserbyId(id);
        return  userService.PromoteUser(user.getUserid());
    }
    @PostMapping("/userLogin")
    public ResponseEntity<?> loginuser(@RequestBody User user) {
        return userService.loginUser(user);
    }
}




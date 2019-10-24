package com.pingchuan.weather.controller;

import java.util.Map;
import com.pingchuan.weather.entity.User;
import com.pingchuan.weather.entity.PageResult;
import com.pingchuan.weather.service.UserService;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("User")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("/getUserByPage")
    public PageResult<User> getUserByPage(int page, int rows){
        return userService.getUserByPage(page, rows);
    }

    @RequestMapping("updatePassword")
    public void updatePassword(int userId, String password){
        userService.updatePassword(userId, password);
    }

    @RequestMapping("findOneById")
    public User findOneById(int userId){
        return userService.findOneById(userId);
    }

    @RequestMapping("updateAll")
    public void updateAll(int userId, int departId){
        userService.updateAll(userId, departId);
    }

    @RequestMapping("doLogin")
    public String doUserLogin(String loginName, String loginPwd) throws JsonProcessingException {
        Map<String, User> userMap = userService.userLogin(loginName, loginPwd);
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(userMap);
    }
}
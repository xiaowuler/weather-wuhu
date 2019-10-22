package com.pingchuan.weather.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pingchuan.weather.entity.User;
import com.pingchuan.weather.entity.PageResult;
import com.pingchuan.weather.service.UserService;

import org.springframework.http.HttpRequest;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

/**
 * @description: 用户控制类
 * @author: XW
 * @create: 2019-06-28 09:44
 **/
@RestController
@RequestMapping("User")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("/findAllByPage")
    public PageResult<User> findAllByPage(int page, int rows){
        return userService.findAllByPage(page, rows);
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

    @RequestMapping("test")
    public String test(){
        return "index.html";
    }


}
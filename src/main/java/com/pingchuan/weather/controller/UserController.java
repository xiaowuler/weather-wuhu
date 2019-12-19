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
    public PageResult<User> getUserByPage(int page, int rows) {
        return userService.getUserByPage(page, rows);
    }

    @RequestMapping("updatePasswordById")
    public void updatePasswordById(int userId, String password) {
        userService.updatePasswordById(userId, password);
    }

    @RequestMapping("findOneById")
    public User findOneById(int userId) {
        return userService.findOneById(userId);
    }

    @RequestMapping("updateDepartmentIdById")
    public void updateDepartmentIdById(int userId, int departmentId) {
        System.out.println("userId：" + userId + "-----departmentId：" + departmentId);
        userService.updateDepartmentIdById(userId, departmentId);
    }

    @RequestMapping("doLogin")
    public String userLogin(String username, String password) throws JsonProcessingException {
        Map<String, User> userMap = userService.userLogin(username, password);
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(userMap);
    }
}
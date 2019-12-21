package com.pingchuan.weather.controller;

import com.pingchuan.weather.entity.User;
import com.pingchuan.weather.entity.PageResult;
import com.pingchuan.weather.service.UserService;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

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

    @RequestMapping("/getError")
    public String getError(){
        ServletRequestAttributes sra = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        Object exception = sra.getRequest().getSession().getAttribute("SPRING_SECURITY_LAST_EXCEPTION");
        if (exception == null){
            return null;
        }
        return "用户名或密码错误";
    }

    @RequestMapping("/register")
    public String userRegister(String username, Integer departmentId, String name, String password){
        userService.userRegister(username, departmentId, name, password);
        return "注册成功";
    }
}
package com.pingchuan.weather.Controller;

import com.pingchuan.weather.Service.UserService;
import com.pingchuan.weather.entity.PageResult;
import com.pingchuan.weather.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}

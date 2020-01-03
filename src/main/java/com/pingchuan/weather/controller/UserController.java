package com.pingchuan.weather.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.pingchuan.weather.entity.User;
import com.pingchuan.weather.entity.PageResult;
import com.pingchuan.weather.service.UserService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.AnonymousAuthenticationToken;

import java.util.List;

@RestController
@RequestMapping("User")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("/getUserByPage")
    public  PageInfo<User> getUserByPage(int page, int rows,Integer departId,String name) {
        PageHelper.startPage(page,rows);
        List<User> list=userService.findByDepartNameAndName(departId,name);
        PageInfo<User> pageInfo = new PageInfo<User>(list);
        return pageInfo;
    }

    @RequestMapping("updatePasswordById")
    public void updatePasswordById(int userId, String password) {
        userService.updatePasswordById(userId, password);
    }

    @RequestMapping("findOneById")
    public User findOneById(int userId) {
        return userService.findOneById(userId);
    }

    @RequestMapping("/updateNameAndDepartmentIdById")
    public void updateNameAndDepartmentIdById(int userId, int departmentId,String name) {
        userService.updateNameAndDepartmentIdById(userId, departmentId,name);
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

    @RequestMapping("/isExistUsername")
    public User isExistUsername(String username){
        User user = userService.findUserByLoginName(username);
        return user;
    };

    @RequestMapping("/register")
    public String userRegister(String username, Integer departmentId, String name, String password){
        userService.userRegister(username, departmentId, name, password);
        User user = userService.findUserByLoginName(username);
        if (user != null){
            return "注册成功";
        } else {
            return "注册失败";
        }
    }

    @RequestMapping("/getCurrentLoginName")
    public String getCurrentLoginName(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String currentUserName = authentication.getName();
            return currentUserName;
        }
        return null;
    }


    @PostMapping("/deleteOneById")
    public void deleteOneById(int userId){
        userService.deleteOneById(userId);
    }

    @PostMapping("/insertOne")
    public void insertOne(String loginName,String loginPwd,String name,int departId){
        User user=new User();
        user.setDepartmentId(departId);
        user.setLoginName(loginName);
        user.setLoginPwd(loginPwd);
        user.setName(name);
        userService.insertOne(user);
    }

    @PostMapping("/findByDepartNameAndName")
    public List<User> findByDepartNameAndName(Integer departId,String name){
        return userService.findByDepartNameAndName(departId,name);
    }

}
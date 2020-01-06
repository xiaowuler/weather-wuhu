package com.pingchuan.weather.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.pingchuan.weather.entity.User;
import com.pingchuan.weather.entity.PageResult;
import com.pingchuan.weather.service.UserService;

import com.pingchuan.weather.service.impl.DepartmentServiceImpl;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.AnonymousAuthenticationToken;

@RestController
@RequestMapping("User")
public class UserController {

    @Autowired
    private UserService userService;


    @RequestMapping("/getUserByPage")
    public  PageResult<User> getUserByPage(int page, int rows,Integer departId,String name) {
        PageHelper.startPage(page,rows);
        if(departId==-1) {
            departId = null;
        }
        PageInfo<User> pageInfo = new PageInfo<User>(userService.findByDepartNameAndName(departId,name));
        PageResult<User> pageResult = new PageResult<>();
        pageResult.setRows(pageInfo.getList());
        pageResult.setTotal(pageInfo.getTotal());
        return pageResult;
    }

    @RequestMapping("updatePasswordById")
    public String updatePasswordById(int userId, String password) {
        userService.updatePasswordById(userId, password);
        User user=userService.findOneById(userId);
        if(user.getLoginPwd().equals(password)){
            return "操作成功";
        }else {
            return "操作失败";
        }
    }

    @RequestMapping("findOneById")
    public User findOneById(int userId) {
        return userService.findOneById(userId);
    }

    @RequestMapping("/updateNameAndDepartmentIdById")
    public String updateNameAndDepartmentIdById(int userId, int departmentId,String name) {
        userService.updateNameAndDepartmentIdById(userId, departmentId,name);
        User user=userService.findUserById(userId);
        if(user.getDepartmentId()==departmentId && user.getName().equals(name)){
            return "编辑成功";
        }else {
            return "编辑失败";
        }
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
    public String deleteOneById(int userId){
        userService.deleteOneById(userId);
        User user=userService.findOneById(userId);
        if(user==null){
            return "删除成功";
        }else {
            return "删除失败";
        }
    }

    @ResponseBody
    @PostMapping("/insertOne")
    public String insertOne(String loginName,String loginPwd,String name,int departId){
        userService.insertOne(loginName,loginPwd,name,departId);
        User user=userService.findUserByLoginName(loginName);
        if(user != null){
            return "添加成功";
        }else {
            return "添加失败";
        }
    }

    @PostMapping("/updateStateById")
    public String updateStateById(int id,int state){
        userService.updateStateById(id,state);
        User user=userService.findOneById(id);
        if(user.getState() == state){
            return "操作成功";
        }else {
            return "操作失败";
        }
    }
}
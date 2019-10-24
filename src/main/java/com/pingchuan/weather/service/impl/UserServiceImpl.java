package com.pingchuan.weather.service.impl;

import java.util.Map;
import java.util.HashMap;

import com.pingchuan.weather.entity.User;
import com.pingchuan.weather.entity.PageResult;
import com.pingchuan.weather.mapper.UserMapper;
import com.pingchuan.weather.service.UserService;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public PageResult<User> getUserByPage(int pageIndex, int pageSize) {

        PageResult<User> pageResult = new PageResult<>();
        pageResult.setRows(userMapper.getUserByPage(pageIndex, pageSize));
        pageResult.setTotal(userMapper.findCount());

        return pageResult;
    }

    @Override
    public void updatePassword(int userId, String password) {
        userMapper.updatePassword(userId, password);
    }

    @Override
    public User findOneById(int userId) {
        return userMapper.findOneById(userId);
    }

    @Override
    public void updateAll(int userId, int departId) {
        userMapper.updateAll(userId, departId);
    }

    @Override
    public Map<String, User> userLogin(String loginName, String loginPwd) {
        User user = userMapper.userLogin(loginName, loginPwd);
        Map<String, User> userMap = new HashMap<String, User>();

        if (user == null)
            userMap.put("user", null);
        else
            userMap.put("user", user);

        return userMap;
    }
}
package com.pingchuan.weather.service.impl;

import com.pingchuan.weather.entity.User;
import com.pingchuan.weather.entity.PageResult;
import com.pingchuan.weather.service.UserService;

import com.pingchuan.weather.mapper.UserMapper;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

/**
 * @description: 用户 服务层
 * @author: XW
 * @create: 2019-06-28 09:52
 **/

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public PageResult<User> findAllByPage(int page, int rows) {

        PageResult<User> pageResult = new PageResult<>();
        pageResult.setRows(userMapper.findAllByPage((page - 1) * rows + 1, page * rows));
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
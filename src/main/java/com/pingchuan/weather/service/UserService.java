package com.pingchuan.weather.service;

import com.pingchuan.weather.entity.User;
import com.pingchuan.weather.entity.PageResult;

import java.util.Map;

public interface UserService {

    User findOneById(int userId);

    void updateAll(int userId, int departId);

    void updatePassword(int userId, String password);

    PageResult<User> findAllByPage(int page, int rows);

    // 用户登录
    Map<String, User> userLogin(String loginName, String loginPwd);
}
